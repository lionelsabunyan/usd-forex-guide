import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Bitcoin, Rocket, Globe, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle, ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";

const PlexyTradeReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const overallRating = 3.0;
  const trustScore = 60; // New broker, unregulated, limited history
  const trustpilotRating = 4.4;
  const lastUpdated = "February 4, 2026";

  const ratings = [
    { label: "Trading Conditions", score: 4.3 },
    { label: "Platform & Tools", score: 3.8 },
    { label: "Customer Support", score: 3.5 },
    { label: "Deposit & Withdrawal", score: 4.0 },
    { label: "Trust & Reputation", score: 3.0 },
  ];

  const accountTypes = [
    {
      name: "Standard Account",
      minDeposit: "$50",
      leverage: "1:2000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "No commission", "All instruments", "Hedging allowed", "EA supported"],
    },
    {
      name: "ECN Account",
      minDeposit: "$100",
      leverage: "1:2000",
      spread: "From 0.0 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5 Platform", "Raw ECN spreads", "Best for scalpers", "DMA execution", "Fast fills"],
      popular: true,
    },
    {
      name: "VIP Account",
      minDeposit: "$10,000",
      leverage: "1:2000",
      spread: "From 0.0 pips",
      commission: "$2 per lot",
      features: ["MT4/MT5 Platform", "Lowest commission", "Priority support", "Personal manager", "Premium conditions"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "Forex, Metals, Indices, Crypto, Energies" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:2000" },
    { label: "Spread Type", value: "Variable / ECN (Raw)" },
    { label: "Execution Type", value: "STP / ECN" },
    { label: "Margin Call", value: "50%" },
    { label: "Stop Out Level", value: "20%" },
    { label: "Swap Free", value: "Available" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Allowed" },
    { label: "Expert Advisors", value: "Fully supported" },
    { label: "Trading Hours", value: "24/5" },
  ];

  const paymentMethods = [
    { name: "Bitcoin (BTC)", deposit: "Free", withdrawal: "Free", time: "10-60 minutes" },
    { name: "Ethereum (ETH)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "USDT (Tether TRC20)", deposit: "Free", withdrawal: "Free", time: "5-30 minutes" },
    { name: "USDT (Tether ERC20)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "Litecoin (LTC)", deposit: "Free", withdrawal: "Free", time: "5-30 minutes" },
    { name: "USD Coin (USDC)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
  ];

  const communityFeedback = {
    trustpilotRating: 4.4,
    trustpilotReviews: 200,
    positiveThemes: [
      "Highest leverage available (1:2000)",
      "Zero spread ECN accounts",
      "Fast execution speeds",
      "Built on LQDFX infrastructure",
      "Good customer support",
    ],
    negativeThemes: [
      "Very new broker (2024)",
      "Crypto-only deposits",
      "Unregulated",
      "Limited track record",
    ],
    lastUpdated: "February 2026",
  };

  const accountOpeningSteps = [
    { icon: Globe, title: "Visit Website", description: "Go to PlexyTrade official site" },
    { icon: FileText, title: "Fill Application", description: "Complete the online form" },
    { icon: UserPlus, title: "Verify Identity", description: "Upload ID documents" },
    { icon: Wallet, title: "Fund with Crypto", description: "Deposit via cryptocurrency" },
    { icon: PlayCircle, title: "Start Trading", description: "Access MT4/MT5 platforms" },
  ];

  const faqItems = [
    {
      question: "Is PlexyTrade legit and safe?",
      answer: "PlexyTrade is a legitimate broker built on LQDFX infrastructure. However, it's important to note that it's very new (launched 2024) and unregulated. While it has good Trustpilot reviews (4.4/5), exercise caution and only trade with funds you can afford to lose."
    },
    {
      question: "Does PlexyTrade accept US clients?",
      answer: "Yes, PlexyTrade accepts US clients. As an offshore broker based in St. Lucia, they are not restricted by US regulations and can offer services to American traders."
    },
    {
      question: "What is the maximum leverage at PlexyTrade?",
      answer: "PlexyTrade offers the highest leverage in the market at 1:2000. This is available on all account types, though traders should be aware that high leverage significantly increases both potential profits and risks."
    },
    {
      question: "How do I deposit funds at PlexyTrade?",
      answer: "PlexyTrade only accepts cryptocurrency deposits. You can fund your account using Bitcoin (BTC), Ethereum (ETH), USDT (TRC20 and ERC20), Litecoin (LTC), or USD Coin (USDC). All deposits and withdrawals are free with processing times of 5-60 minutes."
    },
    {
      question: "What platforms does PlexyTrade offer?",
      answer: "PlexyTrade offers both MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms. Both platforms support Expert Advisors (EAs), allowing for automated trading strategies."
    },
    {
      question: "What is the minimum deposit at PlexyTrade?",
      answer: "The minimum deposit at PlexyTrade is $50 for the Standard Account, $100 for the ECN Account, and $10,000 for the VIP Account. All deposits must be made via cryptocurrency."
    },
  ];

  const pros = [
    "Accepts US clients",
    "Highest leverage available (1:2000)",
    "Zero spread ECN accounts",
    "Good Trustpilot rating (4.4/5)",
    "Built on proven LQDFX infrastructure",
    "Both MT4 and MT5 platforms",
    "Fast execution speeds",
    "No deposit or withdrawal fees",
    "Scalping and hedging allowed",
    "Expert Advisors supported",
  ];

  const cons = [
    "Very new broker (launched 2024)",
    "Unregulated (St. Lucia)",
    "Crypto-only deposits",
    "Limited operating history",
    "No traditional payment methods",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="PlexyTrade Review 2026 - Highest Leverage Broker for US Traders"
        description="Complete PlexyTrade review for US traders. Highest leverage at 1:2000, zero spread ECN accounts, built on LQDFX infrastructure. New broker analysis."
        canonical="/review/plexytrade"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "PlexyTrade",
            "url": brokers.plexytrade.siteUrl,
            "description": "PlexyTrade is a new offshore broker offering the highest leverage (1:2000) for US clients.",
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
            "url": "https://beginnerfxguide.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide"
          },
          "datePublished": "2026-02-04",
          "dateModified": "2026-02-04",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": overallRating,
            "bestRating": "5",
            "worstRating": "1"
          },
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Rocket className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Highest Leverage: 1:2000</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.plexytrade} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      PlexyTrade Review
                    </h1>
                    <p className="text-muted-foreground mt-2">New Broker with LQDFX Infrastructure - 2024</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(Our Rating)</span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full">
                    <Shield className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-500">Trust Score: {trustScore}/100</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  PlexyTrade is a new offshore broker launched in 2024 that offers the highest leverage in the market at 1:2000. Built on the proven LQDFX infrastructure, it accepts US clients and provides zero spread ECN accounts with crypto-only funding.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href={brokers.plexytrade.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("plexytrade", "review_hero", "visit_site")}
                    >
                      Visit PlexyTrade
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <Link to="/compare">
                      Compare Brokers
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 w-full">
                <Card className="bg-gradient-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Trustpilot</span>
                      <span className="font-semibold text-success">4.4/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2024</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">St. Lucia</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$50</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:2000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">ECN Spreads</span>
                      <span className="font-semibold text-primary">From 0.0 pips</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">Accepted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">1:2000 Leverage</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">0.0 ECN Spreads</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Bitcoin className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">Crypto Deposits</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-success" />
                <span className="text-foreground font-medium">US Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-6 bg-amber-500/5 border-b border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">New Broker Warning</h3>
                <p className="text-muted-foreground text-sm">
                  PlexyTrade launched in 2024 and has limited operating history. While it's built on LQDFX infrastructure and has good initial reviews, exercise caution with newer unregulated brokers. Only trade with funds you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Open Account */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How to Open a PlexyTrade Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start trading with 1:2000 leverage in 5 simple steps
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {accountOpeningSteps.map((step, i) => (
                <div key={i} className="relative">
                  <Card className="bg-gradient-card border-border h-full text-center">
                    <CardContent className="pt-6 pb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-xs text-primary font-medium mb-1">Step {i + 1}</div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {i < accountOpeningSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-6 h-6 text-primary/30 -translate-y-1/2 z-10" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={getAffiliateUrl("plexytrade")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("plexytrade", "review_steps", "open_account")}
                >
                  Open Account Now
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Ratings */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Detailed Ratings
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {ratings.map((rating, i) => (
                <Card key={i} className="bg-gradient-card border-border text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{rating.score}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-4 h-4 ${j < Math.floor(rating.score) ? 'fill-primary text-primary' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{rating.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Pros & Cons
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-success/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <Check className="w-6 h-6" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-6 h-6" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-destructive shrink-0 mt-0.5">✕</span>
                        <span className="text-muted-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Account Types
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                PlexyTrade offers three account types all with 1:2000 maximum leverage
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{account.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Min Deposit</p>
                      <p className="text-2xl font-bold text-primary">{account.minDeposit}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Leverage</span>
                        <span className="text-foreground font-medium">{account.leverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Spread</span>
                        <span className="text-foreground font-medium">{account.spread}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Commission</span>
                        <span className="text-foreground font-medium">{account.commission}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 pt-4 border-t border-border">
                      {account.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={account.popular ? "hero" : "outlineGold"}
                      className="w-full mt-4"
                      asChild
                    >
                      <a
                        href={brokers.plexytrade.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("plexytrade", "review_account_types", account.name)}
                      >
                        Open Account
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trading Conditions */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Trading Conditions
              </h2>
            </div>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {tradingConditions.map((condition, i) => (
                    <div key={i} className="flex justify-between items-center px-6 py-4">
                      <span className="text-muted-foreground">{condition.label}</span>
                      <span className="font-medium text-foreground">{condition.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Bitcoin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Cryptocurrency Payment Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                PlexyTrade uses cryptocurrency exclusively for deposits and withdrawals
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Cryptocurrency</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Deposit Fee</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Withdrawal Fee</th>
                    <th className="text-right py-4 px-4 text-muted-foreground font-medium">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{method.name}</td>
                      <td className="py-4 px-4 text-center text-success">{method.deposit}</td>
                      <td className="py-4 px-4 text-center text-success">{method.withdrawal}</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{method.time}</td>
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
            <div className="text-center mb-12">
              <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Community Feedback
              </h2>
            </div>

            <Card className="bg-gradient-card border-border mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">{communityFeedback.trustpilotRating}</div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(communityFeedback.trustpilotRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {communityFeedback.trustpilotReviews}+ Trustpilot reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      Common Praise
                    </h4>
                    <ul className="space-y-2">
                      {communityFeedback.positiveThemes.map((theme, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-success">+</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-destructive" />
                      Common Concerns
                    </h4>
                    <ul className="space-y-2">
                      {communityFeedback.negativeThemes.map((theme, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-destructive">-</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground text-center">
              <a
                href="https://www.trustpilot.com/review/plexytrade.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on Trustpilot →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Common questions about trading with PlexyTrade
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <Card key={i} className="bg-gradient-card border-border overflow-hidden">
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
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
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="PlexyTrade" brokerId="plexytrade" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Trade with PlexyTrade?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the highest leverage in the market at 1:2000 with just $50 minimum deposit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={brokers.plexytrade.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("plexytrade", "review_bottom", "open_account")}
                >
                  Open Account Now
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <Link to="/compare">
                  Compare Other Brokers
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Risk Warning: Trading forex with high leverage carries extreme risk. PlexyTrade is a new, unregulated broker. Only trade with funds you can afford to lose.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full" asChild>
          <a
            href={getAffiliateUrl("plexytrade")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("plexytrade", "review_sticky", "open_account")}
          >
            Open PlexyTrade Account
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default PlexyTradeReview;
