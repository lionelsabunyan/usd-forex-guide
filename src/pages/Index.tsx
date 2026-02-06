import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBroker from "@/components/FeaturedBroker";
import BrokerComparison from "@/components/BrokerComparison";
import HowItWorks from "@/components/HowItWorks";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TrustSignals from "@/components/TrustSignals";
import LeadMagnetBanner from "@/components/LeadMagnetBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Best Forex Brokers for US Traders 2026 | Beginner FX Guide"
        description="Compare the best forex brokers that accept US clients in 2026. Unbiased reviews of OANDA, Forex.com, FXGlory & offshore options. Guides, tools, and tips for American traders."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Beginner FX Guide",
          "url": "https://beginnerfxguide.com",
          "description": "Independent forex broker reviews and comparisons for US traders. Compare CFTC-regulated and offshore brokers, learn trading strategies, and use free tools.",
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
            "url": "https://beginnerfxguide.com"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://beginnerfxguide.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <FeaturedBroker />
        <BrokerComparison />
        <HowItWorks />
        <div className="container mx-auto px-4">
          <LeadMagnetBanner />
        </div>
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
