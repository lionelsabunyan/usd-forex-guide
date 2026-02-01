import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Scale, ArrowLeft, Clock, CheckCircle, AlertCircle, DollarSign, Headphones, Shield, Zap } from "lucide-react";
import SEO from "@/components/SEO";

const BrokerComparisonGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="How to Compare Forex Brokers | Complete Comparison Guide"
        description="Learn how to compare forex brokers like a pro. Evaluate spreads, leverage, regulation, platforms, and find the best broker for your trading style."
        canonical="/guides/broker-comparison"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How to Compare Forex Brokers",
          "description": "Complete guide to evaluating and comparing forex brokers including key factors like spreads, regulation, and trading platforms.",
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
              <Scale className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Beginner</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            How to Compare <span className="text-gradient-gold">Forex Brokers</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A comprehensive guide to evaluating and comparing Forex brokers. Learn what factors matter most 
            for your trading success.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Why Broker Selection Matters</h2>
              <p className="text-muted-foreground mb-4">
                Your broker is your gateway to the Forex market. The right broker can enhance your trading experience, 
                while the wrong one can cost you money and cause frustration. This guide will help you evaluate 
                brokers based on the factors that matter most.
              </p>
            </section>

            {/* Key Factors */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6">Key Factors to Consider</h2>
              
              <div className="space-y-6">
                {/* Regulation */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">1. Regulation & Security</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        This is the most important factor. Only trade with brokers regulated by reputable authorities.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-lg p-3">
                          <h4 className="font-semibold text-green-800 text-sm mb-1">Top-Tier Regulators</h4>
                          <ul className="text-xs text-green-700 space-y-1">
                            <li>• CFTC/NFA (United States)</li>
                            <li>• FCA (United Kingdom)</li>
                            <li>• ASIC (Australia)</li>
                            <li>• CySEC (Cyprus/EU)</li>
                          </ul>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <h4 className="font-semibold text-amber-800 text-sm mb-1">Check For</h4>
                          <ul className="text-xs text-amber-700 space-y-1">
                            <li>• Valid license numbers</li>
                            <li>• Segregated client funds</li>
                            <li>• Compensation schemes</li>
                            <li>• Clean regulatory history</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spreads & Fees */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">2. Spreads & Fees</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Trading costs directly impact your profitability. Understand all fees before opening an account.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Spread Types</h4>
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium">Fixed Spread:</span>
                              <span className="text-muted-foreground"> Stays constant regardless of market conditions</span>
                            </div>
                            <div>
                              <span className="font-medium">Variable Spread:</span>
                              <span className="text-muted-foreground"> Changes based on market liquidity</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <h4 className="font-semibold mb-2">Other Fees to Consider:</h4>
                          <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Commission per trade
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Overnight swap rates
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Deposit/withdrawal fees
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Inactivity fees
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">3. Trading Platform</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Your platform is your workspace. It should be reliable, fast, and easy to use.
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-secondary/50 rounded-lg p-3 text-center">
                          <h4 className="font-semibold text-sm mb-1">MetaTrader 4</h4>
                          <p className="text-xs text-muted-foreground">Industry standard, great for beginners</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3 text-center">
                          <h4 className="font-semibold text-sm mb-1">MetaTrader 5</h4>
                          <p className="text-xs text-muted-foreground">More features, multi-asset support</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3 text-center">
                          <h4 className="font-semibold text-sm mb-1">Proprietary</h4>
                          <p className="text-xs text-muted-foreground">Broker's own platform, varies widely</p>
                        </div>
                      </div>
                      <div className="mt-4 text-sm">
                        <h4 className="font-semibold mb-2">Platform Features to Look For:</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                          <li>• Fast execution speed</li>
                          <li>• Advanced charting tools</li>
                          <li>• Mobile app availability</li>
                          <li>• One-click trading</li>
                          <li>• Custom indicators</li>
                          <li>• Demo account access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Support */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">4. Customer Support</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Good support is crucial, especially when dealing with money. Test support before depositing.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Support Channels</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 24/5 or 24/7 availability</li>
                            <li>• Live chat support</li>
                            <li>• Phone support</li>
                            <li>• Email response time</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Quality Indicators</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Multilingual support</li>
                            <li>• Quick response times</li>
                            <li>• Knowledgeable staff</li>
                            <li>• Issue resolution rate</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Comparison Checklist */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Broker Comparison Checklist</h2>
              <p className="text-muted-foreground mb-4">
                Use this checklist when evaluating brokers:
              </p>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Regulation & Security</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Licensed by reputable regulator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Segregated client funds</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Clean regulatory record</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Costs & Fees</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Competitive spreads</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>No hidden fees</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Free deposits/withdrawals</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Platform & Tools</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>MT4/MT5 or good proprietary platform</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Mobile trading app</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Demo account available</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Support & Service</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>24/5 or 24/7 support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Multiple contact methods</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                        <span>Positive user reviews</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Warning */}
            <section className="mb-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Red Flags to Watch For</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Unrealistic promises of guaranteed profits</li>
                      <li>• No or obscure regulation</li>
                      <li>• Pressure to deposit more money</li>
                      <li>• Difficulty withdrawing funds</li>
                      <li>• Too-good-to-be-true bonuses with complex terms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Ready to Compare?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Compare Brokers</h3>
                  <p className="text-sm text-muted-foreground">View our side-by-side broker comparison table.</p>
                </Link>
                <Link to="/guides/us-forex-regulations" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">US Forex Regulations</h3>
                  <p className="text-sm text-muted-foreground">Learn about trading legally in the United States.</p>
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

export default BrokerComparisonGuide;
