/**
 * Lightweight client-side A/B testing utility.
 *
 * - Variant assignment is persisted in a cookie so a user always sees the same variant.
 * - Exposure events are fired once per experiment per page-load via GA4 + dataLayer.
 * - Designed for CTA experiments on broker review pages.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export interface Experiment<V extends string = string> {
  /** Unique experiment identifier, e.g. "cta_color_v1" */
  id: string;
  /** Ordered list of variant keys. First entry is the control. */
  variants: readonly V[];
}

export interface VariantResult<V extends string = string> {
  experimentId: string;
  variant: V;
}

// ── Cookie helpers ───────────────────────────────────────────────────────────

const COOKIE_PREFIX = "ab_";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match?.split("=")[1];
}

function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

// ── Variant assignment ───────────────────────────────────────────────────────

/**
 * Deterministically assign a variant for the given experiment.
 * If the user already has a cookie, honour it; otherwise pick at random
 * (uniform distribution across variants) and persist.
 */
export function getVariant<V extends string>(experiment: Experiment<V>): VariantResult<V> {
  const cookieKey = `${COOKIE_PREFIX}${experiment.id}`;
  const existing = getCookie(cookieKey) as V | undefined;

  if (existing && (experiment.variants as readonly string[]).includes(existing)) {
    return { experimentId: experiment.id, variant: existing };
  }

  // Uniform random assignment
  const idx = Math.floor(Math.random() * experiment.variants.length);
  const variant = experiment.variants[idx];
  setCookie(cookieKey, variant);

  return { experimentId: experiment.id, variant };
}

// ── Exposure tracking (fire-and-forget, once per pageload) ───────────────────

const tracked = new Set<string>();

/**
 * Fire a GA4 `experiment_exposure` event so we can segment conversions by variant.
 * Also pushes to the GTM dataLayer for any GTM-based reporting.
 * De-duped per experiment per pageload.
 */
export function trackExposure(result: VariantResult): void {
  if (typeof window === "undefined") return;
  const key = `${result.experimentId}:${result.variant}`;
  if (tracked.has(key)) return;
  tracked.add(key);

  const payload = {
    experiment_id: result.experimentId,
    variant: result.variant,
  };

  // GA4
  if ((window as any).gtag) {
    (window as any).gtag("event", "experiment_exposure", payload);
  }

  // GTM dataLayer
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: "experiment_exposure", ...payload });
  }

  // Microsoft Clarity custom tag (for session-level segmentation)
  if ((window as any).clarity) {
    (window as any).clarity("set", result.experimentId, result.variant);
  }
}

// ── Pre-defined experiments ──────────────────────────────────────────────────

/**
 * Experiment 1 — CTA button color on review pages.
 * control = current hero gold, green = success-colored, blue = blue-themed
 */
export const EXP_CTA_COLOR = {
  id: "cta_color_v1",
  variants: ["control", "green", "blue"] as const,
} satisfies Experiment;

/**
 * Experiment 2 — CTA copy text on review pages.
 * control = "Open {broker} Account", urgency = "Start Trading Now – 2 Min Setup",
 * benefit = "Get {broker}'s Best Spreads Today"
 */
export const EXP_CTA_COPY = {
  id: "cta_copy_v1",
  variants: ["control", "urgency", "benefit"] as const,
} satisfies Experiment;
