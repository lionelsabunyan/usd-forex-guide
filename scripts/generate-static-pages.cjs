#!/usr/bin/env node
/**
 * generate-static-pages.cjs
 *
 * Replaces react-snap for static HTML prerendering.
 * Pure Node.js — no Puppeteer, no headless browser.
 *
 * For each defined page, creates a flat .html file (e.g. dist/brokers.html)
 * instead of directory-based index.html to avoid Cloudflare Pages 308 redirects.
 *
 * Cloudflare Pages serves .html files without extension, so /brokers → dist/brokers.html (200).
 *
 * Each page gets dist/index.html as template with injected:
 *   - <title>
 *   - <meta name="description">
 *   - <link rel="canonical">
 *   - og:title, og:description, og:url
 *
 * This ensures crawlers receive correct meta tags without needing
 * to execute JavaScript.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '../dist');
const SITE_URL = 'https://beginnerfxguide.com';

// ─── Static page definitions ─────────────────────────────────────────────────
const staticPages = [
  // Main pages
  { path: '/', title: 'Best Forex Brokers for US Traders 2026 | US Forex Guide', desc: 'Compare the best forex brokers for US traders. Expert reviews, regulatory info, and honest ratings to help American beginners start trading safely.' },
  { path: '/brokers', title: 'Best Forex Brokers for US Traders | US Forex Guide', desc: 'Find the best forex brokers accepting US traders. Compare spreads, leverage, regulation, and account types side by side.' },
  { path: '/compare', title: 'Compare Forex Brokers | US Forex Guide', desc: 'Compare forex brokers side-by-side. Evaluate spreads, fees, leverage, regulation and more to find the right broker.' },
  { path: '/guides', title: 'Forex Trading Guides for Beginners | US Forex Guide', desc: 'Comprehensive forex trading guides for American beginners. Learn regulations, strategies, and how to choose the right broker.' },
  { path: '/tools', title: 'Forex Trading Tools & Calculators | US Forex Guide', desc: 'Free forex calculators: pip calculator, position size, margin, profit/loss and more. Essential tools for US forex traders.' },
  { path: '/blog', title: 'Forex Trading Blog for US Traders | US Forex Guide', desc: 'Latest forex trading articles, broker news, and educational content for US traders. Stay informed with expert analysis.' },
  { path: '/faq', title: 'Forex Trading FAQ for US Traders | US Forex Guide', desc: 'Answers to the most common questions about forex trading in the USA. Regulations, brokers, taxes, and how to get started.' },
  { path: '/glossary', title: 'Forex Trading Glossary | US Forex Guide', desc: 'Complete A-Z forex trading glossary. Definitions of 65+ trading terms for US beginners.' },
  { path: '/about', title: 'About Us | US Forex Guide', desc: 'Learn about US Forex Guide — our mission, methodology, and how we review and rate forex brokers for American traders.' },
  { path: '/contact', title: 'Contact Us | US Forex Guide', desc: 'Get in touch with the US Forex Guide team. Questions, feedback, or partnership inquiries welcome.' },

  // Broker Reviews
  { path: '/review/fxglory', title: 'FXGlory Review 2026 | US Forex Guide', desc: 'Honest FXGlory review for US traders. Offshore broker with high leverage. We tested deposits, spreads, and support so you don\'t have to.' },
  { path: '/review/hankotrade', title: 'Hankotrade Review 2026 | US Forex Guide', desc: 'In-depth Hankotrade review for US traders. Offshore broker with Bitcoin deposits and high leverage. Real test results inside.' },
  { path: '/review/midasfx', title: 'MidasFX Review 2026 | US Forex Guide', desc: 'MidasFX broker review for US traders. Offshore broker with competitive spreads. Pros, cons, and US trader eligibility.' },
  { path: '/review/n1cm', title: 'N1CM Review 2026 | US Forex Guide', desc: 'N1CM broker review for US traders. Multi-asset offshore broker. We tested trading conditions, withdrawal speed, and support.' },
  { path: '/review/oanda', title: 'OANDA Review 2026 | US Forex Guide', desc: 'OANDA review for US traders. CFTC/NFA regulated US broker with tight spreads and no minimum deposit. Detailed analysis inside.' },
  { path: '/review/forexcom', title: 'Forex.com Review 2026 | US Forex Guide', desc: 'Forex.com review for US traders. Regulated by CFTC/NFA. Compare spreads, platforms, and account types for American traders.' },
  { path: '/review/ig-markets', title: 'IG Markets Review 2026 | US Forex Guide', desc: 'IG Markets review for US traders. Regulated forex and CFD broker. Comprehensive analysis of spreads, platforms, and US account options.' },
  { path: '/review/interactive-brokers', title: 'Interactive Brokers Forex Review 2026 | US Forex Guide', desc: 'Interactive Brokers forex review for US traders. Low-cost, highly regulated broker. Spreads, commissions, and platform analysis.' },
  { path: '/review/tastyfx', title: 'tastyfx Review 2026 | US Forex Guide', desc: 'tastyfx (formerly IG US) review for American traders. CFTC regulated, transparent pricing, and innovative platform for US forex traders.' },
  { path: '/review/charles-schwab', title: 'Charles Schwab Forex Review 2026 | US Forex Guide', desc: 'Charles Schwab forex trading review for US traders. Regulated broker, known for stocks but also offers forex. Full analysis.' },
  { path: '/review/etoro', title: 'eToro Review 2026 | US Forex Guide', desc: 'eToro review for US traders. Social trading platform with copy trading. FINRA regulated. Spreads, fees, and US account features.' },
  { path: '/review/fxpro', title: 'FxPro Review 2026 | US Forex Guide', desc: 'FxPro review for US traders. Multi-regulated broker with 4 platforms. We tested execution, spreads, and US trader eligibility.' },
  { path: '/review/avatrade', title: 'AvaTrade Review 2026 | US Forex Guide', desc: 'AvaTrade review for US traders. Multi-regulated broker with fixed spreads. Platforms, account types, and US accessibility explained.' },
  { path: '/review/hfm', title: 'HFM Review 2026 | US Forex Guide', desc: 'HFM (HF Markets) review for US traders. CySEC-regulated broker with low spreads. Platforms, bonuses, and US account availability.' },
  { path: '/review/lmfx', title: 'LMFX Review 2026 | US Forex Guide', desc: 'LMFX review for US traders. Offshore broker with no minimum deposit. Spreads, leverage, and US trader eligibility analysis.' },
  { path: '/review/coinexx', title: 'Coinexx Review 2026 | US Forex Guide', desc: 'Coinexx review for US traders. Crypto-based offshore forex broker. Bitcoin deposits, spreads, and US trader access reviewed.' },
  { path: '/review/plexytrade', title: 'PlexyTrade Review 2026 | US Forex Guide', desc: 'PlexyTrade review for US traders. Offshore broker with multiple account types. We reviewed spreads, leverage, and withdrawals.' },
  { path: '/review/exness', title: 'Exness Review 2026 | US Forex Guide', desc: 'Exness review for US traders. Highly regulated broker with ultra-low spreads. Do they accept US clients? Full analysis.' },
  { path: '/review/pepperstone', title: 'Pepperstone Review 2026 | US Forex Guide', desc: 'Pepperstone review for US traders. FCA/ASIC regulated broker with RAW spreads. US account eligibility and trading conditions.' },
  { path: '/review/xm', title: 'XM Review 2026 | US Forex Guide', desc: 'XM broker review for US traders. CySEC regulated with 1000+ instruments. Spreads, no-deposit bonus, and US trader access.' },
  { path: '/review/fxtm', title: 'FXTM Review 2026 | US Forex Guide', desc: 'FXTM (ForexTime) review for US traders. FCA/CySEC regulated multi-account broker. Spreads, leverage, and US eligibility.' },
  { path: '/review/fbs', title: 'FBS Review 2026 | US Forex Guide', desc: 'FBS review for US traders. Offshore broker with $1 minimum deposit and bonuses. Spreads, leverage, and US account access.' },

  // Guides
  { path: '/guides/forex-trading-usa', title: 'Forex Trading in the USA: Complete Guide 2026 | US Forex Guide', desc: 'Complete guide to forex trading in the USA. Regulations, legal brokers, tax implications, and how to get started safely as a US trader.' },
  { path: '/guides/beginners-guide', title: 'Forex Trading Beginner\'s Guide 2026 | US Forex Guide', desc: 'Step-by-step forex trading guide for beginners. Learn currency pairs, pips, leverage, and how to place your first trade safely.' },
  { path: '/guides/us-forex-regulations', title: 'US Forex Regulations Explained 2026 | US Forex Guide', desc: 'Everything US traders need to know about CFTC and NFA forex regulations. Legal requirements, FIFO rule, and compliance guide.' },
  { path: '/guides/broker-comparison', title: 'How to Compare Forex Brokers | US Forex Guide', desc: 'Expert guide on how to compare forex brokers. What to look for in spreads, regulation, platforms, and customer support.' },
  { path: '/guides/risk-management', title: 'Forex Risk Management Guide | US Forex Guide', desc: 'Essential risk management strategies for forex traders. Position sizing, stop-loss, leverage control, and protecting your capital.' },
  { path: '/guides/technical-analysis', title: 'Forex Technical Analysis for Beginners | US Forex Guide', desc: 'Introduction to technical analysis for forex traders. Charts, indicators, patterns, and how to use them in your trading strategy.' },
  { path: '/guides/fundamental-analysis', title: 'Forex Fundamental Analysis Guide | US Forex Guide', desc: 'Learn fundamental analysis for forex trading. Economic indicators, central bank decisions, and how they move currency pairs.' },
  { path: '/guides/how-we-review', title: 'How We Review Forex Brokers | US Forex Guide', desc: 'Our transparent methodology for reviewing and rating forex brokers. Learn how we test spreads, support, regulation, and more.' },

  // Tools
  { path: '/tools/pip-calculator', title: 'Forex Pip Calculator | US Forex Guide', desc: 'Free pip value calculator for forex traders. Calculate pip values in USD for any currency pair and account size.' },
  { path: '/tools/position-size-calculator', title: 'Forex Position Size Calculator | US Forex Guide', desc: 'Calculate optimal position size for your forex trades. Manage risk with precise lot sizing based on account balance and risk %.' },
  { path: '/tools/margin-calculator', title: 'Forex Margin Calculator | US Forex Guide', desc: 'Calculate required margin for forex positions. Know exactly how much capital you need before opening a trade.' },
  { path: '/tools/profit-loss-calculator', title: 'Forex Profit & Loss Calculator | US Forex Guide', desc: 'Calculate potential profit or loss on forex trades. Enter entry, exit, and lot size to see your P&L instantly.' },
  { path: '/tools/forex-tax-calculator', title: 'Forex Tax Calculator for US Traders | US Forex Guide', desc: 'Estimate forex trading taxes for US traders. Section 1256 vs 988 treatment, 60/40 rule, and tax liability calculator.' },
  { path: '/tools/economic-calendar', title: 'Forex Economic Calendar | US Forex Guide', desc: 'Live economic calendar for forex traders. Track upcoming news events, central bank meetings, and market-moving releases.' },

  // Compare
  { path: '/compare/midasfx-vs-hankotrade', title: 'MidasFX vs Hankotrade Comparison 2026 | US Forex Guide', desc: 'Head-to-head comparison of MidasFX and Hankotrade for US traders. Compare spreads, leverage, deposits, and overall value.' },

  // Resources
  { path: '/resources/us-forex-checklist', title: 'US Forex Trader Checklist | US Forex Guide', desc: 'Complete checklist for US forex traders before opening an account. Regulations, broker vetting, and risk management checklist.' },

  // Legal
  { path: '/legal/privacy', title: 'Privacy Policy | US Forex Guide', desc: 'Privacy policy for US Forex Guide. Learn how we collect, use, and protect your personal information.' },
  { path: '/legal/terms', title: 'Terms of Service | US Forex Guide', desc: 'Terms of service for US Forex Guide. Rules and conditions for using our website and content.' },
  { path: '/legal/disclaimer', title: 'Disclaimer | US Forex Guide', desc: 'Important disclaimer for US Forex Guide. Trading involves risk. Read before using our content for investment decisions.' },
  { path: '/legal/affiliate-disclosure', title: 'Affiliate Disclosure | US Forex Guide', desc: 'Affiliate disclosure for US Forex Guide. We earn commissions from brokers — here\'s how it affects our reviews.' },
];

// ─── Blog posts ───────────────────────────────────────────────────────────────
// Manually maintained to avoid TypeScript compilation at build time.
// Keep in sync with src/lib/blog.ts
const blogPages = [
  { slug: 'how-to-start-forex-trading-usa-2026', title: 'How to Start Forex Trading in the USA: Complete Beginner\'s Roadmap 2026', excerpt: 'A comprehensive step-by-step guide for American beginners who want to start forex trading.' },
  { slug: 'best-forex-brokers-us-traders-2026', title: 'Best Forex Brokers for US Traders 2026: Top Picks Tested & Reviewed', excerpt: 'We tested and ranked the best forex brokers accepting US traders in 2026.' },
  { slug: 'how-to-open-offshore-forex-account-usa', title: 'How to Open an Offshore Forex Account as a US Trader', excerpt: 'Step-by-step guide on how US traders can open and fund an offshore forex account legally.' },
  { slug: 'why-us-traders-choose-offshore-brokers', title: 'Why US Traders Choose Offshore Forex Brokers', excerpt: 'Explore why many American traders prefer offshore forex brokers and what the risks are.' },
  { slug: 'cfdc-vs-offshore-forex-trading', title: 'CFTC-Regulated vs Offshore Forex Brokers: Which is Right for You?', excerpt: 'Compare regulated US brokers vs offshore brokers. Pros, cons, and which suits different trading styles.' },
  { slug: 'crypto-deposits-forex-trading', title: 'Crypto Deposits for Forex Trading: Complete Guide for US Traders', excerpt: 'Learn how US traders can use Bitcoin and crypto to fund offshore forex accounts safely.' },
  { slug: 'forex-trading-taxes-usa', title: 'Forex Trading Taxes in the USA: Complete 2026 Guide', excerpt: 'Everything US forex traders need to know about taxes. Section 1256 vs 988 rules explained.' },
  { slug: 'fxglory-vs-hankotrade-comparison', title: 'FXGlory vs Hankotrade: Which Offshore Broker Wins for US Traders?', excerpt: 'Detailed FXGlory vs Hankotrade comparison for US traders. Spreads, leverage, deposits, and verdict.' },
  { slug: 'forex-trading-psychology-emotions', title: 'Forex Trading Psychology: How to Control Your Emotions', excerpt: 'Master the mental side of forex trading. Deal with fear, greed, and FOMO like a professional trader.' },
  { slug: 'currency-pairs-explained-beginners', title: 'Currency Pairs Explained for Beginners: Major, Minor & Exotic', excerpt: 'Everything beginners need to know about forex currency pairs. Majors, minors, exotics explained simply.' },
  { slug: 'best-forex-strategies-beginners', title: 'Best Forex Trading Strategies for Beginners in 2026', excerpt: 'Top beginner-friendly forex strategies with real examples. Trend following, price action, and more.' },
  { slug: 'forex-scams-avoid', title: 'Forex Scams to Avoid in 2026: Red Flags Every US Trader Must Know', excerpt: 'Protect yourself from forex scams. Learn the most common fraud tactics and how to spot them early.' },
  { slug: 'mt4-vs-mt5-which-platform', title: 'MT4 vs MT5: Which Trading Platform Should You Use?', excerpt: 'MetaTrader 4 vs MetaTrader 5 for US traders. Features, differences, and which to choose.' },
  { slug: 'forex-leverage-explained', title: 'Forex Leverage Explained: How It Works and Why US Rules Are Different', excerpt: 'Complete guide to forex leverage for US traders. CFTC limits, offshore options, and risk management.' },
  { slug: 'forex-spreads-explained', title: 'Forex Spreads Explained: How to Calculate and Compare Broker Costs', excerpt: 'Understand forex spreads and how they affect your trading costs. Fixed vs variable spreads compared.' },
  { slug: 'forex-demo-account-guide', title: 'Forex Demo Account Guide: How to Practice Before Going Live', excerpt: 'How to use a forex demo account effectively. Tips to practice real trading without risking money.' },
  { slug: 'forex-risk-management-guide', title: 'Forex Risk Management Guide: Protect Your Trading Capital', excerpt: 'Essential risk management rules for forex traders. Stop-loss placement, position sizing, and more.' },
  { slug: 'forex-trading-hours-best-times', title: 'Forex Trading Hours: Best Times to Trade for US Traders', excerpt: 'Learn the best trading hours for US forex traders. Market sessions, overlaps, and when volatility peaks.' },
];

// ─── Helper: escape for HTML attributes ──────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─── Core: inject meta tags into HTML template ───────────────────────────────
function injectMeta(template, { title, desc, canonical, ogImage }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(desc);
  const safeCanonical = escapeHtml(canonical);
  const safeOgImage = escapeHtml(ogImage || `${SITE_URL}/images/og/og-default.png`);

  let html = template;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // Replace or insert meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${safeDesc}"`);
  } else {
    html = html.replace('</title>', `</title>\n  <meta name="description" content="${safeDesc}" />`);
  }

  // Replace canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${safeCanonical}"`);
  } else {
    html = html.replace('</title>', `</title>\n  <link rel="canonical" href="${safeCanonical}" />`);
  }

  // Replace Open Graph tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${safeTitle}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${safeDesc}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${safeCanonical}"`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${safeOgImage}"`);

  // Replace Twitter Card tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${safeTitle}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${safeDesc}"`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${safeOgImage}"`);

  return html;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  const templatePath = path.join(DIST, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  let created = 0;
  let skipped = 0;

  // Process static pages
  for (const page of staticPages) {
    if (page.path === '/') {
      // Root page: update dist/index.html in-place
      const updatedRoot = injectMeta(template, {
        title: page.title,
        desc: page.desc,
        canonical: SITE_URL,
      });
      fs.writeFileSync(templatePath, updatedRoot, 'utf8');
      console.log('✅  Updated /index.html (root)');
      created++;
      continue;
    }

    // Flat file approach: /brokers → dist/brokers.html
    // Cloudflare Pages serves .html files without extension (200, no redirect)
    // This eliminates the 308 trailing-slash redirect that caused redirect loops
    const filePath = path.join(DIST, `${page.path}.html`);
    const dirPath = path.dirname(filePath);
    const canonical = `${SITE_URL}${page.path}`;

    fs.mkdirSync(dirPath, { recursive: true });

    const html = injectMeta(template, {
      title: page.title,
      desc: page.desc,
      canonical,
    });

    fs.writeFileSync(filePath, html, 'utf8');
    created++;
  }

  // Process blog pages
  for (const post of blogPages) {
    const pagePath = `/blog/${post.slug}`;
    // Flat file: /blog/slug → dist/blog/slug.html (no 308 redirect)
    const filePath = path.join(DIST, `${pagePath}.html`);
    const dirPath = path.dirname(filePath);
    const canonical = `${SITE_URL}${pagePath}`;

    fs.mkdirSync(dirPath, { recursive: true });

    const title = post.title.includes('US Forex Guide') ? post.title : `${post.title} | US Forex Guide`;
    const html = injectMeta(template, {
      title,
      desc: post.excerpt,
      canonical,
    });

    fs.writeFileSync(filePath, html, 'utf8');
    created++;
  }

  // Also create a proper 200.html and 404.html from root index
  const fallbackHtml = fs.readFileSync(templatePath, 'utf8');
  fs.writeFileSync(path.join(DIST, '200.html'), fallbackHtml, 'utf8');

  const html404 = injectMeta(template, {
    title: '404 - Page Not Found | US Forex Guide',
    desc: 'The page you are looking for does not exist. Return to US Forex Guide homepage.',
    canonical: SITE_URL,
  });
  fs.writeFileSync(path.join(DIST, '404.html'), html404, 'utf8');

  console.log(`\n✅  Static page generation complete: ${created} pages created`);
  if (skipped > 0) console.log(`⚠️   ${skipped} pages skipped`);
}

main();
