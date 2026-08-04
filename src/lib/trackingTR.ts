import { BrokerId, brokers } from "./brokers";
import { trBrokerInfo } from "./brokersTR";
import { logAffiliateClick } from "./attribution";

/** GA4 Measurement ID — used in send_to to prevent GTM from re-firing events */
const GA_MEASUREMENT_ID = "G-P860PCCF1T";

/**
 * TR Site için Conversion Tracking
 * Yandex Metrika + Google Analytics 4 + Yandex Direct
 */

export interface TRConversionEvent {
  brokerId: BrokerId;
  brokerName: string;
  eventType: 'page_view' | 'hesap_ac_click' | 'bonus_interest' | 'broker_compare' | 'scroll_depth';
  location: string;
  buttonType?: string;
  value?: number;
}

/**
 * Yandex Metrika Goal ID'leri
 * Dashboard'dan goal oluşturduktan sonra buraya ekle
 */
export const YANDEX_GOALS = {
  // Conversion Goals
  HESAP_AC_CLICK: 'hesap_ac_click',           // Broker'a tıklama (ana conversion)
  BROKER_PAGE_VIEW: 'broker_page_view',       // Broker review sayfası görüntüleme
  BONUS_BUTTON_CLICK: 'bonus_click',          // Bonus CTA tıklama

  // Micro-conversions
  SCROLL_50: 'scroll_50',                     // %50 scroll
  SCROLL_75: 'scroll_75',                     // %75 scroll
  COMPARISON_VIEW: 'comparison_view',         // Karşılaştırma tablosu görüntüleme
  CONTACT_VIEW: 'contact_view',               // İletişim sayfası

  // Engagement Goals
  TIME_30SEC: 'time_30sec',                   // 30 saniye site'de kalma
  TIME_60SEC: 'time_60sec',                   // 1 dakika site'de kalma
  MULTIPLE_PAGES: 'multiple_pages',           // 2+ sayfa görüntüleme
} as const;

/**
 * TR Broker Click Tracking - Yandex Metrika + GA4
 */
export const trackTRBrokerClick = (
  brokerId: BrokerId,
  location: string,
  buttonType?: string
): void => {
  const broker = brokers[brokerId];
  const trInfo = trBrokerInfo[brokerId];

  if (!broker) return;

  const brokerName = broker.name;
  const hasBonus = trInfo?.hasBonus || false;
  const bonusValue = hasBonus ? trInfo?.welcomeBonus || '' : '';

  // Supabase affiliate_clicks → Telegram bildirimi (US tarafıyla aynı yol)
  logAffiliateClick(brokerId, location);

  // 1. YANDEX METRIKA - Primary Conversion Goal
  if (typeof window !== "undefined" && (window as any).ym) {
    // Main conversion: Hesap Aç Click
    (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.HESAP_AC_CLICK, {
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || 'default',
      has_bonus: hasBonus,
      bonus_amount: bonusValue,
      order_price: hasBonus ? 15 : 10, // Bonus'lu broker'lar daha yüksek değer
      currency: 'USD',
    });

    // Bonus button varsa bonus_click goal
    if (buttonType === 'bonus' || location.includes('bonus')) {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.BONUS_BUTTON_CLICK, {
        broker_id: brokerId,
        bonus_amount: bonusValue,
      });
    }
  }

  // 2. GOOGLE ANALYTICS 4 - Multiple Events (same as US site)
  if (typeof window !== "undefined" && (window as any).gtag) {
    // 2a. Standard affiliate_click event (for consistency with US site)
    (window as any).gtag("event", "affiliate_click", {
      send_to: GA_MEASUREMENT_ID,
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || "default",
      has_bonus: hasBonus,
      language: "tr",
      value: hasBonus ? 15 : 10,
      currency: "USD",
    });

    // 2b. TR-specific broker click event
    (window as any).gtag("event", "tr_broker_click", {
      send_to: GA_MEASUREMENT_ID,
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || "default",
      has_bonus: hasBonus,
      language: "tr",
      value: hasBonus ? 15 : 10,
      currency: "USD",
    });

    // 2c. Open Account specific event (for conversion tracking)
    if (buttonType === "hesap_ac" || location.includes("review")) {
      (window as any).gtag("event", "open_account_click", {
        send_to: GA_MEASUREMENT_ID,
        broker_id: brokerId,
        broker_name: brokerName,
        click_location: location,
        has_bonus: hasBonus,
        value: hasBonus ? 15 : 10,
        currency: "USD",
        language: "tr",
      });
    }

    // 2d. GA4 Conversion Event (mark as Key Event in GA4)
    (window as any).gtag("event", "conversion", {
      send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Yandex Direct'ten sonra ekle
      value: hasBonus ? 15 : 10,
      currency: "USD",
      transaction_id: `${brokerId}_${Date.now()}`,
    });
  }

  // 3. DATA LAYER (GTM için) - Multiple Events (same as US site)
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    // 3a. Standard affiliate_click event
    (window as any).dataLayer.push({
      event: "affiliate_click",
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || "default",
      has_bonus: hasBonus,
      conversion_value: hasBonus ? 15 : 10,
      language: "tr",
    });

    // 3b. TR-specific conversion event
    (window as any).dataLayer.push({
      event: "tr_conversion",
      broker_id: brokerId,
      broker_name: brokerName,
      click_location: location,
      button_type: buttonType || "default",
      has_bonus: hasBonus,
      conversion_value: hasBonus ? 15 : 10,
      language: "tr",
    });
  }

  if (import.meta.env.DEV) {
    console.log(`🎯 TR Conversion Tracked: ${brokerName} from ${location}`);
  }
};

/**
 * TR Page View Tracking - Broker Review Sayfası
 */
export const trackTRPageView = (
  brokerId: BrokerId,
  pageType: 'home' | 'review' | 'comparison' | 'contact' | 'about'
): void => {
  const broker = brokers[brokerId];

  // Yandex Metrika Page View Goal
  if (typeof window !== "undefined" && (window as any).ym) {
    if (pageType === 'review') {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.BROKER_PAGE_VIEW, {
        broker_id: brokerId,
        broker_name: broker?.name,
      });
    }

    if (pageType === 'comparison') {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.COMPARISON_VIEW);
    }

    if (pageType === 'contact') {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.CONTACT_VIEW);
    }
  }

  // GA4 Page View Event
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_type: pageType,
      broker_id: brokerId || 'none',
      language: "tr",
    });
  }
};

/**
 * Scroll Depth Tracking - Engagement Goal
 */
export const trackTRScrollDepth = (depth: 25 | 50 | 75 | 100): void => {
  if (typeof window !== "undefined" && (window as any).ym) {
    if (depth === 50) {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.SCROLL_50);
    } else if (depth === 75) {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.SCROLL_75);
    }
  }

  // GA4 Scroll Event
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "scroll", {
      send_to: GA_MEASUREMENT_ID,
      percent_scrolled: depth,
      language: "tr",
    });
  }
};

/**
 * Time on Site Tracking - Engagement Goal
 */
export const trackTRTimeOnSite = (seconds: 30 | 60): void => {
  if (typeof window !== "undefined" && (window as any).ym) {
    if (seconds === 30) {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.TIME_30SEC);
    } else if (seconds === 60) {
      (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.TIME_60SEC);
    }
  }
};

/**
 * Multiple Page Views - Engagement Goal
 */
export const trackTRMultiplePages = (): void => {
  if (typeof window !== "undefined" && (window as any).ym) {
    (window as any).ym(106629069, 'reachGoal', YANDEX_GOALS.MULTIPLE_PAGES);
  }
};

/**
 * TR Homepage View Tracking - brokerId gerektirmeyen ana sayfa versiyonu
 */
export const trackTRHomeView = (): void => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_type: "home",
      language: "tr",
    });
  }
};
