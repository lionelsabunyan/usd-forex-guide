#!/usr/bin/env node
/**
 * generate-sitemap.cjs
 *
 * Automatically generates sitemap.xml, sitemap-tr.xml, and sitemap-index.xml
 * from route definitions in generate-static-pages.cjs.
 *
 * - Reads page data from generate-static-pages.cjs (staticPages + blogPages)
 * - Gets lastmod dates from git log
 * - Preserves hreflang alternate links for EN↔TR pages
 * - Outputs to public/ directory
 *
 * Run after build or as part of the build pipeline.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { staticPages, blogPages, SITE_URL } = require('./generate-static-pages.cjs');

const PUBLIC = path.join(__dirname, '../public');

// ─── Hreflang mappings (EN path → TR path) ──────────────────────────────────
const hreflangMap = {
  '/': '/tr/',
  '/about/': '/tr/hakkimizda/',
  '/contact/': '/tr/iletisim/',
  '/legal/privacy/': '/tr/gizlilik-politikasi/',
  '/legal/disclaimer/': '/tr/yasal-uyari/',
  '/review/oanda/': '/tr/inceleme/oanda/',
  '/review/forexcom/': '/tr/inceleme/forexcom/',
  '/review/ig-markets/': '/tr/inceleme/ig/',
  '/review/etoro/': '/tr/inceleme/etoro/',
  '/review/fxpro/': '/tr/inceleme/fxpro/',
  '/review/hfm/': '/tr/inceleme/hfm/',
  '/review/exness/': '/tr/inceleme/exness/',
  '/review/pepperstone/': '/tr/inceleme/pepperstone/',
  '/review/xm/': '/tr/inceleme/xm/',
  '/review/fxtm/': '/tr/inceleme/fxtm/',
  '/review/fbs/': '/tr/inceleme/fbs/',
};

// Reverse map: TR path → EN path
const trToEnMap = {};
for (const [en, tr] of Object.entries(hreflangMap)) {
  trToEnMap[tr] = en;
}

// ─── Priority & changefreq rules ────────────────────────────────────────────
function getPageMeta(urlPath) {
  if (urlPath === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (urlPath === '/brokers/' || urlPath === '/compare/') return { priority: '0.9', changefreq: 'weekly' };
  if (urlPath === '/blog/') return { priority: '0.8', changefreq: 'weekly' };
  if (urlPath.startsWith('/review/')) return { priority: '0.9', changefreq: 'monthly' };
  if (urlPath.startsWith('/compare/') && urlPath !== '/compare/') return { priority: '0.8', changefreq: 'monthly' };
  if (urlPath.startsWith('/guides/')) {
    if (urlPath === '/guides/how-we-review/') return { priority: '0.6', changefreq: 'yearly' };
    if (urlPath === '/guides/forex-trading-usa/') return { priority: '0.9', changefreq: 'monthly' };
    if (urlPath === '/guides/') return { priority: '0.8', changefreq: 'monthly' };
    return { priority: '0.8', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('/tools/')) {
    if (urlPath === '/tools/economic-calendar/') return { priority: '0.7', changefreq: 'daily' };
    if (urlPath === '/tools/') return { priority: '0.8', changefreq: 'monthly' };
    return { priority: '0.8', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('/blog/') && urlPath !== '/blog/') {
    if (urlPath.includes('weekly-market-wrap')) return { priority: '0.7', changefreq: 'weekly' };
    if (urlPath.includes('best-forex-brokers-us-traders')) return { priority: '0.9', changefreq: 'monthly' };
    if (urlPath.includes('how-to-open-offshore-forex-account')) return { priority: '0.9', changefreq: 'monthly' };
    return { priority: '0.8', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('/resources/')) return { priority: '0.7', changefreq: 'monthly' };
  if (urlPath.startsWith('/legal/')) return { priority: '0.3', changefreq: 'yearly' };
  if (urlPath === '/faq/' || urlPath === '/glossary/') return { priority: '0.7', changefreq: 'monthly' };
  if (urlPath === '/about/' || urlPath === '/contact/') return { priority: '0.6', changefreq: 'monthly' };
  if (urlPath.startsWith('/brokers/')) return { priority: '0.8', changefreq: 'monthly' };
  // TR pages
  if (urlPath === '/tr/') return { priority: '0.9', changefreq: 'weekly' };
  if (urlPath.startsWith('/tr/inceleme/')) return { priority: '0.8', changefreq: 'monthly' };
  if (urlPath === '/tr/hakkimizda/' || urlPath === '/tr/iletisim/') return { priority: '0.5', changefreq: 'monthly' };
  if (urlPath === '/tr/yasal-uyari/' || urlPath === '/tr/gizlilik-politikasi/') return { priority: '0.3', changefreq: 'yearly' };
  return { priority: '0.5', changefreq: 'monthly' };
}

// ─── Git lastmod ─────────────────────────────────────────────────────────────
// Map URL paths to source files for git log lookup
function getSourceFiles(urlPath) {
  const clean = urlPath.replace(/^\/|\/$/g, '');
  const parts = clean.split('/');

  if (clean === '') return ['src/pages/Index.tsx'];
  if (clean === 'brokers') return ['src/pages/BrokersPage.tsx'];
  if (clean === 'brokers/australia') return ['src/pages/BrokersAustraliaPage.tsx'];
  if (clean === 'brokers/uk') return ['src/pages/BrokersUKPage.tsx'];
  if (clean === 'brokers/usa') return ['src/pages/BestBrokersUSA.tsx'];
  if (clean === 'compare') return ['src/pages/ComparePage.tsx'];
  if (clean === 'guides') return ['src/pages/GuidesPage.tsx'];
  if (clean === 'tools') return ['src/pages/ToolsPage.tsx'];
  if (clean === 'blog') return ['src/pages/BlogPage.tsx'];
  if (clean === 'faq') return ['src/pages/FAQPage.tsx'];
  if (clean === 'glossary') return ['src/pages/GlossaryPage.tsx'];
  if (clean === 'about') return ['src/pages/AboutPage.tsx'];
  if (clean === 'contact') return ['src/pages/ContactPage.tsx'];

  if (parts[0] === 'review') {
    const slug = parts[1];
    const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return [
      `src/lib/reviewData/${camel}.ts`,
      `src/lib/reviewData/${slug}.ts`,
    ];
  }

  if (parts[0] === 'blog' && parts[1]) {
    return ['src/lib/blog.ts'];
  }

  if (parts[0] === 'guides' && parts[1]) {
    const slug = parts[1];
    const pascal = slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
    return [`src/pages/guides/${pascal}Page.tsx`, `src/pages/guides/${pascal}.tsx`];
  }

  if (parts[0] === 'tools' && parts[1]) {
    const slug = parts[1];
    const pascal = slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
    return [`src/pages/tools/${pascal}Page.tsx`, `src/pages/tools/${pascal}.tsx`];
  }

  if (parts[0] === 'compare' && parts[1]) {
    return [`src/pages/compare/${parts[1]}.tsx`];
  }

  if (parts[0] === 'tr') {
    if (parts[1] === 'inceleme' && parts[2]) {
      const pascal = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
      return [`src/pages/tr/inceleme/${pascal}Inceleme.tsx`];
    }
    return [`src/pages/tr/`];
  }

  if (parts[0] === 'resources') return [`src/pages/resources/`];
  if (parts[0] === 'legal') return [`src/pages/legal/`];

  return [];
}

function getGitLastmod(urlPath) {
  const files = getSourceFiles(urlPath);
  let latest = null;

  for (const file of files) {
    try {
      const fullPath = path.join(__dirname, '..', file);
      // Check if file/dir exists
      if (!fs.existsSync(fullPath)) continue;

      const result = execSync(
        `git log -1 --format="%aI" -- "${file}"`,
        { cwd: path.join(__dirname, '..'), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
      ).trim();

      if (result) {
        const date = new Date(result);
        if (!latest || date > latest) latest = date;
      }
    } catch {
      // git log failed, skip
    }
  }

  return latest ? latest.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
}

// ─── URL helpers ─────────────────────────────────────────────────────────────
function ensureTrailingSlash(p) {
  if (p === '/') return '/';
  return p.endsWith('/') ? p : p + '/';
}

function fullUrl(urlPath) {
  return SITE_URL + ensureTrailingSlash(urlPath);
}

// ─── XML builders ────────────────────────────────────────────────────────────
function buildUrlEntry(urlPath, lastmod) {
  const loc = fullUrl(urlPath);
  const { priority, changefreq } = getPageMeta(ensureTrailingSlash(urlPath));
  const trPath = hreflangMap[ensureTrailingSlash(urlPath)];

  let hreflangXml = '';
  if (trPath) {
    hreflangXml = `
    <xhtml:link rel="alternate" hreflang="en-us" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${fullUrl(trPath)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`;
  }

  return `  <url>
    <loc>${loc}</loc>${hreflangXml}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function buildTrUrlEntry(urlPath, lastmod) {
  const loc = fullUrl(urlPath);
  const { priority, changefreq } = getPageMeta(ensureTrailingSlash(urlPath));
  const enPath = trToEnMap[ensureTrailingSlash(urlPath)];

  let hreflangXml = '';
  if (enPath) {
    hreflangXml = `
    <xhtml:link rel="alternate" hreflang="tr" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en-us" href="${fullUrl(enPath)}" />`;
  }

  return `  <url>
    <loc>${loc}</loc>${hreflangXml}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
function main() {
  console.log('🗺️  Generating sitemaps...\n');

  const enEntries = [];
  const trEntries = [];

  // Process static pages
  for (const page of staticPages) {
    // Skip noindex pages (e.g. paid landing pages) — they must not be in the sitemap.
    if (page.noindex) {
      console.log(`  SKIP (noindex): ${page.path}`);
      continue;
    }
    const urlPath = ensureTrailingSlash(page.path);
    const lastmod = getGitLastmod(page.path);

    if (page.path.startsWith('/tr')) {
      trEntries.push(buildTrUrlEntry(urlPath, lastmod));
      console.log(`  TR: ${urlPath} → ${lastmod}`);
    } else {
      enEntries.push(buildUrlEntry(urlPath, lastmod));
      console.log(`  EN: ${urlPath} → ${lastmod}`);
    }
  }

  // Process blog pages
  for (const blog of blogPages) {
    const urlPath = `/blog/${blog.slug}/`;
    const lastmod = getGitLastmod(`/blog/${blog.slug}`);
    enEntries.push(buildUrlEntry(urlPath, lastmod));
    console.log(`  EN: ${urlPath} → ${lastmod}`);
  }

  const today = new Date().toISOString().split('T')[0];

  // Write sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${enEntries.join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`\n✅ sitemap.xml generated (${enEntries.length} URLs)`);

  // Write sitemap-tr.xml
  const sitemapTrXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${trEntries.join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC, 'sitemap-tr.xml'), sitemapTrXml, 'utf8');
  console.log(`✅ sitemap-tr.xml generated (${trEntries.length} URLs)`);

  // Write sitemap-index.xml
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-tr.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
  fs.writeFileSync(path.join(PUBLIC, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');
  console.log(`✅ sitemap-index.xml generated`);

  console.log(`\n🎉 Sitemap generation complete!`);
}

main();
