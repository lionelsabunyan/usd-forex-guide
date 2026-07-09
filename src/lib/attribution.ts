import { supabase } from './supabase';

/**
 * Paid-search attribution for the offshore-broker funnel.
 *
 * WHY THIS EXISTS: Offshore IB portals (FXGlory, LMFX, Coinexx, Hankotrade…) generally
 * do NOT support subID passthrough or server-to-server postbacks, so we cannot get an
 * automatic keyword→FTD (first-time-deposit) attribution the way regulated CPA networks
 * allow. Instead we make the *structure* carry attribution:
 *   1. Capture the Microsoft ad click id (msclkid) + keyword on the landing URL.
 *   2. Persist it in localStorage — NOT sessionStorage — because a deposit happens days
 *      after the click, often in a new session/tab. (The previous implementation wrote to
 *      sessionStorage inside a dead `if (uetId)` branch, so it never ran in production.)
 *   3. Append it as a subid to affiliate outbound URLs (harmless for brokers that ignore it).
 *   4. Log the click to Supabase so FTDs from the IB dashboard can be reconciled by
 *      {broker, date, msclkid} and later uploaded to Bing as offline conversions.
 */

const STORAGE_KEY = 'bfx_attribution';

export interface Attribution {
  msclkid?: string;
  gclid?: string;
  keyword?: string;
  source?: string;
  ts?: number;
}

/**
 * Read the stored first-touch attribution. Safe on SSR / prerender.
 */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/**
 * Capture ad-click ids from the current URL and persist them. Call once on app init,
 * unconditionally (do NOT gate on the UET tag id — the tag now loads from index.html).
 * Only (re)writes when a fresh msclkid/gclid is present, so the first-touch id is
 * preserved across SPA navigation and later organic pageviews.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const msclkid = params.get('msclkid') || undefined;
    const gclid = params.get('gclid') || undefined;
    const keyword =
      params.get('keyword') || params.get('utm_term') || params.get('kw') || undefined;

    if (!msclkid && !gclid) return;

    const existing = getAttribution();
    const data: Attribution = {
      msclkid: msclkid || existing.msclkid,
      gclid: gclid || existing.gclid,
      keyword: keyword || existing.keyword,
      source: msclkid ? 'bing' : gclid ? 'google' : existing.source,
      ts: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Normalize campaign source for GA4 when arriving from a Bing ad without UTMs
    if (msclkid && (window as any).gtag) {
      (window as any).gtag('set', { campaign: { source: 'bing', medium: 'cpc' } });
    }
  } catch {
    /* attribution is best-effort — never break the page */
  }
}

/**
 * Fire-and-forget log of an affiliate click to Supabase for FTD reconciliation.
 * Fails silently if Supabase is unconfigured or the `affiliate_clicks` table is absent.
 */
export function logAffiliateClick(brokerId: string, location: string): void {
  if (!supabase) return;
  try {
    const a = getAttribution();
    supabase
      .from('affiliate_clicks')
      .insert({
        broker_id: brokerId,
        click_location: location,
        msclkid: a.msclkid || null,
        gclid: a.gclid || null,
        keyword: a.keyword || null,
        source: a.source || null,
      })
      .then(
        () => {},
        () => {},
      );
  } catch {
    /* ignore */
  }
}
