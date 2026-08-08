import { CreditCard, Zap, Wallet, AlertTriangle, Globe, UserPlus, PlayCircle, ShieldAlert } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

/**
 * Sources: our own broker evaluation (BROKER_EVALUATION.md) plus the funding behaviour we
 * observed on the /us campaign. Deliberately blunt about the two things that matter and are
 * easy to hide: the reported large-withdrawal denial, and the leverage being cut on live
 * accounts. UnitedPips converts better than the alternatives BECAUSE card funding works —
 * that is a real advantage worth writing down, but it is not the same thing as being safe.
 */
export const unitedpipsData: BrokerReviewData = {
  brokerId: "unitedpips",
  brokerName: "UnitedPips",
  subtitle: "Offshore Broker with Card & PayPal Funding for US Traders",
  heroDescription:
    'UnitedPips is an unregulated St. Lucia broker that accepts US clients and — unusually for this category — <strong class="text-success">actually processes US credit cards and PayPal</strong> instead of forcing everyone through crypto. That removes the single biggest reason US traders never finish funding an offshore account. The trade-off is real: no MT4/MT5, no regulator, and at least one publicly reported six-figure withdrawal denial.',

  seoTitle: "UnitedPips Review 2026 — Card & PayPal Funding, 1:1000 Leverage, US Accepted",
  seoDescription:
    "Honest UnitedPips review for US traders: card/PayPal deposits that actually clear, 1:1000 leverage, $10 minimum, 40% bonus — and the withdrawal-denial reports and leverage cuts you should know about first.",
  canonical: "/review/unitedpips",

  overallRating: 3.9,
  ratingCount: 0,
  reviewCount: 0,
  trustScore: 55,

  heroBadge: {
    icon: CreditCard,
    text: "CARD & PAYPAL ACCEPTED",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$10",
    maxLeverage: "1:1000",
    spreadFrom: "1.0",
    usClients: "YES",
  },

  warningBanner: {
    text:
      "UnitedPips is unregulated (St. Lucia) and there is no investor-protection scheme behind your deposit. A trader has publicly reported a denied withdrawal of roughly $103,000, and accounts have had advertised 1:1000 leverage cut to 1:100 after opening. Deposit only what you can afford to lose, and test a small withdrawal before you scale up.",
  },

  trustFeatures: [
    { icon: CreditCard, text: "Card & PayPal Funding" },
    { icon: Zap, text: "Up to 1:1000 Leverage" },
    { icon: Wallet, text: "$10 Minimum" },
    { icon: ShieldAlert, text: "Unregulated" },
  ],

  quickStats: [
    { label: "Established", value: "2016", colorClass: "text-foreground" },
    { label: "Headquarters", value: "St. Lucia", colorClass: "text-foreground" },
    { label: "Regulation", value: "Unregulated", colorClass: "text-muted-foreground" },
    { label: "Min Deposit", value: "$10", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:1000", colorClass: "text-primary" },
    { label: "Spreads From", value: "1.0 pips", colorClass: "text-foreground" },
    { label: "Platform", value: "UniTrader (proprietary)", colorClass: "text-muted-foreground" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.8, description: "1:1000 leverage, but 1.0 pip spreads are wide for the category" },
    { label: "Platform & Tools", score: 3.4, description: "Proprietary UniTrader only — no MT4, no MT5, no Expert Advisors" },
    { label: "Customer Support", score: 3.5, description: "Email and live chat, English only" },
    { label: "Deposit & Withdrawal", score: 3.9, description: "Deposits are the strongest part; large withdrawals are the weakest" },
    { label: "Trust & Reputation", score: 3.0, description: "Unregulated, and a reported six-figure withdrawal denial" },
  ],

  accountTypes: [
    {
      name: "Standard",
      minDeposit: "$10",
      leverage: "Up to 1:1000",
      spread: "From 1.0 pips",
      commission: "None (spread-only)",
      features: ["UniTrader platform", "Card, PayPal, e-wallet & crypto funding", "40% deposit bonus", "US clients accepted"],
      popular: true,
    },
    {
      name: "Premium",
      minDeposit: "Higher tier",
      leverage: "Up to 1:1000",
      spread: "Tighter than Standard",
      commission: "None (spread-only)",
      features: ["Lower spreads", "Priority support"],
    },
    {
      name: "VIP",
      minDeposit: "Highest tier",
      leverage: "Up to 1:1000",
      spread: "Lowest offered",
      commission: "None (spread-only)",
      features: ["Best spreads", "Dedicated account manager"],
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Open the registration page", description: "Use our link to reach the official UnitedPips sign-up form.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register", description: "Email and password. No US-residency block on the form.", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Fund with a card or PayPal", description: "This is the step that fails at most offshore brokers and usually works here. If your bank still declines it, switch to USDT.", icon: CreditCard, time: "5 minutes" },
    { step: 4, title: "Test a small withdrawal FIRST", description: "Before you deposit anything meaningful, take a small amount back out and confirm it lands. With an unregulated broker this test is the only real due diligence you have.", icon: AlertTriangle, time: "1-3 days" },
    { step: 5, title: "Then trade", description: "Open UniTrader in your browser and check what leverage your live account was actually given — it is not always the advertised 1:1000.", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Credit / Debit Card", deposit: "Instant", withdrawal: "3-7 days", fee: "Free", recommended: true },
    { method: "PayPal", deposit: "Instant", withdrawal: "1-5 days", fee: "Free", recommended: true },
    { method: "USDT / Crypto", deposit: "5-60 min", withdrawal: "Same day - 3 days", fee: "Network fee" },
    { method: "E-Wallets", deposit: "Instant", withdrawal: "1-5 days", fee: "Free" },
    { method: "Perfect Money", deposit: "Instant", withdrawal: "1-5 days", fee: "Free" },
  ],

  competitors: [
    { name: "FXGlory", id: "fxglory" },
    { name: "Coinexx", id: "coinexx" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Card / PayPal Funding", broker: "Yes", competitor1: "No (crypto in practice)", competitor2: "No (crypto only)" },
    { feature: "Minimum Deposit", broker: "$10", competitor1: "$1", competitor2: "$10" },
    { feature: "Max Leverage", broker: "1:1000", competitor1: "1:3000", competitor2: "1:500" },
    { feature: "Spreads From", broker: "1.0 pips", competitor1: "1.0 pips", competitor2: "0.0 pips" },
    { feature: "Platform", broker: "UniTrader only", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "Deposit Bonus", broker: "40%", competitor1: "50% up to $2K", competitor2: "None" },
    { feature: "Regulation", broker: "Unregulated", competitor1: "Unregulated", competitor2: "Unregulated" },
    { feature: "Established", broker: "2016", competitor1: "2011", competitor2: "2017" },
  ],

  communityFeedback: {
    positiveThemes: [
      "US card and PayPal deposits actually clear — rare in this category",
      "Low $10 entry",
      "High leverage available",
      "40% deposit bonus",
      "Simple browser platform, nothing to install",
    ],
    negativeThemes: [
      "A denied withdrawal of roughly $103,000 has been reported publicly",
      "Advertised 1:1000 leverage cut to 1:100 on live accounts",
      "No MT4/MT5 — you cannot bring your own EAs or indicators",
      "Unregulated, no investor compensation scheme",
      "1.0 pip spreads are wide next to ECN alternatives",
    ],
  },

  faqs: [
    {
      question: "Does UnitedPips accept US traders?",
      answer:
        "Yes. UnitedPips is registered in St. Lucia and operates outside US regulatory jurisdiction, so there is no US-residency block on the registration form. It is legal for a US resident to open and trade such an account; what you give up is CFTC/NFA protection, not legality.",
    },
    {
      question: "Can I really fund with a US credit card?",
      answer:
        "Usually yes, and this is the main reason to consider UnitedPips over its rivals. Most offshore brokers advertise card funding and then bounce US cards to a crypto page. UnitedPips processes cards, PayPal, e-wallets and Perfect Money as well as crypto. If your own bank still blocks the payment, USDT works as a fallback.",
    },
    {
      question: "Is UnitedPips safe?",
      answer:
        "It is unregulated, so no. Not in the sense that a regulated broker is safe. There is no compensation scheme, no segregated-funds requirement you can enforce, and a trader has publicly reported being refused a withdrawal of about $103,000. Treat every dollar there as at risk, keep the balance small, and withdraw profits often rather than letting them accumulate.",
    },
    {
      question: "Will I get the advertised 1:1000 leverage?",
      answer:
        "Not necessarily. Accounts have been cut from 1:1000 to 1:100 after opening. Check the leverage your live account was actually assigned before you size a position — do not assume the marketing figure applies to you.",
    },
    {
      question: "Does UnitedPips support MT4 or MT5?",
      answer:
        "No. Trading happens on UniTrader, the broker's own browser platform. If you rely on MetaTrader Expert Advisors, custom indicators, or copy-trading tools, this is a hard blocker — look at FXGlory or Coinexx instead, both of which run MT4 and MT5.",
    },
    {
      question: "What is the catch with the 40% deposit bonus?",
      answer:
        "As with almost every offshore deposit bonus, the bonus credit is margin, not cash you can withdraw. It inflates the leverage you are effectively running and typically carries a volume requirement before any of it converts. Treat it as extra rope, not extra money.",
    },
  ],

  pros: [
    "US clients accepted with no residency block",
    "Card, PayPal and e-wallet funding that actually clears — not crypto-only",
    "Low $10 minimum deposit",
    "High leverage available (up to 1:1000)",
    "40% deposit bonus",
    "Browser platform, nothing to install",
  ],

  cons: [
    "Unregulated (St. Lucia) — no investor protection",
    "Reported denial of a ~$103,000 withdrawal",
    "Advertised leverage has been cut to 1:100 on live accounts",
    "Proprietary UniTrader only — no MT4/MT5, no EAs",
    "1.0 pip spreads are wide versus ECN competitors",
    "No negative balance protection",
  ],

  lastUpdated: "2026-07-28",
};
