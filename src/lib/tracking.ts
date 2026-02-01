import { BrokerId, brokers } from "./brokers";

/**
 * UTM Parameters for affiliate link tracking
 */
export interface UTMParams {
  source: string;      // e.g., "homepage", "review", "comparison"
  medium: string;      // e.g., "cta", "button", "link"
  campaign?: string;   // e.g., "hero_cta", "sticky_mobile"
  content?: string;    // e.g., "primary_button", "secondary_button"
}

/**
 * Generate affiliate URL with UTM parameters
 */
export const getAffiliateUrl = (
  brokerId: BrokerId,
  utm: UTMParams
): string => {
  const broker = brokers[brokerId];
  if (!broker?.affiliateUrl) {
    return broker?.siteUrl || "#";
  }

  const baseUrl = broker.affiliateUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";

  const params = new URLSearchParams({
    utm_source: `bfxguide_${utm.source}`,
    utm_medium: utm.medium,
    ...(utm.campaign && { utm_campaign: utm.campaign }),
    ...(utm.content && { utm_content: utm.content }),
  });

  return `${baseUrl}${separator}${params.toString()}`;
};

/**
 * Track affiliate click event to Google Analytics
 */
export const trackAffiliateClick = (
  brokerId: BrokerId,
  location: string,
  buttonType?: string
): void => {
  // GA4 Event
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "affiliate_click", {
      broker_id: brokerId,
      broker_name: brokers[brokerId]?.name || brokerId,
      click_location: location,
      button_type: buttonType || "default",
      timestamp: new Date().toISOString(),
    });
  }

  // Bing UET Event
  if (typeof window !== "undefined" && (window as any).uetq) {
    (window as any).uetq.push("event", "affiliate_click", {
      event_category: "conversion",
      event_label: `${brokerId}_${location}`,
      event_value: 1,
    });
  }
};

/**
 * Predefined UTM configurations for common placements
 */
export const UTM_CONFIGS = {
  // Homepage placements
  HERO_PRIMARY: { source: "homepage", medium: "cta", campaign: "hero", content: "primary_button" },
  HERO_SECONDARY: { source: "homepage", medium: "cta", campaign: "hero", content: "secondary_button" },
  HEADER_CTA: { source: "header", medium: "cta", campaign: "nav", content: "get_started" },
  FEATURED_BROKER: { source: "homepage", medium: "cta", campaign: "featured", content: "open_account" },

  // Comparison table
  COMPARISON_TABLE: { source: "comparison", medium: "table", campaign: "broker_list" },

  // Review pages
  REVIEW_HERO: { source: "review", medium: "cta", campaign: "review_hero", content: "open_account" },
  REVIEW_BOTTOM: { source: "review", medium: "cta", campaign: "review_bottom", content: "open_account" },
  REVIEW_ACCOUNT_TYPE: { source: "review", medium: "cta", campaign: "account_types" },

  // Mobile
  MOBILE_STICKY: { source: "mobile", medium: "sticky", campaign: "mobile_cta" },

  // Blog
  BLOG_INLINE: { source: "blog", medium: "inline", campaign: "blog_cta" },
  BLOG_SIDEBAR: { source: "blog", medium: "sidebar", campaign: "blog_sidebar" },

  // Exit Intent
  EXIT_INTENT: { source: "exit_intent", medium: "popup", campaign: "exit_popup", content: "special_offer" },

  // Newsletter
  NEWSLETTER_WELCOME: { source: "newsletter", medium: "email", campaign: "welcome_series" },
} as const;
