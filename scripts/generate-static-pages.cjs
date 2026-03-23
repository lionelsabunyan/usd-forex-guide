#!/usr/bin/env node
/**
 * generate-static-pages.cjs
 *
 * Replaces react-snap for static HTML prerendering.
 * Pure Node.js — no Puppeteer, no headless browser.
 *
 * Uses directory-based output: /brokers → dist/brokers/index.html
 * This is the canonical approach per CLAUDE.md.
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
  { path: '/brokers/australia', title: 'Best Forex Brokers in Australia 2026 | US Forex Guide', desc: 'Compare the best forex brokers in Australia. ASIC-regulated brokers with competitive spreads, platforms, and account types for Australian traders.' },
  { path: '/brokers/uk', title: 'Best Forex Brokers in the UK 2026 | US Forex Guide', desc: 'Compare the best forex brokers in the UK. FCA-regulated brokers with tight spreads, reliable platforms, and strong trader protections.' },
  { path: '/brokers/canada', title: 'Best Forex Brokers in Canada 2026 | US Forex Guide', desc: 'Compare the best forex brokers in Canada. IIROC alternatives with high leverage, CAD accounts, and competitive spreads for Canadian traders.' },
  { path: '/brokers/singapore', title: 'Best Forex Brokers in Singapore 2026 | US Forex Guide', desc: 'Compare the best forex brokers in Singapore. MAS alternatives with high leverage, competitive spreads, and reliable platforms for Singapore traders.' },
  { path: '/brokers/eu', title: 'Best Forex Brokers in the EU 2026 | US Forex Guide', desc: 'Compare the best forex brokers in the EU. ESMA alternatives with high leverage, CySEC/FCA regulation, and competitive spreads for European traders.' },

  // Programmatic SEO — Broker Info Pages (auto-generated)
  ...(() => {
    const brokerSlugs = {
      fxglory: 'FXGlory', hankotrade: 'Hankotrade', midasfx: 'MidasFX', n1cm: 'N1CM',
      hfm: 'HFM', lmfx: 'LMFX', coinexx: 'Coinexx', plexytrade: 'PlexyTrade',
      exness: 'Exness', pepperstone: 'Pepperstone', xm: 'XM', fxtm: 'FXTM',
      fbs: 'FBS', etoro: 'eToro', fxpro: 'FxPro', oanda: 'OANDA',
      ig: 'IG', 'forex-com': 'Forex.com', 'interactive-brokers': 'Interactive Brokers',
      avatrade: 'AvaTrade', 'charles-schwab': 'Charles Schwab', tastyfx: 'tastyfx',
    };
    const pages = [];
    for (const [slug, name] of Object.entries(brokerSlugs)) {
      pages.push(
        { path: `/brokers/${slug}/minimum-deposit`, title: `${name} Minimum Deposit 2026 | US Forex Guide`, desc: `${name} minimum deposit, account requirements, and deposit methods. Compare ${name}'s minimum deposit with other forex brokers.` },
        { path: `/brokers/${slug}/spreads`, title: `${name} Spreads 2026 | US Forex Guide`, desc: `${name} spreads and trading costs. Compare ${name}'s spreads with competitors and find the best rates.` },
        { path: `/brokers/${slug}/fees`, title: `${name} Fees 2026 | US Forex Guide`, desc: `Complete ${name} fee breakdown: spreads, commissions, withdrawal fees, and hidden costs. Compare fees with other brokers.` },
      );
    }
    return pages;
  })(),

  { path: '/compare', title: 'Compare Forex Brokers | US Forex Guide', desc: 'Compare forex brokers side-by-side. Evaluate spreads, fees, leverage, regulation and more to find the right broker.' },
  { path: '/guides', title: 'Forex Trading Guides for Beginners | US Forex Guide', desc: 'Comprehensive forex trading guides for American beginners. Learn regulations, strategies, and how to choose the right broker.' },
  { path: '/tools', title: 'Forex Trading Tools & Calculators | US Forex Guide', desc: 'Free forex calculators: pip calculator, position size, margin, profit/loss and more. Essential tools for US forex traders.' },
  { path: '/blog', title: 'Forex Trading Blog for US Traders | US Forex Guide', desc: 'Latest forex trading articles, broker news, and educational content for US traders. Stay informed with expert analysis.' },
  { path: '/faq', title: 'Forex Trading FAQ for US Traders | US Forex Guide', desc: 'Answers to the most common questions about forex trading in the USA. Regulations, brokers, taxes, and how to get started.' },
  { path: '/glossary', title: 'Forex Glossary: 100+ Trading Terms Explained for Beginners', desc: 'Learn essential forex trading terminology. Our comprehensive A-Z glossary covers pips, spreads, leverage, margin, and 100+ terms every forex trader needs to know.' },
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
  { path: '/guides/best-copy-trading-platforms', title: 'Best Copy Trading Platforms for Forex 2026 | US Forex Guide', desc: 'Compare the best copy trading platforms for forex. eToro, AvaTrade, FXTM, HFM reviewed. Learn how copy trading works, fees, risks, and how to get started.' },
  { path: '/guides/best-forex-trading-apps', title: 'Best Forex Trading Apps 2026 — Top Mobile Platforms Compared | US Forex Guide', desc: 'Compare the best forex trading apps for mobile. eToro, OANDA, Forex.com, IG, thinkorswim & more reviewed. iOS & Android apps ranked for US and international traders.' },
  { path: '/guides/best-forex-demo-accounts', title: 'Best Forex Demo Accounts 2026 — Practice Trading Risk-Free | US Forex Guide', desc: 'Compare the best forex demo accounts for 2026. eToro, OANDA, Forex.com, IG, Interactive Brokers reviewed. Learn how demo accounts work, what to look for, and when to switch to live trading.' },
  { path: '/guides/best-scalping-brokers', title: 'Best Forex Scalping Brokers 2026 — Low Spread ECN Brokers | US Forex Guide', desc: 'Compare the best forex brokers for scalping. Pepperstone, Exness, FXTM, and US options reviewed. Raw spreads from 0.0 pips, fast execution, and ECN accounts compared.' },
  { path: '/guides/best-high-leverage-brokers', title: 'Best High Leverage Forex Brokers 2026 — Up to 1:3000 Compared | US Forex Guide', desc: 'Compare the best high leverage forex brokers. FBS, Exness, FXGlory, MidasFX reviewed. US vs international leverage rules, margin call risks, and broker comparison table.' },
  { path: '/guides/forex-day-trading', title: 'Forex Day Trading Guide 2026 — Strategies, Setups & Best Brokers | US Forex Guide', desc: 'Master day trading in forex. Learn breakout, pullback, and range strategies, best trading hours (London-NY overlap), risk management, and which brokers offer the fastest execution for US day traders.' },
  { path: '/guides/best-forex-signal-providers', title: 'Best Forex Signal Providers 2026 — Trusted & Verified | US Forex Guide', desc: 'Compare the best forex signal providers for 2026. Verified copy trading platforms, MQL5 signals, and trusted providers reviewed. Scam warnings included.' },
  { path: '/guides/best-low-spread-brokers', title: 'Best Low Spread & Zero Spread Forex Brokers 2026 | US Forex Guide', desc: 'Compare the best low spread and zero spread forex brokers. EUR/USD, GBP/USD, USD/JPY spreads compared across 10 brokers. ECN vs market maker, real vs advertised spreads explained.' },
  { path: '/guides/most-trusted-forex-brokers', title: 'Most Trusted & Regulated Forex Brokers 2026 — Safety Rankings | US Forex Guide', desc: 'Find the most trusted, regulated forex brokers ranked by safety. Tier 1 regulation (CFTC, FCA, ASIC), investor protection schemes, segregated accounts, and red flags explained for US and international traders.' },
  { path: '/guides/best-forex-charting-software', title: 'Best Forex Charting Software & Websites 2026 | US Forex Guide', desc: 'Compare the best forex charting software and websites. TradingView, MetaTrader, cTrader, NinjaTrader compared — indicators, drawing tools, alerts, mobile apps, and API features.' },
  { path: '/guides/best-hedging-brokers', title: 'Best Forex Hedging Brokers 2026 — Brokers That Allow Hedging | US Forex Guide', desc: 'Compare the best forex brokers that allow hedging. US hedging restrictions (FIFO rule) explained, direct vs indirect strategies, and 8 brokers with full hedging support reviewed.' },

  // Tools
  { path: '/tools/pip-calculator', title: 'Forex Pip Calculator | US Forex Guide', desc: 'Free pip value calculator for forex traders. Calculate pip values in USD for any currency pair and account size.' },
  { path: '/tools/position-size-calculator', title: 'Forex Position Size Calculator | US Forex Guide', desc: 'Calculate optimal position size for your forex trades. Manage risk with precise lot sizing based on account balance and risk %.' },
  { path: '/tools/margin-calculator', title: 'Forex Margin Calculator | US Forex Guide', desc: 'Calculate required margin for forex positions. Know exactly how much capital you need before opening a trade.' },
  { path: '/tools/profit-loss-calculator', title: 'Forex Profit & Loss Calculator | US Forex Guide', desc: 'Calculate potential profit or loss on forex trades. Enter entry, exit, and lot size to see your P&L instantly.' },
  { path: '/tools/forex-tax-calculator', title: 'Forex Tax Calculator for US Traders | US Forex Guide', desc: 'Estimate forex trading taxes for US traders. Section 1256 vs 988 treatment, 60/40 rule, and tax liability calculator.' },
  { path: '/tools/economic-calendar', title: 'Forex Economic Calendar | US Forex Guide', desc: 'Live economic calendar for forex traders. Track upcoming news events, central bank meetings, and market-moving releases.' },
  { path: '/tools/trading-sessions', title: 'Forex Trading Sessions Clock | US Forex Guide', desc: 'Live forex market hours clock. See which sessions are open now — Tokyo, London, New York, Sydney — with overlap times and timezone support.' },
  { path: '/tools/broker-quiz', title: 'Broker Finder Quiz — Find Your Perfect Forex Broker | US Forex Guide', desc: 'Answer 7 quick questions to find the best forex broker for your trading style, experience level, and budget. Free interactive quiz with personalized results.' },

  // Compare
  { path: '/compare/midasfx-vs-hankotrade', title: 'MidasFX vs Hankotrade Comparison 2026 | US Forex Guide', desc: 'Head-to-head comparison of MidasFX and Hankotrade for US traders. Compare spreads, leverage, deposits, and overall value.' },
  { path: '/compare/oanda-vs-forexcom', title: 'OANDA vs Forex.com Comparison 2026 | US Forex Guide', desc: 'OANDA vs Forex.com head-to-head comparison for US traders. Compare spreads, fees, platforms, and regulation side-by-side.' },
  { path: '/compare/etoro-vs-xm', title: 'eToro vs XM Comparison 2026 | US Forex Guide', desc: 'eToro vs XM head-to-head comparison. Compare social trading, spreads, leverage, bonuses, and platforms for forex traders.' },
  { path: '/compare/pepperstone-vs-exness', title: 'Pepperstone vs Exness Comparison 2026 | US Forex Guide', desc: 'Pepperstone vs Exness head-to-head comparison. Compare spreads, leverage, platforms, and withdrawal speed for forex traders.' },
  { path: '/compare/ig-vs-interactive-brokers', title: 'IG Markets vs Interactive Brokers 2026 | US Forex Guide', desc: 'IG Markets vs Interactive Brokers comparison for US traders. Compare spreads, platforms, regulation, and fees side-by-side.' },
  { path: '/compare/etoro-vs-oanda', title: 'eToro vs OANDA Comparison 2026 | US Forex Guide', desc: 'eToro vs OANDA head-to-head comparison. Compare social trading, spreads, regulation, and minimum deposits for forex traders.' },
  { path: '/compare/pepperstone-vs-xm', title: 'Pepperstone vs XM Comparison 2026 | US Forex Guide', desc: 'Pepperstone vs XM head-to-head comparison. Compare raw spreads, leverage, platforms, and trading conditions.' },
  { path: '/compare/tastyfx-vs-forexcom', title: 'tastyfx vs Forex.com Comparison 2026 | US Forex Guide', desc: 'tastyfx vs Forex.com comparison for US traders. Compare CFTC-regulated brokers on spreads, platforms, and minimum deposits.' },
  { path: '/compare/avatrade-vs-etoro', title: 'AvaTrade vs eToro Comparison 2026 | US Forex Guide', desc: 'AvaTrade vs eToro head-to-head comparison. Compare social trading, leverage, platforms, and regulation.' },
  { path: '/compare/oanda-vs-ig-markets', title: 'OANDA vs IG Markets Comparison 2026 | US Forex Guide', desc: 'OANDA vs IG Markets comparison for US traders. Two veteran CFTC-regulated brokers compared on spreads, deposits, and platforms.' },
  { path: '/compare/charles-schwab-vs-interactive-brokers', title: 'Charles Schwab vs Interactive Brokers 2026 | US Forex Guide', desc: 'Charles Schwab vs Interactive Brokers for forex trading. Compare thinkorswim vs TWS, commissions, and market access.' },
  { path: '/compare/xm-vs-fxtm', title: 'XM vs FXTM Comparison 2026 | US Forex Guide', desc: 'XM vs FXTM head-to-head comparison. Compare leverage, spreads, education, and trading conditions for international traders.' },
  { path: '/compare/mt4-vs-mt5', title: 'MT4 vs MT5: Which MetaTrader Platform Is Better? (2026) | US Forex Guide', desc: 'Detailed MetaTrader 4 vs MetaTrader 5 comparison. Compare order types, timeframes, indicators, Expert Advisors, hedging, and find the right platform for your trading.' },
  { path: '/compare/exness-vs-fxglory', title: 'Exness vs FXGlory 2026: Detailed Comparison for Forex Traders | US Forex Guide', desc: 'Exness vs FXGlory comparison: Which forex broker is better? Compare regulation, spreads, leverage, minimum deposits, and US client acceptance.' },

  // Resources
  { path: '/resources/us-forex-checklist', title: 'US Forex Trader Checklist | US Forex Guide', desc: 'Complete checklist for US forex traders before opening an account. Regulations, broker vetting, and risk management checklist.' },
  { path: '/resources/infographics', title: 'Forex Trading Infographics | US Forex Guide', desc: 'Visual guides and infographics about forex trading, broker comparisons, and trading strategies for US traders.' },

  // Legal
  { path: '/legal/privacy', title: 'Privacy Policy | US Forex Guide', desc: 'Privacy policy for US Forex Guide. Learn how we collect, use, and protect your personal information.' },
  { path: '/legal/terms', title: 'Terms of Service | US Forex Guide', desc: 'Terms of service for US Forex Guide. Rules and conditions for using our website and content.' },
  { path: '/legal/disclaimer', title: 'Disclaimer | US Forex Guide', desc: 'Important disclaimer for US Forex Guide. Trading involves risk. Read before using our content for investment decisions.' },
  { path: '/legal/affiliate-disclosure', title: 'Affiliate Disclosure | US Forex Guide', desc: 'Affiliate disclosure for US Forex Guide. We earn commissions from brokers — here\'s how it affects our reviews.' },

  // Turkish (TR) pages
  { path: '/tr', title: "Türkiye'den Erişilebilen Forex Brokerları 2026 | Beginner FX Guide TR", desc: "Türkiye'den açılabilen en iyi forex broker incelemeleri. Güvenilir, lisanslı brokerları karşılaştırın. Bağımsız ve tarafsız analizler." },
  { path: '/tr/hakkimizda', title: 'Hakkımızda | Beginner FX Guide TR', desc: "Beginner FX Guide TR hakkında bilgi edinin. Forex broker inceleme metodolojimiz ve tarafsız değerlendirme sürecimiz." },
  { path: '/tr/iletisim', title: 'İletişim | Beginner FX Guide TR', desc: 'Beginner FX Guide TR ekibiyle iletişime geçin. Soru, öneri ve geri bildirimlerinizi bekliyoruz.' },
  { path: '/tr/gizlilik-politikasi', title: 'Gizlilik Politikası | Beginner FX Guide TR', desc: 'Beginner FX Guide TR gizlilik politikası. Kişisel verilerinizi nasıl topladığımızı ve koruduğumuzu öğrenin.' },
  { path: '/tr/yasal-uyari', title: 'Yasal Uyarı | Beginner FX Guide TR', desc: 'Beginner FX Guide TR yasal uyarı sayfası. Forex ticareti risk içerir. İçeriklerimizi yatırım kararlarında kullanmadan önce okuyun.' },

  // Turkish Blog Pages
  { path: '/tr/blog', title: 'Forex Blog — Eğitim Yazıları ve Strateji Rehberleri | Beginner FX Guide TR', desc: 'Forex eğitim yazıları, strateji rehberleri ve Türkiye\'ye özel mevzuat bilgileri. Türk trader\'lar için güncel forex içerikleri.' },
  { path: '/tr/blog/forex-baslangic-rehberi-turkiye', title: 'Forex\'e Nasıl Başlanır? Türkiye\'den Adım Adım Rehber (2026)', desc: 'Türkiye\'den forex piyasasına giriş yapmak isteyenler için kapsamlı başlangıç rehberi. Broker seçimi, hesap açma, demo işlem ve ilk gerçek trade\'inize kadar her adım.' },
  { path: '/tr/blog/pip-lot-spread-nedir', title: 'Pip, Lot ve Spread Nedir? Forex Terimlerini Türkçe Öğrenin', desc: 'Forex\'in temel taşları olan pip, lot, spread, kaldıraç ve margin kavramlarını Türkçe olarak basit ve anlaşılır örneklerle açıklıyoruz.' },
  { path: '/tr/blog/en-iyi-forex-stratejileri-yeni-baslayanlar', title: 'Yeni Başlayanlar İçin En İyi 5 Forex Stratejisi (2026)', desc: 'Forex\'te ilk adımlarınızı atarken kullanabileceğiniz kanıtlanmış 5 strateji. Her strateji için giriş/çıkış kuralları, risk yönetimi ve pratik örnekler.' },
  { path: '/tr/blog/turkiye-forex-vergilendirme-rehberi', title: 'Türkiye\'de Forex Vergilendirmesi: Bilmeniz Gereken Her Şey (2026)', desc: 'Forex kazançları Türkiye\'de nasıl vergilendirilir? Gelir vergisi, beyanname, stopaj ve yurt dışı broker kullanımının vergisel yükümlülükleri.' },
  { path: '/tr/blog/forex-risk-yonetimi-rehberi', title: 'Forex Risk Yönetimi: Sermayenizi Korumanın 7 Altın Kuralı', desc: 'Forex\'te uzun vadeli başarının sırrı risk yönetimidir. Position sizing, stop loss stratejileri, günlük kayıp limiti ve psikolojik kontrol teknikleri.' },

  { path: '/tr/inceleme/fxpro', title: 'FxPro İnceleme 2026 | Beginner FX Guide TR', desc: 'FxPro forex broker incelemesi. Spread, platform, düzenleme ve Türkiye erişilebilirliği hakkında detaylı analiz.' },
  { path: '/tr/inceleme/hfm', title: 'HFM İnceleme 2026 | Beginner FX Guide TR', desc: 'HFM (HotForex) forex broker incelemesi. Düşük spread, çoklu platform desteği ve Türkiye erişimi hakkında bilgi.' },
  { path: '/tr/inceleme/xm', title: 'XM İnceleme 2026 | Beginner FX Guide TR', desc: 'XM forex broker incelemesi. 1000+ enstrüman, düşük spread ve Türkiye kullanıcıları için hesap seçenekleri.' },
  { path: '/tr/inceleme/exness', title: 'Exness İnceleme 2026 | Beginner FX Guide TR', desc: 'Exness forex broker incelemesi. Ultra düşük spread, hızlı para çekme ve Türkiye erişimi hakkında detaylı analiz.' },
  { path: '/tr/inceleme/fbs', title: 'FBS İnceleme 2026 | Beginner FX Guide TR', desc: 'FBS forex broker incelemesi. Düşük minimum depozito, bonus fırsatları ve Türkiye erişimi hakkında bilgi.' },
  { path: '/tr/inceleme/pepperstone', title: 'Pepperstone İnceleme 2026 | Beginner FX Guide TR', desc: 'Pepperstone forex broker incelemesi. RAW spread, hızlı işlem ve Türkiye kullanıcıları için erişilebilirlik analizi.' },
  { path: '/tr/inceleme/fxtm', title: 'FXTM İnceleme 2026 | Beginner FX Guide TR', desc: 'FXTM (ForexTime) forex broker incelemesi. Çoklu hesap türü, düşük spread ve Türkiye erişimi hakkında detaylı bilgi.' },
  { path: '/tr/inceleme/oanda', title: 'OANDA İnceleme 2026 | Beginner FX Guide TR', desc: 'OANDA forex broker incelemesi. CFTC/NFA regülasyonlu, $0 minimum depozito, 1996\'dan beri güvenilir broker.' },
  { path: '/tr/inceleme/ig', title: 'IG Markets İnceleme 2026 | Beginner FX Guide TR', desc: 'IG Markets forex broker incelemesi. 50+ yıllık deneyim, CFTC/NFA ve FCA regülasyonlu, gelişmiş araştırma araçları.' },
  { path: '/tr/inceleme/etoro', title: 'eToro İnceleme 2026 | Beginner FX Guide TR', desc: 'eToro forex broker incelemesi. Sosyal/copy trading, FCA ve CySEC regülasyonlu, kripto ve hisse tek platformda.' },
  { path: '/tr/inceleme/forexcom', title: 'Forex.com İnceleme 2026 | Beginner FX Guide TR', desc: 'Forex.com forex broker incelemesi. CFTC/NFA regülasyonlu, 3 hesap türü, MT4/MT5 desteği ve rekabetçi spread\'ler.' },
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
  { slug: 'best-forex-brokers-beginners-2026', title: 'Best Forex Brokers for Beginners 2026: Top 5 Beginner-Friendly Picks', excerpt: 'Our top picks for the best forex brokers for beginners in 2026. Easy platforms, low deposits, and great education.' },
  { slug: 'how-to-start-forex-trading-100-dollars', title: 'How to Start Forex Trading with $100 in 2026', excerpt: 'Can you start forex trading with just $100? Yes. Here is exactly how to do it as a US trader.' },
  { slug: 'forexcom-vs-oanda-2026', title: 'Forex.com vs OANDA 2026: Which US Broker is Better?', excerpt: 'Forex.com vs OANDA detailed comparison for US traders. Spreads, platforms, and regulation compared.' },
  { slug: 'is-forex-trading-legal-usa', title: 'Is Forex Trading Legal in the USA? Rules You Need to Know', excerpt: 'Is forex trading legal in the US? Yes, but with strict rules. Learn about CFTC regulations and legal requirements.' },
  { slug: 'best-time-trade-forex-usa', title: 'Best Time to Trade Forex in the USA: Complete Session Guide', excerpt: 'Find the best trading times for US forex traders. Session overlaps, volatility windows, and timezone tips.' },
  { slug: 'midasfx-vs-hankotrade-comparison', title: 'MidasFX vs Hankotrade 2026: Which Offshore Broker is Better?', excerpt: 'MidasFX vs Hankotrade comparison for US traders. Spreads, leverage, deposits, and overall verdict.' },
  { slug: 'oanda-vs-forexcom-comparison', title: 'OANDA vs Forex.com Comparison 2026: Best US Forex Broker', excerpt: 'OANDA vs Forex.com in-depth comparison. Which CFTC-regulated broker is the best choice for US traders?' },
  { slug: 'best-forex-brokers-scalping-2026', title: 'Best Forex Brokers for Scalping 2026: Fast Execution & Low Spreads', excerpt: 'Top forex brokers for scalping in 2026. ECN execution, raw spreads, and no restrictions.' },
  { slug: 'weekly-market-wrap-feb-3-2026', title: 'Weekly Market Wrap: Dollar Strength Continues, Eyes on Fed Minutes', excerpt: 'Our weekly recap of forex market movements, key events, and what US traders should watch in the week ahead.' },
  { slug: 'best-forex-brokers-low-spreads-2026', title: 'Best Forex Brokers for Low Spreads 2026: Cheapest Trading Costs', excerpt: 'Find the best forex brokers with the lowest spreads in 2026. Compare ECN and raw spread accounts.' },
  { slug: 'forex-vs-stocks-which-to-trade-2026', title: 'Forex vs Stocks: Which Should You Trade in 2026?', excerpt: 'Forex vs stock trading comparison. Hours, leverage, costs, and which market suits your trading style.' },
  { slug: 'how-to-read-forex-charts-beginners', title: 'How to Read Forex Charts: A Beginner\'s Visual Guide', excerpt: 'Learn to read forex charts from scratch. Candlesticks, timeframes, support/resistance, and common patterns.' },
  { slug: 'best-forex-trading-apps-mobile-2026', title: 'Best Forex Trading Apps for Mobile Traders 2026', excerpt: 'Top mobile forex trading apps for 2026. MT4, MT5, eToro, OANDA, and thinkorswim compared.' },
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
  const OG_WIDTH = '1200';
  const OG_HEIGHT = '630';

  let html = template;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // Replace or insert meta description (handles multi-line <meta\n  name="description"...> format)
  const metaDescMultiline = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s;
  const metaDescSingleline = /<meta name="description" content="[^"]*"\s*\/?>/;
  if (metaDescSingleline.test(html)) {
    html = html.replace(metaDescSingleline, `<meta name="description" content="${safeDesc}" />`);
  } else if (metaDescMultiline.test(html)) {
    html = html.replace(metaDescMultiline, `<meta name="description" content="${safeDesc}" />`);
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

  // Replace or insert og:url
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${safeCanonical}"`);
  } else {
    html = html.replace(/<meta property="og:title"/, `<meta property="og:url" content="${safeCanonical}" />\n    <meta property="og:title"`);
  }

  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${safeOgImage}"`);

  // Replace or insert og:image:width and og:image:height
  if (html.includes('og:image:width')) {
    html = html.replace(/<meta property="og:image:width" content="[^"]*"/, `<meta property="og:image:width" content="${OG_WIDTH}"`);
    html = html.replace(/<meta property="og:image:height" content="[^"]*"/, `<meta property="og:image:height" content="${OG_HEIGHT}"`);
  } else {
    html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, (match) =>
      `${match}\n    <meta property="og:image:width" content="${OG_WIDTH}" />\n    <meta property="og:image:height" content="${OG_HEIGHT}" />`
    );
  }

  // Replace or insert Twitter Card tags
  if (html.includes('<meta name="twitter:title"')) {
    html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${safeTitle}"`);
  } else {
    html = html.replace(/<meta name="twitter:card"/, `<meta name="twitter:title" content="${safeTitle}" />\n    <meta name="twitter:card"`);
  }

  if (html.includes('<meta name="twitter:description"')) {
    html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${safeDesc}"`);
  } else {
    html = html.replace(/<meta name="twitter:image"/, `<meta name="twitter:description" content="${safeDesc}" />\n    <meta name="twitter:image"`);
  }

  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${safeOgImage}"`);

  return html;
}

// ─── Broker ratings for Review schema ─────────────────────────────────────────
const brokerRatings = {
  midasfx: { name: 'MidasFX', rating: 4.8 },
  hankotrade: { name: 'Hankotrade', rating: 4.75 },
  fxglory: { name: 'FXGlory', rating: 4.9 },
  n1cm: { name: 'N1CM', rating: 4.3 },
  hfm: { name: 'HFM (HotForex)', rating: 4.5 },
  lmfx: { name: 'LMFX', rating: 4.6 },
  coinexx: { name: 'Coinexx', rating: 3.8 },
  plexytrade: { name: 'PlexyTrade', rating: 4.0 },
  exness: { name: 'Exness', rating: 4.7 },
  pepperstone: { name: 'Pepperstone', rating: 4.6 },
  xm: { name: 'XM', rating: 4.4 },
  fxtm: { name: 'FXTM', rating: 4.3 },
  fbs: { name: 'FBS', rating: 4.1 },
  etoro: { name: 'eToro', rating: 4.0 },
  fxpro: { name: 'FxPro', rating: 4.5 },
  oanda: { name: 'OANDA', rating: 3.7 },
  'ig-markets': { name: 'IG Markets', rating: 3.6 },
  'interactive-brokers': { name: 'Interactive Brokers', rating: 4.0 },
  tastyfx: { name: 'tastyfx', rating: 4.2 },
  'charles-schwab': { name: 'Charles Schwab', rating: 4.1 },
  avatrade: { name: 'AvaTrade', rating: 4.2 },
  forexcom: { name: 'Forex.com', rating: 3.5 },
};

// ─── Helper: inject Review JSON-LD for broker pages ──────────────────────────
function injectReviewSchema(html, brokerSlug, pageTitle, pageDesc) {
  const broker = brokerRatings[brokerSlug];
  if (!broker) return html;

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": broker.name,
      "description": `${broker.name} forex broker review for US traders`,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": broker.rating,
        "bestRating": 5,
        "worstRating": 1,
        "ratingCount": 1
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": broker.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": "US Forex Guide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "US Forex Guide",
      "url": "https://beginnerfxguide.com/"
    },
    "name": pageTitle,
    "description": pageDesc
  });

  return html.replace('</head>', `  <script type="application/ld+json">${schema}</script>\n  </head>`);
}

// ─── Helper: inject BreadcrumbList JSON-LD ───────────────────────────────────
function injectBreadcrumbSchema(html, pagePath, pageTitle) {
  const parts = pagePath.split('/').filter(Boolean);
  if (parts.length === 0) return html;

  const items = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` }
  ];

  let currentPath = '';
  for (let i = 0; i < parts.length; i++) {
    currentPath += `/${parts[i]}`;
    items.push({
      "@type": "ListItem",
      "position": i + 2,
      "name": i === parts.length - 1 ? pageTitle.split('|')[0].trim() : parts[i].charAt(0).toUpperCase() + parts[i].slice(1),
      "item": `${SITE_URL}${currentPath}/`
    });
  }

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  });

  return html.replace('</head>', `  <script type="application/ld+json">${schema}</script>\n  </head>`);
}

// ─── OG Image mapping by page category ────────────────────────────────────────
function getOgImageForPath(pagePath) {
  if (pagePath.startsWith('/review/') || pagePath.startsWith('/brokers') || pagePath.startsWith('/compare')) {
    return `${SITE_URL}/images/og/og-brokers.png`;
  }
  if (pagePath.startsWith('/guides')) {
    return `${SITE_URL}/images/og/og-guides.png`;
  }
  if (pagePath.startsWith('/blog') || pagePath.startsWith('/tr/blog')) {
    return `${SITE_URL}/images/og/og-blog.png`;
  }
  if (pagePath.startsWith('/tools')) {
    return `${SITE_URL}/images/og/og-tools.png`;
  }
  // TR reviews use brokers image
  if (pagePath.startsWith('/tr/inceleme')) {
    return `${SITE_URL}/images/og/og-brokers.png`;
  }
  return `${SITE_URL}/images/og/og-default.png`;
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

  // Clean up stale flat files from previous builds
  // (e.g. dist/brokers.html) — we now use directory-based (dist/brokers/index.html)
  for (const page of staticPages) {
    if (page.path === '/') continue;
    const staleFlat = path.join(DIST, `${page.path}.html`);
    if (fs.existsSync(staleFlat)) {
      fs.unlinkSync(staleFlat);
      console.log(`🧹  Removed stale flat file: ${page.path}.html`);
    }
  }
  for (const post of blogPages) {
    const staleFlat = path.join(DIST, `blog/${post.slug}.html`);
    if (fs.existsSync(staleFlat)) {
      fs.unlinkSync(staleFlat);
      console.log(`🧹  Removed stale flat file: blog/${post.slug}.html`);
    }
  }

  // Process static pages
  for (const page of staticPages) {
    if (page.path === '/') {
      // Root page: update dist/index.html in-place
      const updatedRoot = injectMeta(template, {
        title: page.title,
        desc: page.desc,
        canonical: `${SITE_URL}/`,
      });
      fs.writeFileSync(templatePath, updatedRoot, 'utf8');
      console.log('✅  Updated /index.html (root)');
      created++;
      continue;
    }

    // Directory-based approach: /brokers → dist/brokers/index.html
    // Netlify serves index.html from directories natively — no rewrite rules needed
    const dirPath = path.join(DIST, page.path);
    const filePath = path.join(dirPath, 'index.html');
    const canonical = `${SITE_URL}${page.path}/`;

    fs.mkdirSync(dirPath, { recursive: true });

    let html = injectMeta(template, {
      title: page.title,
      desc: page.desc,
      canonical,
      ogImage: page.ogImage || getOgImageForPath(page.path),
    });

    // Inject BreadcrumbList schema for all pages
    html = injectBreadcrumbSchema(html, page.path, page.title);

    // Inject Review schema for broker review pages
    if (page.path.startsWith('/review/')) {
      const brokerSlug = page.path.replace('/review/', '');
      html = injectReviewSchema(html, brokerSlug, page.title, page.desc);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    created++;
  }

  // Process blog pages
  for (const post of blogPages) {
    const pagePath = `/blog/${post.slug}`;
    // Directory-based: /blog/slug → dist/blog/slug/index.html
    const dirPath = path.join(DIST, pagePath);
    const filePath = path.join(dirPath, 'index.html');
    const canonical = `${SITE_URL}${pagePath}/`;

    fs.mkdirSync(dirPath, { recursive: true });

    const title = post.title.includes('US Forex Guide') ? post.title : `${post.title} | US Forex Guide`;
    let html = injectMeta(template, {
      title,
      desc: post.excerpt,
      canonical,
      ogImage: `${SITE_URL}/images/og/og-blog.png`,
    });

    // Inject BreadcrumbList for blog posts
    html = injectBreadcrumbSchema(html, pagePath, title);

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

  // No rewrite rules needed — directory-based output (dist/brokers/index.html)
  // is served natively by Netlify without any _redirects rules.

  console.log(`\n✅  Static page generation complete: ${created} pages created`);
  if (skipped > 0) console.log(`⚠️   ${skipped} pages skipped`);
}

// Export page data for use by other build scripts (e.g., generate-sitemap.cjs)
module.exports = { staticPages, blogPages, SITE_URL };

// Run only when executed directly
if (require.main === module) {
  main();
}
