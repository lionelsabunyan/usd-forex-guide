import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { LineChart, ArrowLeft, Clock, TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import SEO from "@/components/SEO";

const TechnicalAnalysis = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Technical Analysis Guide for Forex | Charts, Indicators & Patterns"
        description="Master technical analysis for forex trading. Learn chart patterns, indicators, support/resistance, and how to analyze price action like a pro."
        canonical="/guides/technical-analysis"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Technical Analysis Guide for Forex Trading",
          "description": "Complete guide to technical analysis including chart patterns, indicators, and price action strategies.",
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
              <LineChart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Intermediate</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>20 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Technical Analysis <span className="text-gradient-gold">Basics</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Learn to read charts and identify trading opportunities. Understand key indicators, 
            patterns, and price action strategies.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">What is Technical Analysis?</h2>
              <p className="text-muted-foreground mb-4">
                Technical analysis is the study of past price movements to forecast future price direction. 
                It's based on the idea that price movements are not random and that historical patterns tend to repeat.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Core Principles</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Price discounts everything</strong> - All known information is reflected in the price</li>
                  <li>• <strong>Price moves in trends</strong> - Once established, trends tend to continue</li>
                  <li>• <strong>History repeats itself</strong> - Market psychology creates recurring patterns</li>
                </ul>
              </div>
            </section>

            {/* Chart Types */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Chart Types</h2>
              
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
                      <p className="text-muted-foreground text-sm">
                        The simplest chart type, connecting closing prices with a continuous line. 
                        Good for identifying overall trends at a glance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bar Chart (OHLC)</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Shows Open, High, Low, and Close for each period. Provides more information than line charts.
                      </p>
                      <div className="bg-secondary/50 rounded-lg p-3 text-xs">
                        <p><strong>Open:</strong> Horizontal tick on left</p>
                        <p><strong>Close:</strong> Horizontal tick on right</p>
                        <p><strong>High/Low:</strong> Top and bottom of vertical line</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 border-primary/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <LineChart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Candlestick Chart <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">Most Popular</span></h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        The most popular chart type among Forex traders. Shows the same OHLC data as bar charts 
                        but in a more visual format with colored "bodies".
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-lg p-3">
                          <h4 className="font-semibold text-green-800 text-sm mb-1">Bullish Candle (Green/White)</h4>
                          <p className="text-xs text-green-700">Close is higher than Open - buyers won</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <h4 className="font-semibold text-red-800 text-sm mb-1">Bearish Candle (Red/Black)</h4>
                          <p className="text-xs text-red-700">Close is lower than Open - sellers won</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support & Resistance */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Support & Resistance</h2>
              <p className="text-muted-foreground mb-4">
                Support and resistance are key price levels where buying or selling pressure tends to be strong.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Support</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    A price level where buying pressure is strong enough to prevent further decline.
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Price bounces up from this level</li>
                    <li>• Acts as a "floor" for price</li>
                    <li>• Good potential buy zone</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-800">Resistance</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-3">
                    A price level where selling pressure is strong enough to prevent further advance.
                  </p>
                  <ul className="text-xs text-red-600 space-y-1">
                    <li>• Price bounces down from this level</li>
                    <li>• Acts as a "ceiling" for price</li>
                    <li>• Good potential sell zone</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold mb-3">Key Concepts</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• The more times a level is tested, the stronger it becomes</li>
                  <li>• When broken, support becomes resistance (and vice versa)</li>
                  <li>• Round numbers often act as psychological support/resistance</li>
                  <li>• Previous highs and lows are natural support/resistance levels</li>
                </ul>
              </div>
            </section>

            {/* Common Indicators */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Essential Indicators</h2>
              <p className="text-muted-foreground mb-6">
                Indicators are mathematical calculations based on price, volume, or open interest. 
                Here are the most commonly used:
              </p>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Moving Averages (MA)</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Smooth out price data to identify the direction of the trend.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Simple MA (SMA)</h4>
                      <p className="text-xs text-muted-foreground">Average of closing prices over X periods</p>
                      <p className="text-xs mt-2"><strong>Popular:</strong> 20, 50, 200 periods</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Exponential MA (EMA)</h4>
                      <p className="text-xs text-muted-foreground">Gives more weight to recent prices</p>
                      <p className="text-xs mt-2"><strong>Popular:</strong> 12, 26 periods</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">RSI (Relative Strength Index)</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Measures the speed and magnitude of price changes. Ranges from 0 to 100.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-red-600">70+</div>
                      <div className="text-xs text-red-700">Overbought</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-600">30-70</div>
                      <div className="text-xs text-gray-700">Neutral</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-600">30-</div>
                      <div className="text-xs text-green-700">Oversold</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">MACD (Moving Average Convergence Divergence)</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Shows the relationship between two moving averages. Used to identify momentum and trend changes.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <ul className="text-sm space-y-2">
                      <li><strong>MACD Line:</strong> 12-period EMA minus 26-period EMA</li>
                      <li><strong>Signal Line:</strong> 9-period EMA of MACD line</li>
                      <li><strong>Histogram:</strong> Difference between MACD and Signal</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Bollinger Bands</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Three lines that envelope price, showing volatility and potential overbought/oversold conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Middle Band:</strong> 20-period SMA</p>
                    <p><strong>Upper Band:</strong> Middle + (2 × standard deviation)</p>
                    <p><strong>Lower Band:</strong> Middle - (2 × standard deviation)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Price Patterns */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Common Price Patterns</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-green-700 mb-3">Bullish Patterns</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Double Bottom</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Inverse Head & Shoulders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Bullish Engulfing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Morning Star</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-red-700 mb-3">Bearish Patterns</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span>Double Top</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span>Head & Shoulders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span>Bearish Engulfing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span>Evening Star</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Technical Analysis Tips</h2>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">1.</span>
                    <span>Don't rely on a single indicator—use multiple for confirmation</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">2.</span>
                    <span>Higher timeframes are more reliable but slower to signal</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">3.</span>
                    <span>Practice on demo accounts before trading with real money</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">4.</span>
                    <span>Keep charts clean—too many indicators cause analysis paralysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="font-bold text-primary">5.</span>
                    <span>Combine technical analysis with proper risk management</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Continue Learning</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/guides/fundamental-analysis" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Fundamental Analysis</h3>
                  <p className="text-sm text-muted-foreground">Learn how economic data affects currency prices.</p>
                </Link>
                <Link to="/guides/risk-management" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Risk Management</h3>
                  <p className="text-sm text-muted-foreground">Protect your capital with proper risk management.</p>
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

export default TechnicalAnalysis;
