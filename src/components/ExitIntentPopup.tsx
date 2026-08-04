import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { brokers, US_LP_ORDER, usOffshoreLead, type Broker } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick } from "@/lib/tracking";
import { getVariant, trackExposure, type Experiment } from "@/lib/abtest";
import BrokerLogo from "@/components/BrokerLogo";

/**
 * Exit-intent last chance. One broker, one decision.
 *
 * The offer is never hardcoded: on the paid /us funnel it repeats the page's own lead
 * broker (US_LP_ORDER[0]), everywhere else the best organic US-accepted offshore broker.
 * A popup that pushes a different broker than the page just splits the click.
 *
 * Copy leads with the FUNDING rail, not the rating — the measured drop-off is
 * "registers, never funds", so the objection to kill is "will my card work?".
 */

// ── A/B Test: Exit Intent CTA copy ─────────────────────────────────────────

export const EXP_EXIT_CTA: Experiment<"control" | "funding" | "urgency"> = {
  id: "exit_cta_v2",
  variants: ["control", "funding", "urgency"] as const,
};

const CTA_VARIANTS = {
  control: {
    eyebrow: "Before you go",
    heading: (b: Broker) => `Still comparing? Start with ${b.name}`,
    subheading: (b: Broker) =>
      `Accepts US traders, ${b.minDepositDisplay} minimum, account opens in minutes.`,
    dismissText: "No thanks, I'll keep reading",
  },
  funding: {
    eyebrow: "One thing most sites won't tell you",
    heading: (b: Broker) => {
      const rail = cardRail(b);
      return rail
        ? `${b.name} accepts ${rail}`
        : `${b.name} funds from ${b.minDepositDisplay}`;
    },
    subheading: (b: Broker) =>
      `Most US traders stall at the deposit step, not the signup. ${b.name} takes ${b.paymentMethods.slice(0, 2).join(" and ")}.`,
    dismissText: "Maybe later",
  },
  urgency: {
    eyebrow: "Before you go",
    heading: (b: Broker) => `${b.name} is our top pick for US traders`,
    subheading: (b: Broker) =>
      `${b.leverage} leverage, ${b.minDepositDisplay} minimum. Takes about 3 minutes to open.`,
    dismissText: "I'll come back later",
  },
} as const;

/**
 * The rail that actually reassures a US trader, in order of reassurance.
 * Wire transfer deliberately does NOT count — slow, and US banks block offshore wires,
 * so leading with it advertises the exact friction we are trying to defeat.
 */
function cardRail(b: Broker): string | undefined {
  for (const re of [/credit card|debit|card/i, /paypal/i, /e-?wallet/i]) {
    const hit = b.paymentMethods.find((m) => re.test(m));
    // brand names keep their casing, generic rails read better lowercase
    if (hit) return `${/paypal/i.test(hit) ? "PayPal" : hit.toLowerCase()} deposits`;
  }
  return undefined;
}

// ── GA4 helper ──────────────────────────────────────────────────────────────

const GA_MEASUREMENT_ID = "G-P860PCCF1T";

function trackPopupEvent(
  eventName: "popup_shown" | "popup_clicked" | "popup_dismissed",
  extra?: Record<string, string | number>,
) {
  if (typeof window === "undefined") return;
  const payload = { send_to: GA_MEASUREMENT_ID, popup_type: "exit_intent", ...extra };

  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, payload);
  }
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: eventName, ...payload });
  }
  // Clarity custom tag
  if ((window as any).clarity) {
    (window as any).clarity("set", "exit_popup", eventName);
  }
}

// ── Trigger tuning ──────────────────────────────────────────────────────────

const MIN_SITE_TIME_MS = 30_000;
/** Re-offer to returning visitors instead of suppressing the popup forever. */
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "exitIntentShownAt";

function suppressed(): boolean {
  const at = Number(localStorage.getItem(STORAGE_KEY));
  return Boolean(at) && Date.now() - at < COOLDOWN_MS;
}

// ── Component ───────────────────────────────────────────────────────────────

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const pageLoadTime = useRef(Date.now());
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { pathname } = useLocation();

  // Same offer the visitor was already looking at — paid LP leads, organic falls back.
  const isPaidLp = pathname === "/us" || pathname.startsWith("/us/");
  const broker = (isPaidLp && brokers[US_LP_ORDER[0]]) || usOffshoreLead;

  const variantResult = getVariant(EXP_EXIT_CTA);
  const copy = CTA_VARIANTS[variantResult.variant];

  const showPopup = useCallback(() => {
    if (shownRef.current) return;
    // Enforce 30 s minimum on site
    if (Date.now() - pageLoadTime.current < MIN_SITE_TIME_MS) return;

    shownRef.current = true;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(true);
    trackExposure(variantResult);
    trackPopupEvent("popup_shown", {
      variant: variantResult.variant,
      broker_id: broker.id,
    });
  }, [variantResult, broker.id]);

  useEffect(() => {
    if (suppressed()) {
      shownRef.current = true;
      return;
    }

    // ── Desktop: mouse leaves viewport from top ──
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) showPopup();
    };

    // ── Mobile: fast scroll back to the top AFTER real engagement ──
    // The old rule (150 px up near the top) fired while people were still reading.
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    let engaged = false;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const depth = (currentY + window.innerHeight) / document.documentElement.scrollHeight;
      if (depth > 0.35) engaged = true;

      if (currentY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentY;
        if (engaged && scrollUpDistance > 400 && currentY < window.innerHeight) {
          showPopup();
        }
      } else {
        scrollUpDistance = 0;
      }
      lastScrollY = currentY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopup]);

  const handleDismiss = () => {
    setOpen(false);
    trackPopupEvent("popup_dismissed", {
      variant: variantResult.variant,
      broker_id: broker.id,
    });
  };

  const handleBrokerClick = () => {
    trackAffiliateClick(broker.id, "exit_intent_popup", "open_account", undefined);
    trackPopupEvent("popup_clicked", {
      variant: variantResult.variant,
      broker_id: broker.id,
    });
    setOpen(false);
  };

  const facts = [
    { label: "Min deposit", value: broker.minDepositDisplay },
    { label: "Leverage", value: broker.leverage },
    { label: "Spreads from", value: broker.spreads },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
      <DialogContent
        className="max-w-md p-0 gap-0 overflow-hidden"
        // Radix lands focus on the dismiss link, which then renders with a focus ring and
        // reads as the primary button. Put the ring on the offer instead.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          ctaRef.current?.focus();
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-4 space-y-2 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {copy.eyebrow}
          </span>
          <DialogTitle className="text-xl font-bold leading-snug">
            {copy.heading(broker)}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {copy.subheading(broker)}
          </DialogDescription>
        </DialogHeader>

        {/* The single offer */}
        <div className="mx-6 rounded-xl border bg-secondary/40 p-4">
          <div className="flex items-center gap-3">
            <BrokerLogo broker={broker} className="w-12 h-12 flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-bold leading-tight">{broker.name}</div>
              <div className="text-xs text-muted-foreground">
                ⭐ {broker.rating}/5 · {broker.platforms[0]}
              </div>
            </div>
            {broker.bonus && (
              <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                {broker.bonus}
              </span>
            )}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            {facts.map((f) => (
              <div key={f.label} className="rounded-lg bg-background/70 py-2">
                <dt className="text-[11px] text-muted-foreground">{f.label}</dt>
                <dd className="text-sm font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 text-xs text-muted-foreground">
            Funding: {broker.paymentMethods.slice(0, 3).join(" · ")}
          </p>
        </div>

        <div className="p-6 pt-4 space-y-3">
          <Button size="lg" className="w-full text-base" onClick={handleBrokerClick} asChild>
            <a
              ref={ctaRef}
              href={getAffiliateUrl(broker.id, {
                source: "exit_intent",
                medium: "popup",
                campaign: "exit_intent_popup",
                content: variantResult.variant,
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open your {broker.name} account
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" />
            {/* "Unregulated (St. Lucia)" is not a trust signal — use the age of the broker instead. */}
            US clients accepted · {/^unregulated/i.test(broker.regulation)
              ? `Trading since ${broker.foundedYear}`
              : broker.regulation}
          </p>

          <button
            onClick={handleDismiss}
            className="w-full text-sm text-muted-foreground hover:text-foreground underline min-h-[44px]"
          >
            {copy.dismissText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
