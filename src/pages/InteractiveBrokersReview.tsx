import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";

const InteractiveBrokersReview = () => {
  const overallRating = 3.7;
  const broker = brokers.interactivebrokers;
  const ratingCount = 10500; // Total ratings (Google Search Console requirement)
  const reviewCount = 5200; // Total reviews (Google Search Console requirement)

  const ratings = [
    { label: "Trading Conditions", score: 3.8 },
    { label: "Platform & Tools", score: 4.2 },
    { label: "Customer Support", score: 3.5 },
    { label: "Deposit & Withdrawal", score: 3.6 },
    { label: "Educational Resources", score: 3.4 },
  ];

  const accountTypes = [
    {
      name: "Individual Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.5 pips",
      commission: "Variable",
      features: ["TWS Platform", "Multi-asset trading", "CFTC Regulated", "US Clients"],
      popular: true,
    },
    {
      name: "IRA Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.5 pips",
      commission: "Variable",
      features: ["Retirement accounts", "Tax advantages", "CFTC Regulated", "US Clients"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "Forex, Stocks, Options, Futures, Bonds, Crypto" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:50 (CFTC limit)" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Direct Market Access" },
    { label: "Margin Call", value: "100%" },
    { label: "Stop Out Level", value: "50%" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "FIFO required" },
    { label: "Trading Hours", value: "24/5" },
    { label: "Negative Balance Protection", value: "Yes" },
  ];

  const paymentMethods = [
    { name: "Bank Wire", deposit: "Free", withdrawal: "Free", time: "1-2 business days" },
    { name: "ACH Transfer", deposit: "Free", withdrawal: "Free", time: "1-2 business days" },
    { name: "Check", deposit: "N/A", withdrawal: "Free", time: "5-7 business days" },
  ];

  const pros = [
    "CFTC and SEC regulated - maximum protection",
    "No minimum deposit requirement",
    "Multi-asset trading platform",
    "Advanced TWS platform",
    "Low forex spreads",
    "Direct market access",
    "Strong reputation since 1978",
    "Negative balance protection",
    "Segregated client accounts",
    "IRA account options",
  ];

  const cons = [
    "Complex platform - steep learning curve",
    "Limited leverage (1:50 CFTC limit)",
    "Commission structure can be confusing",
    "Not ideal for forex-only traders",
    "Customer support response times vary",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Interactive Brokers Review 2026"
        description="Complete Interactive Brokers review for US traders. CFTC-regulated broker with $0 minimum deposit, 1:50 leverage, and professional trading platform. Ideal for serious traders."
        canonical="/review/interactive-brokers"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Interactive Brokers",
            "url": brokers.interactivebrokers.siteUrl,
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
                  <span className="text-sm text-primary font-medium">Multi-Asset Platform</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      Interactive Brokers Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Professional Trading Platform for US Traders</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(2,891 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Interactive Brokers (IB) is a leading US-regulated broker founded in 1978, offering advanced trading platforms and multi-asset access. While primarily known for stocks and options, IB also provides forex trading with competitive spreads and professional-grade tools.
                </p>

                <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-success">CFTC & SEC Regulated</p>
                      <p className="text-sm text-muted-foreground">
                        Full regulatory protection with industry-leading security measures.
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
                      <span className="font-semibold text-foreground">1978</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Connecticut, USA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">CFTC, SEC</span>
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
              <p className="text-primary-foreground font-semibold">Multi-Asset</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">0.5 Pips Spread</p>
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

      {/* Community Feedback */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Community Feedback
              </h2>
              <p className="text-muted-foreground">
                What real traders are saying about Interactive Brokers on Trustpilot and forums
              </p>
            </div>

            {/* Trustpilot Summary */}
            <Card className="bg-gradient-card border-border mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#00b67a] rounded-xl flex items-center justify-center">
                      <Star className="w-10 h-10 text-white fill-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-foreground">3.2</span>
                        <span className="text-muted-foreground">/ 5</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Based on 5,069 reviews</p>
                      <p className="text-xs text-[#00b67a] font-medium">Trustpilot</p>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-sm text-muted-foreground mb-2">Professional traders' choice</p>
                    <div className="flex gap-1 justify-center md:justify-end">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-muted" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Feedback Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border border-l-4 border-l-success">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <ThumbsUp className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">What Traders Love</h4>
                      <p className="text-xs text-muted-foreground">Common positive themes from Trustpilot & Reddit</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"Lowest margin rates in the industry for larger accounts"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"Access to 150+ global markets from one account"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"TWS platform is extremely powerful once you learn it"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"Excellent for algorithmic and API trading"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border border-l-4 border-l-warning">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Common Concerns</h4>
                      <p className="text-xs text-muted-foreground">Feedback to consider from reviews</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"TWS has a steep learning curve for beginners"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"Customer support can be slow during peak hours"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"Interface feels dated compared to newer platforms"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"Account verification process can be lengthy"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Source: Trustpilot reviews as of February 2026. Ratings reflect global user feedback.
              </p>
              <a
                href="https://www.trustpilot.com/review/interactivebrokers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm inline-flex items-center gap-1"
              >
                View all reviews on Trustpilot
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with Interactive Brokers?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Open a professional multi-asset trading account
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                  Open Account
                  <ExternalLink className="w-5 h-5" />
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
            <ReviewForm brokerName="Interactive Brokers" brokerId="interactivebrokers" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InteractiveBrokersReview;
