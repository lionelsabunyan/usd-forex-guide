import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Clock, CheckCircle, AlertCircle, Ban, FileCheck } from "lucide-react";
import SEO from "@/components/SEO";

const USForexRegulations = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="US Forex Regulations Guide | CFTC, NFA & Legal Requirements"
        description="Complete guide to US forex regulations. Learn about CFTC, NFA requirements, legal trading options for Americans, and how to trade forex legally in the USA."
        canonical="/guides/us-forex-regulations"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "US Forex Regulations Guide",
          "description": "Understanding the regulatory landscape for forex trading in the United States including CFTC and NFA requirements.",
          "author": { "@type": "Organization", "name": "US Forex Guide" },
          "publisher": { "@type": "Organization", "name": "US Forex Guide" },
          "datePublished": "2024-01-15",
          "dateModified": "2026-01-15"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/guides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Intermediate</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Forex Trading in the <span className="text-gradient-gold">United States</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Understand the regulatory landscape for US-based traders. Learn about CFTC, NFA requirements, 
            and how to trade legally and safely.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Overview of US Forex Regulations</h2>
              <p className="text-muted-foreground mb-4">
                The United States has one of the most stringent regulatory frameworks for Forex trading in the world. 
                While this provides strong consumer protections, it also means fewer broker choices for American traders.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Important</h4>
                    <p className="text-sm text-amber-700">
                      US residents can only legally trade Forex with brokers registered with the CFTC and members of the NFA. 
                      Using unregulated offshore brokers may violate US law and offers no legal protection.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Regulatory Bodies */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Key Regulatory Bodies</h2>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">CFTC (Commodity Futures Trading Commission)</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        The primary federal regulatory agency overseeing Forex trading in the US. The CFTC protects 
                        market participants from fraud, manipulation, and abusive practices.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Regulates Forex dealers and intermediaries</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Sets capital requirements for brokers</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Enforces compliance through audits and penalties</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">NFA (National Futures Association)</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        A self-regulatory organization that works alongside the CFTC. All retail Forex dealers 
                        must be NFA members.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Requires $20 million minimum capital for dealers</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Conducts background checks on industry professionals</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Handles dispute resolution between traders and brokers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Leverage Limits */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Leverage Limits in the US</h2>
              <p className="text-muted-foreground mb-4">
                US regulations impose strict leverage limits to protect retail traders from excessive risk:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50:1</div>
                  <div className="font-semibold mb-1">Major Currency Pairs</div>
                  <p className="text-sm text-muted-foreground">EUR/USD, GBP/USD, USD/JPY, etc.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">20:1</div>
                  <div className="font-semibold mb-1">Minor & Exotic Pairs</div>
                  <p className="text-sm text-muted-foreground">USD/TRY, EUR/PLN, etc.</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-2">Comparison with Other Regions</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-700">United States</div>
                    <div className="text-blue-600">50:1 max</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-700">European Union</div>
                    <div className="text-blue-600">30:1 max</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-700">Offshore Brokers</div>
                    <div className="text-blue-600">Up to 500:1</div>
                  </div>
                </div>
              </div>
            </section>

            {/* FIFO and Hedging */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">FIFO Rule and Hedging Restrictions</h2>
              
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">FIFO (First In, First Out)</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    When you have multiple positions in the same currency pair, you must close them in the order 
                    they were opened. You cannot selectively choose which position to close first.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Example:</strong> If you open 3 buy positions on EUR/USD, you must close the first 
                      one before you can close the second or third.
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Ban className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">No Hedging Allowed</h3>
                      <p className="text-muted-foreground text-sm">
                        US-regulated brokers cannot allow traders to hold opposing positions (buy and sell) 
                        on the same currency pair simultaneously. This is different from most international brokers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Brokers */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">CFTC/NFA Registered Brokers</h2>
              <p className="text-muted-foreground mb-4">
                Due to strict regulatory requirements, only a handful of brokers are registered to offer 
                Forex trading to US residents:
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-green-800 mb-3">How to Verify a Broker</h4>
                <ol className="space-y-2">
                  <li className="flex items-start gap-2 text-green-700">
                    <span className="font-semibold">1.</span>
                    <span>Visit the NFA's BASIC (Background Affiliation Status Information Center) website</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <span className="font-semibold">2.</span>
                    <span>Search for the broker by name or NFA ID number</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <span className="font-semibold">3.</span>
                    <span>Verify their registration status and check for any regulatory actions</span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Warning About Offshore Brokers</h4>
                    <p className="text-sm text-red-700">
                      Some offshore brokers accept US clients despite not being registered. Using these brokers 
                      may violate US law, and you have no legal recourse if something goes wrong. Always verify 
                      broker registration before depositing funds.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/guides/broker-comparison" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">How to Compare Brokers</h3>
                  <p className="text-sm text-muted-foreground">Learn what to look for when choosing a broker.</p>
                </Link>
                <Link to="/" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Broker Reviews</h3>
                  <p className="text-sm text-muted-foreground">Read our in-depth reviews of popular brokers.</p>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default USForexRegulations;
