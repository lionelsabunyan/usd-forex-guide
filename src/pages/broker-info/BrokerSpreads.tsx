import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, ExternalLink, Shield, TrendingUp, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import SEO from "@/components/SEO";
import { useState } from "react";
import { getBrokerBySlug, getTopBrokersBySpreads, getIndustryAverageSpread, BROKER_SLUGS } from "./brokerInfoPages";

const BrokerSpreads = () => {
  const { brokerId: brokerSlug } = useParams<{ brokerId: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const broker = brokerSlug ? getBrokerBySlug(brokerSlug) : null;

  if (!broker) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Broker Not Found</h1>
            <Link to="/brokers" className="text-primary hover:underline">View All Brokers</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const industryAvg = getIndustryAverageSpread();
  const topBrokers = getTopBrokersBySpreads();
  const isRaw = broker.spreadsFrom === 0;
  const verdict = isRaw
    ? `${broker.name} offers raw spreads starting from 0.0 pips on its ECN accounts, making it one of the most competitive brokers for spread-sensitive traders.`
    : broker.spreadsFrom < industryAvg
    ? `${broker.name} spreads start from ${broker.spreads}, which is below the industry average of ${industryAvg} pips — competitive pricing for most trading strategies.`
    : `${broker.name} spreads start from ${broker.spreads}. While above the industry average of ${industryAvg} pips, ${broker.name} may offer other advantages like platform features or regulation.`;

  const faqs = [
    {
      question: `What are ${broker.name}'s typical spreads?`,
      answer: `${broker.name} offers spreads starting from ${broker.spreads}. Actual spreads may vary depending on market conditions, account type, and the currency pair being traded. Major pairs like EUR/USD typically have the tightest spreads.`,
    },
    {
      question: `Does ${broker.name} offer raw/zero spread accounts?`,
      answer: isRaw
        ? `Yes, ${broker.name} offers accounts with raw spreads from 0.0 pips. These accounts may charge a commission per lot instead of wider spreads.`
        : `${broker.name}'s spreads start from ${broker.spreads}. Check their account types (${broker.accountTypes.join(", ")}) for the most competitive spread options.`,
    },
    {
      question: `How do ${broker.name}'s spreads compare to other brokers?`,
      answer: `${broker.name}'s spreads start from ${broker.spreads}, ${broker.spreadsFrom < industryAvg ? "below" : "above"} the industry average of ${industryAvg} pips. ${isRaw ? "This puts them among the most competitive brokers for spread-conscious traders." : "Spread costs should be considered alongside other factors like regulation, leverage, and platform features."}`,
    },
    {
      question: `Are ${broker.name}'s spreads fixed or variable?`,
      answer: `Most forex brokers, including ${broker.name}, offer variable (floating) spreads that change based on market liquidity and volatility. Spreads are typically tightest during major trading sessions (London, New York) and wider during off-hours and high-impact news events.`,
    },
    {
      question: `What factors affect spread costs at ${broker.name}?`,
      answer: `Spread costs at ${broker.name} are influenced by: the currency pair (majors have tighter spreads than exotics), market session and time of day, overall market volatility, your account type, and trading volume. ${broker.name} offers ${broker.accountTypes.join(", ")} account types with varying spread conditions.`,
    },
  ];

  const handleCtaClick = () => {
    trackAffiliateClick(broker.id, "broker_spreads", "cta");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${broker.name} Spreads 2026 — From ${broker.spreads} | Spread Comparison`}
        description={`${broker.name} spreads start from ${broker.spreads}. Compare ${broker.name}'s spreads with other forex brokers and learn about account types and trading costs.`}
        keywords={`${broker.name.toLowerCase()} spreads, ${broker.name.toLowerCase()} spread comparison, ${broker.name.toLowerCase()} trading costs, ${broker.name.toLowerCase()} pips`}
        ogType="article"
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background py-10 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {broker.name} Spreads — From {broker.spreads}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {verdict}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-500" /> {broker.regulation}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-green-500" /> From {broker.spreads}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Spread Details */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{broker.name} Spread Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trading Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Spreads From</span><span className="font-semibold text-primary">{broker.spreads}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Leverage</span><span className="font-semibold">{broker.leverage}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Account Types</span><span className="font-semibold">{broker.accountTypes.join(", ")}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Platforms</span><span className="font-semibold">{broker.platforms.join(", ")}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Spread Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{broker.scores.tradingConditions}/10</div>
                    <p className="text-sm text-muted-foreground mt-1">Trading Conditions Score</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Min Deposit</span><span>{broker.minDepositDisplay}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Neg. Balance Protection</span><span>{broker.negativeBalanceProtection ? "Yes" : "No"}</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">How {broker.name}'s Spreads Compare</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Broker</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Spreads From</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Min Deposit</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Leverage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="py-3 px-4 text-sm font-semibold">{broker.name}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">{broker.spreads}</td>
                    <td className="py-3 px-4 text-sm">{broker.minDepositDisplay}</td>
                    <td className="py-3 px-4 text-sm">{broker.leverage}</td>
                  </tr>
                  {topBrokers
                    .filter((b) => b.id !== broker.id)
                    .slice(0, 4)
                    .map((b) => (
                      <tr key={b.id} className="border-b border-border">
                        <td className="py-3 px-4 text-sm">
                          <Link to={`/brokers/${BROKER_SLUGS[b.id]}/spreads`} className="text-primary hover:underline">
                            {b.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm">{b.spreads}</td>
                        <td className="py-3 px-4 text-sm">{b.minDepositDisplay}</td>
                        <td className="py-3 px-4 text-sm">{b.leverage}</td>
                      </tr>
                    ))}
                  <tr className="bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">Industry Average</td>
                    <td className="py-3 px-4 text-sm">{industryAvg} pips</td>
                    <td className="py-3 px-4 text-sm">—</td>
                    <td className="py-3 px-4 text-sm">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold pr-4">{faq.question}</h3>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Related */}
        <section className="py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Trade with {broker.name}'s Competitive Spreads</h2>
              <p className="text-muted-foreground">Spreads from {broker.spreads} on major pairs.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {broker.affiliateUrl && (
                <Button size="lg" asChild>
                  <a
                    href={getAffiliateUrl(broker.id, { ...UTM_CONFIGS.HERO_PRIMARY, campaign: "spreads_page" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCtaClick}
                  >
                    Open Account <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
              <Button size="lg" variant="outline" asChild>
                <Link to={broker.reviewUrl}>
                  Read Full Review <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Link to={`/brokers/${brokerSlug}/minimum-deposit`} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{broker.name} Minimum Deposit</h3>
                <p className="text-xs text-muted-foreground">How much you need to start trading.</p>
              </Link>
              <Link to={`/brokers/${brokerSlug}/fees`} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{broker.name} Fees</h3>
                <p className="text-xs text-muted-foreground">Full breakdown of all trading fees.</p>
              </Link>
              <Link to={broker.reviewUrl} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{broker.name} Review</h3>
                <p className="text-xs text-muted-foreground">Complete review with pros, cons, and ratings.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrokerSpreads;
