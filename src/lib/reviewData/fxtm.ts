import { Shield, Globe, Users, Zap, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";
import type { BonusOffer } from "@/components/BonusCard";

const bonusOffers: BonusOffer[] = [
  {
    title: "Welcome Bonus",
    amount: "$500",
    type: "deposit",
    description: "New clients can claim up to $500 welcome bonus using promo code HELLOFXTM. Terms and conditions apply.",
    requirements: ["Use code: HELLOFXTM", "New accounts only", "Standard trading requirements apply"],
  },
  {
    title: "30% Deposit Bonus",
    amount: "Up to $200",
    type: "deposit",
    description: "Get 30% bonus on each deposit, up to $200 per deposit. Applicable on Standard and Cent accounts.",
    requirements: ["30% of deposit amount", "Max $200 per deposit", "Available on multiple deposits"],
  },
  {
    title: "Loyalty Program",
    amount: "Unlimited Points",
    type: "cashback",
    description: "Earn loyalty points for every trade you make. Redeem points for cash bonuses and trading benefits.",
    requirements: ["Earn points per lot traded", "Redeem for cash or benefits", "Tier-based rewards"],
  },
];

export const fxtmData: BrokerReviewData = {
  brokerId: "fxtm",
  brokerName: "FXTM",
  subtitle: "ForexTime - Offshore Broker Since 2011",
  heroDescription:
    'FXTM (ForexTime), operated by Exinity Limited, is an offshore forex broker known for its copy trading platform "FXTM Invest" and high leverage options. Regulated by FSC Mauritius and FSCA South Africa (no longer FCA/CySEC), it offers Turkish traders local support and payment methods but with reduced regulatory protection.',

  seoTitle: "FXTM Review 2026 - Copy Trading Broker with High Leverage",
  seoDescription:
    "Complete FXTM (ForexTime) review. Offshore broker with copy trading, up to 1:3000 leverage, $200 minimum deposit. Regulated by FSC Mauritius and FSCA.",
  canonical: "/review/fxtm",

  overallRating: 3.1,
  ratingCount: 11500,
  reviewCount: 5600,
  trustScore: 65,
  trustpilotRating: 3.5,
  trustpilotReviews: 800,

  heroBadge: {
    icon: Users,
    text: "Copy Trading Available",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$200",
    maxLeverage: "1:3000",
    spreadFrom: "0.0 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "FXTM is no longer FCA/CySEC regulated — now licensed only by FSC Mauritius and FSCA South Africa. CFDs are complex instruments. High leverage can work against you.",
  },

  trustFeatures: [
    { icon: Shield, text: "FSC Mauritius & FSCA" },
    { icon: Users, text: "FXTM Invest" },
    { icon: Globe, text: "Turkish Support" },
    { icon: Zap, text: "1:3000 Leverage" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "3.5/5", colorClass: "text-foreground" },
    { label: "Established", value: "2011" },
    { label: "Regulation", value: "FSC, FSCA", colorClass: "text-destructive" },
    { label: "Min Deposit", value: "$200", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:3000", colorClass: "text-primary" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-destructive" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.0, description: "High leverage (up to 1:3000), multiple account types" },
    { label: "Platform & Tools", score: 4.0, description: "MT4/MT5 plus FXTM Invest copy trading" },
    { label: "Customer Support", score: 3.8, description: "Multilingual support available" },
    { label: "Deposit & Withdrawal", score: 3.8, description: "Multiple methods, some withdrawal fees" },
    { label: "Trust & Reputation", score: 2.5, description: "No longer FCA/CySEC — now FSC Mauritius & FSCA only" },
  ],

  accountTypes: [
    { name: "Edge", minDeposit: "$200", leverage: "1:500", spread: "From 1.2 pips", commission: "No" },
    { name: "Advantage", minDeposit: "$200", leverage: "1:3000", spread: "From 0.0 pips", commission: "$3.5/lot", popular: true },
    { name: "Advantage Plus", minDeposit: "$200", leverage: "1:3000", spread: "From 1.5 pips", commission: "No" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit FXTM Website", description: "Go to the official FXTM website", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your personal details and verify email", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Complete KYC Verification", description: "Upload ID and proof of address", icon: FileText, time: "5-10 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit minimum $200 via card, bank, or e-wallet", icon: Wallet, time: "Instant - 1 day" },
    { step: 5, title: "Start Trading or Copy Trading", description: "Trade manually or use FXTM Invest to copy traders", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-5 days", fee: "Free", recommended: true },
    { method: "Bank Wire", deposit: "3-5 days", withdrawal: "3-5 days", fee: "$30+" },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "Free", recommended: true },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Local Bank Transfer", deposit: "1-3 days", withdrawal: "1-3 days", fee: "Varies" },
  ],

  competitors: [
    { name: "Exness", id: "exness" },
    { name: "HFM", id: "hfm" },
  ],

  competitorComparison: [
    { feature: "Minimum Deposit", broker: "$200", competitor1: "$10", competitor2: "$5" },
    { feature: "Maximum Leverage", broker: "1:3000", competitor1: "1:2000", competitor2: "1:2000" },
    { feature: "Spreads From", broker: "1.2 pips", competitor1: "0.3 pips", competitor2: "1.2 pips" },
    { feature: "Regulation", broker: "FSC, FSCA", competitor1: "FCA, CySEC", competitor2: "CySEC, FCA" },
    { feature: "Key Feature", broker: "FXTM Invest Copy", competitor1: "Instant Withdrawals", competitor2: "HFcopy" },
    { feature: "Copy Trading", broker: "FXTM Invest", competitor1: "No", competitor2: "HFcopy" },
    { feature: "Account Types", broker: "3 types + Stocks", competitor1: "5 types", competitor2: "5 types" },
    { feature: "US Clients", broker: "No", competitor1: "No", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Good copy trading feature",
      "Helpful Turkish support",
      "Educational content praised",
      "Multiple account options",
      "High leverage available",
    ],
    negativeThemes: [
      "Some withdrawal delays",
      "Spreads wider than competitors",
      "Platform stability issues reported",
    ],
  },

  faqs: [
    {
      question: "Is FXTM regulated and safe?",
      answer: "FXTM (operated by Exinity Limited) is regulated by the Financial Services Commission (FSC) of Mauritius and the Financial Sector Conduct Authority (FSCA) of South Africa. Note: FXTM previously held FCA (UK) and CySEC (Cyprus) licenses but these are no longer active. The current regulators are considered lower-tier, meaning less investor protection compared to FCA/CySEC-regulated brokers.",
    },
    {
      question: "Does FXTM accept US clients?",
      answer: "No, FXTM does not accept clients from the United States due to US regulatory requirements. US traders should look at brokers specifically licensed to serve US clients.",
    },
    {
      question: "What is FXTM Invest and how does copy trading work?",
      answer: "FXTM Invest is FXTM's proprietary copy trading platform. You can browse successful traders (Strategy Managers), view their performance history, and automatically copy their trades. You keep control of your funds and can stop copying at any time. Profit sharing is typically 20-30% of profits to the Strategy Manager.",
    },
    {
      question: "What is the minimum deposit at FXTM?",
      answer: "The minimum deposit for all FXTM accounts is $200 USD. This includes the Edge account (1:500 leverage) and Advantage accounts (1:3000 leverage) which offer better trading conditions with raw spreads from 0.0 pips.",
    },
    {
      question: "How long do FXTM withdrawals take?",
      answer: "E-wallet withdrawals (Skrill, Neteller) are processed within 24 hours. Credit/debit card withdrawals take 1-5 business days. Bank wire transfers take 3-5 business days. FXTM charges fees on some withdrawal methods.",
    },
    {
      question: "Does FXTM offer Turkish language support?",
      answer: "Yes, FXTM offers full Turkish language support including website, platform interface, and customer service. This makes it a popular choice among Turkish traders.",
    },
  ],

  pros: [
    "FXTM Invest copy trading platform",
    "High leverage up to 1:3000",
    "Turkish language support",
    "Multiple account types",
    "Free educational resources",
    "Negative balance protection",
    "Local payment methods supported",
  ],

  cons: [
    "No longer FCA/CySEC regulated — only FSC Mauritius & FSCA",
    "US clients NOT accepted",
    "Lower Trustpilot rating (3.5/5)",
    "Withdrawal fees on some methods",
    "Spreads not the tightest",
    "Limited cryptocurrency options",
    "Higher minimum deposit requirement ($200 for all accounts)",
  ],

  bonusOffers,
  lastUpdated: "2026-03-31",  // Updated: Minimum deposit corrected from $50 to $200
};
