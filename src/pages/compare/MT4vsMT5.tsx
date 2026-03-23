import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle, Monitor, ArrowRight, Shield, Zap, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/brokers";

const mt4Brokers = Object.values(brokers).filter(b => b.platforms.includes("MT4"));
const mt5Brokers = Object.values(brokers).filter(b => b.platforms.includes("MT5"));
const bothPlatformBrokers = Object.values(brokers).filter(b => b.platforms.includes("MT4") && b.platforms.includes("MT5"));

const comparisonFeatures = [
  { feature: "Release Year", mt4: "2005", mt5: "2010", winner: "mt5" as const },
  { feature: "Order Types", mt4: "4 (Market, Limit, Stop, Trailing Stop)", mt5: "6 (+Buy/Sell Stop Limit)", winner: "mt5" as const },
  { feature: "Timeframes", mt4: "9", mt5: "21", winner: "mt5" as const },
  { feature: "Built-in Indicators", mt4: "30", mt5: "38", winner: "mt5" as const },
  { feature: "Graphical Objects", mt4: "31", mt5: "44", winner: "mt5" as const },
  { feature: "Economic Calendar", mt4: "No (third-party needed)", mt5: "Yes (built-in)", winner: "mt5" as const },
  { feature: "Depth of Market (DOM)", mt4: "Limited", mt5: "Full DOM", winner: "mt5" as const },
  { feature: "Hedging", mt4: "Yes (native)", mt5: "Yes (option)", winner: "tie" as const },
  { feature: "Netting", mt4: "No", mt5: "Yes", winner: "mt5" as const },
  { feature: "Programming Language", mt4: "MQL4", mt5: "MQL5", winner: "mt5" as const },
  { feature: "Strategy Tester", mt4: "Single-threaded", mt5: "Multi-threaded", winner: "mt5" as const },
  { feature: "Expert Advisors (EAs)", mt4: "Huge marketplace", mt5: "Growing marketplace", winner: "mt4" as const },
  { feature: "Custom Indicators", mt4: "Huge library", mt5: "Smaller but growing", winner: "mt4" as const },
  { feature: "Asset Classes", mt4: "Forex, CFDs", mt5: "Forex, Stocks, Futures, Options, CFDs", winner: "mt5" as const },
  { feature: "Partial Order Fill", mt4: "No", mt5: "Yes (multiple fill policies)", winner: "mt5" as const },
  { feature: "Email Alerts", mt4: "Yes", mt5: "Yes + push notifications", winner: "mt5" as const },
  { feature: "Community & Resources", mt4: "Massive (20 years)", mt5: "Large (15 years)", winner: "mt4" as const },
  { feature: "Broker Availability", mt4: "Near-universal", mt5: "Very common", winner: "mt4" as const },
];

const MT4vsMT5 = () => {
  const tocItems = [
    { id: "overview", title: "Quick Overview", level: 2 },
    { id: "comparison-table", title: "Feature Comparison Table", level: 2 },
    { id: "order-types", title: "Order Types & Execution", level: 2 },
    { id: "charting", title: "Charting & Analysis", level: 2 },
    { id: "eas-algo", title: "Expert Advisors & Algo Trading", level: 2 },
    { id: "hedging-netting", title: "Hedging vs Netting", level: 2 },
    { id: "broker-support", title: "Which Brokers Support Each?", level: 2 },
    { id: "when-mt4", title: "When to Choose MT4", level: 2 },
    { id: "when-mt5", title: "When to Choose MT5", level: 2 },
    { id: "migration", title: "MT4 to MT5 Migration Guide", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "Is MT5 better than MT4?",
      answer: "MT5 is technically superior with more timeframes (21 vs 9), more order types (6 vs 4), multi-threaded backtesting, a built-in economic calendar, and support for stocks and futures. However, MT4 remains popular due to its massive library of custom indicators and Expert Advisors. The 'better' platform depends on your specific needs."
    },
    {
      question: "Can I use MT4 indicators on MT5?",
      answer: "No, MT4 indicators and Expert Advisors cannot be directly used on MT5. MT4 uses MQL4, while MT5 uses MQL5 — they are different programming languages. You'll need to either find MT5-native versions, rewrite the code in MQL5, or use a conversion tool (though results vary)."
    },
    {
      question: "Why do most traders still use MT4?",
      answer: "MT4 has a 20-year head start and an enormous ecosystem of custom indicators, Expert Advisors, and community resources. Many traders have invested years learning MQL4 and building or purchasing MT4-based tools. The switching cost — both in terms of replacing tools and relearning — keeps many traders on MT4."
    },
    {
      question: "Is MetaTrader 4 being discontinued?",
      answer: "MetaQuotes (the developer) stopped issuing new MT4 licenses to brokers in 2022, encouraging migration to MT5. However, existing MT4 installations continue to be supported and updated. MT4 is not being shut down, but the long-term trend clearly favors MT5. New traders may want to start on MT5."
    },
    {
      question: "Can I run MT4 and MT5 at the same time?",
      answer: "Yes, you can install and run both MT4 and MT5 on the same computer simultaneously. Many traders do this — using MT4 for specific EAs or indicators while taking advantage of MT5's superior charting and multi-asset capabilities."
    },
    {
      question: "Which platform is better for scalping?",
      answer: "MT5 has a slight edge for scalping thanks to its faster execution, more order types (including Buy/Sell Stop Limit), and Depth of Market (DOM) feature. However, if you rely on specific MT4-only scalping EAs, staying on MT4 may be more practical."
    },
    {
      question: "Do US brokers support MetaTrader?",
      answer: "Most US CFTC-regulated brokers do not offer MetaTrader. OANDA previously offered MT4 but has transitioned to its own platform. Forex.com offers both MT4 and MT5 for US clients. Offshore brokers that accept US traders typically offer both MT4 and MT5."
    },
    {
      question: "Is MT5 free to download?",
      answer: "Yes, both MT4 and MT5 are free to download and use. You download them either from your broker's website or from the official MetaTrader website. There are no subscription fees — brokers pay MetaQuotes for the license."
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "MT4 vs MT5: Which MetaTrader Platform Is Better in 2026?",
    "description": "Detailed comparison of MetaTrader 4 and MetaTrader 5. Compare features, order types, indicators, Expert Advisors, and find out which platform suits your trading style.",
    "datePublished": "2026-03-23",
    "dateModified": "2026-03-23",
    "author": { "@type": "Organization", "name": "Beginner FX Guide", "url": "https://beginnerfxguide.com" },
    "publisher": { "@type": "Organization", "name": "Beginner FX Guide", "url": "https://beginnerfxguide.com" },
  };

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="MT4 vs MT5: Which MetaTrader Platform Is Better? (2026)"
        description="Detailed MetaTrader 4 vs MetaTrader 5 comparison. Compare order types, timeframes, indicators, Expert Advisors, hedging, and find the right platform for your trading."
        canonical="/compare/mt4-vs-mt5"
        jsonLd={jsonLd}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Compare", href: "/compare" },
              { label: "MT4 vs MT5" },
            ]}
            className="mb-6"
          />
          <Link to="/compare" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Comparisons
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Monitor className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Platform Guide</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            MT4 vs MT5: <span className="text-gradient-gold">Which Is Better?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            MetaTrader 4 and MetaTrader 5 are the world's most popular forex trading platforms.
            This guide breaks down every difference so you can choose the right one for your trading style.
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
                title="MetaTrader at a Glance"
                stats={[
                  { value: "21", label: "MT5 Timeframes", description: "vs 9 on MT4" },
                  { value: "6", label: "MT5 Order Types", description: "vs 4 on MT4" },
                  { value: String(mt4Brokers.length), label: "MT4 Brokers", description: "We review" },
                  { value: String(mt5Brokers.length), label: "MT5 Brokers", description: "We review" },
                ]}
                source="MetaQuotes & broker data, March 2026"
              />

              {/* Quick Overview */}
              <section id="overview" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Quick Overview</h2>
                <p className="text-muted-foreground mb-4">
                  MetaTrader 4 (MT4) launched in 2005 and quickly became the industry standard for retail forex trading.
                  MetaTrader 5 (MT5) followed in 2010 as a more powerful successor, designed for multi-asset trading
                  across forex, stocks, futures, and commodities.
                </p>
                <p className="text-muted-foreground mb-4">
                  Despite MT5's technical superiority, MT4 remains widely used thanks to its massive ecosystem of
                  custom indicators and Expert Advisors (EAs). Both platforms are developed by MetaQuotes Software
                  and are free to download.
                </p>

                <QuotableFact type="info">
                  MetaQuotes stopped issuing new MT4 licenses to brokers in 2022, signaling the long-term shift
                  toward MT5. However, existing MT4 installations continue to receive updates and support.
                  If you're starting fresh, MT5 is the future-proof choice.
                </QuotableFact>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-card border rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">4</span>
                      </div>
                      MetaTrader 4
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Massive EA & indicator library</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Simpler, easier to learn</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Native hedging support</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Near-universal broker support</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> Limited to forex & CFDs</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> Only 9 timeframes</li>
                    </ul>
                  </div>
                  <div className="bg-card border rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">5</span>
                      </div>
                      MetaTrader 5
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> 21 timeframes, 6 order types</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Multi-asset: stocks, futures, options</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Multi-threaded strategy tester</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Built-in economic calendar</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> Smaller EA marketplace</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> MT4 tools not compatible</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Comparison Table */}
              <section id="comparison-table" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Feature Comparison Table</h2>
                <p className="text-muted-foreground mb-6">
                  A side-by-side look at every major difference between MT4 and MT5.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 border font-semibold">Feature</th>
                        <th className="text-center p-3 border font-semibold text-blue-600 dark:text-blue-400">MT4</th>
                        <th className="text-center p-3 border font-semibold text-purple-600 dark:text-purple-400">MT5</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          <td className="p-3 border font-medium">{row.feature}</td>
                          <td className={`p-3 border text-center ${row.winner === "mt4" ? "bg-green-50 dark:bg-green-900/10 font-semibold text-green-700 dark:text-green-400" : "text-muted-foreground"}`}>
                            {row.mt4}
                            {row.winner === "mt4" && " ✓"}
                          </td>
                          <td className={`p-3 border text-center ${row.winner === "mt5" ? "bg-green-50 dark:bg-green-900/10 font-semibold text-green-700 dark:text-green-400" : "text-muted-foreground"}`}>
                            {row.mt5}
                            {row.winner === "mt5" && " ✓"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Order Types & Execution */}
              <section id="order-types" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Order Types & Execution</h2>
                <p className="text-muted-foreground mb-4">
                  MT4 supports 4 order types: Market, Limit, Stop, and Trailing Stop. These cover most retail trading scenarios.
                </p>
                <p className="text-muted-foreground mb-4">
                  MT5 adds 2 additional pending orders: <strong>Buy Stop Limit</strong> and <strong>Sell Stop Limit</strong>.
                  These allow you to place a limit order that only activates after a specified stop price is reached — useful
                  for breakout strategies where you want a specific entry price after confirmation.
                </p>
                <p className="text-muted-foreground mb-4">
                  MT5 also supports <strong>multiple fill policies</strong> (Fill or Kill, Immediate or Cancel, Return)
                  and <strong>partial order fills</strong>, giving you more control over execution in fast-moving markets.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Verdict: Order Types
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>MT5 wins.</strong> The extra order types and fill policies give advanced traders more
                    precision, especially for breakout and algorithmic strategies. For basic market and limit orders,
                    both platforms work equally well.
                  </p>
                </div>
              </section>

              {/* Charting & Analysis */}
              <section id="charting" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Charting & Analysis</h2>
                <p className="text-muted-foreground mb-4">
                  MT4 offers <strong>9 timeframes</strong> (M1, M5, M15, M30, H1, H4, D1, W1, MN).
                  MT5 expands this to <strong>21 timeframes</strong>, adding M2, M3, M4, M6, M10, M12, M20,
                  H2, H3, H6, H8, and H12. This gives multi-timeframe analysts much finer granularity.
                </p>
                <p className="text-muted-foreground mb-4">
                  MT5 includes <strong>38 built-in technical indicators</strong> versus MT4's 30, and
                  <strong> 44 graphical objects</strong> versus 31. MT5 also supports <strong>unlimited charts</strong>
                  per symbol, while MT4 limits you to one chart per symbol in some configurations.
                </p>
                <p className="text-muted-foreground mb-4">
                  The built-in <strong>Economic Calendar</strong> is exclusive to MT5. MT4 users need third-party
                  plugins or external websites to track economic events.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Verdict: Charting
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>MT5 wins decisively.</strong> More timeframes, more indicators, more drawing tools,
                    and a built-in economic calendar make MT5 the clear choice for technical analysis.
                  </p>
                </div>
              </section>

              {/* Expert Advisors & Algo Trading */}
              <section id="eas-algo" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Expert Advisors & Algorithmic Trading</h2>
                <p className="text-muted-foreground mb-4">
                  Expert Advisors (EAs) are automated trading programs that execute trades based on predefined rules.
                  Both platforms support EAs, but the ecosystems differ significantly.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-card border rounded-xl p-5">
                    <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">MT4 (MQL4)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Thousands of free & paid EAs</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> C-like syntax, easier to learn</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Massive community & tutorials</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> Single-threaded backtesting</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> No multi-currency backtesting</li>
                    </ul>
                  </div>
                  <div className="bg-card border rounded-xl p-5">
                    <h4 className="font-semibold mb-3 text-purple-600 dark:text-purple-400">MT5 (MQL5)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Multi-threaded backtesting (much faster)</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Multi-currency/multi-symbol testing</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Object-oriented programming</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> Smaller EA marketplace</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /> Steeper learning curve</li>
                    </ul>
                  </div>
                </div>

                <QuotableFact type="warning">
                  MT4 EAs and indicators are NOT compatible with MT5. If you've purchased or developed MT4 tools,
                  switching to MT5 means either finding MT5 equivalents or rewriting the code in MQL5. This is the
                  single biggest barrier to MT5 adoption.
                </QuotableFact>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Verdict: Algo Trading
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>It depends.</strong> MT5 has better technology (multi-threaded testing, OOP). But MT4 has
                    the larger marketplace. If you rely on specific MT4 EAs, stay on MT4. If you're building from
                    scratch, MT5's MQL5 is the better language.
                  </p>
                </div>
              </section>

              {/* Hedging vs Netting */}
              <section id="hedging-netting" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Hedging vs Netting</h2>
                <p className="text-muted-foreground mb-4">
                  This is one of the most misunderstood differences between the two platforms.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>MT4</strong> uses a <strong>hedging</strong> system by default: you can hold multiple positions
                  in the same instrument simultaneously, including opposite directions (buy and sell EUR/USD at the same time).
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>MT5</strong> was originally designed with a <strong>netting</strong> system, where all orders
                  in the same symbol are combined into a single net position. However, since 2016, MT5 also supports
                  hedging mode — your broker chooses which mode to offer (most forex brokers enable hedging).
                </p>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-4">
                  <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400">Important for US Traders</h4>
                  <p className="text-sm text-muted-foreground">
                    Under CFTC regulations, US brokers must use the FIFO (First In, First Out) rule, which effectively
                    prevents hedging. US-regulated brokers on both MT4 and MT5 enforce FIFO compliance, so this
                    distinction matters less for US-based accounts.
                  </p>
                </div>
              </section>

              {/* Broker Support */}
              <section id="broker-support" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Which Brokers Support Each Platform?</h2>
                <p className="text-muted-foreground mb-4">
                  Most major brokers now offer both MT4 and MT5. Here's what the brokers we review support:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-card border rounded-xl p-5">
                    <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">
                      MT4 Brokers ({mt4Brokers.length})
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {mt4Brokers.map(b => (
                        <li key={b.id} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          <Link to={b.reviewUrl} className="hover:text-primary transition-colors">{b.name}</Link>
                          {b.platforms.includes("MT5") && <span className="text-xs text-muted-foreground/60">(+MT5)</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card border rounded-xl p-5">
                    <h4 className="font-semibold mb-3 text-purple-600 dark:text-purple-400">
                      MT5 Brokers ({mt5Brokers.length})
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {mt5Brokers.map(b => (
                        <li key={b.id} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          <Link to={b.reviewUrl} className="hover:text-primary transition-colors">{b.name}</Link>
                          {b.platforms.includes("MT4") && <span className="text-xs text-muted-foreground/60">(+MT4)</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {bothPlatformBrokers.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    <strong>{bothPlatformBrokers.length} brokers</strong> we review offer both MT4 and MT5, giving you the flexibility to choose or even run both simultaneously.
                  </p>
                )}
              </section>

              {/* When to Choose MT4 */}
              <section id="when-mt4" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">When to Choose MT4</h2>
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You rely on specific MT4 EAs or indicators</strong> — your tools only work on MQL4 and no MT5 equivalent exists.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You only trade forex and CFDs</strong> — MT4 covers everything you need without the extra complexity.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You want maximum community resources</strong> — 20 years of tutorials, forums, and free tools.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You're a beginner who prefers simplicity</strong> — MT4's interface is slightly more straightforward.</div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* When to Choose MT5 */}
              <section id="when-mt5" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">When to Choose MT5</h2>
                <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You're a new trader starting fresh</strong> — no legacy MT4 tools to worry about, and MT5 is the future-proof choice.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You want multi-asset trading</strong> — stocks, futures, and options alongside forex.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You do heavy backtesting</strong> — MT5's multi-threaded tester is dramatically faster.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You use advanced order types</strong> — Buy/Sell Stop Limit orders and partial fill policies.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div><strong>You rely on multi-timeframe analysis</strong> — 21 timeframes vs MT4's 9.</div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Migration Guide */}
              <section id="migration" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">MT4 to MT5 Migration Guide</h2>
                <p className="text-muted-foreground mb-6">
                  Thinking of switching from MT4 to MT5? Here's a step-by-step approach:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Audit Your MT4 Tools",
                      desc: "List all EAs, indicators, and scripts you use on MT4. Check if MT5 versions exist on the MQL5 marketplace or from the original developer."
                    },
                    {
                      step: 2,
                      title: "Open an MT5 Demo Account",
                      desc: "Most brokers offer both platforms. Open an MT5 demo to familiarize yourself with the interface differences — they're minor but notable."
                    },
                    {
                      step: 3,
                      title: "Test Your Strategy on MT5",
                      desc: "Use MT5's multi-threaded strategy tester to backtest your approach. Compare results with MT4 backtests to ensure consistency."
                    },
                    {
                      step: 4,
                      title: "Run Both Platforms in Parallel",
                      desc: "You don't have to switch cold. Run MT4 and MT5 side by side for a few weeks. Trade on MT5 demo while keeping MT4 live."
                    },
                    {
                      step: 5,
                      title: "Migrate Your Live Account",
                      desc: "Contact your broker to open an MT5 live account (or switch). Transfer your settings, templates, and profiles. Most brokers make this seamless."
                    },
                    {
                      step: 6,
                      title: "Learn MQL5 Gradually",
                      desc: "If you develop custom tools, start learning MQL5's object-oriented syntax. The MetaTrader community and documentation make this manageable."
                    },
                  ].map(item => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="mb-12 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold mb-3">Find the Best MT4 & MT5 Brokers</h3>
                <p className="text-muted-foreground mb-6">
                  Compare brokers that offer MetaTrader platforms with the best trading conditions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <Link to="/brokers" className="flex items-center gap-2">
                      Compare All Brokers
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/tools/broker-quiz" className="flex items-center gap-2">
                      Take the Broker Quiz
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-12 scroll-mt-24">
                <FAQSection faqs={faqs} title="MT4 vs MT5: Frequently Asked Questions" />
              </section>

              {/* Newsletter */}
              <NewsletterCTA />

            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default MT4vsMT5;
