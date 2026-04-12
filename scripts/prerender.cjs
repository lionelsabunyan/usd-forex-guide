#!/usr/bin/env node
/**
 * prerender.cjs
 *
 * Build-time prerendering using Playwright (already in devDependencies).
 * Renders each page with a headless browser and saves the full HTML
 * to dist/{path}/index.html, replacing the empty <div id="root"></div>
 * with actual rendered content.
 *
 * Run AFTER generate-static-pages.cjs (which creates directory structure + meta tags).
 * This script preserves those meta tags and adds the rendered body content.
 *
 * Usage: node scripts/prerender.cjs
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const DIST = path.join(__dirname, '../dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// Import page definitions from generate-static-pages.cjs
const { staticPages, blogPages } = require('./generate-static-pages.cjs');

// ─── Simple static file server with SPA fallback ───────────────────────────────
function createServer() {
  const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ico': 'image/x-icon',
  };

  return http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);

    // Try exact file
    let filePath = path.join(DIST, urlPath);

    // If it's a directory, try index.html inside it
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // If file doesn't exist, SPA fallback to /index.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Collect all page paths
  const allPages = [
    ...staticPages.map(p => p.path),
    ...blogPages.map(p => `/blog/${p.slug}`),
  ];

  console.log(`\n🔄 Prerendering ${allPages.length} pages with Playwright...\n`);

  // Start static server
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`📡 Static server running on ${BASE_URL}`);

  // Launch Playwright
  let chromium;
  try {
    chromium = require('playwright').chromium;
  } catch {
    // Playwright test package uses different import
    chromium = require('@playwright/test').chromium;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    // Match ReactSnap user agent so App.tsx disables analytics during prerender
    userAgent: 'ReactSnap',
    javaScriptEnabled: true,
  });

  // Block external analytics/tracking to prevent networkidle hang
  await context.route(/\/(www\.)?(google-analytics|googletagmanager|clarity|mc\.yandex|bat\.bing)/, route => route.abort());
  await context.route(/\.(woff2?|ttf|eot)$/, route => route.abort()); // Skip fonts

  let rendered = 0;
  let failed = 0;
  const errors = [];
  const CONCURRENCY = 3;

  // Process pages in batches for speed
  for (let i = 0; i < allPages.length; i += CONCURRENCY) {
    const batch = allPages.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (pagePath) => {
      const page = await context.newPage();
      const url = `${BASE_URL}${pagePath}`;

      try {
        // Navigate with domcontentloaded (don't wait for analytics)
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

        // Wait for #root to have content (React has rendered)
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            return root && root.children.length > 0;
          },
          { timeout: 20000 }
        );

        // Wait for lazy-loaded components (Suspense fallback → actual content)
        await page.waitForTimeout(1500);

        // Extract the rendered HTML of #root
        const rootHtml = await page.evaluate(() => {
          const root = document.getElementById('root');
          return root ? root.innerHTML : '';
        });

        if (!rootHtml || rootHtml.length < 100) {
          errors.push(`⚠️  ${pagePath}: Root content too short (${rootHtml.length} chars)`);
          failed++;
          await page.close();
          return;
        }

        // Determine the file path in dist/
        let filePath;
        if (pagePath === '/') {
          filePath = path.join(DIST, 'index.html');
        } else {
          filePath = path.join(DIST, pagePath, 'index.html');
        }

        if (!fs.existsSync(filePath)) {
          // File wasn't created by generate-static-pages.cjs, create directory
          const dirPath = path.dirname(filePath);
          fs.mkdirSync(dirPath, { recursive: true });
          // Use the root index.html as template
          const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
          fs.writeFileSync(filePath, template, 'utf8');
        }

        // Read the existing file (has meta tags from generate-static-pages.cjs)
        let html = fs.readFileSync(filePath, 'utf8');

        // Replace empty root div with rendered content
        html = html.replace(
          /<div id="root"><\/div>/,
          `<div id="root">${rootHtml}</div>`
        );

        // Remove scripts that would cause re-render flash
        // Keep module scripts but add data attribute so React can hydrate
        // Actually, keep scripts as-is — React will hydrate over the pre-rendered content
        // The user sees pre-rendered content immediately, then React takes over

        fs.writeFileSync(filePath, html, 'utf8');
        rendered++;

        const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
        process.stdout.write(`\r✅  ${rendered}/${allPages.length} rendered (${pagePath}) [${sizeKB}KB]`);
      } catch (err) {
        errors.push(`❌ ${pagePath}: ${err.message}`);
        failed++;
      } finally {
        await page.close();
      }
    }));
  }

  // Retry failed pages with longer timeout (lazy-loaded components need more time)
  if (errors.length > 0) {
    console.log(`\n\n🔄 Retrying ${errors.length} failed pages with longer timeout...`);
    const failedPaths = errors.map(e => {
      const match = e.match(/[⚠️❌]\s+([^:]+):/);
      return match ? match[1].trim() : null;
    }).filter(Boolean);

    for (const pagePath of failedPaths) {
      const page = await context.newPage();
      const url = `${BASE_URL}${pagePath}`;

      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            return root && root.children.length > 0;
          },
          { timeout: 30000 }
        );
        await page.waitForTimeout(2000);

        const rootHtml = await page.evaluate(() => {
          const root = document.getElementById('root');
          return root ? root.innerHTML : '';
        });

        if (rootHtml && rootHtml.length >= 100) {
          let filePath = path.join(DIST, pagePath, 'index.html');
          if (fs.existsSync(filePath)) {
            let html = fs.readFileSync(filePath, 'utf8');
            html = html.replace(/<div id="root"><\/div>/, `<div id="root">${rootHtml}</div>`);
            fs.writeFileSync(filePath, html, 'utf8');
            rendered++;
            failed--;
            const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
            console.log(`   ✅ Retry success: ${pagePath} [${sizeKB}KB]`);
          }
        }
      } catch (err) {
        console.log(`   ❌ Retry failed: ${pagePath}: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  }

  // Cleanup
  await browser.close();
  server.close();

  // Report
  console.log(`\n\n📊 Prerender complete: ${rendered} rendered, ${failed} failed`);
  if (errors.length > 0) {
    console.log('\n⚠️  Issues:');
    errors.forEach(e => console.log(`   ${e}`));
  }

  // Verify a sample page has content
  const samplePath = path.join(DIST, 'brokers', 'index.html');
  if (fs.existsSync(samplePath)) {
    const sampleHtml = fs.readFileSync(samplePath, 'utf8');
    const hasContent = !sampleHtml.includes('<div id="root"></div>');
    console.log(`\n🔍 Verification: dist/brokers/index.html ${hasContent ? '✅ has content' : '❌ still empty'}`);
  }

  if (failed > 0) {
    console.log(`\n⚠️  ${failed} pages failed to render. Check errors above.`);
  }

  console.log('\n✅  Prerendering complete!\n');
}

main().catch(err => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
