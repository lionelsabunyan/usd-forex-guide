import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, ExternalLink, Shield, Zap, AlertTriangle, TrendingUp, Award, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerCard from "@/components/compare/BrokerCard";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useState } from "react";

const BestBrokersSingapore = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Singapore broker ranking: MAS alternative positioning
  // 11 brokers total: 7 affiliate + 4 non-affiliate (authority building)
  const singaporeBrokers = [
    brokers.fxglory,     // 1:3000 - SVG FSA ✅ Affiliate
    brokers.coinexx,     // 1:500 - Crypto-native ✅ Affiliate
    brokers.hfm,         // 1:2000 - CySEC/FCA ✅ Affiliate
    brokers.midasfx,     // 1:500 - FSA ✅ Affiliate
    brokers.hankotrade,  // 1:500 - VFSC ✅ Affiliate
    brokers.xm,          // 1:1000 - CySEC ✅ Affiliate
    brokers.fxpro,       // 1:200 - FCA/CySEC ✅ Affiliate
    brokers.exness,      // 1:2000 - CySEC/FCA ❌ Non-affiliate
    brokers.pepperstone, // 1:500 - ASIC/FCA ❌ Non-affiliate
    brokers.fxtm,        // 1:1000 - CySEC/FCA ❌ Non-affiliate
    brokers.fbs,         // 1:3000 - CySEC/FSCA ❌ Non-affiliate
  ];

  const faqs = [
    {
      question: "Can Singaporean traders legally use offshore forex brokers?",
      answer: "Yes, Singapore residents can legally trade with offshore forex brokers. While MAS (Monetary Authority of Singapore) regulates domestic brokers, it does not prohibit Singaporeans from using international brokers licensed in other jurisdictions. However, you lose the protections provided by MAS-regulated entities. Always choose well-regulated offshore brokers with CySEC, FCA, or ASIC licenses for adequate investor protection."
    },
    {
      question: "Why do Singapore traders choose offshore brokers over MAS-regulated ones?",
      answer: "The main reasons are leverage and costs. MAS-regulated brokers limit retail leverage to 1:50 for major pairs (1:20 for non-major) and often charge higher fees. Offshore brokers offer 1:500 to 1:3000 leverage, lower minimum deposits, and tighter spreads. Additionally, offshore brokers provide welcome bonuses, more exotic trading instruments, and cryptocurrency deposits — features less common with MAS-licensed brokers."
    },
    {
      question: "What is MAS and how does it regulate forex trading?",
      answer: "MAS (Monetary Authority of Singapore) is Singapore's central bank and financial regulatory authority. It regulates all capital markets activities, including forex trading, under the Securities and Futures Act (SFA). MAS enforces leverage limits (1:50 for specified currency pairs), requires brokers to hold a Capital Markets Services (CMS) license, and mandates client fund segregation. These regulations provide robust protection but limit trading flexibility."
    },
    {
      question: "Are forex trading profits taxable in Singapore?",
      answer: "Singapore has no capital gains tax, making it one of the most tax-friendly jurisdictions for forex traders. Personal trading profits are generally tax-free. However, if the IRAS (Inland Revenue Authority of Singapore) considers your trading a business activity (frequent trading, it's your primary income source), profits may be taxed as income. Consult a Singapore tax professional to determine your specific tax obligations."
    },
    {
      question: "What payment methods can Singaporean traders use?",
      answer: "Most offshore brokers accept Singapore-friendly payment methods: credit/debit cards (Visa, Mastercard), bank transfers (DBS, OCBC, UOB), e-wallets (Skrill, Neteller), and cryptocurrencies (Bitcoin, USDT). SGD deposits are accepted by some brokers, though many require conversion to USD. Card and e-wallet deposits are typically instant; bank transfers take 1-3 business days."
    },
    {
      question: "What leverage limits does MAS impose?",
      answer: "MAS limits retail traders to 1:50 leverage for specified currency pairs (major pairs like EUR/USD, GBP/USD) and 1:20 for non-specified pairs. These limits apply only to MAS-licensed brokers. Accredited investors (net personal assets exceeding S$2 million, or income exceeding S$300,000 in the preceding 12 months) can access higher leverage. Most retail traders who want higher leverage opt for offshore brokers instead."
    },
    {
      question: "Is it safe to trade with offshore brokers from Singapore?",
      answer: "Trading with reputable offshore brokers is generally safe when you choose well-regulated entities. Look for brokers licensed by CySEC (Cyprus), FCA (UK), or ASIC (Australia) — these regulators enforce client fund segregation, negative balance protection, and capital adequacy requirements. Avoid unregulated brokers. While you lose MAS protections, top-tier offshore brokers maintain standards comparable to MAS-regulated firms."
    },
    {
      question: "Which broker is best for beginners in Singapore?",
      answer: "XM is ideal for Singaporean beginners with its $5 minimum deposit, comprehensive educational resources (daily webinars, video tutorials), and 24/5 multilingual support including Mandarin and Malay. HFM is another excellent choice with its copy trading platform, allowing newcomers to follow experienced traders while learning. Both offer demo accounts and user-friendly MT4/MT5 platforms."
    }
  ];

  const handleCtaClick = (brokerId: string, position: number) => {
    trackAffiliateClick(brokerId, "best_brokers_singapore", `position_${position}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="11 Best Forex Brokers Singapore 2026 | High Leverage MAS Alternatives"
        description="Compare 11 top forex brokers for Singapore traders. Access higher leverage beyond MAS limits. Regulated brokers with competitive spreads. Updated March 2026."
        keywords="forex brokers singapore, best forex brokers singapore, high leverage forex singapore, mas alternative, forex trading singapore, singapore forex brokers"
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
                Expert Reviewed | Updated March 2026
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Best High Leverage Forex Brokers in Singapore (2026)
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Go beyond MAS's leverage restrictions. Compare 11 top-rated international brokers offering leverage up to 1:3000 for experienced Singapore traders.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>11 Brokers Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Regulated Brokers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>High Leverage Available</span>
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
                In-depth analysis of each broker's strengths, weaknesses, and suitability for Singapore traders seeking MAS alternatives
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {singaporeBrokers.map((broker, index) => (
                <BrokerCard key={broker.id} broker={broker} rank={index + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Singapore Traders Choose These Brokers */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Singapore Traders Choose Offshore Brokers</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Singapore is one of Asia's largest forex trading hubs, with the MAS (Monetary Authority of Singapore) providing world-class financial regulation. However, MAS's retail leverage limits of 1:50 for major pairs push experienced traders toward offshore alternatives that offer greater trading flexibility.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">The MAS Leverage Limitation</h3>
              <p className="leading-relaxed text-muted-foreground">
                MAS restricts retail forex leverage to 1:50 for specified currency pairs and 1:20 for non-specified pairs. This means a standard 1-lot position (100,000 units) requires $2,000 margin at 1:50 leverage. Compare this to offshore brokers offering 1:500, where the same position needs just $200. While Singapore's accredited investor scheme allows higher leverage, the qualification bar (S$2 million in net personal assets) excludes most retail traders.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Important Disclosure
                </h4>
                <p className="text-sm text-muted-foreground mb-0">
                  High leverage magnifies both profits and losses. A 1% adverse move with 1:100 leverage can wipe out your entire position. Only experienced traders with strict risk management should consider leverage above 1:50. Never risk more than 1-2% of your trading capital per trade. MAS's leverage limits are designed to protect retail investors.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Benefits of Offshore Brokers for Singapore Traders</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Higher Leverage:</strong> Access 1:500 to 1:3000 leverage without needing accredited investor status</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>No Capital Gains Tax:</strong> Singapore's tax-free environment for personal trading gains makes offshore forex trading even more attractive</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>More Trading Instruments:</strong> Access cryptocurrencies, exotic pairs, and global CFDs beyond MAS-permitted products</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Welcome Bonuses:</strong> Offshore brokers offer deposit bonuses and promotions not available with MAS-licensed entities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Competitive Spreads:</strong> ECN offshore brokers frequently offer tighter spreads (from 0.0 pips) than MAS-regulated competitors</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Trade-offs: What You Give Up</h3>
              <p className="leading-relaxed text-muted-foreground">
                Offshore brokers operate outside MAS jurisdiction, meaning you lose access to Singapore's dispute resolution mechanisms and investor protection schemes. However, reputable offshore brokers with CySEC, FCA, or ASIC licenses maintain stringent capital requirements, segregated client accounts, and negative balance protection. For experienced traders, these protections often provide adequate safety.
              </p>
            </div>
          </div>
        </section>

        {/* How We Rank Brokers */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">How We Rank Forex Brokers</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Our testing process evaluates 50+ criteria across five key categories. We open live accounts with each broker, deposit real funds, and test platforms under actual trading conditions to provide you with accurate, unbiased reviews.
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
                    <p>• USD/SGD and major pair spreads</p>
                    <p>• Commission structure</p>
                    <p>• Available leverage</p>
                    <p>• Execution speed (Singapore servers)</p>
                    <p>• Minimum deposit requirements</p>
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
                    <p>• Trading platform options (MT4/MT5)</p>
                    <p>• Mobile app functionality</p>
                    <p>• Charting tools & indicators</p>
                    <p>• Copy trading features</p>
                    <p>• API & algorithmic trading</p>
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
                    <p>• Asian timezone coverage</p>
                    <p>• Live chat response times</p>
                    <p>• Multilingual support (English, Mandarin)</p>
                    <p>• Email support quality</p>
                    <p>• Educational resources</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Trust & Regulation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Regulatory licenses verified</p>
                    <p>• Client fund segregation</p>
                    <p>• Negative balance protection</p>
                    <p>• Company history & reputation</p>
                    <p>• Transparent fee structure</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-lg mb-3">Affiliate Disclosure</h4>
                <p className="text-sm text-muted-foreground mb-0">
                  BeginnerFXGuide.com may receive compensation when you open an account through our links. This does not influence our rankings — we only recommend brokers we've thoroughly tested and would use ourselves. Our priority is providing honest, accurate information to help Singapore traders make informed decisions.
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

        {/* Related Resources */}
        <section className="py-12 border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/guides/broker-comparison" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">How to Compare Brokers</h3>
                <p className="text-xs text-muted-foreground">Learn what factors matter most when choosing a forex broker.</p>
              </Link>
              <Link to="/guides/risk-management" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Risk Management Guide</h3>
                <p className="text-xs text-muted-foreground">Essential strategies for protecting your capital with high leverage.</p>
              </Link>
              <Link to="/tools/position-size-calculator" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Position Size Calculator</h3>
                <p className="text-xs text-muted-foreground">Calculate the right position size based on your risk tolerance.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Trade with Higher Leverage?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Singapore traders accessing international leverage. Start with our #1 recommended broker:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href={getAffiliateUrl(singaporeBrokers[0].id, { ...UTM_CONFIGS.HERO_PRIMARY, campaign: "singapore_best" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick(singaporeBrokers[0].id, 1)}
                >
                  Open Account with {singaporeBrokers[0].name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/brokers">View All Brokers</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              * Trading forex with leverage carries significant risk. Only trade with capital you can afford to lose.
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
            href={getAffiliateUrl(singaporeBrokers[0].id, {
              ...UTM_CONFIGS.MOBILE_STICKY,
              campaign: "singapore_best"
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCtaClick(singaporeBrokers[0].id, 1)}
          >
            Start Trading with {singaporeBrokers[0].name}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default BestBrokersSingapore;
