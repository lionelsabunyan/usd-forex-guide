import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Newspaper, ArrowLeft, Clock, Calendar, TrendingUp, TrendingDown, AlertCircle, DollarSign, Users, BarChart3 } from "lucide-react";
import SEO from "@/components/SEO";

const FundamentalAnalysis = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Fundamental Analysis Guide for Forex | Economic Indicators"
        description="Learn fundamental analysis for forex trading. Understand economic indicators, central bank policies, interest rates, and how news affects currency prices."
        canonical="/guides/fundamental-analysis"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Fundamental Analysis Guide for Forex Trading",
          "description": "Complete guide to fundamental analysis including economic indicators, central bank policies, and news trading.",
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
              <Newspaper className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Advanced</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Fundamental Analysis <span className="text-gradient-gold">Guide</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Understand how economic data affects currency prices. Learn to use the economic calendar 
            and trade news events effectively.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">What is Fundamental Analysis?</h2>
              <p className="text-muted-foreground mb-4">
                Fundamental analysis evaluates currencies by examining economic, social, and political factors 
                that influence supply and demand. While technical analysis focuses on "what" is happening, 
                fundamental analysis explains "why" it's happening.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h4 className="font-semibold mb-2">The Basic Principle</h4>
                <p className="text-sm text-muted-foreground">
                  A country's currency value is largely determined by the strength of its economy. 
                  Strong economic data typically strengthens a currency, while weak data weakens it.
                </p>
              </div>
            </section>

            {/* Key Economic Indicators */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6">Key Economic Indicators</h2>
              
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">GDP (Gross Domestic Product)</h3>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High Impact</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        The total value of goods and services produced in a country. The broadest measure of economic health.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-green-700">
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-medium">Higher than expected</span>
                          </div>
                          <p className="text-xs text-green-600 mt-1">Bullish for currency</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-red-700">
                            <TrendingDown className="w-4 h-4" />
                            <span className="font-medium">Lower than expected</span>
                          </div>
                          <p className="text-xs text-red-600 mt-1">Bearish for currency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">Interest Rates</h3>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High Impact</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Set by central banks, interest rates are one of the most important factors in currency valuation. 
                        Higher rates attract foreign investment, increasing demand for the currency.
                      </p>
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Major Central Banks</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <li>• Federal Reserve (USD)</li>
                          <li>• European Central Bank (EUR)</li>
                          <li>• Bank of England (GBP)</li>
                          <li>• Bank of Japan (JPY)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">Inflation (CPI)</h3>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High Impact</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Consumer Price Index measures the change in prices of goods and services. 
                        Central banks monitor inflation closely to guide interest rate decisions.
                      </p>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                        <p className="text-amber-700">
                          <strong>Note:</strong> High inflation can be bullish (may lead to rate hikes) or bearish 
                          (erodes purchasing power). Context matters!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">Employment Data</h3>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High Impact</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Unemployment rate and job creation data indicate economic health. 
                        Strong employment supports consumer spending and economic growth.
                      </p>
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Key US Employment Reports</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• <strong>Non-Farm Payrolls (NFP):</strong> Released first Friday of each month</li>
                          <li>• <strong>Unemployment Rate:</strong> Released with NFP</li>
                          <li>• <strong>ADP Employment:</strong> Released 2 days before NFP</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Economic Calendar */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Using the Economic Calendar</h2>
              <p className="text-muted-foreground mb-4">
                The economic calendar lists scheduled economic events and data releases. 
                It's an essential tool for fundamental traders.
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">What to Look For</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-3 text-center text-sm">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Date & Time</div>
                      <p className="text-xs text-muted-foreground">When the data is released</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Previous</div>
                      <p className="text-xs text-muted-foreground">Last reported value</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Forecast</div>
                      <p className="text-xs text-muted-foreground">Expected value</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Actual</div>
                      <p className="text-xs text-muted-foreground">Released value</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h4 className="font-semibold mb-3">Impact Levels</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm"><strong>High Impact:</strong> Can move markets significantly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm"><strong>Medium Impact:</strong> Moderate market reaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm"><strong>Low Impact:</strong> Usually minor effect</span>
                  </div>
                </div>
              </div>
            </section>

            {/* News Trading */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">News Trading Strategies</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">1. Trade the Expectation</h3>
                  <p className="text-muted-foreground text-sm">
                    Position yourself before the news based on expectations. If data is expected to be strong, 
                    buy the currency beforehand. Risk: The market may have already priced in the expectation.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">2. Trade the News</h3>
                  <p className="text-muted-foreground text-sm">
                    Wait for the actual release and trade based on whether it beats or misses expectations. 
                    Requires fast execution and can be volatile.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">3. Fade the News</h3>
                  <p className="text-muted-foreground text-sm">
                    Trade against the initial market reaction, expecting a reversal. 
                    Higher risk but can be profitable if the initial reaction is overdone.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Risks of News Trading</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Extreme volatility and slippage</li>
                      <li>• Widened spreads during news events</li>
                      <li>• Whipsaw price action</li>
                      <li>• Fast-moving markets can trigger stop-losses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Central Bank Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Central Bank Policy</h2>
              <p className="text-muted-foreground mb-4">
                Central banks control monetary policy and have massive influence on currency values. 
                Understanding their stance is crucial for fundamental traders.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Hawkish Policy</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Focus on controlling inflation, typically through higher interest rates.
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Generally bullish for the currency
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-800">Dovish Policy</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-3">
                    Focus on stimulating growth, typically through lower interest rates.
                  </p>
                  <p className="text-xs text-red-600 font-medium">
                    Generally bearish for the currency
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold mb-3">What to Monitor</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Interest rate decisions and statements</li>
                  <li>• Meeting minutes and transcripts</li>
                  <li>• Press conferences and speeches</li>
                  <li>• Forward guidance and projections</li>
                  <li>• Quantitative easing/tightening programs</li>
                </ul>
              </div>
            </section>

            {/* Combining Analysis */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Combining Fundamental & Technical Analysis</h2>
              <p className="text-muted-foreground mb-4">
                The most successful traders often combine both approaches:
              </p>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">1.</span>
                    <span><strong>Use fundamentals for direction</strong> - Determine whether to be bullish or bearish on a currency</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">2.</span>
                    <span><strong>Use technicals for timing</strong> - Find optimal entry and exit points</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">3.</span>
                    <span><strong>Avoid fighting the trend</strong> - Don't trade against strong fundamental forces</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">4.</span>
                    <span><strong>Be aware of events</strong> - Know when major releases are scheduled</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/guides/technical-analysis" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Technical Analysis Basics</h3>
                  <p className="text-sm text-muted-foreground">Learn to read charts and identify patterns.</p>
                </Link>
                <Link to="/guides/risk-management" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Risk Management</h3>
                  <p className="text-sm text-muted-foreground">Protect your capital during volatile news events.</p>
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

export default FundamentalAnalysis;
