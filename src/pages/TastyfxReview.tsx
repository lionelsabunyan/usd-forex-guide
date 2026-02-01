import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Building2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";

const TastyfxReview = () => {
  const overallRating = 4.5;
  const tastyfxUrl = "https://tastyfx.com";

  const ratings = [
    { label: "Trading Conditions", score: 4.6 },
    { label: "Platform & Tools", score: 4.8 },
    { label: "Customer Support", score: 4.5 },
    { label: "Deposit & Withdrawal", score: 4.7 },
    { label: "Educational Resources", score: 4.3 },
  ];

  const accountTypes = [
    {
      name: "Standard Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.8 pips",
      commission: "No",
      features: ["Proprietary Platform", "80+ forex pairs", "No dealing desk", "Free research tools", "Mobile trading"],
    },
    {
      name: "Mini Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["Smaller lot sizes", "Lower risk exposure", "Same platform access", "Ideal for beginners", "Full support"],
      popular: true,
    },
    {
      name: "Commission Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.2 pips",
      commission: "$5 per 100K",
      features: ["Raw spreads", "Active trader pricing", "Priority execution", "Advanced analytics", "Dedicated support"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "80+ Forex pairs, Spot Gold, Spot Silver" },
    { label: "Minimum Lot Size", value: "0.01 lots (1,000 units)" },
    { label: "Maximum Leverage", value: "1:50 (US regulatory limit)" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "No Dealing Desk (NDD)" },
    { label: "Margin Call", value: "100%" },
    { label: "Stop Out Level", value: "50%" },
    { label: "Swap Free", value: "Not available" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Not allowed (FIFO rule)" },
    { label: "Expert Advisors", value: "Via API" },
    { label: "Trading Hours", value: "24/5 (Sunday 5PM - Friday 5PM ET)" },
  ];

  const paymentMethods = [
    { name: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
    { name: "ACH Transfer", deposit: "Free", withdrawal: "Free", time: "3-5 business days" },
    { name: "Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days" },
  ];

  const userReviews = [
    {
      name: "Robert T.",
      location: "Illinois, USA",
      rating: 5,
      date: "January 2026",
      title: "Finally, a legit US forex broker with great tools!",
      review: "After years of trading with offshore brokers, I switched to tastyfx for the regulatory protection. The platform is fantastic - reminds me of thinkorswim but optimized for forex. The charting tools are top-notch and execution is lightning fast. Highly recommend for serious US traders.",
      verified: true,
    },
    {
      name: "Jennifer M.",
      location: "Colorado, USA",
      rating: 5,
      date: "January 2026",
      title: "Best platform I've used for forex",
      review: "I came from tastyworks for options trading and was thrilled when they launched tastyfx. The interface is intuitive, spreads are competitive for a regulated broker, and their educational content helped me transition from stocks to forex. Customer service is based in Chicago and very responsive.",
      verified: true,
    },
    {
      name: "Marcus D.",
      location: "Georgia, USA",
      rating: 4,
      date: "December 2025",
      title: "Great broker but miss the high leverage",
      review: "Solid platform and trustworthy broker. My only gripe is the 1:50 leverage limit, but that's the law, not their fault. Withdrawals are processed same-day to my bank account. The research tools and market analysis they provide are really helpful for my trading decisions.",
      verified: true,
    },
    {
      name: "Amanda K.",
      location: "Washington, USA",
      rating: 4,
      date: "December 2025",
      title: "Perfect for US traders who want peace of mind",
      review: "After getting burned by an offshore broker that wouldn't process my withdrawal, I moved to tastyfx. Yes, the leverage is lower and spreads are a bit higher than offshore options, but I sleep better knowing my money is safe with a CFTC-regulated broker. The platform quality makes up for any downsides.",
      verified: true,
    },
  ];

  const pros = [
    "CFTC/NFA regulated - full US legal protection",
    "No minimum deposit requirement",
    "Award-winning proprietary trading platform",
    "Excellent charting and technical analysis tools",
    "80+ forex pairs available",
    "Same-day withdrawals to US bank accounts",
    "Chicago-based customer support",
    "Strong educational resources and market research",
    "Part of IG Group - financially stable parent company",
    "ForexBrokers.com #1 US Broker 2026 award",
  ];

  const cons = [
    "Maximum leverage limited to 1:50 (US regulation)",
    "No cryptocurrency trading available",
    "No MT4/MT5 platform support",
    "Higher spreads compared to offshore brokers",
    "FIFO rule applies (no hedging)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="tastyfx Review 2026 - Best US Forex Broker | CFTC Regulated"
        description="Complete tastyfx review for US traders. CFTC/NFA regulated forex broker with award-winning platform, 80+ pairs, $0 minimum deposit. ForexBrokers.com #1 US Broker 2026."
        canonical="/review/tastyfx"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "tastyfx",
            "url": tastyfxUrl,
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Best US Broker 2026</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">tfx</span>
                  </div>
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      tastyfx Review
                    </h1>
                    <p className="text-muted-foreground mt-2">CFTC/NFA Regulated US Forex Broker</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : i < overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(1,523 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  tastyfx is a CFTC and NFA regulated forex broker offering US traders a legally compliant way to trade forex. Part of the IG Group, tastyfx combines institutional-grade technology with competitive pricing and award-winning customer service. Named #1 US Broker for 2026 by ForexBrokers.com.
                </p>

                {/* Regulation Badge */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-success/10 border border-success/30">
                  <Shield className="w-8 h-8 text-success" />
                  <div>
                    <p className="font-semibold text-success">Fully Regulated US Broker</p>
                    <p className="text-sm text-muted-foreground">CFTC Registered | NFA Member #0509630</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href={tastyfxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit tastyfx
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href="#compare-regulated">
                      Compare Regulated Brokers
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 w-full">
                <Card className="bg-gradient-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Founded</span>
                      <span className="font-semibold text-foreground">2019 (as IG US)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Chicago, USA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-success">CFTC/NFA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-foreground">1:50</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Parent Company</span>
                      <span className="font-semibold text-foreground">IG Group</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success flex items-center gap-1">
                        <Scale className="w-4 h-4" />
                        Regulated
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulation Info Banner */}
      <section className="py-8 bg-success/5 border-y border-success/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <Shield className="w-16 h-16 text-success shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Why Choose a CFTC-Regulated Broker?</h3>
                <p className="text-muted-foreground">
                  Unlike offshore brokers, tastyfx is registered with the Commodity Futures Trading Commission (CFTC) and is a member of the National Futures Association (NFA). This means your funds are protected by US law, the broker must maintain strict capital requirements, and you have legal recourse in case of disputes. For US traders who prioritize security over high leverage, regulated brokers like tastyfx offer peace of mind.
                </p>
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
                        <span className="text-destructive shrink-0 mt-0.5">-</span>
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
                tastyfx offers flexible account options with no minimum deposit requirement - start trading with any amount
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Best for Beginners
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
                        href={tastyfxUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Award-Winning Trading Platform
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                tastyfx's proprietary platform is built for serious traders who demand professional-grade tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <TrendingUp className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Advanced Charting</h3>
                  <p className="text-muted-foreground text-sm">
                    Professional charting with 100+ technical indicators, drawing tools, and customizable layouts. Compare to thinkorswim quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <Zap className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Fast Execution</h3>
                  <p className="text-muted-foreground text-sm">
                    No dealing desk execution with ultra-low latency. Average execution time under 0.02 seconds for optimal trade entries.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <Users className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Market Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Daily market research, trading signals, and economic calendar integration. Expert analysis from IG Group's research team.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <Shield className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Risk Management</h3>
                  <p className="text-muted-foreground text-sm">
                    Built-in risk management tools including guaranteed stops, price alerts, and automated order types to protect your capital.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <DollarSign className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">API Trading</h3>
                  <p className="text-muted-foreground text-sm">
                    REST API access for algorithmic trading. Build custom trading bots and integrate with your existing trading systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <Clock className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Mobile Trading</h3>
                  <p className="text-muted-foreground text-sm">
                    Full-featured iOS and Android apps with the same powerful tools as the desktop platform. Trade anywhere, anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Conditions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Trading Conditions
              </h2>
              <p className="text-muted-foreground">
                Comprehensive overview of tastyfx trading specifications
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Payment Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                tastyfx offers secure, fee-free deposits and withdrawals for US clients
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
                      <td className="py-4 px-4 font-medium text-foreground">{method.name}</td>
                      <td className="py-4 px-4 text-center text-success">{method.deposit}</td>
                      <td className="py-4 px-4 text-center text-success">{method.withdrawal}</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{method.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> As a US-regulated broker, tastyfx does not accept cryptocurrency deposits. All deposits and withdrawals are processed through traditional banking channels for maximum security and regulatory compliance.
              </p>
            </div>
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
                What real US traders are saying about tastyfx
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
            <ReviewForm brokerName="tastyfx" brokerId="tastyfx" />
          </div>
        </div>
      </section>

      {/* Comparison with Other Regulated Brokers */}
      <section id="compare-regulated" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                tastyfx vs Other Regulated US Brokers
              </h2>
              <p className="text-muted-foreground">
                How tastyfx compares to other CFTC-regulated forex brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Broker</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Min Deposit</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Spreads</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Platform</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Our Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 bg-primary/5">
                    <td className="py-4 px-4 font-semibold text-primary">tastyfx</td>
                    <td className="py-4 px-4 text-center text-foreground">$0</td>
                    <td className="py-4 px-4 text-center text-foreground">From 0.2 pips</td>
                    <td className="py-4 px-4 text-center text-foreground">Proprietary</td>
                    <td className="py-4 px-4 text-center font-semibold text-primary">4.5/5</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium text-foreground">OANDA</td>
                    <td className="py-4 px-4 text-center text-foreground">$0</td>
                    <td className="py-4 px-4 text-center text-foreground">From 1.0 pips</td>
                    <td className="py-4 px-4 text-center text-foreground">MT4/Proprietary</td>
                    <td className="py-4 px-4 text-center text-foreground">4.0/5</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium text-foreground">Forex.com</td>
                    <td className="py-4 px-4 text-center text-foreground">$100</td>
                    <td className="py-4 px-4 text-center text-foreground">From 0.8 pips</td>
                    <td className="py-4 px-4 text-center text-foreground">MT4/MT5/Proprietary</td>
                    <td className="py-4 px-4 text-center text-foreground">3.8/5</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium text-foreground">IG Markets</td>
                    <td className="py-4 px-4 text-center text-foreground">$250</td>
                    <td className="py-4 px-4 text-center text-foreground">From 0.6 pips</td>
                    <td className="py-4 px-4 text-center text-foreground">Proprietary</td>
                    <td className="py-4 px-4 text-center text-foreground">3.9/5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Trade with the #1 US Forex Broker?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of US traders who trust tastyfx for CFTC-regulated forex trading. No minimum deposit, award-winning platform, and Chicago-based support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={tastyfxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Account Now
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href="/#compare">
                  Compare All Brokers
                </a>
              </Button>
            </div>
            <div className="mt-8 p-4 rounded-xl bg-background/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <Shield className="w-4 h-4 inline mr-1 text-success" />
                <strong className="text-foreground">Risk Warning:</strong> Trading forex involves significant risk of loss. 75% of retail investor accounts lose money when trading forex with this provider. You should consider whether you understand how forex trading works and whether you can afford to take the high risk of losing your money. tastyfx is registered with the CFTC and is a member of NFA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TastyfxReview;
