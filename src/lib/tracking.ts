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
 * IB (Introducing Broker) partnerships - these are our main revenue sources
 * Track these separately for better conversion analysis
 */
export const IB_BROKERS: BrokerId[] = ["fxglory", "hankotrade", "midasfx", "n1cm"];

/**
 * Check if a broker is an IB partner
 */
export const isIBBroker = (brokerId: BrokerId): boolean => {
  return IB_BROKERS.includes(brokerId);
};

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
 * Sends different events for IB vs non-IB brokers for better segmentation
 */
export const trackAffiliateClick = (
  brokerId: BrokerId,
  location: string,
  buttonType?: string
): void => {
  const isIB = isIBBroker(brokerId);
  const brokerName = brokers[brokerId]?.name || brokerId;

  // GA4 Events
  if (typeof window !== "undefined" && (window as any).gtag) {
    // 1. General affiliate click event (for all clicks)
    (window as any).gtag("event", "affiliate_click", {
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || "default",
      is_ib_partner: isIB,
    });

    // 2. Specific event for IB partners (mark as conversion in GA4)
    if (isIB) {
      (window as any).gtag("event", "ib_partner_click", {
        broker_id: brokerId,
        broker_name: brokerName,
        click_location: location,
        button_type: buttonType || "default",
        value: 1, // For conversion value tracking
        currency: "USD",
      });
    }

    // 3. Open Account specific event (for conversion tracking)
    if (buttonType === "open_account" || location.includes("review")) {
      (window as any).gtag("event", "open_account_click", {
        broker_id: brokerId,
        broker_name: brokerName,
        click_location: location,
        is_ib_partner: isIB,
        value: isIB ? 10 : 1, // Higher value for IB partners
        currency: "USD",
      });
    }
  }

  // Bing UET Event
  if (typeof window !== "undefined" && (window as any).uetq) {
    (window as any).uetq.push("event", "affiliate_click", {
      event_category: isIB ? "ib_conversion" : "affiliate_click",
      event_label: `${brokerId}_${location}`,
      event_value: isIB ? 10 : 1,
    });

    // Separate conversion event for IB partners
    if (isIB) {
      (window as any).uetq.push("event", "ib_partner_conversion", {
        event_category: "conversion",
        event_label: `${brokerId}_open_account`,
        revenue_value: 10,
        currency: "USD",
      });
    }
  }

  // DataLayer push for GTM (if you want more control)
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: isIB ? "ib_partner_click" : "affiliate_click",
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || "default",
      is_ib_partner: isIB,
      conversion_value: isIB ? 10 : 1,
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
