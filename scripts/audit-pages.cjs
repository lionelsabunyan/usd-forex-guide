#!/usr/bin/env node
/**
 * audit-pages.cjs
 *
 * Cross-references routes (App.tsx), SEO meta (generate-static-pages.cjs),
 * and sitemap.xml to find inconsistencies. Also validates affiliate URLs
 * in brokers.ts.
 *
 * Usage: node scripts/audit-pages.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ─── 1. Extract static routes from App.tsx ──────────────────────────────────

function extractRoutes() {
  const appTsx = fs.readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf-8');
  const routeRegex = /<Route\s+path="([^"]+)"/g;
  const routes = [];
  let match;
  while ((match = routeRegex.exec(appTsx)) !== null) {
    const p = match[1];
    // Skip dynamic routes, admin routes, catch-all, and relative admin sub-paths
    if (p.includes(':') || p.startsWith('/admin') || p === '*') continue;
    // Skip relative paths (nested admin routes like "messages", "subscribers")
    if (!p.startsWith('/')) continue;
    routes.push(p);
  }
  return [...new Set(routes)];
}

// ─── 2. Extract paths from generate-static-pages.cjs ────────────────────────

function extractMetaPaths() {
  const script = fs.readFileSync(path.join(ROOT, 'scripts/generate-static-pages.cjs'), 'utf-8');

  const paths = new Set();

  // Match { path: '...' in staticPages array
  const staticPathRegex = /\{\s*path:\s*'([^']+)'/g;
  let match;
  while ((match = staticPathRegex.exec(script)) !== null) {
    paths.add(match[1]);
  }

  // Match template literal paths like `/brokers/${slug}/minimum-deposit`
  // These are generated programmatically for each broker slug
  const brokerSlugsMatch = script.match(/const brokerSlugs\s*=\s*\{([^}]+)\}/s);
  if (brokerSlugsMatch) {
    const slugEntries = brokerSlugsMatch[1].matchAll(/['"]?([a-z0-9-]+)['"]?\s*:/g);
    for (const entry of slugEntries) {
      const slug = entry[1];
      paths.add(`/brokers/${slug}/minimum-deposit`);
      paths.add(`/brokers/${slug}/spreads`);
      paths.add(`/brokers/${slug}/fees`);
    }
  }

  // Match blog slugs: { slug: '...'
  const blogSlugRegex = /\{\s*slug:\s*'([^']+)'/g;
  while ((match = blogSlugRegex.exec(script)) !== null) {
    paths.add(`/blog/${match[1]}`);
  }

  return [...paths];
}

// ─── 3. Extract URLs from sitemap.xml ────────────────────────────────────────

function extractSitemapPaths() {
  const sitemap = fs.readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf-8');
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const paths = [];
  let match;
  while ((match = locRegex.exec(sitemap)) !== null) {
    const url = match[1];
    // Strip domain, keep path
    const p = url.replace(/^https?:\/\/[^/]+/, '');
    // Remove trailing slash for comparison (but keep "/" for root)
    const normalized = p === '/' ? '/' : p.replace(/\/$/, '');
    paths.push(normalized);
  }
  return [...new Set(paths)];
}

// ─── 4. Validate affiliate URLs in brokers.ts ────────────────────────────────

function validateAffiliateUrls() {
  const brokersTs = fs.readFileSync(path.join(ROOT, 'src/lib/brokers.ts'), 'utf-8');
  const issues = [];

  // Find all affiliateUrl and siteUrl values
  const urlRegex = /(affiliateUrl|siteUrl):\s*(?:env\.\w+\s*\|\|\s*)?["']([^"']*)["']/g;
  let match;
  while ((match = urlRegex.exec(brokersTs)) !== null) {
    const field = match[1];
    const url = match[2];

    if (!url || url.trim() === '') {
      // Empty is acceptable for some brokers (not yet set up)
      continue;
    }

    // Check well-formed URL
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') {
        issues.push({ field, url, issue: `Uses ${parsed.protocol} instead of https:` });
      }
    } catch (e) {
      issues.push({ field, url, issue: 'Malformed URL' });
    }
  }

  // Also find env-only patterns like: env.VITE_X || "fallback"
  // and direct env references without fallback
  const envOnlyRegex = /(affiliateUrl|siteUrl):\s*env\.(\w+)/g;
  while ((match = envOnlyRegex.exec(brokersTs)) !== null) {
    // These are fine as long as there's a fallback — already handled above
  }

  return issues;
}

// ─── 5. Cross-reference and report ───────────────────────────────────────────

function normalize(p) {
  if (p === '/') return '/';
  return p.replace(/\/$/, '');
}

function run() {
  const routes = extractRoutes().map(normalize);
  const metaPaths = extractMetaPaths().map(normalize);
  const sitemapPaths = extractSitemapPaths().map(normalize);

  const routeSet = new Set(routes);
  const metaSet = new Set(metaPaths);
  const sitemapSet = new Set(sitemapPaths);

  // Blog posts from generate-static-pages are dynamic (/blog/:slug) in App.tsx
  // so they won't appear in routes — filter them for route comparisons
  const blogMetaPaths = metaPaths.filter(p => p.startsWith('/blog/') && p !== '/blog');
  const blogSitemapPaths = sitemapPaths.filter(p => p.startsWith('/blog/') && p !== '/blog');

  // Broker info paths are dynamic (/brokers/:brokerId/xxx) in App.tsx
  const brokerInfoPattern = /^\/brokers\/[^/]+\/(minimum-deposit|spreads|fees)$/;
  const brokerInfoMetaPaths = metaPaths.filter(p => brokerInfoPattern.test(p));
  const brokerInfoSitemapPaths = sitemapPaths.filter(p => brokerInfoPattern.test(p));

  // TR blog paths are also dynamic
  const trBlogMetaPaths = metaPaths.filter(p => p.startsWith('/tr/blog/') && p !== '/tr/blog');
  const trBlogSitemapPaths = sitemapPaths.filter(p => p.startsWith('/tr/blog/') && p !== '/tr/blog');

  // For route comparison, exclude blog posts, broker info, and TR blog paths from meta/sitemap
  const staticMetaPaths = metaPaths.filter(p =>
    !blogMetaPaths.includes(p) &&
    !brokerInfoMetaPaths.includes(p) &&
    !trBlogMetaPaths.includes(p)
  );
  const staticSitemapPaths = sitemapPaths.filter(p =>
    !blogSitemapPaths.includes(p) &&
    !brokerInfoSitemapPaths.includes(p) &&
    !trBlogSitemapPaths.includes(p)
  );

  const staticMetaSet = new Set(staticMetaPaths);
  const staticSitemapSet = new Set(staticSitemapPaths);

  console.log('='.repeat(70));
  console.log('  PAGE CONSISTENCY AUDIT');
  console.log('='.repeat(70));
  console.log(`\n  Routes in App.tsx (static):  ${routes.length}`);
  console.log(`  Paths in generate-static-pages.cjs:  ${metaPaths.length}`);
  console.log(`  URLs in sitemap.xml:  ${sitemapPaths.length}`);

  // --- Issue 1: Routes missing from generate-static-pages.cjs ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [1] ROUTES MISSING FROM generate-static-pages.cjs (no SEO meta)');
  console.log('-'.repeat(70));
  const missingMeta = routes.filter(r => !metaSet.has(r));
  if (missingMeta.length === 0) {
    console.log('  None — all routes have meta tags.');
  } else {
    missingMeta.forEach(r => console.log(`  MISSING:  ${r}`));
  }

  // --- Issue 2: Routes missing from sitemap.xml ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [2] ROUTES MISSING FROM sitemap.xml');
  console.log('-'.repeat(70));
  const missingSitemap = routes.filter(r => !sitemapSet.has(r));
  if (missingSitemap.length === 0) {
    console.log('  None — all routes are in the sitemap.');
  } else {
    missingSitemap.forEach(r => console.log(`  MISSING:  ${r}`));
  }

  // --- Issue 3: Sitemap entries that don't match any route ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [3] SITEMAP ENTRIES WITH NO MATCHING ROUTE');
  console.log('-'.repeat(70));
  const orphanSitemap = staticSitemapPaths.filter(p => !routeSet.has(p));
  if (orphanSitemap.length === 0) {
    console.log('  None — all sitemap entries match a route.');
  } else {
    orphanSitemap.forEach(p => console.log(`  ORPHAN:   ${p}`));
  }

  // --- Issue 4: Pages in generate-static-pages.cjs that don't match any route ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [4] PAGES IN generate-static-pages.cjs WITH NO MATCHING ROUTE');
  console.log('-'.repeat(70));
  const orphanMeta = staticMetaPaths.filter(p => !routeSet.has(p));
  if (orphanMeta.length === 0) {
    console.log('  None — all meta entries match a route.');
  } else {
    orphanMeta.forEach(p => console.log(`  ORPHAN:   ${p}`));
  }

  // --- Issue 5: Blog posts in meta but not in sitemap ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [5] BLOG POSTS IN generate-static-pages.cjs BUT NOT IN sitemap.xml');
  console.log('-'.repeat(70));
  const blogMissingFromSitemap = blogMetaPaths.filter(p => !sitemapSet.has(p));
  if (blogMissingFromSitemap.length === 0) {
    console.log('  None — all blog posts are in the sitemap.');
  } else {
    blogMissingFromSitemap.forEach(p => console.log(`  MISSING:  ${p}`));
  }

  // --- Issue 6: Blog posts in sitemap but not in generate-static-pages.cjs ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [6] BLOG POSTS IN sitemap.xml BUT NOT IN generate-static-pages.cjs');
  console.log('-'.repeat(70));
  const blogMissingFromMeta = blogSitemapPaths.filter(p => !metaSet.has(p));
  if (blogMissingFromMeta.length === 0) {
    console.log('  None — all sitemap blog posts have meta tags.');
  } else {
    blogMissingFromMeta.forEach(p => console.log(`  MISSING:  ${p}`));
  }

  // --- Issue 7: Broker info pages in meta but not in sitemap ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [7] BROKER INFO PAGES: META vs SITEMAP MISMATCHES');
  console.log('-'.repeat(70));
  const brokerInfoMissingFromSitemap = brokerInfoMetaPaths.filter(p => !sitemapSet.has(p));
  const brokerInfoMissingFromMeta = brokerInfoSitemapPaths.filter(p => !metaSet.has(p));
  if (brokerInfoMissingFromSitemap.length === 0 && brokerInfoMissingFromMeta.length === 0) {
    console.log('  None — broker info pages are consistent.');
  } else {
    if (brokerInfoMissingFromSitemap.length > 0) {
      console.log('  In meta but not sitemap:');
      brokerInfoMissingFromSitemap.forEach(p => console.log(`    MISSING:  ${p}`));
    }
    if (brokerInfoMissingFromMeta.length > 0) {
      console.log('  In sitemap but not meta:');
      brokerInfoMissingFromMeta.forEach(p => console.log(`    MISSING:  ${p}`));
    }
  }

  // --- Issue 8: TR pages in meta but not in sitemap (as <loc>) ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [8] TR PAGES: ROUTES/META vs SITEMAP');
  console.log('-'.repeat(70));
  const trRoutes = routes.filter(r => r.startsWith('/tr'));
  const trMetaPaths2 = metaPaths.filter(p => p.startsWith('/tr'));
  // Check which TR <loc> entries exist in sitemap (not just hreflang refs)
  const trSitemapLocs = sitemapPaths.filter(p => p.startsWith('/tr'));
  const trMissingFromSitemap = trRoutes.filter(r => !sitemapSet.has(r));
  if (trMissingFromSitemap.length === 0) {
    console.log('  All TR routes are in sitemap.');
  } else {
    console.log('  TR routes missing from sitemap <loc> entries:');
    trMissingFromSitemap.forEach(p => console.log(`    MISSING:  ${p}`));
  }
  const trMetaMissingFromSitemap = trMetaPaths2.filter(p => !sitemapSet.has(p));
  if (trMetaMissingFromSitemap.length > 0) {
    console.log('  TR meta paths missing from sitemap <loc> entries:');
    trMetaMissingFromSitemap.forEach(p => console.log(`    MISSING:  ${p}`));
  }

  // --- Affiliate URL validation ---
  console.log('\n' + '-'.repeat(70));
  console.log('  [9] AFFILIATE/SITE URL VALIDATION (brokers.ts)');
  console.log('-'.repeat(70));
  const urlIssues = validateAffiliateUrls();
  if (urlIssues.length === 0) {
    console.log('  All affiliate/site URLs are well-formed and use HTTPS.');
  } else {
    urlIssues.forEach(({ field, url, issue }) => {
      console.log(`  ISSUE:  ${field} = "${url}"`);
      console.log(`          ${issue}`);
    });
  }

  // --- Summary ---
  const totalIssues =
    missingMeta.length +
    missingSitemap.length +
    orphanSitemap.length +
    orphanMeta.length +
    blogMissingFromSitemap.length +
    blogMissingFromMeta.length +
    brokerInfoMissingFromSitemap.length +
    brokerInfoMissingFromMeta.length +
    trMissingFromSitemap.length +
    trMetaMissingFromSitemap.length +
    urlIssues.length;

  console.log('\n' + '='.repeat(70));
  console.log(`  TOTAL ISSUES FOUND: ${totalIssues}`);
  console.log('='.repeat(70));
}

run();
