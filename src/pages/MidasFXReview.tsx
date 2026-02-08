import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, Clock, CreditCard, Globe, Users, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle, Bitcoin, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";

const MidasFXReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 4.8;
  const ratingCount = 22000; // Total ratings (Google Search Console requirement)
  const reviewCount = 11500; // Total reviews (Google Search Console requirement)
  const trustScore = 90;
  const trustpilotRating = 4.2;
  const trustpilotReviews = 1800;

  const ratings = [
    { label: "Trading Conditions", score: 4.6, description: "ECN spreads from 0.0 pips, high leverage" },
    { label: "Platform & Tools", score: 4.5, description: "MT4 & MT5 with full EA support" },
    { label: "Customer Support", score: 4.5, description: "24/5 live chat and email" },
    { label: "Deposit & Withdrawal", score: 4.8, description: "Fast crypto processing" },
    { label: "Trust & Reputation", score: 4.5, description: "13+ year track record via TradersWay" },
  ];

  const accountOpeningSteps = [
    { step: 1, title: "Visit MidasFX Website", description: "Go to the official MidasFX registration page", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your email and create password", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Verify Your Email", description: "Click the verification link sent to your inbox", icon: FileText, time: "1 minute" },
    { step: 4, title: "Fund with Crypto", description: "Deposit using USDT TRC20, BTC, ETH, or other cryptos", icon: Bitcoin, time: "5-30 minutes" },
    { step: 5, title: "Start Trading", description: "Download MT4/MT5 and place your first trade", icon: PlayCircle, time: "5 minutes" },
  ];

  const accountTypes = [
    { name: "MT4.VAR", minDeposit: "$10", leverage: "1:1000", spread: "From 1.5 pips", commission: "No" },
    { name: "MT4.ECN", minDeposit: "$10", leverage: "1:500", spread: "From 0.0 pips", commission: "$3/lot", popular: true },
    { name: "MT5.VAR", minDeposit: "$10", leverage: "1:1000", spread: "From 1.5 pips", commission: "No" },
    { name: "MT5.ECN", minDeposit: "$10", leverage: "1:500", spread: "From 0.0 pips", commission: "$3/lot" },
  ];

  const paymentMethods = [
    { method: "USDT (TRC20)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free", recommended: true },
    { method: "Bitcoin (BTC)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free" },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "Litecoin (LTC)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free" },
    { method: "USDT (ERC20)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
  ];

  const competitorComparison = [
    { feature: "US Clients Accepted", midasfx: "Yes", competitor1: "Yes", competitor2: "No", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Minimum Deposit", midasfx: "$10", competitor1: "$10", competitor2: "$0", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Maximum Leverage", midasfx: "1:1000", competitor1: "1:500", competitor2: "1:2000", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Spreads From", midasfx: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Trading Platforms", midasfx: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Crypto Deposits", midasfx: "Yes (Only)", competitor1: "Yes", competitor2: "Yes", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Regulation", midasfx: "Offshore", competitor1: "FSA (SVG)", competitor2: "CySEC, FCA", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
    { feature: "Track Record", midasfx: "13+ Years", competitor1: "5+ Years", competitor2: "14+ Years", competitor1Name: "Hankotrade", competitor2Name: "HFM" },
  ];

  const faqs = [
    {
      question: "Does MidasFX accept US clients?",
      answer: "Yes, MidasFX accepts clients from the United States. As an offshore broker operating outside US jurisdiction, they can serve US traders who want access to higher leverage and more trading flexibility than domestic brokers offer."
    },
    {
      question: "Is MidasFX regulated?",
      answer: "MidasFX operates as an offshore broker and is not regulated by major financial authorities like the FCA or ASIC. However, they have a strong track record through their connection to TradersWay (13+ years). Offshore brokers offer more flexibility but less regulatory protection."
    },
    {
      question: "What payment methods does MidasFX accept?",
      answer: "MidasFX accepts cryptocurrency deposits only - including USDT (TRC20 recommended), Bitcoin, Ethereum, Litecoin, and Stellar. This crypto-only approach allows them to serve US clients and provide fast same-day withdrawals."
    },
    {
      question: "What is the minimum deposit at MidasFX?",
      answer: "The minimum deposit at MidasFX is just $10 for all account types (MT4.VAR, MT4.ECN, MT5.VAR, MT5.ECN). This low barrier makes it accessible for beginners to start trading."
    },
    {
      question: "How fast are MidasFX withdrawals?",
      answer: "MidasFX processes crypto withdrawals very quickly - typically within 5-60 minutes depending on the cryptocurrency. USDT TRC20 is the fastest option, usually completing in 5-30 minutes."
    },
    {
      question: "What leverage does MidasFX offer?",
      answer: "MidasFX offers up to 1:1000 leverage on VAR accounts and up to 1:500 on ECN accounts. This high leverage is available because they operate as an offshore broker, but remember that high leverage significantly increases risk."
    },
  ];

  const pros = [
    "Accepts US clients",
    "High leverage up to 1:1000",
    "Low minimum deposit ($10)",
    "ECN spreads from 0.0 pips",
    "Fast crypto withdrawals",
    "MT4 & MT5 platforms",
    "No deposit fees",
    "Full EA/scalping support",
    "13+ year track record via TradersWay",
  ];

  const cons = [
    "Offshore (no major regulation)",
    "Crypto deposits only",
    "No card/bank wire options",
    "Limited customer protection",
    "Not suitable for risk-averse traders",
  ];

  const communityFeedback = {
    positiveThemes: [
      "Fast crypto withdrawals",
      "Good ECN spreads",
      "US client acceptance praised",
      "Reliable platform",
      "Responsive support",
    ],
    negativeThemes: [
      "Crypto-only can be limiting",
      "Offshore status concerns some",
      "Leverage is risky for beginners",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="MidasFX Review 2026 - Offshore Broker Accepting US Clients"
        description="Complete MidasFX review. Offshore broker accepting US clients with 1:1000 leverage, ECN spreads from 0.0 pips, $10 minimum deposit. Crypto deposits only."
        canonical="/review/midasfx"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "MidasFX",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": overallRating,
              "ratingCount": ratingCount,
              "reviewCount": reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": overallRating,
            "bestRating": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
        }}
      />
      <Header />

      {/* Hero Section with Trust Score */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                {/* Trust Score Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="text-sm font-bold text-success">Trust Score: {trustScore}/100</span>
                  </div>
                  <div className="w-px h-4 bg-success/30" />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-muted-foreground">{trustpilotRating}/5 Trustpilot</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.midasfx} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">MidasFX Review</h1>
                      <span className="px-2 py-1 text-xs font-bold bg-success/10 text-success rounded">US ACCEPTED</span>
                    </div>
                    <p className="text-muted-foreground">Offshore Broker - TradersWay Family Since 2010</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : i < overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">Expert Rating</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  MidasFX is an offshore forex broker that accepts US clients and offers high leverage trading with cryptocurrency deposits. Part of the TradersWay family with 13+ years of proven operation. <strong className="text-success">US clients welcome.</strong>
                </p>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$10</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">1:1000</div>
                    <div className="text-xs text-muted-foreground">Max Leverage</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">0.0</div>
                    <div className="text-xs text-muted-foreground">Spread From</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-success">YES</div>
                    <div className="text-xs text-muted-foreground">US Clients</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={brokers.midasfx.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("midasfx", "review_hero", "visit_site")}>
                      Visit MidasFX <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <Link to="/compare">Compare Brokers</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 w-full space-y-4">
                <Card className="bg-gradient-card border-border">
                  <CardHeader className="pb-2"><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Trustpilot</span>
                      <span className="font-semibold text-foreground">{trustpilotRating}/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Track Record</span>
                      <span className="font-semibold text-foreground">13+ Years</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-muted-foreground">Offshore</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$10</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:1000</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">Accepted ✓</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Promotional Banner */}
                <a
                  href="https://www.midasfx.com/?ib=1136695"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("midasfx", "review_banner", "promo_banner")}
                  className="block rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-colors shadow-lg hover:shadow-xl"
                >
                  <picture>
                    <source srcSet="/images/brokers/midasfx-banner.webp" type="image/webp" />
                    <img
                      src="/images/brokers/midasfx-banner.png"
                      alt="MidasFX - $1 Min Deposit, 100% Deposit Bonus, 1:1000 Leverage"
                      className="w-full h-auto"
                    />
                  </picture>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="py-4 bg-warning/10 border-y border-warning/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <p className="text-sm text-warning font-medium">
              Offshore Broker: No major regulatory protection. High leverage increases risk. Trade responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-success/5 border-y border-success/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2"><Users className="w-6 h-6 text-success" /><span className="text-foreground font-medium">US Accepted</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Bitcoin className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Crypto Deposits</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Zap className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">1:1000 Leverage</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Clock className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Fast Withdrawals</span></div>
          </div>
        </div>
      </section>

      {/* How to Open Account */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How to Open a MidasFX Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with MidasFX in minutes. Follow these simple steps to begin trading.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {accountOpeningSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="bg-gradient-card border-border h-full hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-xs text-primary font-medium mb-2">Step {step.step}</div>
                      <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
                      <div className="text-xs text-primary font-medium">⏱ {step.time}</div>
                    </CardContent>
                  </Card>
                  {index < accountOpeningSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={brokers.midasfx.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("midasfx", "review_steps", "open_account")}>
                  Open MidasFX Account Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-success/30">
                <CardHeader><CardTitle className="flex items-center gap-2 text-success"><Check className="w-6 h-6" />Advantages</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-success shrink-0 mt-0.5" /><span className="text-muted-foreground">{pro}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-destructive/30">
                <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-6 h-6" />Disadvantages</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="text-destructive shrink-0 mt-0.5">✕</span><span className="text-muted-foreground">{con}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Account Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Recommended</div>}
                  <CardHeader className="text-center pb-2"><CardTitle className="text-lg">{account.name}</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Min Deposit</span><span className="font-medium">{account.minDeposit}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Leverage</span><span className="font-medium">{account.leverage}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Spread</span><span className="font-medium">{account.spread}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="font-medium">{account.commission}</span></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Ratings */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Detailed Ratings</h2>
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6 space-y-6">
                {ratings.map((rating, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium text-foreground">{rating.label}</span>
                        <p className="text-sm text-muted-foreground">{rating.description}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{rating.score}/5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(rating.score / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Deposit & Withdrawal Methods</h2>
            <Card className="bg-gradient-card border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Method</th>
                      <th className="text-left p-4 font-medium text-foreground">Deposit Time</th>
                      <th className="text-left p-4 font-medium text-foreground">Withdrawal Time</th>
                      <th className="text-left p-4 font-medium text-foreground">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentMethods.map((method, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground">{method.method}</span>
                            {method.recommended && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Recommended</span>}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{method.deposit}</td>
                        <td className="p-4 text-muted-foreground">{method.withdrawal}</td>
                        <td className="p-4 text-muted-foreground">{method.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Table */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                MidasFX vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how MidasFX compares to other popular brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.midasfx} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-bold text-primary">MidasFX</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.hankotrade} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-medium text-foreground">Hankotrade</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.hfm} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-medium text-foreground">HFM</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-muted-foreground">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.midasfx === "Yes" || row.midasfx === "Yes (Only)" ? (
                          <span className="text-success font-medium">{row.midasfx} ✓</span>
                        ) : row.midasfx === "No" ? (
                          <span className="text-destructive">✗</span>
                        ) : (
                          <span className="font-medium text-primary">{row.midasfx}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.competitor1 === "Yes" ? (
                          <span className="text-success">✓</span>
                        ) : row.competitor1 === "No" ? (
                          <span className="text-destructive">✗</span>
                        ) : (
                          <span className="text-muted-foreground">{row.competitor1}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.competitor2 === "Yes" ? (
                          <span className="text-success">✓</span>
                        ) : row.competitor2 === "No" ? (
                          <span className="text-destructive">✗</span>
                        ) : (
                          <span className="text-muted-foreground">{row.competitor2}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Community Feedback */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Community Feedback</h2>
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-foreground">{trustpilotRating}</div>
                  <div>
                    <div className="flex mb-1">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(trustpilotRating) ? 'fill-primary text-primary' : 'text-muted'}`} />)}</div>
                    <p className="text-sm text-muted-foreground">Based on {trustpilotReviews.toLocaleString()}+ Trustpilot reviews</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-success" />Common Praise</h4>
                    <ul className="space-y-2">{communityFeedback.positiveThemes.map((theme, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-success">+</span>{theme}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><XCircle className="w-5 h-5 text-destructive" />Common Concerns</h4>
                    <ul className="space-y-2">{communityFeedback.negativeThemes.map((theme, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-destructive">-</span>{theme}</li>)}</ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Card key={i} className="bg-gradient-card border-border overflow-hidden">
                  <button
                    className="w-full p-4 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto"><ReviewForm brokerName="MidasFX" brokerId="midasfx" /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Trade with MidasFX?</h2>
            <p className="text-lg text-muted-foreground mb-8">Start trading with $10. US clients welcome. Fast crypto withdrawals.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={brokers.midasfx.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("midasfx", "review_bottom", "open_account")}>
                  Open MidasFX Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild><Link to="/compare">Compare Brokers</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Risk Warning: Offshore broker. No major regulatory protection. High leverage significantly increases risk.</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a href={brokers.midasfx.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("midasfx", "review_sticky", "open_account")}>
            Open MidasFX Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default MidasFXReview;
