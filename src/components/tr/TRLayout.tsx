import HeaderTR from "./HeaderTR";
import FooterTR from "./FooterTR";
import MobileStickyFooterTR from "./MobileStickyFooterTR";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
};

const TRLayout = ({ children, title, description, keywords, image }: Props) => {
  const location = useLocation();
  const currentUrl = `https://beginnerfxguide.com${location.pathname}`;
  const enUrl = location.pathname.replace('/tr', '') || '/';
  const fullTitle = title ? `${title} | Beginner FX Guide TR` : "Türkiye'den Erişilebilen Forex Brokerları 2026 | Beginner FX Guide TR";
  const ogImage = image || "https://beginnerfxguide.com/images/og/og-tr-default.svg";

  useEffect(() => {
    // Set document language to Turkish
    document.documentElement.lang = "tr";

    return () => {
      // Reset to English when leaving TR pages
      document.documentElement.lang = "en";
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Page Title */}
        <title>{fullTitle}</title>

        {/* Meta Tags */}
        <meta name="description" content={description || "2026'nın en iyi forex broker'larını karşılaştırın. FCA, CySEC lisanslı, Türkçe destekli broker incelemeleri."} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />

        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="tr" href={currentUrl} />
        <link rel="alternate" hrefLang="en-us" href={`https://beginnerfxguide.com${enUrl}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://beginnerfxguide.com${enUrl}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || "2026'nın en iyi forex broker'larını karşılaştırın."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="Beginner FX Guide TR" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@beginnerfxguide" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description || "2026'nın en iyi forex broker'larını karşılaştırın."} />
        <meta name="twitter:image" content={ogImage} />

        {/* Schema.org JSON-LD for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Beginner FX Guide TR",
            "url": "https://beginnerfxguide.com/tr",
            "logo": "https://beginnerfxguide.com/logo.svg",
            "sameAs": [
              "https://beginnerfxguide.com"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "availableLanguage": ["Turkish", "English"]
            }
          })}
        </script>

        {/* Schema.org JSON-LD for WebSite */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Beginner FX Guide TR",
            "url": "https://beginnerfxguide.com/tr",
            "inLanguage": "tr",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://beginnerfxguide.com/tr?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <HeaderTR />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <FooterTR />
        <MobileStickyFooterTR />
      </div>
    </>
  );
};

export default TRLayout;
