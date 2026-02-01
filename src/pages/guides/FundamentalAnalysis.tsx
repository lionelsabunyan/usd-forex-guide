import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Newspaper, ArrowLeft, Clock, Calendar, TrendingUp, TrendingDown, AlertCircle, DollarSign, Users, BarChart3, Globe, Building2 } from "lucide-react";
import SEO from "@/components/SEO";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const FundamentalAnalysis = () => {
  const tocItems = [
    { id: "what-is-fundamental", title: "What is Fundamental Analysis?", level: 2 },
    { id: "economic-indicators", title: "Key Economic Indicators", level: 2 },
    { id: "central-banks", title: "Central Bank Policy", level: 2 },
    { id: "economic-calendar", title: "Using the Economic Calendar", level: 2 },
    { id: "news-trading", title: "News Trading Strategies", level: 2 },
    { id: "combining-analysis", title: "Combining Technical & Fundamental", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "What is the difference between fundamental and technical analysis?",
      answer: "Fundamental analysis examines economic factors, news, and data to understand WHY currencies move, while technical analysis studies price charts and patterns to predict WHEN and WHERE to trade. Most successful traders use both: fundamentals for direction and technicals for timing."
    },
    {
      question: "Which economic indicators are most important for forex?",
      answer: "The most market-moving indicators are: Interest rate decisions, Non-Farm Payrolls (NFP), GDP reports, CPI (inflation), and Central Bank statements. These 'high impact' events can move currency pairs by 50-100+ pips within minutes of release."
    },
    {
      question: "What is hawkish vs dovish monetary policy?",
      answer: "Hawkish policy focuses on fighting inflation through higher interest rates, which typically strengthens the currency. Dovish policy prioritizes economic growth through lower rates, which usually weakens the currency. Central bank language is closely watched for hints about future policy direction."
    },
    {
      question: "Should beginners trade news events?",
      answer: "News trading is risky for beginners due to extreme volatility, widened spreads, and fast-moving prices. It's better to start by understanding how news affects currencies and avoiding trading during major releases. As you gain experience, you can develop news trading strategies with proper risk management."
    },
    {
      question: "How do interest rates affect currency values?",
      answer: "Higher interest rates typically strengthen a currency because they attract foreign investment seeking better returns. The interest rate differential between two countries is a major driver of forex pair movements. For example, if the Fed raises rates while the ECB holds, USD typically strengthens against EUR."
    },
    {
      question: "How far in advance should I check the economic calendar?",
      answer: "Check the calendar at least a day in advance to identify high-impact events. Many traders review the weekly calendar every Sunday. Before trading, always check for any news in the next few hours that could affect your pairs. Avoid opening new positions just before major releases."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Fundamental Analysis Guide 2026: Economic Indicators & Central Banks"
        description="Master forex fundamental analysis in 2026. Learn economic indicators, central bank policies, interest rates, NFP, GDP, and how news events move currency markets."
        canonical="/guides/fundamental-analysis"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Fundamental Analysis Guide for Forex Trading 2026",
          "description": "Complete guide to fundamental analysis including economic indicators, central bank policies, and news trading strategies for forex traders.",
          "author": { "@type": "Organization", "name": "US Forex Guide" },
          "publisher": { "@type": "Organization", "name": "US Forex Guide" },
          "datePublished": "2024-01-15",
          "dateModified": "2026-02-01"
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
                <span>18 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Fundamental Analysis <span className="text-gradient-gold">Guide 2026</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Understand how economic data, central bank policies, and news events drive currency prices.
            Learn to use the economic calendar and trade around major releases.
          </p>
          <LastUpdated date="February 2026" reviewedBy="Economics Research Team" />
        </div>
      </section>

      {/* Content with TOC */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">

              {/* Key Statistics */}
              <StatHighlight
                title="Fundamental Analysis Impact"
                stats={[
                  { value: "$7.5T", label: "Daily Volume", description: "Global forex market" },
                  { value: "50-100", label: "Pip Moves", description: "On NFP days" },
                  { value: "8", label: "Major Banks", description: "Set global policy" },
                  { value: "24/5", label: "Market Hours", description: "News impacts vary" }
                ]}
                source="BIS Triennial Survey 2025, Market data"
              />

              {/* What is Fundamental Analysis */}
              <section id="what-is-fundamental" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">What is Fundamental Analysis?</h2>
                <p className="text-muted-foreground mb-4">
                  Fundamental analysis evaluates currencies by examining economic, social, and political factors
                  that influence supply and demand. While technical analysis focuses on "what" is happening,
                  fundamental analysis explains "why" it's happening.
                </p>

                <QuotableFact type="money">
                  The forex market trades over $7.5 trillion daily, making it the largest financial market
                  in the world. Economic data releases can move billions of dollars in seconds.
                </QuotableFact>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-4">
                  <h4 className="font-semibold mb-2">The Basic Principle</h4>
                  <p className="text-sm text-muted-foreground">
                    A country's currency value is largely determined by the strength of its economy.
                    <strong> Strong economic data typically strengthens a currency, while weak data weakens it.</strong>
                    Understanding this relationship is the foundation of fundamental analysis.
                  </p>
                </div>
              </section>

              {/* Key Economic Indicators */}
              <section id="economic-indicators" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-6">Key Economic Indicators</h2>
                <p className="text-muted-foreground mb-6">
                  Economic indicators are statistics that reveal the health of a country's economy.
                  Here are the most important indicators that move forex markets:
                </p>

                <div className="space-y-4">
                  {/* GDP */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
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
                            <p className="text-xs text-green-600 mt-1">Bullish for the currency</p>
                          </div>
                          <div className="bg-red-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-red-700">
                              <TrendingDown className="w-4 h-4" />
                              <span className="font-medium">Lower than expected</span>
                            </div>
                            <p className="text-xs text-red-600 mt-1">Bearish for the currency</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interest Rates */}
                  <div className="bg-card border border-border rounded-xl p-6 border-primary/50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">Interest Rates</h3>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Highest Impact</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          Set by central banks, interest rates are the most important factor in currency valuation.
                          Higher rates attract foreign investment, increasing demand for the currency.
                        </p>
                        <QuotableFact type="stat">
                          Interest rate decisions are the single most important fundamental factor for forex.
                          A surprise rate change can move currency pairs by 100-200 pips in minutes.
                        </QuotableFact>
                      </div>
                    </div>
                  </div>

                  {/* Inflation (CPI) */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
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
                            <strong>Key insight:</strong> High inflation can be bullish (may lead to rate hikes) or bearish
                            (erodes purchasing power). Context and central bank stance matter!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Employment */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
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
                            <li>• <strong>Non-Farm Payrolls (NFP):</strong> Released first Friday of each month - most watched report</li>
                            <li>• <strong>Unemployment Rate:</strong> Released with NFP</li>
                            <li>• <strong>ADP Employment:</strong> Released 2 days before NFP as a preview</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <QuotableFact type="stat">
                  The US Non-Farm Payrolls (NFP) report, released the first Friday of each month at 8:30 AM ET,
                  is the most anticipated economic event in forex trading, often causing 50-100 pip moves in USD pairs.
                </QuotableFact>
              </section>

              {/* Central Bank Policy */}
              <section id="central-banks" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Central Bank Policy</h2>
                <p className="text-muted-foreground mb-4">
                  Central banks control monetary policy and have massive influence on currency values.
                  Understanding their stance is crucial for fundamental traders.
                </p>

                {/* Major Central Banks */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Major Central Banks</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <h4 className="font-medium text-sm">Federal Reserve (Fed)</h4>
                      <p className="text-xs text-muted-foreground">United States - USD</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <h4 className="font-medium text-sm">European Central Bank (ECB)</h4>
                      <p className="text-xs text-muted-foreground">Eurozone - EUR</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <h4 className="font-medium text-sm">Bank of England (BoE)</h4>
                      <p className="text-xs text-muted-foreground">United Kingdom - GBP</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <h4 className="font-medium text-sm">Bank of Japan (BoJ)</h4>
                      <p className="text-xs text-muted-foreground">Japan - JPY</p>
                    </div>
                  </div>
                </div>

                {/* Hawkish vs Dovish */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800">Hawkish Policy</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Focus on controlling inflation through higher interest rates or tighter monetary policy.
                    </p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Higher interest rates</li>
                      <li>• Reduced money supply</li>
                      <li>• <strong>Generally bullish for the currency</strong></li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-red-800">Dovish Policy</h3>
                    </div>
                    <p className="text-sm text-red-700 mb-3">
                      Focus on stimulating economic growth through lower interest rates or looser monetary policy.
                    </p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Lower interest rates</li>
                      <li>• Increased money supply</li>
                      <li>• <strong>Generally bearish for the currency</strong></li>
                    </ul>
                  </div>
                </div>

                <QuotableFact type="quote">
                  "Don't fight the Fed" - This famous trading adage means you shouldn't trade against
                  central bank policy. When a central bank is hawkish, the currency tends to strengthen,
                  regardless of other factors.
                </QuotableFact>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold mb-3">What to Monitor from Central Banks</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Interest rate decisions:</strong> The actual rate change and future guidance</li>
                    <li>• <strong>Policy statements:</strong> Language changes signal future policy direction</li>
                    <li>• <strong>Press conferences:</strong> Central bank chair comments can move markets</li>
                    <li>• <strong>Meeting minutes:</strong> Released weeks later, shows internal debate</li>
                    <li>• <strong>Economic projections:</strong> GDP, inflation, and rate forecasts</li>
                  </ul>
                </div>
              </section>

              {/* Economic Calendar */}
              <section id="economic-calendar" className="mb-12 scroll-mt-24">
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
                  <div className="grid md:grid-cols-4 gap-3 text-center text-sm">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Date & Time</div>
                      <p className="text-xs text-muted-foreground">When the data releases</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Previous</div>
                      <p className="text-xs text-muted-foreground">Last reported value</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Forecast</div>
                      <p className="text-xs text-muted-foreground">Analyst expectation</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="font-medium mb-1">Actual</div>
                      <p className="text-xs text-muted-foreground">Released value</p>
                    </div>
                  </div>
                </div>

                <QuotableFact type="stat">
                  Markets react to surprises, not the data itself. If NFP comes in at 200K jobs versus
                  an expected 150K, the dollar typically rallies - even if 200K isn't historically strong.
                </QuotableFact>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-semibold mb-3">Impact Levels Explained</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm"><strong>High Impact:</strong> Can move markets 50-100+ pips (NFP, rate decisions, GDP)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="text-sm"><strong>Medium Impact:</strong> 20-50 pip moves typical (PMI, trade balance)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm"><strong>Low Impact:</strong> Usually minor effect, 5-20 pips</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* News Trading */}
              <section id="news-trading" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">News Trading Strategies</h2>
                <p className="text-muted-foreground mb-6">
                  Trading around news events can be profitable but carries significant risks.
                  Here are the main approaches:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">1</span>
                      Trade the Expectation
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Position yourself before the news based on expectations. If data is expected to be strong,
                      buy the currency beforehand.
                    </p>
                    <p className="text-xs text-amber-600">
                      <strong>Risk:</strong> The market may have already priced in the expectation
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">2</span>
                      Trade the Reaction
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Wait for the actual release and trade based on whether it beats or misses expectations.
                      Trade in the direction of the initial move.
                    </p>
                    <p className="text-xs text-amber-600">
                      <strong>Risk:</strong> Requires fast execution; spreads widen during releases
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">3</span>
                      Fade the News (Advanced)
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Trade against the initial market reaction, expecting a reversal.
                      Used when the initial reaction appears overdone.
                    </p>
                    <p className="text-xs text-amber-600">
                      <strong>Risk:</strong> High risk; requires experience to identify overdone moves
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">News Trading Risks</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• <strong>Extreme volatility:</strong> 50-100+ pip moves in seconds</li>
                        <li>• <strong>Widened spreads:</strong> Spreads can increase 5-10x during releases</li>
                        <li>• <strong>Slippage:</strong> Orders may fill at worse prices than expected</li>
                        <li>• <strong>Whipsaw:</strong> Price may move both directions rapidly</li>
                        <li>• <strong>Stop hunting:</strong> Stops can be triggered before the real move</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Combining Analysis */}
              <section id="combining-analysis" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Combining Fundamental & Technical Analysis</h2>
                <p className="text-muted-foreground mb-4">
                  The most successful traders combine both approaches for better results.
                </p>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-4">The Winning Combination</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold">Use fundamentals for direction</h5>
                        <p className="text-sm text-muted-foreground">Determine whether to be bullish or bearish on a currency based on economic outlook</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold">Use technicals for timing</h5>
                        <p className="text-sm text-muted-foreground">Find optimal entry points, stop-loss levels, and take-profit targets</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold">Be aware of the calendar</h5>
                        <p className="text-sm text-muted-foreground">Know when major releases are scheduled and adjust your trading accordingly</p>
                      </div>
                    </div>
                  </div>
                </div>

                <QuotableFact type="quote">
                  "Fundamentals tell you WHAT to trade, technicals tell you WHEN to trade."
                  Combining both gives you a significant edge over traders who use only one approach.
                </QuotableFact>
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA variant="inline" className="mb-12" />

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-24">
                <FAQSection
                  faqs={faqs}
                  title="Fundamental Analysis FAQ"
                />
              </section>

              {/* Next Steps */}
              <section className="mb-12">
                <h2 className="text-2xl font-heading font-bold mb-4">Related Guides</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/guides/technical-analysis" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Technical Analysis Basics</h3>
                    <p className="text-sm text-muted-foreground">Learn to read charts and identify trading patterns.</p>
                  </Link>
                  <Link to="/guides/risk-management" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Risk Management</h3>
                    <p className="text-sm text-muted-foreground">Protect your capital during volatile news events.</p>
                  </Link>
                </div>
              </section>

              {/* Final Newsletter CTA */}
              <NewsletterCTA />

            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default FundamentalAnalysis;
