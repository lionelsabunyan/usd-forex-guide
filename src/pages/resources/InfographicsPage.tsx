import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Download, Share2, Code, ExternalLink, Check, Copy } from "lucide-react";
import { useState } from "react";

const infographics = [
  {
    id: "us-forex-regulations-2026",
    title: "US Forex Trading Regulations 2026",
    description: "Complete guide to CFTC, NFA regulations, leverage limits, and registered brokers for US forex traders.",
    imageSrc: "/images/infographics/us-forex-regulations-2026.svg",
    downloadSrc: "/images/infographics/us-forex-regulations-2026.svg",
    tags: ["Regulations", "CFTC", "NFA", "US Traders"],
    featured: true,
  },
];

const InfographicsPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getEmbedCode = (infographic: typeof infographics[0]) => {
    return `<a href="https://beginnerfxguide.com/resources/infographics" target="_blank">
  <img src="https://beginnerfxguide.com${infographic.imageSrc}"
       alt="${infographic.title}"
       style="max-width:100%; height:auto;" />
</a>
<p style="font-size:12px; color:#666;">
  Source: <a href="https://beginnerfxguide.com">BeginnerFXGuide.com</a>
</p>`;
  };

  const copyEmbedCode = (id: string) => {
    const infographic = infographics.find(i => i.id === id);
    if (infographic) {
      navigator.clipboard.writeText(getEmbedCode(infographic));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const shareOnTwitter = (infographic: typeof infographics[0]) => {
    const text = encodeURIComponent(`${infographic.title} - A comprehensive visual guide for US forex traders. Check it out!`);
    const url = encodeURIComponent(`https://beginnerfxguide.com/resources/infographics#${infographic.id}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnPinterest = (infographic: typeof infographics[0]) => {
    const url = encodeURIComponent(`https://beginnerfxguide.com/resources/infographics#${infographic.id}`);
    const media = encodeURIComponent(`https://beginnerfxguide.com${infographic.imageSrc}`);
    const description = encodeURIComponent(infographic.description);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Forex Trading Infographics | Beginner FX Guide"
        description="Download and share free forex trading infographics. Visual guides covering US regulations, trading strategies, and broker comparisons. Embed on your site with attribution."
        canonical="/resources/infographics"
      />
      <Header />

      <main className="container mx-auto px-4 py-12">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Infographics" },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Free Forex <span className="text-gradient-gold">Infographics</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Visual guides to help you understand forex trading. Download, share, or embed on your website with attribution.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Free Download
            </span>
            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
              Free to Share
            </span>
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              Embed Code Included
            </span>
          </div>
        </div>

        {/* Infographics Grid */}
        <div className="space-y-16">
          {infographics.map((infographic) => (
            <div
              key={infographic.id}
              id={infographic.id}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    {infographic.featured && (
                      <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium mb-2">
                        Featured
                      </span>
                    )}
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      {infographic.title}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {infographic.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {infographic.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={infographic.downloadSrc} download>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnTwitter(infographic)}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Tweet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnPinterest(infographic)}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Pin It
                    </Button>
                  </div>
                </div>
              </div>

              {/* Infographic Preview */}
              <div className="p-6 bg-secondary/30">
                <div className="max-w-3xl mx-auto">
                  <img
                    src={infographic.imageSrc}
                    alt={infographic.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Embed Section */}
              <div className="p-6 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Embed This Infographic</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Copy the code below to embed this infographic on your website. Please include the attribution link.
                </p>
                <div className="relative">
                  <pre className="bg-secondary rounded-lg p-4 text-xs overflow-x-auto text-muted-foreground">
                    {getEmbedCode(infographic)}
                  </pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyEmbedCode(infographic.id)}
                  >
                    {copiedId === infographic.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <div className="mt-16 bg-card rounded-2xl border border-border p-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Usage Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                You Can:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Download and share on social media</li>
                <li>• Embed on your website or blog</li>
                <li>• Use in presentations (non-commercial)</li>
                <li>• Print for personal/educational use</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="w-5 h-5 text-destructive">✗</span>
                Please Don't:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Remove or alter the attribution</li>
                <li>• Claim the graphics as your own work</li>
                <li>• Sell or redistribute without permission</li>
                <li>• Modify the content within the graphic</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Request CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Have an idea for a new infographic? We'd love to hear it!
          </p>
          <Button asChild>
            <a href="/contact">
              Suggest an Infographic Topic
            </a>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfographicsPage;
