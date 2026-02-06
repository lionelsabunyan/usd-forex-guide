import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, Clock, CreditCard, Globe, FileText, UserPlus, Wallet, PlayCircle, ChevronDown, ArrowRight } from "lucide-react";
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

const ExnessReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const overallRating = 4.8;
  const trustpilotRating = 4.8;
  const trustpilotReviews = 27000;
  const trustScore = 95;

  const ratings = [
    { label: "Trading Conditions", score: 4.8, description: "Ultra-tight spreads" },
    { label: "Platform & Tools", score: 4.5, description: "MT4/MT5 available" },
    { label: "Customer Support", score: 4.5, description: "24/7 multilingual" },
    { label: "Deposit & Withdrawal", score: 4.9, description: "Instant withdrawals" },
    { label: "Trust & Reputation", score: 4.8, description: "27K+ reviews" },
  ];

  const accountOpeningSteps = [
    {
      step: 1,
      title: "Visit Exness",
      description: "Click our link to access the official Exness registration page.",
      icon: Globe,
      time: "30 seconds"
    },
    {
      step: 2,
      title: "Register Account",
      description: "Enter your email, create password, and select your country of residence.",
      icon: UserPlus,
      time: "2 minutes"
    },
    {
      step: 3,
      title: "Verify Identity",
      description: "Upload ID documents for KYC verification. Usually approved within hours.",
      icon: FileText,
      time: "1-24 hours"
    },
    {
      step: 4,
      title: "Fund Account",
      description: "Deposit via bank transfer, card, or e-wallet. Many local payment options available.",
      icon: Wallet,
      time: "Instant"
    },
    {
      step: 5,
      title: "Start Trading",
      description: "Download MT4/MT5, login and start trading with instant execution!",
      icon: PlayCircle,
      time: "5 minutes"
    }
  ];

  const competitorComparison = [
    { feature: "Trustpilot Rating", exness: "4.8/5 ⭐", competitor1: "4.6/5", competitor2: "4.4/5" },
    { feature: "Min Deposit", exness: "$10", competitor1: "$10", competitor2: "$200" },
    { feature: "Max Leverage", exness: "1:2000", competitor1: "1:2000", competitor2: "1:500" },
    { feature: "Spreads From", exness: "0.0 pips", competitor1: "0.3 pips", competitor2: "1.0 pips" },
    { feature: "Regulation", exness: "FCA, CySEC", competitor1: "FCA, CySEC", competitor2: "FCA, ASIC" },
    { feature: "Withdrawal Speed", exness: "Instant ⚡", competitor1: "24-48h", competitor2: "1-3 days" },
    { feature: "Account Types", exness: "5 types", competitor1: "3 types", competitor2: "2 types" },
    { feature: "US Clients", exness: "No", competitor1: "No", competitor2: "No" },
  ];

  const faqs = [
    {
      question: "Is Exness a regulated broker?",
      answer: "Yes, Exness is regulated by multiple top-tier authorities including the Financial Conduct Authority (FCA) in the UK, Cyprus Securities and Exchange Commission (CySEC), and Financial Services Authority (FSA) in Seychelles. This multi-regulatory framework provides strong client protection."
    },
    {
      question: "Does Exness accept US clients?",
      answer: "No, Exness does not accept clients from the United States due to US regulatory restrictions. US traders should look at regulated US brokers like OANDA, Forex.com, or offshore options that accept US clients."
    },
    {
      question: "How fast are Exness withdrawals?",
      answer: "Exness is famous for instant withdrawals. Most withdrawal requests are processed automatically and instantly for e-wallets and many payment methods. Bank transfers may take 1-3 business days depending on your bank."
    },
    {
      question: "What is the minimum deposit for Exness?",
      answer: "The minimum deposit for Standard and Standard Cent accounts is just $10. For Pro, Raw Spread, and Zero accounts, the minimum deposit is $200. This makes Exness accessible to traders with different capital levels."
    },
    {
      question: "Is 1:2000 leverage safe to use?",
      answer: "While Exness offers leverage up to 1:2000, this is extremely risky and not recommended for beginners. Higher leverage means higher potential losses. Start with lower leverage (1:50 or less) and only increase as you gain experience and implement proper risk management."
    },
    {
      question: "What platforms does Exness support?",
      answer: "Exness supports MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms, available on desktop, web browser, and mobile devices. They also have their own Exness Terminal and mobile trading app for convenient access."
    }
  ];

  const accountTypes = [
    { name: "Standard", minDeposit: "$10", leverage: "1:2000", spread: "From 0.3 pips", commission: "No" },
    { name: "Standard Cent", minDeposit: "$10", leverage: "1:2000", spread: "From 0.3 pips", commission: "No" },
    { name: "Pro", minDeposit: "$200", leverage: "1:2000", spread: "From 0.1 pips", commission: "No", popular: true },
    { name: "Raw Spread", minDeposit: "$200", leverage: "1:2000", spread: "From 0.0 pips", commission: "$3.5/lot" },
    { name: "Zero", minDeposit: "$200", leverage: "1:2000", spread: "0.0 pips (30 pairs)", commission: "$3.5/lot" },
  ];

  const paymentMethods = [
    { name: "Bank Transfer", deposit: "Free", withdrawal: "Free", time: "1-3 days" },
    { name: "Visa/Mastercard", deposit: "Free", withdrawal: "Free", time: "Instant", recommended: true },
    { name: "Skrill", deposit: "Free", withdrawal: "Free", time: "Instant", recommended: true },
    { name: "Neteller", deposit: "Free", withdrawal: "Free", time: "Instant" },
    { name: "Perfect Money", deposit: "Free", withdrawal: "Free", time: "Instant" },
    { name: "Crypto (BTC, USDT)", deposit: "Free", withdrawal: "Free", time: "Up to 72h" },
  ];

  const pros = [
    "Multi-regulated (FCA, CySEC, FSA)",
    "Excellent Trustpilot rating (4.8/5 with 27K+ reviews)",
    "Instant withdrawals - no waiting",
    "Ultra-high leverage up to 1:2000",
    "Low minimum deposit ($10)",
    "Zero spread accounts available",
    "Turkish language support",
    "Papara payment method for Turkey",
    "Negative balance protection",
  ];

  const cons = [
    "US clients NOT accepted",
    "Very high leverage = very high risk",
    "Limited educational content",
    "No cTrader platform",
  ];

  const communityFeedback = {
    positiveThemes: [
      "Instant withdrawals praised consistently",
      "Tight spreads and low costs",
      "Reliable execution",
      "Good mobile app",
      "Turkish support available",
    ],
    negativeThemes: [
      "High leverage can lead to quick losses",
      "US traders cannot access",
      "Some platform crashes reported",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Exness Review 2026 - Multi-Regulated Broker with Instant Withdrawals"
        description="Complete Exness review. 4.8/5 Trustpilot rating, instant withdrawals, leverage up to 1:2000. Regulated by FCA & CySEC. One of the largest forex brokers by volume."
        canonical="/review/exness"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Exness",
          },
          "author": {
            "@type": "Organization",
            "name": "US Forex Guide",
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 4.8,
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
                  <BrokerLogo broker={brokers.exness} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Exness Review</h1>
                    <p className="text-muted-foreground mt-2">Multi-Regulated Broker Since 2008</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(Our Rating)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Exness is one of the world's leading forex brokers, regulated by FCA, CySEC, and other authorities. Known for instant withdrawals, ultra-tight spreads, and high leverage up to 1:2000. Popular choice for Turkish traders with local payment support.
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">4.8/5</div>
                    <div className="text-xs text-muted-foreground">Trustpilot</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">$10</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">1:2000</div>
                    <div className="text-xs text-muted-foreground">Max Leverage</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">Instant</div>
                    <div className="text-xs text-muted-foreground">Withdrawals</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild className="group">
                    <a href={brokers.exness.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("exness", "review_hero", "visit_site")}>
                      Open Account Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <Link to="/compare">Compare Brokers</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 w-full">
                <Card className="bg-gradient-card border-border">
                  <CardHeader className="pb-2"><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Trustpilot</span>
                      <span className="font-semibold text-success">4.8/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2008</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">FCA, CySEC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$10</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:2000</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-destructive">Not Accepted</span>
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
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">FCA Regulated</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Zap className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Instant Withdrawals</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Turkish Support</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Star className="w-6 h-6 text-success fill-success" /><span className="text-foreground font-medium">27K+ Reviews</span></div>
          </div>
        </div>
      </section>

      {/* How to Open Account */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How to Open an Exness Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with Exness in just a few simple steps
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
                  href={brokers.exness.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("exness", "review_how_to_open", "start_now")}
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

      {/* Competitor Comparison */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Exness vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how Exness compares to other popular brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-primary">Exness</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">XM</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Pepperstone</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-primary font-medium">{row.exness}</td>
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

      {/* Account Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Account Types</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Popular</div>}
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

      {/* Payment Methods */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Payment Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Multiple deposit and withdrawal options with instant processing
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Method</th>
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
                Everything you need to know about trading with Exness
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
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Community Feedback</h2>
            </div>
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-success">{trustpilotRating}</div>
                  <div>
                    <div className="flex mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-success text-success" />)}</div>
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

      {/* Review Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto"><ReviewForm brokerName="Exness" brokerId="exness" /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Trade with Exness?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join millions of traders worldwide. Experience instant withdrawals and ultra-tight spreads.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild className="group">
                <a href={brokers.exness.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("exness", "review_bottom", "open_account")}>
                  Open Account Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild><Link to="/compare">Compare Brokers</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Risk Warning: CFDs are complex instruments. High leverage can work against you.</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" className="w-full group" size="lg" asChild>
          <a
            href={brokers.exness.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("exness", "review_sticky_mobile", "open_account")}
          >
            Open Exness Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ExnessReview;
