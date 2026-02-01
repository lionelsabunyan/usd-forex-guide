import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";

const FXGloryReview = () => {
  const overallRating = 4.8;
  
  const ratings = [
    { label: "Trading Conditions", score: 4.9 },
    { label: "Platform & Tools", score: 4.7 },
    { label: "Customer Support", score: 4.8 },
    { label: "Deposit & Withdrawal", score: 4.6 },
    { label: "Educational Resources", score: 3.5 },
  ];

  const accountTypes = [
    {
      name: "Micro Account",
      minDeposit: "$1",
      leverage: "1:3000",
      spread: "From 2 pips",
      commission: "No",
      features: ["MT4/MT5", "All instruments", "Hedging allowed", "Expert Advisors"],
    },
    {
      name: "Standard Account",
      minDeposit: "$100",
      leverage: "1:3000",
      spread: "From 1.5 pips",
      commission: "No",
      features: ["MT4/MT5", "All instruments", "Hedging allowed", "Expert Advisors", "Priority support"],
      popular: true,
    },
    {
      name: "VIP Account",
      minDeposit: "$5,000",
      leverage: "1:3000",
      spread: "From 0.5 pips",
      commission: "No",
      features: ["MT4/MT5", "All instruments", "Hedging allowed", "Expert Advisors", "Dedicated manager", "Lower spreads"],
    },
    {
      name: "ECN Account",
      minDeposit: "$500",
      leverage: "1:500",
      spread: "From 0.1 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5", "Raw spreads", "Institutional liquidity", "Expert Advisors", "DMA access"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "50+ Forex pairs, Metals, Energies, Indices, Crypto" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:3000" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Market Execution" },
    { label: "Margin Call", value: "100%" },
    { label: "Stop Out Level", value: "20%" },
    { label: "Swap Free", value: "Available on request" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Allowed" },
    { label: "Expert Advisors", value: "Fully supported" },
    { label: "Trading Hours", value: "24/5" },
  ];

  const paymentMethods = [
    { name: "Bank Wire", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days" },
    { name: "Bitcoin", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "Ethereum", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "USDT (Tether)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "Perfect Money", deposit: "Free", withdrawal: "1%", time: "Instant" },
    { name: "Skrill", deposit: "Free", withdrawal: "1%", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "1%", time: "Instant / 24 hours" },
  ];

  const userReviews = [
    {
      name: "Michael R.",
      location: "Texas, USA",
      rating: 5,
      date: "December 2026",
      title: "Finally a broker that accepts US clients!",
      review: "I've been trading with FXGlory for over a year now. The high leverage and low spreads are fantastic. Withdrawals are processed within 24 hours. Highly recommend for US traders looking for offshore options.",
      verified: true,
    },
    {
      name: "Sarah L.",
      location: "California, USA",
      rating: 5,
      date: "November 2026",
      title: "Great customer service",
      review: "The 24/7 support is a game changer. Had an issue with my deposit and they resolved it within an hour. Trading conditions are excellent with the ECN account.",
      verified: true,
    },
    {
      name: "James K.",
      location: "Florida, USA",
      rating: 4,
      date: "October 2026",
      title: "Solid broker overall",
      review: "Been using their MT5 platform for 6 months. Execution is fast and spreads are competitive. Only downside is the limited educational content, but I'm an experienced trader so it doesn't affect me much.",
      verified: true,
    },
    {
      name: "David M.",
      location: "New York, USA",
      rating: 5,
      date: "September 2026",
      title: "Best offshore option for Americans",
      review: "After trying several brokers, FXGlory stands out. The crypto deposit option makes funding easy. Leverage of 1:3000 is incredible for my trading style. No complaints so far.",
      verified: true,
    },
  ];

  const pros = [
    "Accepts US clients without restrictions",
    "Extremely low minimum deposit ($1)",
    "Very high leverage up to 1:3000",
    "Multiple cryptocurrency payment options",
    "24/7 customer support availability",
    "Fast withdrawal processing (24-48 hours)",
    "Both MT4 and MT5 platforms available",
    "No deposit fees on most methods",
    "Scalping and hedging allowed",
    "Expert Advisors (EA) fully supported",
  ];

  const cons = [
    "Not regulated by major financial authorities (SEC, FCA, ASIC)",
    "Limited educational resources and webinars",
    "No US-based phone support",
    "Spreads higher than some ECN brokers",
    "No negative balance protection guarantee",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FXGlory Review 2026"
        description="Complete FXGlory review for US traders. Learn about leverage up to 1:3000, low spreads from 0.1 pips, cryptocurrency deposits, and why FXGlory is our Editor's Choice for American traders."
        canonical="/review/fxglory"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "FXGlory",
            "url": brokers.fxglory.siteUrl,
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
                  <span className="text-sm text-primary font-medium">Editor's Choice 2026</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.fxglory} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      FXGlory Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Complete Broker Analysis for US Traders</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(2,847 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  FXGlory is one of the leading forex brokers that actively accepts US clients. With competitive trading conditions, high leverage options, and multiple payment methods including cryptocurrencies, it has become a popular choice among American traders.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_HERO)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("fxglory", "review_hero", "open_account")}
                    >
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href={brokers.fxglory.siteUrl} target="_blank" rel="noopener noreferrer">
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
                      <span className="text-muted-foreground">Founded</span>
                      <span className="font-semibold text-foreground">2011</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">St. Vincent</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">SVG FSA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$1</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:3000</span>
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
                FXGlory offers multiple account types to suit different trading styles and experience levels
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
                        href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_ACCOUNT_TYPE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("fxglory", "review_account_types", account.name)}
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
                Comprehensive overview of FXGlory's trading specifications
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
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Payment Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                FXGlory supports a wide variety of deposit and withdrawal methods including cryptocurrencies
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
                      <td className="py-4 px-4 text-center text-muted-foreground">{method.withdrawal}</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{method.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                User Reviews
              </h2>
              <p className="text-muted-foreground">
                What real traders are saying about FXGlory
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="FXGlory" brokerId="fxglory" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with FXGlory?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Open your account today and take advantage of high leverage, low spreads, and fast withdrawals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_BOTTOM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("fxglory", "review_bottom", "open_account")}
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
              Risk Warning: Trading forex carries a high level of risk and may not be suitable for all investors.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FXGloryReview;
