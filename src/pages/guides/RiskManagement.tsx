import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Target, ArrowLeft, Clock, CheckCircle, AlertCircle, TrendingDown, Calculator, ShieldCheck } from "lucide-react";
import SEO from "@/components/SEO";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const guideContent = `
## Why Risk Management is Critical
## The 1% Rule: Position Sizing
### Position Size Calculator
## Stop-Loss Orders
### Types of Stop-Loss Orders
## Risk/Reward Ratio
## Understanding Drawdown
## Maximum Drawdown Guidelines
## Key Takeaways
## Frequently Asked Questions
`;

const faqs = [
  {
    question: "What percentage should I risk per trade?",
    answer: "Most professional traders recommend risking 1-2% of your account balance per trade. Beginners should start with 1% or less. This means if you have a $10,000 account, you should risk no more than $100-200 per trade. This allows you to survive losing streaks without devastating your account."
  },
  {
    question: "What is a good risk-reward ratio for forex trading?",
    answer: "A minimum of 1:2 risk-reward ratio is recommended. This means for every $1 you risk, you aim to make $2. With a 1:2 ratio, you only need to win 40% of your trades to be profitable. Some traders aim for 1:3 or higher, but these setups may be harder to find."
  },
  {
    question: "Should I always use a stop-loss order?",
    answer: "Yes, absolutely. A stop-loss is your primary risk management tool. Never enter a trade without a predetermined stop-loss level. Many traders have lost their entire accounts by holding losing positions hoping they would recover. Always set your stop-loss before entering a trade."
  },
  {
    question: "How do I calculate position size in forex?",
    answer: "Position size = (Account Risk ÷ Trade Risk in pips) × Pip Value. For example, if you have $10,000, risk 1% ($100), and your stop-loss is 50 pips: $100 ÷ 50 = $2 per pip = 0.2 standard lots. Many brokers and trading platforms have built-in position size calculators."
  },
  {
    question: "What is the maximum drawdown I should accept?",
    answer: "Most professional traders set a maximum drawdown limit of 20-25%. If your account drops by this amount, you should stop trading and reassess your strategy. Remember: a 50% loss requires a 100% gain to recover, making large drawdowns extremely difficult to overcome."
  },
  {
    question: "How do I recover from a losing streak?",
    answer: "First, reduce your position size to the minimum (0.5-1% risk). Second, take a break to clear your mind and avoid revenge trading. Third, review your trading journal to identify what went wrong. Fourth, only return to normal position sizing after 5-10 consecutive profitable trades with the reduced size."
  }
];

const RiskManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Forex Risk Management Guide 2026 | Protect Your Trading Capital"
        description="Master forex risk management in 2026. Learn the 1% rule, position sizing, stop-loss strategies, risk-reward ratios, and how to protect your trading capital as a US trader."
        canonical="/guides/risk-management"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Forex Risk Management Essentials 2026",
          "description": "Master risk management strategies to protect your trading capital and improve long-term profitability.",
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
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Master the art of protecting your capital in 2026. Learn position sizing, stop-loss strategies,
            and how to survive in volatile markets.
          </p>
          <LastUpdated date="February 1, 2026" reviewedBy="US Forex Guide Trading Team" />
        </div>
      </section>

      {/* Content with TOC */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex gap-8">
            {/* Main Content */}
            <article className="flex-1 max-w-4xl">

              {/* Introduction */}
              <section className="mb-12">
                <h2 id="heading-0-why-risk-management-is-critical" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Why Risk Management is Critical</h2>
                <p className="text-muted-foreground mb-4">
                  Risk management is the difference between long-term success and failure in Forex trading.
                  Even the best trading strategy will fail without proper risk management. The goal isn't just
                  to make money—it's to protect your capital so you can continue trading.
                </p>

                <QuotableFact
                  fact="According to broker data, approximately 70-80% of retail forex traders lose money. The primary reason isn't bad strategy—it's poor risk management. Successful traders focus on capital preservation first, profits second."
                  source="ESMA & CFTC Retail Trader Reports"
                  type="stat"
                />

                <StatHighlight
                  title="Risk Management Impact on Trading Success"
                  stats={[
                    { value: "70-80%", label: "Traders Lose", description: "Poor risk management" },
                    { value: "1-2%", label: "Risk Per Trade", description: "Professional standard" },
                    { value: "1:2", label: "Min R:R Ratio", description: "Recommended minimum" },
                    { value: "20%", label: "Max Drawdown", description: "Professional limit" }
                  ]}
                  source="Industry Trading Standards 2026"
                />

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">The Golden Rule of Trading</h4>
                      <p className="text-sm text-muted-foreground">
                        Never risk more than you can afford to lose. Professional traders typically risk
                        only 1-2% of their account on any single trade. This isn't being overly cautious—it's being smart.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Position Sizing */}
              <section className="mb-12">
                <h2 id="heading-1-the-1-rule-position-sizing" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">The 1% Rule: Position Sizing</h2>
                <p className="text-muted-foreground mb-4">
                  Position sizing determines how much of your capital you allocate to each trade.
                  It's one of the most important aspects of risk management.
                </p>

                <QuotableFact
                  fact="The 1% rule means never risking more than 1% of your trading account on a single trade. With a $10,000 account, you risk maximum $100 per trade. This allows you to lose 10 trades in a row and still have 90% of your capital intact."
                  source="Professional Trading Guidelines"
                  type="money"
                />

                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="w-full">
                      <h3 id="heading-2-position-size-calculator" className="text-lg font-semibold mb-3 scroll-mt-24">Position Size Calculator</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Here's how to calculate your position size using the 1% rule:
                      </p>
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Example Calculation:</h4>
                        <ul className="text-sm space-y-2">
                          <li><span className="font-medium">Account Balance:</span> $10,000</li>
                          <li><span className="font-medium">Risk Per Trade (1%):</span> $100</li>
                          <li><span className="font-medium">Stop-Loss:</span> 50 pips</li>
                          <li><span className="font-medium">Pip Value (EUR/USD):</span> $10 per lot</li>
                          <li className="pt-2 border-t border-border"><span className="font-medium">Position Size:</span> $100 ÷ (50 × $10) = 0.2 standard lots</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">1%</div>
                    <div className="text-sm font-medium text-green-800">Conservative</div>
                    <p className="text-xs text-green-600 mt-1">Best for beginners & small accounts</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-700 mb-1">2%</div>
                    <div className="text-sm font-medium text-yellow-800">Moderate</div>
                    <p className="text-xs text-yellow-600 mt-1">Experienced traders</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-700 mb-1">3%+</div>
                    <div className="text-sm font-medium text-red-800">Aggressive</div>
                    <p className="text-xs text-red-600 mt-1">High risk—not recommended</p>
                  </div>
                </div>
              </section>

              {/* Stop-Loss */}
              <section className="mb-12">
                <h2 id="heading-3-stop-loss-orders" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Stop-Loss Orders</h2>
                <p className="text-muted-foreground mb-4">
                  A stop-loss is an order that automatically closes your position at a predetermined price
                  to limit your loss. It's your safety net and should be set BEFORE entering any trade.
                </p>

                <QuotableFact
                  fact="A study of retail trading accounts found that traders who consistently use stop-losses are 3x more likely to remain profitable over a 12-month period compared to those who don't. Stop-losses aren't optional—they're essential."
                  source="Broker Performance Analysis 2025"
                  type="stat"
                />

                <h3 id="heading-4-types-of-stop-loss-orders" className="text-xl font-semibold mb-4 mt-6 scroll-mt-24">Types of Stop-Loss Orders</h3>

                <div className="space-y-4 mb-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Fixed Stop-Loss</h4>
                        <p className="text-muted-foreground text-sm">
                          Set at a fixed number of pips or price level. Simple and straightforward,
                          but may not account for market volatility. Best for beginners.
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
                        <h4 className="text-lg font-semibold mb-2">Technical Stop-Loss</h4>
                        <p className="text-muted-foreground text-sm">
                          Placed based on technical analysis levels like support/resistance,
                          moving averages, or swing highs/lows. More sophisticated but more effective.
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
                        <h4 className="text-lg font-semibold mb-2">Trailing Stop-Loss</h4>
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
                        Always set your stop-loss before entering a trade and never remove it once placed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA variant="inline" />

              {/* Risk/Reward Ratio */}
              <section className="mb-12">
                <h2 id="heading-5-risk-reward-ratio" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Risk/Reward Ratio</h2>
                <p className="text-muted-foreground mb-4">
                  The risk/reward ratio compares your potential loss (risk) to your potential profit (reward).
                  A good ratio can make you profitable even with a low win rate.
                </p>

                <QuotableFact
                  fact="With a 1:2 risk-reward ratio, you only need to win 34% of your trades to break even, and 40% to be profitable. This mathematical edge is why professional traders focus on risk-reward rather than win rate."
                  source="Trading Mathematics"
                  type="stat"
                />

                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-center">Risk/Reward Ratio Comparison</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold mb-1">1:1</div>
                      <p className="text-sm text-muted-foreground">Risk $100 to make $100</p>
                      <p className="text-xs text-muted-foreground mt-2">Need &gt;50% win rate</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="text-2xl font-bold text-primary mb-1">1:2</div>
                      <p className="text-sm text-muted-foreground">Risk $100 to make $200</p>
                      <p className="text-xs text-primary mt-2">Recommended minimum</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold mb-1">1:3</div>
                      <p className="text-sm text-muted-foreground">Risk $100 to make $300</p>
                      <p className="text-xs text-muted-foreground mt-2">Need only 25% win rate</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-semibold text-green-800 mb-3">Why 1:2 is Powerful</h4>
                  <p className="text-sm text-green-700 mb-3">
                    With a 1:2 risk/reward ratio, you can lose 60% of your trades and still be profitable:
                  </p>
                  <div className="bg-white rounded-lg p-4 text-sm">
                    <p><strong>10 trades:</strong> 4 wins × $200 = $800 profit</p>
                    <p><strong>Losses:</strong> 6 losses × $100 = $600 loss</p>
                    <p className="mt-2 font-semibold text-green-800">Net Profit: $200 (despite 60% loss rate!)</p>
                  </div>
                </div>
              </section>

              {/* Drawdown */}
              <section className="mb-12">
                <h2 id="heading-6-understanding-drawdown" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Understanding Drawdown</h2>
                <p className="text-muted-foreground mb-4">
                  Drawdown is the decline from a peak in your account balance to a low point before a new peak.
                  Understanding drawdown helps you set realistic expectations and survive losing streaks.
                </p>

                <QuotableFact
                  fact="A 50% drawdown requires a 100% gain to recover. A 75% drawdown requires a 300% gain. This exponential relationship is why limiting drawdown is more important than maximizing gains."
                  source="Trading Mathematics"
                  type="stat"
                />

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

                <h3 id="heading-7-maximum-drawdown-guidelines" className="text-xl font-semibold mb-4 scroll-mt-24">Maximum Drawdown Guidelines</h3>

                <StatHighlight
                  title="Recommended Maximum Drawdown Limits"
                  stats={[
                    { value: "10%", label: "Beginners", description: "Ultra-conservative" },
                    { value: "20%", label: "Intermediate", description: "Standard limit" },
                    { value: "25%", label: "Professional", description: "Maximum recommended" },
                    { value: "30%+", label: "Danger Zone", description: "Reassess strategy" }
                  ]}
                />

                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">The Critical Lesson</h4>
                      <p className="text-sm text-red-700">
                        Large losses are exponentially harder to recover from. This is why protecting your capital
                        with proper risk management is more important than chasing big gains. Survival first, profits second.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Key Takeaways */}
              <section className="mb-12">
                <h2 id="heading-8-key-takeaways" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Key Takeaways</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span><strong>The 1% Rule:</strong> Never risk more than 1-2% of your account on a single trade</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span><strong>Always Use Stop-Losses:</strong> Set them before entering and never remove them</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span><strong>Minimum 1:2 R:R:</strong> Aim for at least 1:2 risk/reward ratio on every trade</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span><strong>Expect Losing Streaks:</strong> They're normal—your risk management should account for them</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span><strong>Limit Drawdown:</strong> Set a maximum drawdown limit (20-25%) and stop trading if reached</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span><strong>Capital First:</strong> Protecting capital is more important than making big gains</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <FAQSection faqs={faqs} />

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

              {/* Newsletter CTA */}
              <NewsletterCTA variant="card" />

            </article>

            {/* Sticky TOC Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents content={guideContent} className="bg-gradient-card border border-border rounded-xl p-4" />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RiskManagement;
