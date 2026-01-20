import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Target, ArrowLeft, Clock, CheckCircle, AlertCircle, TrendingDown, Calculator, ShieldCheck } from "lucide-react";

const RiskManagement = () => {
  return (
    <div className="min-h-screen bg-background">
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
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Intermediate</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>18 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Risk Management <span className="text-gradient-gold">Essentials</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Master the art of protecting your capital. Learn position sizing, stop-loss strategies, 
            and how to survive in volatile markets.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Why Risk Management is Critical</h2>
              <p className="text-muted-foreground mb-4">
                Risk management is the difference between long-term success and failure in Forex trading. 
                Even the best trading strategy will fail without proper risk management. The goal isn't just 
                to make money—it's to protect your capital so you can continue trading.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">The Golden Rule</h4>
                    <p className="text-sm text-muted-foreground">
                      Never risk more than you can afford to lose. Professional traders typically risk 
                      only 1-2% of their account on any single trade.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Position Sizing */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Position Sizing</h2>
              <p className="text-muted-foreground mb-4">
                Position sizing determines how much of your capital you allocate to each trade. 
                It's one of the most important aspects of risk management.
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">The 1% Rule</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      A common approach is to never risk more than 1% of your account on a single trade.
                    </p>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">Example Calculation:</h4>
                      <ul className="text-sm space-y-2">
                        <li><span className="font-medium">Account Balance:</span> $10,000</li>
                        <li><span className="font-medium">Risk Per Trade (1%):</span> $100</li>
                        <li><span className="font-medium">Stop-Loss:</span> 50 pips</li>
                        <li><span className="font-medium">Position Size:</span> $100 ÷ 50 pips = $2 per pip = 0.2 lots</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700 mb-1">1%</div>
                  <div className="text-sm font-medium text-green-800">Conservative</div>
                  <p className="text-xs text-green-600 mt-1">Best for beginners</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-700 mb-1">2%</div>
                  <div className="text-sm font-medium text-yellow-800">Moderate</div>
                  <p className="text-xs text-yellow-600 mt-1">Experienced traders</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-700 mb-1">3%+</div>
                  <div className="text-sm font-medium text-red-800">Aggressive</div>
                  <p className="text-xs text-red-600 mt-1">High risk tolerance</p>
                </div>
              </div>
            </section>

            {/* Stop-Loss */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Stop-Loss Orders</h2>
              <p className="text-muted-foreground mb-4">
                A stop-loss is an order that automatically closes your position at a predetermined price 
                to limit your loss. It's your safety net and should be set BEFORE entering any trade.
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Fixed Stop-Loss</h3>
                      <p className="text-muted-foreground text-sm">
                        Set at a fixed number of pips or price level. Simple and straightforward, 
                        but may not account for market volatility.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Technical Stop-Loss</h3>
                      <p className="text-muted-foreground text-sm">
                        Placed based on technical analysis levels like support/resistance, 
                        moving averages, or swing highs/lows.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Trailing Stop-Loss</h3>
                      <p className="text-muted-foreground text-sm">
                        Moves with the price to lock in profits as the trade moves in your favor. 
                        Great for capturing trends while protecting gains.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Never Trade Without a Stop-Loss</h4>
                    <p className="text-sm text-amber-700">
                      Many traders have blown their accounts by "hoping" a losing trade would turn around. 
                      Always set your stop-loss before entering a trade and never remove it.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Risk/Reward Ratio */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Risk/Reward Ratio</h2>
              <p className="text-muted-foreground mb-4">
                The risk/reward ratio compares your potential loss (risk) to your potential profit (reward). 
                A good ratio can make you profitable even with a low win rate.
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Common Risk/Reward Ratios</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold mb-1">1:1</div>
                    <p className="text-sm text-muted-foreground">Risk $100 to make $100</p>
                    <p className="text-xs text-muted-foreground mt-2">Need &gt;50% win rate to profit</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <div className="text-2xl font-bold text-primary mb-1">1:2</div>
                    <p className="text-sm text-muted-foreground">Risk $100 to make $200</p>
                    <p className="text-xs text-primary mt-2">Recommended for most traders</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold mb-1">1:3</div>
                    <p className="text-sm text-muted-foreground">Risk $100 to make $300</p>
                    <p className="text-xs text-muted-foreground mt-2">Need only 25% win rate to profit</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-3">Why 1:2 is Powerful</h4>
                <p className="text-sm text-green-700 mb-3">
                  With a 1:2 risk/reward ratio, you only need to win 40% of your trades to be profitable:
                </p>
                <div className="bg-white rounded-lg p-4 text-sm">
                  <p><strong>10 trades:</strong> 4 wins × $200 = $800</p>
                  <p><strong>Losses:</strong> 6 losses × $100 = $600</p>
                  <p className="mt-2 font-semibold text-green-800">Net Profit: $200</p>
                </div>
              </div>
            </section>

            {/* Drawdown */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Understanding Drawdown</h2>
              <p className="text-muted-foreground mb-4">
                Drawdown is the decline from a peak in your account balance to a low point before a new peak. 
                Understanding drawdown helps you set realistic expectations and survive losing streaks.
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Recovery from Drawdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span>10% loss</span>
                    <span className="font-medium text-green-600">Need 11% gain to recover</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span>25% loss</span>
                    <span className="font-medium text-yellow-600">Need 33% gain to recover</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span>50% loss</span>
                    <span className="font-medium text-orange-600">Need 100% gain to recover</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>75% loss</span>
                    <span className="font-medium text-red-600">Need 300% gain to recover</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">The Lesson</h4>
                    <p className="text-sm text-red-700">
                      Large losses are exponentially harder to recover from. This is why protecting your capital 
                      with proper risk management is more important than chasing big gains.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Key Takeaways</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Never risk more than 1-2% of your account on a single trade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Always use stop-loss orders and set them before entering trades</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Aim for at least 1:2 risk/reward ratio on your trades</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Understand that losing streaks are normal—plan for them</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Protecting capital is more important than making big gains</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Continue Learning</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/guides/technical-analysis" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Technical Analysis Basics</h3>
                  <p className="text-sm text-muted-foreground">Learn to read charts and identify trading opportunities.</p>
                </Link>
                <Link to="/guides/beginners-guide" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold mb-2">Beginner's Guide</h3>
                  <p className="text-sm text-muted-foreground">Review the fundamentals of Forex trading.</p>
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

export default RiskManagement;
