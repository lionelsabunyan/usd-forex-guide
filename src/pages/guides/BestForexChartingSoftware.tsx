import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Star, ExternalLink, BarChart3, Monitor, Smartphone, Code, Zap, LineChart, TrendingUp } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const chartingPlatforms = [
  {
    name: "TradingView",
    type: "Web-based + Desktop",
    pricing: "Free / $14.95–$59.95/mo",
    indicators: "400+ built-in, 100k+ community",
    drawingTools: "80+",
    alerts: "Up to 400 (Premium)",
    mobile: "iOS & Android",
    api: "Pine Script (custom indicators/strategies)",
    brokerIntegration: "50+ brokers (direct trading)",
    rating: 4.9,
    highlight: "Best Overall Charting",
    features: ["Social network & idea sharing", "Pine Script scripting language", "Real-time data for free", "Multi-chart layouts", "Paper trading built-in"],
  },
  {
    name: "MetaTrader 4 (MT4)",
    type: "Desktop + Mobile",
    pricing: "Free (via broker)",
    indicators: "30 built-in, 2000+ MQL4 Market",
    drawingTools: "31",
    alerts: "Unlimited",
    mobile: "iOS & Android",
    api: "MQL4 (Expert Advisors / custom indicators)",
    brokerIntegration: "1000+ brokers worldwide",
    rating: 4.5,
    highlight: "Most Widely Supported",
    features: ["Expert Advisors (automated trading)", "Massive community & indicator library", "Lightweight & fast", "No subscription cost", "Extensive broker support"],
  },
  {
    name: "MetaTrader 5 (MT5)",
    type: "Desktop + Mobile + Web",
    pricing: "Free (via broker)",
    indicators: "38 built-in, MQL5 Market",
    drawingTools: "44",
    alerts: "Unlimited",
    mobile: "iOS & Android",
    api: "MQL5 (faster, multi-threaded)",
    brokerIntegration: "800+ brokers",
    rating: 4.6,
    highlight: "Best Free Desktop Platform",
    features: ["Multi-asset support (forex, stocks, futures)", "Depth of Market (DOM)", "Economic calendar built-in", "Strategy tester with optimization", "MQL5 cloud computing"],
  },
  {
    name: "cTrader",
    type: "Desktop + Web + Mobile",
    pricing: "Free (via broker)",
    indicators: "70+ built-in",
    drawingTools: "50+",
    alerts: "Unlimited",
    mobile: "iOS & Android",
    api: "cAlgo (C#-based)",
    brokerIntegration: "Pepperstone, FxPro, IC Markets, 30+",
    rating: 4.7,
    highlight: "Best for Advanced Traders",
    features: ["Level II pricing / depth of market", "Detachable charts", "cTrader Copy (social trading)", "Advanced order types", "Clean modern UI"],
  },
  {
    name: "NinjaTrader",
    type: "Desktop",
    pricing: "Free (charting) / $99/mo or $1,099 lifetime (trading)",
    indicators: "100+ built-in",
    drawingTools: "40+",
    alerts: "Unlimited",
    mobile: "No native app",
    api: "NinjaScript (C#-based)",
    brokerIntegration: "NinjaTrader Brokerage, CQG, Interactive Brokers",
    rating: 4.4,
    highlight: "Best for Futures & Advanced Analysis",
    features: ["Advanced backtesting & strategy optimization", "Market replay", "Volumetric analysis", "SuperDOM for order flow", "Free charting with delayed data"],
  },
  {
    name: "Thinkorswim (TOS)",
    type: "Desktop + Web + Mobile",
    pricing: "Free (Charles Schwab account)",
    indicators: "400+ built-in",
    drawingTools: "50+",
    alerts: "Unlimited",
    mobile: "iOS & Android",
    api: "thinkScript (custom studies)",
    brokerIntegration: "Charles Schwab only",
    rating: 4.5,
    highlight: "Best US-Regulated Platform",
    features: ["thinkScript custom studies", "Options analysis tools", "Paper trading (paperMoney)", "OnDemand market replay", "CFTC/NFA regulated broker"],
  },
];

const BestForexChartingSoftware = () => {
  const tocItems = [
    { id: "why-charting-matters", title: "Why Charting Software Matters", level: 2 },
    { id: "best-platforms", title: "Best Charting Platforms 2026", level: 2 },
    { id: "comparison-table", title: "Feature Comparison Table", level: 2 },
    { id: "free-vs-premium", title: "Free vs Premium Charting", level: 2 },
    { id: "broker-platform-support", title: "Broker Platform Support", level: 2 },
    { id: "choosing-right-platform", title: "How to Choose", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "What is the best free forex charting software?",
      answer: "TradingView's free plan is the best overall free charting option — it includes real-time data, 100+ indicators, and community scripts. For desktop charting, MetaTrader 4 and MT5 are completely free through any broker and include built-in indicators plus thousands of community add-ons. If you have a Charles Schwab account, Thinkorswim is arguably the most powerful free platform available.",
    },
    {
      question: "Is TradingView better than MetaTrader?",
      answer: "TradingView is better for chart analysis, social features, and cross-broker compatibility. MetaTrader is better for automated trading (Expert Advisors), has wider broker support, and costs nothing. For most forex traders, using TradingView for analysis and MetaTrader for execution is a popular combination.",
    },
    {
      question: "Can I trade directly from charting software?",
      answer: "Yes. TradingView supports direct trading with 50+ brokers including OANDA and Pepperstone. MetaTrader 4/5 and cTrader are full trading platforms with built-in charting. NinjaTrader also supports live trading through its own brokerage and Interactive Brokers.",
    },
    {
      question: "What charting software do professional forex traders use?",
      answer: "Professional traders commonly use TradingView (for analysis and idea sharing), Bloomberg Terminal (institutional), cTrader (for ECN/DMA trading), and MetaTrader 5 (for algo trading). Many professionals use multiple platforms — e.g., TradingView for charting and MT5 for execution.",
    },
    {
      question: "Do I need paid charting software for forex trading?",
      answer: "No. Free options like MetaTrader 4/5, TradingView (free plan), and cTrader provide more than enough tools for most traders. Paid upgrades (TradingView Premium, NinjaTrader) mainly add more alerts, multiple chart layouts, advanced screeners, and real-time data for additional markets.",
    },
    {
      question: "What is Pine Script in TradingView?",
      answer: "Pine Script is TradingView's proprietary programming language for creating custom indicators, strategies, and alerts. It's beginner-friendly compared to MQL4/5 or C#. The community has published over 100,000 free Pine Script indicators that you can use directly on your charts.",
    },
    {
      question: "Which charting platform is best for forex beginners?",
      answer: "TradingView is the best starting point for beginners — it has an intuitive interface, built-in educational content, and a free plan. MetaTrader 4 is also beginner-friendly and the standard platform most brokers offer. Avoid NinjaTrader as a beginner — it's powerful but has a steep learning curve.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Best Forex Charting Software & Websites 2026 | Platform Comparison"
        description="Compare the best forex charting software and websites. TradingView, MetaTrader, cTrader, NinjaTrader compared — indicators, drawing tools, alerts, mobile apps, and API features."
        canonical="/guides/best-forex-charting-software"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Best Forex Charting Software & Websites 2026",
          "description": "Compare the best forex charting platforms with detailed feature comparison. TradingView, MetaTrader 4/5, cTrader, NinjaTrader, and Thinkorswim reviewed.",
          "author": { "@type": "Organization", "name": "Beginner FX Guide" },
          "publisher": { "@type": "Organization", "name": "Beginner FX Guide" },
          "datePublished": "2026-03-23",
          "dateModified": "2026-03-23",
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "Best Forex Charting Software" },
            ]}
            className="mb-6"
          />
          <Link to="/guides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Intermediate</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>18 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Best Forex <span className="text-gradient-gold">Charting Software</span> & Websites
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Compare the top charting platforms for forex traders in 2026. We analyze indicators, drawing tools,
            alerts, mobile support, scripting APIs, and broker integrations across 6 leading platforms — including
            free and premium options.
          </p>
          <LastUpdated date="March 2026" reviewedBy="Platform Research Team" />
        </div>
      </section>

      {/* Content with TOC */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">

              {/* Key Statistics */}
              <StatHighlight
                title="Platform Snapshot"
                stats={[
                  { value: "6", label: "Platforms Compared", description: "Free & premium" },
                  { value: "400+", label: "Max Indicators", description: "TradingView & TOS" },
                  { value: "$0", label: "Min Price", description: "MT4/MT5/cTrader free" },
                  { value: "4.9", label: "Top Rating", description: "TradingView" },
                ]}
                source="Platform data, March 2026"
              />

              {/* Why Charting Matters */}
              <section id="why-charting-matters" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Why Charting Software Matters for Forex Trading</h2>
                <p className="text-muted-foreground mb-4">
                  Your charting platform is where you'll spend most of your trading time. It's the lens through which
                  you analyze price action, identify setups, manage trades, and develop strategies. The right platform
                  can make the difference between spotting opportunities early and missing them entirely.
                </p>
                <p className="text-muted-foreground mb-4">
                  Modern charting software goes far beyond simple candlestick charts. Today's platforms offer hundreds
                  of technical indicators, custom scripting languages for building your own tools, real-time alerts,
                  multi-timeframe analysis, and direct broker integration for one-click trading from the chart.
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { icon: LineChart, title: "Technical Analysis", desc: "Apply indicators like RSI, MACD, Bollinger Bands, and Fibonacci retracements to identify entry and exit points. The best platforms offer 100–400+ built-in indicators." },
                    { icon: Code, title: "Custom Scripting", desc: "Build your own indicators and automated strategies using languages like Pine Script (TradingView), MQL4/5 (MetaTrader), cAlgo (cTrader), or thinkScript (Thinkorswim)." },
                    { icon: Zap, title: "Real-Time Alerts", desc: "Set price, indicator, and pattern-based alerts that notify you via email, SMS, or push notification. Critical for traders who can't watch charts 24/5." },
                    { icon: Smartphone, title: "Mobile Access", desc: "Trade and analyze on the go with mobile apps. TradingView, MetaTrader, and cTrader all offer full-featured iOS and Android apps." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <QuotableFact type="money">
                  Professional traders typically spend 70–80% of their screen time on charting software.
                  A platform that saves you 10 minutes per analysis session adds up to 40+ hours per year —
                  time you can spend on higher-quality trade decisions instead of fighting your tools.
                </QuotableFact>
              </section>

              {/* Best Charting Platforms */}
              <section id="best-platforms" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Best Forex Charting Platforms for 2026</h2>
                <p className="text-muted-foreground mb-6">
                  We evaluated charting platforms based on indicator library, drawing tools, alert capabilities,
                  mobile apps, scripting/API support, and broker integration. Here are our top picks:
                </p>

                <div className="space-y-6">
                  {chartingPlatforms.map((platform, index) => (
                    <div key={platform.name} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-bold">{platform.name}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                              {platform.highlight}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="font-semibold">{platform.rating}/5</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Type</span>
                          <span className="font-medium">{platform.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Pricing</span>
                          <span className="font-medium">{platform.pricing}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Indicators</span>
                          <span className="font-medium">{platform.indicators}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Mobile</span>
                          <span className="font-medium">{platform.mobile}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Drawing Tools</span>
                          <span className="font-medium">{platform.drawingTools}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Alerts</span>
                          <span className="font-medium">{platform.alerts}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">API / Scripting</span>
                          <span className="font-medium">{platform.api}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground block mb-2">Key Features:</span>
                        <div className="flex flex-wrap gap-2">
                          {platform.features.map((feature) => (
                            <span key={feature} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Broker Integration:</span> {platform.brokerIntegration}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comparison Table */}
              <section id="comparison-table" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Feature Comparison Table</h2>
                <p className="text-muted-foreground mb-4">
                  Side-by-side feature comparison across all 6 charting platforms. Compare indicators, drawing
                  tools, alerts, mobile support, and pricing at a glance.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Platform</th>
                        <th className="text-left p-3 font-semibold border-b">Price</th>
                        <th className="text-left p-3 font-semibold border-b">Indicators</th>
                        <th className="text-left p-3 font-semibold border-b">Drawing Tools</th>
                        <th className="text-left p-3 font-semibold border-b">Mobile</th>
                        <th className="text-left p-3 font-semibold border-b">Scripting</th>
                        <th className="text-left p-3 font-semibold border-b">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["TradingView", "Free–$59.95/mo", "400+ / 100k+ community", "80+", "Yes", "Pine Script", "4.9"],
                        ["MT4", "Free", "30 + 2000+ MQL4", "31", "Yes", "MQL4", "4.5"],
                        ["MT5", "Free", "38 + MQL5 Market", "44", "Yes", "MQL5", "4.6"],
                        ["cTrader", "Free", "70+", "50+", "Yes", "cAlgo (C#)", "4.7"],
                        ["NinjaTrader", "Free–$1,099", "100+", "40+", "No", "NinjaScript (C#)", "4.4"],
                        ["Thinkorswim", "Free*", "400+", "50+", "Yes", "thinkScript", "4.5"],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          {row.map((cell, j) => (
                            <td key={j} className={`p-3 border-b ${j === 0 ? "font-medium" : "text-muted-foreground"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * Thinkorswim is free with a Charles Schwab account. Some advanced features may require funded account.
                  Indicator counts include built-in only; community/marketplace add-ons are additional.
                </p>
              </section>

              {/* Free vs Premium */}
              <section id="free-vs-premium" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Free vs Premium Charting: What Do You Actually Need?</h2>
                <p className="text-muted-foreground mb-4">
                  The good news: free charting tools in 2026 are incredibly capable. MetaTrader 4/5 and cTrader are
                  completely free through brokers, and TradingView's free plan includes real-time data and 100+ indicators.
                  Here's when upgrading to premium makes sense:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Free Is Enough When...
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>You trade 1–2 pairs with basic indicators</li>
                      <li>You don't need more than 1–2 active alerts</li>
                      <li>Single chart layout is sufficient</li>
                      <li>You use a broker's built-in platform (MT4/MT5)</li>
                      <li>You're still learning and developing your style</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Upgrade Makes Sense When...
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>You need 10+ active alerts simultaneously</li>
                      <li>Multi-chart layouts (4–8 charts on screen)</li>
                      <li>Real-time data for multiple asset classes</li>
                      <li>Advanced screeners and scanning tools</li>
                      <li>No ads and faster data refresh</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-semibold mb-3">TradingView Plan Comparison</h4>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Basic (Free)</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>1 chart per tab</li>
                        <li>3 indicators/chart</li>
                        <li>1 alert</li>
                        <li>Ads shown</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Essential ($14.95/mo)</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>2 charts per tab</li>
                        <li>5 indicators/chart</li>
                        <li>20 alerts</li>
                        <li>No ads</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Plus ($29.95/mo)</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>4 charts per tab</li>
                        <li>10 indicators/chart</li>
                        <li>100 alerts</li>
                        <li>Custom timeframes</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Premium ($59.95/mo)</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>8 charts per tab</li>
                        <li>25 indicators/chart</li>
                        <li>400 alerts</li>
                        <li>Second-based intervals</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <QuotableFact type="regulation">
                  Most successful forex traders use a combination: TradingView for analysis and chart sharing, plus
                  MetaTrader 4/5 for execution and automated trading. This costs nothing if you stick to TradingView's
                  free plan and your broker provides MT4/MT5 access.
                </QuotableFact>
              </section>

              {/* Broker Platform Support */}
              <section id="broker-platform-support" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Which Brokers Support Which Platforms?</h2>
                <p className="text-muted-foreground mb-4">
                  Not every broker supports every charting platform. Here's a breakdown of platform availability
                  across popular forex brokers reviewed on our site:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Broker</th>
                        <th className="text-center p-3 font-semibold border-b">MT4</th>
                        <th className="text-center p-3 font-semibold border-b">MT5</th>
                        <th className="text-center p-3 font-semibold border-b">cTrader</th>
                        <th className="text-center p-3 font-semibold border-b">TradingView</th>
                        <th className="text-center p-3 font-semibold border-b">Proprietary</th>
                        <th className="text-center p-3 font-semibold border-b">US Accepted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { broker: "Pepperstone", mt4: true, mt5: true, ctrader: true, tv: true, prop: false, us: false, review: "/review/pepperstone" },
                        { broker: "OANDA", mt4: true, mt5: true, ctrader: false, tv: true, prop: true, us: true, review: "/review/oanda" },
                        { broker: "Forex.com", mt4: true, mt5: true, ctrader: false, tv: true, prop: true, us: true, review: "/review/forexcom" },
                        { broker: "IG Markets", mt4: true, mt5: false, ctrader: false, tv: false, prop: true, us: true, review: "/review/ig-markets" },
                        { broker: "Interactive Brokers", mt4: false, mt5: false, ctrader: false, tv: false, prop: true, us: true, review: "/review/interactive-brokers" },
                        { broker: "Charles Schwab", mt4: false, mt5: false, ctrader: false, tv: false, prop: true, us: true, review: "/review/charles-schwab" },
                        { broker: "tastyfx", mt4: false, mt5: false, ctrader: false, tv: false, prop: true, us: true, review: "/review/tastyfx" },
                        { broker: "FxPro", mt4: true, mt5: true, ctrader: true, tv: false, prop: true, us: false, review: "/review/fxpro" },
                        { broker: "Exness", mt4: true, mt5: true, ctrader: false, tv: false, prop: true, us: false, review: "/review/exness" },
                        { broker: "XM", mt4: true, mt5: true, ctrader: false, tv: false, prop: false, us: false, review: "/review/xm" },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          <td className="p-3 border-b font-medium">
                            <Link to={row.review} className="text-primary hover:underline">{row.broker}</Link>
                          </td>
                          <td className="p-3 border-b text-center">{row.mt4 ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : "—"}</td>
                          <td className="p-3 border-b text-center">{row.mt5 ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : "—"}</td>
                          <td className="p-3 border-b text-center">{row.ctrader ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : "—"}</td>
                          <td className="p-3 border-b text-center">{row.tv ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : "—"}</td>
                          <td className="p-3 border-b text-center">{row.prop ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : "—"}</td>
                          <td className="p-3 border-b text-center">
                            <span className={row.us ? "text-green-600 font-medium" : "text-red-500"}>
                              {row.us ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  * "Proprietary" means the broker offers its own trading platform. TradingView integration means you can trade directly from TradingView charts.
                </p>

                <QuotableFact type="regulation">
                  US-regulated brokers (CFTC/NFA) have limited platform options — most don't support cTrader
                  or TradingView integration. OANDA and Forex.com are notable exceptions with TradingView support.
                  If platform flexibility is a priority, consider offshore brokers like Pepperstone (for cTrader + TradingView).
                </QuotableFact>
              </section>

              {/* How to Choose */}
              <section id="choosing-right-platform" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Choose the Right Charting Platform</h2>
                <p className="text-muted-foreground mb-6">
                  The best platform depends on your trading style, experience level, and budget:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { icon: Monitor, title: "For Beginners", desc: "Start with TradingView (free) for chart analysis — it's intuitive and has built-in education. Use your broker's MT4/MT5 for trade execution. This costs nothing and covers all basics." },
                    { icon: TrendingUp, title: "For Day Traders & Scalpers", desc: "cTrader or MT5 for fast execution with Level II pricing. TradingView Plus ($29.95/mo) for multi-chart layouts and 100 alerts. Focus on platforms with low-latency data feeds." },
                    { icon: Code, title: "For Algo Traders", desc: "MetaTrader 5 for MQL5 Expert Advisors, or NinjaTrader for C#-based strategies. TradingView Pine Script is great for quick indicator prototyping before coding in a full language." },
                    { icon: Smartphone, title: "For Mobile-First Traders", desc: "TradingView has the best mobile charting app. MT4/MT5 mobile apps are functional but limited. cTrader mobile is excellent for execution. Avoid NinjaTrader if mobile is important — no native app." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Broker CTA */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-heading font-bold text-lg mb-2">Ready to Start Charting?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose a broker that supports your preferred charting platform. Our broker reviews cover platform
                    availability, execution quality, and trading conditions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/review/pepperstone" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                      Pepperstone (MT4/MT5/cTrader/TV) <ExternalLink className="w-3 h-3" />
                    </Link>
                    <Link to="/review/oanda" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                      OANDA (MT4/MT5/TV, US) <ExternalLink className="w-3 h-3" />
                    </Link>
                    <Link to="/review/forexcom" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                      Forex.com (MT4/MT5/TV, US) <ExternalLink className="w-3 h-3" />
                    </Link>
                    <Link to="/brokers" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                      Compare All Brokers <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-12 scroll-mt-24">
                <FAQSection faqs={faqs} />
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BestForexChartingSoftware;
