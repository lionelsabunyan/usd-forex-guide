import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any>;
};

const SEO = ({
  title,
  description,
  canonical,
  ogImage = "https://usforexguide.com/og-image.png",
  ogType = "website",
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes("US Forex Guide") ? title : `${title} | US Forex Guide`;
  const siteUrl = "https://usforexguide.com";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Basic Meta Tags
    updateMetaTag("description", description);
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");
    updateLinkTag("canonical", fullCanonical);

    // Open Graph Tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", fullCanonical, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:site_name", "US Forex Guide", true);

    // Twitter Card Tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // JSON-LD Structured Data
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup function (optional, but good practice)
    return () => {
      // Cleanup can be added here if needed
    };
  }, [fullTitle, description, canonical, ogImage, ogType, noindex, jsonLd, fullCanonical]);

  // This component doesn't render anything
  return null;
};

export default SEO;
