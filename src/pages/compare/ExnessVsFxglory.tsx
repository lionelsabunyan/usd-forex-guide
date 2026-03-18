import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { CheckCircle, Trophy, ArrowRight, ExternalLink, Star, Shield, Zap, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

const ExnessVsFxglory = () => {
  const exness = brokers.exness;
  const fxglory = brokers.fxglory;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Exness vs FXGlory 2026: Which Broker is Better for US Traders?",
    "description": "Detailed comparison of Exness and FXGlory for forex traders. Compare regulation, spreads, leverage, deposits, and US client acceptance.",
    "datePublished": "2026-03-18",
    "dateModified": "2026-03-18",
    "author": {
      "@type": "Organization",
      "name": "Beginner FX Guide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Beginner FX Guide",
      "url": "https://beginnerfxguide.com"
    }
  };

  const comparisonData = [
    { category: "Overall Rating", exness: "4.7/5", fxglory: "4.9/5", winner: "fxglory" as const },
    { category: "Min. Deposit", exness: "$10", fxglory: "$1", winner: "fxglory" as const },
    { category: "Max Leverage", exness: "1:2000", fxglory: "1:3000", winner: "fxglory" as const },
    { category: "Spreads From", exness: "0.0 pips", fxglory: "0.1 pips", winner: "exness" as const },
    { category: "Regulation", exness: "FCA, CySEC, FSA, FSCA", fxglory: "SVG FSA (Offshore)", winner: "exness" as const },
    { category: "Platforms", exness: "MT4, MT5, Exness Terminal", fxglory: "MT4, MT5", winner: "exness" as const },
    { category: "US Clients", exness: "Not Accepted", fxglory: "Accepted", winner: "fxglory" as const },
    { category: "Crypto Deposits", exness: "Yes", fxglory: "Yes", winner: "tie" as const },
    { category: "Founded", exness: "2008", fxglory: "2011", winner: "exness" as const },
    { category: "Payment Methods", exness: "Cards, Wire, E-wallets, Crypto", fxglory: "Crypto, Wire, Cards", winner: "exness" as const },
  ];

  const faqs = [
    {
      question: "Does Exness or FXGlory accept US clients?",
      answer: "FXGlory accepts US clients as it operates as an offshore broker (SVG FSA). Exness does NOT accept US clients due to its FCA and CySEC regulations which prevent them from serving US residents. If you're a US trader, FXGlory is the only option between these two."
    },
    {
      question: "Which broker is safer: Exness or FXGlory?",
      answer: "Exness is significantly safer from a regulatory standpoint, holding licenses from the FCA (UK), CySEC (Cyprus), FSCA (South Africa), and FSA (Seychelles). FXGlory operates under SVG FSA (offshore) which provides minimal regulatory protection. However, FXGlory has a solid 13+ year track record."
    },
    {
      question: "Which broker has better spreads: Exness or FXGlory?",
      answer: "Exness offers better raw spreads starting from 0.0 pips on their Raw Spread and Zero accounts. FXGlory's spreads start from 0.1 pips on Standard accounts. For cost-conscious traders, Exness has the edge on trading costs."
    },
    {
      question: "Can I use high leverage with Exness and FXGlory?",
      answer: "Both brokers offer very high leverage. FXGlory offers up to 1:3000 leverage, which is among the highest in the industry. Exness offers up to 1:2000 (unlimited for some account types). Remember that high leverage significantly increases both potential profits and losses."
    },
    {
      question: "Which broker is better for beginners: Exness or FXGlory?",
      answer: "For non-US beginners, Exness is better due to stronger regulation and a proprietary terminal with educational features. For US-based beginners, FXGlory is the clear choice as Exness doesn't accept US clients. FXGlory's $1 minimum deposit also makes it more accessible."
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
        title="Exness vs FXGlory 2026: Detailed Comparison for Forex Traders"
        description="Exness vs FXGlory comparison: Which forex broker is better? Compare regulation, spreads, leverage, minimum deposits, and US client acceptance in our detailed 2026 review."
        canonical="/compare/exness-vs-fxglory/"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                Updated March 2026
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Exness vs FXGlory
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Regulated giant vs offshore US-friendly broker — which one suits your trading needs in 2026?
              </p>

              {/* Quick Verdict */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h2 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Quick Verdict
                </h2>
                <p className="text-slate-200">
                  <strong className="text-white">Exness wins on regulation and spreads</strong> — it's a tier-1 regulated broker with 0.0 pip raw spreads. However, <strong className="text-white">FXGlory is the only choice for US traders</strong> as Exness doesn't accept US clients. FXGlory also wins on leverage (1:3000) and minimum deposit ($1). Choose based on your location and priorities.
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
                {/* Exness Card */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-500 overflow-hidden">
                  <div className="bg-emerald-500 text-white text-center py-2 text-sm font-semibold">
                    BEST REGULATION & SPREADS
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
                        <span className="font-semibold">{exness.leverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold text-emerald-600">{exness.regulation}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">US Clients</span>
                        <span className="font-semibold text-red-500">Not Accepted</span>
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
                          onClick={() => trackAffiliateClick("exness", "compare_exness_fxglory", "open_account")}
                        >
                          Visit Exness
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

                {/* FXGlory Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    BEST FOR US TRADERS
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{fxglory.name}</h3>
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{fxglory.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Deposit</span>
                        <span className="font-semibold text-blue-600">{fxglory.minDepositDisplay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spreads</span>
                        <span className="font-semibold">{fxglory.spreads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leverage</span>
                        <span className="font-semibold">{fxglory.leverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Regulation</span>
                        <span className="font-semibold">{fxglory.regulation}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">US Clients</span>
                        <span className="font-semibold text-green-500">Accepted</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {fxglory.pros.slice(0, 4).map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                        <a
                          href={getAffiliateUrl("fxglory", UTM_CONFIGS.COMPARE_PAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAffiliateClick("fxglory", "compare_exness_fxglory", "open_account")}
                        >
                          Open FXGlory Account
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/review/fxglory/">
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
                      <th className="text-center p-4 font-semibold text-emerald-700">Exness</th>
                      <th className="text-center p-4 font-semibold text-blue-700">FXGlory</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-medium text-gray-900">{row.category}</td>
                        <td className={`p-4 text-center ${row.winner === 'exness' ? 'bg-emerald-50 font-semibold text-emerald-700' : ''}`}>
                          {row.exness}
                        </td>
                        <td className={`p-4 text-center ${row.winner === 'fxglory' ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}>
                          {row.fxglory}
                        </td>
                        <td className="p-4 text-center">
                          {row.winner === 'exness' && <span className="text-emerald-600 font-semibold">Exness</span>}
                          {row.winner === 'fxglory' && <span className="text-blue-600 font-semibold">FXGlory</span>}
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
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Regulation</h3>
                  </div>
                  <p className="text-gray-600">
                    Exness holds tier-1 licenses from <strong>FCA and CySEC</strong>, offering strong client fund protection and segregated accounts. FXGlory operates under <strong>SVG FSA (offshore)</strong> with minimal regulatory oversight. If safety is your priority, Exness is clearly superior.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">US Client Acceptance</h3>
                  </div>
                  <p className="text-gray-600">
                    This is the <strong>biggest differentiator</strong>. Exness does not accept US clients due to regulatory restrictions. FXGlory <strong>welcomes US traders</strong>, making it the only option for Americans comparing these two brokers.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Leverage & Trading</h3>
                  </div>
                  <p className="text-gray-600">
                    FXGlory offers <strong>1:3000 leverage</strong> — among the highest in the industry. Exness offers up to <strong>1:2000</strong> (unlimited on some accounts). Both provide high leverage for aggressive traders, but remember this amplifies losses equally.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Trading Costs</h3>
                  </div>
                  <p className="text-gray-600">
                    Exness has tighter spreads starting from <strong>0.0 pips</strong> on Raw Spread accounts. FXGlory starts from <strong>0.1 pips</strong>. For high-volume traders, Exness's lower spread costs can save significant money over time.
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
                    Choose Exness if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Are NOT a US resident</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Prioritize strong regulation and fund safety</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Want the tightest possible spreads (0.0 pips)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Prefer a proprietary trading terminal alongside MT4/MT5</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a
                      href={getAffiliateUrl("exness", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("exness", "compare_exness_fxglory", "bottom_cta")}
                    >
                      Visit Exness
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Choose FXGlory if you:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Are a US trader (Exness won't accept you)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Want to start with just $1 minimum deposit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Need maximum leverage (1:3000)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Want 24/7 customer support availability</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" asChild>
                    <a
                      href={getAffiliateUrl("fxglory", UTM_CONFIGS.COMPARE_PAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("fxglory", "compare_exness_fxglory", "bottom_cta")}
                    >
                      Open FXGlory Account
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

              {/* FAQ Schema */}
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
                  to="/compare/midasfx-vs-hankotrade/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  MidasFX vs Hankotrade
                </Link>
                <Link
                  to="/compare/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  Compare All Brokers
                </Link>
                <Link
                  to="/guides/forex-trading-usa/"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
                >
                  Forex Trading in USA Guide
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

export default ExnessVsFxglory;
