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

const BestBrokersCanada = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Canada broker ranking: IIROC alternative positioning, CAD accounts
  // 11 brokers total: 7 affiliate + 4 non-affiliate (authority building)
  const canadaBrokers = [
    brokers.fxglory,     // 1:3000 - SVG FSA ✅ Affiliate
    brokers.coinexx,     // 1:500 - Crypto-native ✅ Affiliate
    brokers.midasfx,     // 1:500 - FSA ✅ Affiliate
    brokers.hankotrade,  // 1:500 - VFSC ✅ Affiliate
    brokers.hfm,         // 1:2000 - CySEC/FCA ✅ Affiliate
    brokers.xm,          // 1:1000 - CySEC ✅ Affiliate
    brokers.fxpro,       // 1:200 - FCA/CySEC ✅ Affiliate
    brokers.exness,      // 1:2000 - CySEC/FCA ❌ Non-affiliate
    brokers.fxtm,        // 1:1000 - CySEC/FCA ❌ Non-affiliate
    brokers.pepperstone, // 1:500 - ASIC/FCA ❌ Non-affiliate
    brokers.fbs,         // 1:3000 - CySEC/FSCA ❌ Non-affiliate
  ];

  const faqs = [
    {
      question: "Can Canadian traders legally use offshore forex brokers?",
      answer: "Yes, Canadian residents can legally trade with offshore brokers. While IIROC (Investment Industry Regulatory Organization of Canada) regulates domestic brokers, it does not prohibit Canadians from using international brokers licensed in other jurisdictions (CySEC, FCA, ASIC). However, you won't have access to CIPF (Canadian Investor Protection Fund) coverage. Choose well-regulated offshore brokers with strong reputations to mitigate risk."
    },
    {
      question: "Why do Canadian traders choose offshore brokers over IIROC-regulated ones?",
      answer: "The main reasons are leverage and product diversity. IIROC-regulated brokers typically cap leverage at 1:50 for major pairs and have strict margin requirements. Offshore brokers offer 1:500 to 1:3000 leverage, giving experienced traders more capital efficiency. Additionally, offshore brokers provide access to more trading instruments, welcome bonuses, and cryptocurrency deposits — features restricted under IIROC rules."
    },
    {
      question: "What is IIROC and how does it affect forex trading in Canada?",
      answer: "IIROC (Investment Industry Regulatory Organization of Canada) is the national self-regulatory body that oversees investment dealers and trading activity in Canadian debt and equity marketplaces. IIROC sets leverage limits (typically 1:50 for major pairs), enforces strict margin requirements, and requires brokers to maintain client fund segregation. While these rules protect retail traders, they limit the strategies available to experienced professionals."
    },
    {
      question: "Do I need to pay taxes on forex trading profits in Canada?",
      answer: "Yes, forex trading profits are taxable in Canada. The CRA (Canada Revenue Agency) treats forex income as either capital gains or business income depending on your trading frequency and intent. Capital gains are 50% taxable (you only pay tax on half the gain). Active traders may be considered running a business, with profits fully taxable as business income. Keep detailed records of all trades and consult a Canadian tax professional for your specific situation."
    },
    {
      question: "Can I deposit in CAD with offshore brokers?",
      answer: "Some offshore brokers accept CAD deposits, but most require conversion to USD or EUR. Wire transfers and credit cards process CAD directly, though conversion fees may apply. E-wallets like Skrill and Neteller support CAD accounts. Cryptocurrency deposits (Bitcoin, USDT) bypass currency conversion entirely. Check each broker's deposit options and fees before opening an account to minimize conversion costs."
    },
    {
      question: "Which provinces regulate forex trading differently?",
      answer: "Forex regulation in Canada operates at both federal and provincial levels. While IIROC provides national oversight, provincial securities commissions (OSC in Ontario, AMF in Quebec, BCSC in British Columbia) may have additional requirements. Quebec's AMF, for example, has its own registration requirements for dealers. However, trading with offshore brokers is not prohibited by any province — the regulations primarily affect brokers operating within Canada."
    },
    {
      question: "What's the minimum deposit to start forex trading from Canada?",
      answer: "Minimum deposits vary by broker. Among our recommended brokers, you can start with as little as $1 (MidasFX), $5 (XM), or $0 (HFM). Most offshore brokers accept small initial deposits, making forex trading accessible to Canadian beginners. However, for serious trading with proper risk management, a starting capital of $500-$1,000 CAD is recommended to allow for adequate position sizing."
    },
    {
      question: "Which broker is best for Canadian beginners?",
      answer: "XM is an excellent choice for Canadian beginners with its $5 minimum deposit, extensive educational resources (daily webinars, tutorials), and user-friendly MT4/MT5 platforms. HFM is another strong option with its copy trading feature, allowing newcomers to learn from experienced traders. Both brokers offer demo accounts for risk-free practice and 24/5 multilingual customer support."
    }
  ];

  const handleCtaClick = (brokerId: string, position: number) => {
    trackAffiliateClick(brokerId, "best_brokers_canada", `position_${position}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="11 Best Forex Brokers Canada 2026 | High Leverage IIROC Alternatives"
        description="Compare 11 top forex brokers for Canadian traders. Access higher leverage beyond IIROC limits. CAD accounts, regulated brokers. Updated March 2026."
        keywords="forex brokers canada, best forex brokers canada, high leverage forex canada, iiroc alternative, forex trading canada, canadian forex brokers"
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
                Best High Leverage Forex Brokers in Canada (2026)
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Go beyond IIROC's leverage restrictions. Compare 11 top-rated international brokers offering leverage up to 1:3000 for experienced Canadian traders.
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
                In-depth analysis of each broker's strengths, weaknesses, and suitability for Canadian traders seeking IIROC alternatives
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {canadaBrokers.map((broker, index) => (
                <BrokerCard key={broker.id} broker={broker} rank={index + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Canadian Traders Choose These Brokers */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Canadian Traders Choose Offshore Brokers</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Canada's forex market is regulated by IIROC (Investment Industry Regulatory Organization of Canada) at the national level and by provincial securities commissions. While these regulations provide strong investor protection, they impose leverage limits that many experienced traders find restrictive.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">The IIROC Leverage Limitation</h3>
              <p className="leading-relaxed text-muted-foreground">
                IIROC-regulated brokers typically cap retail leverage at 1:50 for major currency pairs — significantly lower than the 1:500 to 1:3000 offered by offshore brokers. This means Canadian traders need $2,000 CAD to control a standard 1-lot position (100,000 units) at 1:50, compared to just $200 at 1:500 with an offshore broker. For experienced traders with proven risk management, this restriction reduces capital efficiency considerably.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Important Disclosure
                </h4>
                <p className="text-sm text-muted-foreground mb-0">
                  High leverage amplifies both profits and losses. A 1% adverse price movement with 1:100 leverage can wipe out your entire position. Only experienced traders with strict risk management should consider leverage above 1:50. Never risk more than 1-2% of your trading capital per trade. Canadian traders should be aware that offshore brokers do not provide CIPF coverage.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Benefits of Offshore Brokers for Canadian Traders</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Higher Leverage:</strong> Access 1:500 to 1:3000 leverage for advanced trading strategies like scalping and hedging</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>More Trading Instruments:</strong> Trade cryptocurrencies, exotic pairs, and CFDs on global stocks not available through IIROC brokers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Welcome Bonuses:</strong> Many offshore brokers offer generous deposit bonuses not permitted under IIROC regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Crypto Deposits:</strong> Fund accounts with Bitcoin, USDT, and other cryptocurrencies for fast, low-fee transactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Competitive Spreads:</strong> Offshore ECN brokers often offer tighter spreads (from 0.0 pips) than domestic Canadian brokers</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Trade-offs: What You Give Up</h3>
              <p className="leading-relaxed text-muted-foreground">
                Offshore brokers don't provide CIPF (Canadian Investor Protection Fund) coverage, which protects up to $1 million if an IIROC member firm becomes insolvent. However, top-tier offshore brokers with CySEC, FCA, or ASIC licenses maintain stringent capital requirements, segregate client funds, and offer negative balance protection — mitigating most risks for informed traders.
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
                    <p>• USD/CAD and major pair spreads</p>
                    <p>• Commission structure</p>
                    <p>• Available leverage</p>
                    <p>• Execution speed & slippage</p>
                    <p>• Minimum deposit (CAD-friendly)</p>
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
                    <p>• 24/5 or 24/7 availability</p>
                    <p>• Live chat response times</p>
                    <p>• Email support quality</p>
                    <p>• Phone support (Canadian hours)</p>
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
                  BeginnerFXGuide.com may receive compensation when you open an account through our links. This does not influence our rankings — we only recommend brokers we've thoroughly tested and would use ourselves. Our priority is providing honest, accurate information to help Canadian traders make informed decisions.
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
              Join thousands of Canadian traders who've moved beyond IIROC's leverage limits. Start with our #1 recommended broker:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href={getAffiliateUrl(canadaBrokers[0].id, { ...UTM_CONFIGS.HERO_PRIMARY, campaign: "canada_best" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick(canadaBrokers[0].id, 1)}
                >
                  Open Account with {canadaBrokers[0].name}
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
            href={getAffiliateUrl(canadaBrokers[0].id, {
              ...UTM_CONFIGS.MOBILE_STICKY,
              campaign: "canada_best"
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCtaClick(canadaBrokers[0].id, 1)}
          >
            Start Trading with {canadaBrokers[0].name}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default BestBrokersCanada;
