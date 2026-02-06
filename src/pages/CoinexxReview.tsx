import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Bitcoin, Globe, FileText, UserPlus, Wallet, PlayCircle, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";
import { ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const CoinexxReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const overallRating = 4.4;
  const trustpilotRating = 4.9;
  const trustScore = 76;
  const lastUpdated = "February 4, 2026";

  const ratings = [
    { label: "Trading Conditions", score: 4.0, description: "True ECN with 0.0 spreads" },
    { label: "Platform & Tools", score: 3.8, description: "MT4 & MT5 available" },
    { label: "Customer Support", score: 3.5, description: "Email & live chat" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "Fast crypto processing, same-day" },
    { label: "Trust & Reputation", score: 3.5, description: "4.9/5 Trustpilot, unregulated" },
  ];

  const accountOpeningSteps = [
    {
      step: 1,
      title: "Visit Coinexx",
      description: "Click our link to access the official Coinexx registration page with exclusive benefits.",
      icon: Globe,
      time: "30 seconds"
    },
    {
      step: 2,
      title: "Register Account",
      description: "Enter your email and create a password. Minimal verification for anonymous trading.",
      icon: UserPlus,
      time: "2 minutes"
    },
    {
      step: 3,
      title: "Get Crypto Wallet Address",
      description: "Coinexx will provide you with a deposit wallet address for your chosen cryptocurrency.",
      icon: Wallet,
      time: "1 minute"
    },
    {
      step: 4,
      title: "Deposit Crypto",
      description: "Send crypto from your wallet to Coinexx. Minimum $10 worth of any supported crypto.",
      icon: Bitcoin,
      time: "10-60 minutes"
    },
    {
      step: 5,
      title: "Start ECN Trading",
      description: "Download MT4/MT5, login with your credentials, and enjoy true 0.0 pip spreads!",
      icon: PlayCircle,
      time: "5 minutes"
    }
  ];

  const competitorComparison = [
    { feature: "US Clients Accepted", coinexx: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", coinexx: "$10", competitor1: "$50", competitor2: "$10" },
    { feature: "Max Leverage", coinexx: "1:500", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Raw Spreads", coinexx: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Commission", coinexx: "$3.50/lot", competitor1: "$4/lot", competitor2: "$6/lot" },
    { feature: "Trustpilot Rating", coinexx: "4.9/5 ⭐", competitor1: "4.4/5", competitor2: "4.6/5" },
    { feature: "Platforms", coinexx: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "Crypto Deposits", coinexx: "Crypto Only", competitor1: "Available", competitor2: "Available" },
    { feature: "Anonymous Trading", coinexx: "Yes ✓", competitor1: "Limited", competitor2: "No" },
    { feature: "Withdrawal Speed", coinexx: "Same Day", competitor1: "24-48h", competitor2: "1-24h" },
  ];

  const faqs = [
    {
      question: "Does Coinexx accept US clients?",
      answer: "Yes, Coinexx accepts US clients without restrictions. As a crypto-only broker based in St. Vincent and the Grenadines, they operate outside US regulatory jurisdiction. US traders can open accounts and trade all instruments including forex, metals, indices, and cryptocurrencies."
    },
    {
      question: "How do I deposit money into Coinexx?",
      answer: "Coinexx only accepts cryptocurrency deposits. Supported cryptos include Bitcoin (BTC), Ethereum (ETH), USDT (TRC20 & ERC20), Litecoin (LTC), and Bitcoin Cash (BCH). Simply send crypto to your unique deposit address and funds typically arrive within 10-60 minutes depending on network confirmation times."
    },
    {
      question: "Is Coinexx safe and trustworthy?",
      answer: "Coinexx has an excellent 4.9/5 rating on Trustpilot from 500+ reviews, which is one of the highest in the industry. While they are not regulated by major authorities (they're registered in St. Vincent), their reputation in the trading community is strong. They've been operating since 2017 with consistent positive feedback."
    },
    {
      question: "What are Coinexx's spreads and commissions?",
      answer: "Coinexx offers true ECN trading with raw spreads starting from 0.0 pips. The commission is $3.50 per lot round turn, which is competitive for a true ECN broker. There are no deposit or withdrawal fees, and the minimum lot size is 0.01."
    },
    {
      question: "Can I trade anonymously with Coinexx?",
      answer: "Yes, Coinexx offers anonymous trading. Due to their crypto-only model and minimal verification requirements, you can maintain privacy while trading. This is attractive for traders who prioritize financial privacy."
    },
    {
      question: "How fast are withdrawals from Coinexx?",
      answer: "Coinexx processes withdrawals very quickly, typically same-day for cryptocurrency withdrawals. Once approved, the crypto arrives in your wallet within 10-60 minutes depending on blockchain confirmation times. There are no withdrawal fees from Coinexx's side."
    }
  ];

  const accountTypes = [
    {
      name: "ECN Account",
      minDeposit: "$10",
      leverage: "1:500",
      spread: "From 0.0 pips",
      commission: "$3.50 per lot",
      features: ["MT4/MT5 Platform", "True ECN execution", "Crypto deposits only", "Anonymous trading", "Fast withdrawals"],
      popular: true,
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "Forex, Metals, Indices, Crypto" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:500" },
    { label: "Spread Type", value: "Raw ECN (0.0 pips)" },
    { label: "Execution Type", value: "ECN / STP" },
    { label: "Margin Call", value: "80%" },
    { label: "Stop Out Level", value: "50%" },
    { label: "Swap Free", value: "Available" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Allowed" },
    { label: "Expert Advisors", value: "Fully supported" },
    { label: "Trading Hours", value: "24/5" },
  ];

  const paymentMethods = [
    { name: "Bitcoin (BTC)", deposit: "Free", withdrawal: "Free", time: "10-60 min", recommended: true },
    { name: "USDT (Tether TRC20)", deposit: "Free", withdrawal: "Free", time: "5-30 min", recommended: true },
    { name: "Ethereum (ETH)", deposit: "Free", withdrawal: "Free", time: "10-30 min" },
    { name: "USDT (Tether ERC20)", deposit: "Free", withdrawal: "Free", time: "10-30 min" },
    { name: "Litecoin (LTC)", deposit: "Free", withdrawal: "Free", time: "5-30 min" },
    { name: "Bitcoin Cash (BCH)", deposit: "Free", withdrawal: "Free", time: "10-60 min" },
  ];

  const communityFeedback = {
    trustpilotRating: 4.9,
    trustpilotReviews: 500,
    positiveThemes: [
      "Excellent Trustpilot rating (4.9/5)",
      "True ECN execution with 0.0 spreads",
      "Fast crypto withdrawals",
      "Anonymous trading possible",
      "Low minimum deposit ($10)",
      "Great for scalpers",
    ],
    negativeThemes: [
      "Crypto-only deposits/withdrawals",
      "Unregulated broker",
      "No traditional payment methods",
      "Limited customer support hours",
    ],
    lastUpdated: "February 2026",
  };

  const pros = [
    "Accepts US clients",
    "Excellent Trustpilot rating (4.9/5)",
    "True ECN with 0.0 pip spreads",
    "Very low minimum deposit ($10)",
    "Fast crypto withdrawals (same day)",
    "Anonymous trading available",
    "Both MT4 and MT5 platforms",
    "No deposit or withdrawal fees",
    "Scalping and hedging allowed",
    "Expert Advisors supported",
  ];

  const cons = [
    "Cryptocurrency-only funding",
    "Unregulated (St. Vincent)",
    "No traditional payment methods",
    "Limited customer support",
    "Newer broker (2017)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Coinexx Review 2026 - Crypto-Only ECN Broker for US Traders"
        description="Complete Coinexx review for US traders. 4.9 Trustpilot rating, true ECN with 0.0 spreads, crypto-only deposits. Best for scalpers seeking anonymous trading."
        canonical="/review/coinexx"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Coinexx",
            "url": brokers.coinexx.siteUrl,
            "description": "Coinexx is a crypto-only ECN broker accepting US clients with 0.0 pip spreads.",
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
                {/* Trust Score Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-sm text-success font-medium">Trust Score: {trustScore}/100</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.coinexx} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      Coinexx Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Crypto-Only ECN Broker Since 2017</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : i < overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(Our Rating)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Coinexx is a crypto-only ECN broker that accepts US clients. With an excellent 4.9/5 Trustpilot rating, true 0.0 pip spreads, and anonymous trading options, it's a top choice for scalpers and traders who prefer cryptocurrency transactions.
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">4.9/5</div>
                    <div className="text-xs text-muted-foreground">Trustpilot</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">$10</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">0.0</div>
                    <div className="text-xs text-muted-foreground">Pip Spread</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">Same Day</div>
                    <div className="text-xs text-muted-foreground">Withdrawals</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild className="group">
                    <a
                      href={brokers.coinexx.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("coinexx", "review_hero", "visit_site")}
                    >
                      Open Account Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                      <span className="font-semibold text-success">4.9/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2017</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">St. Vincent</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$10</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:500</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">ECN Spreads</span>
                      <span className="font-semibold text-primary">From 0.0 pips</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">✓ Accepted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-success/5 border-y border-success/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-success fill-success" />
                <span className="text-foreground font-medium">4.9/5 Trustpilot</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Bitcoin className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">Crypto-Only</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">0.0 ECN Spreads</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">Same-Day Withdrawals</span>
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
                <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                <p className="text-muted-foreground text-sm">
                  Coinexx only accepts cryptocurrency deposits and withdrawals. You must have access to crypto (Bitcoin, Ethereum, USDT, etc.) to use this broker. They are unregulated but have an excellent community reputation.
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
                How to Open a Coinexx Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start trading with crypto in minutes - minimal verification required
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {accountOpeningSteps.map((step, i) => (
                <div key={i} className="relative">
                  <Card className="bg-gradient-card border-border h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-xs text-primary font-medium mb-2">Step {step.step}</div>
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.time}
                      </div>
                    </CardContent>
                  </Card>
                  {i < accountOpeningSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="hero" size="lg" asChild className="group">
                <a
                  href={brokers.coinexx.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("coinexx", "review_how_to_open", "start_now")}
                >
                  Start Trading Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                    <p className="text-sm font-medium text-foreground mb-1">{rating.label}</p>
                    <p className="text-xs text-muted-foreground">{rating.description}</p>
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

      {/* Competitor Comparison */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Coinexx vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how Coinexx compares to other US-friendly brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-primary">Coinexx</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Hankotrade</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">MidasFX</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-primary font-medium">{row.coinexx}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.competitor1}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.competitor2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Account Type */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                ECN Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Coinexx offers a single ECN account type optimized for all traders
              </p>
            </div>

            <Card className="bg-gradient-card border-border ring-2 ring-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">True ECN Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Min Deposit</p>
                    <p className="text-2xl font-bold text-primary">$10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Leverage</p>
                    <p className="text-2xl font-bold text-primary">1:500</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Spreads</p>
                    <p className="text-2xl font-bold text-primary">0.0 pips</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Commission</p>
                    <p className="text-2xl font-bold text-foreground">$3.50/lot</p>
                  </div>
                </div>

                <ul className="grid md:grid-cols-2 gap-3 pt-4 border-t border-border">
                  {accountTypes[0].features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="hero" className="w-full group" size="lg" asChild>
                  <a
                    href={brokers.coinexx.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick("coinexx", "review_account_types", "ecn")}
                  >
                    Open ECN Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Bitcoin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Cryptocurrency Payment Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Coinexx uses cryptocurrency exclusively for fast, secure, and fee-free transactions
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
                      <td className="py-4 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          {method.name}
                          {method.recommended && (
                            <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Recommended</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-success">{method.deposit}</td>
                      <td className="py-4 px-4 text-center text-success">{method.withdrawal}</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{method.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Why Crypto-Only?</strong> Cryptocurrency payments enable Coinexx to offer anonymous trading, same-day withdrawals, and zero transaction fees. Perfect for traders who value privacy and speed.
              </p>
            </div>
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
                Everything you need to know about trading with Coinexx
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i} className="bg-gradient-card border-border overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
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
                    <div className="text-4xl font-bold text-success">{communityFeedback.trustpilotRating}</div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-success text-success" />
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
                href="https://www.trustpilot.com/review/coinexx.com"
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

      {/* Review Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="Coinexx" brokerId="coinexx" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Trade with Coinexx?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with just $10 in crypto and experience true ECN trading with 0.0 pip spreads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild className="group">
                <a
                  href={brokers.coinexx.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("coinexx", "review_bottom", "open_account")}
                >
                  Open Account Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <Link to="/review/hankotrade">
                  Compare with Hankotrade
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Risk Warning: Trading forex carries a high level of risk. Coinexx is not regulated by major financial authorities. Crypto-only funding required.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" className="w-full group" size="lg" asChild>
          <a
            href={brokers.coinexx.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("coinexx", "review_sticky_mobile", "open_account")}
          >
            Open Coinexx Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default CoinexxReview;
