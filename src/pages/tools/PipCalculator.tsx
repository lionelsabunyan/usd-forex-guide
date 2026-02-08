import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calculator, Info, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";
import EmbedCodeBox from "@/components/EmbedCodeBox";
import BrokerCTA from "@/components/BrokerCTA";
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

const accountCurrencies = ["USD", "EUR", "GBP", "JPY", "CHF", "AUD", "CAD"];

const faqs = [
  {
    question: "What is a pip in forex trading?",
    answer: "A pip (Percentage in Point) is the smallest price movement in a currency pair. For most pairs, a pip is 0.0001 (the fourth decimal place). For JPY pairs, a pip is 0.01 (the second decimal place). For example, if EUR/USD moves from 1.1000 to 1.1001, that's a 1 pip movement."
  },
  {
    question: "How do I calculate pip value?",
    answer: "Pip value = (One Pip / Exchange Rate) × Lot Size. For a standard lot (100,000 units) of EUR/USD at 1.1000: (0.0001 / 1.1000) × 100,000 = $9.09 per pip. Our calculator does this math automatically for any currency pair and position size."
  },
  {
    question: "What's the difference between a pip and a pipette?",
    answer: "A pipette (or point) is 1/10th of a pip. Many brokers quote prices to 5 decimal places (or 3 for JPY pairs), where the last digit is a pipette. So 0.00001 is one pipette. Some traders call this a 'fractional pip.'"
  },
  {
    question: "How many pips should I target per trade?",
    answer: "This depends on your trading style. Scalpers might target 5-15 pips, day traders 20-50 pips, and swing traders 100+ pips. What matters most is your risk-reward ratio—aim for at least 1:2, meaning your target should be at least twice your stop-loss."
  },
  {
    question: "Why does pip value change with different currency pairs?",
    answer: "Pip value varies because each currency has a different exchange rate against your account currency. For USD account holders, pairs with USD as the quote currency (EUR/USD, GBP/USD) have a fixed pip value of $10 per standard lot. Cross pairs require conversion."
  },
  {
    question: "How do I use pip value for risk management?",
    answer: "Use pip value to calculate position size. If you want to risk $100 with a 50-pip stop-loss, you need $2 per pip. With EUR/USD ($10/pip per lot), you'd trade 0.2 lots (mini lots). This ensures you never risk more than your planned amount."
  }
];

const PipCalculator = () => {
  const [searchParams] = useSearchParams();
  const isEmbedMode = searchParams.get("embed") === "true";

  const [selectedPair, setSelectedPair] = useState(currencyPairs[0]);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [positionSize, setPositionSize] = useState("1"); // in lots
  const [exchangeRate, setExchangeRate] = useState("1.0850"); // current rate
  const [pips, setPips] = useState("10");

  const calculation = useMemo(() => {
    const lots = parseFloat(positionSize) || 0;
    const rate = parseFloat(exchangeRate) || 1;
    const pipCount = parseFloat(pips) || 0;
    const pipDecimal = selectedPair.pipDecimal;

    // Calculate pip value
    const onePip = pipDecimal === 4 ? 0.0001 : 0.01;
    const lotSize = 100000; // standard lot

    // For pairs where USD is quote currency (EUR/USD, GBP/USD, etc.)
    // Pip value = One Pip × Lot Size
    // For other pairs, need to convert

    let pipValue: number;
    const pair = selectedPair.pair;

    if (pair.endsWith("/USD")) {
      // Quote currency is USD - simple calculation
      pipValue = onePip * lotSize * lots;
    } else if (pair.startsWith("USD/")) {
      // Base currency is USD - need to divide by rate
      pipValue = (onePip * lotSize * lots) / rate;
    } else {
      // Cross pair - approximate (would need live rates for accuracy)
      pipValue = (onePip * lotSize * lots) / rate;
    }

    const totalValue = pipValue * pipCount;

    return {
      pipValue: pipValue.toFixed(2),
      totalValue: totalValue.toFixed(2),
      lotSize: (lots * lotSize).toLocaleString(),
      onePip: onePip.toFixed(pipDecimal === 4 ? 4 : 2),
    };
  }, [selectedPair, positionSize, exchangeRate, pips]);

  return (
    <div className="min-h-screen bg-background">
      {!isEmbedMode && (
        <SEO
          title="Free Pip Calculator | Forex Pip Value Calculator 2026"
          description="Calculate pip value instantly for any forex pair. Free pip calculator for EUR/USD, GBP/USD, USD/JPY and more. Essential tool for risk management and position sizing."
          canonical="/tools/pip-calculator"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Forex Pip Calculator",
            "description": "Calculate pip value for any forex currency pair",
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
      )}
      {!isEmbedMode && <Header />}

      {/* Hero Section */}
      {!isEmbedMode && (
        <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb
              items={[
                { label: "Tools", href: "/tools" },
                { label: "Pip Calculator" }
              ]}
              className="mb-6"
            />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
                <Calculator className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Free Tool</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Forex <span className="text-gradient-gold">Pip Calculator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-4">
              Calculate pip value instantly for any currency pair. Essential for risk management
              and position sizing.
            </p>
          </div>
        </section>
      )}

      {/* Calculator Section */}
      <section className={isEmbedMode ? "py-6" : "py-12"}>
        <div className="container mx-auto px-4">
          {/* Embed Mode Header */}
          {isEmbedMode && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold">Pip Calculator</h1>
                    <p className="text-sm text-muted-foreground">Calculate pip value for any currency pair</p>
                  </div>
                </div>
                <a
                  href="https://beginnerfxguide.com/tools/pip-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Open Full Version →
                </a>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Calculate Pip Value
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

                  {/* Account Currency */}
                  <div>
                    <Label htmlFor="account" className="text-sm font-medium mb-2 block">
                      Account Currency
                    </Label>
                    <select
                      id="account"
                      className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={accountCurrency}
                      onChange={(e) => setAccountCurrency(e.target.value)}
                    >
                      {accountCurrencies.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Position Size */}
                  <div>
                    <Label htmlFor="lots" className="text-sm font-medium mb-2 block">
                      Position Size (Lots)
                    </Label>
                    <Input
                      id="lots"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={positionSize}
                      onChange={(e) => setPositionSize(e.target.value)}
                      placeholder="1.00"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      1 lot = 100,000 units | 0.1 = mini lot | 0.01 = micro lot
                    </p>
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

                  {/* Number of Pips */}
                  <div>
                    <Label htmlFor="pips" className="text-sm font-medium mb-2 block">
                      Number of Pips
                    </Label>
                    <Input
                      id="pips"
                      type="number"
                      step="1"
                      value={pips}
                      onChange={(e) => setPips(e.target.value)}
                      placeholder="10"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      setPositionSize("1");
                      setExchangeRate("1.0850");
                      setPips("10");
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
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Results
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Pip Value</p>
                      <p className="text-3xl font-bold text-primary">
                        ${calculation.pipValue}
                        <span className="text-lg font-normal text-muted-foreground"> per pip</span>
                      </p>
                    </div>

                    <div className="bg-green-500/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Value ({pips} pips)</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${calculation.totalValue}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Position Size</p>
                        <p className="text-lg font-semibold">{calculation.lotSize} units</p>
                      </div>
                      <div className="bg-secondary rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">One Pip</p>
                        <p className="text-lg font-semibold">{calculation.onePip}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Broker CTA - Only in non-embed mode */}
                {!isEmbedMode && (
                  <BrokerCTA
                    resultText={`Calculated: $${calculation.pipValue}/pip for ${positionSize} lot(s)`}
                    brokerName="MidasFX"
                    brokerSlug="midasfx"
                    minDeposit="$100"
                    leverage="Up to 1:500"
                    rating="4.8"
                    ctaText="Start Trading"
                  />
                )}

                {/* Quick Info */}
                {!isEmbedMode && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-1">Risk Management Tip</h4>
                        <p className="text-sm text-amber-700">
                          Never risk more than 1-2% of your account on a single trade. If your account
                          is $10,000, risk max $100-200 per trade. Use pip value to calculate proper
                          position size.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* US Trader Notice */}
                {!isEmbedMode && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">US Traders</h4>
                        <p className="text-sm text-blue-700">
                          Maximum leverage for US traders is 50:1 for major pairs and 20:1 for minors
                          (CFTC regulation). This affects your required margin but not pip value calculation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Embed Code Box - Only in non-embed mode */}
            {!isEmbedMode && (
              <div className="mt-12">
                <EmbedCodeBox
                  toolName="Pip Calculator"
                  toolPath="/tools/pip-calculator"
                />
              </div>
            )}

            {/* How It Works */}
            {!isEmbedMode && (
              <div className="mt-12 bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">How Pip Value Works</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Standard Lot</h3>
                  <p className="text-sm text-muted-foreground">
                    1 lot = 100,000 units of base currency. For EUR/USD, this means €100,000.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Pip Movement</h3>
                  <p className="text-sm text-muted-foreground">
                    One pip = 0.0001 for most pairs (0.01 for JPY pairs). It's the 4th decimal place.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Calculate Value</h3>
                  <p className="text-sm text-muted-foreground">
                    Pip Value = (One Pip ÷ Exchange Rate) × Lot Size × Number of Lots
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Example Calculation</h3>
                <p className="text-muted-foreground mb-4">
                  For 1 standard lot of EUR/USD at 1.0850:
                </p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <p>Pip Value = (0.0001 ÷ 1.0850) × 100,000 × 1</p>
                  <p>Pip Value = 0.0000922 × 100,000</p>
                  <p className="text-primary font-bold">Pip Value = $9.22 per pip</p>
                </div>
              </div>
            </div>
            )}

            {/* Related Tools CTA */}
            {!isEmbedMode && (
              <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Link
                to="/tools/position-size-calculator"
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Position Size Calculator →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Calculate the perfect position size based on your risk tolerance
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
                  Learn the 1% rule and other essential risk management strategies
                </p>
              </Link>
            </div>
            )}

            {/* FAQ Section */}
            {!isEmbedMode && (
              <div className="mt-12">
                <FAQSection faqs={faqs} />
              </div>
            )}

            {/* Newsletter CTA */}
            {!isEmbedMode && (
              <div className="mt-12">
                <NewsletterCTA variant="card" />
              </div>
            )}
          </div>
        </div>
      </section>

      {!isEmbedMode && <Footer />}
    </div>
  );
};

export default PipCalculator;
