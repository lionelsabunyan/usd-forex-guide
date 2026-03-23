/**
 * Internal Link Audit Script
 * Parses all page components to build an internal link matrix,
 * identifies orphan pages, and reports underlinked pages.
 *
 * Usage: node scripts/audit-internal-links.cjs
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

// All known routes (EN only, excluding admin)
const ALL_ROUTES = [
  '/',
  '/brokers',
  '/brokers/australia',
  '/brokers/uk',
  '/compare',
  '/compare/midasfx-vs-hankotrade',
  '/compare/oanda-vs-forexcom',
  '/compare/etoro-vs-xm',
  '/compare/pepperstone-vs-exness',
  '/compare/ig-vs-interactive-brokers',
  '/compare/etoro-vs-oanda',
  '/compare/pepperstone-vs-xm',
  '/compare/tastyfx-vs-forexcom',
  '/compare/avatrade-vs-etoro',
  '/compare/oanda-vs-ig-markets',
  '/compare/charles-schwab-vs-interactive-brokers',
  '/compare/xm-vs-fxtm',
  '/guides',
  '/guides/beginners-guide',
  '/guides/us-forex-regulations',
  '/guides/broker-comparison',
  '/guides/risk-management',
  '/guides/technical-analysis',
  '/guides/fundamental-analysis',
  '/guides/how-we-review',
  '/guides/forex-trading-usa',
  '/tools',
  '/tools/pip-calculator',
  '/tools/position-size-calculator',
  '/tools/forex-tax-calculator',
  '/tools/margin-calculator',
  '/tools/profit-loss-calculator',
  '/tools/economic-calendar',
  '/tools/trading-sessions',
  '/faq',
  '/about',
  '/contact',
  '/glossary',
  '/blog',
  '/review/fxglory',
  '/review/hankotrade',
  '/review/midasfx',
  '/review/n1cm',
  '/review/etoro',
  '/review/fxpro',
  '/review/oanda',
  '/review/ig-markets',
  '/review/forexcom',
  '/review/interactive-brokers',
  '/review/avatrade',
  '/review/charles-schwab',
  '/review/tastyfx',
  '/review/hfm',
  '/review/lmfx',
  '/review/coinexx',
  '/review/plexytrade',
  '/review/exness',
  '/review/pepperstone',
  '/review/xm',
  '/review/fxtm',
  '/review/fbs',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclaimer',
  '/legal/affiliate-disclosure',
  '/resources/us-forex-checklist',
  '/resources/infographics',
];

// Map routes to their source files (approximate)
const ROUTE_TO_FILE = {
  '/': 'pages/Index.tsx',
  '/brokers': 'pages/BrokersPage.tsx',
  '/brokers/australia': 'pages/BestBrokersAustralia.tsx',
  '/brokers/uk': 'pages/BestBrokersUK.tsx',
  '/compare': 'pages/ComparePage.tsx',
  '/guides': 'pages/GuidesPage.tsx',
  '/tools': 'pages/tools/ToolsPage.tsx',
  '/faq': 'pages/FAQPage.tsx',
  '/about': 'pages/AboutPage.tsx',
  '/contact': 'pages/ContactPage.tsx',
  '/glossary': 'pages/GlossaryPage.tsx',
  '/blog': 'pages/blog/BlogPage.tsx',
  '/guides/beginners-guide': 'pages/guides/BeginnersGuide.tsx',
  '/guides/us-forex-regulations': 'pages/guides/USForexRegulations.tsx',
  '/guides/broker-comparison': 'pages/guides/BrokerComparisonGuide.tsx',
  '/guides/risk-management': 'pages/guides/RiskManagement.tsx',
  '/guides/technical-analysis': 'pages/guides/TechnicalAnalysis.tsx',
  '/guides/fundamental-analysis': 'pages/guides/FundamentalAnalysis.tsx',
  '/guides/how-we-review': 'pages/guides/HowWeReview.tsx',
  '/guides/forex-trading-usa': 'pages/guides/USForexTradingGuide.tsx',
  '/tools/pip-calculator': 'pages/tools/PipCalculator.tsx',
  '/tools/position-size-calculator': 'pages/tools/PositionSizeCalculator.tsx',
  '/tools/forex-tax-calculator': 'pages/tools/ForexTaxCalculator.tsx',
  '/tools/margin-calculator': 'pages/tools/MarginCalculator.tsx',
  '/tools/profit-loss-calculator': 'pages/tools/ProfitLossCalculator.tsx',
  '/tools/economic-calendar': 'pages/tools/EconomicCalendar.tsx',
  '/tools/trading-sessions': 'pages/tools/TradingSessionsClock.tsx',
  '/legal/privacy': 'pages/legal/PrivacyPolicy.tsx',
  '/legal/terms': 'pages/legal/TermsOfService.tsx',
  '/legal/disclaimer': 'pages/legal/Disclaimer.tsx',
  '/legal/affiliate-disclosure': 'pages/legal/AffiliateDisclosure.tsx',
  '/resources/us-forex-checklist': 'pages/resources/USForexChecklist.tsx',
  '/resources/infographics': 'pages/resources/InfographicsPage.tsx',
};

// Also scan shared components for site-wide links
const SHARED_FILES = [
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/MobileStickyFooter.tsx',
  'components/PopularReviews.tsx',
  'components/BrokerComparison.tsx',
  'components/BlogPreview.tsx',
  'components/HowItWorks.tsx',
];

function extractInternalLinks(content) {
  const links = new Set();

  // Match Link to="..." or to={'...'}
  const linkToRegex = /(?:to|href)=["'{]([/"'][^"'{}]*?)["'}]/g;
  let match;
  while ((match = linkToRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/admin')) {
      // Normalize: remove trailing slash except for root
      const normalized = href === '/' ? '/' : href.replace(/\/$/, '');
      links.add(normalized);
    }
  }

  return [...links];
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(path.join(SRC_DIR, filePath), 'utf-8');
    return extractInternalLinks(content);
  } catch {
    return [];
  }
}

// Build link matrix
const linkMatrix = {}; // page -> [pages it links to]
const incomingLinks = {}; // page -> [pages that link to it]

// Initialize
ALL_ROUTES.forEach(route => {
  linkMatrix[route] = new Set();
  incomingLinks[route] = new Set();
});

// Scan page files
for (const [route, file] of Object.entries(ROUTE_TO_FILE)) {
  const links = scanFile(file);
  links.forEach(link => {
    if (linkMatrix[route]) linkMatrix[route].add(link);
    if (incomingLinks[link]) incomingLinks[link].add(route);
  });
}

// Scan shared/navigation components (these link from every page)
const sharedLinks = new Set();
SHARED_FILES.forEach(file => {
  const links = scanFile(file);
  links.forEach(link => sharedLinks.add(link));
});

// Also scan broker review pages (they use review data files)
const reviewDataDir = path.join(SRC_DIR, 'lib', 'reviewData');
if (fs.existsSync(reviewDataDir)) {
  const reviewFiles = fs.readdirSync(reviewDataDir).filter(f => f.endsWith('.ts'));
  reviewFiles.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(reviewDataDir, file), 'utf-8');
      const links = extractInternalLinks(content);
      // These links come from review pages
      const brokerSlug = file.replace('.ts', '').toLowerCase();
      const reviewRoute = `/review/${brokerSlug}`;
      if (linkMatrix[reviewRoute]) {
        links.forEach(link => {
          linkMatrix[reviewRoute].add(link);
          if (incomingLinks[link]) incomingLinks[link].add(reviewRoute);
        });
      }
    } catch {}
  });
}

// Also scan compare pages
const compareDir = path.join(SRC_DIR, 'pages', 'compare');
if (fs.existsSync(compareDir)) {
  const compareFiles = fs.readdirSync(compareDir).filter(f => f.endsWith('.tsx'));
  compareFiles.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(compareDir, file), 'utf-8');
      const links = extractInternalLinks(content);
      // Try to match to a route
      const slug = file.replace('.tsx', '');
      // Find matching compare route
      const matchingRoute = ALL_ROUTES.find(r => r.startsWith('/compare/') && r.includes(slug.toLowerCase().replace(/vs/i, '-vs-')));
      if (matchingRoute && linkMatrix[matchingRoute]) {
        links.forEach(link => {
          linkMatrix[matchingRoute].add(link);
          if (incomingLinks[link]) incomingLinks[link].add(matchingRoute);
        });
      }
    } catch {}
  });
}

// Also scan blog data
const blogDataFiles = [
  'lib/blogPosts.ts',
  'lib/blogData.ts',
];
blogDataFiles.forEach(file => {
  const links = scanFile(file);
  links.forEach(link => {
    // Blog posts link from /blog
    if (linkMatrix['/blog']) linkMatrix['/blog'].add(link);
    if (incomingLinks[link]) incomingLinks[link].add('/blog');
  });
});

// Report
console.log('='.repeat(80));
console.log('INTERNAL LINK AUDIT REPORT');
console.log('Generated:', new Date().toISOString());
console.log('='.repeat(80));

// Orphan pages (no incoming links except from shared navigation)
console.log('\n## ORPHAN PAGES (no contextual incoming links, only nav/footer)\n');
const orphanPages = ALL_ROUTES.filter(route => {
  const incoming = incomingLinks[route];
  return !incoming || incoming.size === 0;
});

if (orphanPages.length === 0) {
  console.log('  None found! All pages have at least one contextual incoming link.');
} else {
  orphanPages.forEach(route => {
    const hasNavLink = sharedLinks.has(route);
    console.log(`  ❌ ${route}${hasNavLink ? ' (has nav link only)' : ' (COMPLETELY ORPHANED)'}`);
  });
}

// Underlinked pages (1-2 incoming links)
console.log('\n## UNDERLINKED PAGES (1-2 contextual incoming links)\n');
const underlinked = ALL_ROUTES.filter(route => {
  const incoming = incomingLinks[route];
  return incoming && incoming.size > 0 && incoming.size <= 2;
});

underlinked.forEach(route => {
  const sources = [...incomingLinks[route]].join(', ');
  console.log(`  ⚠️  ${route} (${incomingLinks[route].size} links from: ${sources})`);
});

// Well-linked pages
console.log('\n## WELL-LINKED PAGES (3+ contextual incoming links)\n');
const wellLinked = ALL_ROUTES.filter(route => {
  const incoming = incomingLinks[route];
  return incoming && incoming.size >= 3;
});

wellLinked.forEach(route => {
  console.log(`  ✅ ${route} (${incomingLinks[route].size} incoming links)`);
});

// Pages with no outgoing links
console.log('\n## PAGES WITH NO OUTGOING LINKS\n');
ALL_ROUTES.forEach(route => {
  const outgoing = linkMatrix[route];
  if (!outgoing || outgoing.size === 0) {
    console.log(`  📭 ${route}`);
  }
});

// Shared navigation links
console.log('\n## SHARED NAVIGATION LINKS (Header/Footer/Nav)\n');
[...sharedLinks].sort().forEach(link => {
  console.log(`  🔗 ${link}`);
});

// Summary statistics
console.log('\n## SUMMARY\n');
console.log(`  Total routes: ${ALL_ROUTES.length}`);
console.log(`  Orphan pages: ${orphanPages.length}`);
console.log(`  Underlinked pages: ${underlinked.length}`);
console.log(`  Well-linked pages: ${wellLinked.length}`);
console.log(`  Shared nav links: ${sharedLinks.size}`);

// Full link matrix (condensed)
console.log('\n## FULL LINK MATRIX\n');
ALL_ROUTES.forEach(route => {
  const outgoing = linkMatrix[route];
  const incoming = incomingLinks[route];
  if ((outgoing && outgoing.size > 0) || (incoming && incoming.size > 0)) {
    console.log(`  ${route}`);
    if (outgoing && outgoing.size > 0) {
      console.log(`    OUT → ${[...outgoing].join(', ')}`);
    }
    if (incoming && incoming.size > 0) {
      console.log(`    IN  ← ${[...incoming].join(', ')}`);
    }
  }
});
