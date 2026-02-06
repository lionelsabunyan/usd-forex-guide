import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Building2, GraduationCap, ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";

const CharlesSchwabReview = () => {
  const overallRating = 4.4;

  const ratings = [
    { label: "Trading Conditions", score: 4.3 },
    { label: "Platform & Tools", score: 4.9 },
    { label: "Customer Support", score: 4.5 },
    { label: "Deposit & Withdrawal", score: 4.6 },
    { label: "Educational Resources", score: 4.7 },
  ];

  const accountTypes = [
    {
      name: "Standard Brokerage",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "Variable",
      commission: "Spread-based",
      features: ["thinkorswim access", "Stocks, ETFs & Forex", "Basic research tools", "Mobile trading"],
    },
    {
      name: "Schwab One Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "Variable",
      commission: "Spread-based",
      features: ["Integrated banking", "Schwab Bank Visa", "ATM fee rebates", "Checkwriting", "Bill pay"],
      popular: true,
    },
    {
      name: "Active Trader Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "Competitive",
      commission: "Spread-based",
      features: ["thinkorswim Pro", "Advanced charting", "Custom indicators", "Priority support", "Paper trading"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "70+ Forex pairs, Stocks, ETFs, Options, Futures" },
    { label: "Minimum Lot Size", value: "10,000 units (mini lot)" },
    { label: "Maximum Leverage", value: "1:50 (US legal limit)" },
    { label: "Spread Type", value: "Variable" },
    { label: "Execution Type", value: "Market Execution" },
    { label: "Trading Platform", value: "thinkorswim (Desktop, Web, Mobile)" },
    { label: "Paper Trading", value: "Available (paperMoney)" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Limited (FIFO rule)" },
    { label: "Expert Advisors", value: "thinkScript scripting" },
    { label: "Trading Hours", value: "24/5 Forex, Extended hours for stocks" },
    { label: "Regulation", value: "CFTC, NFA, SEC, FINRA" },
  ];

  const paymentMethods = [
    { name: "ACH Transfer", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
    { name: "Bank Wire", deposit: "Free (incoming)", withdrawal: "$25", time: "Same day / 1-2 days" },
    { name: "Check Deposit", deposit: "Free", withdrawal: "Free", time: "5-7 business days" },
    { name: "Internal Transfer", deposit: "Free", withdrawal: "Free", time: "Instant" },
  ];

  const pros = [
    "Most trusted brokerage brand in the United States",
    "thinkorswim platform - industry-leading trading tools",
    "No minimum deposit requirement",
    "Excellent research and educational resources",
    "Full regulatory protection (CFTC/NFA, SEC, FINRA)",
    "24/7 customer support with US-based representatives",
    "Paper trading available for practice",
    "36.5 million clients worldwide",
    "Integrated banking and brokerage services",
    "#1 Overall Broker award from StockBrokers.com (2026)",
  ];

  const cons = [
    "Limited to 1:50 leverage (US regulatory limit)",
    "No cryptocurrency trading available",
    "Spreads higher than some discount/offshore brokers",
    "Complex platform can be overwhelming for beginners",
    "FIFO rule limits hedging strategies",
  ];

  const schwabSiteUrl = "https://www.schwab.com";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Charles Schwab Forex Review 2026 | thinkorswim Trading Platform"
        description="Complete Charles Schwab forex review for US traders. Explore thinkorswim platform features, trading conditions, and why Schwab earned #1 Overall Broker 2026. CFTC/NFA regulated with 36.5M clients."
        canonical="/review/charles-schwab"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Charles Schwab",
            "url": schwabSiteUrl,
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
                  <span className="text-sm text-primary font-medium">#1 Overall Broker 2026</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.charlesschwab} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      Charles Schwab Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Forex Trading with thinkorswim Platform</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : i < overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(36.5M clients)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Charles Schwab is America's most trusted brokerage, now offering forex trading through the powerful thinkorswim platform acquired from TD Ameritrade. With full CFTC/NFA regulation, $0 minimum deposit, and award-winning research tools, Schwab is the gold standard for US forex traders seeking security and advanced trading capabilities.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href={schwabSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href={schwabSiteUrl} target="_blank" rel="noopener noreferrer">
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
                      <span className="font-semibold text-foreground">1971 (Forex: 2009)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">San Francisco, USA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-success">CFTC/NFA, SEC, FINRA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-foreground">1:50</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">Regulated & Accepted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulation Badge Section */}
      <section className="py-8 bg-success/10 border-y border-success/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-success" />
                <span className="font-semibold text-foreground">CFTC Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-success" />
                <span className="font-semibold text-foreground">NFA Member</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-success" />
                <span className="font-semibold text-foreground">SEC Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-success" />
                <span className="font-semibold text-foreground">FINRA Member</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-success" />
                <span className="font-semibold text-foreground">SIPC Protected</span>
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

      {/* thinkorswim Platform Highlight */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                thinkorswim: Industry-Leading Trading Platform
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Originally developed by TD Ameritrade, thinkorswim is widely regarded as the most powerful trading platform available to retail traders
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Advanced Charting</h3>
                  <p className="text-sm text-muted-foreground">
                    400+ technical indicators, custom studies with thinkScript, multi-timeframe analysis, and drawing tools
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6 text-center">
                  <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">paperMoney</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice trading with $100,000 in virtual money. Test strategies risk-free before going live
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6 text-center">
                  <GraduationCap className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Education Hub</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive learning center with webinars, courses, articles, and in-platform coaching
                  </p>
                </CardContent>
              </Card>
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Account Types
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Charles Schwab offers flexible account options with no minimum deposit requirements
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
                    <Button
                      variant={account.popular ? "hero" : "outlineGold"}
                      className="w-full mt-4"
                      asChild
                    >
                      <a
                        href={schwabSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Trading Conditions
              </h2>
              <p className="text-muted-foreground">
                Comprehensive overview of Charles Schwab forex trading specifications
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
                Deposit & Withdrawal Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Charles Schwab offers secure, traditional banking methods for funding your account
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

      {/* TD Ameritrade Acquisition Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Building2 className="w-12 h-12 text-primary shrink-0" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      TD Ameritrade Integration (2023)
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      In 2023, Charles Schwab completed its $26 billion acquisition of TD Ameritrade, creating the largest brokerage in the United States. This merger brought the beloved thinkorswim platform under the Schwab umbrella, combining TD Ameritrade's advanced trading technology with Schwab's comprehensive banking and investment services.
                    </p>
                    <p className="text-muted-foreground">
                      Former TD Ameritrade clients have been migrated to Schwab accounts while retaining full access to the thinkorswim platform. This integration means traders get the best of both worlds: Schwab's institutional strength and regulatory excellence with thinkorswim's unmatched trading capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                What real traders are saying about Charles Schwab's thinkorswim on Trustpilot and forums
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
                        <span className="text-3xl font-bold text-foreground">1.5</span>
                        <span className="text-muted-foreground">/ 5</span>
                      </div>
                      <p className="text-sm text-muted-foreground">thinkorswim Trustpilot score</p>
                      <p className="text-xs text-[#00b67a] font-medium">Trustpilot</p>
                    </div>
                  </div>
                  <div className="text-center md:text-right bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Industry Recognition</p>
                    <p className="text-xs text-muted-foreground">Despite mixed Trustpilot reviews, thinkorswim consistently wins</p>
                    <p className="text-primary font-semibold">"Best Platform for Advanced Traders" awards</p>
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
                      <p className="text-xs text-muted-foreground">Common positive themes from Reddit & forums</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"thinkorswim charting and technical analysis tools are industry-leading"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"Paper trading feature is excellent for strategy testing"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"$0 minimum deposit and no account maintenance fees"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>"America's most trusted brokerage brand with 50+ years"</span>
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
                      <span>"Wider spreads compared to dedicated forex brokers"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"thinkorswim platform has a steep learning curve"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"Mobile app occasionally experiences sync issues"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span>"Forex is secondary focus - better for multi-asset traders"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Source: Trustpilot, Reddit r/thinkorswim, and trading forums as of February 2026.
              </p>
              <a
                href="https://www.trustpilot.com/review/thinkorswim.com"
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

      {/* Review Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="Charles Schwab" brokerId="charlesschwab" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Trade with America's Most Trusted Broker?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Open your Charles Schwab account today and experience the power of thinkorswim. $0 minimum deposit, full regulatory protection, and industry-leading tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={schwabSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
              Risk Warning: Forex trading involves significant risk of loss and is not suitable for all investors. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CharlesSchwabReview;
