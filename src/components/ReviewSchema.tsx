import { Helmet } from "react-helmet-async";

interface ReviewSchemaProps {
  brokerName: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  pros?: string[];
  cons?: string[];
  minDeposit?: string;
  maxLeverage?: string;
  regulation?: string;
  spread?: string;
}

const ReviewSchema = ({
  brokerName,
  rating,
  reviewBody,
  datePublished,
  pros = [],
  cons = [],
  minDeposit,
  maxLeverage,
  regulation,
  spread,
}: ReviewSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "FinancialProduct",
      name: `${brokerName} Forex Broker`,
      description: `${brokerName} is a forex broker ${regulation ? `regulated by ${regulation}` : "accepting US clients"}`,
      offers: minDeposit
        ? {
            "@type": "Offer",
            price: minDeposit,
            priceCurrency: "USD",
          }
        : undefined,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "Beginner FX Guide",
      url: "https://beginnerfxguide.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Beginner FX Guide",
      url: "https://beginnerfxguide.com",
    },
    datePublished,
    dateModified: new Date().toISOString().split("T")[0],
    reviewBody: reviewBody.substring(0, 500), // First 500 chars
    positiveNotes: pros.length > 0 ? pros.join(", ") : undefined,
    negativeNotes: cons.length > 0 ? cons.join(", ") : undefined,
  };

  // Remove undefined fields
  const cleanSchema = JSON.parse(
    JSON.stringify(schema, (key, value) => (value === undefined ? null : value))
  );

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(cleanSchema)}</script>
    </Helmet>
  );
};

export default ReviewSchema;
