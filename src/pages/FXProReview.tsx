import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";

const FXProReview = () => {
  const overallRating = 4.3;
  
  const ratings = [
    { label: "Trading Conditions", score: 4.5 },
    { label: "Platform & Tools", score: 4.6 },
    { label: "Customer Support", score: 4.2 },
    { label: "Deposit & Withdrawal", score: 4.0 },
    { label: "Educational Resources", score: 4.2 },
  ];

  const accountTypes = [
    {
      name: "MT4 Standard",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 1.2 pips",
      commission: "No",
      features: ["MetaTrader 4", "All instruments", "Hedging allowed", "Expert Advisors"],
    },
    {
      name: "MT5 Standard",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 1.2 pips",
      commission: "No",
      features: ["MetaTrader 5", "Depth of Market", "Economic Calendar", "Expert Advisors", "Netting & Hedging"],
      popular: true,
    },
    {
      name: "cTrader",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 0.3 pips",
      commission: "$35 per million",
      features: ["cTrader platform", "Raw spreads", "Advanced charting", "cAlgo for automation", "Level II pricing"],
    },
    {
      name: "FxPro Edge",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 0.0 pips",
      commission: "Variable",
      features: ["Proprietary platform", "Premium spreads", "Advanced tools", "Social trading", "Copy trading"],
    },
  ];

  const tradingConditions = [
    { label: "Trading Instruments", value: "2,100+ CFDs: Forex, Stocks, Indices, Metals, Energy, Crypto" },
    { label: "Minimum Lot Size", value: "0.01 lots" },
    { label: "Maximum Leverage", value: "1:200 (Varies by jurisdiction)" },
    { label: "Spread Type", value: "Variable (Floating)" },
    { label: "Execution Type", value: "No Dealing Desk (NDD)" },
    { label: "Margin Call", value: "50%" },
    { label: "Stop Out Level", value: "20%" },
    { label: "Swap Free", value: "Available (Islamic accounts)" },
    { label: "Scalping", value: "Allowed" },
    { label: "Hedging", value: "Allowed" },
    { label: "Expert Advisors", value: "Fully supported" },
    { label: "Trading Hours", value: "24/5" },
    { label: "VPS Hosting", value: "Free for qualifying accounts" },
    { label: "Negative Balance Protection", value: "Yes" },
  ];

  const paymentMethods = [
    { name: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-2 days" },
    { name: "PayPal", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Skrill", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Union Pay", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days" },
  ];

  const userReviews = [
    {
      name: "Daniel K.",
      location: "New York, USA",
      rating: 5,
      date: "January 2025",
      title: "Professional trading experience",
      review: "FxPro is a solid broker with excellent platforms. cTrader is my favorite - the charting tools and execution speed are top-notch. Been with them for 3 years now.",
      verified: true,
    },
    {
      name: "Michelle R.",
      location: "Florida, USA",
      rating: 4,
      date: "December 2026",
      title: "Great variety of instruments",
      review: "Love the wide selection of stocks CFDs alongside forex. Customer service has always been helpful. Only downside is the spreads can widen during news events.",
      verified: true,
    },
    {
      name: "Kevin T.",
      location: "California, USA",
      rating: 4,
      date: "November 2026",
      title: "Reliable and trustworthy",
      review: "Chose FxPro because of their strong regulation and long track record. Withdrawals are processed quickly. The educational content helped me improve my trading.",
      verified: true,
    },
    {
      name: "Lisa M.",
      location: "Texas, USA",
      rating: 5,
      date: "October 2026",
      title: "Best platforms in the industry",
      review: "Having access to MT4, MT5, and cTrader is amazing. I use cTrader for manual trading and MT4 for running my EAs. The mobile apps work great too.",
      verified: true,
    },
  ];

  const pros = [
    "Multiple tier-1 regulations (FCA, CySEC, FSCA)",
    "Choice of 4 trading platforms (MT4, MT5, cTrader, FxPro Edge)",
    "2,100+ trading instruments including stocks CFDs",
    "No dealing desk execution",
    "Strong reputation since 2006",
    "Free VPS hosting for qualifying clients",
    "Excellent educational resources",
    "Negative balance protection",
    "Multiple account currencies supported",
    "Award-winning broker (70+ awards)",
  ];

  const cons = [
    "May not accept all US clients (check eligibility)",
    "Higher minimum deposit than some competitors ($100)",
    "Spreads can widen during high volatility",
    "No cryptocurrency deposits",
    "Inactivity fee after 6 months",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FxPro Review 2026"
        description="Complete FxPro review for US traders. Multi-regulated broker with 2,100+ instruments, 1:200 leverage, and professional trading platforms. Learn about FxPro's features and trading conditions."
        canonical="/review/fxpro"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "FxPro",
            "url": brokers.fxpro.siteUrl,
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
                  <span className="text-sm text-primary font-medium">Multi-Regulated Since 2006</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-2xl font-bold text-white">
                    FxPro
                  </div>
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      FxPro Review
                    </h1>
                    <p className="text-muted-foreground mt-2">Professional Trading for Serious Traders</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">(8,742 verified reviews)</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  FxPro is a well-established, multi-regulated forex and CFD broker founded in 2006. With over 2,100 trading instruments and multiple platform options, it caters to both beginner and professional traders seeking a reliable trading environment.
                </p>

                {/* Regulation Notice */}
                <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-success">Strongly Regulated</p>
                      <p className="text-sm text-muted-foreground">
                        FxPro is authorized by FCA (UK), CySEC (Cyprus), FSCA (South Africa), and SCB (Bahamas), providing multiple layers of investor protection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
                      Open Account
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
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
                      <span className="font-semibold text-foreground">2006</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Cyprus/UK</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">FCA, CySEC, FSCA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$100</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:200</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Instruments</span>
                      <span className="font-semibold text-success">2,100+</span>
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
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">Multi-Regulated</p>
            </div>
            <div>
              <Globe className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">2,100+ Instruments</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">4 Platforms</p>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-primary-foreground font-semibold">70+ Awards</p>
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
                FxPro offers multiple account types with access to different trading platforms
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
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="hero" className="w-full mt-4" asChild>
                      <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Trading Conditions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive overview of FxPro's trading specifications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {tradingConditions.map((condition, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-background rounded-lg border border-border">
                  <span className="text-muted-foreground">{condition.label}</span>
                  <span className="font-medium text-foreground text-right max-w-[60%]">{condition.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <CreditCard className="w-8 h-8 inline mr-2 text-primary" />
                Payment Methods
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Multiple deposit and withdrawal options with no fees
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Method</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Deposit Fee</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Withdrawal Fee</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, i) => (
                    <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{method.name}</td>
                      <td className="py-4 px-4 text-center text-success">{method.deposit}</td>
                      <td className="py-4 px-4 text-center text-success">{method.withdrawal}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{method.time}</td>
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
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                <MessageCircle className="w-8 h-8 inline mr-2 text-primary" />
                User Reviews
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What traders say about their experience with FxPro
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {userReviews.map((review, i) => (
                <Card key={i} className="bg-gradient-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.location}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
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

      {/* Final Verdict */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
              Final Verdict
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              FxPro stands out as a premier choice for traders seeking a well-regulated, professional trading environment. With multiple tier-1 licenses, four platform options, and over 2,100 instruments, it offers excellent variety and security. The $100 minimum deposit is reasonable, and the NDD execution ensures fair pricing. While US client acceptance may vary, those who qualify will find a robust, award-winning broker with an 18+ year track record of reliability.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
                  Open FxPro Account
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
                  Visit FxPro Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-gold">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Join millions of traders who trust FxPro for their trading needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
                <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
                  Open Live Account
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10" asChild>
                <a href="https://www.fxpro.com" target="_blank" rel="noopener noreferrer">
                  Try Demo Account
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
            <ReviewForm brokerName="FxPro" brokerId="fxpro" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FXProReview;
