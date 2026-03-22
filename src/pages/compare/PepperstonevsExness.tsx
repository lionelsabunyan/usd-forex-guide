import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { CheckCircle, Trophy, ArrowRight, ExternalLink, Star, Shield, Zap, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

const PepperstonevsExness = () => {
  const pepperstone = brokers.pepperstone;
  const exness = brokers.exness;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pepperstone vs Exness 2026: Which International Broker is Better?",
    "description": "Detailed comparison of Pepperstone and Exness for forex traders. Compare spreads, leverage, platforms, and regulation side-by-side.",
    "datePublished": "2026-03-22",
    "dateModified": "2026-03-22",
    "author": {
      "@type": "Organization",
      "name": "Beginner FX Guide",
      "url": "https://beginnerfxguide.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Beginner FX Guide",
      "url": "https://beginnerfxguide.com"
    }
  };

  const comparisonData = [
    { category: "Overall Rating", broker1: `${pepperstone.rating}/5`, broker2: `${exness.rating}/5`, winner: "exness" },
    { category: "Min. Deposit", broker1: pepperstone.minDepositDisplay, broker2: exness.minDepositDisplay, winner: "pepperstone" },
    { category: "Max Leverage", broker1: pepperstone.leverage, broker2: exness.leverage, winner: "exness" },
    { category: "Spreads From", broker1: pepperstone.spreads, broker2: exness.spreads, winner: "tie" },
    { category: "Regulation", broker1: "FCA, ASIC, CySEC, BaFIN", broker2: "FCA, CySEC, FSA, FSCA", winner: "tie" },
    { category: "Platforms", broker1: pepperstone.platforms.join(", "), broker2: exness.platforms.join(", "), winner: "pepperstone" },
    { category: "Crypto Deposits", broker1: "No", broker2: "Yes", winner: "exness" },
    { category: "Instant Withdrawals", broker1: "No", broker2: "Yes", winner: "exness" },
    { category: "Founded", broker1: String(pepperstone.foundedYear), broker2: String(exness.foundedYear), winner: "exness" },
    { category: "Account Types", broker1: pepperstone.accountTypes.join(", "), broker2: "Standard, Pro, Raw, Zero", winner: "exness" },
  ];

  const faqs = [
    {
      question: "Which is better: Pepperstone or Exness?",
      answer: "Exness edges ahead with its higher leverage (1:2000 vs 1:500), instant withdrawals, more account types, and crypto deposit support. However, Pepperstone offers superior platform variety including cTrader and TradingView, making it better for traders who value platform flexibility."
    },
    {
      question: "Which broker has tighter spreads?",
      answer: "Both offer raw spreads from 0.0 pips on their ECN/Raw accounts. In practice, spreads are very similar. Exness has a Zero account with fixed 0.0 spreads on top pairs (with commission), while Pepperstone's Razor account offers raw spreads with low commission."
    },
    {
      question: "Can US traders use Pepperstone or Exness?",
      answer: "No, neither broker accepts US clients. Both are international brokers regulated outside the US. US traders should consider CFTC-regulated alternatives like OANDA or Forex.com."
    },
    {
      question: "Which broker has better withdrawal options?",
      answer: "Exness is the clear winner here with instant withdrawals and support for crypto, e-wallets, and traditional banking. Pepperstone offers standard withdrawal times of 1-3 business days via bank transfer and e-wallets."
    },
    {
      question: "Which broker is better for scalping?",
      answer: "Both are excellent for scalping. Pepperstone offers cTrader (popular among scalpers) and tight Razor spreads. Exness provides higher leverage and instant execution. Your choice depends on whether you prefer cTrader (Pepperstone) or higher leverage (Exness)."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO
        title="Pepperstone vs Exness 2026: Head-to-Head Comparison for Forex Traders"
        description="Pepperstone vs Exness: Which international forex broker is better? Compare spreads, leverage, platforms, and withdrawal speed in our detailed 2026 comparison."
        canonical="/compare/pepperstone-vs-exness/"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                Updated March 2026
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Pepperstone vs Exness
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Two international trading giants compared — which offers the best conditions for serious traders in 2026?
              </p>

              {/* Quick Verdict */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h2 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Quick Verdict
                </h2>
                <p className="text-slate-200">
                  <strong className="text-white">Exness wins overall</strong> with its higher leverage (1:2000), instant withdrawals, crypto deposits, and more account types. <strong className="text-white">Pepperstone wins on platforms</strong> with cTrader and TradingView integration alongside MT4/MT5. Both offer 0.0 pip spreads and are multi-regulated by tier-1 authorities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Side by Side Cards */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pepperstone Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    Best Platform Variety
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{pepperstone.name}</h3>
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{pepperstone.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold text-blue-600">{pepperstone.minDepositDisplay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">{pepperstone.spreads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold">{pepperstone.leverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">{pepperstone.regulation}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {pepperstone.pros.slice(0, 4).map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                        <a
                          href={getAffiliateUrl("pepperstone", UTM_CONFIGS.COMPARE_PAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAffiliateClick("pepperstone", "compare_pepperstone_exness", "open_account")}
                        >
                          Open Pepperstone Account
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/review/pepperstone/">
                          Read Full Review
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Exness Card */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-500 overflow-hidden">
                  <div className="bg-emerald-500 text-white text-center py-2 text-sm font-semibold">
                    WINNER - Best Overall
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exness.name}</h3>
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{exness.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold">{exness.minDepositDisplay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">{exness.spreads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold text-emerald-600">{exness.leverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">{exness.regulation}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {exness.pros.slice(0, 4).map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                        <a
                          href={getAffiliateUrl("exness", UTM_CONFIGS.COMPARE_PAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAffiliateClick("exness", "compare_pepperstone_exness", "open_account")}
                        >
                          Open Exness Account
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/review/exness/">
                          Read Full Review
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Detailed Side-by-Side Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-700">Feature</th>
                      <th className="text-center p-4 font-semibold text-blue-700">Pepperstone</th>
                      <th className="text-center p-4 font-semibold text-emerald-700">Exness</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-medium text-gray-900">{row.category}</td>
                        <td className={`p-4 text-center ${row.winner === 'pepperstone' ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}>
                          {row.broker1}
                        </td>
                        <td className={`p-4 text-center ${row.winner === 'exness' ? 'bg-emerald-50 font-semibold text-emerald-700' : ''}`}>
                          {row.broker2}
                        </td>
                        <td className="p-4 text-center">
                          {row.winner === 'pepperstone' && <span className="text-blue-600 font-semibold">Pepperstone</span>}
                          {row.winner === 'exness' && <span className="text-emerald-600 font-semibold">Exness</span>}
                          {row.winner === 'tie' && <span className="text-gray-500">Tie</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differences */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Key Differences Explained
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Leverage</h3>
                  </div>
                  <p className="text-gray-600">
                    Exness offers up to <strong>1:2000 leverage</strong>, four times Pepperstone's <strong>1:500</strong>. This makes Exness more attractive for traders who want maximum capital efficiency, though higher leverage increases risk.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Trading Platforms</h3>
                  </div>
                  <p className="text-gray-600">
                    Pepperstone wins with <strong>MT4, MT5, cTrader, and TradingView</strong> — the widest platform selection. Exness offers <strong>MT4, MT5, and Exness Terminal</strong>. cTrader and TradingView fans should choose Pepperstone.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Deposits & Withdrawals</h3>
                  </div>
                  <p className="text-gray-600">
                    Exness stands out with <strong>instant withdrawals</strong> and <strong>crypto deposit support</strong>. Pepperstone has standard 1-3 day processing. Both brokers have <strong>no minimum deposit</strong> on standard accounts.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Account Types</h3>
                  </div>
                  <p className="text-gray-600">
                    Exness offers <strong>5 account types</strong> (Standard, Standard Cent, Pro, Raw Spread, Zero) vs Pepperstone's <strong>2</strong> (Standard, Razor). More choice means Exness can better match different trading styles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Choose Which */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Which Broker Should You Choose?
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Choose Pepperstone if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Want cTrader or TradingView integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Are a scalper needing fast execution</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Want $0 minimum deposit with raw spreads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Prefer an Australian-regulated broker</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" asChild>
                    <a
                      href={getAffiliateUrl("pepperstone", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("pepperstone", "compare_pepperstone_exness", "bottom_cta")}
                    >
                      Open Pepperstone Account
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">
                    Choose Exness if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want maximum leverage (1:2000)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Need instant withdrawals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want to deposit with crypto</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Need multiple account type options</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a
                      href={getAffiliateUrl("exness", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("exness", "compare_pepperstone_exness", "bottom_cta")}
                    >
                      Open Exness Account
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <Helmet>
                <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
              </Helmet>
            </div>
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                More Broker Comparisons
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/compare/oanda-vs-forexcom/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  OANDA vs Forex.com
                </Link>
                <Link
                  to="/compare/etoro-vs-xm/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  eToro vs XM
                </Link>
                <Link
                  to="/compare/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  Compare All Brokers
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PepperstonevsExness;
