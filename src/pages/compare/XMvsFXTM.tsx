import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { CheckCircle, Trophy, ArrowRight, ExternalLink, Star, Shield, Zap, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

const XMvsFXTM = () => {
  const xm = brokers.xm;
  const fxtm = brokers.fxtm;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "XM vs FXTM 2026: Which International Broker is Better?",
    "description": "Detailed comparison of XM and FXTM (ForexTime) for forex traders. Compare leverage, spreads, platforms, and regulation side-by-side.",
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
    { category: "Overall Rating", broker1: "4.4/5", broker2: "4.1/5", winner: "xm" },
    { category: "Min. Deposit", broker1: "$5", broker2: "$10", winner: "xm" },
    { category: "Max Leverage", broker1: "1:1000", broker2: "1:2000", winner: "fxtm" },
    { category: "Spreads From", broker1: "1.0 pips", broker2: "0.0 pips", winner: "fxtm" },
    { category: "Regulation", broker1: "CySEC, ASIC, DFSA, FSC", broker2: "FCA, CySEC, FSCA, FSC", winner: "tie" },
    { category: "Platforms", broker1: "MT4, MT5, XM App", broker2: "MT4, MT5, FXTM Trader", winner: "tie" },
    { category: "Account Types", broker1: "4 types", broker2: "3 types", winner: "xm" },
    { category: "Founded", broker1: "2009", broker2: "2011", winner: "xm" },
    { category: "US Clients", broker1: "Not Accepted", broker2: "Not Accepted", winner: "tie" },
    { category: "Education", broker1: "Webinars, Seminars", broker2: "Basic Resources", winner: "xm" },
  ];

  const faqs = [
    {
      question: "Which is better overall: XM or FXTM?",
      answer: "XM edges ahead overall with a higher rating (4.4 vs 4.1), lower minimum deposit ($5 vs $10), more account types, and superior educational resources including live webinars and seminars. However, FXTM is the better choice if you prioritize ultra-high leverage or raw spreads."
    },
    {
      question: "How does leverage compare between XM and FXTM?",
      answer: "FXTM offers significantly higher maximum leverage at 1:2000 compared to XM's 1:1000. Both are well above what most traders need, but FXTM's higher leverage can appeal to experienced traders who want more flexibility with smaller positions."
    },
    {
      question: "What are the spread differences between XM and FXTM?",
      answer: "FXTM offers raw spreads starting from 0.0 pips on its ECN accounts, while XM's spreads start from 1.0 pips on standard accounts. FXTM is the clear winner for traders who prioritize tight spreads and lower trading costs."
    },
    {
      question: "Which broker is safer: XM or FXTM?",
      answer: "Both brokers are well-regulated by multiple authorities. XM is licensed by CySEC, ASIC, DFSA, and FSC, while FXTM holds licenses from FCA, CySEC, FSCA, and FSC. Both offer negative balance protection and segregated client funds, making them equally safe choices."
    },
    {
      question: "Which broker is better for beginners: XM or FXTM?",
      answer: "XM is generally better for beginners due to its lower $5 minimum deposit, extensive educational resources including live webinars and seminars, more account types to grow into, and a longer track record since 2009. FXTM's strengths in leverage and raw spreads are more relevant to experienced traders."
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
        title="XM vs FXTM 2026: Head-to-Head Comparison for Forex Traders"
        description="XM vs FXTM (ForexTime): Which international forex broker is better? Compare leverage, spreads, platforms, and regulation in our detailed 2026 comparison."
        canonical="/compare/xm-vs-fxtm/"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                Updated March 2026
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                XM vs FXTM
              </h1>
              <p className="text-xl text-red-200 mb-8">
                Two popular international brokers go head-to-head — which offers the best trading experience in 2026?
              </p>

              {/* Quick Verdict */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h2 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Quick Verdict
                </h2>
                <p className="text-red-100">
                  <strong className="text-white">XM wins overall</strong> with a lower $5 minimum deposit, stronger educational resources, more account types, and a longer track record since 2009. <strong className="text-white">FXTM wins for advanced traders</strong> seeking the highest leverage (1:2000) and raw spreads from 0.0 pips. Both are multi-regulated but neither accepts US clients.
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
                {/* XM Card */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-500 overflow-hidden">
                  <div className="bg-emerald-500 text-white text-center py-2 text-sm font-semibold">
                    WINNER - Best Overall
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">XM</h3>
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">4.4</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold text-emerald-600">$5</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">1.0 pips</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold">1:1000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">CySEC, ASIC, DFSA, FSC</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {xm?.pros?.slice(0, 4).map((pro, idx) => (
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
                          onClick={() => trackAffiliateClick("xm", "compare_xm_fxtm", "open_account")}
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

                {/* FXTM Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    Best for Leverage & Raw Spreads
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">FXTM</h3>
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">4.1</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold">$10</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">0.0 pips</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold">1:2000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">FCA, CySEC, FSCA, FSC</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {fxtm?.pros?.slice(0, 4).map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                        <a
                          href={getAffiliateUrl("fxtm", UTM_CONFIGS.COMPARE_PAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAffiliateClick("fxtm", "compare_xm_fxtm", "open_account")}
                        >
                          Open FXTM Account
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/review/fxtm/">
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
                      <th className="text-center p-4 font-semibold text-emerald-700">XM</th>
                      <th className="text-center p-4 font-semibold text-blue-700">FXTM</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-medium text-gray-900">{row.category}</td>
                        <td className={`p-4 text-center ${row.winner === 'xm' ? 'bg-emerald-50 font-semibold text-emerald-700' : ''}`}>
                          {row.broker1}
                        </td>
                        <td className={`p-4 text-center ${row.winner === 'fxtm' ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}>
                          {row.broker2}
                        </td>
                        <td className="p-4 text-center">
                          {row.winner === 'xm' && <span className="text-emerald-600 font-semibold">XM</span>}
                          {row.winner === 'fxtm' && <span className="text-blue-600 font-semibold">FXTM</span>}
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
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Leverage</h3>
                  </div>
                  <p className="text-gray-600">
                    FXTM offers industry-leading <strong>1:2000 maximum leverage</strong>, double XM's <strong>1:1000</strong>. While both are extremely high, FXTM's leverage is among the highest available from any regulated broker, appealing to experienced traders who want maximum position flexibility.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Spreads & Pricing</h3>
                  </div>
                  <p className="text-gray-600">
                    FXTM wins on raw pricing with spreads from <strong>0.0 pips</strong> on ECN accounts, while XM's spreads start at <strong>1.0 pips</strong>. For high-frequency or scalping strategies, FXTM's tighter spreads can significantly reduce trading costs.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Education & Support</h3>
                  </div>
                  <p className="text-gray-600">
                    XM stands out with its <strong>extensive educational program</strong> including live webinars, in-person seminars, and a comprehensive learning center. FXTM offers basic educational resources but doesn't match XM's depth and variety of learning materials.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Account Flexibility</h3>
                  </div>
                  <p className="text-gray-600">
                    XM offers <strong>4 account types</strong> compared to FXTM's <strong>3 account types</strong>, providing more options for traders at different experience levels. XM's lower $5 minimum deposit also makes it easier to start with a smaller commitment.
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
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">
                    Choose XM if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want the lowest possible minimum deposit ($5)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Value comprehensive educational resources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want more account types to choose from</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Prefer a broker with a longer track record</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a
                      href={getAffiliateUrl("xm", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("xm", "compare_xm_fxtm", "bottom_cta")}
                    >
                      Open XM Account
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Choose FXTM if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Want the highest leverage available (1:2000)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Need raw spreads from 0.0 pips for scalping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Are interested in copy trading features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Prioritize lowest possible trading costs</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" asChild>
                    <a
                      href={getAffiliateUrl("fxtm", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("fxtm", "compare_xm_fxtm", "bottom_cta")}
                    >
                      Open FXTM Account
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
                  to="/compare/etoro-vs-xm/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  eToro vs XM
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

export default XMvsFXTM;
