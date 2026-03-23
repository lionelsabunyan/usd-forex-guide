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
  },
  {
    term: "Appreciation",
    definition: "An increase in the value of a currency relative to another currency. When EUR/USD rises, the Euro is appreciating against the US Dollar.",
    relatedTerms: ["Depreciation", "Exchange Rate", "Bullish"]
  },
  {
    term: "Balance",
    definition: "The total amount of money in your trading account after all closed trades are accounted for. Unlike equity, the balance does not reflect unrealized profits or losses from open positions.",
    relatedTerms: ["Equity", "Free Margin"]
  },
  {
    term: "Bollinger Bands",
    definition: "A technical indicator consisting of a middle band (usually a 20-period SMA) and two outer bands set at standard deviations above and below. Used to measure volatility and identify overbought/oversold conditions.",
    relatedTerms: ["Indicator", "Volatility", "Moving Average"]
  },
  {
    term: "Carry Trade",
    definition: "A strategy where a trader borrows in a low-interest-rate currency and invests in a high-interest-rate currency to profit from the interest rate differential. Popular in stable market conditions.",
    relatedTerms: ["Swap", "Interest Rate"]
  },
  {
    term: "Central Bank",
    definition: "A national institution that manages a country's currency, money supply, and interest rates. Central bank decisions — such as those by the Federal Reserve or ECB — are major drivers of forex price movements.",
    relatedTerms: ["Interest Rate", "Fundamental Analysis", "Hawkish"]
  },
  {
    term: "Chart Patterns",
    definition: "Recognizable shapes formed by price movements on a chart, such as head and shoulders, double tops, triangles, and flags. Traders use these patterns to predict future price direction.",
    relatedTerms: ["Technical Analysis", "Candlestick", "Breakout"]
  },
  {
    term: "Commission",
    definition: "A fee charged by a broker for executing trades. ECN brokers typically charge commissions per lot instead of widening spreads. Commission-based pricing is often preferred by active traders.",
    relatedTerms: ["ECN", "Spread", "Broker"]
  },
  {
    term: "Copy Trading",
    definition: "A method where traders automatically replicate the trades of experienced investors. Popular platforms include ZuluTrade and eToro's CopyTrader, allowing beginners to follow proven strategies.",
    relatedTerms: ["Signal Provider", "Demo Account"]
  },
  {
    term: "Cross Currency Pair",
    definition: "A currency pair that does not include the US Dollar, such as EUR/GBP or GBP/JPY. Also called cross rates or minor pairs, these typically have wider spreads than major pairs.",
    relatedTerms: ["Major Pairs", "Exotic Pairs", "Currency Pair"]
  },
  {
    term: "Depreciation",
    definition: "A decrease in the value of a currency relative to another currency. When USD/JPY falls, the US Dollar is depreciating against the Japanese Yen.",
    relatedTerms: ["Appreciation", "Exchange Rate", "Bearish"]
  },
  {
    term: "Divergence",
    definition: "When price moves in one direction while an indicator moves in the opposite direction. Bullish divergence occurs when price makes lower lows but an indicator makes higher lows, suggesting a potential reversal.",
    relatedTerms: ["RSI", "MACD", "Indicator"]
  },
  {
    term: "Dovish",
    definition: "Describes a central bank stance favoring lower interest rates and loose monetary policy to stimulate economic growth. Dovish signals typically weaken a currency.",
    relatedTerms: ["Hawkish", "Central Bank", "Interest Rate"]
  },
  {
    term: "Economic Calendar",
    definition: "A schedule of important economic events and data releases that can affect currency markets. Key events include NFP, GDP, CPI, and central bank interest rate decisions.",
    relatedTerms: ["Fundamental Analysis", "Non-Farm Payrolls", "Volatility"]
  },
  {
    term: "Exchange Rate",
    definition: "The price of one currency expressed in terms of another. Exchange rates fluctuate based on supply and demand, interest rates, economic performance, and geopolitical factors.",
    relatedTerms: ["Currency Pair", "Appreciation", "Depreciation"]
  },
  {
    term: "FIFO (First In, First Out)",
    definition: "A rule required by US forex regulators (CFTC/NFA) that mandates traders close the oldest open position first when they have multiple positions in the same pair. FIFO prevents hedging in the same account.",
    relatedTerms: ["CFTC", "NFA", "Regulation"]
  },
  {
    term: "Floating Exchange Rate",
    definition: "An exchange rate that is determined by supply and demand in the open market, rather than being fixed by a government. Most major currencies operate under a floating exchange rate system.",
    relatedTerms: ["Exchange Rate", "Central Bank"]
  },
  {
    term: "Forex (Foreign Exchange)",
    definition: "The global decentralized market for trading currencies. With over $7.5 trillion in daily volume, forex is the largest and most liquid financial market in the world, operating 24 hours a day, 5 days a week.",
    relatedTerms: ["Currency Pair", "Liquidity"],
    relatedLink: "/guides/beginners-guide"
  },
  {
    term: "Hawkish",
    definition: "Describes a central bank stance favoring higher interest rates and tight monetary policy to control inflation. Hawkish signals typically strengthen a currency.",
    relatedTerms: ["Dovish", "Central Bank", "Interest Rate"]
  },
  {
    term: "Interest Rate",
    definition: "The rate at which a central bank lends money to commercial banks. Interest rate differentials between countries are a primary driver of forex prices, as higher rates attract foreign capital.",
    relatedTerms: ["Central Bank", "Carry Trade", "Swap"]
  },
  {
    term: "Limit Order",
    definition: "An order to buy or sell a currency pair at a specified price or better. A buy limit is placed below current price; a sell limit is placed above. Limit orders guarantee price but not execution.",
    relatedTerms: ["Market Order", "Order Types", "Stop Loss"]
  },
  {
    term: "Liquidity Provider",
    definition: "Large financial institutions — typically banks and hedge funds — that quote bid and ask prices in the forex market. They supply the liquidity that allows trades to execute quickly at stable prices.",
    relatedTerms: ["ECN", "Liquidity", "Market Maker"]
  },
  {
    term: "Market Order",
    definition: "An order to buy or sell a currency pair immediately at the best available price. Market orders guarantee execution but not a specific price, especially during volatile conditions.",
    relatedTerms: ["Limit Order", "Order Types", "Slippage"]
  },
  {
    term: "Micro Lot",
    definition: "A trading unit equal to 1,000 units of the base currency. Micro lots allow traders with smaller accounts to participate in the forex market with reduced risk per pip.",
    relatedTerms: ["Lot", "Mini Lot", "Position Size"]
  },
  {
    term: "Mini Lot",
    definition: "A trading unit equal to 10,000 units of the base currency. Mini lots are ten times larger than micro lots and one-tenth the size of a standard lot.",
    relatedTerms: ["Lot", "Micro Lot", "Position Size"]
  },
  {
    term: "Minor Pairs",
    definition: "Currency pairs that do not include the US Dollar but involve other major currencies, such as EUR/GBP, EUR/JPY, or GBP/CHF. Also called cross pairs, they generally have slightly wider spreads than major pairs.",
    relatedTerms: ["Major Pairs", "Cross Currency Pair", "Exotic Pairs"]
  },
  {
    term: "Momentum",
    definition: "The rate of change in a currency's price. Strong momentum indicates the price is moving quickly in one direction. Momentum indicators like RSI and MACD help traders gauge the strength of a move.",
    relatedTerms: ["RSI", "MACD", "Indicator"]
  },
  {
    term: "Money Management",
    definition: "A set of rules and techniques for controlling financial risk. Includes determining position sizes, setting risk per trade (commonly 1-2% of account), and maintaining consistent risk exposure.",
    relatedTerms: ["Risk Management", "Position Size", "Drawdown"]
  },
  {
    term: "Non-Farm Payrolls (NFP)",
    definition: "A monthly US economic report showing the number of jobs added or lost in non-farm sectors. NFP is one of the most market-moving events for forex, typically released the first Friday of each month.",
    relatedTerms: ["Economic Calendar", "Fundamental Analysis", "Volatility"]
  },
  {
    term: "Pending Order",
    definition: "An instruction to open a trade when the price reaches a specific level. Types include buy limit, sell limit, buy stop, and sell stop. Pending orders let traders plan entries without watching the screen.",
    relatedTerms: ["Limit Order", "Order Types", "Market Order"]
  },
  {
    term: "Pivot Point",
    definition: "A technical indicator calculated from the previous period's high, low, and close prices. Pivot points and their support/resistance levels help day traders identify potential reversal and breakout zones.",
    relatedTerms: ["Support and Resistance", "Technical Analysis", "Day Trading"]
  },
  {
    term: "Position Trading",
    definition: "A long-term trading strategy where positions are held for weeks, months, or even years. Position traders rely primarily on fundamental analysis and long-term trends, ignoring short-term fluctuations.",
    relatedTerms: ["Swing Trading", "Day Trading", "Fundamental Analysis"]
  },
  {
    term: "Price Action",
    definition: "A trading approach that analyzes raw price movements without relying on indicators. Price action traders read candlestick patterns, support/resistance levels, and market structure to make decisions.",
    relatedTerms: ["Candlestick", "Support and Resistance", "Technical Analysis"]
  },
  {
    term: "Pullback",
    definition: "A brief price reversal within an ongoing trend. Traders often use pullbacks to enter positions in the direction of the main trend at a more favorable price.",
    relatedTerms: ["Retracement", "Trend", "Support and Resistance"]
  },
  {
    term: "Range Trading",
    definition: "A strategy that involves buying at support and selling at resistance when the market moves sideways within a defined range. Range traders profit from the repeated bouncing between these levels.",
    relatedTerms: ["Support and Resistance", "Consolidation", "Breakout"]
  },
  {
    term: "Regulation",
    definition: "Oversight of forex brokers by government agencies to protect traders. In the US, the CFTC and NFA regulate forex brokers. Regulated brokers must meet capital requirements, segregate client funds, and follow strict rules.",
    relatedTerms: ["CFTC", "NFA", "Broker"],
    relatedLink: "/guides/us-forex-regulations"
  },
  {
    term: "Requote",
    definition: "When a broker is unable to execute an order at the requested price and offers a new price instead. Requotes are more common during high volatility and with market maker brokers.",
    relatedTerms: ["Slippage", "Market Maker", "ECN"]
  },
  {
    term: "Rollover",
    definition: "The process of extending the settlement date of an open position to the next trading day. Rollover involves either paying or receiving a swap fee based on the interest rate differential.",
    relatedTerms: ["Swap", "Interest Rate", "Carry Trade"]
  },
  {
    term: "Safe Haven Currency",
    definition: "A currency expected to retain or increase its value during market turmoil. The US Dollar (USD), Japanese Yen (JPY), and Swiss Franc (CHF) are traditional safe haven currencies.",
    relatedTerms: ["Volatility", "Risk Management", "Currency Pair"]
  },
  {
    term: "Sentiment Analysis",
    definition: "Gauging the overall attitude of market participants toward a currency pair. Sentiment can be measured through positioning data (like the COT report), surveys, and market flow indicators.",
    relatedTerms: ["Fundamental Analysis", "Technical Analysis"]
  },
  {
    term: "Signal Provider",
    definition: "A service or trader that generates trade recommendations (buy/sell signals) for subscribers. Signals may be delivered via email, SMS, app notifications, or integrated directly into trading platforms.",
    relatedTerms: ["Copy Trading", "Technical Analysis"]
  },
  {
    term: "Stop Out Level",
    definition: "The margin level at which a broker begins automatically closing your positions to prevent further losses. Typically set at 50% margin level for US brokers, this is the last line of defense before account depletion.",
    relatedTerms: ["Margin Call", "Margin", "Free Margin"]
  },
  {
    term: "Trailing Stop",
    definition: "A dynamic stop loss that moves with the market price. As the trade moves in your favor, the trailing stop follows by a set distance. It only moves in the profitable direction and locks in gains.",
    relatedTerms: ["Stop Loss", "Risk Management", "Order Types"]
  },
  {
    term: "Trading Plan",
    definition: "A comprehensive written document outlining a trader's strategy, risk rules, entry/exit criteria, and goals. A solid trading plan removes emotional decision-making and promotes consistency.",
    relatedTerms: ["Risk Management", "Money Management"]
  },
  {
    term: "Trading Session",
    definition: "A period when a major financial center's markets are open. The three main forex sessions are: Asian (Tokyo), European (London), and North American (New York). Overlap periods see the highest volatility.",
    relatedTerms: ["Liquidity", "Volatility"],
    relatedLink: "/tools"
  },
  {
    term: "Whipsaw",
    definition: "A rapid price movement in one direction followed by a sharp reversal. Whipsaws often trigger stop losses before the market moves in the originally expected direction, causing frustrating losses.",
    relatedTerms: ["Stop Loss", "Volatility", "Slippage"]
  },
  {
    term: "Yield",
    definition: "The income return on an investment, usually expressed as a percentage. In forex, yield differentials between countries influence capital flows and exchange rates. Higher yields attract foreign investment.",
    relatedTerms: ["Interest Rate", "Carry Trade", "Central Bank"]
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

  // Top terms targeted for Google featured snippets (definition + FAQ format)
  const snippetTargetTerms = [
    "Pip", "Spread", "Leverage", "Margin", "Margin Call", "Lot",
    "Currency Pair", "Stop Loss", "Take Profit", "Major Pairs",
    "ECN (Electronic Communication Network)", "Swap", "Slippage",
    "Risk-Reward Ratio", "Candlestick"
  ];

  const faqSnippetItems = glossaryTerms
    .filter(t => snippetTargetTerms.includes(t.term))
    .map(t => ({
      "@type": "Question",
      "name": `What is ${t.term.replace(/\s*\(.*?\)\s*/g, "")} in forex trading?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${t.term.replace(/\s*\(.*?\)\s*/g, "")} is ${t.definition.charAt(0).toLowerCase()}${t.definition.slice(1)}`
      }
    }));

  const jsonLd = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqSnippetItems
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Forex Glossary: 100+ Trading Terms Explained for Beginners"
        description="Learn essential forex trading terminology. Our comprehensive A-Z glossary covers pips, spreads, leverage, margin, and 100+ terms every forex trader needs to know."
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
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">100+ Terms</span>
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
                    {terms.map((term, idx) => {
                      const isSnippetTarget = snippetTargetTerms.includes(term.term);
                      const cleanName = term.term.replace(/\s*\(.*?\)\s*/g, "");
                      return (
                      <Card
                        key={idx}
                        id={term.term.toLowerCase().replace(/\s+/g, "-")}
                        className="bg-card border-border hover:border-primary/50 transition-all"
                      >
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {isSnippetTarget ? `What is ${cleanName} in Forex?` : term.term}
                          </h3>
                          {isSnippetTarget && (
                            <p className="text-sm font-medium text-primary mb-1">{term.term}</p>
                          )}
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
                      );
                    })}
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
