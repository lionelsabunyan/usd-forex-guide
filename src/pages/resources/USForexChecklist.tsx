import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Download, CheckCircle, Shield, BookOpen, Calculator, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendLeadMagnetEmail } from "@/lib/emailService";

const USForexChecklist = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send email via EmailJS
      const success = await sendLeadMagnetEmail({ email });

      if (success) {
        setSubmitted(true);
        // Track conversion
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "lead_magnet_download", {
            email_captured: true,
          });
        }
      }
    } catch {
      // Email sending failed - user sees no success message
    }

    setLoading(false);
  };

  const checklistPreview = [
    {
      category: "Before You Start Trading",
      items: [
        "Understand CFTC/NFA regulations for US traders",
        "Learn the difference between regulated vs offshore brokers",
        "Know the maximum leverage limits (1:50 for majors)",
        "Understand FIFO rule implications",
        "Research Section 988 vs 1256 tax treatment"
      ]
    },
    {
      category: "Choosing a Broker",
      items: [
        "Verify CFTC/NFA registration",
        "Compare spreads across major pairs",
        "Check minimum deposit requirements",
        "Review withdrawal policies and fees",
        "Test the trading platform with demo account"
      ]
    },
    {
      category: "Risk Management Essentials",
      items: [
        "Never risk more than 1-2% per trade",
        "Always use stop-loss orders",
        "Calculate position size before every trade",
        "Understand margin requirements",
        "Keep a trading journal"
      ]
    },
    {
      category: "Tax Preparation",
      items: [
        "Track all trades for tax reporting",
        "Understand Section 988 default treatment",
        "Consider electing Section 1256 treatment",
        "Keep records of deposits and withdrawals",
        "Consult a tax professional for forex income"
      ]
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free US Forex Trading Checklist",
    "description": "Download our free PDF checklist covering everything US traders need to know before starting forex trading."
  };

  return (
    <>
      <SEO
        title="Free US Forex Trading Checklist PDF - Essential Guide for American Traders"
        description="Download our free PDF checklist for US forex traders. Covers regulations, broker selection, risk management, and tax considerations. Essential reading before you start trading."
        canonical="/resources/us-forex-checklist"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm mb-6">
                    <Download className="w-4 h-4" />
                    Free PDF Download
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    US Forex Trading Checklist
                  </h1>
                  <p className="text-xl text-emerald-200 mb-6">
                    The essential checklist every American trader needs before starting forex trading. Covers regulations, broker selection, risk management, and taxes.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-emerald-200">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>20+ actionable items</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-200">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <span>CFTC/NFA compliance checklist</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-200">
                      <Calculator className="w-5 h-5 text-emerald-400" />
                      <span>Risk management framework</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-200">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                      <span>Tax preparation guide</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      {!submitted ? (
                        <>
                          <h3 className="text-xl font-bold text-white mb-4">
                            Get Your Free Checklist
                          </h3>

                          {/* Direct Download Button */}
                          <Button
                            asChild
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-4"
                            onClick={() => {
                              if (typeof window !== "undefined" && (window as any).gtag) {
                                (window as any).gtag("event", "lead_magnet_download", {
                                  method: "direct",
                                });
                              }
                            }}
                          >
                            <a href="/downloads/US-Forex-Checklist.pdf" download>
                              Download Free PDF
                              <Download className="w-4 h-4 ml-2" />
                            </a>
                          </Button>

                          {/* Optional Email Signup */}
                          <div className="border-t border-white/20 pt-4 mt-4">
                            <p className="text-sm text-emerald-200 mb-3 text-center">
                              Want weekly trading tips? Enter your email:
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-3">
                              <Input
                                type="email"
                                placeholder="Enter your email (optional)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                              />
                              <Button
                                type="submit"
                                variant="outline"
                                className="w-full border-emerald-400 text-emerald-200 hover:bg-emerald-500/20"
                                disabled={loading || !email}
                              >
                                {loading ? "Subscribing..." : "Subscribe to Updates"}
                              </Button>
                            </form>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">
                            You're Subscribed!
                          </h3>
                          <p className="text-emerald-200 mb-4">
                            We'll send weekly tips to {email}
                          </p>
                          <Button
                            asChild
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                          >
                            <a href="/downloads/US-Forex-Checklist.pdf" download>
                              Download PDF Again
                              <Download className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                What's Inside the Checklist
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                A preview of what you'll get in your free PDF
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {checklistPreview.map((section, i) => (
                  <Card key={i} className="bg-white">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        {section.category}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why This Checklist Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Why US Traders Need This Checklist
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Regulatory Complexity</h3>
                  <p className="text-sm text-muted-foreground">
                    US forex regulations are different from the rest of the world. CFTC rules, FIFO requirements, and leverage limits affect how you trade.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Broker Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Only a handful of brokers can legally serve US clients. This checklist helps you verify legitimacy and compare options.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Tax Implications</h3>
                  <p className="text-sm text-muted-foreground">
                    Forex profits are taxed differently. Understanding Section 988 vs 1256 treatment can save you thousands in taxes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Resources
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/guides/us-forex-regulations"
                  className="bg-white border border-gray-200 px-6 py-3 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  US Forex Regulations Guide
                </Link>
                <Link
                  to="/tools/forex-tax-calculator"
                  className="bg-white border border-gray-200 px-6 py-3 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  Forex Tax Calculator
                </Link>
                <Link
                  to="/brokers"
                  className="bg-white border border-gray-200 px-6 py-3 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  Compare US Brokers
                </Link>
                <Link
                  to="/guides/risk-management"
                  className="bg-white border border-gray-200 px-6 py-3 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  Risk Management Guide
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

export default USForexChecklist;
