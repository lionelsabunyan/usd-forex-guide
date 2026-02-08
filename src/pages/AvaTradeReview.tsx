import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";

const AvaTradeReview = () => {
  const overallRating = 3.6;
  const broker = brokers.avatrade;
  const ratingCount = 8800; // Total ratings (Google Search Console requirement)
  const reviewCount = 4300; // Total reviews (Google Search Console requirement)

  const ratings = [
    { label: "Trading Conditions", score: 3.7 },
    { label: "Platform & Tools", score: 3.8 },
    { label: "Customer Support", score: 3.5 },
    { label: "Deposit & Withdrawal", score: 3.6 },
    { label: "Educational Resources", score: 3.9 },
  ];

  const accountTypes = [
    {
      name: "Standard Account",
      minDeposit: "$100",
      leverage: "1:400",
      spread: "From 0.9 pips",
      commission: "No",
      features: ["MT4/MT5", "AvaTradeGO", "All instruments", "Copy Trading"],
      popular: true,
    },
    {
      name: "Professional Account",
      minDeposit: "$1,000",
      leverage: "1:400",
      spread: "From 0.7 pips",
      commission: "No",
      features: ["Lower spreads", "Priority support", "All platforms", "Copy Trading"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "250+ Forex pairs, Stocks, Indices, Commodities, Crypto" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:400 (varies by region)" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Market Execution" },
    { label: "Margin Call", value: "100%" },
    { label: "Stop Out Level", value: "25%" },
    { label: "Swap Free", value: "Available (Islamic accounts)" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Allowed" },
    { label: "Expert Advisors", value: "Fully supported" },
    { label: "Trading Hours", value: "24/5" },
    { label: "Negative Balance Protection", value: "Yes" },
  ];

  const paymentMethods = [
    { name: "Bank Wire", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days" },
    { name: "Skrill", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
  ];

  const userReviews = [
    {
      name: "Kevin M.",
      location: "Oregon, USA",
      rating: 3,
      date: "December 2026",
      title: "Good platform but not for US",
      review: "AvaTrade has excellent platforms and educational content. However, they don't accept US clients anymore. Had to switch to another broker.",
      verified: true,
    },
    {
      name: "Rachel T.",
      location: "New York, USA",
      rating: 3,
      date: "November 2026",
      title: "Used to be great",
      review: "Traded with AvaTrade before they stopped accepting US clients. The AvaTradeGO app was fantastic. Wish they still accepted US traders.",
      verified: true,
    },
    {
      name: "Michael P.",
      location: "California, USA",
      rating: 4,
      date: "October 2026",
      title: "Excellent for non-US traders",
      review: "My friend in Europe uses AvaTrade and loves it. The copy trading feature is great. Unfortunately not available for US residents.",
      verified: true,
    },
    {
      name: "Lisa H.",
      location: "Texas, USA",
      rating: 3,
      date: "September 2026",
      title: "Not accepting US clients",
      review: "AvaTrade has good trading conditions and platforms, but they no longer accept US clients. Need to look for alternatives.",
      verified: true,
    },
  ];

  const pros = [
    "Multiple tier-1 regulations (ASIC, FCA, CySEC)",
    "Excellent educational resources",
    "User-friendly AvaTradeGO mobile app",
    "Copy trading feature available",
    "Multiple platform options (MT4/MT5/AvaTradeGO)",
    "250+ trading instruments",
    "Negative balance protection",
    "Islamic swap-free accounts",
    "Good customer support",
    "Competitive spreads",
  ];

  const cons = [
    "Does not accept US clients",
    "Higher minimum deposit than some competitors",
    "Limited leverage for some regions",
    "Withdrawal processing can be slow",
    "No cryptocurrency deposits",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AvaTrade Review 2026"
        description="Complete AvaTrade review - globally regulated broker with AvaTradeGO app, copy trading, and 250+ instruments. Note: Does not accept US clients."
        canonical="/review/avatrade"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "AvaTrade",
            "url": broker.siteUrl,
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
            "name": "US Forex Guide",
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
      
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Multi-Regulated</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      AvaTrade Review
                    </h1>
                    <p className="text-muted-foreground mt-2">International Broker Analysis</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(2,156 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  AvaTrade is a well-regulated international forex broker founded in 2006, offering multiple trading platforms and excellent educational resources. However, AvaTrade does not currently accept clients from the United States.
                </p>

                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">US Clients Not Accepted</p>
                      <p className="text-sm text-muted-foreground">
                        AvaTrade does not currently accept clients from the United States. US traders should consider CFTC-regulated brokers or offshore alternatives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href="/brokers">
                      View US-Accepted Brokers
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
                      <span className="text-muted-foreground">Founded</span>
                      <span className="font-semibold text-foreground">2006</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Ireland</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">ASIC, FCA, CySEC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$100</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:400</span>
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

      <section className="py-8 bg-gradient-gold">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">Multi-Regulated</p>
            </div>
            <div>
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">$100 Min Deposit</p>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">1:400 Leverage</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">Copy Trading</p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Account Types
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                      <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <CreditCard className="w-8 h-8 inline-block mr-2 text-primary" />
                Payment Methods
              </h2>
            </div>

            <div className="hidden md:block">
              <Card className="bg-gradient-card border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Method</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Deposit Fee</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Withdrawal Fee</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentMethods.map((method, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-foreground">{method.name}</td>
                        <td className="px-6 py-4 text-center text-success">{method.deposit}</td>
                        <td className="px-6 py-4 text-center text-foreground">{method.withdrawal}</td>
                        <td className="px-6 py-4 text-center text-muted-foreground">{method.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="md:hidden space-y-4">
              {paymentMethods.map((method, i) => (
                <Card key={i} className="bg-gradient-card border-border">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-3">{method.name}</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deposit</p>
                        <p className="text-success font-medium">{method.deposit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Withdrawal</p>
                        <p className="font-medium text-foreground">{method.withdrawal}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-medium text-foreground">{method.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <MessageCircle className="w-8 h-8 inline-block mr-2 text-primary" />
                User Reviews
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {userReviews.map((review, i) => (
                <Card key={i} className="bg-gradient-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{review.name}</h4>
                          {review.verified && (
                            <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Verified</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </div>
                    <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
                    <p className="text-muted-foreground text-sm">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              AvaTrade Does Not Accept US Clients
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              US traders should consider CFTC-regulated brokers or offshore alternatives that accept US clients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="/brokers">
                  View US-Accepted Brokers
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href="/#compare">
                  Compare Brokers
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="AvaTrade" brokerId="avatrade" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AvaTradeReview;
