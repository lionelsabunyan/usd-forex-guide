/**
 * Cloudflare Worker for Dynamic Meta Tags
 * Injects proper title, description, canonical for each page
 * Solves CSR SEO problem for React SPA
 */

const SEO_DATA = {
  '/': {
    title: 'Best Forex Brokers for US Traders 2026 | Beginner FX Guide',
    description: 'Compare the best forex brokers that accept US clients in 2026. Unbiased reviews of OANDA, Forex.com, FXGlory & more. Guides, tools, and tips for American traders.',
  },
  '/compare': {
    title: 'Compare Forex Brokers for US Traders 2026 | Side-by-Side Comparison',
    description: 'Compare forex brokers side-by-side. Filter by regulation, leverage, minimum deposit, and more. Find the best broker for your trading style.',
  },
  '/brokers': {
    title: 'Forex Broker Reviews for US Traders 2026 | Expert Analysis',
    description: 'In-depth forex broker reviews for American traders. CFTC-regulated and offshore options analyzed. Find your perfect trading partner.',
  },
  '/blog': {
    title: 'Forex Trading Blog | Tips, Strategies & Market Analysis',
    description: 'Expert forex trading insights, market analysis, and educational content for US traders. Stay informed with our latest articles.',
  },
  '/guides': {
    title: 'Forex Trading Guides for Beginners | Learn to Trade',
    description: 'Comprehensive forex trading guides for beginners. Learn technical analysis, risk management, and trading strategies step by step.',
  },
  '/tools': {
    title: 'Free Forex Trading Tools & Calculators | Pip, Position Size, Tax',
    description: 'Free forex calculators: Pip calculator, position size calculator, margin calculator, and tax calculator for US traders.',
  },
  '/glossary': {
    title: 'Forex Trading Glossary | 65+ Terms Explained',
    description: 'Complete forex trading glossary with 65+ terms explained. From Ask/Bid to Yield Curve - learn the language of forex trading.',
  },
  '/faq': {
    title: 'Forex Trading FAQ | Common Questions Answered',
    description: 'Frequently asked questions about forex trading in the US. Regulations, brokers, taxes, and more explained.',
  },
  '/about': {
    title: 'About Us | Beginner FX Guide',
    description: 'Learn about Beginner FX Guide - your trusted source for unbiased forex broker reviews and trading education for US traders.',
  },
  '/contact': {
    title: 'Contact Us | Beginner FX Guide',
    description: 'Get in touch with the Beginner FX Guide team. Questions, feedback, or partnership inquiries welcome.',
  },
  // Broker Reviews
  '/review/oanda': {
    title: 'OANDA Review 2026 | CFTC-Regulated Broker for US Traders',
    description: 'Complete OANDA review for US traders. CFTC-regulated broker with $0 minimum deposit, 1:50 leverage, and excellent trading platform.',
  },
  '/review/forexcom': {
    title: 'Forex.com Review 2026 | Top US Forex Broker Analysis',
    description: 'In-depth Forex.com review. CFTC-regulated, competitive spreads, advanced platforms. Is it right for you?',
  },
  '/review/ig-markets': {
    title: 'IG Markets Review 2026 | Premium Forex Broker for US',
    description: 'IG Markets review for American traders. CFTC-regulated with 80+ currency pairs and award-winning platform.',
  },
  '/review/interactive-brokers': {
    title: 'Interactive Brokers Forex Review 2026 | Professional Trading',
    description: 'Interactive Brokers forex review. Low costs, professional tools, and access to global markets for serious traders.',
  },
  '/review/tastyfx': {
    title: 'tastyfx Review 2026 | Modern Forex Trading Platform',
    description: 'tastyfx review - the forex arm of tastytrade. Competitive spreads, intuitive platform, US-regulated.',
  },
  '/review/charles-schwab': {
    title: 'Charles Schwab Forex Review 2026 | Thinkorswim Platform',
    description: 'Charles Schwab forex review. Trade currencies through the powerful thinkorswim platform.',
  },
  '/review/midasfx': {
    title: 'MidasFX Review 2026 | Offshore Broker for US Traders',
    description: 'MidasFX review - offshore broker accepting US clients. 1:500 leverage, $50 minimum, crypto deposits accepted.',
  },
  '/review/hankotrade': {
    title: 'Hankotrade Review 2026 | High Leverage Offshore Broker',
    description: 'Hankotrade review for US traders. Seychelles-regulated, 1:500 leverage, $10 minimum deposit, crypto-friendly.',
  },
  '/review/fxglory': {
    title: 'FXGlory Review 2026 | 1:3000 Leverage Broker',
    description: 'FXGlory review - ultra-high leverage broker. $1 minimum deposit, 1:3000 leverage, accepts US clients.',
  },
  '/review/n1cm': {
    title: 'N1CM Review 2026 | Offshore Forex Broker Analysis',
    description: 'N1CM review for American traders. Offshore broker with competitive conditions and US client acceptance.',
  },
  '/review/etoro': {
    title: 'eToro Review 2026 | Social Trading Platform',
    description: 'eToro review - social trading pioneer. Copy successful traders, trade crypto and stocks alongside forex.',
  },
  '/review/fxpro': {
    title: 'FXPro Review 2026 | Multi-Regulated Forex Broker',
    description: 'FXPro review - established broker with multiple regulations. Professional trading conditions and tools.',
  },
  '/review/avatrade': {
    title: 'AvaTrade Review 2026 | Global Forex Broker',
    description: 'AvaTrade review - globally regulated broker with competitive spreads and AvaTradeGO mobile app.',
  },
  '/review/hfm': {
    title: 'HFM (HotForex) Review 2026 | Multi-Asset Broker',
    description: 'HFM review - formerly HotForex. Wide range of instruments, multiple account types, copy trading available.',
  },
  '/review/lmfx': {
    title: 'LMFX Review 2026 | Offshore Broker for US Clients',
    description: 'LMFX review - Macedonia-based broker accepting US traders. High leverage and competitive trading conditions.',
  },
  '/review/coinexx': {
    title: 'Coinexx Review 2026 | Crypto-Focused Forex Broker',
    description: 'Coinexx review - cryptocurrency-focused broker with BTC deposits and withdrawals. Anonymous trading option.',
  },
  '/review/plexytrade': {
    title: 'PlexyTrade Review 2026 | New Offshore Broker',
    description: 'PlexyTrade review - newer offshore broker accepting US clients. Competitive spreads and modern platform.',
  },
  '/review/exness': {
    title: 'Exness Review 2026 | High Volume Forex Broker',
    description: 'Exness review - one of the largest forex brokers by volume. Instant withdrawals and tight spreads.',
  },
  '/review/pepperstone': {
    title: 'Pepperstone Review 2026 | Award-Winning Forex Broker',
    description: 'Pepperstone review - Australian broker with razor-sharp spreads and fast execution.',
  },
  '/review/xm': {
    title: 'XM Review 2026 | Popular Global Forex Broker',
    description: 'XM review - globally popular broker with $5 minimum deposit and extensive educational resources.',
  },
  '/review/fxtm': {
    title: 'FXTM Review 2026 | Forex Time Broker Analysis',
    description: 'FXTM (Forex Time) review - established broker with local payment methods and copy trading.',
  },
  '/review/fbs': {
    title: 'FBS Review 2026 | Beginner-Friendly Forex Broker',
    description: 'FBS review - beginner-friendly broker with $1 minimum deposit and generous bonuses.',
  },
  // Tools
  '/tools/pip-calculator': {
    title: 'Free Pip Calculator | Calculate Pip Value Instantly',
    description: 'Calculate pip value for any currency pair. Free forex pip calculator with real-time rates for US traders.',
  },
  '/tools/position-size-calculator': {
    title: 'Position Size Calculator | Risk Management Tool',
    description: 'Calculate optimal position size based on your risk tolerance. Essential tool for forex risk management.',
  },
  '/tools/forex-tax-calculator': {
    title: 'Forex Tax Calculator 2026 | Section 988 vs 1256',
    description: 'Calculate forex trading taxes for US traders. Compare Section 988 and Section 1256 tax treatment.',
  },
  '/tools/margin-calculator': {
    title: 'Margin Calculator | Calculate Required Margin',
    description: 'Calculate required margin for forex trades. Understand leverage and margin requirements.',
  },
  // Guides
  '/guides/forex-trading-usa': {
    title: 'Forex Trading in the USA 2026 | Complete Guide',
    description: 'Complete guide to forex trading in the United States. Regulations, brokers, taxes, and strategies for American traders.',
  },
  '/guides/beginners-guide': {
    title: 'Forex Trading for Beginners | Step-by-Step Guide',
    description: 'Learn forex trading from scratch. Comprehensive beginner guide covering basics to first trade.',
  },
  '/guides/us-forex-regulations': {
    title: 'US Forex Regulations 2026 | CFTC & NFA Rules',
    description: 'Understanding US forex regulations. CFTC requirements, NFA registration, and what it means for traders.',
  },
  '/guides/risk-management': {
    title: 'Forex Risk Management Guide | Protect Your Capital',
    description: 'Master forex risk management. Position sizing, stop losses, and strategies to protect your trading capital.',
  },
  '/guides/technical-analysis': {
    title: 'Technical Analysis Guide | Chart Patterns & Indicators',
    description: 'Learn technical analysis for forex trading. Chart patterns, indicators, and price action strategies.',
  },
  '/guides/fundamental-analysis': {
    title: 'Fundamental Analysis Guide | Economic Indicators',
    description: 'Master fundamental analysis. Economic indicators, central bank policies, and news trading strategies.',
  },
};

// Generate meta tags HTML
function generateMetaTags(path, baseHtml) {
  const seo = SEO_DATA[path] || SEO_DATA['/'];
  const canonical = `https://beginnerfxguide.com${path === '/' ? '' : path}`;

  // Replace title
  let html = baseHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${seo.title}</title>`
  );

  // Replace or add meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${seo.description}" />`
    );
  } else {
    html = html.replace(
      '</title>',
      `</title>\n    <meta name="description" content="${seo.description}" />`
    );
  }

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${seo.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${seo.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Add og:url if not exists
  if (!html.includes('property="og:url"')) {
    html = html.replace(
      'property="og:type"',
      `property="og:url" content="${canonical}" />\n    <meta property="og:type"`
    );
  }

  return html;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Remove trailing slash except for root
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    // Check if it's a known route or static file
    const isStaticFile = path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt|pdf|webp)$/i);

    // Fetch the original response
    const response = await fetch(request);

    // Only modify HTML responses for non-static files
    if (!isStaticFile && response.headers.get('content-type')?.includes('text/html')) {
      let html = await response.text();

      // Check if this is a 404 (React app returns index.html for all routes)
      const isKnownRoute = SEO_DATA[path] ||
        path.startsWith('/blog/') ||
        path.startsWith('/tr/') ||
        path.startsWith('/compare/') ||
        path.startsWith('/legal/') ||
        path.startsWith('/resources/');

      if (!isKnownRoute && path !== '/') {
        // Return 404 status for unknown routes
        return new Response(html, {
          status: 404,
          headers: {
            'content-type': 'text/html;charset=UTF-8',
            ...Object.fromEntries(response.headers),
          },
        });
      }

      // Inject proper meta tags
      html = generateMetaTags(path, html);

      return new Response(html, {
        status: response.status,
        headers: response.headers,
      });
    }

    return response;
  },
};
