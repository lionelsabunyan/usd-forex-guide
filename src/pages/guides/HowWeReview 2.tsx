import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Scale, ArrowLeft, Clock, CheckCircle, Eye, Shield, FileSearch, Users, AlertTriangle, Award, Target, Percent } from "lucide-react";
import SEO from "@/components/SEO";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import QuotableFact from "@/components/QuotableFact";
import StatHighlight from "@/components/StatHighlight";
import FAQSection from "@/components/FAQSection";
import LastUpdated from "@/components/LastUpdated";
import NewsletterCTA from "@/components/NewsletterCTA";

const guideContent = `
## Our Review Philosophy
## How We Evaluate Brokers
### Trading Conditions (35%)
### Regulation & Safety (25%)
### Platform & Technology (20%)
### Customer Experience (20%)
## Our Testing Process
## What We Don't Do
## Rating Criteria Breakdown
## Frequently Asked Questions
`;

const faqs = [
  {
    question: "How do you make money if reviews are unbiased?",
    answer: "We earn affiliate commissions when readers sign up with brokers through our links. However, this never influences our ratings or rankings. We prominently display both pros AND cons for every broker. Many brokers we review don't have affiliate programs at all—we still review them because our readers need complete information."
  },
  {
    question: "Do brokers pay for higher rankings?",
    answer: "No. Our rankings are based solely on our evaluation criteria. We don't accept payment for placement, and brokers cannot buy better scores. Our 'Editor's Choice' badges are earned through performance, not payments. We clearly disclose all affiliate relationships on our site."
  },
  {
    question: "How often do you update reviews?",
    answer: "We review and update each broker profile at least quarterly, or immediately when significant changes occur (new regulations, fee changes, platform updates). Every review page shows a 'Last Updated' date so you know how current the information is."
  },
  {
    question: "Do you actually test the brokers?",
    answer: "Yes. We open real accounts, make real deposits, and execute real trades. We test deposit/withdrawal speeds, customer support response times, platform stability, and actual spreads during different market conditions. We don't rely on marketing materials."
  },
  {
    question: "Why do you focus on US traders?",
    answer: "While we originally started with a US focus due to unique regulatory requirements (CFTC, NFA restrictions), our reviews are valuable for traders worldwide. We clearly indicate which brokers accept US clients and which don't, helping all readers understand their options based on their location."
  },
  {
    question: "Can I trust your ratings?",
    answer: "We're transparent about our methodology, testing process, and business model. Every rating component is explained, and we show our work. We encourage readers to verify information independently. We're not perfect, but we're honest—and we welcome feedback to improve."
  }
];

const HowWeReview = () => {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title="How We Review Forex Brokers | Our Methodology | US Forex Guide"
        description="Transparent broker review methodology. Learn how we evaluate spreads, regulation, platforms, and customer service. No paid placements, honest ratings."
        canonical="/guides/how-we-review"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How We Review Forex Brokers - Our Methodology",
          "description": "Complete transparency on how we evaluate and rate forex brokers. Learn our testing process, rating criteria, and commitment to unbiased reviews.",
          "author": { "@type": "Organization", "name": "US Forex Guide" },
          "publisher": { "@type": "Organization", "name": "US Forex Guide" },
          "datePublished": "2024-01-01",
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
              <Scale className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Transparency</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            How We <span className="text-gradient-gold">Review Brokers</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Complete transparency on our methodology. No paid placements, no hidden agendas—just
            honest, data-driven broker evaluations.
          </p>
          <LastUpdated date="February 1, 2026" reviewedBy="US Forex Guide Editorial Team" />
        </div>
      </section>

      {/* Content with TOC */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex gap-8">
            {/* Main Content */}
            <article className="flex-1 max-w-4xl">

              {/* Our Philosophy */}
              <section className="mb-12">
                <h2 id="heading-0-our-review-philosophy" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Our Review Philosophy</h2>
                <p className="text-muted-foreground mb-4">
                  We believe traders deserve honest, transparent information to make informed decisions.
                  The forex industry is full of marketing hype and misleading claims—we aim to cut through
                  the noise with fact-based reviews.
                </p>

                <QuotableFact
                  fact="Every broker review is based on real account testing, not marketing materials. We deposit real money, execute real trades, and test real customer support. Our ratings reflect actual trader experience, not promises."
                  source="US Forex Guide Editorial Policy"
                  type="quote"
                />

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Transparent</h3>
                    <p className="text-sm text-muted-foreground">
                      We show our methodology and explain every rating component
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <Scale className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Unbiased</h3>
                    <p className="text-sm text-muted-foreground">
                      No paid placements. Rankings based on merit only
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-3">
                      <FileSearch className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Verified</h3>
                    <p className="text-sm text-muted-foreground">
                      Real account testing with actual deposits and trades
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Evaluate */}
              <section className="mb-12">
                <h2 id="heading-1-how-we-evaluate-brokers" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">How We Evaluate Brokers</h2>
                <p className="text-muted-foreground mb-6">
                  Our rating system evaluates brokers across four key areas, weighted by importance
                  to the average trader. Here's exactly how we calculate our scores:
                </p>

                <StatHighlight
                  title="Rating Weight Distribution"
                  stats={[
                    { value: "35%", label: "Trading Conditions", description: "Spreads, leverage, execution" },
                    { value: "25%", label: "Regulation & Safety", description: "Licenses, fund security" },
                    { value: "20%", label: "Platform & Tech", description: "Tools, stability, mobile" },
                    { value: "20%", label: "Customer Experience", description: "Support, deposits, withdrawals" }
                  ]}
                  source="US Forex Guide Rating System"
                />

                {/* Trading Conditions */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Percent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="w-full">
                      <h3 id="heading-2-trading-conditions-35" className="text-lg font-semibold mb-3 scroll-mt-24">Trading Conditions (35%)</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        The core of any broker evaluation. We test actual trading conditions, not advertised ones.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Spreads:</strong> Measured during major sessions (London, NY) and news events</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Execution Speed:</strong> Order fill times and slippage analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Leverage Options:</strong> Available leverage tiers for different account types</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Commission Structure:</strong> All fees including swaps, overnight charges</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Instrument Selection:</strong> Currency pairs, CFDs, commodities available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Regulation */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="w-full">
                      <h3 id="heading-3-regulation-safety-25" className="text-lg font-semibold mb-3 scroll-mt-24">Regulation & Safety (25%)</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Your money's safety is paramount. We verify regulatory status and fund protection measures.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Regulatory Licenses:</strong> NFA, CFTC, FCA, ASIC, CySEC verification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Fund Segregation:</strong> Client money held separately from company funds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Insurance:</strong> Investor compensation schemes and additional coverage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Company History:</strong> Years in operation, ownership, track record</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Platform */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="w-full">
                      <h3 id="heading-4-platform-technology-20" className="text-lg font-semibold mb-3 scroll-mt-24">Platform & Technology (20%)</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        We test platforms during high-volatility periods to evaluate real-world performance.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Platform Options:</strong> MT4, MT5, proprietary platforms, web trading</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Stability:</strong> Uptime during major news events and market volatility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Mobile App:</strong> Feature parity, ease of use, reliability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Tools & Analysis:</strong> Charting, indicators, research tools</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Customer Experience */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="w-full">
                      <h3 id="heading-5-customer-experience-20" className="text-lg font-semibold mb-3 scroll-mt-24">Customer Experience (20%)</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        We test support across all channels and measure actual response and resolution times.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Support Quality:</strong> Live chat, phone, email response times and helpfulness</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Deposit Speed:</strong> Time from initiation to account credit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Withdrawal Speed:</strong> Processing time and any restrictions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span><strong>Educational Resources:</strong> Quality and depth of learning materials</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter CTA */}
              <NewsletterCTA variant="inline" />

              {/* Testing Process */}
              <section className="mb-12">
                <h2 id="heading-6-our-testing-process" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Our Testing Process</h2>
                <p className="text-muted-foreground mb-6">
                  Every broker goes through a structured testing process before we publish a review:
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Account Registration</h4>
                      <p className="text-sm text-muted-foreground">
                        We go through the full signup process as a regular customer, noting ease of verification and any issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Real Deposit</h4>
                      <p className="text-sm text-muted-foreground">
                        We deposit real funds using multiple payment methods to test deposit speed and fees.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Live Trading</h4>
                      <p className="text-sm text-muted-foreground">
                        Execute trades during different market conditions to test spreads, execution, and slippage.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Support Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact support with common questions via all available channels and measure response quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Withdrawal Test</h4>
                      <p className="text-sm text-muted-foreground">
                        Request withdrawal to verify processing time and any hidden fees or obstacles.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* What We Don't Do */}
              <section className="mb-12">
                <h2 id="heading-7-what-we-dont-do" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">What We Don't Do</h2>
                <p className="text-muted-foreground mb-6">
                  To maintain integrity, we have strict policies about what we won't do:
                </p>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <span className="text-red-800"><strong>No Paid Placements:</strong> Brokers cannot pay for rankings or better ratings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <span className="text-red-800"><strong>No Hidden Ads:</strong> All affiliate links are clearly disclosed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <span className="text-red-800"><strong>No Sponsored Content:</strong> We don't publish broker-written reviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <span className="text-red-800"><strong>No Rating Manipulation:</strong> We won't remove negative reviews for payment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <span className="text-red-800"><strong>No Fake Reviews:</strong> All reviews based on real testing, not marketing claims</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Rating Breakdown */}
              <section className="mb-12">
                <h2 id="heading-8-rating-criteria-breakdown" className="text-2xl font-heading font-bold mb-4 scroll-mt-24">Rating Criteria Breakdown</h2>
                <p className="text-muted-foreground mb-6">
                  Our 5-star rating system works as follows:
                </p>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">5.0 - Exceptional</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Top-tier in all categories</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-500" />
                        <span className="font-medium">4.0-4.9 - Excellent</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Strong overall, minor weaknesses</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">3.0-3.9 - Good</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Solid option with notable drawbacks</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">2.0-2.9 - Fair</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Significant concerns, proceed with caution</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-red-500" />
                        <span className="font-medium">Below 2.0 - Not Recommended</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Major issues, avoid</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <FAQSection faqs={faqs} />

              {/* CTA */}
              <section className="mb-12">
                <h2 className="text-2xl font-heading font-bold mb-4">Ready to Compare Brokers?</h2>
                <p className="text-muted-foreground mb-6">
                  Now that you understand our methodology, explore our broker reviews and comparisons:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/brokers" className="bg-primary text-primary-foreground rounded-xl p-6 hover:bg-primary/90 transition-all text-center">
                    <h3 className="font-semibold mb-2">View All Broker Reviews</h3>
                    <p className="text-sm opacity-90">Compare 25+ brokers side by side</p>
                  </Link>
                  <Link to="/guides/broker-comparison" className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all text-center">
                    <h3 className="font-semibold mb-2">Broker Comparison Guide</h3>
                    <p className="text-sm text-muted-foreground">Learn how to choose the right broker</p>
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

export default HowWeReview;
