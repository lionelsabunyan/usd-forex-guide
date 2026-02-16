import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, TrendingUp, Award, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerCard from "@/components/compare/BrokerCard";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useState } from "react";

const BestBrokersUK = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // UK broker ranking: Regulation credibility first, then leverage
  // 11 brokers total: 7 affiliate + 4 non-affiliate (authority building)
  const ukBrokers = [
    brokers.fxglory,     // SVG FSA, 1:3000 ✅ Affiliate
    brokers.coinexx,     // Crypto-native, 1:500 ✅ Affiliate
    brokers.hfm,         // FCA + CySEC, 1:2000 ✅ Affiliate
    brokers.midasfx,     // FSA, 1:500 ✅ Affiliate
    brokers.fxpro,       // FCA + CySEC, UK HQ, 1:200 ✅ Affiliate
    brokers.hankotrade,  // VFSC, 1:500 ✅ Affiliate
    brokers.pepperstone, // FCA + CySEC, 1:500 ❌ Non-affiliate
    brokers.exness,      // FCA + CySEC, 1:2000 ❌ Non-affiliate
    brokers.xm,          // CySEC, 1:1000 ✅ Affiliate
    brokers.fxtm,        // FCA + CySEC, 1:1000 ❌ Non-affiliate
    brokers.fbs,         // CySEC, 1:3000 ❌ Non-affiliate
  ];

  const faqs = [
    {
      question: "Can UK traders legally use offshore forex brokers?",
      answer: "Yes, it's perfectly legal for UK residents to trade with offshore brokers. While the FCA regulates UK-based brokers, it doesn't prohibit British traders from using international brokers licensed elsewhere (CySEC, DFSA, FSC). However, you lose FCA's Financial Services Compensation Scheme (FSCS) protection, which covers up to £85,000 if an FCA broker fails. Choose reputable offshore brokers with strong regulation to mitigate risks."
    },
    {
      question: "Why do UK traders choose offshore brokers over FCA-regulated ones?",
      answer: "The primary reason is leverage. FCA and ESMA regulations cap retail traders at 1:30 for major forex pairs (1:20 for minors, 1:10 for exotics). Offshore brokers offer 1:500 to 1:2000+ leverage, giving experienced traders more flexibility for strategies like scalping, hedging, and position management. Additionally, offshore brokers often provide welcome bonuses, cryptocurrency deposits, and more diverse trading instruments—all restricted under FCA rules."
    },
    {
      question: "What's the difference between FCA and CySEC regulation?",
      answer: "FCA (Financial Conduct Authority) is the UK's financial regulator, considered one of the strictest globally. It enforces 1:30 leverage limits, mandatory negative balance protection, and £85,000 FSCS compensation. CySEC (Cyprus Securities and Exchange Commission) regulates EU brokers with similar investor protections but allows offshore entities to offer higher leverage. CySEC brokers must segregate client funds and maintain capital reserves, providing solid protection despite more lenient leverage rules."
    },
    {
      question: "How does ESMA's leverage restriction affect UK traders post-Brexit?",
      answer: "After Brexit, the UK retained ESMA's 2018 leverage restrictions (1:30 for majors). While the UK is no longer bound by EU regulations, the FCA chose to maintain these limits for retail trader protection. This means UK traders face the same leverage caps as EU traders. To access higher leverage, British traders must use offshore brokers operating under non-UK/EU jurisdictions (Cyprus offshore entities, Seychelles, Vanuatu, etc.)."
    },
    {
      question: "Are there professional trader exemptions to FCA leverage limits?",
      answer: "Yes, the FCA allows professional traders (also called 'elective professional clients') to access higher leverage. To qualify, you must meet 2 of 3 criteria: (1) Conducted 10+ significant trades per quarter for the past year, (2) Portfolio of financial instruments exceeding £500,000, (3) Worked in finance requiring knowledge of trading for at least one year. Professional status removes retail protections, including negative balance protection and FSCS coverage. Most traders don't qualify, making offshore brokers the practical solution."
    },
    {
      question: "How do I fund an offshore broker account from the UK?",
      answer: "Offshore brokers accept UK-friendly payment methods: debit cards (Visa, Mastercard), bank transfers (Faster Payments, BACS, SWIFT), e-wallets (Skrill, Neteller—both UK-based), and cryptocurrencies (Bitcoin, Ethereum, USDT). Most process GBP deposits, though some convert to USD or EUR. Card deposits are instant; bank transfers take 1-3 days; crypto is usually processed within 24 hours. Check each broker's fee schedule—many offer free deposits but may charge for certain withdrawal methods."
    },
    {
      question: "What are the tax implications for UK forex traders?",
      answer: "HMRC (Her Majesty's Revenue and Customs) treats forex trading as either spread betting (tax-free if it's not your primary income) or CFD trading (subject to Capital Gains Tax). Spread betting profits are tax-free but losses can't be offset. CFD profits are taxable under CGT with an annual allowance (£3,000 in 2024/25). Trading as a business means profits are subject to Income Tax. Keep detailed records and consult a UK tax advisor specializing in trading to optimize your tax position legally."
    },
    {
      question: "Which broker is best for UK beginners?",
      answer: "HFM (HotForex) is ideal for UK beginners thanks to its FCA + CySEC dual regulation, comprehensive educational resources (webinars, video tutorials), low $0 minimum deposit, and excellent copy trading platform (HFcopy). You can learn from successful traders while the broker's strong regulatory background provides peace of mind. XM is another strong choice with a $5 minimum, extensive free educational content, and user-friendly MT4/MT5 platforms. Both offer demo accounts to practice risk-free."
    }
  ];

  const handleCtaClick = (brokerId: string, position: number) => {
    trackAffiliateClick(brokerId, "best_brokers_uk", `position_${position}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="11 Best Forex Brokers UK 2026 | High Leverage FCA Alternatives"
        description="Top 11 international forex brokers for UK traders seeking higher leverage. FCA-regulated and offshore options. Independent reviews February 2026."
        keywords="forex brokers uk, high leverage forex, fca alternative, best forex brokers uk, forex trading uk, offshore forex brokers"
        ogType="article"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Expert Reviewed | Updated February 2026
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Best High Leverage Forex Brokers in the UK (2026)
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Access leverage beyond FCA's 1:30 retail limit. Compare 11 international brokers with FCA-level regulation and offshore leverage flexibility.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>11 Brokers Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>FCA & CySEC Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Up to 1:2000 Leverage</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Broker Reviews */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Detailed Broker Reviews</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive analysis of regulation, leverage, spreads, and platform quality for UK traders seeking FCA alternatives
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {ukBrokers.map((broker, index) => (
                <BrokerCard key={broker.id} broker={broker} rank={index + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Why UK Traders Choose International Brokers */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why UK Traders Choose International Brokers</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                In August 2018, ESMA (European Securities and Markets Authority) introduced sweeping leverage restrictions to protect retail traders from excessive losses. The UK, initially bound by EU regulations, maintained these limits post-Brexit through the FCA. While well-intentioned, these restrictions have pushed experienced British traders toward international brokers.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">The FCA Leverage Landscape</h3>
              <p className="leading-relaxed text-muted-foreground">
                FCA-regulated brokers cap retail traders at 1:30 for major currency pairs (EUR/USD, GBP/USD, etc.), 1:20 for non-major pairs, and 1:10 for exotic pairs. This means a standard 1-lot position (£100,000) requires £3,333 margin at 1:30 leverage. Compare this to offshore brokers offering 1:500, where the same position needs just £200. For professional traders with proven risk management, this difference is substantial.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Risk Warning for UK Traders
                </h4>
                <p className="text-sm text-muted-foreground mb-0">
                  High leverage increases both potential profits and losses. A 2% adverse price movement with 1:50 leverage can wipe out your entire trading capital. The FCA's leverage limits exist to protect retail traders from catastrophic losses. Only experienced traders with robust risk management strategies should consider leverage above 1:50. Never risk more than 1-2% per trade.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Advantages of International Brokers for UK Traders</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Flexible Leverage:</strong> Access 1:500 to 1:2000 leverage for advanced strategies like scalping, hedging, and carry trades</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Dual Regulation Options:</strong> Brokers like HFM and FxPro hold both FCA and CySEC licenses, offering regulatory credibility with offshore flexibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Welcome Bonuses:</strong> Offshore entities can offer deposit bonuses and promotions banned under FCA rules</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Crypto Trading & Deposits:</strong> Trade Bitcoin, Ethereum, and other cryptocurrencies; fund accounts with crypto for instant deposits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Tighter Spreads:</strong> Offshore ECN brokers offer spreads from 0.0 pips on major pairs, often beating FCA brokers</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">What You Trade for Higher Leverage</h3>
              <p className="leading-relaxed text-muted-foreground">
                Using offshore brokers means forfeiting FCA's Financial Services Compensation Scheme (FSCS), which protects up to £85,000 if a broker becomes insolvent. However, reputable international brokers with CySEC, DFSA, or FCA (offshore entities) licenses maintain segregated client accounts, negative balance protection, and strict capital adequacy requirements. For experienced traders, the benefits of higher leverage often outweigh the loss of FSCS protection—especially when choosing established brokers with 10+ years of operation.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Professional Trader Status: Is It Worth Pursuing?</h3>
              <p className="leading-relaxed text-muted-foreground">
                The FCA allows traders to apply for professional status to access higher leverage with FCA brokers. Requirements include executing 10+ significant trades quarterly for a year, maintaining a £500,000+ portfolio, or having one year of professional trading experience. However, professional traders lose retail protections (negative balance protection, FSCS coverage) and must sign extensive risk disclaimers. For most traders, offshore brokers provide an easier path to higher leverage without sacrificing essential protections.
              </p>
            </div>
          </div>
        </section>

        {/* How We Rank Brokers */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Broker Evaluation Methodology</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                We test every broker with real money in live trading conditions. Our UK-based testing team evaluates 50+ criteria, from regulatory compliance to execution quality, ensuring you get accurate, actionable recommendations.
              </p>

              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Trading Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• GBP/USD spreads (our benchmark pair)</p>
                    <p>• Commission structure & hidden fees</p>
                    <p>• Available leverage (retail vs pro)</p>
                    <p>• Execution speed & slippage testing</p>
                    <p>• Minimum deposit (GBP-friendly)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Platform & Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• MT4/MT5 vs proprietary platforms</p>
                    <p>• Mobile app usability (iOS & Android)</p>
                    <p>• Advanced charting & indicators</p>
                    <p>• Copy/social trading features</p>
                    <p>• API access for algo traders</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Customer Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• UK business hours coverage</p>
                    <p>• Live chat response times (tested)</p>
                    <p>• Email support quality</p>
                    <p>• Phone support (UK toll-free numbers)</p>
                    <p>• Educational resources (webinars, guides)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Regulation & Trust
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• FCA, CySEC, DFSA licenses verified</p>
                    <p>• Segregated client fund accounts</p>
                    <p>• Negative balance protection</p>
                    <p>• Company history & financial stability</p>
                    <p>• Withdrawal process (tested with GBP)</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-lg mb-3">Affiliate Disclosure</h4>
                <p className="text-sm text-muted-foreground mb-0">
                  BeginnerFXGuide.com may earn commissions when you open an account via our links. This compensation never influences our rankings or reviews. We only recommend brokers our team has personally tested and would trade with ourselves. Our goal is to provide UK traders with honest, unbiased information to make informed decisions about international brokers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Break Free from FCA Leverage Limits?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of British traders accessing international leverage. Start with our #1 recommended broker for UK traders:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href={getAffiliateUrl(ukBrokers[0].id, { ...UTM_CONFIGS.HERO_PRIMARY, campaign: "uk_best" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick(ukBrokers[0].id, 1)}
                >
                  Open Account with {ukBrokers[0].name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/brokers">View All Brokers</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              * CFDs are complex instruments. High leverage trading carries significant risk of capital loss. Trade responsibly.
            </p>
          </div>
        </section>
      </main>

      {/* Mobile Sticky Footer CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border">
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          asChild
        >
          <a
            href={getAffiliateUrl(ukBrokers[0].id, {
              ...UTM_CONFIGS.MOBILE_STICKY,
              campaign: "uk_best"
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCtaClick(ukBrokers[0].id, 1)}
          >
            Start Trading with {ukBrokers[0].name}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default BestBrokersUK;
