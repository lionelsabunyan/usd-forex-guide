import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Clock, CheckCircle, AlertCircle, Ban, FileCheck, Scale } from "lucide-react";
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
## Overview of US Forex Regulations
## Key Regulatory Bodies
### CFTC (Commodity Futures Trading Commission)
### NFA (National Futures Association)
## Leverage Limits in the US
## FIFO Rule and Hedging Restrictions
## CFTC/NFA Registered Brokers
## Offshore Brokers: Understanding Your Options
## How to Verify a Broker's Registration
## Frequently Asked Questions
`;

const faqs = [
  {
    question: "Is it legal to trade forex in the United States?",
    answer: "Yes, forex trading is completely legal in the United States. US traders can use CFTC/NFA-regulated brokers or offshore brokers that accept US clients. However, forex brokers operating in the US must be registered with the CFTC and be members of the NFA."
  },
  {
    question: "What is the maximum leverage allowed for US forex traders?",
    answer: "For US-regulated brokers, CFTC rules limit leverage to 50:1 for major currency pairs (like EUR/USD, GBP/USD) and 20:1 for minor and exotic pairs. However, offshore brokers that accept US clients may offer leverage up to 3000:1."
  },
  {
    question: "Is it legal to use offshore forex brokers from the US?",
    answer: "While US law doesn't explicitly prohibit US citizens from trading with offshore brokers, these brokers are not regulated by US authorities. This means you have no legal protection if something goes wrong. The decision to use offshore brokers is at your own risk."
  },
  {
    question: "How many CFTC-registered forex brokers accept US clients?",
    answer: "As of 2026, there are only about 3-4 major CFTC/NFA-registered retail forex dealers that accept US clients: OANDA, Forex.com (GAIN Capital), IG US, and Interactive Brokers. The high capital requirements ($20 million minimum) make it difficult for smaller brokers to operate in the US."
  },
  {
    question: "What is the FIFO rule in US forex trading?",
    answer: "FIFO (First In, First Out) is a US regulation that requires traders to close positions in the order they were opened. If you have multiple positions in the same currency pair, you must close the oldest one first. This rule doesn't exist in most international markets."
  },
  {
    question: "Can US traders hedge in forex?",
    answer: "No, US-regulated brokers are prohibited from allowing traders to hold opposing positions (buy and sell) on the same currency pair simultaneously. This is called 'hedging' and is banned under CFTC regulations. However, offshore brokers that accept US clients typically allow hedging."
  },
  {
    question: "What happens if a US-regulated forex broker goes bankrupt?",
    answer: "Unlike stock brokers, forex brokers are not covered by SIPC insurance. However, CFTC/NFA-regulated brokers must maintain a minimum net capital of $20 million and keep client funds in segregated accounts. This provides some protection, but forex trading is not insured like stock trading."
  }
];

const USForexRegulations = () => {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="US Forex Regulations Guide 2026 | CFTC, NFA & Legal Requirements"
        description="Complete guide to US forex regulations in 2026. Learn about CFTC, NFA requirements, leverage limits, FIFO rule, and legal trading options for American traders."
        canonical="/guides/us-forex-regulations"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "US Forex Regulations Guide 2026",
          "description": "Understanding the regulatory landscape for forex trading in the United States including CFTC and NFA requirements.",
          "author": { "@type": "Organization", "name": "US Forex Guide" },
          "publisher": { "@type": "Organization", "name": "US Forex Guide" },
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
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Intermediate</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Forex Trading in the <span className="text-gradient-gold">United States</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Understand the regulatory landscape for US-based traders in 2026. Learn about CFTC, NFA requirements,
            leverage limits, and how to trade legally and safely.
          </p>
          <LastUpdated date="February 1, 2026" reviewedBy="US Forex Guide Legal Team" />
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
                <h2 id="heading-0-overview-of-us-forex-regulations" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Overview of US Forex Regulations</h2>
                <p className="text-muted-foreground mb-4">
                  The United States has one of the most stringent regulatory frameworks for Forex trading in the world.
                  While this provides strong consumer protections, it also means fewer broker choices for American traders.
                </p>

                <QuotableFact
                  fact="The United States requires retail forex dealers to maintain a minimum net capital of $20 million—the highest requirement in the world. This is why only 3-4 brokers currently serve US retail forex traders."
                  source="NFA Capital Requirements Rule"
                  type="regulation"
                />

                <StatHighlight
                  title="US Forex Regulation at a Glance (2026)"
                  stats={[
                    { value: "50:1", label: "Max Leverage", description: "Major pairs" },
                    { value: "20:1", label: "Minor Pairs", description: "Exotic currencies" },
                    { value: "$20M", label: "Min Capital", description: "For brokers" },
                    { value: "3-4", label: "Retail Brokers", description: "CFTC registered" }
                  ]}
                  source="CFTC/NFA 2026"
                />
              </section>

              {/* Regulatory Bodies */}
              <section className="mb-12">
                <h2 id="heading-1-key-regulatory-bodies" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Key Regulatory Bodies</h2>

                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 id="heading-2-cftc-commodity-futures-trading-commission-" className="text-xl font-semibold mb-2 scroll-mt-24">CFTC (Commodity Futures Trading Commission)</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          The primary federal regulatory agency overseeing Forex trading in the US. The CFTC protects
                          market participants from fraud, manipulation, and abusive practices.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Regulates Forex dealers and intermediaries</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Sets capital requirements for brokers ($20 million minimum)</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Enforces compliance through audits and penalties</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 id="heading-3-nfa-national-futures-association-" className="text-xl font-semibold mb-2 scroll-mt-24">NFA (National Futures Association)</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          A self-regulatory organization that works alongside the CFTC. All retail Forex dealers
                          must be NFA members.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Requires $20 million minimum capital for dealers</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Conducts background checks on industry professionals</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Handles dispute resolution between traders and brokers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Leverage Limits */}
              <section className="mb-12">
                <h2 id="heading-4-leverage-limits-in-the-us" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Leverage Limits in the US</h2>
                <p className="text-muted-foreground mb-4">
                  US regulations impose strict leverage limits to protect retail traders from excessive risk:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50:1</div>
                    <div className="font-semibold mb-1">Major Currency Pairs</div>
                    <p className="text-sm text-muted-foreground">EUR/USD, GBP/USD, USD/JPY, USD/CHF, USD/CAD, AUD/USD, NZD/USD</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">20:1</div>
                    <div className="font-semibold mb-1">Minor & Exotic Pairs</div>
                    <p className="text-sm text-muted-foreground">USD/TRY, EUR/PLN, GBP/ZAR, and all other pairs</p>
                  </div>
                </div>

                <QuotableFact
                  fact="With 50:1 leverage, a $1,000 account can control up to $50,000 in currency. While this may seem limiting compared to offshore brokers offering 500:1 or higher, studies show that traders using higher leverage tend to lose money faster."
                  source="CFTC Leverage Study"
                  type="regulation"
                />

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Global Leverage Comparison (2026)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-blue-700">United States</div>
                      <div className="text-blue-600">50:1 max</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-700">European Union</div>
                      <div className="text-blue-600">30:1 max</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-700">Australia</div>
                      <div className="text-blue-600">30:1 max</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-700">Offshore</div>
                      <div className="text-blue-600">Up to 3000:1</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA variant="inline" />

              {/* FIFO and Hedging */}
              <section className="mb-12">
                <h2 id="heading-5-fifo-rule-and-hedging-restrictions" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">FIFO Rule and Hedging Restrictions</h2>

                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3">FIFO (First In, First Out)</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      When you have multiple positions in the same currency pair, you must close them in the order
                      they were opened. You cannot selectively choose which position to close first.
                    </p>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>Example:</strong> If you open 3 buy positions on EUR/USD at different prices,
                        you must close the first one before you can close the second or third—even if closing
                        the third would be more profitable.
                      </p>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <Ban className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">No Hedging Allowed</h3>
                        <p className="text-muted-foreground text-sm">
                          US-regulated brokers cannot allow traders to hold opposing positions (buy and sell)
                          on the same currency pair simultaneously. This is different from most international brokers
                          where hedging is a common risk management strategy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <QuotableFact
                  fact="The FIFO rule and hedging prohibition are unique to US forex regulations. These rules were implemented by the CFTC in 2009 to 'reduce risk to customers' but remain controversial among experienced traders who view hedging as a legitimate risk management tool."
                  source="CFTC Rule 5.13"
                  type="regulation"
                />
              </section>

              {/* Legal Brokers */}
              <section className="mb-12">
                <h2 id="heading-6-cftc-nfa-registered-brokers" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">CFTC/NFA Registered Brokers</h2>
                <p className="text-muted-foreground mb-4">
                  Due to strict regulatory requirements, only a handful of brokers are registered to offer
                  Forex trading to US residents:
                </p>

                <StatHighlight
                  title="Major US-Regulated Forex Brokers (2026)"
                  stats={[
                    { value: "OANDA", label: "Est. 1996", description: "$0 minimum" },
                    { value: "Forex.com", label: "Est. 2001", description: "$100 minimum" },
                    { value: "IG US", label: "Est. 2019", description: "$250 minimum" },
                    { value: "IBKR", label: "Est. 1977", description: "$0 minimum" }
                  ]}
                />

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6">
                  <h4 className="font-semibold text-green-800 mb-3">Benefits of US-Regulated Brokers</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Segregated client funds (your money is kept separate)</span>
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>$20 million minimum capital requirement</span>
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>NFA dispute resolution for complaints</span>
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Regular audits and transparency reports</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Offshore Brokers */}
              <section className="mb-12">
                <h2 id="heading-7-offshore-brokers-understanding-your-options" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Offshore Brokers: Understanding Your Options</h2>

                <p className="text-muted-foreground mb-4">
                  Many US traders choose offshore brokers for higher leverage, hedging ability, and lower minimum deposits.
                  While not regulated by US authorities, some offshore brokers actively accept US clients.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Offshore Broker Advantages
                    </h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• Higher leverage (up to 1:3000)</li>
                      <li>• Hedging allowed</li>
                      <li>• No FIFO rule</li>
                      <li>• Lower minimum deposits ($1-10)</li>
                      <li>• Crypto deposit options</li>
                      <li>• More trading instruments</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Offshore Broker Risks
                    </h4>
                    <ul className="space-y-2 text-red-700 text-sm">
                      <li>• No CFTC/NFA protection</li>
                      <li>• Limited legal recourse</li>
                      <li>• Varying regulation quality</li>
                      <li>• Potential withdrawal issues</li>
                      <li>• Currency conversion costs</li>
                      <li>• Some may be unregulated</li>
                    </ul>
                  </div>
                </div>

                <QuotableFact
                  fact="Popular offshore brokers accepting US clients in 2026 include FXGlory (VFSC regulated, up to 1:3000 leverage), Hankotrade (SFSA regulated, 1:500 leverage), and MidasFX (SVG registered, 1:1000 leverage). Always verify a broker's regulation status before depositing funds."
                  source="US Forex Guide Broker Research 2026"
                  type="quote"
                />
              </section>

              {/* How to Verify */}
              <section className="mb-12">
                <h2 id="heading-8-how-to-verify-a-broker-s-registration" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">How to Verify a Broker's Registration</h2>

                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    For US-Regulated Brokers
                  </h4>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="font-bold text-primary">1.</span>
                      <span>Visit the NFA's BASIC website: <a href="https://www.nfa.futures.org/basicnet/" target="_blank" rel="noopener noreferrer" className="text-primary underline">nfa.futures.org/basicnet</a></span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="font-bold text-primary">2.</span>
                      <span>Search for the broker by name or NFA ID number</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="font-bold text-primary">3.</span>
                      <span>Verify their registration status shows "APPROVED"</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="font-bold text-primary">4.</span>
                      <span>Check for any regulatory actions or complaints</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">For Offshore Brokers</h4>
                      <p className="text-sm text-amber-700">
                        Verify the broker's offshore regulation (VFSC, SFSA, FSA, etc.) on the respective regulatory
                        authority's website. Check user reviews on independent sites like Trustpilot, ForexPeaceArmy,
                        and trading forums. Start with a small deposit to test withdrawals before committing larger amounts.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <FAQSection faqs={faqs} />

              {/* Next Steps */}
              <section className="mb-12">
                <h2 className="text-2xl font-heading font-bold mb-4">Related Guides</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/guides/broker-comparison" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                    <h3 className="font-semibold mb-2">How to Compare Brokers</h3>
                    <p className="text-sm text-muted-foreground">Learn what to look for when choosing a broker.</p>
                  </Link>
                  <Link to="/brokers" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                    <h3 className="font-semibold mb-2">Broker Reviews</h3>
                    <p className="text-sm text-muted-foreground">Read our in-depth reviews of popular brokers.</p>
                  </Link>
                </div>
              </section>

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

export default USForexRegulations;
