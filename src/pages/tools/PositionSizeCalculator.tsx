import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Scale, Info, DollarSign, Shield, AlertTriangle, RefreshCw } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";
import { Link } from "react-router-dom";

// Common currency pairs with their pip decimal places
const currencyPairs = [
  { pair: "EUR/USD", pipDecimal: 4, label: "EUR/USD (Euro/US Dollar)" },
  { pair: "GBP/USD", pipDecimal: 4, label: "GBP/USD (British Pound/US Dollar)" },
  { pair: "USD/JPY", pipDecimal: 2, label: "USD/JPY (US Dollar/Japanese Yen)" },
  { pair: "USD/CHF", pipDecimal: 4, label: "USD/CHF (US Dollar/Swiss Franc)" },
  { pair: "AUD/USD", pipDecimal: 4, label: "AUD/USD (Australian Dollar/US Dollar)" },
  { pair: "USD/CAD", pipDecimal: 4, label: "USD/CAD (US Dollar/Canadian Dollar)" },
  { pair: "NZD/USD", pipDecimal: 4, label: "NZD/USD (New Zealand Dollar/US Dollar)" },
  { pair: "EUR/GBP", pipDecimal: 4, label: "EUR/GBP (Euro/British Pound)" },
  { pair: "EUR/JPY", pipDecimal: 2, label: "EUR/JPY (Euro/Japanese Yen)" },
  { pair: "GBP/JPY", pipDecimal: 2, label: "GBP/JPY (British Pound/Japanese Yen)" },
  { pair: "XAU/USD", pipDecimal: 2, label: "XAU/USD (Gold/US Dollar)" },
];

const riskPercentages = [
  { value: 0.5, label: "0.5% (Conservative)" },
  { value: 1, label: "1% (Recommended)" },
  { value: 2, label: "2% (Moderate)" },
  { value: 3, label: "3% (Aggressive)" },
  { value: 5, label: "5% (High Risk)" },
];

const faqs = [
  {
    question: "What is position sizing in forex?",
    answer: "Position sizing determines how many lots (units) you trade based on your account size, risk tolerance, and stop-loss distance. Proper position sizing is crucial for long-term survival in forex trading. It ensures you never risk more than a predetermined percentage of your account on any single trade."
  },
  {
    question: "What is the 1% rule in forex trading?",
    answer: "The 1% rule states that you should never risk more than 1% of your trading account on a single trade. For a $10,000 account, this means risking maximum $100 per trade. This conservative approach helps protect your capital from a series of losses and ensures you can survive drawdowns."
  },
  {
    question: "How do I calculate position size?",
    answer: "Position Size (lots) = Risk Amount ÷ (Stop Loss in Pips × Pip Value). For example: With a $10,000 account, 1% risk ($100), 50 pip stop-loss, and $10 pip value: Position Size = $100 ÷ (50 × $10) = 0.20 lots. Our calculator does this automatically for any currency pair."
  },
  {
    question: "What's the difference between lots, mini lots, and micro lots?",
    answer: "A standard lot is 100,000 units of the base currency. A mini lot is 10,000 units (0.1 lots), and a micro lot is 1,000 units (0.01 lots). For beginners, starting with micro lots allows you to trade with smaller risk while learning proper money management."
  },
  {
    question: "Why is position sizing more important than entry/exit strategies?",
    answer: "Even the best trading strategy will fail without proper position sizing. You could have a 60% win rate, but if your losses are 3x your wins due to poor sizing, you'll lose money. Position sizing ensures each trade risks the same percentage, making your equity curve smoother and more predictable."
  },
  {
    question: "How does stop-loss distance affect position size?",
    answer: "Stop-loss distance has an inverse relationship with position size. A tighter stop (fewer pips) allows for larger position sizes while maintaining the same dollar risk. A wider stop requires smaller position sizes. This is why scalpers can trade larger positions than swing traders with the same risk percentage."
  },
  {
    question: "Should US traders adjust position size for leverage limits?",
    answer: "Yes. CFTC limits US traders to 50:1 leverage on major pairs and 20:1 on minors. This may prevent you from taking positions as large as your risk calculation suggests. Always verify your required margin doesn't exceed your available margin before placing trades."
  },
  {
    question: "What is risk-reward ratio and how does it relate to position sizing?",
    answer: "Risk-reward ratio compares potential profit to potential loss. A 1:2 ratio means your target is twice your stop-loss. While position sizing controls HOW MUCH you risk, risk-reward ratio helps determine IF a trade is worth taking. Combine both: risk 1% per trade with minimum 1:2 reward potential."
  }
];

const PositionSizeCalculator = () => {
  const [accountBalance, setAccountBalance] = useState("10000");
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [stopLossPips, setStopLossPips] = useState("50");
  const [selectedPair, setSelectedPair] = useState(currencyPairs[0]);
  const [exchangeRate, setExchangeRate] = useState("1.0850");
  const [takeProfitPips, setTakeProfitPips] = useState("100");

  const calculation = useMemo(() => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = riskPercentage;
    const stopLoss = parseFloat(stopLossPips) || 0;
    const rate = parseFloat(exchangeRate) || 1;
    const takeProfit = parseFloat(takeProfitPips) || 0;
    const pipDecimal = selectedPair.pipDecimal;

    // Calculate risk amount in dollars
    const riskAmount = balance * (risk / 100);

    // Calculate pip value for 1 standard lot
    const onePip = pipDecimal === 4 ? 0.0001 : 0.01;
    const lotSize = 100000; // standard lot
    const pair = selectedPair.pair;

    let pipValuePerLot: number;
    if (pair.endsWith("/USD")) {
      pipValuePerLot = onePip * lotSize;
    } else if (pair.startsWith("USD/")) {
      pipValuePerLot = (onePip * lotSize) / rate;
    } else {
      pipValuePerLot = (onePip * lotSize) / rate;
    }

    // Calculate position size
    const positionSizeLots = stopLoss > 0 ? riskAmount / (stopLoss * pipValuePerLot) : 0;
    const positionSizeUnits = positionSizeLots * lotSize;

    // Risk/Reward ratio
    const riskRewardRatio = stopLoss > 0 && takeProfit > 0 ? takeProfit / stopLoss : 0;

    // Potential profit
    const potentialProfit = positionSizeLots * pipValuePerLot * takeProfit;

    // Categorize lot size
    let lotCategory = "";
    if (positionSizeLots >= 1) {
      lotCategory = `${positionSizeLots.toFixed(2)} Standard Lots`;
    } else if (positionSizeLots >= 0.1) {
      lotCategory = `${(positionSizeLots * 10).toFixed(1)} Mini Lots`;
    } else {
      lotCategory = `${(positionSizeLots * 100).toFixed(0)} Micro Lots`;
    }

    return {
      riskAmount: riskAmount.toFixed(2),
      positionSizeLots: positionSizeLots.toFixed(2),
      positionSizeUnits: positionSizeUnits.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      pipValuePerLot: pipValuePerLot.toFixed(2),
      riskRewardRatio: riskRewardRatio.toFixed(2),
      potentialProfit: potentialProfit.toFixed(2),
      lotCategory,
    };
  }, [accountBalance, riskPercentage, stopLossPips, selectedPair, exchangeRate, takeProfitPips]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Position Size Calculator | Forex Lot Size Calculator 2026"
        description="Calculate perfect position size for any forex trade. Free lot size calculator with risk management. Never risk more than you should with our position sizing tool."
        canonical="/tools/position-size-calculator"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Position Size Calculator",
          "description": "Calculate optimal position size based on risk tolerance and stop-loss",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide"
          }
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Tools", href: "/tools" },
              { label: "Position Size Calculator" }
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Scale className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Free Tool</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Position Size <span className="text-gradient-gold">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-4">
            Calculate the optimal lot size for any trade based on your account balance,
            risk tolerance, and stop-loss distance. Essential for proper money management.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Calculate Position Size
                </h2>

                <div className="space-y-5">
                  {/* Account Balance */}
                  <div>
                    <Label htmlFor="balance" className="text-sm font-medium mb-2 block">
                      Account Balance (USD)
                    </Label>
                    <Input
                      id="balance"
                      type="number"
                      step="100"
                      min="100"
                      value={accountBalance}
                      onChange={(e) => setAccountBalance(e.target.value)}
                      placeholder="10000"
                    />
                  </div>

                  {/* Risk Percentage */}
                  <div>
                    <Label htmlFor="risk" className="text-sm font-medium mb-2 block">
                      Risk Per Trade
                    </Label>
                    <select
                      id="risk"
                      className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={riskPercentage}
                      onChange={(e) => setRiskPercentage(parseFloat(e.target.value))}
                    >
                      {riskPercentages.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Professional traders typically risk 0.5-2% per trade
                    </p>
                  </div>

                  {/* Currency Pair */}
                  <div>
                    <Label htmlFor="pair" className="text-sm font-medium mb-2 block">
                      Currency Pair
                    </Label>
                    <select
                      id="pair"
                      className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={selectedPair.pair}
                      onChange={(e) => {
                        const pair = currencyPairs.find(p => p.pair === e.target.value);
                        if (pair) setSelectedPair(pair);
                      }}
                    >
                      {currencyPairs.map(p => (
                        <option key={p.pair} value={p.pair}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Exchange Rate */}
                  <div>
                    <Label htmlFor="rate" className="text-sm font-medium mb-2 block">
                      Current Exchange Rate
                    </Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.0001"
                      value={exchangeRate}
                      onChange={(e) => setExchangeRate(e.target.value)}
                      placeholder="1.0850"
                    />
                  </div>

                  {/* Stop Loss */}
                  <div>
                    <Label htmlFor="stopLoss" className="text-sm font-medium mb-2 block">
                      Stop Loss (Pips)
                    </Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      step="1"
                      min="1"
                      value={stopLossPips}
                      onChange={(e) => setStopLossPips(e.target.value)}
                      placeholder="50"
                    />
                  </div>

                  {/* Take Profit (optional) */}
                  <div>
                    <Label htmlFor="takeProfit" className="text-sm font-medium mb-2 block">
                      Take Profit (Pips) - Optional
                    </Label>
                    <Input
                      id="takeProfit"
                      type="number"
                      step="1"
                      min="0"
                      value={takeProfitPips}
                      onChange={(e) => setTakeProfitPips(e.target.value)}
                      placeholder="100"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      setAccountBalance("10000");
                      setRiskPercentage(1);
                      setStopLossPips("50");
                      setExchangeRate("1.0850");
                      setTakeProfitPips("100");
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-gradient-card border border-border rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Your Position Size
                  </h2>

                  <div className="space-y-4">
                    {/* Main Result */}
                    <div className="bg-primary/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Recommended Position Size</p>
                      <p className="text-3xl font-bold text-primary">
                        {calculation.positionSizeLots} <span className="text-lg font-normal">lots</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {calculation.lotCategory}
                      </p>
                    </div>

                    {/* Risk Amount */}
                    <div className="bg-red-500/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Risk Amount ({riskPercentage}%)</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${calculation.riskAmount}
                      </p>
                    </div>

                    {/* Potential Profit */}
                    <div className="bg-green-500/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Potential Profit (at TP)</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${calculation.potentialProfit}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Units</p>
                        <p className="text-lg font-semibold">{calculation.positionSizeUnits}</p>
                      </div>
                      <div className="bg-secondary rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Risk/Reward</p>
                        <p className="text-lg font-semibold">
                          1:{calculation.riskRewardRatio}
                          {parseFloat(calculation.riskRewardRatio) >= 2 && (
                            <span className="text-green-500 text-xs ml-1">✓</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Warning */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">The 1% Rule</h4>
                      <p className="text-sm text-amber-700">
                        Never risk more than 1-2% per trade. A losing streak of 10 trades with 1% risk
                        loses only ~10% of your account. With 5% risk, you'd lose ~40%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* R:R Guidance */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Risk/Reward Tip</h4>
                      <p className="text-sm text-blue-700">
                        {parseFloat(calculation.riskRewardRatio) >= 2 ? (
                          <>Your R:R of 1:{calculation.riskRewardRatio} is excellent! With a 40% win rate and this ratio, you'd still be profitable.</>
                        ) : parseFloat(calculation.riskRewardRatio) >= 1.5 ? (
                          <>Your R:R of 1:{calculation.riskRewardRatio} is acceptable. Aim for at least 1:2 for better results.</>
                        ) : (
                          <>Your R:R of 1:{calculation.riskRewardRatio} is low. Consider wider take-profit or tighter stop-loss to improve it.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Position Sizing Explained */}
            <div className="mt-12 bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">How Position Sizing Works</h2>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Set Risk %</h3>
                  <p className="text-sm text-muted-foreground">
                    Decide max risk per trade (1-2% recommended)
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Calculate $ Risk</h3>
                  <p className="text-sm text-muted-foreground">
                    Account × Risk % = Dollar amount at risk
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Define Stop Loss</h3>
                  <p className="text-sm text-muted-foreground">
                    Set SL based on technical analysis
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Lot Size</h3>
                  <p className="text-sm text-muted-foreground">
                    Position = Risk $ ÷ (SL pips × pip value)
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Example Calculation</h3>
                <p className="text-muted-foreground mb-4">
                  For a $10,000 account with 1% risk and 50-pip stop-loss on EUR/USD:
                </p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm space-y-2">
                  <p>Risk Amount = $10,000 × 1% = <span className="text-red-500 font-bold">$100</span></p>
                  <p>Pip Value (1 lot EUR/USD) = <span className="font-bold">$10</span></p>
                  <p>Position Size = $100 ÷ (50 pips × $10)</p>
                  <p>Position Size = $100 ÷ $500</p>
                  <p className="text-primary font-bold">Position Size = 0.20 lots (2 mini lots)</p>
                </div>
              </div>
            </div>

            {/* Position Size Reference Table */}
            <div className="mt-8 bg-card border border-border rounded-2xl p-8">
              <h2 className="text-xl font-heading font-bold mb-6">Quick Reference: Position Sizes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Account Size</th>
                      <th className="text-center py-3 px-4 font-semibold">1% Risk</th>
                      <th className="text-center py-3 px-4 font-semibold">25 Pip SL</th>
                      <th className="text-center py-3 px-4 font-semibold">50 Pip SL</th>
                      <th className="text-center py-3 px-4 font-semibold">100 Pip SL</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium text-foreground">$1,000</td>
                      <td className="text-center py-3 px-4">$10</td>
                      <td className="text-center py-3 px-4">0.04 lots</td>
                      <td className="text-center py-3 px-4">0.02 lots</td>
                      <td className="text-center py-3 px-4">0.01 lots</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium text-foreground">$5,000</td>
                      <td className="text-center py-3 px-4">$50</td>
                      <td className="text-center py-3 px-4">0.20 lots</td>
                      <td className="text-center py-3 px-4">0.10 lots</td>
                      <td className="text-center py-3 px-4">0.05 lots</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium text-foreground">$10,000</td>
                      <td className="text-center py-3 px-4">$100</td>
                      <td className="text-center py-3 px-4">0.40 lots</td>
                      <td className="text-center py-3 px-4">0.20 lots</td>
                      <td className="text-center py-3 px-4">0.10 lots</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium text-foreground">$25,000</td>
                      <td className="text-center py-3 px-4">$250</td>
                      <td className="text-center py-3 px-4">1.00 lots</td>
                      <td className="text-center py-3 px-4">0.50 lots</td>
                      <td className="text-center py-3 px-4">0.25 lots</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">$50,000</td>
                      <td className="text-center py-3 px-4">$500</td>
                      <td className="text-center py-3 px-4">2.00 lots</td>
                      <td className="text-center py-3 px-4">1.00 lots</td>
                      <td className="text-center py-3 px-4">0.50 lots</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Based on EUR/USD with $10 pip value per standard lot. Actual sizes may vary for other pairs.
              </p>
            </div>

            {/* Related Tools CTA */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Link
                to="/tools/pip-calculator"
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Pip Calculator →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Calculate pip value for any currency pair and position size
                </p>
              </Link>
              <Link
                to="/guides/risk-management"
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Risk Management Guide →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Master the 1% rule and protect your trading capital
                </p>
              </Link>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Newsletter CTA */}
            <div className="mt-12">
              <NewsletterCTA variant="card" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PositionSizeCalculator;
