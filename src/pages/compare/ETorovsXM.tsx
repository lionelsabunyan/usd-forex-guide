import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { CheckCircle, Trophy, ArrowRight, ExternalLink, Star, Shield, Zap, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

const ETorovsXM = () => {
  const etoro = brokers.etoro;
  const xm = brokers.xm;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "eToro vs XM 2026: Which Broker is Better for Beginners?",
    "description": "Detailed comparison of eToro and XM for forex traders. Compare social trading, spreads, leverage, and educational resources side-by-side.",
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
    { category: "Overall Rating", broker1: `${etoro.rating}/5`, broker2: `${xm.rating}/5`, winner: "xm" },
    { category: "Min. Deposit", broker1: etoro.minDepositDisplay, broker2: xm.minDepositDisplay, winner: "xm" },
    { category: "Max Leverage", broker1: etoro.leverage, broker2: xm.leverage, winner: "xm" },
    { category: "Spreads From", broker1: etoro.spreads, broker2: xm.spreads, winner: "tie" },
    { category: "Regulation", broker1: etoro.regulation, broker2: xm.regulation, winner: "tie" },
    { category: "Platforms", broker1: etoro.platforms.join(", "), broker2: xm.platforms.join(", "), winner: "xm" },
    { category: "Social Trading", broker1: "Yes (CopyTrader)", broker2: "No", winner: "etoro" },
    { category: "Crypto Trading", broker1: "Yes", broker2: "No", winner: "etoro" },
    { category: "Founded", broker1: String(etoro.foundedYear), broker2: String(xm.foundedYear), winner: "etoro" },
    { category: "Bonus Offers", broker1: "No", broker2: xm.bonus || "Yes", winner: "xm" },
  ];

  const faqs = [
    {
      question: "Which is better for beginners: eToro or XM?",
      answer: "Both are excellent for beginners. eToro excels with its social/copy trading feature that lets you mirror experienced traders. XM stands out with its $5 minimum deposit, comprehensive educational webinars, and demo account. Choose eToro for social trading, XM for traditional education."
    },
    {
      question: "Does eToro or XM offer higher leverage?",
      answer: "XM offers significantly higher leverage at 1:1000 compared to eToro's 1:30. However, higher leverage means higher risk. eToro's lower leverage may actually benefit beginners by limiting potential losses."
    },
    {
      question: "Can US traders use eToro or XM?",
      answer: "eToro offers limited services to US clients (primarily crypto trading). XM does not accept US clients. US-based forex traders should consider CFTC-regulated alternatives like OANDA or Forex.com."
    },
    {
      question: "Which broker has better trading platforms?",
      answer: "XM offers MT4 and MT5, the industry-standard platforms favored by experienced traders. eToro has its own proprietary platform focused on social trading and ease of use. XM is better for technical analysis, eToro for social/copy trading."
    },
    {
      question: "Which broker has lower fees?",
      answer: "XM generally has lower trading costs with no deposit/withdrawal fees and competitive spreads. eToro charges $5 per withdrawal and has slightly higher spreads. XM also offers bonus programs that can reduce effective trading costs."
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
        title="eToro vs XM 2026: Head-to-Head Comparison for Forex Traders"
        description="eToro vs XM: Which forex broker is better? Compare social trading, spreads, leverage, bonuses, and platforms in our detailed 2026 comparison."
        canonical="/compare/etoro-vs-xm/"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                Updated March 2026
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                eToro vs XM
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Social trading pioneer vs educational powerhouse — which broker suits your trading style in 2026?
              </p>

              {/* Quick Verdict */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h2 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Quick Verdict
                </h2>
                <p className="text-slate-200">
                  <strong className="text-white">XM wins overall</strong> with its lower minimum deposit ($5 vs $50), higher leverage (1:1000), MT4/MT5 support, and generous bonus offers. <strong className="text-white">eToro wins for social traders</strong> who want to copy successful traders and access crypto markets. Both are well-regulated and beginner-friendly.
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
                {/* eToro Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-teal-500 text-white text-center py-2 text-sm font-semibold">
                    Best for Social Trading
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{etoro.name}</h3>
                      <div className="flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{etoro.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold">{etoro.minDepositDisplay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">{etoro.spreads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold">{etoro.leverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">{etoro.regulation}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {etoro.pros.slice(0, 4).map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                        <a
                          href={getAffiliateUrl("etoro", UTM_CONFIGS.COMPARE_PAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAffiliateClick("etoro", "compare_etoro_xm", "open_account")}
                        >
                          Open eToro Account
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/review/etoro/">
                          Read Full Review
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* XM Card */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-500 overflow-hidden">
                  <div className="bg-emerald-500 text-white text-center py-2 text-sm font-semibold">
                    WINNER - Best Overall Value
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{xm.name}</h3>
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{xm.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold text-emerald-600">{xm.minDepositDisplay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">{xm.spreads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold">{xm.leverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">{xm.regulation}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {xm.pros.slice(0, 4).map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                        <a
                          href={getAffiliateUrl("xm", UTM_CONFIGS.COMPARE_PAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAffiliateClick("xm", "compare_etoro_xm", "open_account")}
                        >
                          Open XM Account
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/review/xm/">
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
                      <th className="text-center p-4 font-semibold text-teal-700">eToro</th>
                      <th className="text-center p-4 font-semibold text-emerald-700">XM</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-medium text-gray-900">{row.category}</td>
                        <td className={`p-4 text-center ${row.winner === 'etoro' ? 'bg-teal-50 font-semibold text-teal-700' : ''}`}>
                          {row.broker1}
                        </td>
                        <td className={`p-4 text-center ${row.winner === 'xm' ? 'bg-emerald-50 font-semibold text-emerald-700' : ''}`}>
                          {row.broker2}
                        </td>
                        <td className="p-4 text-center">
                          {row.winner === 'etoro' && <span className="text-teal-600 font-semibold">eToro</span>}
                          {row.winner === 'xm' && <span className="text-emerald-600 font-semibold">XM</span>}
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
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Social Trading</h3>
                  </div>
                  <p className="text-gray-600">
                    eToro's <strong>CopyTrader</strong> feature is its biggest differentiator — you can automatically copy the trades of successful investors. XM doesn't offer social trading, focusing instead on <strong>educational webinars</strong> and research to help you trade independently.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Entry Cost</h3>
                  </div>
                  <p className="text-gray-600">
                    XM lets you start with just <strong>$5</strong> and offers a Micro account with nano lots, ideal for learning. eToro requires <strong>$50 minimum</strong>. XM also offers deposit <strong>bonus programs up to $10,500</strong>.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Leverage</h3>
                  </div>
                  <p className="text-gray-600">
                    XM offers up to <strong>1:1000 leverage</strong>, significantly more than eToro's <strong>1:30</strong>. While higher leverage amplifies both gains and losses, it gives experienced traders more flexibility.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Asset Variety</h3>
                  </div>
                  <p className="text-gray-600">
                    eToro offers <strong>stocks, crypto, ETFs, and forex</strong> on a single platform. XM focuses primarily on <strong>forex, CFDs, and commodities</strong> with MT4/MT5. eToro is better for multi-asset portfolios.
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
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-teal-800 mb-4">
                    Choose eToro if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Want to copy successful traders automatically</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Want to trade crypto alongside forex</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Prefer a simple, modern platform</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Want to build a multi-asset portfolio</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700" asChild>
                    <a
                      href={getAffiliateUrl("etoro", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("etoro", "compare_etoro_xm", "bottom_cta")}
                    >
                      Open eToro Account
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">
                    Choose XM if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want to start with as little as $5</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Need high leverage for your strategy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Prefer MT4/MT5 for technical analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want deposit bonuses and promotions</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a
                      href={getAffiliateUrl("xm", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("xm", "compare_etoro_xm", "bottom_cta")}
                    >
                      Open XM Account
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
                  to="/compare/pepperstone-vs-exness/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  Pepperstone vs Exness
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

export default ETorovsXM;
