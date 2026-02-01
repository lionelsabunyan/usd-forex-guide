import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";

const ETORO_URL = "https://www.etoro.com";

const EToroReview = () => {
  const overallRating = 4.3;
  
  const ratings = [
    { label: "Trading Conditions", score: 4.3 },
    { label: "Platform & Tools", score: 4.8 },
    { label: "Customer Support", score: 4.2 },
    { label: "Deposit & Withdrawal", score: 4.4 },
    { label: "Educational Resources", score: 4.7 },
  ];

  const accountTypes = [
    {
      name: "Retail Account",
      minDeposit: "$50",
      leverage: "1:30",
      spread: "From 1 pip",
      commission: "No",
      features: ["Copy Trading", "Social Feed", "Virtual Portfolio", "Mobile App"],
    },
    {
      name: "Professional Account",
      minDeposit: "$50",
      leverage: "1:400",
      spread: "From 1 pip",
      commission: "No",
      features: ["Higher leverage", "Copy Trading", "Priority support", "Advanced tools"],
      popular: true,
    },
    {
      name: "Corporate Account",
      minDeposit: "$10,000",
      leverage: "1:400",
      spread: "From 0.8 pips",
      commission: "No",
      features: ["Dedicated manager", "Custom solutions", "API access", "Multi-user access"],
    },
    {
      name: "Islamic Account",
      minDeposit: "$1,000",
      leverage: "1:30",
      spread: "From 1 pip",
      commission: "No",
      features: ["Swap-free", "Sharia compliant", "Copy Trading", "All instruments"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "3,000+ Assets (Stocks, Crypto, Forex, ETFs, Commodities)" },
    { label: "Minimum Lot Size", value: "Variable by asset" },
    { label: "Maximum Leverage", value: "1:30 (Retail) / 1:400 (Pro)" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Market Execution" },
    { label: "Margin Call", value: "50%" },
    { label: "Stop Out Level", value: "50%" },
    { label: "Swap Free", value: "Islamic accounts available" },
    { label: "Copy Trading", value: "Yes - Signature Feature" },
    { label: "Social Trading", value: "Fully integrated" },
    { label: "Fractional Shares", value: "Available" },
    { label: "Trading Hours", value: "24/5 (Crypto 24/7)" },
  ];

  const paymentMethods = [
    { name: "Bank Wire", deposit: "Free", withdrawal: "$5", time: "3-8 business days" },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "$5", time: "Instant / 1-2 days" },
    { name: "PayPal", deposit: "Free", withdrawal: "$5", time: "Instant / 1 day" },
    { name: "Skrill", deposit: "Free", withdrawal: "$5", time: "Instant / 1 day" },
    { name: "Neteller", deposit: "Free", withdrawal: "$5", time: "Instant / 1 day" },
    { name: "Online Banking", deposit: "Free", withdrawal: "$5", time: "Instant / 3-5 days" },
  ];

  const userReviews = [
    {
      name: "Jennifer M.",
      location: "New York, USA",
      rating: 5,
      date: "December 2026",
      title: "Love the copy trading feature!",
      review: "As a beginner, eToro's copy trading has been a game changer. I can follow experienced traders and learn from their strategies. The social feed is also great for market insights.",
      verified: true,
    },
    {
      name: "Robert K.",
      location: "California, USA",
      rating: 4,
      date: "November 2026",
      title: "Great platform, wish spreads were lower",
      review: "The platform is incredibly user-friendly and the variety of assets is impressive. My only complaint is that spreads can be higher than some competitors. But for the features you get, it's worth it.",
      verified: true,
    },
    {
      name: "Amanda S.",
      location: "Texas, USA",
      rating: 5,
      date: "October 2026",
      title: "Best for beginners",
      review: "I tried several brokers before eToro and this is by far the most beginner-friendly. The virtual portfolio lets you practice without risk, and the educational content is excellent.",
      verified: true,
    },
    {
      name: "Chris T.",
      location: "Florida, USA",
      rating: 4,
      date: "September 2026",
      title: "Solid all-around broker",
      review: "Been using eToro for 2 years now. The platform is stable, withdrawals are processed within a few days, and customer support is responsive. Good for long-term investing.",
      verified: true,
    },
  ];

  const pros = [
    "Revolutionary copy trading feature",
    "User-friendly platform for beginners",
    "Wide range of assets (3,000+)",
    "Strong regulatory framework (FCA, CySEC, ASIC)",
    "Free $100,000 virtual portfolio",
    "Active social trading community",
    "Commission-free stock trading",
    "Fractional shares available",
    "Excellent educational resources",
    "Mobile app highly rated",
  ];

  const cons = [
    "Limited availability for US crypto trading",
    "Spreads higher than some competitors",
    "$5 withdrawal fee",
    "Inactivity fee after 12 months",
    "No MT4/MT5 support",
    "Limited forex pairs compared to specialists",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="eToro Review 2026"
        description="Complete eToro review for US traders. Social trading platform with copy trading, $50 minimum deposit, and 30M+ users. Learn about eToro's features, fees, and trading conditions."
        canonical="/review/etoro"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "eToro",
            "url": ETORO_URL,
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">Best for Copy Trading</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.etoro} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      eToro Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Social Trading Pioneer Analysis</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : i < overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(15,432 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  eToro is a globally recognized social trading platform that has revolutionized how people invest. With its innovative copy trading feature, beginners can automatically replicate the trades of successful investors while learning the markets.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={ETORO_URL} target="_blank" rel="noopener noreferrer">
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href={ETORO_URL} target="_blank" rel="noopener noreferrer">
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
                      <span className="font-semibold text-foreground">2007</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Israel / UK</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">FCA, CySEC, ASIC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$50</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:30 (Retail)</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">Accepted (Limited)</span>
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

      {/* Key Features Banner */}
      <section className="py-12 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border-y border-emerald-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <Copy className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-foreground">Copy Trading</p>
                <p className="text-sm text-muted-foreground">Follow top traders</p>
              </div>
              <div>
                <Globe className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-foreground">30M+ Users</p>
                <p className="text-sm text-muted-foreground">Global community</p>
              </div>
              <div>
                <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-foreground">Multi-Regulated</p>
                <p className="text-sm text-muted-foreground">FCA, CySEC, ASIC</p>
              </div>
              <div>
                <TrendingUp className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-foreground">3,000+ Assets</p>
                <p className="text-sm text-muted-foreground">Diverse portfolio</p>
              </div>
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
                eToro offers different account types to accommodate various trading needs and experience levels
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-emerald-500' : ''}`}>
                  {account.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
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
                      <a href={ETORO_URL} target="_blank" rel="noopener noreferrer">
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
                Comprehensive overview of eToro's trading specifications
              </p>
            </div>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {tradingConditions.map((condition, i) => (
                    <div key={i} className="flex justify-between items-center px-6 py-4">
                      <span className="text-muted-foreground">{condition.label}</span>
                      <span className="font-medium text-foreground text-right">{condition.value}</span>
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Payment Methods
              </h2>
              <p className="text-muted-foreground">
                Deposit and withdrawal options with associated fees
              </p>
            </div>

            <Card className="bg-gradient-card border-border overflow-hidden">
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Method</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Deposit Fee</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Withdrawal Fee</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Processing Time</th>
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
              </div>

              <div className="md:hidden divide-y divide-border">
                {paymentMethods.map((method, i) => (
                  <div key={i} className="p-4 space-y-2">
                    <p className="font-medium text-foreground">{method.name}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deposit</p>
                        <p className="text-success">{method.deposit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Withdrawal</p>
                        <p className="text-foreground">{method.withdrawal}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="text-foreground">{method.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                User Reviews
              </h2>
              <p className="text-muted-foreground">
                What real traders are saying about eToro
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {userReviews.map((review, i) => (
                <Card key={i} className="bg-gradient-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.location}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>

                    <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                    <p className="text-muted-foreground text-sm">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Copy Trading?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join millions of traders and investors on eToro's award-winning platform. Practice with a free $100,000 virtual portfolio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href={ETORO_URL} target="_blank" rel="noopener noreferrer">
                  Open Free Account
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href={ETORO_URL} target="_blank" rel="noopener noreferrer">
                  Try Demo Account
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              67% of retail investor accounts lose money when trading CFDs with this provider.
            </p>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="eToro" brokerId="etoro" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EToroReview;