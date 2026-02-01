import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

// Content for TOC parsing
const guideContent = `
## What is Forex Trading?
## Key Market Statistics
## Understanding Currency Pairs
### Types of Currency Pairs
## Forex Market Hours
### Best Trading Times for US Traders
## Basic Order Types
## How Much Money Do You Need to Start?
## Start with Demo Trading
## Common Beginner Mistakes to Avoid
## Next Steps
## Frequently Asked Questions
`;

const faqs = [
  {
    question: "How much money do I need to start forex trading?",
    answer: "You can start forex trading with as little as $1 at some offshore brokers like FXGlory, or $0 at US-regulated brokers like OANDA. However, most experts recommend starting with at least $100-500 to have proper risk management. Remember: never trade with money you can't afford to lose."
  },
  {
    question: "Is forex trading legal in the United States?",
    answer: "Yes, forex trading is completely legal in the United States. US traders can use CFTC/NFA-regulated brokers (like OANDA, Forex.com, IG US) or offshore brokers that accept US clients. The key difference is leverage limits: US-regulated brokers offer max 50:1, while offshore brokers may offer up to 3000:1."
  },
  {
    question: "What is the best time to trade forex for US traders?",
    answer: "The best trading times for US-based traders are during the London-New York overlap (8:00 AM - 12:00 PM EST) when liquidity and volatility are highest. The New York session (8:00 AM - 5:00 PM EST) is also excellent for trading USD pairs."
  },
  {
    question: "Can I make a living from forex trading?",
    answer: "While it's possible to make a living from forex trading, it's extremely difficult. Statistics show that 70-80% of retail forex traders lose money. Successful trading requires years of practice, strict discipline, proper risk management, and adequate capital. Most professionals recommend treating forex as a supplemental income source initially."
  },
  {
    question: "What is leverage in forex trading?",
    answer: "Leverage allows you to control a larger position with a smaller amount of capital. For example, 50:1 leverage means you can control $50,000 with just $1,000. While leverage amplifies profits, it equally amplifies losses. US-regulated brokers offer maximum 50:1 leverage, while offshore brokers may offer up to 3000:1."
  },
  {
    question: "How long does it take to learn forex trading?",
    answer: "Most traders need 6-12 months of consistent practice to develop basic competency, and 2-3 years to become consistently profitable. The learning curve includes understanding market mechanics, developing a trading strategy, mastering risk management, and controlling emotions."
  }
];

const BeginnersGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="Beginner's Guide to Forex Trading 2026 | Learn Forex Basics for US Traders"
        description="Complete beginner's guide to forex trading in 2026. Learn currency pairs, market hours, order types, and how to start trading forex as a US trader. Updated February 2026."
        canonical="/guides/beginners-guide"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Beginner's Guide to Forex Trading 2026",
          "description": "Everything you need to know to start trading Forex. Learn the basics of currency pairs, market mechanics, and essential terminology.",
          "author": {
            "@type": "Organization",
            "name": "US Forex Guide"
          },
          "publisher": {
            "@type": "Organization",
            "name": "US Forex Guide"
          },
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
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Beginner</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Beginner's Guide to <span className="text-gradient-gold">Forex Trading</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Everything you need to know to start trading Forex in 2026. Learn the basics of currency pairs,
            market mechanics, and essential terminology for US traders.
          </p>
          <LastUpdated date="February 1, 2026" reviewedBy="US Forex Guide Editorial Team" />
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
                <h2 id="heading-0-what-is-forex-trading-" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">What is Forex Trading?</h2>
                <p className="text-muted-foreground mb-4">
                  Forex (Foreign Exchange) trading is the process of buying and selling currencies on the global market.
                  It's the largest and most liquid financial market in the world, operating 24 hours a day, 5 days a week.
                </p>

                <QuotableFact
                  fact="The forex market has a daily trading volume exceeding $7.5 trillion as of 2026, making it the largest financial market in the world—over 25 times larger than the global stock market."
                  source="Bank for International Settlements (BIS) 2026 Report"
                  type="stat"
                />

                <p className="text-muted-foreground mb-4">
                  Unlike stock markets that have set trading hours, Forex operates continuously through four major
                  trading sessions, allowing traders from around the world to participate at any time.
                </p>
              </section>

              {/* Key Statistics */}
              <section className="mb-12">
                <h2 id="heading-1-key-market-statistics" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Key Market Statistics</h2>

                <StatHighlight
                  title="Forex Market at a Glance (2026)"
                  stats={[
                    { value: "$7.5T", label: "Daily Volume", description: "Traded every day" },
                    { value: "180+", label: "Currencies", description: "Actively traded" },
                    { value: "24/5", label: "Market Hours", description: "Non-stop trading" },
                    { value: "50:1", label: "US Leverage", description: "Maximum allowed" }
                  ]}
                  source="BIS Triennial Survey 2026"
                />

                <QuotableFact
                  fact="EUR/USD is the most traded currency pair in the world, accounting for approximately 24% of all forex transactions. USD/JPY (13.2%) and GBP/USD (9.6%) follow as the second and third most traded pairs."
                  source="BIS 2026"
                  type="stat"
                />
              </section>

              {/* Currency Pairs */}
              <section className="mb-12">
                <h2 id="heading-2-understanding-currency-pairs" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Understanding Currency Pairs</h2>
                <p className="text-muted-foreground mb-4">
                  In Forex, currencies are always traded in pairs. The first currency is called the "base currency"
                  and the second is the "quote currency". For example, in EUR/USD:
                </p>
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">EUR</div>
                      <div className="text-sm text-muted-foreground">Base Currency</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">/</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">USD</div>
                      <div className="text-sm text-muted-foreground">Quote Currency</div>
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground text-sm">
                    If EUR/USD = 1.10, it means 1 Euro equals 1.10 US Dollars
                  </p>
                </div>

                <h3 id="heading-3-types-of-currency-pairs" className="text-xl font-semibold mb-3 scroll-mt-24">Types of Currency Pairs</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary/30 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Major Pairs</h4>
                    <p className="text-sm text-muted-foreground mb-2">Most traded pairs involving USD</p>
                    <ul className="text-sm space-y-1">
                      <li>EUR/USD (24% of volume)</li>
                      <li>USD/JPY (13.2%)</li>
                      <li>GBP/USD (9.6%)</li>
                      <li>USD/CHF (3.6%)</li>
                    </ul>
                  </div>
                  <div className="bg-secondary/30 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Minor Pairs</h4>
                    <p className="text-sm text-muted-foreground mb-2">Major currencies without USD</p>
                    <ul className="text-sm space-y-1">
                      <li>EUR/GBP</li>
                      <li>EUR/JPY</li>
                      <li>GBP/JPY</li>
                      <li>AUD/NZD</li>
                    </ul>
                  </div>
                  <div className="bg-secondary/30 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Exotic Pairs</h4>
                    <p className="text-sm text-muted-foreground mb-2">Major + emerging market currency</p>
                    <ul className="text-sm space-y-1">
                      <li>USD/TRY</li>
                      <li>EUR/PLN</li>
                      <li>GBP/ZAR</li>
                      <li>USD/MXN</li>
                    </ul>
                  </div>
                </div>

                <QuotableFact
                  fact="For beginners, we recommend starting with major pairs like EUR/USD or GBP/USD. These pairs have the tightest spreads (lowest trading costs), highest liquidity, and most predictable price movements."
                  source="US Forex Guide Editorial Team"
                  type="quote"
                />
              </section>

              {/* Market Hours */}
              <section className="mb-12">
                <h2 id="heading-4-forex-market-hours" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Forex Market Hours</h2>
                <p className="text-muted-foreground mb-4">
                  The Forex market operates 24 hours a day through four major trading sessions:
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold">Sydney Session</h4>
                      <p className="text-sm text-muted-foreground">5:00 PM - 2:00 AM EST</p>
                    </div>
                    <span className="text-sm bg-secondary px-3 py-1 rounded-full">Low Volatility</span>
                  </div>
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold">Tokyo Session</h4>
                      <p className="text-sm text-muted-foreground">7:00 PM - 4:00 AM EST</p>
                    </div>
                    <span className="text-sm bg-secondary px-3 py-1 rounded-full">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold">London Session</h4>
                      <p className="text-sm text-muted-foreground">3:00 AM - 12:00 PM EST</p>
                    </div>
                    <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">High Volatility</span>
                  </div>
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold">New York Session</h4>
                      <p className="text-sm text-muted-foreground">8:00 AM - 5:00 PM EST</p>
                    </div>
                    <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">High Volatility</span>
                  </div>
                </div>

                <h3 id="heading-5-best-trading-times-for-us-traders" className="text-xl font-semibold mb-3 scroll-mt-24">Best Trading Times for US Traders</h3>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Optimal Trading Window</h4>
                      <p className="text-sm text-muted-foreground">
                        The London-New York overlap (8:00 AM - 12:00 PM EST) typically offers the highest liquidity
                        and best trading opportunities, with approximately 70% of all forex transactions occurring during this window.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Basic Orders */}
              <section className="mb-12">
                <h2 id="heading-6-basic-order-types" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Basic Order Types</h2>

                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Market Order</h3>
                        <p className="text-muted-foreground text-sm">
                          An order to buy or sell immediately at the current market price. This is the fastest way
                          to enter or exit a trade but may result in slippage during volatile markets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Limit Order</h3>
                        <p className="text-muted-foreground text-sm">
                          An order to buy below or sell above the current market price. The trade only executes
                          when your specified price is reached, giving you better price control.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Stop-Loss Order</h3>
                        <p className="text-muted-foreground text-sm">
                          An order to close a position at a specified price to limit potential losses.
                          Essential for risk management—never trade without a stop-loss.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Take-Profit Order</h3>
                        <p className="text-muted-foreground text-sm">
                          An order to close a position at a specified profit level. Helps lock in gains
                          without constant monitoring.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How Much to Start */}
              <section className="mb-12">
                <h2 id="heading-7-how-much-money-do-you-need-to-start-" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">How Much Money Do You Need to Start?</h2>

                <StatHighlight
                  title="Minimum Deposits by Broker Type (2026)"
                  stats={[
                    { value: "$0", label: "OANDA", description: "US-Regulated" },
                    { value: "$1", label: "FXGlory", description: "Offshore" },
                    { value: "$10", label: "Hankotrade", description: "Offshore" },
                    { value: "$100", label: "Forex.com", description: "US-Regulated" }
                  ]}
                />

                <QuotableFact
                  fact="While you can technically start forex trading with as little as $1, most experts recommend a minimum of $500-1,000 for proper risk management. This allows you to risk only 1-2% per trade while still having meaningful position sizes."
                  source="US Forex Guide Risk Management Guidelines"
                  type="money"
                />
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA variant="inline" />

              {/* Demo Trading */}
              <section className="mb-12">
                <h2 id="heading-8-start-with-demo-trading" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Start with Demo Trading</h2>
                <p className="text-muted-foreground mb-4">
                  Before risking real money, practice with a demo account. Most brokers offer free demo accounts
                  with virtual funds ranging from $10,000 to $100,000.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-green-800">Benefits of Demo Trading</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Risk-free environment to learn trading mechanics</span>
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Test strategies before using real money</span>
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Get familiar with the trading platform</span>
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Develop emotional discipline without financial pressure</span>
                    </li>
                  </ul>
                </div>

                <QuotableFact
                  fact="We recommend practicing on a demo account for at least 3 months before trading with real money. During this time, aim to develop a consistent strategy that shows profitability over at least 100 trades."
                  source="US Forex Guide Editorial Team"
                  type="time"
                />
              </section>

              {/* Common Mistakes */}
              <section className="mb-12">
                <h2 id="heading-9-common-beginner-mistakes-to-avoid" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Common Beginner Mistakes to Avoid</h2>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-red-800">Top 5 Beginner Mistakes</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3 text-red-700">
                      <span className="font-bold">1.</span>
                      <div>
                        <strong>Overleveraging:</strong> Using maximum leverage to chase big profits. This is the #1 reason beginners blow their accounts.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-red-700">
                      <span className="font-bold">2.</span>
                      <div>
                        <strong>No Stop-Loss:</strong> Trading without stop-losses hoping the market will reverse. It often doesn't.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-red-700">
                      <span className="font-bold">3.</span>
                      <div>
                        <strong>Revenge Trading:</strong> Trying to recover losses with bigger, riskier trades.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-red-700">
                      <span className="font-bold">4.</span>
                      <div>
                        <strong>Overtrading:</strong> Taking too many trades without clear setups.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-red-700">
                      <span className="font-bold">5.</span>
                      <div>
                        <strong>Ignoring Risk Management:</strong> Risking more than 1-2% per trade.
                      </div>
                    </li>
                  </ol>
                </div>

                <QuotableFact
                  fact="According to industry data, approximately 70-80% of retail forex traders lose money. The primary reasons are overleveraging, poor risk management, and emotional trading. Successful traders focus on capital preservation first, profits second."
                  source="ESMA & CFTC Retail Trader Statistics"
                  type="stat"
                />
              </section>

              {/* Next Steps */}
              <section className="mb-12">
                <h2 id="heading-10-next-steps" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Next Steps</h2>
                <p className="text-muted-foreground mb-4">
                  Now that you understand the basics, here's your action plan:
                </p>
                <ol className="space-y-3 mb-6">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="font-bold text-primary">1.</span>
                    <span>Open a demo account with a reputable broker</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="font-bold text-primary">2.</span>
                    <span>Practice for at least 3 months before going live</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="font-bold text-primary">3.</span>
                    <span>Learn risk management (read our guide below)</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="font-bold text-primary">4.</span>
                    <span>Start with small amounts when transitioning to live trading</span>
                  </li>
                </ol>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/guides/risk-management" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                    <h3 className="font-semibold mb-2">Risk Management Essentials</h3>
                    <p className="text-sm text-muted-foreground">Learn how to protect your capital and manage risk.</p>
                  </Link>
                  <Link to="/guides/broker-comparison" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                    <h3 className="font-semibold mb-2">How to Compare Brokers</h3>
                    <p className="text-sm text-muted-foreground">Find the right broker for your trading needs.</p>
                  </Link>
                </div>
              </section>

              {/* FAQ Section */}
              <FAQSection faqs={faqs} />

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

export default BeginnersGuide;
