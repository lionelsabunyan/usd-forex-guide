import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { useState, useMemo } from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type GlossaryTerm = {
  term: string;
  definition: string;
  relatedTerms?: string[];
  relatedLink?: string;
};

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Ask Price",
    definition: "The price at which a broker is willing to sell a currency pair. Also known as the 'offer price'. The ask is always higher than the bid price, with the difference being the spread.",
    relatedTerms: ["Bid Price", "Spread"]
  },
  {
    term: "Base Currency",
    definition: "The first currency in a currency pair. For example, in EUR/USD, the Euro is the base currency. The base currency represents how much of the quote currency is needed to buy one unit of the base.",
    relatedTerms: ["Quote Currency", "Currency Pair"]
  },
  {
    term: "Bid Price",
    definition: "The price at which a broker is willing to buy a currency pair from you. When you sell, you receive the bid price. The bid is always lower than the ask price.",
    relatedTerms: ["Ask Price", "Spread"]
  },
  {
    term: "Broker",
    definition: "A company or individual that acts as an intermediary between retail traders and the forex market. Brokers provide trading platforms and execute trades on behalf of their clients.",
    relatedLink: "/compare"
  },
  {
    term: "CFTC",
    definition: "Commodity Futures Trading Commission. The US federal agency responsible for regulating futures and options markets, including retail forex trading. CFTC-regulated brokers are considered the safest for US traders.",
    relatedTerms: ["NFA", "Regulation"],
    relatedLink: "/guides/us-forex-regulations"
  },
  {
    term: "Currency Pair",
    definition: "A quotation of two different currencies, with the value of one currency quoted against the other. The first currency is the base currency, and the second is the quote currency. Example: EUR/USD, GBP/JPY.",
    relatedTerms: ["Base Currency", "Quote Currency", "Major Pairs"]
  },
  {
    term: "Day Trading",
    definition: "A trading strategy where positions are opened and closed within the same trading day. Day traders avoid overnight holding costs and the risk of overnight market movements.",
    relatedTerms: ["Scalping", "Swing Trading"]
  },
  {
    term: "Demo Account",
    definition: "A practice trading account that uses virtual money. Demo accounts allow traders to learn the platform and test strategies without risking real capital.",
    relatedLink: "/blog/how-to-use-forex-demo-account"
  },
  {
    term: "ECN (Electronic Communication Network)",
    definition: "A type of broker that provides direct access to other participants in the forex market. ECN brokers typically offer tighter spreads but charge commissions per trade.",
    relatedTerms: ["Market Maker", "STP"]
  },
  {
    term: "Fundamental Analysis",
    definition: "A method of analyzing currency movements based on economic indicators, news events, and monetary policy decisions. Fundamental traders focus on economic data like GDP, employment, and interest rates.",
    relatedTerms: ["Technical Analysis"],
    relatedLink: "/guides/fundamental-analysis"
  },
  {
    term: "Leverage",
    definition: "Borrowed capital that allows traders to control larger positions with a smaller amount of money. For example, 1:100 leverage means $100 can control $10,000 in currency. Higher leverage increases both potential profits and losses.",
    relatedTerms: ["Margin", "Margin Call"],
    relatedLink: "/blog/forex-leverage-explained"
  },
  {
    term: "Liquidity",
    definition: "The degree to which a currency can be bought or sold without affecting its price. Major currency pairs have high liquidity, meaning trades execute quickly with minimal price impact.",
    relatedTerms: ["Major Pairs", "Spread"]
  },
  {
    term: "Long Position",
    definition: "Buying a currency pair with the expectation that it will increase in value. Going long on EUR/USD means you expect the Euro to strengthen against the US Dollar.",
    relatedTerms: ["Short Position", "Buy"]
  },
  {
    term: "Lot",
    definition: "A standardized unit of currency in forex trading. A standard lot is 100,000 units of the base currency. Mini lots (10,000) and micro lots (1,000) are also common.",
    relatedTerms: ["Pip", "Position Size"]
  },
  {
    term: "Major Pairs",
    definition: "The most traded currency pairs in the forex market, all involving the US Dollar. Examples include EUR/USD, GBP/USD, USD/JPY, and USD/CHF. Major pairs have the highest liquidity and tightest spreads.",
    relatedTerms: ["Minor Pairs", "Exotic Pairs", "Currency Pair"]
  },
  {
    term: "Margin",
    definition: "The amount of money required in your account to open and maintain a leveraged position. Margin is essentially a good-faith deposit that protects the broker against potential losses.",
    relatedTerms: ["Leverage", "Margin Call", "Free Margin"]
  },
  {
    term: "Margin Call",
    definition: "A broker's demand for additional funds when the equity in a trading account falls below the required margin level. If not met, the broker may close positions to prevent further losses.",
    relatedTerms: ["Margin", "Stop Out Level"],
    relatedLink: "/guides/risk-management"
  },
  {
    term: "Market Maker",
    definition: "A type of broker that creates a market for their clients by quoting both bid and ask prices. Market makers may trade against their clients but provide guaranteed order execution.",
    relatedTerms: ["ECN", "STP"]
  },
  {
    term: "MetaTrader 4 (MT4)",
    definition: "The most popular forex trading platform, developed by MetaQuotes. MT4 offers charting tools, technical indicators, automated trading (Expert Advisors), and is supported by most brokers.",
    relatedTerms: ["MetaTrader 5", "Trading Platform"],
    relatedLink: "/blog/mt4-vs-mt5"
  },
  {
    term: "MetaTrader 5 (MT5)",
    definition: "The successor to MT4 with additional features including more timeframes, more order types, an economic calendar, and multi-asset trading. Not all brokers support MT5.",
    relatedTerms: ["MetaTrader 4", "Trading Platform"],
    relatedLink: "/blog/mt4-vs-mt5"
  },
  {
    term: "NFA",
    definition: "National Futures Association. A self-regulatory organization for the US derivatives industry. NFA membership is required for forex brokers serving US clients.",
    relatedTerms: ["CFTC", "Regulation"],
    relatedLink: "/guides/us-forex-regulations"
  },
  {
    term: "Offshore Broker",
    definition: "A forex broker registered and regulated outside the trader's home country. US traders often use offshore brokers to access higher leverage and fewer restrictions, but with less regulatory protection.",
    relatedTerms: ["CFTC", "Regulation"],
    relatedLink: "/blog/offshore-vs-regulated-forex-brokers"
  },
  {
    term: "Order Types",
    definition: "Different ways to enter or exit the market. Common types include Market Orders (execute immediately), Limit Orders (execute at specified price), and Stop Orders (trigger when price reaches a level).",
    relatedTerms: ["Stop Loss", "Take Profit"]
  },
  {
    term: "Pip",
    definition: "Percentage in Point. The smallest price movement in a currency pair. For most pairs, a pip is 0.0001 (the fourth decimal place). For JPY pairs, a pip is 0.01 (the second decimal place).",
    relatedTerms: ["Pipette", "Point"],
    relatedLink: "/tools/pip-calculator"
  },
  {
    term: "Pipette",
    definition: "A fractional pip, representing one-tenth of a pip. When pricing shows 5 decimal places (like 1.12345), the fifth decimal is a pipette. Allows for more precise pricing.",
    relatedTerms: ["Pip"]
  },
  {
    term: "Position Size",
    definition: "The number of lots or units you trade. Proper position sizing is crucial for risk management, ensuring no single trade can significantly damage your account.",
    relatedTerms: ["Lot", "Risk Management"],
    relatedLink: "/tools/position-size-calculator"
  },
  {
    term: "Quote Currency",
    definition: "The second currency in a currency pair. In EUR/USD, the US Dollar is the quote currency. It shows how much of this currency is needed to buy one unit of the base currency.",
    relatedTerms: ["Base Currency", "Currency Pair"]
  },
  {
    term: "Risk Management",
    definition: "The process of identifying, analyzing, and controlling potential losses in trading. Includes position sizing, stop losses, and diversification strategies.",
    relatedTerms: ["Stop Loss", "Position Size"],
    relatedLink: "/guides/risk-management"
  },
  {
    term: "Scalping",
    definition: "A trading strategy that involves making many small trades to capture tiny price movements. Scalpers may hold positions for seconds to minutes and require tight spreads and fast execution.",
    relatedTerms: ["Day Trading", "Spread"]
  },
  {
    term: "Short Position",
    definition: "Selling a currency pair with the expectation that it will decrease in value. Going short on EUR/USD means you expect the Euro to weaken against the US Dollar.",
    relatedTerms: ["Long Position", "Sell"]
  },
  {
    term: "Slippage",
    definition: "The difference between the expected price of a trade and the price at which it actually executes. Slippage often occurs during high volatility or when trading large positions.",
    relatedTerms: ["Market Order", "Liquidity"]
  },
  {
    term: "Spread",
    definition: "The difference between the bid and ask price of a currency pair. Spreads represent a cost of trading and are how many brokers make money. Tighter spreads mean lower trading costs.",
    relatedTerms: ["Bid Price", "Ask Price"],
    relatedLink: "/blog/forex-spreads-explained"
  },
  {
    term: "Stop Loss",
    definition: "An order to close a position at a specified price level to limit losses. A crucial risk management tool that automatically exits a trade if the market moves against you.",
    relatedTerms: ["Take Profit", "Risk Management"],
    relatedLink: "/guides/risk-management"
  },
  {
    term: "STP (Straight Through Processing)",
    definition: "A type of broker that passes orders directly to liquidity providers without a dealing desk. STP brokers don't trade against clients but may mark up spreads.",
    relatedTerms: ["ECN", "Market Maker"]
  },
  {
    term: "Swap",
    definition: "The interest paid or received for holding a position overnight. Also called rollover. Swaps depend on the interest rate differential between the two currencies in a pair.",
    relatedTerms: ["Rollover", "Overnight Position"]
  },
  {
    term: "Swing Trading",
    definition: "A trading strategy that holds positions for several days to weeks, aiming to capture larger price movements. Swing traders use both technical and fundamental analysis.",
    relatedTerms: ["Day Trading", "Position Trading"]
  },
  {
    term: "Take Profit",
    definition: "An order to close a position at a specified price level to lock in profits. The opposite of a stop loss, it automatically exits a winning trade at your target price.",
    relatedTerms: ["Stop Loss", "Risk Management"]
  },
  {
    term: "Technical Analysis",
    definition: "A method of analyzing price movements using charts, patterns, and indicators. Technical traders believe historical price action can predict future movements.",
    relatedTerms: ["Fundamental Analysis", "Chart Patterns"],
    relatedLink: "/guides/technical-analysis"
  },
  {
    term: "Trend",
    definition: "The general direction of market prices. An uptrend has higher highs and higher lows; a downtrend has lower highs and lower lows. Trading with the trend is a common strategy.",
    relatedTerms: ["Technical Analysis", "Support and Resistance"]
  },
  {
    term: "Volatility",
    definition: "A measure of how much and how quickly prices move. High volatility means larger price swings, creating both opportunities and risks for traders.",
    relatedTerms: ["Risk Management", "Liquidity"]
  },
  {
    term: "Breakout",
    definition: "When the price moves outside a defined support or resistance level with increased volume. Breakouts can signal the start of a new trend and are often used as entry signals by traders.",
    relatedTerms: ["Support and Resistance", "Trend"]
  },
  {
    term: "Consolidation",
    definition: "A period when the price moves sideways within a range, neither making new highs nor new lows. Consolidation often precedes a breakout and represents market indecision.",
    relatedTerms: ["Breakout", "Range Trading"]
  },
  {
    term: "Drawdown",
    definition: "The decline in account value from peak to trough before a new peak is reached. Maximum drawdown is an important risk metric that shows the worst loss experienced during a trading period.",
    relatedTerms: ["Risk Management", "Position Size"]
  },
  {
    term: "Fibonacci Retracement",
    definition: "A technical analysis tool based on the Fibonacci sequence. Traders use levels like 23.6%, 38.2%, 50%, and 61.8% to identify potential support and resistance levels during price corrections.",
    relatedTerms: ["Technical Analysis", "Support and Resistance"]
  },
  {
    term: "Hedging",
    definition: "Opening positions to offset potential losses in other positions. Forex hedging might involve taking opposite positions in correlated currency pairs to reduce risk exposure.",
    relatedTerms: ["Risk Management", "Correlation"]
  },
  {
    term: "Indicator",
    definition: "A mathematical calculation based on price, volume, or open interest that traders use to predict future price movements. Common indicators include Moving Averages, RSI, MACD, and Bollinger Bands.",
    relatedTerms: ["Technical Analysis", "Moving Average", "RSI"]
  },
  {
    term: "Moving Average",
    definition: "A technical indicator that smooths price data by calculating the average price over a specific number of periods. Common types include Simple Moving Average (SMA) and Exponential Moving Average (EMA).",
    relatedTerms: ["Technical Analysis", "Indicator", "Trend"]
  },
  {
    term: "RSI (Relative Strength Index)",
    definition: "A momentum indicator measuring the speed and magnitude of price changes on a scale of 0-100. Readings above 70 suggest overbought conditions, while below 30 suggests oversold.",
    relatedTerms: ["Indicator", "Technical Analysis", "Overbought"]
  },
  {
    term: "MACD",
    definition: "Moving Average Convergence Divergence. A trend-following momentum indicator showing the relationship between two moving averages. Used to identify trend direction, momentum, and potential reversals.",
    relatedTerms: ["Moving Average", "Indicator", "Momentum"]
  },
  {
    term: "Candlestick",
    definition: "A type of price chart showing the open, high, low, and close prices for a specific period. The body shows the range between open and close, while wicks show the high and low.",
    relatedTerms: ["Technical Analysis", "Chart Patterns"]
  },
  {
    term: "Risk-Reward Ratio",
    definition: "The ratio between potential loss (risk) and potential profit (reward) on a trade. A 1:2 ratio means risking $1 to potentially make $2. Professional traders typically aim for at least 1:2 ratios.",
    relatedTerms: ["Risk Management", "Stop Loss", "Take Profit"]
  },
  {
    term: "Overbought",
    definition: "A condition where an asset's price has risen too quickly and may be due for a pullback. Often identified using indicators like RSI above 70. The opposite is oversold.",
    relatedTerms: ["RSI", "Oversold", "Technical Analysis"]
  },
  {
    term: "Oversold",
    definition: "A condition where an asset's price has fallen too quickly and may be due for a bounce. Often identified using indicators like RSI below 30. The opposite is overbought.",
    relatedTerms: ["RSI", "Overbought", "Technical Analysis"]
  },
  {
    term: "Support and Resistance",
    definition: "Price levels where buying (support) or selling (resistance) pressure is expected to be strong. Support acts as a floor preventing further decline, while resistance acts as a ceiling.",
    relatedTerms: ["Technical Analysis", "Breakout", "Trend"]
  },
  {
    term: "Retracement",
    definition: "A temporary price movement against the prevailing trend. Retracements are normal and don't change the overall trend direction. Traders often enter on retracements to get better prices.",
    relatedTerms: ["Fibonacci Retracement", "Trend", "Pullback"]
  },
  {
    term: "Bullish",
    definition: "A positive outlook on the market, expecting prices to rise. A bullish trader believes the base currency will strengthen against the quote currency.",
    relatedTerms: ["Bearish", "Trend", "Long Position"]
  },
  {
    term: "Bearish",
    definition: "A negative outlook on the market, expecting prices to fall. A bearish trader believes the base currency will weaken against the quote currency.",
    relatedTerms: ["Bullish", "Trend", "Short Position"]
  },
  {
    term: "Exotic Pairs",
    definition: "Currency pairs involving one major currency and one from an emerging market economy, such as USD/TRY or EUR/ZAR. Exotic pairs have wider spreads and lower liquidity than majors.",
    relatedTerms: ["Major Pairs", "Currency Pair", "Spread"]
  },
  {
    term: "Free Margin",
    definition: "The amount of money in your trading account available to open new positions. Calculated as equity minus used margin. When free margin reaches zero, you cannot open new trades.",
    relatedTerms: ["Margin", "Margin Call", "Equity"]
  },
  {
    term: "Equity",
    definition: "The total value of your trading account, including unrealized profits and losses from open positions. Equity = Account Balance + Floating P/L.",
    relatedTerms: ["Free Margin", "Balance", "Margin"]
  },
  {
    term: "Correlation",
    definition: "The statistical relationship between two currency pairs. Positively correlated pairs move together; negatively correlated pairs move opposite. Understanding correlation helps manage portfolio risk.",
    relatedTerms: ["Risk Management", "Hedging", "Currency Pair"]
  },
  {
    term: "Expert Advisor (EA)",
    definition: "An automated trading program that runs on MetaTrader platforms. EAs can analyze markets and execute trades automatically based on programmed rules without manual intervention.",
    relatedTerms: ["MetaTrader 4", "MetaTrader 5", "Automated Trading"]
  },
  {
    term: "Backtesting",
    definition: "Testing a trading strategy on historical data to evaluate its potential performance. Backtesting helps traders refine strategies before risking real money, though past results don't guarantee future performance.",
    relatedTerms: ["Technical Analysis", "Expert Advisor", "Strategy"]
  },
  {
    term: "Gap",
    definition: "A price area on a chart where no trading occurred, appearing as a jump between closing and opening prices. Gaps often occur over weekends or after major news events.",
    relatedTerms: ["Volatility", "Candlestick", "Slippage"]
  }
];

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      terms = terms.filter(
        t => t.term.toLowerCase().includes(search) || t.definition.toLowerCase().includes(search)
      );
    }

    if (selectedLetter) {
      terms = terms.filter(t => t.term.toUpperCase().startsWith(selectedLetter));
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedLetter]);

  const termsByLetter = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(term);
    });
    return grouped;
  }, [filteredTerms]);

  const availableLetters = useMemo(() => {
    return new Set(glossaryTerms.map(t => t.term[0].toUpperCase()));
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Forex Trading Glossary",
    "description": "Comprehensive glossary of forex trading terms for beginners and experienced traders.",
    "url": "https://beginnerfxguide.com/glossary",
    "hasDefinedTerm": glossaryTerms.map(t => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Forex Glossary: 60+ Trading Terms Explained for Beginners"
        description="Learn essential forex trading terminology. Our comprehensive glossary covers pips, spreads, leverage, margin, and all the terms you need to know as a forex trader."
        canonical="/glossary"
        jsonLd={jsonLd}
      />

      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Glossary" }
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">60+ Terms</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Forex Trading <span className="text-gradient-gold">Glossary</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Master the language of forex trading with our comprehensive glossary of essential terms and definitions.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-card border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedLetter(null);
                }}
                className="w-full pl-12 pr-4 py-3 bg-background"
              />
            </div>

            {/* Alphabet Filter */}
            <div className="flex flex-wrap gap-1 justify-center">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  !selectedLetter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                All
              </button>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter);
                    setSearchTerm("");
                  }}
                  disabled={!availableLetters.has(letter)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedLetter === letter
                      ? "bg-primary text-primary-foreground"
                      : availableLetters.has(letter)
                      ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      : "bg-secondary/50 text-muted-foreground/30 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No terms found matching "{searchTerm}"</p>
              </div>
            ) : (
              Object.entries(termsByLetter).map(([letter, terms]) => (
                <div key={letter} className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary inline-block">
                    {letter}
                  </h2>
                  <div className="space-y-4">
                    {terms.map((term, idx) => (
                      <Card
                        key={idx}
                        id={term.term.toLowerCase().replace(/\s+/g, "-")}
                        className="bg-card border-border hover:border-primary/50 transition-all"
                      >
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {term.term}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-3">
                            {term.definition}
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                <span className="text-sm text-muted-foreground">Related:</span>
                                {term.relatedTerms.map((related, ridx) => (
                                  <a
                                    key={ridx}
                                    href={`#${related.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="text-sm text-primary hover:text-primary/80 underline"
                                  >
                                    {related}
                                  </a>
                                ))}
                              </div>
                            )}

                            {term.relatedLink && (
                              <Link
                                to={term.relatedLink}
                                className="inline-flex items-center gap-1 text-sm text-success hover:text-success/80 font-medium"
                              >
                                Learn more
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-muted-foreground mb-6">
              Now that you understand the terminology, compare the best forex brokers for US traders.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/compare"
                className="bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Compare Brokers
              </Link>
              <Link
                to="/guides/beginners-guide"
                className="border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                Beginner's Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GlossaryPage;
