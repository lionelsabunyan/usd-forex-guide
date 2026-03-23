import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, ExternalLink, Shield, DollarSign, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import SEO from "@/components/SEO";
import { useState } from "react";
import { getBrokerBySlug, getTopBrokersByMinDeposit, getIndustryAverageMinDeposit, BROKER_SLUGS } from "./brokerInfoPages";

const BrokerMinDeposit = () => {
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

  const industryAvg = getIndustryAverageMinDeposit();
  const topBrokers = getTopBrokersByMinDeposit();
  const isLow = broker.minDeposit <= 10;
  const isMedium = broker.minDeposit > 10 && broker.minDeposit <= 100;
  const verdict = isLow
    ? `${broker.name} has one of the lowest minimum deposits in the industry at ${broker.minDepositDisplay}, making it highly accessible for beginners.`
    : isMedium
    ? `${broker.name} requires a moderate minimum deposit of ${broker.minDepositDisplay}, which is ${broker.minDeposit < industryAvg ? "below" : "above"} the industry average of $${industryAvg}.`
    : `${broker.name} requires ${broker.minDepositDisplay} to start trading, which is ${broker.minDeposit < industryAvg ? "below" : "above"} the industry average of $${industryAvg}.`;

  const faqs = [
    {
      question: `What is the minimum deposit for ${broker.name}?`,
      answer: `The minimum deposit for ${broker.name} is ${broker.minDepositDisplay}. This is the lowest amount you need to open a live trading account and start trading forex and CFDs.`,
    },
    {
      question: `Can I start trading ${broker.name} with a small amount?`,
      answer: broker.minDeposit <= 50
        ? `Yes, ${broker.name} allows you to start with as little as ${broker.minDepositDisplay}, making it one of the more accessible brokers for beginners and traders with limited capital.`
        : `${broker.name} requires a minimum of ${broker.minDepositDisplay} to open an account. While this isn't the lowest in the industry, it's a reasonable starting amount for most traders.`,
    },
    {
      question: `What payment methods does ${broker.name} accept for deposits?`,
      answer: `${broker.name} accepts the following payment methods: ${broker.paymentMethods.join(", ")}. ${broker.cryptoDeposits ? "Cryptocurrency deposits are also available." : "Cryptocurrency deposits are not currently supported."}`,
    },
    {
      question: `Does ${broker.name} charge deposit fees?`,
      answer: `Most deposit methods at ${broker.name} are free of charge. However, bank wire transfers may incur fees from your bank. Check ${broker.name}'s website for the latest fee schedule.`,
    },
    {
      question: `How does ${broker.name}'s minimum deposit compare to other brokers?`,
      answer: `${broker.name}'s minimum deposit of ${broker.minDepositDisplay} is ${broker.minDeposit < industryAvg ? `below the industry average of $${industryAvg}` : broker.minDeposit === industryAvg ? `at the industry average of $${industryAvg}` : `above the industry average of $${industryAvg}`}. ${isLow ? "It's among the lowest in the industry." : "There are brokers with lower minimums, but deposit size isn't the only factor to consider."}`,
    },
  ];

  const handleCtaClick = () => {
    trackAffiliateClick(broker.id, "broker_min_deposit", "cta");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${broker.name} Minimum Deposit 2026 — ${broker.minDepositDisplay} | How to Start Trading`}
        description={`${broker.name} minimum deposit is ${broker.minDepositDisplay}. Learn about deposit methods, account types, and how ${broker.name} compares to other forex brokers.`}
        keywords={`${broker.name.toLowerCase()} minimum deposit, ${broker.name.toLowerCase()} deposit, ${broker.name.toLowerCase()} how much to start, ${broker.name.toLowerCase()} account opening`}
        ogType="article"
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background py-10 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {broker.name} Minimum Deposit — {broker.minDepositDisplay}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {verdict}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-500" /> {broker.regulation}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-500" /> {broker.minDepositDisplay} Min</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deposit Details */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{broker.name} Deposit Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Minimum Deposit</span><span className="font-semibold">{broker.minDepositDisplay}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Account Types</span><span className="font-semibold">{broker.accountTypes.join(", ")}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Regulation</span><span className="font-semibold">{broker.regulation}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Founded</span><span className="font-semibold">{broker.foundedYear}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {broker.paymentMethods.map((method) => (
                    <div key={method} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{method}</span>
                    </div>
                  ))}
                  {broker.cryptoDeposits && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Cryptocurrency</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">How {broker.name} Compares</h2>
            <p className="text-muted-foreground mb-6">
              See how {broker.name}'s minimum deposit stacks up against the top brokers with the lowest deposit requirements.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Broker</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Min Deposit</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Spreads From</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Regulation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="py-3 px-4 text-sm font-semibold">{broker.name}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">{broker.minDepositDisplay}</td>
                    <td className="py-3 px-4 text-sm">{broker.spreads}</td>
                    <td className="py-3 px-4 text-sm">{broker.regulation}</td>
                  </tr>
                  {topBrokers
                    .filter((b) => b.id !== broker.id)
                    .slice(0, 4)
                    .map((b) => (
                      <tr key={b.id} className="border-b border-border">
                        <td className="py-3 px-4 text-sm">
                          <Link to={`/brokers/${BROKER_SLUGS[b.id]}/minimum-deposit`} className="text-primary hover:underline">
                            {b.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm">{b.minDepositDisplay}</td>
                        <td className="py-3 px-4 text-sm">{b.spreads}</td>
                        <td className="py-3 px-4 text-sm">{b.regulation}</td>
                      </tr>
                    ))}
                  <tr className="bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">Industry Average</td>
                    <td className="py-3 px-4 text-sm">${industryAvg}</td>
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
              <h2 className="text-2xl font-bold mb-3">Ready to Open an Account with {broker.name}?</h2>
              <p className="text-muted-foreground">Start trading with just {broker.minDepositDisplay}.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {broker.affiliateUrl && (
                <Button size="lg" asChild>
                  <a
                    href={getAffiliateUrl(broker.id, { ...UTM_CONFIGS.HERO_PRIMARY, campaign: "min_deposit_page" })}
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
              <Link to={`/brokers/${brokerSlug}/spreads`} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{broker.name} Spreads</h3>
                <p className="text-xs text-muted-foreground">Compare {broker.name}'s spreads with other brokers.</p>
              </Link>
              <Link to={`/brokers/${brokerSlug}/fees`} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{broker.name} Fees</h3>
                <p className="text-xs text-muted-foreground">Full breakdown of {broker.name}'s trading fees.</p>
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

export default BrokerMinDeposit;
