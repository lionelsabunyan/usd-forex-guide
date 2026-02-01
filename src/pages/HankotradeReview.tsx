import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";

const HankotradeReview = () => {
  const overallRating = 4.7;

  const ratings = [
    { label: "Trading Conditions", score: 4.9 },
    { label: "Platform & Tools", score: 4.7 },
    { label: "Customer Support", score: 4.8 },
    { label: "Deposit & Withdrawal", score: 4.9 },
    { label: "Trust & Reputation", score: 4.5 },
  ];

  const accountTypes = [
    {
      name: "STP Account",
      minDeposit: "$10",
      leverage: "1:500",
      spread: "From 1.2 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "No commission", "Hedging allowed", "Expert Advisors", "All instruments"],
    },
    {
      name: "ECN Account",
      minDeposit: "$100",
      leverage: "1:500",
      spread: "From 0.0 pips",
      commission: "$4 per lot",
      features: ["MT4/MT5 Platform", "Raw ECN spreads", "DMA execution", "Expert Advisors", "Best for scalpers"],
      popular: true,
    },
    {
      name: "ECN Plus",
      minDeposit: "$1,000",
      leverage: "1:500",
      spread: "From 0.0 pips",
      commission: "$2 per lot",
      features: ["MT4/MT5 Platform", "Lowest commission", "Priority execution", "VIP support", "Best rates"],
    },
    {
      name: "ECN Blue",
      minDeposit: "$50",
      leverage: "1:500",
      spread: "From 0.0 pips",
      commission: "Variable",
      features: ["For Signal Sellers", "Revenue sharing", "Copy trading ready", "Mentor program", "High rebates"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "100+ Forex pairs, Metals, Indices, Crypto, Energies" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:500" },
    { label: "Spread Type", value: "Variable / ECN (Raw)" },
    { label: "Execution Type", value: "STP / ECN" },
    { label: "Margin Call", value: "80%" },
    { label: "Stop Out Level", value: "50%" },
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
    { name: "Bitcoin Cash (BCH)", deposit: "Free", withdrawal: "Free", time: "10-60 minutes" },
    { name: "Dogecoin (DOGE)", deposit: "Free", withdrawal: "Free", time: "5-15 minutes" },
    { name: "USD Coin (USDC)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
  ];

  const userReviews = [
    {
      name: "Marcus W.",
      location: "Texas, USA",
      rating: 5,
      date: "January 2026",
      title: "Best ECN broker for US traders",
      review: "Hankotrade has been my go-to broker for over a year. The ECN spreads are incredibly tight, and withdrawals are processed within hours. Their daily IB payments are also fantastic for those in the affiliate program.",
      verified: true,
    },
    {
      name: "Emily R.",
      location: "Florida, USA",
      rating: 5,
      date: "December 2025",
      title: "Lightning fast withdrawals",
      review: "I've tried many offshore brokers, but Hankotrade stands out. Deposited with USDT, traded for a month, and withdrew my profits the same day. No issues, no excuses. This is how a broker should operate.",
      verified: true,
    },
    {
      name: "Kevin L.",
      location: "California, USA",
      rating: 5,
      date: "November 2025",
      title: "Perfect for scalping",
      review: "The ECN account with 0.0 spreads is perfect for my scalping strategy. Execution is fast, no requotes. The $4 per lot commission is very competitive. Highly recommend for active traders.",
      verified: true,
    },
    {
      name: "Diana S.",
      location: "New York, USA",
      rating: 4,
      date: "October 2025",
      title: "Great broker, minor learning curve",
      review: "Took me a bit to get used to the crypto-only deposits, but once I figured it out, everything has been smooth. Support team is responsive and helpful. Would give 5 stars if they added more payment options.",
      verified: true,
    },
  ];

  const pros = [
    "Accepts US clients without restrictions",
    "Exceptional Trustpilot rating (5.0/5 with 2,300+ reviews)",
    "True ECN accounts with 0.0 pip spreads",
    "Very low minimum deposit ($10)",
    "Lightning-fast crypto withdrawals (same day)",
    "Daily IB commission payments",
    "Both MT4 and MT5 platforms available",
    "No deposit or withdrawal fees",
    "Scalping and hedging allowed",
    "Expert Advisors (EA) fully supported",
    "ECN Blue account for signal providers",
    "100+ trading instruments",
  ];

  const cons = [
    "Not regulated by major authorities (CFTC, FCA, ASIC)",
    "Cryptocurrency-only funding options",
    "No traditional payment methods (bank wire, cards)",
    "Maximum leverage lower than some competitors (1:500)",
    "No US-based phone support",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hankotrade Review 2026"
        description="Complete Hankotrade review for US traders. Discover why Hankotrade has a perfect 5.0 Trustpilot rating, ECN spreads from 0.0 pips, and same-day crypto withdrawals. Top choice for American forex traders."
        canonical="/review/hankotrade"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Hankotrade",
            "url": brokers.hankotrade.siteUrl,
          },
          "author": {
            "@type": "Organization",
            "name": "US Forex Guide",
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": overallRating,
            "bestRating": "5",
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
                  <Star className="w-4 h-4 text-success fill-success" />
                  <span className="text-sm text-success font-medium">5.0/5 Trustpilot Rating</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.hankotrade} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      Hankotrade Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Trusted ECN Broker Since 2020</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(2,363 Trustpilot reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Hankotrade has quickly become one of the most trusted offshore forex brokers for US clients. With a perfect 5.0 Trustpilot rating, true ECN execution, and same-day cryptocurrency withdrawals, it offers everything active traders need.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href={getAffiliateUrl("hankotrade", UTM_CONFIGS.REVIEW_HERO)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("hankotrade", "review_hero", "open_account")}
                    >
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href={brokers.hankotrade.siteUrl} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
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
                      <span className="font-semibold text-success">5.0/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2020</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Seychelles</span>
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
      <section className="py-8 bg-success/5 border-y border-success/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-success fill-success" />
                <span className="text-foreground font-medium">5.0/5 Trustpilot</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">2,363+ Reviews</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">Same-Day Withdrawals</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">Daily IB Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Ratings */}
      <section className="py-16 bg-background">
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
      <section className="py-16 bg-secondary/30">
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Account Types
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hankotrade offers STP and ECN accounts to suit different trading styles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        href={getAffiliateUrl("hankotrade", UTM_CONFIGS.REVIEW_ACCOUNT_TYPE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("hankotrade", "review_account_types", account.name)}
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
              <p className="text-muted-foreground">
                Comprehensive overview of Hankotrade's trading specifications
              </p>
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
                Hankotrade uses cryptocurrency for fast, secure, and fee-free transactions
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

            <div className="mt-8 p-4 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Why Crypto?</strong> Cryptocurrency payments allow Hankotrade to offer same-day withdrawals with zero fees. Most withdrawals are processed within 1-2 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hankotrade */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Award className="w-12 h-12 text-primary shrink-0" />
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                      Why Traders Choose Hankotrade
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      With over 2,300 reviews and a perfect 5.0 rating on Trustpilot, Hankotrade has earned the trust of traders worldwide. Here's what sets them apart:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-success" />
                          True ECN execution with 0.0 spreads
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-success" />
                          Same-day withdrawal processing
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-success" />
                          No hidden fees or charges
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-success" />
                          24/5 responsive customer support
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-success" />
                          Daily IB commission payments
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-success" />
                          Transparent trading conditions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                User Reviews
              </h2>
              <p className="text-muted-foreground">
                What real traders are saying about Hankotrade
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {userReviews.map((review, i) => (
                <Card key={i} className="bg-gradient-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{review.name}</span>
                          {review.verified && (
                            <span className="text-xs px-2 py-0.5 bg-success/20 text-success rounded-full">Verified</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{review.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outlineGold">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="Hankotrade" brokerId="hankotrade" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with Hankotrade?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied traders. Open your account with just $10 and experience true ECN trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={getAffiliateUrl("hankotrade", UTM_CONFIGS.REVIEW_BOTTOM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hankotrade", "review_bottom", "open_account")}
                >
                  Open Account Now
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href="/#compare">
                  Compare with Other Brokers
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Risk Warning: Trading forex carries a high level of risk and may not be suitable for all investors. Hankotrade is not regulated by major financial authorities.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HankotradeReview;
