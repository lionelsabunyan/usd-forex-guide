import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Calculator, TrendingUp, TrendingDown, DollarSign, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";
import { Link } from "react-router-dom";

const currencyPairs = [
  { value: "EUR/USD", label: "EUR/USD (Euro/US Dollar)", pipValue: 10 },
  { value: "GBP/USD", label: "GBP/USD (British Pound/US Dollar)", pipValue: 10 },
  { value: "USD/JPY", label: "USD/JPY (US Dollar/Japanese Yen)", pipValue: 6.69 },
  { value: "USD/CHF", label: "USD/CHF (US Dollar/Swiss Franc)", pipValue: 11.34 },
  { value: "AUD/USD", label: "AUD/USD (Australian Dollar/US Dollar)", pipValue: 10 },
  { value: "USD/CAD", label: "USD/CAD (US Dollar/Canadian Dollar)", pipValue: 7.43 },
  { value: "NZD/USD", label: "NZD/USD (New Zealand Dollar/US Dollar)", pipValue: 10 },
  { value: "EUR/GBP", label: "EUR/GBP (Euro/British Pound)", pipValue: 12.65 },
  { value: "EUR/JPY", label: "EUR/JPY (Euro/Japanese Yen)", pipValue: 6.69 },
  { value: "GBP/JPY", label: "GBP/JPY (British Pound/Japanese Yen)", pipValue: 6.69 },
];

const faqs = [
  {
    question: "How do I calculate forex profit and loss?",
    answer: "Forex P&L is calculated using the formula: P/L = (Exit Price - Entry Price) × Pip Value × Lot Size. For sell trades, reverse the price calculation. Our calculator does this automatically for any currency pair."
  },
  {
    question: "What is pip value in forex trading?",
    answer: "Pip value is how much money you make or lose per pip movement. For most USD pairs, 1 pip = $10 per standard lot (100,000 units). JPY pairs and cross pairs have different pip values based on exchange rates."
  },
  {
    question: "Does this calculator include spread and commissions?",
    answer: "No, this calculator shows gross profit/loss before trading costs. Remember to subtract spread (typically 0.5-2 pips), commissions (if ECN account), and swap fees (for overnight positions) from your actual results."
  },
  {
    question: "What's the difference between realized and unrealized P&L?",
    answer: "Unrealized P&L is the current profit/loss on open positions - it changes as prices move. Realized P&L is locked in when you close the trade. This calculator helps you plan both entry targets and exit scenarios."
  },
  {
    question: "How do I use this for risk management?",
    answer: "Use this calculator in reverse: enter your stop-loss price as the exit price to see your potential loss. Then ensure this loss amount doesn't exceed 1-2% of your account. This helps you determine proper position size."
  }
];

const ProfitLossCalculator = () => {
  const [pair, setPair] = useState("EUR/USD");
  const [lotSize, setLotSize] = useState("1");
  const [entryPrice, setEntryPrice] = useState("1.0850");
  const [exitPrice, setExitPrice] = useState("1.0900");
  const [tradeDirection, setTradeDirection] = useState("buy");

  const selectedPair = currencyPairs.find(p => p.value === pair);

  const result = useMemo(() => {
    const lots = parseFloat(lotSize) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    const pipValuePerLot = selectedPair?.pipValue || 10;

    let pipMultiplier = pair.includes("JPY") ? 100 : 10000;
    let priceDiff = exit - entry;

    if (tradeDirection === "sell") {
      priceDiff = entry - exit;
    }

    const pips = priceDiff * pipMultiplier;
    const profitLoss = pips * pipValuePerLot * lots;

    return {
      pips: Math.round(pips * 10) / 10,
      profitLoss,
      isProfit: profitLoss >= 0,
      pipValue: pipValuePerLot * lots,
    };
  }, [pair, lotSize, entryPrice, exitPrice, tradeDirection, selectedPair]);

  const handleReset = () => {
    setPair("EUR/USD");
    setLotSize("1");
    setEntryPrice("1.0850");
    setExitPrice("1.0900");
    setTradeDirection("buy");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Forex Profit/Loss Calculator | Calculate Trade P&L 2026"
        description="Free forex profit and loss calculator. Calculate your potential profit or loss before entering a trade. Essential for planning trades and managing risk."
        canonical="/tools/profit-loss-calculator"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Profit/Loss Calculator",
          "description": "Calculate potential profit or loss for your forex trades",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
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
              { label: "Profit/Loss Calculator" }
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Free Tool</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Profit/Loss <span className="text-gradient-gold">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-4">
            Calculate your potential profit or loss before entering a trade. Essential for planning trades and managing risk.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="bg-card border-border shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Trade Details
                  </h2>

                  <div className="space-y-5">
                    {/* Currency Pair */}
                    <div>
                      <Label htmlFor="pair" className="text-sm font-medium mb-2 block">
                        Currency Pair
                      </Label>
                      <select
                        id="pair"
                        className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={pair}
                        onChange={(e) => setPair(e.target.value)}
                      >
                        {currencyPairs.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Trade Direction */}
                    <div>
                      <Label htmlFor="direction" className="text-sm font-medium mb-2 block">
                        Trade Direction
                      </Label>
                      <select
                        id="direction"
                        className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={tradeDirection}
                        onChange={(e) => setTradeDirection(e.target.value)}
                      >
                        <option value="buy">Buy (Long)</option>
                        <option value="sell">Sell (Short)</option>
                      </select>
                    </div>

                    {/* Position Size */}
                    <div>
                      <Label htmlFor="lotSize" className="text-sm font-medium mb-2 block">
                        Position Size (Lots)
                      </Label>
                      <Input
                        id="lotSize"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={lotSize}
                        onChange={(e) => setLotSize(e.target.value)}
                        placeholder="1.00"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        1 lot = 100,000 units | 0.1 = mini lot | 0.01 = micro lot
                      </p>
                    </div>

                    {/* Entry Price */}
                    <div>
                      <Label htmlFor="entryPrice" className="text-sm font-medium mb-2 block">
                        Entry Price
                      </Label>
                      <Input
                        id="entryPrice"
                        type="number"
                        step="0.00001"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                        placeholder="1.0850"
                      />
                    </div>

                    {/* Exit Price */}
                    <div>
                      <Label htmlFor="exitPrice" className="text-sm font-medium mb-2 block">
                        Exit Price (Target/Stop)
                      </Label>
                      <Input
                        id="exitPrice"
                        type="number"
                        step="0.00001"
                        value={exitPrice}
                        onChange={(e) => setExitPrice(e.target.value)}
                        placeholder="1.0900"
                      />
                    </div>

                    <Button variant="outline" className="w-full gap-2" onClick={handleReset}>
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-6">
                <Card className={`border-2 ${result.isProfit ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      {result.isProfit ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                      <span className={result.isProfit ? 'text-success' : 'text-destructive'}>
                        {result.isProfit ? "Potential Profit" : "Potential Loss"}
                      </span>
                    </h2>

                    <div className={`rounded-xl p-4 mb-6 ${result.isProfit ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      <p className="text-sm text-muted-foreground mb-1">
                        {result.isProfit ? "Profit" : "Loss"}
                      </p>
                      <p className={`text-4xl font-bold ${result.isProfit ? 'text-success' : 'text-destructive'}`}>
                        {result.isProfit ? "+" : "-"}${Math.abs(result.profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Pips {result.isProfit ? "Gained" : "Lost"}</span>
                        <span className="font-semibold text-foreground">
                          {result.isProfit ? "+" : ""}{result.pips} pips
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Pip Value</span>
                        <span className="font-semibold text-foreground">
                          ${result.pipValue.toFixed(2)} per pip
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Trade Direction</span>
                        <span className="font-semibold text-foreground capitalize">{tradeDirection}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Position Size</span>
                        <span className="font-semibold text-foreground">{lotSize} lot(s)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Trading Costs Not Included</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        This calculation doesn't include spreads, commissions, or swap fees. Your actual P&L will be slightly different.
                      </p>
                    </div>
                  </div>
                </div>

                {/* US Trader Notice */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">US Traders</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Remember forex profits are taxable. Use our <Link to="/tools/forex-tax-calculator" className="underline">Forex Tax Calculator</Link> to estimate your tax liability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-12 bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">How Profit & Loss Calculation Works</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Calculate Pip Movement</h3>
                  <p className="text-sm text-muted-foreground">
                    Subtract entry from exit price (or vice versa for sells) and multiply by pip multiplier.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Determine Pip Value</h3>
                  <p className="text-sm text-muted-foreground">
                    Pip value depends on your lot size. Standard lot = $10/pip for most USD pairs.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Multiply for P&L</h3>
                  <p className="text-sm text-muted-foreground">
                    P/L = Pips × Pip Value × Lots. Simple math, powerful insight!
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Example Calculation</h3>
                <p className="text-muted-foreground mb-4">
                  Buy 1 lot EUR/USD at 1.0850, exit at 1.0900:
                </p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <p>Pips = (1.0900 - 1.0850) × 10,000 = 50 pips</p>
                  <p>Pip Value = $10 per pip (standard lot)</p>
                  <p className="text-primary font-bold">Profit = 50 × $10 = $500</p>
                </div>
              </div>
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
                  Calculate exact pip values for any currency pair
                </p>
              </Link>
              <Link
                to="/tools/position-size-calculator"
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Position Size Calculator →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Calculate proper position size based on risk tolerance
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

export default ProfitLossCalculator;
