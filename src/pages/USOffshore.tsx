import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ExternalLink, Shield, Zap, AlertTriangle, Award, Bitcoin,
  Wallet, ArrowRight, ChevronDown, Clock, DollarSign, Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";
import BrokerLogo from "@/components/BrokerLogo";
import { brokers, BrokerId, Broker } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { subscribeNewsletter } from "@/lib/newsletterService";

/**
 * Dedicated PAID landing page for Bing Ads "forex broker usa" (offshore intent).
 *
 * Design goals (see plan): stripped navigation (no escape hatches / 22-broker menu),
 * noindex (kept separate from the indexable /brokers/usa SEO page), and one job —
 * convert an offshore-seeking US searcher all the way to a FUNDED account. Leads with
 * FXGlory + LMFX (the brokers proven to fund for this audience) and pre-sells the crypto
 * funding step BEFORE registration to defeat the US-card-decline / FTD-drop problem.
 *
 * Route variants: /us (all three) and /us/:broker (ad-group-specific, e.g. /us/fxglory).
 */

const CURRENT_YEAR = 2026;
const DEFAULT_ORDER: BrokerId[] = ["fxglory", "lmfx", "coinexx"];

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
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">{broker.rating.toFixed(1)}</span>
            <span className="text-[10px] text-muted-foreground">out of 5</span>
          </div>
        </div>

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

        {/* Top pros */}
        <ul className="space-y-1.5 flex-1">
          {broker.pros.slice(0, 3).map((pro, i) => (
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
      </div>
    </div>
  );
};

const FUNDING_STEPS = [
  {
    icon: Wallet,
    title: "1. Buy USDT (crypto dollars)",
    body: "Open a free account on Coinbase, Kraken, or Cash App and buy USDT (or Bitcoin). $1 of USDT = $1. This takes about 5 minutes with a debit card or bank transfer.",
  },
  {
    icon: Bitcoin,
    title: "2. Send it to your broker",
    body: "In your broker's deposit page, copy the USDT (TRC-20) wallet address and send from your exchange. It arrives in ~2 minutes with near-zero network fees — no bank rejection, no card decline.",
  },
  {
    icon: Zap,
    title: "3. Bonus credited — start trading",
    body: "Your deposit (plus any deposit bonus) lands in your trading account. Open MT4/MT5 and you're live. Withdrawals go back the same way, usually within 24 hours.",
  },
];

const FAQS = [
  {
    q: "Is it legal for a US citizen to trade with an offshore broker?",
    a: "Yes — it is legal for US residents to open and trade with a broker licensed outside the US. What differs is regulation: these brokers are not registered with the CFTC/NFA, so you do not get US regulatory protections. That trade-off is exactly why they can offer 1:500–1:3000 leverage and deposit bonuses that US-regulated brokers cannot. Trade only money you can afford to lose.",
  },
  {
    q: "Can I fund with my US debit/credit card?",
    a: "Often no — US banks frequently decline card and ACH payments to offshore forex brokers. The reliable route is crypto (USDT/Bitcoin), which takes about 10 minutes and never gets declined. We walk you through it in the 3-step guide above.",
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
    a: "FXGlory is the most popular first choice for US traders (from $1, up to 1:3000, multiple funding methods including card). LMFX is favored for its 100% deposit bonus. Coinexx is a pure-crypto ECN option with tight spreads. Compare all three above and pick the funding method that fits you.",
  },
];

const USOffshore = ({ focusBroker }: { focusBroker?: BrokerId }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  // Order brokers; if this is an ad-group variant, lead with the matched broker.
  const order = focusBroker
    ? [focusBroker, ...DEFAULT_ORDER.filter((b) => b !== focusBroker)]
    : DEFAULT_ORDER;
  const list = order.map((id) => brokers[id]).filter(Boolean) as Broker[];
  const lead = list[0];

  const leadCta = getAffiliateUrl(lead.id, { ...UTM_CONFIGS.US_LP, content: `hero_${lead.id}` });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg("");
    const res = await subscribeNewsletter(email, "us_lp");
    setEmailMsg(res.message);
    if (res.success && !res.alreadySubscribed) setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Offshore Forex Brokers Accepting US Traders (2026) | High Leverage + Bonus"
        description="US residents can still trade forex with high-leverage offshore brokers. Compare FXGlory, LMFX & Coinexx — 1:500 to 1:3000 leverage, deposit bonuses, and a step-by-step crypto funding guide."
        canonical="/us"
        noindex
      />

      {/* Minimal branded bar — no full nav (paid LP) */}
      <header className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">
            Beginner<span className="text-primary">FX</span>Guide
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
              1:500 to 1:3000 leverage and deposit bonuses that US-regulated brokers can't offer.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
              Yes, US residents can legally trade offshore. Funding takes about 10 minutes with crypto —
              we show you exactly how, step by step.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href={leadCta}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackAffiliateClick(lead.id, "us_lp_hero", "open_account", "US")}
              >
                Start with {lead.name} {lead.bonus ? `— ${lead.bonus} Bonus` : ""}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Min deposit from $1</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Crypto funding (no card declines)</span>
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
              Ranked by how reliably US traders fund and withdraw. All three accept US clients and support crypto deposits.
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
                US bank cards are often declined by offshore brokers. Crypto (USDT) solves this completely and takes about 10 minutes.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {FUNDING_STEPS.map((step) => (
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
                  onClick={() => trackAffiliateClick(lead.id, "us_lp_funding", "open_account", "US")}
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

        {/* Email capture → FTD nurture */}
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
              <Button type="submit" variant="hero">Send me the guide</Button>
            </form>
            {emailMsg && <p className="text-sm text-muted-foreground mt-3">{emailMsg}</p>}
          </div>
        </section>

        {/* FAQ — funding objections */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">US Offshore Trading — FAQ</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 hover:bg-muted/50 transition-colors flex items-start justify-between gap-4"
                  >
                    <h3 className="font-semibold pr-4">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-5 pb-5"><p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p></div>}
                </Card>
              ))}
            </div>
          </div>
        </section>

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
                onClick={() => trackAffiliateClick(lead.id, "us_lp_final", "open_account", "US")}
              >
                Open Account with {lead.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Minimal footer — required for ad policy (privacy, contact, disclosure, risk) */}
      <footer className="border-t border-border py-8">
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border">
        <Button variant="hero" size="lg" className="w-full" asChild>
          <a
            href={getAffiliateUrl(lead.id, { ...UTM_CONFIGS.US_LP_STICKY, content: lead.id })}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick(lead.id, "us_lp_sticky", "open_account", "US")}
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
        "US-regulated brokers are capped at 1:50 leverage — offshore brokers offer 1:500 to 1:3000.",
        "Deposit bonuses (50%–100%) that are banned for CFTC/NFA brokers.",
        "Low minimums ($1–$50) and instant crypto funding & withdrawals.",
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
