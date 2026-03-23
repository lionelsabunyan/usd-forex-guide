import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Shield,
  Scale,
  Target,
  LineChart,
  Newspaper,
  Clock,
  ArrowRight,
  Flag,
  Star,
  Monitor,
  Zap,
  TrendingUp,
  Radio,
  BarChart3,
  ArrowLeftRight
} from "lucide-react";

const guides = [
  {
    id: "forex-trading-usa",
    title: "Forex Trading in the USA: Complete Guide",
    description: "The ultimate guide for US traders: regulations, brokers, leverage limits, taxes (Section 988 vs 1256), and how to start trading legally.",
    icon: Flag,
    readTime: "25 min read",
    difficulty: "Beginner",
    topics: ["CFTC/NFA", "US Brokers", "Offshore Options", "Forex Taxes"],
    featured: true
  },
  {
    id: "beginners-guide",
    title: "Beginner's Guide to Forex",
    description: "Everything you need to know to start trading Forex. Learn the basics of currency pairs, market mechanics, and essential terminology.",
    icon: BookOpen,
    readTime: "15 min read",
    difficulty: "Beginner",
    topics: ["Currency Pairs", "Market Hours", "Basic Orders", "Demo Trading"]
  },
  {
    id: "us-forex-regulations",
    title: "US Forex Regulations",
    description: "Understand the regulatory landscape for US-based traders. Learn about CFTC, NFA requirements, and how to trade legally and safely.",
    icon: Shield,
    readTime: "12 min read",
    difficulty: "Intermediate",
    topics: ["CFTC Regulations", "NFA Requirements", "Leverage Limits", "Legal Brokers"]
  },
  {
    id: "broker-comparison",
    title: "How to Compare Brokers",
    description: "A comprehensive guide to evaluating and comparing Forex brokers. Learn what factors matter most for your trading success.",
    icon: Scale,
    readTime: "10 min read",
    difficulty: "Beginner",
    topics: ["Spreads & Fees", "Platform Features", "Regulation", "Customer Support"]
  },
  {
    id: "risk-management",
    title: "Risk Management Essentials",
    description: "Master the art of protecting your capital. Learn position sizing, stop-loss strategies, and how to survive in volatile markets.",
    icon: Target,
    readTime: "18 min read",
    difficulty: "Intermediate",
    topics: ["Position Sizing", "Stop-Loss Orders", "Risk/Reward Ratio", "Portfolio Diversification"]
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis Basics",
    description: "Learn to read charts and identify trading opportunities. Understand key indicators, patterns, and price action strategies.",
    icon: LineChart,
    readTime: "20 min read",
    difficulty: "Intermediate",
    topics: ["Chart Types", "Support & Resistance", "Indicators", "Price Patterns"]
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis Guide",
    description: "Understand how economic data affects currency prices. Learn to use the economic calendar and trade news events effectively.",
    icon: Newspaper,
    readTime: "15 min read",
    difficulty: "Advanced",
    topics: ["Economic Indicators", "Central Bank Policy", "News Trading", "Economic Calendar"]
  },
  {
    id: "best-copy-trading-platforms",
    title: "Best Copy Trading Platforms",
    description: "Discover the top platforms that let you replicate professional traders' strategies. Compare copy trading brokers, features, and costs.",
    icon: Star,
    readTime: "14 min read",
    difficulty: "Beginner",
    topics: ["Copy Trading", "eToro", "AvaTrade", "Social Trading"]
  },
  {
    id: "best-forex-trading-apps",
    title: "Best Forex Trading Apps",
    description: "Compare the top mobile forex trading apps for iOS and Android. We review charting, alerts, biometric security, and execution across 10 broker apps.",
    icon: BookOpen,
    readTime: "16 min read",
    difficulty: "Beginner",
    topics: ["Mobile Trading", "iOS & Android", "Charting", "US Brokers"]
  },
  {
    id: "best-forex-demo-accounts",
    title: "Best Forex Demo Accounts",
    description: "Practice trading risk-free with virtual money. Compare demo accounts from top brokers — balances, time limits, platforms, and how to transition to live.",
    icon: Monitor,
    readTime: "15 min read",
    difficulty: "Beginner",
    topics: ["Demo Accounts", "Paper Trading", "Practice", "Risk-Free"]
  },
  {
    id: "best-scalping-brokers",
    title: "Best Forex Scalping Brokers",
    description: "Find the best brokers for scalping with raw spreads from 0.0 pips, fast execution, and ECN accounts. Includes US-regulated options for active traders.",
    icon: Zap,
    readTime: "16 min read",
    difficulty: "Intermediate",
    topics: ["Scalping", "ECN Brokers", "Low Spreads", "Fast Execution"]
  },
  {
    id: "best-high-leverage-brokers",
    title: "Best High Leverage Forex Brokers",
    description: "Compare brokers offering leverage from 1:500 to 1:3000. US vs international leverage rules, margin call risks, and regulated vs offshore options explained.",
    icon: Scale,
    readTime: "18 min read",
    difficulty: "Intermediate",
    topics: ["High Leverage", "Margin Trading", "US Regulations", "Offshore Brokers"]
  },
  {
    id: "forex-day-trading",
    title: "Forex Day Trading Guide",
    description: "Master day trading strategies for forex. Learn breakout, pullback, and range setups, the best trading hours, risk management rules, and which brokers offer fast execution.",
    icon: TrendingUp,
    readTime: "20 min read",
    difficulty: "Intermediate",
    topics: ["Day Trading", "Intraday Strategies", "Risk Management", "Best Hours"]
  },
  {
    id: "best-forex-signal-providers",
    title: "Best Forex Signal Providers",
    description: "Find trusted, verified forex signal providers. Compare copy trading platforms, algorithmic signals, and manual providers — with clear scam warnings to protect your capital.",
    icon: Radio,
    readTime: "16 min read",
    difficulty: "Beginner",
    topics: ["Forex Signals", "Copy Trading", "Scam Warnings", "Signal Reviews"]
  },
  {
    id: "best-low-spread-brokers",
    title: "Best Low Spread & Zero Spread Brokers",
    description: "Compare the lowest spread forex brokers. EUR/USD, GBP/USD, USD/JPY spreads compared. ECN vs market maker, zero spread accounts, and real vs advertised spreads explained.",
    icon: BarChart3,
    readTime: "18 min read",
    difficulty: "Intermediate",
    topics: ["Low Spreads", "Zero Spread", "ECN Brokers", "Spread Comparison"]
  },
  {
    id: "most-trusted-forex-brokers",
    title: "Most Trusted & Regulated Forex Brokers",
    description: "Find the safest forex brokers ranked by regulation quality, investor protection, and trust. Tier 1 vs Tier 3 regulation, segregated accounts, and red flags explained.",
    icon: Shield,
    readTime: "20 min read",
    difficulty: "Intermediate",
    topics: ["Regulation", "Trust & Safety", "Investor Protection", "Segregated Accounts"]
  },
  {
    id: "best-forex-charting-software",
    title: "Best Forex Charting Software & Websites",
    description: "Compare the top charting platforms for forex traders. TradingView, MetaTrader, cTrader, NinjaTrader — indicators, drawing tools, alerts, mobile apps, and broker integrations compared.",
    icon: Monitor,
    readTime: "18 min read",
    difficulty: "Intermediate",
    topics: ["Charting Software", "TradingView", "MetaTrader", "Platform Comparison"]
  },
  {
    id: "best-hedging-brokers",
    title: "Best Forex Hedging Brokers",
    description: "Compare brokers that allow hedging strategies. US hedging restrictions (FIFO rule) explained, direct vs indirect hedging, and 8 brokers with full hedging support reviewed.",
    icon: ArrowLeftRight,
    readTime: "15 min read",
    difficulty: "Intermediate",
    topics: ["Hedging", "FIFO Rule", "Risk Management", "US Regulations"]
  }
];

const difficultyColors: Record<string, string> = {
  "Beginner": "bg-success/20 text-success",
  "Intermediate": "bg-warning/20 text-warning",
  "Advanced": "bg-destructive/20 text-destructive"
};

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Forex Trading Guides for Beginners | Learn to Trade"
        description="Comprehensive forex trading guides for beginners. Learn technical analysis, risk management, US regulations, and trading strategies step by step."
        canonical="/guides"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Forex Trading Guides",
          "description": "Comprehensive forex trading guides for beginners and intermediate traders.",
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Forex Trading <span className="text-gradient-gold">Guides</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive guides to help you become a successful Forex trader. 
              From beginner basics to advanced strategies, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide: any, index) => (
              <div
                key={guide.id}
                className={`group bg-gradient-card border rounded-2xl p-6 shadow-card hover:border-primary/50 transition-all duration-300 animate-fade-up flex flex-col ${
                  guide.featured ? "border-primary/30 ring-1 ring-primary/20 md:col-span-2 lg:col-span-1" : "border-border"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {guide.featured && (
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-yellow-600">Featured Guide</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${guide.featured ? "bg-primary" : "bg-gradient-gold"}`}>
                    <guide.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[guide.difficulty]}`}>
                    {guide.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {guide.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{guide.readTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {guide.topics.map((topic, topicIndex) => (
                    <span 
                      key={topicIndex}
                      className="px-2 py-1 bg-secondary/50 text-muted-foreground text-xs rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <Link to={`/guides/${guide.id}`} className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all mt-auto">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gradient-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Additional <span className="text-gradient-gold">Resources</span>
            </h2>
            <p className="text-muted-foreground">
              Explore our other resources to enhance your trading knowledge and skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link
              to="/tools"
              className="bg-secondary/30 border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Trading Tools</h3>
              <p className="text-sm text-muted-foreground">Free calculators for pip, margin & more</p>
            </Link>

            <Link
              to="/glossary"
              className="bg-secondary/30 border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Forex Glossary</h3>
              <p className="text-sm text-muted-foreground">Key trading terms explained</p>
            </Link>

            <Link
              to="/brokers"
              className="bg-secondary/30 border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Broker Reviews</h3>
              <p className="text-sm text-muted-foreground">In-depth analysis of 22 brokers</p>
            </Link>

            <Link
              to="/resources/us-forex-checklist"
              className="bg-secondary/30 border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">US Forex Checklist</h3>
              <p className="text-sm text-muted-foreground">Free downloadable checklist for US traders</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuidesPage;
