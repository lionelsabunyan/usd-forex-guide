import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Shield, Star, ExternalLink, Scale, Globe, Lock, ArrowLeftRight, Layers, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const hedgingBrokers = [
  {
    name: "Pepperstone",
    hedgingType: "Full Hedging",
    regulation: "FCA, ASIC, CySEC, DFSA",
    minDeposit: "$0",
    spreads: "0.0 pips",
    platforms: "MT4, MT5, cTrader",
    usAccepted: false,
    rating: 4.7,
    highlight: "Best Overall for Hedging",
    reviewUrl: "/review/pepperstone",
    features: ["Full hedging allowed on all accounts", "cTrader advanced hedging tools", "Razor account 0.0 pips", "No dealing desk execution", "Negative balance protection"],
  },
  {
    name: "Exness",
    hedgingType: "Full Hedging",
    regulation: "FCA, CySEC, FSA, FSCA",
    minDeposit: "$10",
    spreads: "0.0 pips",
    platforms: "MT4, MT5, Exness Terminal",
    usAccepted: false,
    rating: 4.6,
    highlight: "Best for Hedging + High Leverage",
    reviewUrl: "/review/exness",
    features: ["Full hedging on MT4 & MT5", "Up to 1:2000 leverage", "Instant withdrawals", "Multiple account types", "Swap-free options"],
  },
  {
    name: "AvaTrade",
    hedgingType: "Full Hedging",
    regulation: "Central Bank of Ireland, ASIC, FSCA, FSA",
    minDeposit: "$100",
    spreads: "0.9 pips",
    platforms: "MT4, MT5, AvaTradeGO, AvaOptions",
    usAccepted: false,
    rating: 4.4,
    highlight: "Best for Options Hedging",
    reviewUrl: "/review/avatrade",
    features: ["Full hedging permitted", "AvaOptions for options hedging", "AvaProtect risk management tool", "Multi-regulated globally", "Copy trading available"],
  },
  {
    name: "XM",
    hedgingType: "Full Hedging",
    regulation: "CySEC, ASIC, DFSA, FSC",
    minDeposit: "$5",
    spreads: "1.0 pips",
    platforms: "MT4, MT5",
    usAccepted: false,
    rating: 4.4,
    highlight: "Best for Beginners + Hedging",
    reviewUrl: "/review/xm",
    features: ["Hedging allowed on all accounts", "Up to 1:1000 leverage", "$5 minimum deposit", "Free education & webinars", "No requotes policy"],
  },
  {
    name: "FxPro",
    hedgingType: "Full Hedging",
    regulation: "FCA, CySEC, FSCA, SCB",
    minDeposit: "$100",
    spreads: "0.0 pips",
    platforms: "MT4, MT5, cTrader, FxPro Edge",
    usAccepted: false,
    rating: 4.3,
    highlight: "Best Platform Variety for Hedging",
    reviewUrl: "/review/fxpro",
    features: ["Hedging on MT4, MT5 & cTrader", "cTrader advanced order types", "FCA regulated", "Negative balance protection", "No dealing desk"],
  },
  {
    name: "HFM (HotForex)",
    hedgingType: "Full Hedging",
    regulation: "CySEC, FCA, DFSA, FSCA, FSA",
    minDeposit: "$0",
    spreads: "0.0 pips",
    platforms: "MT4, MT5, HFM App",
    usAccepted: false,
    rating: 4.3,
    highlight: "Zero Deposit + Hedging",
    reviewUrl: "/review/hfm",
    features: ["Full hedging on all accounts", "$0 minimum deposit", "Up to 1:2000 leverage", "Zero spread accounts", "VPS hosting available"],
  },
  {
    name: "MidasFX",
    hedgingType: "Full Hedging",
    regulation: "FSA",
    minDeposit: "$1",
    spreads: "0.0 pips",
    platforms: "MT4, MT5",
    usAccepted: true,
    rating: 4.8,
    highlight: "Best US-Accepted + Hedging",
    reviewUrl: "/review/midasfx",
    features: ["Hedging allowed — no FIFO rule", "US clients accepted", "$1 minimum deposit", "0.0 pip raw spreads", "1:1000 leverage"],
  },
  {
    name: "Hankotrade",
    hedgingType: "Full Hedging",
    regulation: "Seychelles FSA",
    minDeposit: "$10",
    spreads: "0.0 pips",
    platforms: "MT4, MT5",
    usAccepted: true,
    rating: 4.5,
    highlight: "US-Accepted + Raw Spreads Hedging",
    reviewUrl: "/review/hankotrade",
    features: ["Full hedging allowed", "US clients accepted", "0.0 pip raw spreads", "Crypto deposits", "STP execution"],
  },
];

const usRegulatedBrokers = [
  { name: "tastyfx", regulation: "CFTC/NFA", hedgingNote: "No hedging — FIFO enforced", minDeposit: "$0", spreads: "0.2 pips", reviewUrl: "/review/tastyfx" },
  { name: "OANDA", regulation: "CFTC/NFA", hedgingNote: "No hedging — FIFO enforced", minDeposit: "$0", spreads: "1.0 pips", reviewUrl: "/review/oanda" },
  { name: "Forex.com", regulation: "CFTC/NFA", hedgingNote: "No hedging — FIFO enforced", minDeposit: "$100", spreads: "0.8 pips", reviewUrl: "/review/forexcom" },
  { name: "IG Markets", regulation: "CFTC/NFA, FCA", hedgingNote: "No hedging — FIFO enforced", minDeposit: "$250", spreads: "0.6 pips", reviewUrl: "/review/ig-markets" },
  { name: "Interactive Brokers", regulation: "CFTC/NFA, SEC", hedgingNote: "No hedging — FIFO enforced", minDeposit: "$0", spreads: "0.5 pips", reviewUrl: "/review/interactive-brokers" },
];

const BestHedgingBrokers = () => {
  const tocItems = [
    { id: "what-is-hedging", title: "What Is Forex Hedging?", level: 2 },
    { id: "us-hedging-rules", title: "US Hedging Restrictions", level: 2 },
    { id: "hedging-strategies", title: "Hedging Strategies", level: 2 },
    { id: "best-brokers", title: "Best Hedging Brokers 2026", level: 2 },
    { id: "comparison-table", title: "Broker Comparison Table", level: 2 },
    { id: "us-regulated", title: "US-Regulated Broker Options", level: 2 },
    { id: "hedging-costs", title: "Hedging Costs & Risk Management", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "Is forex hedging legal in the US?",
      answer: "Hedging the same currency pair in the same account (opening simultaneous long and short positions) is not allowed at US-regulated brokers. The CFTC's FIFO (First In, First Out) rule and NFA Compliance Rule 2-43(b) prohibit this practice since 2009. However, you can hedge across different currency pairs (e.g., long EUR/USD and long USD/CHF) or use different accounts at different brokers. Some US traders use offshore brokers that allow hedging, though these lack CFTC/NFA protections.",
    },
    {
      question: "Why did the US ban forex hedging?",
      answer: "The NFA implemented Compliance Rule 2-43(b) in 2009, citing that same-pair hedging in a single account offers no economic benefit to the trader — the net position is effectively flat while the trader pays double spreads and swap costs. The FIFO rule was introduced alongside it to ensure transparent position management. Critics argue that hedging can be a valid risk management tool in certain strategies, but the NFA's position remains unchanged.",
    },
    {
      question: "What is the difference between direct and indirect hedging?",
      answer: "Direct hedging means opening a buy and sell position on the same currency pair simultaneously (e.g., long EUR/USD and short EUR/USD). This is banned at US brokers. Indirect hedging involves opening positions on correlated pairs to offset risk (e.g., long EUR/USD and short GBP/USD, since they're positively correlated). Indirect hedging is allowed everywhere because the positions are on different instruments.",
    },
    {
      question: "Can US traders hedge forex at offshore brokers?",
      answer: "Yes, some offshore brokers accept US clients and allow full hedging — brokers like MidasFX and Hankotrade permit simultaneous opposing positions. However, these brokers are not regulated by the CFTC/NFA, which means less investor protection, no SIPC coverage, and limited legal recourse if disputes arise. US traders using offshore brokers for hedging do so at their own risk.",
    },
    {
      question: "Does hedging guarantee profit or eliminate risk?",
      answer: "No. Hedging reduces directional risk but introduces other costs and risks. You pay double spreads (one for each position), double swap/overnight fees, and your margin is tied up in both positions. A perfectly hedged position (same pair, same size) has zero profit potential — it's a locked position. Hedging works best as a temporary risk management tool, not as a permanent strategy. Traders must have a plan for when and how to close the hedge.",
    },
    {
      question: "Which platform is best for hedging strategies?",
      answer: "MetaTrader 5 (MT5) in hedging mode is the most popular choice — it explicitly supports hedging with separate position tracking. cTrader also natively supports hedging with advanced order types. MetaTrader 4 (MT4) supports hedging by default. When choosing a broker for hedging, ensure they offer MT4/MT5 in 'hedging mode' rather than 'netting mode,' as netting mode automatically offsets opposing positions.",
    },
    {
      question: "What is the FIFO rule in forex?",
      answer: "FIFO (First In, First Out) is a CFTC/NFA rule that requires US-regulated brokers to close positions in the order they were opened. If you have multiple buy positions on EUR/USD, the oldest one must be closed first. This prevents traders from selectively closing profitable positions while keeping losers open, and it effectively prevents same-pair hedging because a new opposing position would close the existing one under FIFO.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Best Forex Hedging Brokers 2026 — Brokers That Allow Hedging"
        description="Compare the best forex brokers that allow hedging. US hedging restrictions explained, direct vs indirect strategies, and 8 brokers with full hedging support reviewed."
        canonical="/guides/best-hedging-brokers"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Best Forex Hedging Brokers 2026",
          "description": "Compare the best forex brokers that allow hedging. US hedging restrictions, FIFO rule explained, and brokers with full hedging support reviewed.",
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
              { label: "Best Hedging Brokers" },
            ]}
            className="mb-6"
          />
          <Link to="/guides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <ArrowLeftRight className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Intermediate</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Best Forex <span className="text-gradient-gold">Hedging</span> Brokers
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Compare forex brokers that allow hedging strategies. We explain US hedging restrictions (FIFO rule),
            direct vs indirect hedging, and review 8 brokers that support full hedging — including options for US traders.
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
                title="Hedging Brokers at a Glance"
                stats={[
                  { value: "8", label: "Brokers Reviewed", description: "Full hedging support" },
                  { value: "2", label: "Accept US Clients", description: "Offshore brokers" },
                  { value: "2009", label: "US Ban Year", description: "NFA Rule 2-43(b)" },
                  { value: "2x", label: "Spread Cost", description: "Hedging cost factor" },
                ]}
                source="Broker data, March 2026"
              />

              {/* What Is Hedging? */}
              <section id="what-is-hedging" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">What Is Forex Hedging?</h2>
                <p className="text-muted-foreground mb-4">
                  Hedging in forex is a risk management strategy where you open opposing positions to protect against
                  adverse price movements. The simplest form is <strong>direct hedging</strong> — opening both a buy
                  and sell position on the same currency pair simultaneously.
                </p>
                <p className="text-muted-foreground mb-4">
                  For example, if you're long EUR/USD at 1.0800 and the market becomes uncertain before a major news event,
                  you could open a short EUR/USD position of the same size to "lock in" your current P&L. Once the news
                  passes and direction is clearer, you close one side of the hedge and let the other run.
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { icon: ArrowLeftRight, title: "Direct Hedging", desc: "Opening opposing positions on the same pair (e.g., long and short EUR/USD). Banned at US-regulated brokers." },
                    { icon: Layers, title: "Indirect Hedging", desc: "Using correlated pairs to offset risk (e.g., long EUR/USD + short GBP/USD). Allowed everywhere." },
                    { icon: Shield, title: "Options Hedging", desc: "Using forex options to cap downside risk while keeping upside potential. Available at select brokers like AvaTrade." },
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

                <QuotableFact type="warning">
                  Hedging is not a "free insurance" strategy. Every hedge carries costs — double spreads, double swaps,
                  and margin tied up in both positions. A perfectly hedged position has zero profit potential until one
                  side is closed.
                </QuotableFact>
              </section>

              {/* US Hedging Rules */}
              <section id="us-hedging-rules" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">US Hedging Restrictions (FIFO Rule)</h2>
                <p className="text-muted-foreground mb-4">
                  In 2009, the NFA (National Futures Association) implemented <strong>Compliance Rule 2-43(b)</strong>,
                  which effectively banned direct hedging at US-regulated forex brokers. The rule has two key components:
                </p>

                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    NFA Rule 2-43(b) — What US Traders Must Know
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-destructive">No Same-Pair Hedging</h5>
                      <p className="text-muted-foreground">
                        US brokers must offset opposing positions on the same pair. If you're long 1 lot EUR/USD
                        and try to short 1 lot EUR/USD, the broker must close your long instead of opening a
                        new short position.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-destructive">FIFO (First In, First Out)</h5>
                      <p className="text-muted-foreground">
                        Multiple positions on the same pair must be closed in the order they were opened.
                        You can't selectively close the most profitable position first — the oldest position
                        must be closed first.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  The NFA's rationale was that direct hedging in a single account provides no economic benefit — the net
                  exposure is zero while the trader pays double transaction costs. However, many traders disagree, arguing
                  that hedging allows for more flexible position management during volatile markets.
                </p>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-semibold mb-3">Workarounds for US Traders</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Cross-pair hedging:</strong> Hedge EUR/USD exposure with USD/CHF positions (negative correlation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Multiple broker accounts:</strong> Long EUR/USD at Broker A, short at Broker B</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Options:</strong> Buy put options to protect long positions (available at some US brokers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Offshore brokers:</strong> Some accept US clients with full hedging, but lack CFTC/NFA protections</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Hedging Strategies */}
              <section id="hedging-strategies" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Hedging Strategies Explained</h2>
                <p className="text-muted-foreground mb-6">
                  There are several approaches to hedging in forex, each with different risk profiles, costs, and
                  complexity levels. Understanding these strategies is essential before choosing a broker.
                </p>

                <div className="space-y-6">
                  {/* Strategy 1 */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">1</div>
                      <h3 className="text-lg font-heading font-bold">Direct (Same-Pair) Hedging</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Open a buy and sell of the same pair and size. Your P&L is locked until you close one side.
                      This is the simplest hedge but requires a broker that allows it (not US-regulated).
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      <strong>Example:</strong> Long 1 lot EUR/USD at 1.0800 → market drops to 1.0750 → open short 1 lot EUR/USD →
                      loss locked at -50 pips → wait for direction → close losing side when trend confirms.
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700">Simple to execute</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-700">Banned in US</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-amber-100 text-amber-700">Double spread cost</span>
                    </div>
                  </div>

                  {/* Strategy 2 */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">2</div>
                      <h3 className="text-lg font-heading font-bold">Cross-Pair (Correlation) Hedging</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use correlated or inversely correlated pairs to offset risk. This works at all brokers, including
                      US-regulated ones, since you're trading different instruments.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      <strong>Example:</strong> Long EUR/USD → hedge with long USD/CHF (negative correlation ~-0.85).
                      If USD strengthens, EUR/USD loss is partially offset by USD/CHF gain. Correlation is not perfect,
                      so residual risk remains.
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700">Allowed everywhere</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-amber-100 text-amber-700">Imperfect offset</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700">Requires correlation analysis</span>
                    </div>
                  </div>

                  {/* Strategy 3 */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">3</div>
                      <h3 className="text-lg font-heading font-bold">Partial Hedging</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Hedge only a portion of your position to reduce — but not eliminate — risk. This allows you to
                      maintain some directional exposure while protecting against large adverse moves.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      <strong>Example:</strong> Long 1 lot EUR/USD → hedge with short 0.5 lots EUR/USD →
                      net exposure is 0.5 lots long. If market drops 100 pips, you lose 50 pips instead of 100.
                      If it rises 100 pips, you gain 50 instead of 100.
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700">Flexible risk reduction</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-700">Banned in US (same pair)</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700">Maintains some exposure</span>
                    </div>
                  </div>

                  {/* Strategy 4 */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">4</div>
                      <h3 className="text-lg font-heading font-bold">Multi-Timeframe Hedging</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Hold a long-term position in one direction while taking short-term trades in the opposite direction.
                      The long-term "core" position stays open while you scalp or day-trade against it during pullbacks.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      <strong>Example:</strong> Weekly chart shows EUR/USD uptrend → hold long-term buy →
                      on 15-min chart, short during pullbacks for quick profits → close shorts when pullback ends.
                      Requires a broker with hedging enabled and MT5 hedging mode.
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700">Popular with swing traders</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-700">Banned in US (same pair)</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700">Advanced technique</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Best Brokers */}
              <section id="best-brokers" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Best Forex Hedging Brokers for 2026</h2>
                <p className="text-muted-foreground mb-6">
                  We reviewed brokers based on hedging support, platform capabilities (MT4/MT5 hedging mode, cTrader),
                  spreads, regulation, and whether they accept US clients. All brokers below allow full same-pair hedging.
                </p>

                <div className="space-y-6">
                  {hedgingBrokers.map((broker, index) => (
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

                      {/* Specs */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Hedging</span>
                          <span className="font-medium text-green-600">{broker.hedgingType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Regulation</span>
                          <span className="font-medium">{broker.regulation}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Min Deposit</span>
                          <span className="font-medium">{broker.minDeposit}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Spreads From</span>
                          <span className="font-medium">{broker.spreads}</span>
                        </div>
                      </div>

                      {/* Platforms & US */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Platforms</span>
                          <span className="font-medium">{broker.platforms}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">US Accepted</span>
                          <span className={`font-medium ${broker.usAccepted ? "text-green-600" : "text-red-500"}`}>
                            {broker.usAccepted ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
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

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                        <Link
                          to={broker.reviewUrl}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Read Full Review
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comparison Table */}
              <section id="comparison-table" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Hedging Broker Comparison Table</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Broker</th>
                        <th className="text-left p-3 font-semibold border-b">Hedging</th>
                        <th className="text-left p-3 font-semibold border-b">Regulation</th>
                        <th className="text-left p-3 font-semibold border-b">Min Deposit</th>
                        <th className="text-left p-3 font-semibold border-b">Spreads</th>
                        <th className="text-left p-3 font-semibold border-b">US Accepted</th>
                        <th className="text-left p-3 font-semibold border-b">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hedgingBrokers.map((broker, i) => (
                        <tr key={broker.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          <td className="p-3 border-b font-medium">
                            <Link to={broker.reviewUrl} className="text-primary hover:underline">{broker.name}</Link>
                          </td>
                          <td className="p-3 border-b text-green-600">{broker.hedgingType}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.regulation}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.minDeposit}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.spreads}</td>
                          <td className="p-3 border-b">
                            {broker.usAccepted ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="p-3 border-b">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {broker.rating}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* US Regulated Options */}
              <section id="us-regulated" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">US-Regulated Broker Options</h2>
                <p className="text-muted-foreground mb-4">
                  US-regulated brokers do not allow same-pair hedging due to the FIFO rule. However, they remain
                  the safest option for US traders with CFTC/NFA oversight, segregated funds, and dispute resolution.
                  Here's how they compare for traders who want to use indirect hedging strategies:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold border-b">Broker</th>
                        <th className="text-left p-3 font-semibold border-b">Regulation</th>
                        <th className="text-left p-3 font-semibold border-b">Hedging Note</th>
                        <th className="text-left p-3 font-semibold border-b">Min Deposit</th>
                        <th className="text-left p-3 font-semibold border-b">Spreads</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usRegulatedBrokers.map((broker, i) => (
                        <tr key={broker.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          <td className="p-3 border-b font-medium">
                            <Link to={broker.reviewUrl} className="text-primary hover:underline">{broker.name}</Link>
                          </td>
                          <td className="p-3 border-b text-muted-foreground">{broker.regulation}</td>
                          <td className="p-3 border-b text-red-500 text-xs">{broker.hedgingNote}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.minDeposit}</td>
                          <td className="p-3 border-b text-muted-foreground">{broker.spreads}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <QuotableFact type="money">
                  While US brokers don't allow direct hedging, cross-pair hedging (e.g., long EUR/USD + long USD/CHF)
                  is fully legal and can provide similar risk reduction. The key is understanding currency correlations.
                </QuotableFact>
              </section>

              {/* Hedging Costs */}
              <section id="hedging-costs" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Hedging Costs & Risk Management</h2>
                <p className="text-muted-foreground mb-6">
                  Hedging isn't free. Understanding the costs involved helps you decide whether hedging is the right
                  approach for your trading strategy, or whether a simple stop-loss would be more efficient.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Direct Costs</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Double spreads:</strong> You pay the spread on both the buy and sell position</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Swap fees:</strong> Overnight charges on both positions (net may be negative)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Commission:</strong> On ECN accounts, you pay per-lot fees on both sides</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Indirect Costs</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Margin lockup:</strong> Both positions require margin, reducing available capital</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Opportunity cost:</strong> Capital tied up in hedges can't be used elsewhere</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Complexity risk:</strong> Managing multiple positions increases the chance of errors</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    When NOT to Hedge
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• If a simple stop-loss achieves the same risk reduction at lower cost</li>
                    <li>• If you don't have a clear plan for when to close the hedge</li>
                    <li>• If your account size is small — hedging costs are proportionally higher</li>
                    <li>• If you're hedging out of fear rather than strategy — this often leads to "analysis paralysis"</li>
                  </ul>
                </div>
              </section>

              {/* FAQ */}
              <FAQSection faqs={faqs} />

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

export default BestHedgingBrokers;
