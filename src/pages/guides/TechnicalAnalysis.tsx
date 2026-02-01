import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { LineChart, ArrowLeft, Clock, TrendingUp, TrendingDown, BarChart3, Activity, Target, Eye, Layers } from "lucide-react";
import SEO from "@/components/SEO";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const TechnicalAnalysis = () => {
  const tocItems = [
    { id: "what-is-technical-analysis", title: "What is Technical Analysis?", level: 2 },
    { id: "core-principles", title: "Core Principles", level: 2 },
    { id: "chart-types", title: "Chart Types", level: 2 },
    { id: "support-resistance", title: "Support & Resistance", level: 2 },
    { id: "essential-indicators", title: "Essential Indicators", level: 2 },
    { id: "price-patterns", title: "Price Patterns", level: 2 },
    { id: "timeframes", title: "Trading Timeframes", level: 2 },
    { id: "tips", title: "Technical Analysis Tips", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ];

  const faqs = [
    {
      question: "What is the best indicator for forex trading?",
      answer: "There is no single 'best' indicator - successful traders typically use a combination of 2-3 indicators for confirmation. Moving averages (especially the 200 EMA), RSI, and MACD are among the most popular. The key is understanding what each indicator measures and using them together rather than relying on any single indicator."
    },
    {
      question: "Which chart type is best for forex trading?",
      answer: "Candlestick charts are the most popular among forex traders because they display the most information (open, high, low, close) in an easy-to-read visual format. Japanese candlesticks also form recognizable patterns that can signal potential reversals or continuations."
    },
    {
      question: "How reliable is technical analysis in forex?",
      answer: "Technical analysis is a widely used and effective tool, but it's not 100% reliable. Studies suggest technical patterns work about 50-65% of the time when properly identified. The key to profitability is combining technical analysis with proper risk management - you don't need to be right every time, just manage losses when you're wrong."
    },
    {
      question: "What timeframe is best for forex technical analysis?",
      answer: "The best timeframe depends on your trading style. Day traders often use 15-minute to 1-hour charts, swing traders prefer 4-hour to daily charts, and position traders use daily to weekly charts. Higher timeframes generally produce more reliable signals but fewer trading opportunities."
    },
    {
      question: "Can technical analysis predict market direction?",
      answer: "Technical analysis doesn't 'predict' the future - it identifies probabilities based on historical price behavior. Patterns that worked in the past tend to repeat because they reflect human psychology. However, no method can guarantee future results, which is why risk management is essential."
    },
    {
      question: "Should I use technical or fundamental analysis for forex?",
      answer: "Most successful forex traders use both. Fundamental analysis helps determine the overall direction (bullish or bearish on a currency), while technical analysis provides optimal entry and exit points. Using both gives you a more complete picture of the market."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Technical Analysis Guide 2026: Forex Charts, Indicators & Patterns"
        description="Master forex technical analysis in 2026. Learn candlestick charts, RSI, MACD, moving averages, support/resistance, and price patterns for better trading decisions."
        canonical="/guides/technical-analysis"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Technical Analysis Guide for Forex Trading 2026",
          "description": "Complete guide to technical analysis including chart patterns, indicators, support/resistance, and price action strategies for forex traders.",
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
            Technical Analysis <span className="text-gradient-gold">Guide 2026</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Master chart reading, indicators, and price patterns for forex trading.
            Learn to identify high-probability trading opportunities using technical analysis.
          </p>
          <LastUpdated date="February 2026" reviewedBy="Technical Analysis Team" />
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
                title="Technical Analysis Facts"
                stats={[
                  { value: "80%+", label: "Traders Use It", description: "Use technical analysis" },
                  { value: "200", label: "Day SMA", description: "Most watched indicator" },
                  { value: "50-65%", label: "Win Rate", description: "With proper execution" },
                  { value: "3:1", label: "Risk/Reward", description: "Professional target" }
                ]}
                source="Industry research and professional trader surveys"
              />

              {/* What is Technical Analysis */}
              <section id="what-is-technical-analysis" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">What is Technical Analysis?</h2>
                <p className="text-muted-foreground mb-4">
                  Technical analysis is the study of past price movements to forecast future price direction.
                  It's based on the idea that price movements are not random and that historical patterns tend to repeat
                  due to market psychology.
                </p>

                <QuotableFact type="stat">
                  Over 80% of forex traders use some form of technical analysis, making it the most popular
                  method for analyzing currency markets and identifying trading opportunities.
                </QuotableFact>

                <p className="text-muted-foreground mb-4">
                  Unlike fundamental analysis which examines economic data, technical analysis focuses purely on
                  price charts and mathematical indicators derived from price and volume data.
                </p>
              </section>

              {/* Core Principles */}
              <section id="core-principles" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Core Principles of Technical Analysis</h2>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-4">The Three Pillars</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Price Discounts Everything</h5>
                        <p className="text-sm text-muted-foreground">All known information - economic, political, psychological - is already reflected in the current price.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Price Moves in Trends</h5>
                        <p className="text-sm text-muted-foreground">Once established, trends tend to continue until clear reversal signals appear.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">History Repeats Itself</h5>
                        <p className="text-sm text-muted-foreground">Market psychology creates recurring patterns because human nature doesn't change.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <QuotableFact type="quote">
                  "The trend is your friend until it ends." This classic trading adage captures the essence of
                  technical analysis - identify the trend and trade with it, not against it.
                </QuotableFact>
              </section>

              {/* Chart Types */}
              <section id="chart-types" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Chart Types Explained</h2>
                <p className="text-muted-foreground mb-6">
                  Understanding different chart types is fundamental to technical analysis. Each type displays
                  price data differently, offering unique advantages.
                </p>

                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          The simplest chart type, connecting closing prices with a continuous line.
                          Best for identifying overall trends at a glance.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <strong>Best for:</strong> Quick trend identification, long-term analysis
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
                          <p><strong>Open:</strong> Horizontal tick on left | <strong>Close:</strong> Horizontal tick on right</p>
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
                        <h3 className="text-lg font-semibold mb-2">
                          Candlestick Chart
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">Most Popular</span>
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          The most widely used chart type among forex traders. Shows the same OHLC data as bar charts
                          but in a more visual format with colored "bodies."
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-green-50 rounded-lg p-3">
                            <h4 className="font-semibold text-green-800 text-sm mb-1">Bullish Candle (Green)</h4>
                            <p className="text-xs text-green-700">Close is higher than Open - buyers dominated</p>
                          </div>
                          <div className="bg-red-50 rounded-lg p-3">
                            <h4 className="font-semibold text-red-800 text-sm mb-1">Bearish Candle (Red)</h4>
                            <p className="text-xs text-red-700">Close is lower than Open - sellers dominated</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <QuotableFact type="stat">
                  Candlestick charts were invented in Japan over 200 years ago by rice traders and remain
                  the most popular chart type for forex trading in 2026.
                </QuotableFact>
              </section>

              {/* Support & Resistance */}
              <section id="support-resistance" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Support & Resistance Levels</h2>
                <p className="text-muted-foreground mb-4">
                  Support and resistance are key price levels where buying or selling pressure tends to be strong.
                  These levels are the foundation of most technical trading strategies.
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
                      <li>• Potential buy zone for traders</li>
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
                      <li>• Potential sell zone for traders</li>
                    </ul>
                  </div>
                </div>

                <QuotableFact type="quote">
                  When support is broken, it often becomes resistance, and when resistance is broken,
                  it often becomes support. This "role reversal" is a key concept in technical analysis.
                </QuotableFact>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold mb-3">Key Support/Resistance Concepts</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>More touches = stronger level:</strong> The more times a level is tested, the more significant it becomes</li>
                    <li>• <strong>Round numbers matter:</strong> Psychological levels like 1.1000 or 1.2500 often act as support/resistance</li>
                    <li>• <strong>Previous highs and lows:</strong> Historical swing points create natural support/resistance</li>
                    <li>• <strong>Breakouts signal momentum:</strong> When price breaks through a key level, it often continues in that direction</li>
                  </ul>
                </div>
              </section>

              {/* Essential Indicators */}
              <section id="essential-indicators" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Essential Technical Indicators</h2>
                <p className="text-muted-foreground mb-6">
                  Indicators are mathematical calculations based on price and/or volume. Here are the most
                  important indicators every forex trader should understand:
                </p>

                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      Moving Averages (MA)
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      The most widely used indicators that smooth out price data to identify trend direction.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Simple MA (SMA)</h4>
                        <p className="text-xs text-muted-foreground">Average of closing prices over X periods</p>
                        <p className="text-xs mt-2"><strong>Popular periods:</strong> 20, 50, 200</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Exponential MA (EMA)</h4>
                        <p className="text-xs text-muted-foreground">Gives more weight to recent prices</p>
                        <p className="text-xs mt-2"><strong>Popular periods:</strong> 12, 26, 50</p>
                      </div>
                    </div>
                    <QuotableFact type="stat">
                      The 200-day moving average is considered the most important technical indicator.
                      When price is above it, the market is in a long-term uptrend; below it, a downtrend.
                    </QuotableFact>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      RSI (Relative Strength Index)
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Measures the speed and magnitude of price changes. Ranges from 0 to 100.
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center mb-4">
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-red-600">Above 70</div>
                        <div className="text-xs text-red-700">Overbought Zone</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-600">30-70</div>
                        <div className="text-xs text-gray-700">Neutral Zone</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">Below 30</div>
                        <div className="text-xs text-green-700">Oversold Zone</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Pro tip:</strong> RSI works best in ranging markets. In strong trends,
                      RSI can stay overbought or oversold for extended periods.
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      MACD (Moving Average Convergence Divergence)
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Shows the relationship between two moving averages. Used to identify momentum and trend changes.
                    </p>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <ul className="text-sm space-y-2">
                        <li><strong>MACD Line:</strong> 12-period EMA minus 26-period EMA</li>
                        <li><strong>Signal Line:</strong> 9-period EMA of MACD line</li>
                        <li><strong>Histogram:</strong> Visual difference between MACD and Signal</li>
                      </ul>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      <strong>Bullish signal:</strong> MACD crosses above signal line |
                      <strong> Bearish signal:</strong> MACD crosses below signal line
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Bollinger Bands
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Three lines that envelope price, showing volatility and potential overbought/oversold conditions.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Middle Band:</strong> 20-period SMA</p>
                      <p><strong>Upper Band:</strong> Middle + (2 × standard deviation)</p>
                      <p><strong>Lower Band:</strong> Middle - (2 × standard deviation)</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      <strong>Key insight:</strong> Bands expand during high volatility and contract during low volatility.
                      A "squeeze" (narrow bands) often precedes a significant price move.
                    </p>
                  </div>
                </div>
              </section>

              {/* Price Patterns */}
              <section id="price-patterns" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Price Patterns</h2>
                <p className="text-muted-foreground mb-6">
                  Price patterns are formations that appear on charts and can signal potential trend
                  continuations or reversals. Learning to recognize these patterns is essential for technical traders.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Bullish Reversal Patterns
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Double Bottom:</strong> "W" shaped pattern</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Inverse Head & Shoulders:</strong> Three valleys</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Bullish Engulfing:</strong> Large green candle covers prior red</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Morning Star:</strong> Three-candle reversal pattern</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      Bearish Reversal Patterns
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Double Top:</strong> "M" shaped pattern</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Head & Shoulders:</strong> Three peaks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Bearish Engulfing:</strong> Large red candle covers prior green</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Evening Star:</strong> Three-candle reversal pattern</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <QuotableFact type="stat">
                  The Head and Shoulders pattern is considered one of the most reliable reversal patterns,
                  with success rates reported between 70-85% when the pattern is properly confirmed.
                </QuotableFact>
              </section>

              {/* Timeframes */}
              <section id="timeframes" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Trading Timeframes</h2>
                <p className="text-muted-foreground mb-6">
                  Different timeframes serve different trading styles. Understanding which timeframes
                  to use is crucial for your strategy.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Scalping</h4>
                      <p className="text-2xl font-bold text-primary mb-1">1-15 min</p>
                      <p className="text-xs text-muted-foreground">Multiple trades daily, small profits</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Day Trading</h4>
                      <p className="text-2xl font-bold text-primary mb-1">15 min - 4H</p>
                      <p className="text-xs text-muted-foreground">No overnight positions</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Swing Trading</h4>
                      <p className="text-2xl font-bold text-primary mb-1">4H - Daily</p>
                      <p className="text-xs text-muted-foreground">Hold for days to weeks</p>
                    </div>
                  </div>
                </div>

                <QuotableFact type="quote">
                  "Higher timeframes produce more reliable signals but fewer trading opportunities.
                  Lower timeframes offer more trades but more noise and false signals."
                </QuotableFact>
              </section>

              {/* Tips */}
              <section id="tips" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-4">Technical Analysis Best Practices</h2>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <span><strong>Use multiple indicators for confirmation</strong> - Never rely on a single indicator. Look for confluence where multiple indicators agree.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <span><strong>Trade with the trend</strong> - Higher timeframe trends tend to be more reliable. Don't fight the trend.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <span><strong>Keep charts clean</strong> - Too many indicators cause analysis paralysis. Use 2-3 indicators maximum.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <span><strong>Practice on demo first</strong> - Test your technical analysis skills without risking real money.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <span><strong>Combine with risk management</strong> - Technical analysis tells you where to enter; risk management keeps you in the game.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary text-lg">6.</span>
                      <span><strong>Document your trades</strong> - Keep a trading journal to track what works and what doesn't.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA variant="inline" className="mb-12" />

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-24">
                <FAQSection
                  faqs={faqs}
                  title="Technical Analysis FAQ"
                />
              </section>

              {/* Next Steps */}
              <section className="mb-12">
                <h2 className="text-2xl font-heading font-bold mb-4">Continue Your Education</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/guides/fundamental-analysis" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Fundamental Analysis</h3>
                    <p className="text-sm text-muted-foreground">Learn how economic data affects currency prices.</p>
                  </Link>
                  <Link to="/guides/risk-management" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Risk Management</h3>
                    <p className="text-sm text-muted-foreground">Protect your capital with proper risk management.</p>
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

export default TechnicalAnalysis;
