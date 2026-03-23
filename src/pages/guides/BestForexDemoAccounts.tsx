import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Monitor, ArrowLeft, Clock, CheckCircle, AlertTriangle, Star, ExternalLink, Shield, Zap, RefreshCw } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const demoAccountBrokers = [
  {
    name: "eToro",
    demoBalance: "$100,000",
    timeLimit: "Unlimited",
    platforms: ["eToro Platform", "Mobile App"],
    realAccountRequired: false,
    liveSwitchProcess: "One-click switch to real account",
    regulation: "FINRA, FCA, CySEC, ASIC",
    usAccepted: true,
    rating: 4.8,
    highlight: "Best Overall Demo Account",
    reviewUrl: "/review/etoro",
    features: ["Virtual portfolio", "Copy trading in demo", "Social features available", "No time limit", "Practice with real market data"],
  },
  {
    name: "OANDA",
    demoBalance: "Customizable",
    timeLimit: "Unlimited",
    platforms: ["OANDA Trade", "MT4", "TradingView"],
    realAccountRequired: false,
    liveSwitchProcess: "Separate live account registration",
    regulation: "CFTC/NFA, FCA, ASIC, MAS",
    usAccepted: true,
    rating: 4.7,
    highlight: "Best for US Traders",
    reviewUrl: "/review/oanda",
    features: ["Customizable balance", "TradingView charts", "Advanced order types", "Spreads mirror live", "No expiration"],
  },
  {
    name: "Forex.com",
    demoBalance: "$50,000",
    timeLimit: "30 days (renewable)",
    platforms: ["Forex.com Platform", "MT4", "MT5"],
    realAccountRequired: false,
    liveSwitchProcess: "Quick upgrade to live account",
    regulation: "CFTC/NFA, FCA, CySEC, ASIC",
    usAccepted: true,
    rating: 4.6,
    highlight: "Best Multi-Platform Demo",
    reviewUrl: "/review/forexcom",
    features: ["Three platform options", "Performance analytics", "TradingView integration", "Real-time pricing", "Education resources"],
  },
  {
    name: "IG Markets",
    demoBalance: "$20,000",
    timeLimit: "Unlimited",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    realAccountRequired: false,
    liveSwitchProcess: "Seamless live account activation",
    regulation: "CFTC/NFA, FCA, ASIC, BaFin",
    usAccepted: true,
    rating: 4.7,
    highlight: "Best Professional Demo",
    reviewUrl: "/review/ig-markets",
    features: ["ProRealTime charts", "Reuters news access", "Price alerts", "40+ years trusted", "Multiple platforms"],
  },
  {
    name: "Interactive Brokers",
    demoBalance: "$1,000,000",
    timeLimit: "Unlimited",
    platforms: ["TWS", "IBKR Mobile", "Client Portal"],
    realAccountRequired: false,
    liveSwitchProcess: "Separate live account application",
    regulation: "SEC, CFTC/NFA, FCA, MAS",
    usAccepted: true,
    rating: 4.5,
    highlight: "Highest Demo Balance",
    reviewUrl: "/review/interactive-brokers",
    features: ["$1M virtual balance", "Full TWS access", "Multi-asset trading", "Paper trading mode", "Algo testing"],
  },
  {
    name: "Charles Schwab",
    demoBalance: "$100,000",
    timeLimit: "Unlimited",
    platforms: ["thinkorswim Desktop", "thinkorswim Mobile"],
    realAccountRequired: false,
    liveSwitchProcess: "Open live account separately",
    regulation: "SEC, CFTC/NFA",
    usAccepted: true,
    rating: 4.5,
    highlight: "Best for Paper Trading",
    reviewUrl: "/review/charles-schwab",
    features: ["thinkorswim paperMoney", "400+ indicators", "Full platform access", "Options analysis", "ThinkScript testing"],
  },
  {
    name: "XM",
    demoBalance: "$100,000",
    timeLimit: "Unlimited (active within 60 days)",
    platforms: ["MT4", "MT5", "XM App"],
    realAccountRequired: false,
    liveSwitchProcess: "Quick live account opening",
    regulation: "CySEC, ASIC, DFSA, IFSC",
    usAccepted: false,
    rating: 4.4,
    highlight: "Best for MT4/MT5 Practice",
    reviewUrl: "/review/xm",
    features: ["MT4 & MT5 platforms", "Multiple demo accounts", "Real-time market data", "Free education", "Webinars access"],
  },
  {
    name: "Pepperstone",
    demoBalance: "$50,000",
    timeLimit: "30 days (renewable)",
    platforms: ["MT4", "MT5", "cTrader", "TradingView"],
    realAccountRequired: false,
    liveSwitchProcess: "Simple transition to live trading",
    regulation: "FCA, ASIC, CySEC, DFSA, BaFin",
    usAccepted: false,
    rating: 4.6,
    highlight: "Best for cTrader Demo",
    reviewUrl: "/review/pepperstone",
    features: ["Four platform options", "cTrader included", "Raw spread testing", "TradingView integration", "Fast execution demo"],
  },
];

const BestForexDemoAccounts = () => {
  const tocItems = [
    { id: "what-is-demo-account", title: "What Is a Demo Account?", level: 2 },
    { id: "best-demo-accounts", title: "Best Demo Accounts 2026", level: 2 },
    { id: "comparison-table", title: "Demo Account Comparison", level: 2 },
    { id: "demo-vs-real", title: "Demo vs. Real Account", level: 2 },
    { id: "what-to-look-for", title: "What to Look For", level: 2 },
    { id: "step-by-step", title: "How to Open a Demo Account", level: 2 },
    { id: "tips", title: "Demo Trading Tips", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "What is a forex demo account?",
      answer: "A forex demo account is a practice trading account funded with virtual money. It mirrors real market conditions — live prices, real-time charts, and the same trading platform — but uses simulated funds so you can learn without risking real capital. Most major brokers offer free demo accounts.",
    },
    {
      question: "How long can I use a demo account?",
      answer: "It depends on the broker. eToro, OANDA, IG, Interactive Brokers, and Charles Schwab offer unlimited demo accounts. Forex.com and Pepperstone provide 30-day demos that can be renewed. Some brokers like XM keep demo accounts active as long as you log in within 60 days.",
    },
    {
      question: "Do I need to deposit money to open a demo account?",
      answer: "No. Virtually all reputable brokers offer demo accounts without requiring a deposit. You typically only need an email address and basic information to get started. Be cautious of any broker that requires a deposit before granting demo access.",
    },
    {
      question: "Is demo trading the same as real trading?",
      answer: "Demo trading replicates market conditions closely, but there are key differences. Demo accounts don't involve real emotions (fear, greed), may have different execution speeds, and won't experience the same slippage or liquidity issues as live trading. Treat demo trading seriously to build good habits, but expect some adjustment when switching to a live account.",
    },
    {
      question: "Can US traders open forex demo accounts?",
      answer: "Yes. US traders can open demo accounts with CFTC/NFA-regulated brokers including OANDA, Forex.com, IG Markets, Interactive Brokers, and Charles Schwab (thinkorswim). eToro also accepts US clients. Offshore broker demos are available but lack US regulatory protection.",
    },
    {
      question: "How much virtual money should I use in a demo account?",
      answer: "Set your demo balance to match the amount you plan to deposit in a real account. If you intend to start with $500, practice with $500 in demo — not $100,000. This creates more realistic position sizing and risk management conditions, making the transition to live trading smoother.",
    },
    {
      question: "When should I switch from demo to a real account?",
      answer: "Consider switching when you can consistently follow your trading plan for 2-3 months, demonstrate steady (not necessarily profitable) results with proper risk management, and feel comfortable with the platform. Most experts recommend at least 2-3 months of demo trading before going live, starting with a small real deposit.",
    },
    {
      question: "Can I have multiple demo accounts?",
      answer: "Yes. Most brokers allow multiple demo accounts, which is useful for testing different strategies or platforms. XM, for example, lets you open several demo accounts simultaneously. This is a great way to compare MT4 vs. MT5 or different account types without commitment.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Best Forex Demo Accounts 2026 — Practice Trading Risk-Free | Beginner's Guide"
        description="Compare the best forex demo accounts for 2026. eToro, OANDA, Forex.com, IG, Interactive Brokers reviewed. Learn how demo accounts work, what to look for, and when to switch to live trading."
        canonical="/guides/best-forex-demo-accounts"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Best Forex Demo Accounts 2026 — Practice Trading Risk-Free",
          "description": "Compare the best forex demo accounts for beginners. Learn how demo accounts work, which brokers offer the best practice environments, and how to transition to live trading.",
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
              { label: "Best Forex Demo Accounts" },
            ]}
            className="mb-6"
          />
          <Link to="/guides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Monitor className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Beginner</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Best Forex <span className="text-gradient-gold">Demo Accounts</span> 2026
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Practice forex trading risk-free with virtual money. Compare demo accounts from top brokers,
            learn what to look for, and discover when you're ready to switch to live trading.
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
                title="Demo Accounts at a Glance"
                stats={[
                  { value: "8", label: "Brokers Reviewed", description: "Top demo accounts" },
                  { value: "$0", label: "Cost to Start", description: "All demos are free" },
                  { value: "$1M", label: "Highest Balance", description: "Interactive Brokers" },
                  { value: "6", label: "US-Friendly", description: "Accept US traders" },
                ]}
                source="Broker data, March 2026"
              />

              {/* What Is a Demo Account? */}
              <section id="what-is-demo-account" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">What Is a Forex Demo Account?</h2>
                <p className="text-muted-foreground mb-4">
                  A forex demo account is a risk-free practice environment provided by brokers that simulates
                  live market conditions using virtual funds. You get access to the same trading platform, real-time
                  price data, and charting tools as live traders — but without risking any real money.
                </p>
                <p className="text-muted-foreground mb-4">
                  Demo accounts are the single most important tool for beginner forex traders. They allow you to
                  learn how the platform works, test trading strategies, and build confidence before committing
                  real capital to the markets.
                </p>

                <QuotableFact type="money">
                  Studies show that traders who practice on demo accounts for at least 2-3 months before going live
                  have significantly better risk management habits. A demo account costs nothing but can save you
                  thousands in beginner mistakes.
                </QuotableFact>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-6">
                  <h4 className="font-semibold mb-3">What You Can Do With a Demo Account</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Practice & Learn</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Learn platform navigation</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Practice placing orders</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Read charts and indicators</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Understand leverage effects</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-primary">Test & Evaluate</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Test trading strategies</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Compare broker platforms</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Try different account types</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Evaluate execution speed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Best Demo Accounts */}
              <section id="best-demo-accounts" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Best Forex Demo Accounts for 2026</h2>
                <p className="text-muted-foreground mb-6">
                  We evaluated demo accounts based on virtual balance, time limits, platform access,
                  similarity to live conditions, and transition process. Here are our top picks:
                </p>

                <div className="space-y-6">
                  {demoAccountBrokers.map((broker, index) => (
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
                          <span className="text-muted-foreground block">Demo Balance</span>
                          <span className="font-medium">{broker.demoBalance}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Time Limit</span>
                          <span className="font-medium">{broker.timeLimit}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Platforms</span>
                          <span className="font-medium">{broker.platforms.join(", ")}</span>
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
                        <span className="text-muted-foreground">Live Switch: {broker.liveSwitchProcess}</span>
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
                <h2 className="text-2xl font-heading font-bold mb-4">Demo Account Comparison Table</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Broker</th>
                        <th className="text-left p-3 font-semibold border-b">Balance</th>
                        <th className="text-left p-3 font-semibold border-b">Time Limit</th>
                        <th className="text-left p-3 font-semibold border-b">Platforms</th>
                        <th className="text-left p-3 font-semibold border-b">US Accepted</th>
                        <th className="text-left p-3 font-semibold border-b">Deposit Req.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoAccountBrokers.map((broker, i) => (
                        <tr key={broker.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          <td className="p-3 border-b font-medium">{broker.name}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.demoBalance}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.timeLimit}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.platforms.slice(0, 2).join(", ")}</td>
                          <td className="p-3 border-b">
                            <span className={broker.usAccepted ? "text-green-600" : "text-red-500"}>
                              {broker.usAccepted ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="p-3 border-b text-muted-foreground">No</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Demo vs Real Account */}
              <section id="demo-vs-real" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Demo Account vs. Real Account</h2>
                <p className="text-muted-foreground mb-6">
                  While demo accounts closely mirror live trading conditions, there are important differences
                  to be aware of before making the switch:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Aspect</th>
                        <th className="text-left p-3 font-semibold border-b">Demo Account</th>
                        <th className="text-left p-3 font-semibold border-b">Real Account</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Capital", "Virtual funds (no risk)", "Real money at stake"],
                        ["Emotions", "Minimal pressure", "Fear, greed, and stress affect decisions"],
                        ["Execution", "Usually instant fills", "Slippage and requotes possible"],
                        ["Spreads", "May be slightly tighter", "Widen during news events & low liquidity"],
                        ["Liquidity", "Unlimited simulated liquidity", "Real market depth affects large orders"],
                        ["Risk Management", "Easy to ignore stop-losses", "Poor risk management costs real money"],
                        ["Learning Value", "High — platform & strategy testing", "High — emotional discipline development"],
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

                <QuotableFact type="regulation">
                  The biggest gap between demo and live trading is psychological, not technical. When real money is
                  on the line, traders often deviate from their strategy — cutting winners short and letting losers run.
                  This is why transitioning gradually with small amounts is critical.
                </QuotableFact>
              </section>

              {/* What to Look For */}
              <section id="what-to-look-for" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">What to Look for in a Demo Account</h2>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Realistic Conditions",
                      desc: "The demo should mirror live spreads, execution speeds, and available instruments. Avoid demos with artificially tight spreads that won't reflect your real trading costs.",
                      icon: Shield,
                    },
                    {
                      title: "No Time Limit",
                      desc: "Unlimited demo accounts let you practice at your own pace. If a demo expires after 30 days, check if it can be renewed or if the broker offers unlimited access.",
                      icon: Clock,
                    },
                    {
                      title: "Adjustable Balance",
                      desc: "Set the demo balance to match your intended real deposit. Practicing with $100K when you plan to deposit $500 teaches unrealistic position sizing habits.",
                      icon: RefreshCw,
                    },
                    {
                      title: "Full Platform Access",
                      desc: "The demo should provide the same charting tools, indicators, order types, and features as the live platform. Some brokers restrict demo functionality — avoid those.",
                      icon: Monitor,
                    },
                    {
                      title: "Same Broker You'll Use Live",
                      desc: "Practice on the broker you plan to trade with. Platform familiarity reduces mistakes when you switch to live trading and eliminates the need to re-learn a new interface.",
                      icon: Zap,
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Step by Step */}
              <section id="step-by-step" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Open a Forex Demo Account</h2>
                <p className="text-muted-foreground mb-6">
                  Opening a demo account takes under 5 minutes with most brokers. Here's the process:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { step: 1, title: "Choose a Broker", desc: "Select a regulated broker from our list above. US traders should choose CFTC/NFA-regulated options like OANDA, Forex.com, or IG." },
                    { step: 2, title: "Visit the Demo Registration Page", desc: "Most brokers have a prominent 'Open Demo Account' or 'Try Free Demo' button on their homepage." },
                    { step: 3, title: "Fill In Basic Details", desc: "Typically just your name, email address, and phone number. No ID verification or financial information needed for demos." },
                    { step: 4, title: "Choose Platform & Settings", desc: "Select your preferred platform (MT4, MT5, or proprietary), account type, leverage, and starting balance if customizable." },
                    { step: 5, title: "Download the Platform", desc: "Install the desktop or mobile trading platform. You'll receive login credentials via email." },
                    { step: 6, title: "Start Trading", desc: "Log in with your demo credentials and begin exploring the platform. Start with small virtual positions while you learn." },
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
              </section>

              {/* Demo Trading Tips */}
              <section id="tips" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Demo Trading Tips for Beginners</h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Do This
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Set a realistic virtual balance</li>
                      <li>Trade with a written plan</li>
                      <li>Use proper position sizing (1-2% risk per trade)</li>
                      <li>Keep a trading journal</li>
                      <li>Practice for at least 2-3 months</li>
                      <li>Test your strategy across different market conditions</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Avoid This
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Trading with unrealistically large balances</li>
                      <li>Ignoring stop-losses because "it's not real"</li>
                      <li>Over-leveraging positions</li>
                      <li>Switching to live too quickly</li>
                      <li>Not tracking your performance</li>
                      <li>Treating demo as a game instead of training</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">When to Go Live</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Switch to a real account when you can: (1) consistently follow your trading plan for 2-3 months,
                        (2) demonstrate proper risk management on every trade, (3) accept losses without revenge trading,
                        and (4) navigate the platform confidently. Start with a small deposit — most US brokers have low
                        or no minimum deposits. The goal isn't to be profitable on demo, it's to be disciplined.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-12 scroll-mt-24">
                <FAQSection items={faqs} />
              </section>

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-8">
                <h3 className="text-xl font-heading font-bold mb-2">Ready to Start Practicing?</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Open a free demo account with a regulated broker and start learning to trade risk-free today.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/review/oanda" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                    OANDA Review (Best for US)
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

export default BestForexDemoAccounts;
