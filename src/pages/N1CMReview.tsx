import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const N1CMReview = () => {
  const overallRating = 4.2;
  
  const ratings = [
    { label: "Trading Conditions", score: 4.5 },
    { label: "Platform & Tools", score: 4.3 },
    { label: "Customer Support", score: 3.8 },
    { label: "Deposit & Withdrawal", score: 3.5 },
    { label: "Educational Resources", score: 3.2 },
  ];

  const accountTypes = [
    {
      name: "Cent Account",
      minDeposit: "$1",
      leverage: "1:1000",
      spread: "From 0.9 pips",
      commission: "No",
      features: ["MT4/MT5", "Forex & Metals", "Hedging allowed", "Expert Advisors"],
    },
    {
      name: "Standard Account",
      minDeposit: "$10",
      leverage: "1:1000",
      spread: "From 0.8 pips",
      commission: "No",
      features: ["MT4/MT5", "All instruments", "Hedging allowed", "Expert Advisors", "Scalping allowed"],
      popular: true,
    },
    {
      name: "ECN Pro Account",
      minDeposit: "$100",
      leverage: "1:1000",
      spread: "From 0.5 pips",
      commission: "$5 per lot",
      features: ["MT4/MT5", "Raw spreads", "Direct market access", "Expert Advisors", "Priority execution"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "200+ Forex pairs, Metals, Indices, Commodities, Crypto" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:1000" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Market Execution" },
    { label: "Margin Call", value: "100%" },
    { label: "Stop Out Level", value: "30%" },
    { label: "Swap Free", value: "Available (Islamic accounts)" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Allowed" },
    { label: "Expert Advisors", value: "Fully supported" },
    { label: "Trading Hours", value: "24/5" },
    { label: "PAMM/MAM", value: "Available" },
    { label: "Negative Balance Protection", value: "Yes" },
  ];

  const paymentMethods = [
    { name: "Bank Wire", deposit: "Free", withdrawal: "Free", time: "1-5 business days" },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days" },
    { name: "Bitcoin (BTC)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "Ethereum (ETH)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "USDT (Tether)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "Litecoin (LTC)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "Skrill", deposit: "Free", withdrawal: "1%", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "1%", time: "Instant / 24 hours" },
    { name: "Perfect Money", deposit: "Free", withdrawal: "1%", time: "Instant" },
  ];

  const userReviews = [
    {
      name: "Robert T.",
      location: "Arizona, USA",
      rating: 5,
      date: "October 2024",
      title: "High leverage and good conditions",
      review: "Been trading with N1CM for about 8 months. The 1:1000 leverage is perfect for my strategy. Crypto deposits are fast and easy. Platform runs smoothly.",
      verified: true,
    },
    {
      name: "Jennifer M.",
      location: "Nevada, USA",
      rating: 4,
      date: "September 2024",
      title: "Solid broker for scalping",
      review: "Love that they allow scalping and EA trading without restrictions. Spreads are competitive on the ECN account. Only wish customer support was faster.",
      verified: true,
    },
    {
      name: "Chris P.",
      location: "Georgia, USA",
      rating: 3,
      date: "December 2024",
      title: "Mixed experience lately",
      review: "Trading platform is great and execution is fast. However, my last withdrawal took longer than expected. Support said it was a technical issue. Waiting to see if it improves.",
      verified: true,
    },
    {
      name: "Amanda S.",
      location: "Ohio, USA",
      rating: 4,
      date: "August 2024",
      title: "Good for beginners",
      review: "Started with the Cent account with just $5. Great way to learn real trading without risking much. MT5 mobile app works well. Would recommend for new traders.",
      verified: true,
    },
  ];

  const pros = [
    "Accepts US clients without restrictions",
    "Very low minimum deposit ($1 for Cent account)",
    "High leverage up to 1:1000",
    "Multiple cryptocurrency payment options",
    "Scalping and EA trading fully allowed",
    "Both MT4 and MT5 platforms available",
    "PAMM/MAM accounts for investors",
    "Negative balance protection",
    "200+ trading instruments",
    "Islamic swap-free accounts available",
  ];

  const cons = [
    "Offshore regulation (Vanuatu VFSC) - lower investor protection",
    "Recent reports of withdrawal delays",
    "Limited educational content",
    "Customer support response times can be slow",
    "No proprietary trading platform",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">High Leverage Specialist</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-gold flex items-center justify-center text-3xl font-bold text-primary-foreground">
                    N1
                  </div>
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      N1CM Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Number One Capital Market - Complete Broker Analysis</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(1,243 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  N1CM (Number One Capital Market) is an offshore forex broker established in 2017, offering high leverage trading up to 1:1000 and accepting US clients. Based in Vanuatu, it provides competitive trading conditions with low minimum deposits.
                </p>

                {/* Risk Warning */}
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Risk Warning</p>
                      <p className="text-sm text-muted-foreground">
                        Recent user reports indicate some withdrawal delays. Trade with caution and only risk capital you can afford to lose.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href="https://www.n1cm.com" target="_blank" rel="noopener noreferrer">
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href="https://www.n1cm.com" target="_blank" rel="noopener noreferrer">
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
                      <span className="font-semibold text-foreground">2017</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Vanuatu</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">VFSC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$1</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:1000</span>
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

      {/* Key Features Banner */}
      <section className="py-8 bg-gradient-gold">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">$1 Min Deposit</p>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">1:1000 Leverage</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">0.5 Pips Spread</p>
            </div>
            <div>
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">US Clients OK</p>
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
                N1CM offers three account types designed for different trading needs and experience levels
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
                    <Button variant={account.popular ? "hero" : "outlineGold"} className="w-full mt-4" asChild>
                      <a href="https://www.n1cm.com" target="_blank" rel="noopener noreferrer">
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
                Comprehensive overview of N1CM's trading specifications
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <CreditCard className="w-8 h-8 inline-block mr-2 text-primary" />
                Payment Methods
              </h2>
              <p className="text-muted-foreground">
                Multiple funding options including cryptocurrencies
              </p>
            </div>

            {/* Desktop Table */}
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

            {/* Mobile Cards */}
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

      {/* User Reviews */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <MessageCircle className="w-8 h-8 inline-block mr-2 text-primary" />
                User Reviews
              </h2>
              <p className="text-muted-foreground">
                What real traders are saying about N1CM
              </p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with N1CM?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Open an account today and access 1:1000 leverage with deposits starting from just $1
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="https://www.n1cm.com" target="_blank" rel="noopener noreferrer">
                  Open Live Account
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href="https://www.n1cm.com" target="_blank" rel="noopener noreferrer">
                  Try Demo Account
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              <AlertTriangle className="w-4 h-4 inline-block mr-1" />
              Trading CFDs involves significant risk. Trade responsibly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default N1CMReview;
