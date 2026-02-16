import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import BonusSection from "@/components/BonusSection";
import QuickFacts from "@/components/QuickFacts";
import { getAffiliateUrl, UTM_CONFIGS } from "@/lib/tracking";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

import ReviewHero from "./ReviewHero";
import ReviewWarningBanner from "./ReviewWarningBanner";
import ReviewTrustBanner from "./ReviewTrustBanner";
import ReviewAccountSteps from "./ReviewAccountSteps";
import ReviewProsAndCons from "./ReviewProsAndCons";
import ReviewAccountTypes from "./ReviewAccountTypes";
import ReviewDetailedRatings from "./ReviewDetailedRatings";
import ReviewPaymentMethods from "./ReviewPaymentMethods";
import ReviewCompetitorTable from "./ReviewCompetitorTable";
import ReviewCommunityFeedback from "./ReviewCommunityFeedback";
import ReviewFAQ from "./ReviewFAQ";
import ReviewFinalCTA from "./ReviewFinalCTA";
import ReviewStickyMobileCTA from "./ReviewStickyMobileCTA";

interface BrokerReviewTemplateProps {
  data: BrokerReviewData;
}

const BrokerReviewTemplate = ({ data }: BrokerReviewTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={data.canonical}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": data.brokerName,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": data.overallRating,
              "ratingCount": data.ratingCount,
              "reviewCount": data.reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.overallRating,
            "bestRating": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
        }}
      />
      <Header />

      <ReviewHero data={data} />

      <ReviewWarningBanner text={data.warningBanner.text} />

      <ReviewTrustBanner features={data.trustFeatures} />

      {data.quickStats && data.quickStats.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <QuickFacts
            title="Quick Facts"
            facts={data.quickStats.map((stat) => ({
              label: stat.label,
              value: stat.value,
              type: stat.label.toLowerCase().includes("us") ||
                    stat.label.toLowerCase().includes("accepted") ||
                    stat.value.toLowerCase().includes("yes") ||
                    stat.label.toLowerCase().includes("trustpilot")
                ? "positive"
                : stat.label.toLowerCase().includes("regulation") ||
                  stat.label.toLowerCase().includes("offshore")
                ? "warning"
                : "neutral",
            }))}
          />
        </div>
      )}

      {data.bonusOffers && data.bonusOffers.length > 0 && (
        <BonusSection
          offers={data.bonusOffers}
          brokerName={data.brokerName}
          affiliateUrl={getAffiliateUrl(data.brokerId, UTM_CONFIGS.REVIEW_HERO)}
        />
      )}

      <ReviewAccountSteps
        brokerId={data.brokerId}
        brokerName={data.brokerName}
        steps={data.accountOpeningSteps}
      />

      <ReviewProsAndCons pros={data.pros} cons={data.cons} />

      <ReviewAccountTypes accountTypes={data.accountTypes} />

      <ReviewDetailedRatings ratings={data.ratings} />

      <ReviewPaymentMethods paymentMethods={data.paymentMethods} />

      <ReviewCompetitorTable
        brokerId={data.brokerId}
        brokerName={data.brokerName}
        competitors={data.competitors}
        rows={data.competitorComparison}
      />

      <ReviewCommunityFeedback
        feedback={data.communityFeedback}
        trustpilotRating={data.trustpilotRating}
        trustpilotReviews={data.trustpilotReviews}
      />

      <ReviewFAQ faqs={data.faqs} />

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName={data.brokerName} brokerId={data.brokerId} />
          </div>
        </div>
      </section>

      <ReviewFinalCTA
        brokerId={data.brokerId}
        brokerName={data.brokerName}
        ctaDescription={`Start trading with ${data.keyHighlights.minDeposit} minimum deposit.${data.keyHighlights.usClients === "YES" ? " US clients welcome." : ""}`}
        riskWarning={data.warningBanner.text}
      />

      <ReviewStickyMobileCTA
        brokerId={data.brokerId}
        brokerName={data.brokerName}
      />

      <Footer />
    </div>
  );
};

export default BrokerReviewTemplate;
