import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBroker from "@/components/FeaturedBroker";
import BrokerComparison from "@/components/BrokerComparison";
import HowItWorks from "@/components/HowItWorks";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="US Forex Guide - Top Brokers & Reviews for American Traders"
        description="Find the best forex brokers for US traders. Unbiased reviews of FXGlory, N1CM, eToro, and more. Compare leverage, spreads, and trading conditions. Expert guides and strategies."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "US Forex Guide",
          "url": "https://usforexguide.com",
          "description": "Independent forex broker reviews and guides for US traders",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://usforexguide.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <FeaturedBroker />
        <BrokerComparison />
        <HowItWorks />
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
