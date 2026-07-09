import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, TrendingUp, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerCard from "@/components/compare/BrokerCard";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Organic, INDEXABLE "Best Forex Brokers USA" page. Companion to the noindex paid LP (/us).
 * Fills the missing regional page (UK/AU/CA/EU/SG existed, USA did not) and serves as an
 * organic asset that survives ad-account churn. Leads with US-accepting offshore brokers
 * (affiliate) and includes the legitimately CFTC/NFA-regulated options for balance/authority.
 */
const BestBrokersUSA = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Offshore (US-accepted, affiliate) first, then regulated US options for authority/balance.
  const usBrokers = [
    brokers.fxglory,            // SVG FSA, 1:3000, $1 ✅ Affiliate
    brokers.midasfx,            // FSA, 1:500 ✅ Affiliate
    brokers.hankotrade,         // Seychelles FSA, 1:500 ✅ Affiliate
    brokers.lmfx,               // Unregulated, 1:1000, 100% bonus ✅ Affiliate
    brokers.coinexx,            // Unregulated, 1:500, crypto ECN ✅ Affiliate
    brokers.oanda,              // CFTC/NFA ❌ Non-affiliate (authority)
    brokers.forexcom,           // CFTC/NFA ❌ Non-affiliate (authority)
    brokers.tastyfx,            // CFTC/NFA ❌ Non-affiliate (authority)
    brokers.interactivebrokers, // CFTC/NFA ❌ Non-affiliate (authority)
  ].filter(Boolean);

  const faqs = [
    {
      question: "Can US residents legally trade with offshore forex brokers?",
      answer: "Yes. It is legal for US residents to open and fund accounts with brokers licensed outside the United States. The difference is regulatory: offshore brokers are not registered with the CFTC or NFA, so you forgo US investor protections. In exchange they can offer far higher leverage (1:500–1:3000) and deposit bonuses that are prohibited for US-regulated brokers. Only trade money you can afford to lose.",
    },
    {
      question: "Why do US traders use offshore brokers instead of OANDA or FOREX.com?",
      answer: "The main reason is leverage. CFTC/NFA rules cap US retail forex at 1:50 for majors (1:20 for minors). Offshore brokers offer 1:500 to 1:3000, which experienced traders use for scalping, hedging, and smaller margin requirements. Offshore brokers also offer deposit bonuses, crypto funding, and a wider instrument range — all restricted under US rules.",
    },
    {
      question: "How do I fund an offshore broker account from the US?",
      answer: "US debit/credit cards and ACH are frequently declined by offshore forex brokers, so the reliable method is cryptocurrency. Buy USDT (or Bitcoin) on Coinbase, Kraken, or Cash App, then send it to your broker's wallet — it arrives in minutes with near-zero fees and no bank rejection. Some brokers (e.g. FXGlory) also accept cards and wire transfers.",
    },
    {
      question: "Which offshore broker is best for beginners in the US?",
      answer: "FXGlory is a popular starting point: $1 minimum deposit, up to 1:3000 leverage, multiple funding methods, and 24/7 support. LMFX is favored for its 100% deposit bonus, and Coinexx for pure-crypto ECN trading with tight spreads. Start small, test a withdrawal early, and scale only once you trust the broker.",
    },
    {
      question: "Are US-regulated brokers safer than offshore ones?",
      answer: "Yes, in terms of regulatory protection. CFTC/NFA brokers like OANDA, FOREX.com, tastyfx and Interactive Brokers segregate client funds and are subject to strict oversight, but they cap leverage at 1:50 and offer no bonuses. The choice is a trade-off between protection (regulated) and flexibility/leverage (offshore). Many traders keep a regulated account for size and an offshore account for high-leverage strategies.",
    },
  ];

  const leadBroker = usBrokers[0];
  const handleCtaClick = (brokerId: string, position: number) => {
    trackAffiliateClick(brokerId, "best_brokers_usa", `position_${position}`, "US");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="9 Best Forex Brokers USA 2026 | Offshore High-Leverage & CFTC-Regulated"
        description="The best forex brokers for US traders in 2026 — offshore brokers accepting US clients with 1:500–1:3000 leverage and bonuses, plus CFTC/NFA-regulated options. Independent comparison."
        keywords="forex broker usa, best forex brokers usa, us forex brokers, offshore forex brokers accepting us clients, high leverage forex broker usa"
        canonical="/brokers/usa"
        ogType="article"
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Award className="w-4 h-4" /> Expert Reviewed | Updated 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Best Forex Brokers for US Traders (2026)
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Offshore brokers accepting US clients with leverage beyond the 1:50 CFTC cap — plus the leading
                CFTC/NFA-regulated options. Independent, side-by-side.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /><span>9 Brokers Reviewed</span></div>
                <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-green-500" /><span>Offshore & CFTC/NFA</span></div>
                <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" /><span>Up to 1:3000 Leverage</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Broker grid */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Detailed Broker Reviews</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Regulation, leverage, spreads, funding methods, and platform quality for US traders — offshore first, regulated below.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {usBrokers.map((broker, index) => (
                <BrokerCard key={broker.id} broker={broker} rank={index + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Why offshore */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Offshore vs US-Regulated: The Trade-Off</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                US retail forex is tightly regulated. The CFTC and NFA cap leverage at 1:50 on major pairs and ban
                deposit bonuses and hedging. That protects beginners, but experienced traders often want the leverage,
                bonuses, and instrument range that only offshore brokers provide.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" /> Risk Warning
                </h4>
                <p className="text-sm text-muted-foreground mb-0">
                  Offshore brokers are not CFTC/NFA-regulated, so you don't get US investor protections. High leverage
                  magnifies both profits and losses — a small adverse move can wipe an over-leveraged account. Between
                  74–89% of retail accounts lose money. Trade only what you can afford to lose and start with a small
                  deposit to test funding and withdrawals.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Funding from the US</h3>
              <p className="leading-relaxed text-muted-foreground">
                US bank cards are frequently declined by offshore forex brokers. The reliable route is crypto: buy USDT
                on a US exchange (Coinbase, Kraken, Cash App) and send it to your broker in minutes — no declines, low
                fees, fast withdrawals. Some brokers such as FXGlory also accept cards and wire transfers.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology + disclosure */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Broker Evaluation Methodology</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                We evaluate every broker across 50+ criteria — regulation, leverage, spreads, funding methods,
                withdrawal reliability, and platform quality — with special attention to whether US traders can
                actually fund and withdraw smoothly.
              </p>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Trading Conditions</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• EUR/USD & major-pair spreads</p>
                    <p>• Leverage (offshore vs 1:50 US cap)</p>
                    <p>• Commission & hidden fees</p>
                    <p>• Minimum deposit</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Funding & Withdrawals</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Crypto (USDT/BTC) support</p>
                    <p>• Card/wire acceptance for US clients</p>
                    <p>• Withdrawal speed (tested)</p>
                    <p>• Deposit bonuses</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-lg mb-3">Affiliate Disclosure</h4>
                <p className="text-sm text-muted-foreground mb-0">
                  BeginnerFXGuide.com may earn a commission when you open an account via our links, at no cost to you.
                  This never influences our rankings or reviews. We only list brokers we have researched and would use
                  ourselves. Offshore brokers are not CFTC/NFA-regulated — trade responsibly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
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
                      <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6"><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/guides/us-forex-regulations" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">US Forex Regulations</h3>
                <p className="text-xs text-muted-foreground">How CFTC/NFA rules affect US traders.</p>
              </Link>
              <Link to="/guides/forex-trading-usa" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Forex Trading in the USA</h3>
                <p className="text-xs text-muted-foreground">A complete guide for US-based traders.</p>
              </Link>
              <Link to="/guides/best-high-leverage-brokers" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Best High-Leverage Brokers</h3>
                <p className="text-xs text-muted-foreground">Compare brokers by maximum leverage.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Trading as a US Resident</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our top-rated offshore broker for US traders — from $1, with high leverage and crypto funding:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href={getAffiliateUrl(leadBroker.id, { ...UTM_CONFIGS.US_LP, campaign: "usa_organic" })}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handleCtaClick(leadBroker.id, 1)}
                >
                  Open Account with {leadBroker.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/compare">Compare All Brokers</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              * High-leverage trading carries significant risk of capital loss. Offshore brokers are not CFTC/NFA-regulated. Trade responsibly.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BestBrokersUSA;
