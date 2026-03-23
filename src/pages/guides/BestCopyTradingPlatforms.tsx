import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Users, ArrowLeft, Clock, CheckCircle, AlertTriangle, DollarSign, Shield, Zap, Copy, Star, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const copyTradingBrokers = [
  {
    name: "eToro",
    platform: "CopyTrader",
    minDeposit: "$50",
    copyFee: "No extra fee (spread-based)",
    availableTraders: "30M+ users",
    regulation: "FINRA, FCA, CySEC, ASIC",
    usAccepted: true,
    rating: 4.8,
    highlight: "Best Overall Copy Trading",
    reviewUrl: "/review/etoro",
    features: ["Automatic trade replication", "Social news feed", "Smart Portfolios", "Stop-loss on copy", "Virtual portfolio for practice"],
  },
  {
    name: "AvaTrade",
    platform: "ZuluTrade / DupliTrade / AvaSocial",
    minDeposit: "$100",
    copyFee: "No extra fee (spread-based)",
    availableTraders: "100K+ signal providers",
    regulation: "CBI, ASIC, FSCA, FSA",
    usAccepted: false,
    rating: 4.5,
    highlight: "Most Copy Trading Options",
    reviewUrl: "/review/avatrade",
    features: ["Multiple copy platforms", "AvaProtect risk tool", "Advanced filtering", "Performance analytics", "Mobile copy trading"],
  },
  {
    name: "FXTM",
    platform: "FXTM Invest",
    minDeposit: "$10",
    copyFee: "Profit share (20-30%)",
    availableTraders: "Thousands of strategy managers",
    regulation: "FCA, CySEC, FSCA",
    usAccepted: false,
    rating: 4.3,
    highlight: "Lowest Entry Barrier",
    reviewUrl: "/review/fxtm",
    features: ["Strategy manager rankings", "Performance history", "Flexible allocation", "Stop copying anytime", "Low minimum investment"],
  },
  {
    name: "HFM",
    platform: "HFcopy",
    minDeposit: "$100",
    copyFee: "Performance fee to strategy provider",
    availableTraders: "Active strategy providers",
    regulation: "CySEC, FCA, DFSA, FSCA",
    usAccepted: false,
    rating: 4.2,
    highlight: "Good for Strategy Providers",
    reviewUrl: "/review/hfm",
    features: ["Become a strategy provider", "Auto-copy trades", "Risk management tools", "Real-time monitoring", "Multiple strategy following"],
  },
  {
    name: "FBS",
    platform: "FBS CopyTrade",
    minDeposit: "$1",
    copyFee: "Commission on profitable trades",
    availableTraders: "Active traders on platform",
    regulation: "IFSC, CySEC, ASIC",
    usAccepted: false,
    rating: 4.0,
    highlight: "Ultra-Low Minimum Deposit",
    reviewUrl: "/review/fbs",
    features: ["Mobile copy trading app", "Trader ratings & stats", "Real-time copying", "Easy start for beginners", "$1 minimum to start"],
  },
];

const BestCopyTradingPlatforms = () => {
  const tocItems = [
    { id: "what-is-copy-trading", title: "What Is Copy Trading?", level: 2 },
    { id: "how-it-works", title: "How Copy Trading Works", level: 2 },
    { id: "best-platforms", title: "Best Copy Trading Platforms", level: 2 },
    { id: "comparison-table", title: "Platform Comparison", level: 2 },
    { id: "getting-started", title: "Getting Started Guide", level: 2 },
    { id: "risks", title: "Risks & Warnings", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "What is copy trading in forex?",
      answer: "Copy trading is a method that allows you to automatically replicate the trades of experienced traders in real time. When a trader you follow opens or closes a position, the same action is executed in your account proportionally to your allocated funds. It's popular among beginners who want market exposure while learning.",
    },
    {
      question: "Is copy trading profitable?",
      answer: "Copy trading can be profitable, but it's not guaranteed. Your results depend entirely on the traders you choose to copy. Even top-performing traders have losing periods. Diversifying across multiple traders and using risk management tools (like stop-loss on copy) can improve your chances. Historical performance is not indicative of future results.",
    },
    {
      question: "How much money do I need to start copy trading?",
      answer: "Minimum requirements vary by platform. FBS allows you to start with as little as $1, FXTM requires $10, and eToro requires $50. However, a realistic starting amount is $200-500 to allow proper diversification across multiple traders and meaningful position sizing.",
    },
    {
      question: "Can US traders use copy trading platforms?",
      answer: "Yes, but options are limited. eToro is the main copy trading platform available to US traders, regulated by FINRA. Most other copy trading platforms (AvaTrade, HFM, FXTM) do not accept US clients due to regulatory restrictions. Always verify broker availability in your state before depositing.",
    },
    {
      question: "What are the fees for copy trading?",
      answer: "Fee structures vary: eToro and AvaTrade charge no extra copy trading fee beyond their normal spreads. FXTM Invest uses a profit-sharing model where strategy managers take 20-30% of your profits. HFM and FBS charge performance fees to the strategy provider. Always check the specific fee structure before starting.",
    },
    {
      question: "Can I lose more than my deposit with copy trading?",
      answer: "With brokers that offer negative balance protection (like eToro, AvaTrade, and most regulated brokers), you cannot lose more than your deposit. However, you can lose your entire allocated amount if the copied trader performs poorly. Use stop-loss features on copy relationships to limit potential losses.",
    },
    {
      question: "How do I choose the right trader to copy?",
      answer: "Look for traders with: consistent performance over 12+ months (not just short-term gains), reasonable drawdown levels (under 20-30%), a clear trading strategy description, a verified track record, and a risk score that matches your tolerance. Avoid traders who show sudden spikes in returns, as these often indicate high-risk strategies.",
    },
    {
      question: "What is the difference between copy trading and social trading?",
      answer: "Social trading is the broader concept that includes social features like news feeds, trader discussions, and sentiment indicators. Copy trading is a specific feature within social trading that automatically replicates another trader's positions. All copy trading platforms are social trading platforms, but not all social trading platforms offer automatic copying.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Best Copy Trading Platforms for Forex 2026 | Beginner's Guide"
        description="Compare the best copy trading platforms for forex. eToro, AvaTrade, FXTM, HFM reviewed. Learn how copy trading works, fees, risks, and how to get started."
        canonical="/guides/best-copy-trading-platforms"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Best Copy Trading Platforms for Forex 2026",
          "description": "Compare the best copy trading platforms for forex traders. Learn how copy trading works, compare fees and features, and find the right platform.",
          "author": { "@type": "Organization", "name": "US Forex Guide" },
          "publisher": { "@type": "Organization", "name": "US Forex Guide" },
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
              { label: "Best Copy Trading Platforms" },
            ]}
            className="mb-6"
          />
          <Link to="/guides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Beginner</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>14 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Best <span className="text-gradient-gold">Copy Trading</span> Platforms
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Discover the top platforms that let you automatically replicate professional traders' strategies.
            Compare copy trading brokers, features, costs, and find the right platform for your experience level.
          </p>
          <LastUpdated date="March 2026" reviewedBy="Broker Research Team" />
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
                title="Copy Trading at a Glance"
                stats={[
                  { value: "30M+", label: "eToro Users", description: "Largest platform" },
                  { value: "$50", label: "Min Deposit", description: "eToro (lowest major)" },
                  { value: "5", label: "Top Platforms", description: "Reviewed here" },
                  { value: "0%", label: "Extra Fees", description: "On most platforms" },
                ]}
                source="Broker data, March 2026"
              />

              {/* What Is Copy Trading? */}
              <section id="what-is-copy-trading" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">What Is Copy Trading?</h2>
                <p className="text-muted-foreground mb-4">
                  Copy trading is a feature that allows you to automatically replicate the trades of experienced
                  investors in real time. When a trader you follow opens a position, the same trade is executed
                  in your account — proportionally scaled to your allocated funds.
                </p>
                <p className="text-muted-foreground mb-4">
                  It bridges the gap between complete beginners and experienced traders. Instead of spending months
                  learning technical analysis and market fundamentals, you can gain market exposure immediately
                  while observing how professionals trade.
                </p>

                <QuotableFact type="money">
                  According to eToro's data, copy trading has attracted over 30 million users worldwide,
                  making it one of the fastest-growing segments in retail forex trading. The appeal is simple:
                  learn by watching experts while your money works alongside theirs.
                </QuotableFact>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-6">
                  <h4 className="font-semibold mb-3">Copy Trading vs. Traditional Trading</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Copy Trading</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> No experience needed to start</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Automatic trade execution</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Learn from professional strategies</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Passive — no screen time required</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Traditional Trading</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Full control over every trade</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Develop your own strategy</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> No profit sharing or copy fees</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Deeper market understanding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How Copy Trading Works */}
              <section id="how-it-works" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">How Copy Trading Works</h2>
                <p className="text-muted-foreground mb-6">
                  The process is straightforward across most platforms. Here's the step-by-step flow:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { step: 1, title: "Open an Account", desc: "Sign up with a broker that offers copy trading. Complete identity verification (KYC) as required by regulators." },
                    { step: 2, title: "Fund Your Account", desc: "Deposit funds using your preferred method. Start with at least $200-500 for meaningful diversification." },
                    { step: 3, title: "Browse Traders", desc: "Explore the platform's leaderboard. Filter by performance, risk score, trading style, and asset focus." },
                    { step: 4, title: "Analyze & Select", desc: "Review a trader's 12+ month track record, maximum drawdown, number of copiers, and strategy description." },
                    { step: 5, title: "Allocate & Copy", desc: "Choose how much to allocate to each trader. Set a stop-loss level (e.g., stop copying if losses exceed 40% of allocated funds)." },
                    { step: 6, title: "Monitor & Adjust", desc: "Review performance regularly. Stop copying underperforming traders and diversify across 3-5 different strategies." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <QuotableFact type="regulation">
                  With copy trading, you retain full control of your funds at all times. You can stop copying
                  a trader, close individual positions, or withdraw your money whenever you want. The copied
                  trader never has direct access to your account.
                </QuotableFact>
              </section>

              {/* Best Copy Trading Platforms */}
              <section id="best-platforms" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Best Copy Trading Platforms for 2026</h2>
                <p className="text-muted-foreground mb-6">
                  We evaluated copy trading platforms based on ease of use, trader selection, fees,
                  regulation, and available risk management tools. Here are our top picks:
                </p>

                <div className="space-y-6">
                  {copyTradingBrokers.map((broker, index) => (
                    <div key={broker.name} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-bold">{broker.name}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                              {broker.highlight}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="font-semibold">{broker.rating}/5</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Platform</span>
                          <span className="font-medium">{broker.platform}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Min Deposit</span>
                          <span className="font-medium">{broker.minDeposit}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Copy Fee</span>
                          <span className="font-medium">{broker.copyFee}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">US Accepted</span>
                          <span className={`font-medium ${broker.usAccepted ? "text-green-600" : "text-red-500"}`}>
                            {broker.usAccepted ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground block mb-2">Key Features:</span>
                        <div className="flex flex-wrap gap-2">
                          {broker.features.map((feature) => (
                            <span key={feature} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-muted-foreground">Regulation: {broker.regulation}</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-muted-foreground">Traders: {broker.availableTraders}</span>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <Link to={broker.reviewUrl} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                          Read Full Review <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comparison Table */}
              <section id="comparison-table" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Platform Comparison Table</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Feature</th>
                        <th className="text-left p-3 font-semibold border-b">eToro</th>
                        <th className="text-left p-3 font-semibold border-b">AvaTrade</th>
                        <th className="text-left p-3 font-semibold border-b">FXTM</th>
                        <th className="text-left p-3 font-semibold border-b">HFM</th>
                        <th className="text-left p-3 font-semibold border-b">FBS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Copy Platform", "CopyTrader", "ZuluTrade / DupliTrade", "FXTM Invest", "HFcopy", "FBS CopyTrade"],
                        ["Min Deposit", "$50", "$100", "$10", "$100", "$1"],
                        ["Copy Fee", "None (spreads)", "None (spreads)", "20-30% profit share", "Performance fee", "Commission"],
                        ["US Accepted", "Yes", "No", "No", "No", "No"],
                        ["Regulation", "FINRA, FCA, CySEC", "CBI, ASIC, FSCA", "FCA, CySEC", "CySEC, FCA, DFSA", "IFSC, CySEC"],
                        ["Mobile App", "Yes", "Yes", "Yes", "Yes", "Yes"],
                        ["Demo Account", "Yes ($100K virtual)", "Yes", "Yes", "Yes", "Yes"],
                        ["Stop-Loss on Copy", "Yes", "Yes", "Yes", "Limited", "Limited"],
                        ["Trader Stats", "Detailed", "Detailed", "Good", "Basic", "Basic"],
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
              </section>

              {/* Getting Started Guide */}
              <section id="getting-started" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Getting Started with Copy Trading</h2>

                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Quick Start Checklist
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Choose a regulated broker with copy trading (eToro for US traders)",
                      "Open and verify your account (have ID and proof of address ready)",
                      "Start with a demo account to understand the platform",
                      "Research traders: look for 12+ months track record and under 30% max drawdown",
                      "Start small — allocate $100-200 per trader initially",
                      "Diversify across 3-5 traders with different strategies",
                      "Set stop-loss on each copy relationship (e.g., 40% of allocated funds)",
                      "Review performance monthly and adjust your portfolio",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-heading font-semibold mb-3">Tips for Choosing Traders to Copy</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Green Flags
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Consistent returns over 12+ months</li>
                      <li>Maximum drawdown under 20-30%</li>
                      <li>Clear strategy description</li>
                      <li>Large number of copiers</li>
                      <li>Reasonable risk score (4-6 out of 10)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Red Flags
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Extremely high returns (100%+ monthly)</li>
                      <li>Short track record (under 6 months)</li>
                      <li>High drawdown (50%+)</li>
                      <li>No strategy description</li>
                      <li>Very few copiers despite "great" results</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Risks & Warnings */}
              <section id="risks" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Risks & Important Warnings</h2>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">Risk Disclosure</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Copy trading involves substantial risk. Past performance of any trader is not indicative
                        of future results. You can lose some or all of your invested capital. Only invest money
                        you can afford to lose. CFDs are complex instruments and come with a high risk of losing
                        money rapidly due to leverage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Market Risk",
                      desc: "Even the best traders have losing periods. Markets can move against any strategy, especially during high-volatility events like central bank decisions or geopolitical crises.",
                    },
                    {
                      title: "Slippage Risk",
                      desc: "There can be a delay between when the copied trader executes and when your copy trade executes. During fast markets, this can result in different entry/exit prices.",
                    },
                    {
                      title: "Strategy Change Risk",
                      desc: "A trader you're copying may change their strategy without notice. What worked in the past may not reflect their current approach.",
                    },
                    {
                      title: "Over-Allocation Risk",
                      desc: "Putting too much capital into a single trader creates concentration risk. Always diversify across multiple traders with different strategies and asset classes.",
                    },
                    {
                      title: "Leverage Risk",
                      desc: "The traders you copy may use high leverage, amplifying both gains and losses. Check the leverage settings on your copy and the trader's typical position sizes.",
                    },
                  ].map((risk) => (
                    <div key={risk.title} className="flex gap-3">
                      <Shield className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{risk.title}</h4>
                        <p className="text-sm text-muted-foreground">{risk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-12 scroll-mt-24">
                <FAQSection items={faqs} />
              </section>

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-8">
                <h3 className="text-xl font-heading font-bold mb-2">Ready to Start Copy Trading?</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Compare our top-rated brokers with copy trading features and open a demo account to practice risk-free.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/review/etoro" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                    eToro Review (US Traders)
                  </Link>
                  <Link to="/brokers" className="px-6 py-2 bg-card border border-border rounded-lg font-medium hover:bg-muted transition-colors text-sm">
                    Compare All Brokers
                  </Link>
                </div>
              </div>

              <NewsletterCTA />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BestCopyTradingPlatforms;
