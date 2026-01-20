import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign } from "lucide-react";

const BeginnersGuide = () => {
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
          <p className="text-lg text-muted-foreground max-w-3xl">
            Everything you need to know to start trading Forex. Learn the basics of currency pairs, 
            market mechanics, and essential terminology.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">What is Forex Trading?</h2>
              <p className="text-muted-foreground mb-4">
                Forex (Foreign Exchange) trading is the process of buying and selling currencies on the global market. 
                With a daily trading volume exceeding $6 trillion, it's the largest and most liquid financial market in the world.
              </p>
              <p className="text-muted-foreground mb-4">
                Unlike stock markets, Forex operates 24 hours a day, 5 days a week, allowing traders from around the world 
                to participate at any time. This guide will walk you through everything you need to know to get started.
              </p>
            </section>

            {/* Currency Pairs */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Understanding Currency Pairs</h2>
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

              <h3 className="text-xl font-semibold mb-3">Types of Currency Pairs</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/30 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Major Pairs</h4>
                  <p className="text-sm text-muted-foreground mb-2">Most traded pairs involving USD</p>
                  <ul className="text-sm space-y-1">
                    <li>EUR/USD</li>
                    <li>GBP/USD</li>
                    <li>USD/JPY</li>
                    <li>USD/CHF</li>
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
            </section>

            {/* Market Hours */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Forex Market Hours</h2>
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
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Best Trading Times</h4>
                    <p className="text-sm text-muted-foreground">
                      The London-New York overlap (8:00 AM - 12:00 PM EST) typically offers the highest liquidity 
                      and best trading opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Basic Orders */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Basic Order Types</h2>
              
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
                        to enter or exit a trade.
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
                        when your specified price is reached.
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
                        Essential for risk management.
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

            {/* Demo Trading */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Start with Demo Trading</h2>
              <p className="text-muted-foreground mb-4">
                Before risking real money, practice with a demo account. Most brokers offer free demo accounts 
                with virtual funds.
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

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Important Note</h4>
                    <p className="text-sm text-amber-700">
                      Demo trading doesn't fully replicate the psychological aspects of real trading. 
                      Start with small amounts when transitioning to live trading.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Next Steps</h2>
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

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BeginnersGuide;
