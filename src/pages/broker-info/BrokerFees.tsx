import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, DollarSign, ChevronDown, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import SEO from "@/components/SEO";
import { useState } from "react";
import { getBrokerBySlug, BROKER_SLUGS } from "./brokerInfoPages";

const BrokerFees = () => {
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

  const isLowCost = broker.spreadsFrom <= 0.5;
  const verdict = isLowCost
    ? `${broker.name} is a low-cost broker with spreads from ${broker.spreads}. Trading costs are competitive, making it suitable for high-volume traders and scalpers.`
    : `${broker.name} charges trading fees primarily through spreads starting from ${broker.spreads}. Here's a complete breakdown of all costs you'll encounter.`;

  // Get top 5 competitors for comparison
  const competitors = Object.values(brokers)
    .filter((b) => b.id !== broker.id)
    .sort((a, b) => a.spreadsFrom - b.spreadsFrom)
    .slice(0, 5);

  const faqs = [
    {
      question: `What fees does ${broker.name} charge?`,
      answer: `${broker.name}'s primary trading cost is the spread, starting from ${broker.spreads}. Additional costs may include overnight swap fees (for positions held past the daily rollover), inactivity fees after prolonged account dormancy, and potential withdrawal fees depending on the method used.`,
    },
    {
      question: `Does ${broker.name} charge commission?`,
      answer: `Commission structure depends on the account type. ${broker.accountTypes.join(", ")} accounts may have different fee models. ${broker.spreadsFrom === 0 ? "ECN/raw spread accounts typically charge a commission per lot in exchange for tighter spreads." : "Standard accounts generally include the commission within the spread."}`,
    },
    {
      question: `Are there hidden fees at ${broker.name}?`,
      answer: `Common non-trading fees at forex brokers include: inactivity fees (charged after extended periods of no trading), withdrawal fees (varies by payment method), currency conversion fees (when depositing/withdrawing in a different currency than the account base), and overnight swap rates. Always check ${broker.name}'s fee schedule for the most current information.`,
    },
    {
      question: `Does ${broker.name} charge withdrawal fees?`,
      answer: `Withdrawal fee policies vary by payment method. Most brokers offer at least one free withdrawal method. Bank wire transfers typically incur a fee (usually $25-50), while e-wallet and card withdrawals may be free or have smaller fees. Check ${broker.name}'s current withdrawal fee schedule before choosing a payment method.`,
    },
    {
      question: `How do ${broker.name}'s fees compare to competitors?`,
      answer: `${broker.name}'s spreads start from ${broker.spreads}, which is ${isLowCost ? "among the most competitive in the industry" : "fairly standard for the market"}. When comparing total trading costs, consider both spreads and any per-lot commissions, as some brokers with tighter spreads charge commissions that increase the effective cost per trade.`,
    },
  ];

  const handleCtaClick = () => {
    trackAffiliateClick(broker.id, "broker_fees", "cta");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${broker.name} Fees 2026 — Spreads, Commissions & Hidden Costs`}
        description={`Complete ${broker.name} fee breakdown: spreads from ${broker.spreads}, commissions, withdrawal fees, and hidden costs. Compare ${broker.name}'s fees with competitors.`}
        keywords={`${broker.name.toLowerCase()} fees, ${broker.name.toLowerCase()} commissions, ${broker.name.toLowerCase()} trading costs, ${broker.name.toLowerCase()} withdrawal fees`}
        ogType="article"
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background py-10 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {broker.name} Fees and Commissions
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {verdict}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-500" /> {broker.regulation}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-500" /> Spreads from {broker.spreads}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Breakdown */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{broker.name} Fee Breakdown</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trading Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Spreads From</span><span className="font-semibold text-primary">{broker.spreads}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Account Types</span><span className="font-semibold">{broker.accountTypes.join(", ")}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Leverage</span><span className="font-semibold">{broker.leverage}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Trading Score</span><span className="font-semibold">{broker.scores.tradingConditions}/10</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Non-Trading Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Deposit Fee</span><span className="font-semibold text-green-600">Usually Free</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Withdrawal Fee</span><span className="font-semibold">Varies by method</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Inactivity Fee</span><span className="font-semibold">Check broker</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Currency Conversion</span><span className="font-semibold">May apply</span></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fee Comparison Table */}
        <section className="py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">How {broker.name}'s Fees Compare</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Broker</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Spreads From</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Min Deposit</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Regulation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="py-3 px-4 text-sm font-semibold">{broker.name}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">{broker.spreads}</td>
                    <td className="py-3 px-4 text-sm">{broker.minDepositDisplay}</td>
                    <td className="py-3 px-4 text-sm">{broker.regulation}</td>
                  </tr>
                  {competitors.map((b) => (
                    <tr key={b.id} className="border-b border-border">
                      <td className="py-3 px-4 text-sm">
                        <Link to={`/brokers/${BROKER_SLUGS[b.id]}/fees`} className="text-primary hover:underline">
                          {b.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-sm">{b.spreads}</td>
                      <td className="py-3 px-4 text-sm">{b.minDepositDisplay}</td>
                      <td className="py-3 px-4 text-sm">{b.regulation}</td>
                    </tr>
                  ))}
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
              <h2 className="text-2xl font-bold mb-3">Start Trading with {broker.name}</h2>
              <p className="text-muted-foreground">Competitive fees with spreads from {broker.spreads}.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {broker.affiliateUrl && (
                <Button size="lg" asChild>
                  <a
                    href={getAffiliateUrl(broker.id, { ...UTM_CONFIGS.HERO_PRIMARY, campaign: "fees_page" })}
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
              <Link to={`/brokers/${brokerSlug}/spreads`} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{broker.name} Spreads</h3>
                <p className="text-xs text-muted-foreground">Detailed spread comparison and analysis.</p>
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

export default BrokerFees;
