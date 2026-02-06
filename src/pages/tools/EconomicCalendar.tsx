import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Calendar, AlertTriangle, TrendingUp, Clock, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const EconomicCalendar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "isTransparent": true,
      "width": "100%",
      "height": "600",
      "locale": "en",
      "importanceFilter": "-1,0,1",
      "countryFilter": "us,eu,gb,jp,au,ca,ch,nz"
    });

    const container = document.getElementById("tradingview-calendar-widget");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  const upcomingTips = [
    {
      icon: AlertTriangle,
      title: "High Impact Events",
      description: "Red flag events like NFP, FOMC decisions, and GDP releases cause the most volatility. Consider reducing position sizes or staying out during these releases."
    },
    {
      icon: TrendingUp,
      title: "Trading the News",
      description: "The market often moves based on whether data beats or misses expectations, not the absolute number. Watch the 'Forecast' vs 'Actual' columns."
    },
    {
      icon: Clock,
      title: "Timing Matters",
      description: "Major moves often happen in the first 15-30 minutes after a release. Spreads typically widen during high-impact news, so factor this into your risk management."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Forex Economic Calendar | Real-Time Market Events 2026"
        description="Free real-time economic calendar for forex traders. Track high-impact events like NFP, FOMC, and GDP releases. Essential tool for fundamental analysis."
        canonical="/tools/economic-calendar"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Economic Calendar",
          "description": "Real-time economic calendar for forex traders",
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
              { label: "Economic Calendar" }
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Real-Time Updates</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Economic <span className="text-gradient-gold">Calendar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-4">
            Track market-moving economic events in real-time. Essential for fundamental analysis and news trading.
          </p>
        </div>
      </section>

      {/* Calendar Widget */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="tradingview-widget-container">
                  <div id="tradingview-calendar-widget" className="tradingview-widget-container__widget"></div>
                  <div className="text-center py-2 text-xs text-muted-foreground border-t border-border">
                    Powered by <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TradingView</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
              How to Use the Economic Calendar
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingTips.map((tip, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Events Explanation */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
              Key Economic Events for Forex Traders
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-destructive/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-destructive"></span>
                    <h3 className="font-semibold text-foreground">High Impact (USD)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Non-Farm Payrolls (NFP)</strong> - First Friday monthly</li>
                    <li><strong className="text-foreground">FOMC Rate Decision</strong> - 8 times per year</li>
                    <li><strong className="text-foreground">CPI (Inflation)</strong> - Monthly</li>
                    <li><strong className="text-foreground">GDP</strong> - Quarterly</li>
                    <li><strong className="text-foreground">Fed Chair Speech</strong> - Various</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <h3 className="font-semibold text-foreground">Medium Impact</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Retail Sales</strong> - Consumer spending indicator</li>
                    <li><strong className="text-foreground">ISM Manufacturing PMI</strong> - Economic health</li>
                    <li><strong className="text-foreground">Unemployment Claims</strong> - Weekly labor data</li>
                    <li><strong className="text-foreground">Trade Balance</strong> - Import/export data</li>
                    <li><strong className="text-foreground">Consumer Confidence</strong> - Sentiment indicator</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <h3 className="font-semibold text-foreground">EUR Events</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">ECB Rate Decision</strong> - Monetary policy</li>
                    <li><strong className="text-foreground">German GDP</strong> - Eurozone's largest economy</li>
                    <li><strong className="text-foreground">Eurozone CPI</strong> - Inflation measure</li>
                    <li><strong className="text-foreground">German ZEW</strong> - Economic sentiment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-success/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-success"></span>
                    <h3 className="font-semibold text-foreground">Other Major Events</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">BoE Rate Decision</strong> - GBP impact</li>
                    <li><strong className="text-foreground">BoJ Rate Decision</strong> - JPY impact</li>
                    <li><strong className="text-foreground">RBA Rate Decision</strong> - AUD impact</li>
                    <li><strong className="text-foreground">Canadian Employment</strong> - CAD impact</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Box */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Trading During News Releases</h3>
                  <p className="text-amber-800 dark:text-amber-300 text-sm">
                    High-impact news events can cause extreme volatility and widened spreads. Many experienced traders avoid opening new positions 30 minutes before and after major releases. If you do trade news, use appropriate risk management - consider smaller position sizes and wider stop losses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Tools */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              More Trading Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/tools/pip-calculator"
                className="bg-card border border-border px-6 py-3 rounded-lg hover:border-primary/50 hover:shadow-md transition-all text-foreground"
              >
                Pip Calculator
              </Link>
              <Link
                to="/tools/position-size-calculator"
                className="bg-card border border-border px-6 py-3 rounded-lg hover:border-primary/50 hover:shadow-md transition-all text-foreground"
              >
                Position Size Calculator
              </Link>
              <Link
                to="/tools/margin-calculator"
                className="bg-card border border-border px-6 py-3 rounded-lg hover:border-primary/50 hover:shadow-md transition-all text-foreground"
              >
                Margin Calculator
              </Link>
              <Link
                to="/tools/profit-loss-calculator"
                className="bg-card border border-border px-6 py-3 rounded-lg hover:border-primary/50 hover:shadow-md transition-all text-foreground"
              >
                Profit/Loss Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EconomicCalendar;
