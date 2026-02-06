import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Calculator, Info, DollarSign, TrendingUp, Shield, RefreshCw, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";
import { Link } from "react-router-dom";

const currencyPairs = [
  { value: "EUR/USD", label: "EUR/USD (Euro/US Dollar)", rate: 1.0850 },
  { value: "GBP/USD", label: "GBP/USD (British Pound/US Dollar)", rate: 1.2650 },
  { value: "USD/JPY", label: "USD/JPY (US Dollar/Japanese Yen)", rate: 149.50 },
  { value: "USD/CHF", label: "USD/CHF (US Dollar/Swiss Franc)", rate: 0.8820 },
  { value: "AUD/USD", label: "AUD/USD (Australian Dollar/US Dollar)", rate: 0.6550 },
  { value: "USD/CAD", label: "USD/CAD (US Dollar/Canadian Dollar)", rate: 1.3450 },
  { value: "NZD/USD", label: "NZD/USD (New Zealand Dollar/US Dollar)", rate: 0.6120 },
  { value: "EUR/GBP", label: "EUR/GBP (Euro/British Pound)", rate: 0.8580 },
  { value: "EUR/JPY", label: "EUR/JPY (Euro/Japanese Yen)", rate: 162.20 },
  { value: "GBP/JPY", label: "GBP/JPY (British Pound/Japanese Yen)", rate: 189.10 },
];

const leverageOptions = [
  { value: "10", label: "1:10" },
  { value: "20", label: "1:20 (US Minor Pairs Max)" },
  { value: "30", label: "1:30" },
  { value: "50", label: "1:50 (US Major Pairs Max)" },
  { value: "100", label: "1:100" },
  { value: "200", label: "1:200" },
  { value: "500", label: "1:500" },
];

const faqs = [
  {
    question: "What is margin in forex trading?",
    answer: "Margin is the amount of money required to open and maintain a leveraged position. It's essentially a good-faith deposit that your broker holds while your trade is open. The higher the leverage, the lower the margin requirement."
  },
  {
    question: "How do I calculate required margin?",
    answer: "Required Margin = (Position Size × Current Price) ÷ Leverage. For example, 1 lot (100,000 units) of EUR/USD at 1.0850 with 1:100 leverage requires $1,085 margin."
  },
  {
    question: "What happens if I don't have enough margin?",
    answer: "If your account equity falls below the required margin level, you'll receive a margin call. If it falls further to the stop-out level (typically 50-100%), your broker will automatically close your positions to prevent further losses."
  },
  {
    question: "What leverage can US traders use?",
    answer: "CFTC-regulated brokers limit leverage to 50:1 for major pairs and 20:1 for minor pairs. Offshore brokers accepting US clients may offer higher leverage (up to 500:1 or more), but with less regulatory protection."
  },
  {
    question: "What's the difference between used and free margin?",
    answer: "Used margin is the total amount held by your broker for open positions. Free margin is your equity minus used margin - this is what's available to open new positions or absorb losses."
  }
];

const MarginCalculator = () => {
  const [pair, setPair] = useState("EUR/USD");
  const [lotSize, setLotSize] = useState("1");
  const [leverage, setLeverage] = useState("100");
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const selectedPair = currencyPairs.find(p => p.value === pair);

  const result = useMemo(() => {
    const lots = parseFloat(lotSize) || 0;
    const lev = parseFloat(leverage) || 1;
    const rate = selectedPair?.rate || 1;

    const positionSize = lots * 100000;

    let positionValueUSD: number;

    if (pair.startsWith("USD/")) {
      positionValueUSD = positionSize;
    } else if (pair.endsWith("/USD")) {
      positionValueUSD = positionSize * rate;
    } else {
      positionValueUSD = positionSize * rate * 1.085;
    }

    const marginRequired = positionValueUSD / lev;
    const marginPercentage = (1 / lev) * 100;

    return {
      positionSize,
      positionValueUSD,
      marginRequired,
      marginPercentage,
      leverage: lev,
    };
  }, [pair, lotSize, leverage, selectedPair]);

  const handleReset = () => {
    setPair("EUR/USD");
    setLotSize("1");
    setLeverage("100");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Forex Margin Calculator | Calculate Required Margin 2026"
        description="Free forex margin calculator. Calculate the exact margin required for any trade based on lot size, leverage, and currency pair. Essential tool for risk management."
        canonical="/tools/margin-calculator"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Margin Calculator",
          "description": "Calculate the margin required for your forex trades",
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
              { label: "Margin Calculator" }
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Percent className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Free Tool</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Margin <span className="text-gradient-gold">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-4">
            Calculate the margin required for your forex trades. Essential for understanding leverage and managing your account.
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
                    Calculate Margin
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

                    {/* Leverage */}
                    <div>
                      <Label htmlFor="leverage" className="text-sm font-medium mb-2 block">
                        Leverage
                      </Label>
                      <select
                        id="leverage"
                        className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={leverage}
                        onChange={(e) => setLeverage(e.target.value)}
                      >
                        {leverageOptions.map(l => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Account Currency */}
                    <div>
                      <Label htmlFor="accountCurrency" className="text-sm font-medium mb-2 block">
                        Account Currency
                      </Label>
                      <select
                        id="accountCurrency"
                        className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={accountCurrency}
                        onChange={(e) => setAccountCurrency(e.target.value)}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
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
                <Card className="bg-gradient-card border-border">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Required Margin
                    </h2>

                    <div className="bg-primary/10 rounded-xl p-4 mb-6">
                      <p className="text-sm text-muted-foreground mb-1">Margin Required</p>
                      <p className="text-4xl font-bold text-primary">
                        ${result.marginRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Position Size</span>
                        <span className="font-semibold text-foreground">
                          {result.positionSize.toLocaleString()} units
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Position Value</span>
                        <span className="font-semibold text-foreground">
                          ${result.positionValueUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Leverage</span>
                        <span className="font-semibold text-foreground">1:{result.leverage}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Margin %</span>
                        <span className="font-semibold text-foreground">{result.marginPercentage.toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* US Trader Notice */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">US Leverage Limits</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        CFTC limits: 50:1 for major pairs, 20:1 for minors. Higher leverage available with offshore brokers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Warning */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Risk Warning</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Higher leverage increases both potential profits and losses. Always ensure you have adequate free margin to avoid margin calls.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-12 bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">Understanding Forex Margin</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Position Value</h3>
                  <p className="text-sm text-muted-foreground">
                    Calculate total position value: Lot Size × 100,000 × Exchange Rate
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Apply Leverage</h3>
                  <p className="text-sm text-muted-foreground">
                    Divide by leverage to get margin: Position Value ÷ Leverage
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Required Margin</h3>
                  <p className="text-sm text-muted-foreground">
                    This is the deposit your broker holds to open the position.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Example Calculation</h3>
                <p className="text-muted-foreground mb-4">
                  1 lot EUR/USD at 1.0850 with 1:100 leverage:
                </p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <p>Position Value = 100,000 × 1.0850 = $108,500</p>
                  <p>Leverage = 1:100</p>
                  <p className="text-primary font-bold">Margin Required = $108,500 ÷ 100 = $1,085</p>
                </div>
              </div>
            </div>

            {/* Related Tools CTA */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Link
                to="/tools/position-size-calculator"
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Position Size Calculator →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Calculate optimal position size based on risk tolerance
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
                  Learn about leverage, margin calls, and protecting your capital
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

export default MarginCalculator;
