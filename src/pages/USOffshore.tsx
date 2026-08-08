import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ExternalLink, Shield, Zap, AlertTriangle, Award, Bitcoin,
  Wallet, ArrowRight, Clock, DollarSign, Gift, CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";
import FAQSection from "@/components/FAQSection";
import BrokerLogo from "@/components/BrokerLogo";
import Logo from "@/components/Logo";
import { brokers, BrokerId, Broker, US_LP_ORDER } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { subscribeNewsletter } from "@/lib/newsletterService";

/**
 * Dedicated PAID landing page for Bing Ads "forex broker usa" (offshore intent).
 *
 * Design goals (see plan): stripped navigation (no escape hatches / 22-broker menu),
 * noindex (kept separate from the indexable /brokers/usa SEO page), and one job —
 * convert an offshore-seeking US searcher all the way to a FUNDED account. Leads with
 * UnitedPips (the only one of the three that actually produced signups) and pre-sells the
 * funding step BEFORE registration to defeat the US-card-decline / FTD-drop problem.
 *
 * Route variants: /us (all three) and /us/:broker (ad-group-specific, e.g. /us/fxglory).
 */

const CURRENT_YEAR = 2026;
// Order + rationale live in brokers.ts so the exit-intent popup offers the same broker.
const DEFAULT_ORDER = US_LP_ORDER;

const fundBadge = (method: string) => {
  const m = method.toLowerCase();
  const isCrypto = m.includes("crypto") || m.includes("bitcoin") || m.includes("usdt") || m.includes("ethereum");
  return (
    <span
      key={method}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
        isCrypto ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
      }`}
    >
      {isCrypto && <Bitcoin className="w-3 h-3" />}
      {method}
    </span>
  );
};

/** True of every broker on this page (US acceptance), or already shown elsewhere on the card
 *  (the star rating) — either way it tells the reader nothing about THIS broker. */
const differentiating = (pro: string) =>
  !/accepts?\s+us\s+clients|us\s+clients\s+accepted/i.test(pro) && !/trustpilot\s+rating/i.test(pro);

/** The card ranked #1 is the one US traders most reliably get FUNDED with, which is not the
 *  highest-rated one — UnitedPips scores 3.9 against FXGlory's 4.9. Printing the score as the
 *  biggest thing on the card made the top pick read as the worst pick. The score stays (hiding
 *  it would make the "not by the score" line above the grid a lie); this says, in a dimension
 *  that is not a number, why each broker earns its slot. */
const BEST_FOR: Partial<Record<BrokerId, string>> = {
  unitedpips: "Best for card & PayPal funding",
  fxglory: "Best for MT4/MT5 + max leverage",
  coinexx: "Best for 0.0 spreads",
};

/** Whether the lead broker takes a US card directly. Decides card-first vs crypto-first copy
 *  in the hero, the funding intro and the funding steps — all three used to disagree. */
const takesUsCard = (b: Broker) => b.paymentMethods.some((m) => /credit card|paypal/i.test(m));

const OfferCard = ({ broker, rank }: { broker: Broker; rank: number }) => {
  const bonusLabel = broker.bonus;
  const cta = getAffiliateUrl(broker.id, { ...UTM_CONFIGS.US_LP, content: broker.id });
  return (
    <div
      className={`bg-card border rounded-2xl overflow-hidden flex flex-col ${
        rank === 1 ? "border-primary ring-2 ring-primary/30" : "border-border"
      }`}
    >
      {rank === 1 && (
        <div className="bg-primary text-primary-foreground text-center text-xs font-semibold py-1.5 uppercase tracking-wide">
          Most Funded by US Traders
        </div>
      )}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrokerLogo broker={broker} className="w-12 h-12 rounded-xl" />
            <div>
              <h3 className="font-bold text-lg leading-tight">{broker.name}</h3>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Est. {broker.foundedYear} · {CURRENT_YEAR - broker.foundedYear} yrs
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-base font-semibold text-primary">{broker.rating.toFixed(1)}</span>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">Editorial score</span>
          </div>
        </div>

        {BEST_FOR[broker.id] && (
          <p className="text-sm font-semibold text-primary -mt-1">{BEST_FOR[broker.id]}</p>
        )}

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted/40 rounded-lg py-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><Zap className="w-3 h-3" /> Leverage</div>
            <div className="font-bold text-sm">{broker.leverage}</div>
          </div>
          <div className="bg-muted/40 rounded-lg py-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><DollarSign className="w-3 h-3" /> Min</div>
            <div className="font-bold text-sm">{broker.minDepositDisplay}</div>
          </div>
          <div className="bg-muted/40 rounded-lg py-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><Gift className="w-3 h-3" /> Bonus</div>
            <div className="font-bold text-sm text-primary">{bonusLabel || "—"}</div>
          </div>
        </div>

        {/* Funding methods — crypto highlighted (defeats US card declines) */}
        <div>
          <div className="text-xs text-muted-foreground mb-1.5">Funding methods for US traders:</div>
          <div className="flex flex-wrap gap-1.5">{broker.paymentMethods.map(fundBadge)}</div>
        </div>

        {/* Top pros — only the ones that separate this broker from the other two.
            "Accepts US clients" is the premise of the whole page (it is in the H1), and the
            rating is already printed above, so listing either as a selling point burns one of
            three slots and makes the cards read as if they were describing the same broker. */}
        <ul className="space-y-1.5 flex-1">
          {broker.pros.filter(differentiating).slice(0, 3).map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{pro}</span>
            </li>
          ))}
        </ul>

        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a
            href={cta}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick(broker.id, `us_lp_${broker.id}`, "open_account", "US")}
          >
            {bonusLabel ? "Open Account + Claim Bonus" : "Open Account"}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </Button>
        <p className="text-[11px] text-center text-muted-foreground -mt-1">
          Offshore broker · Not CFTC/NFA-regulated
        </p>
        {/* Deliberately quiet, and deliberately measured. Every exit from a paid LP is a click
            we bought and did not convert, and our reviews are honest enough to talk visitors
            out of a broker. Keeping it as small text under the fine print rather than a second
            button; us_lp_review_click vs the CTA tells us in a few weeks whether it pays. */}
        <Link
          to={broker.reviewUrl}
          className="text-[11px] text-center text-muted-foreground/70 hover:text-primary underline underline-offset-2 -mt-2"
          onClick={() => {
            (window as any).gtag?.("event", "us_lp_review_click", { broker: broker.id });
            (window as any).uetq?.push("event", "us_lp_review_click", { event_category: "lp_exit" });
          }}
        >
          Read our full {broker.name} review
        </Link>
      </div>
    </div>
  );
};

/** Steps have to follow whoever leads the page. The campaign is called "US Offshore
 *  MetaTrader" and every keyword in it is an MT4/MT5 query, but UnitedPips runs UniTrader —
 *  so a hardcoded "Open MT4/MT5 and you're live" promised the visitor the exact thing the
 *  hero broker does not have. Bing scored that landing-page experience 1-2 out of 3, which we
 *  pay for in CPC, and the visitor pays for at the deposit step. Same for crypto-first steps
 *  in front of a broker whose whole selling point is that a US card works. */
const fundingSteps = (lead: Broker) => {
  // Three funding personalities, keyed off paymentMethods strings:
  // direct card/PayPal (UnitedPips) > card-via-on-ramp (Instacoins/PayRedeem charge the
  // card, deposit lands as crypto) > crypto-only (FXGlory, Coinexx).
  const takesDirectCard = takesUsCard(lead);
  const cardViaOnRamp = !takesDirectCard && lead.paymentMethods.some((m) => /instacoins|payredeem/i.test(m));
  const platform = lead.platforms.join(" / ");
  return [
    takesDirectCard
      ? {
          icon: CreditCard,
          title: `1. Try your card or PayPal first`,
          body: `${lead.name} accepts US cards, PayPal and e-wallets, so most traders fund in one step and never touch crypto. Minimum is ${lead.minDepositDisplay}. If your bank declines it — some do, for any offshore broker — move to step 2.`,
        }
      : cardViaOnRamp
      ? {
          icon: CreditCard,
          title: "1. Pay with your debit card",
          body: `${lead.name}'s Instacoins and PayRedeem options charge your card and the deposit lands straight in your trading account — no exchange account needed. Use a DEBIT card: credit cards treat this as a cash advance (extra fees + instant interest). If it fails, move to step 2.`,
        }
      : {
          icon: Wallet,
          title: "1. Buy USDT (crypto dollars)",
          body: "Open a free account on Coinbase, Kraken, or Cash App and buy USDT (or Bitcoin). $1 of USDT = $1. This takes about 5 minutes with a debit card or bank transfer.",
        },
    {
      icon: Bitcoin,
      title: takesDirectCard || cardViaOnRamp ? "2. Card declined? Use USDT instead" : "2. Send it to your broker",
      body: "In your broker's deposit page, copy the USDT (TRC-20) wallet address and send from your exchange. It arrives in ~2 minutes with near-zero network fees — no bank rejection, no card decline.",
    },
    {
      icon: Zap,
      title: "3. Bonus credited — start trading",
      body: `Your deposit (plus any deposit bonus) lands in your trading account. ${lead.name} runs on ${platform}, so you can be trading straight away. Withdrawals go back the same way, usually within 24 hours.`,
    },
  ];
};

const FAQS = [
  {
    q: "Is it legal for a US citizen to trade with an offshore broker?",
    a: "Yes — it is legal for US residents to open and trade with a broker licensed outside the US. What differs is regulation: these brokers are not registered with the CFTC/NFA, so you do not get US regulatory protections. That trade-off is exactly why they can offer 1:500–1:3000 leverage and deposit bonuses that US-regulated brokers cannot. Trade only money you can afford to lose.",
  },
  {
    q: "Can I fund with my US debit/credit card?",
    a: "With UnitedPips, usually yes — it takes cards, PayPal and e-wallets, which is why we list it first. With FXGlory and Coinexx the answer is usually no: US banks decline direct card payments to offshore brokers, so plan on crypto there. The route that never gets declined anywhere is crypto (USDT/Bitcoin) — about 10 minutes, and we walk you through it in the 3-step guide above.",
  },
  {
    q: "I don't own any crypto — what do I do?",
    a: "No problem. Create a free Coinbase, Kraken, or Cash App account, buy USDT with your card or bank, then send it to your broker. You never need to understand crypto trading — USDT simply moves your dollars across the border without a bank blocking it.",
  },
  {
    q: "How fast are withdrawals?",
    a: "For the crypto-funded brokers here, withdrawals are typically processed within 24 hours and sent back to your crypto wallet, which you can then cash out to your bank via the same exchange. Always test with a small withdrawal first.",
  },
  {
    q: "Which broker should I start with?",
    a: "UnitedPips is the one US traders most often get funded with — it accepts cards, PayPal and e-wallets as well as crypto, so you are not forced through an exchange, and it pays a 40% deposit bonus. FXGlory is the MetaTrader pick: MT4 and MT5, leverage up to 1:3000, a $1 minimum and 24/7 support, funded by crypto or wire. Coinexx is a pure-crypto ECN option with 0.0 spreads. Pick by the funding method you can actually complete today.",
  },
];

/** Fire a lightweight event when a non-converter takes the /compare escape link.
 *  Not an affiliate click — just a signal to judge, in 2-3 weeks, whether this
 *  secondary link earns its place or should be removed. */
const trackExitToCompare = () => {
  if (typeof window === "undefined") return;
  (window as any).gtag?.("event", "us_lp_exit_compare", { click_location: "us_lp_final" });
  (window as any).uetq?.push("event", "us_lp_exit_compare", { event_category: "lp_exit" });
};

const USOffshore = ({ focusBroker }: { focusBroker?: BrokerId }) => {
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  // Order brokers; if this is an ad-group variant, lead with the matched broker.
  const order = focusBroker
    ? [focusBroker, ...DEFAULT_ORDER.filter((b) => b !== focusBroker)]
    : DEFAULT_ORDER;
  const list = order.map((id) => brokers[id]).filter(Boolean) as Broker[];
  const lead = list[0];

  const leadCta = getAffiliateUrl(lead.id, { ...UTM_CONFIGS.US_LP, content: `hero_${lead.id}` });
  // Every headline number on this page comes from the lead broker, not a constant — the /us,
  // /us/fxglory and /us/coinexx variants otherwise all quoted UnitedPips' figures.
  const leadPlatforms = lead.platforms.slice(0, 2).join(" & ");
  const leadFunding = takesUsCard(lead) ? "card, PayPal or crypto" : "crypto";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg("");
    const res = await subscribeNewsletter(email, "us_lp");
    setEmailMsg(res.message);
    if (res.success && !res.alreadySubscribed) {
      setEmail("");
      // Same lightweight pattern as trackExitToCompare — a signup is not an affiliate click,
      // but it was firing nothing at all, so a non-converting paid visit looked identical to
      // a bounce in both GA4 and Bing.
      (window as any).gtag?.("event", "us_lp_newsletter", { broker: lead.id });
      (window as any).uetq?.push("event", "us_lp_newsletter", { event_category: "lp_lead" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Meta follows the lead broker. The ad group that lands here promises whatever the lead
          broker actually has; a fixed description that named all three brokers and quoted the
          highest leverage of the set described a page that does not exist for any variant. */}
      <SEO
        title={
          focusBroker
            ? `${lead.name} for US Traders (2026) — ${lead.leverage} Leverage, ${lead.minDepositDisplay} Min`
            : "Offshore Forex Brokers Accepting US Traders (2026) | High Leverage + Bonus"
        }
        description={`US residents can still trade forex with high-leverage offshore brokers. ${lead.name} accepts US clients — ${lead.leverage} leverage on ${leadPlatforms}, ${lead.minDepositDisplay} minimum${lead.bonus ? `, ${lead.bonus}` : ""}, ${leadFunding} funding — plus a step-by-step US funding guide.`}
        canonical="/us"
        noindex
      />

      {/* Minimal branded bar — no full nav (paid LP) */}
      <header className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="BeginnerFXGuide home">
            <Logo variant="default" size="md" />
          </Link>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Independent · Updated 2026
          </span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              <Award className="w-4 h-4" /> 🇺🇸 US Traders Accepted · No CFTC Leverage Cap
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              Offshore Forex Brokers That Still Accept US Traders in 2026
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Up to {lead.leverage} leverage on {leadPlatforms}, plus bonuses that US-regulated brokers can't offer.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
              Yes, US residents can legally trade offshore.{" "}
              {takesUsCard(lead)
                ? `${lead.name} takes US cards and PayPal, so funding is usually one step — and if your bank declines it, crypto always goes through.`
                : "Funding takes about 10 minutes with crypto — we show you exactly how, step by step."}
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href={leadCta}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackAffiliateClick(lead.id, `us_lp_hero_${lead.id}`, "open_account", "US")}
              >
                Start with {lead.name} {lead.bonus ? `— ${lead.bonus} Bonus` : ""}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Min deposit from {lead.minDepositDisplay}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> {takesUsCard(lead) ? "Card, PayPal or crypto funding" : "Crypto funding (no card declines)"}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Withdrawals in ~24h</span>
            </div>
          </div>
        </section>

        {/* Broker offer cards */}
        <section className="py-10 md:py-14">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {focusBroker ? `${lead.name} & Top Alternatives for US Traders` : "Top 3 Offshore Brokers for US Traders"}
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ordered by how reliably US traders actually get funded — not by the score. Our overall rating
              also weighs regulation and platform, which is why the easiest one to fund is not the
              highest-rated one. All three accept US clients and support crypto deposits.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {list.map((broker, i) => (
                <OfferCard key={broker.id} broker={broker} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* How to fund from the US — the section that fixes the FTD drop */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Fund Your Account from the US — in 3 Steps</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {takesUsCard(lead)
                  ? `Try your card first — ${lead.name} accepts US cards and PayPal. If your bank declines it (common with offshore brokers), crypto (USDT) always goes through and takes about 10 minutes.`
                  : `US bank cards are usually declined by ${lead.name} and brokers like it. Crypto (USDT) never gets declined and takes about 10 minutes.`}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {fundingSteps(lead).map((step) => (
                <Card key={step.title} className="p-6">
                  <step.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={leadCta}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => trackAffiliateClick(lead.id, `us_lp_funding_${lead.id}`, "open_account", "US")}
                >
                  Open Your {lead.name} Account
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust + honesty block */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why US Traders Choose Offshore Brokers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <TrendingUpBlock />
              </Card>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" /> The Honest Trade-Off
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These brokers are <strong>not regulated by the CFTC or NFA</strong>, so you don't get US
                  investor protections. High leverage magnifies losses as much as gains — a small adverse
                  move can wipe an over-leveraged account. Only trade money you can afford to lose, and start
                  with a small deposit to test funding and withdrawals before committing more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — funding objections. Uses the shared component instead of a local accordion:
            the local one rendered the open answer only, so four of five answers (the ones that
            kill the card-decline and crypto objections) were absent from the prerendered HTML
            that Bing's landing-page bot reads. FAQSection collapses with CSS and emits FAQPage
            JSON-LD, so both problems close at once. */}
        <FAQSection
          faqs={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
          title="US Offshore Trading — FAQ"
        />

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-muted-foreground mb-7 max-w-xl mx-auto">
              Open your account in minutes, fund with crypto, and claim your deposit bonus.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href={leadCta}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackAffiliateClick(lead.id, `us_lp_final_${lead.id}`, "open_account", "US")}
              >
                Open Account with {lead.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            {/* Single low-priority escape for non-converters — placed last on purpose so it
                doesn't cannibalize the primary lead-broker funding conversion (Fable 5 call). */}
            <p className="mt-6">
              <Link
                to="/compare"
                onClick={trackExitToCompare}
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Not ready to open an account? See our full broker comparison →
              </Link>
            </p>
          </div>
        </section>

        {/* Email capture → FTD nurture. Deliberately AFTER the final CTA and in a quieter
            button style: it used variant="hero", identical to all seven affiliate CTAs, and sat
            in front of them — a free PDF competing with the thing we paid ~₺25 a click for. */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Free: US Offshore Funding Guide (PDF)</h2>
            <p className="text-muted-foreground mb-5 text-sm">
              Step-by-step crypto funding walkthrough with screenshots, plus which broker fits your budget.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              />
              <Button type="submit" variant="outline">Send me the guide</Button>
            </form>
            {emailMsg && <p className="text-sm text-muted-foreground mt-3">{emailMsg}</p>}
          </div>
        </section>
      </main>

      {/* Minimal footer — required for ad policy (privacy, contact, disclosure, risk).
          pb-24 on mobile because the fixed sticky CTA below sat on top of the risk warning and
          all four legal links, i.e. the disclosures the ad policy requires were unreachable. */}
      <footer className="border-t border-border py-8 pb-24 md:pb-8">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto">
            <strong>Risk warning:</strong> Trading forex and CFDs on margin carries a high level of risk. Between
            74–89% of retail investor accounts lose money. The brokers listed are offshore and not regulated by the
            CFTC or NFA. BeginnerFXGuide may earn a commission when you open an account through our links, at no cost
            to you. This never influences our rankings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link to="/legal/affiliate-disclosure" className="hover:text-primary">Affiliate Disclosure</Link>
            <Link to="/legal/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/legal/disclaimer" className="hover:text-primary">Risk Disclaimer</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
        <Button variant="hero" size="lg" className="w-full" asChild>
          <a
            href={getAffiliateUrl(lead.id, { ...UTM_CONFIGS.US_LP_STICKY, content: lead.id })}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick(lead.id, `us_lp_sticky_${lead.id}`, "open_account", "US")}
          >
            Open {lead.name} {lead.bonus ? `· ${lead.bonus}` : ""}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

/** Small helper block kept out of the main return for readability. */
const TrendingUpBlock = () => (
  <>
    <h3 className="font-semibold text-lg mb-3">Higher Leverage & Bonuses</h3>
    <ul className="space-y-2.5 text-sm">
      {[
        // Ranges must cover the brokers actually on this page, or the block contradicts the
        // cards a screen above it (FXGlory is 1:3000 and $1, not 1:1000 and $10).
        "US-regulated brokers are capped at 1:50 leverage — the brokers here offer 1:500 to 1:3000.",
        "Deposit bonuses and cashback programs that are banned for CFTC/NFA brokers.",
        "Low minimums ($1–$10) and instant crypto funding & withdrawals.",
        "MT4/MT5 with tight spreads from 0.0 pips.",
      ].map((t, i) => (
        <li key={i} className="flex items-start gap-2">
          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{t}</span>
        </li>
      ))}
    </ul>
  </>
);

export default USOffshore;
