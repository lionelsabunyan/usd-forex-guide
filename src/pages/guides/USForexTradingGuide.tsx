import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";
import { Link } from "react-router-dom";
import {
  Shield,
  DollarSign,
  Scale,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Building2,
  FileText,
  Calculator,
  Users,
  Globe,
  Landmark
} from "lucide-react";

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "legal-status", label: "Is Forex Legal in the US?" },
  { id: "regulations", label: "US Forex Regulations" },
  { id: "cftc-nfa", label: "CFTC & NFA Explained" },
  { id: "leverage-rules", label: "Leverage Rules" },
  { id: "us-brokers", label: "US-Regulated Brokers" },
  { id: "offshore-brokers", label: "Offshore Brokers" },
  { id: "taxes", label: "Forex Taxes in the US" },
  { id: "getting-started", label: "Getting Started" },
  { id: "faq", label: "FAQ" },
];

const usRegulatedBrokers = [
  { name: "FOREX.com", nfa: "0339826", features: "Largest US broker, 80+ pairs" },
  { name: "OANDA", nfa: "0325821", features: "No minimum deposit, great platform" },
  { name: "IG Markets", nfa: "0509630", features: "Premium research, ProRealTime" },
  { name: "Interactive Brokers", nfa: "0258600", features: "Lowest costs, professional tools" },
  { name: "TD Ameritrade (tastyfx)", nfa: "0280907", features: "thinkorswim platform" },
];

const offshoreBrokers = [
  { name: "MidasFX", accepts: true, minDeposit: "$10", leverage: "1:1000" },
  { name: "Hankotrade", accepts: true, minDeposit: "$10", leverage: "1:500" },
  { name: "FXGlory", accepts: true, minDeposit: "$1", leverage: "1:3000" },
  { name: "N1CM", accepts: true, minDeposit: "$1", leverage: "1:1000" },
];

const faqs = [
  {
    question: "Is forex trading legal in the United States?",
    answer: "Yes, forex trading is completely legal in the United States. However, it's heavily regulated by the Commodity Futures Trading Commission (CFTC) and National Futures Association (NFA). US traders can legally trade with NFA-registered brokers or offshore brokers that accept US clients. The key is understanding the regulatory differences and protections each option provides."
  },
  {
    question: "What is the maximum leverage for US forex traders?",
    answer: "US-regulated brokers are limited to 50:1 leverage for major currency pairs (EUR/USD, GBP/USD, USD/JPY, etc.) and 20:1 for minor pairs. This is mandated by the CFTC to protect retail traders. Offshore brokers may offer higher leverage (up to 1:1000 or more), but this comes with increased risk and less regulatory protection."
  },
  {
    question: "How are forex profits taxed in the US?",
    answer: "Forex profits in the US are typically taxed under Section 988 (ordinary income rates, 10-37%) or Section 1256 (60% long-term/40% short-term, blended rate around 23%). Section 988 is the default for spot forex. Traders can elect Section 1256 treatment, which may be beneficial for profitable traders in higher tax brackets. Consult a tax professional for your specific situation."
  },
  {
    question: "What is the CFTC and NFA?",
    answer: "The CFTC (Commodity Futures Trading Commission) is the federal agency that regulates forex trading in the US. The NFA (National Futures Association) is a self-regulatory organization that oversees forex brokers and requires them to meet strict capital requirements, provide transparent pricing, and maintain segregated client funds. All legitimate US forex brokers must be registered with both."
  },
  {
    question: "Can US residents use offshore forex brokers?",
    answer: "Yes, US residents can legally use offshore forex brokers that accept US clients. However, these brokers are not regulated by the CFTC/NFA, which means less consumer protection and no access to US dispute resolution. The main advantages are higher leverage and lower minimum deposits. The choice depends on your risk tolerance and trading needs."
  },
  {
    question: "What is the minimum amount needed to start forex trading?",
    answer: "With US-regulated brokers, minimums vary: OANDA has no minimum, FOREX.com requires $100, and Interactive Brokers requires $0 for cash accounts. Offshore brokers accepting US clients often have lower minimums ($1-$10). However, experts recommend starting with at least $500-$1,000 for proper risk management with micro lots."
  },
  {
    question: "Why do some forex brokers not accept US clients?",
    answer: "Many international brokers don't accept US clients due to the strict and expensive CFTC/NFA regulatory requirements. Becoming NFA-registered requires significant capital reserves ($20+ million), compliance infrastructure, and ongoing reporting. Most European and Asian brokers find it not worth the cost and complexity to serve the US market."
  },
  {
    question: "What are the best times to trade forex in the US?",
    answer: "The best trading times for US traders are during session overlaps: London-New York overlap (8 AM - 12 PM EST) offers the highest liquidity and volatility for EUR/USD and GBP/USD. The Asian-London overlap (3 AM - 4 AM EST) is good for JPY pairs. Avoid trading during low-liquidity periods like late US afternoon (after 5 PM EST)."
  },
  {
    question: "Do I need to report forex losses on my taxes?",
    answer: "Yes, you must report both forex gains AND losses on your US tax return. Under Section 988, losses can offset ordinary income (potentially beneficial). Under Section 1256, losses follow the 60/40 rule and can be carried back 3 years. Keep detailed records of all trades. Use Form 8949 and Schedule D, or Form 6781 for Section 1256 elections."
  },
  {
    question: "What is FIFO and how does it affect US forex traders?",
    answer: "FIFO (First In, First Out) is a rule requiring US-regulated brokers to close positions in the order they were opened. If you have multiple positions in the same currency pair, you must close the oldest one first. This prevents certain hedging strategies. Offshore brokers are not bound by FIFO and allow hedging and position netting."
  }
];

const USForexTradingGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Forex Trading in the USA: Complete Guide 2026 | Laws, Brokers & Taxes"
        description="Everything US traders need to know about forex trading: CFTC/NFA regulations, legal brokers, leverage limits, taxes (Section 988 vs 1256), and how to start. Updated for 2026."
        canonical="/guides/forex-trading-usa"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Forex Trading in the USA: Complete Guide 2026",
          "description": "Comprehensive guide to forex trading for US residents covering regulations, brokers, taxes, and getting started.",
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide"
          },
          "datePublished": "2026-01-15",
          "dateModified": "2026-02-01"
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "Forex Trading USA" }
            ]}
            className="mb-6"
          />

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              🇺🇸 US Focused
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Updated 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Forex Trading in the <span className="text-gradient-gold">USA</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-6">
            The complete guide for US residents: regulations, legal brokers, leverage limits,
            taxes, and how to start trading forex legally and safely.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
              <p className="text-2xl font-bold text-primary">50:1</p>
              <p className="text-sm text-muted-foreground">Max Leverage (Majors)</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">NFA-Registered Brokers</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
              <p className="text-2xl font-bold text-primary">23%</p>
              <p className="text-sm text-muted-foreground">Blended Tax Rate (1256)</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
              <p className="text-2xl font-bold text-primary">$0</p>
              <p className="text-sm text-muted-foreground">Min. Deposit (OANDA)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-12">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Table of Contents
              </h2>
              <div className="grid md:grid-cols-2 gap-2">
                {tableOfContents.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <span className="text-xs text-primary/60">{index + 1}.</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                Overview: Forex Trading in America
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The United States has one of the most regulated forex markets in the world. While this
                  provides strong consumer protections, it also creates unique challenges for US traders—
                  including limited broker options, lower leverage, and complex tax rules.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This comprehensive guide covers everything you need to know as a US resident looking to
                  trade forex: the legal framework, which brokers you can use, how leverage rules differ
                  from the rest of the world, and how to properly report your trading income to the IRS.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h4>
                      <p className="text-amber-700">
                        Forex trading involves significant risk of loss. This guide is for educational
                        purposes only and does not constitute financial or legal advice. Always consult
                        with qualified professionals regarding your specific situation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Status Section */}
            <section id="legal-status" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Is Forex Trading Legal in the US?
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Yes, Forex Trading is 100% Legal</h4>
                    <p className="text-green-700">
                      Forex trading is completely legal in the United States for retail traders. The market
                      is regulated by federal agencies to ensure fair practices and protect consumers.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The US forex market is regulated by two main bodies:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">CFTC</h3>
                      <p className="text-sm text-muted-foreground">Federal Regulator</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The Commodity Futures Trading Commission is the federal agency that oversees forex
                    trading, sets leverage limits, and enforces anti-fraud rules.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">NFA</h3>
                      <p className="text-sm text-muted-foreground">Self-Regulatory Organization</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The National Futures Association registers and audits forex brokers, requires capital
                    reserves, and handles customer complaints and arbitration.
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                <strong>You have two legal options for forex trading:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li><strong>NFA-Registered Brokers:</strong> Maximum regulatory protection, limited leverage (50:1)</li>
                <li><strong>Offshore Brokers:</strong> Less regulation, higher leverage, accept US clients</li>
              </ul>
            </section>

            {/* CFTC & NFA Section */}
            <section id="cftc-nfa" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Landmark className="w-8 h-8 text-primary" />
                Understanding CFTC & NFA Regulations
              </h2>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Key NFA Requirements for Brokers</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">$20+ Million Capital</p>
                        <p className="text-sm text-muted-foreground">Ensures broker solvency</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Segregated Client Funds</p>
                        <p className="text-sm text-muted-foreground">Your money kept separate</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Annual Audits</p>
                        <p className="text-sm text-muted-foreground">Regular compliance checks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Arbitration Access</p>
                        <p className="text-sm text-muted-foreground">Dispute resolution available</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">How to Verify a Broker's NFA Registration</h4>
                  <ol className="list-decimal list-inside text-blue-700 space-y-2">
                    <li>Visit the NFA BASIC search: <strong>nfa.futures.org/basicnet</strong></li>
                    <li>Enter the broker's name or NFA ID number</li>
                    <li>Check their registration status is "Approved"</li>
                    <li>Review any regulatory actions or complaints</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Leverage Rules Section */}
            <section id="leverage-rules" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8 text-primary" />
                US Leverage Limits Explained
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The CFTC limits leverage for US retail forex traders to protect them from excessive risk.
                These limits are significantly lower than what's available in other countries.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border border-border rounded-xl overflow-hidden">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      <th className="text-center py-3 px-4 font-semibold">US Regulated</th>
                      <th className="text-center py-3 px-4 font-semibold">Offshore</th>
                      <th className="text-center py-3 px-4 font-semibold">Europe (ESMA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="py-3 px-4">Major Pairs (EUR/USD, etc.)</td>
                      <td className="text-center py-3 px-4 font-medium">50:1</td>
                      <td className="text-center py-3 px-4 text-green-600">Up to 1:1000</td>
                      <td className="text-center py-3 px-4">30:1</td>
                    </tr>
                    <tr className="border-t border-border bg-secondary/30">
                      <td className="py-3 px-4">Minor Pairs (EUR/GBP, etc.)</td>
                      <td className="text-center py-3 px-4 font-medium">20:1</td>
                      <td className="text-center py-3 px-4 text-green-600">Up to 1:500</td>
                      <td className="text-center py-3 px-4">20:1</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 px-4">Gold (XAU/USD)</td>
                      <td className="text-center py-3 px-4 font-medium">20:1</td>
                      <td className="text-center py-3 px-4 text-green-600">Up to 1:500</td>
                      <td className="text-center py-3 px-4">20:1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="font-semibold text-amber-800 mb-2">Why Lower Leverage Isn't Always Bad</h4>
                <p className="text-amber-700 mb-4">
                  While higher leverage means larger potential profits, it also means larger potential losses.
                  Many professional traders voluntarily use lower leverage:
                </p>
                <ul className="list-disc list-inside text-amber-700 space-y-1">
                  <li>Lower leverage forces better risk management</li>
                  <li>Reduces the chance of margin calls</li>
                  <li>Allows positions to "breathe" through normal market fluctuations</li>
                  <li>Most successful traders use 10:1 or less regardless of limits</li>
                </ul>
              </div>
            </section>

            {/* US Brokers Section */}
            <section id="us-brokers" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                US-Regulated Forex Brokers (NFA Members)
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Only a handful of brokers maintain NFA registration due to the strict requirements.
                These are the safest options for US traders who prioritize regulatory protection.
              </p>

              <div className="space-y-4 mb-8">
                {usRegulatedBrokers.map((broker) => (
                  <div key={broker.name} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{broker.name}</h3>
                      <p className="text-sm text-muted-foreground">{broker.features}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        NFA #{broker.nfa}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/brokers"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                View Full Broker Comparison →
              </Link>
            </section>

            {/* Offshore Brokers Section */}
            <section id="offshore-brokers" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                Offshore Brokers That Accept US Clients
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Important Considerations</h4>
                    <p className="text-red-700">
                      Offshore brokers are not regulated by US authorities. While legal to use, you have
                      limited recourse if issues arise. Higher leverage also means higher risk. Only use
                      funds you can afford to lose.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Some traders prefer offshore brokers for higher leverage, lower minimums, and no FIFO rule.
                Here are brokers that currently accept US clients:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border border-border rounded-xl overflow-hidden">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Broker</th>
                      <th className="text-center py-3 px-4 font-semibold">Min. Deposit</th>
                      <th className="text-center py-3 px-4 font-semibold">Max Leverage</th>
                      <th className="text-center py-3 px-4 font-semibold">US Accepted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offshoreBrokers.map((broker) => (
                      <tr key={broker.name} className="border-t border-border">
                        <td className="py-3 px-4 font-medium">{broker.name}</td>
                        <td className="text-center py-3 px-4">{broker.minDeposit}</td>
                        <td className="text-center py-3 px-4">{broker.leverage}</td>
                        <td className="text-center py-3 px-4">
                          <span className="text-green-600">✓ Yes</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/review/midasfx"
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
                >
                  <h4 className="font-semibold mb-1">MidasFX Review →</h4>
                  <p className="text-sm text-muted-foreground">$10 min, 1:1000 leverage, MT5</p>
                </Link>
                <Link
                  to="/review/hankotrade"
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
                >
                  <h4 className="font-semibold mb-1">Hankotrade Review →</h4>
                  <p className="text-sm text-muted-foreground">$10 min, 1:500 leverage, MT4/MT5</p>
                </Link>
              </div>
            </section>

            {/* Taxes Section */}
            <section id="taxes" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-primary" />
                Forex Taxes in the United States
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                US forex traders must report their trading income to the IRS. There are two main tax
                treatments available, and understanding the difference can significantly impact your tax liability.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Section 988 (Default)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li>• Treated as ordinary income</li>
                    <li>• Tax rates: 10% - 37%</li>
                    <li>• Losses offset ordinary income</li>
                    <li>• No limit on loss deductions</li>
                    <li>• Default for spot forex</li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> Traders with net losses or in lower tax brackets
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Section 1256 (Election)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li>• 60% long-term / 40% short-term</li>
                    <li>• Blended rate: ~23%</li>
                    <li>• Losses can carry back 3 years</li>
                    <li>• Must elect before year-end</li>
                    <li>• Requires regulated contracts</li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> Profitable traders in higher tax brackets
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Example Tax Calculation
                </h4>
                <p className="text-blue-700 mb-4">
                  Trader with $50,000 forex profit in the 32% tax bracket:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="font-medium text-blue-800">Section 988:</p>
                    <p className="text-blue-700">$50,000 × 32% = <strong>$16,000 tax</strong></p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="font-medium text-blue-800">Section 1256:</p>
                    <p className="text-blue-700">$50,000 × 23% = <strong>$11,500 tax</strong></p>
                    <p className="text-xs text-blue-600 mt-1">Saves $4,500!</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="font-semibold text-amber-800 mb-2">Tax Advice Disclaimer</h4>
                <p className="text-amber-700">
                  This is general information only. Tax laws are complex and depend on your individual
                  situation. Always consult a qualified tax professional or CPA who understands forex
                  trading before making any elections or filing your return.
                </p>
              </div>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Getting Started: Step-by-Step
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Learn the Basics</h3>
                    <p className="text-muted-foreground mb-3">
                      Before risking real money, understand how forex works: currency pairs, pips, lots,
                      leverage, and basic analysis.
                    </p>
                    <Link to="/guides/beginners-guide" className="text-primary hover:underline text-sm">
                      Read our Beginner's Guide →
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Choose a Broker</h3>
                    <p className="text-muted-foreground mb-3">
                      Decide between a US-regulated broker (safer, lower leverage) or offshore broker
                      (higher leverage, less protection). Compare features, costs, and platforms.
                    </p>
                    <Link to="/brokers" className="text-primary hover:underline text-sm">
                      Compare Brokers →
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Practice on Demo</h3>
                    <p className="text-muted-foreground mb-3">
                      Open a demo account and practice for at least 2-3 months. Track your results
                      and develop a consistent strategy before going live.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Start Small</h3>
                    <p className="text-muted-foreground mb-3">
                      When you go live, start with micro lots and risk only 1% per trade. Use our
                      position size calculator to determine proper lot sizes.
                    </p>
                    <Link to="/tools/position-size-calculator" className="text-primary hover:underline text-sm">
                      Position Size Calculator →
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Keep Records for Taxes</h3>
                    <p className="text-muted-foreground mb-3">
                      From day one, keep detailed records of all trades. Most platforms provide
                      statements, but also track deposits, withdrawals, and any fees. Consider
                      software like TraderTax or hire a forex-savvy CPA.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools CTA */}
            <div className="bg-gradient-card border border-border rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4">Essential Tools for US Traders</h2>
              <p className="text-muted-foreground mb-6">
                Use our free calculators to manage risk and plan your trades properly.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  to="/tools/pip-calculator"
                  className="bg-background border border-border rounded-xl p-4 hover:border-primary/50 transition-all flex items-center gap-3"
                >
                  <Calculator className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">Pip Calculator</h4>
                    <p className="text-xs text-muted-foreground">Calculate pip value</p>
                  </div>
                </Link>
                <Link
                  to="/tools/position-size-calculator"
                  className="bg-background border border-border rounded-xl p-4 hover:border-primary/50 transition-all flex items-center gap-3"
                >
                  <Scale className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">Position Size</h4>
                    <p className="text-xs text-muted-foreground">Calculate lot size</p>
                  </div>
                </Link>
                <Link
                  to="/guides/risk-management"
                  className="bg-background border border-border rounded-xl p-4 hover:border-primary/50 transition-all flex items-center gap-3"
                >
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">Risk Management</h4>
                    <p className="text-xs text-muted-foreground">Learn the 1% rule</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <section id="faq" className="mb-12 scroll-mt-24">
              <FAQSection faqs={faqs} />
            </section>

            {/* Newsletter */}
            <NewsletterCTA variant="card" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default USForexTradingGuide;
