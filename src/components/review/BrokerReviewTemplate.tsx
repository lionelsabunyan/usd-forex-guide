import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import BonusSection from "@/components/BonusSection";
import QuickFacts from "@/components/QuickFacts";
import { Button } from "@/components/ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS, isIBBroker } from "@/lib/tracking";
import { brokers } from "@/lib/brokers";
import { ArrowRight } from "lucide-react";
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
  const isIB = isIBBroker(data.brokerId);
  const broker = brokers[data.brokerId];
  const usAccepted = broker?.usAccepted === true;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={data.canonical}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Review",
              "itemReviewed": {
                "@type": "FinancialService",
                "name": data.brokerName,
                ...(broker?.siteUrl ? { "url": broker.siteUrl } : {}),
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": data.overallRating,
                  "ratingCount": data.ratingCount,
                  "reviewCount": data.reviewCount,
                  "bestRating": "5",
                  "worstRating": "1",
                },
              },
              "author": {
                "@type": "Organization",
                "name": "Beginner FX Guide",
                "url": "https://beginnerfxguide.com",
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
                "url": "https://beginnerfxguide.com",
              },
              ...(data.lastUpdated ? { "datePublished": data.lastUpdated, "dateModified": data.lastUpdated } : {}),
            },
            {
              "@type": "Organization",
              "name": data.brokerName,
              ...(broker?.siteUrl ? { "url": broker.siteUrl } : {}),
              ...(broker?.foundedYear ? { "foundingDate": String(broker.foundedYear) } : {}),
              ...(broker?.headquarters ? { "address": { "@type": "PostalAddress", "addressLocality": broker.headquarters } } : {}),
            },
            ...(data.faqs && data.faqs.length > 0
              ? [{
                  "@type": "FAQPage",
                  "mainEntity": data.faqs.map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer,
                    },
                  })),
                }]
              : []),
          ],
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

      {/* IB Broker inline CTA strip — shown only for IB partners */}
      {isIB && (
        <div className="bg-primary/5 border-y border-primary/10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-5xl mx-auto">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                <span className="font-semibold text-foreground">{data.brokerName}</span> — {data.keyHighlights.minDeposit} min deposit · {data.keyHighlights.maxLeverage} leverage · {usAccepted ? "🇺🇸 US Clients Accepted" : "International Clients"}
              </p>
              <Button variant="default" size="sm" className="flex-shrink-0 group" asChild>
                <a
                  href={getAffiliateUrl(data.brokerId, UTM_CONFIGS.REVIEW_HERO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(data.brokerId, "review_quickfacts_strip", "open_account")}
                >
                  Open Account <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
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

      <ReviewProsAndCons pros={data.pros} cons={data.cons} brokerId={data.brokerId} brokerName={data.brokerName} />

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

      {/* Cross-sell banner for non-IB brokers — guides US traders to our IB partner */}
      {!isIB && usAccepted === false && (
        <div className="py-10 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Looking for a US-Friendly Alternative?</p>
                <p className="font-semibold text-foreground">{data.brokerName} doesn't accept US clients.</p>
                <p className="text-sm text-muted-foreground mt-1">Hankotrade is our #1 pick for US traders — zero spreads, $10 min deposit, crypto deposits.</p>
              </div>
              <Button variant="hero" size="sm" className="flex-shrink-0 group" asChild>
                <a
                  href={getAffiliateUrl("hankotrade", UTM_CONFIGS.REVIEW_BOTTOM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hankotrade", "review_crosssell", "open_account")}
                >
                  Try Hankotrade <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cross-sell for non-IB brokers that DO accept US — soft upsell to IB */}
      {!isIB && usAccepted === true && (
        <div className="py-6 bg-secondary/20 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <p className="text-sm text-muted-foreground flex-1">
                Also consider <strong className="text-foreground">Hankotrade</strong> — our top-rated offshore pick with zero spreads and 5.0/5 Trustpilot rating.
              </p>
              <Button variant="outline" size="sm" className="flex-shrink-0" asChild>
                <a
                  href={getAffiliateUrl("hankotrade", UTM_CONFIGS.COMPARISON_TABLE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hankotrade", "review_crosssell_soft", "open_account")}
                >
                  View Hankotrade
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

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
        usAccepted={usAccepted}
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
