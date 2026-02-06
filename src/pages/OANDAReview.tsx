import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";

const OANDAReview = () => {
  const overallRating = 4.0;
  const broker = brokers.oanda;
  
  const ratings = [
    { label: "Trading Conditions", score: 4.1 },
    { label: "Platform & Tools", score: 4.2 },
    { label: "Customer Support", score: 3.9 },
    { label: "Deposit & Withdrawal", score: 4.0 },
    { label: "Educational Resources", score: 4.0 },
  ];

  const accountTypes = [
    {
      name: "Standard Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["OANDA Platform", "MT4", "All instruments", "CFTC Regulated", "US Clients"],
      popular: true,
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "70+ Forex pairs, Indices, Commodities, Bonds" },
    { label: "Minimum Lot Size", value: "1 unit (micro lots)" },
    { label: "Maximum Leverage", value: "1:50 (CFTC limit)" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Market Execution" },
    { label: "Margin Call", value: "100%" },
    { label: "Stop Out Level", value: "50%" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "FIFO required" },
    { label: "Expert Advisors", value: "Fully supported (MT4)" },
    { label: "Trading Hours", value: "24/5" },
    { label: "Negative Balance Protection", value: "Yes" },
  ];

  const paymentMethods = [
    { name: "Bank Wire", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
    { name: "ACH Transfer", deposit: "Free", withdrawal: "Free", time: "1-2 business days" },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days" },
    { name: "Check", deposit: "N/A", withdrawal: "Free", time: "5-7 business days" },
  ];

  const pros = [
    "CFTC and NFA regulated - maximum protection",
    "No minimum deposit requirement",
    "Strong reputation since 1996",
    "Excellent proprietary trading platform",
    "MT4 also available",
    "Fast withdrawal processing",
    "Negative balance protection",
    "Segregated client accounts",
    "Good customer support",
    "Comprehensive educational resources",
  ];

  const cons = [
    "Limited leverage (1:50 maximum due to CFTC)",
    "FIFO rule required (can't hedge easily)",
    "Higher spreads than some competitors",
    "No cryptocurrency deposit options",
    "No high leverage options",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="OANDA Review 2026"
        description="Complete OANDA review for US traders. CFTC-regulated broker with $0 minimum deposit, 1:50 leverage, and excellent trading platform. Perfect for beginners and experienced traders."
        canonical="/review/oanda"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "OANDA",
            "url": broker.siteUrl,
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
      
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">CFTC Regulated</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      OANDA Review
                    </h1>
                    <p className="text-muted-foreground mt-2">CFTC-Regulated Broker for US Traders</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(4,128 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  OANDA is a well-established, CFTC-regulated forex broker founded in 1996. Known for its innovative trading platform and $0 minimum deposit, OANDA offers a safe and accessible trading environment for American traders, though with CFTC-mandated leverage limits.
                </p>

                <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-success">CFTC & NFA Regulated</p>
                      <p className="text-sm text-muted-foreground">
                        Full regulatory protection with segregated accounts and negative balance protection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
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
                      <span className="font-semibold text-foreground">1996</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">New York, USA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">CFTC, NFA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:50</span>
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
              <p className="text-primary-foreground font-semibold">CFTC Regulated</p>
            </div>
            <div>
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">$0 Min Deposit</p>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">1:50 Leverage</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">1.0 Pips Spread</p>
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
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OANDA offers a single account type for US traders
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Standard Account
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

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Trading Conditions
              </h2>
              <p className="text-muted-foreground">
                Comprehensive overview of OANDA's trading specifications
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

      {/* Community Feedback Section - Real Reviews from Reddit & Trustpilot */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <Users className="w-8 h-8 inline-block mr-2 text-primary" />
                What the Trading Community Says
              </h2>
              <p className="text-muted-foreground">
                Real feedback from traders on Reddit, Trustpilot, and trading forums
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Trustpilot Positive */}
              <Card className="bg-white border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Trustpilot</span>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-3">
                    "I have been using OANDA since 2008 both intermittently and for long periods of trading. I find them to be the most professional, stable and trustworthy. They are a leader in Forex for a reason."
                  </p>
                  <p className="text-xs text-muted-foreground">— Verified Trustpilot Review, 2025</p>
                </CardContent>
              </Card>

              {/* Trustpilot Mixed */}
              <Card className="bg-white border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Trustpilot</span>
                    <div className="flex">
                      {[...Array(4)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-3 h-3 text-gray-300" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-3">
                    "Very satisfied with the onboarding process. Customer service very easy to contact compared to other US brokers. The Oanda app is easy to use with charting tools similar to TradingView. Highly recommended for beginners."
                  </p>
                  <p className="text-xs text-muted-foreground">— Verified Review from Denmark, December 2025</p>
                </CardContent>
              </Card>

              {/* ForexBrokers.com */}
              <Card className="bg-white border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">ForexBrokers.com</span>
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-3">
                    "OANDA is widely regarded as one of the most secure and trustworthy brokers in the trading industry. It boasts a 98 out of 100 Trust Score and complies fully with three tier-1 regulators."
                  </p>
                  <p className="text-xs text-muted-foreground">— ForexBrokers.com Expert Review, 2026</p>
                </CardContent>
              </Card>

              {/* Critical Review */}
              <Card className="bg-white border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Critical Feedback</span>
                    <div className="flex">
                      {[...Array(3)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(2)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-3">
                    "OANDA's forex trading costs are generally steep, with high effective spreads across both its default and core pricing compared to the best brokers. Paying almost $150 week in finance charges."
                  </p>
                  <p className="text-xs text-muted-foreground">— Aggregated from Trustpilot & ForexBrokers.com, 2025</p>
                </CardContent>
              </Card>
            </div>

            {/* Trustpilot Summary */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">4.1/5</p>
                    <p className="text-sm text-muted-foreground">Trustpilot Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">1,185+</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success">62%</p>
                    <p className="text-sm text-muted-foreground">5-Star Ratings</p>
                  </div>
                </div>
                <a
                  href="https://www.trustpilot.com/review/www.oanda.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Read all reviews on Trustpilot
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="OANDA" brokerId="oanda" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with OANDA?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Open a CFTC-regulated account with no minimum deposit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                  Open Account
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <Link to="/brokers">
                  Compare Brokers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OANDAReview;
