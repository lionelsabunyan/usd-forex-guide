import { Shield, Globe, CreditCard, Zap, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const avatradeData: BrokerReviewData = {
  brokerId: "avatrade",
  brokerName: "AvaTrade",
  subtitle: "International Broker Since 2006",
  heroDescription:
    'AvaTrade is a well-regulated international forex broker founded in 2006, offering multiple trading platforms and excellent educational resources. However, <strong class="text-destructive">AvaTrade does not currently accept clients from the United States.</strong>',

  seoTitle: "AvaTrade Review 2026 - Multi-Regulated International Broker",
  seoDescription:
    "Complete AvaTrade review - globally regulated broker with AvaTradeGO app, copy trading, and 250+ instruments. Note: Does not accept US clients.",
  canonical: "/review/avatrade",

  overallRating: 3.6,
  ratingCount: 8800,
  reviewCount: 4300,
  trustScore: 82,
  trustpilotRating: 4.5,
  trustpilotReviews: 8500,

  heroBadge: {
    icon: Shield,
    text: "Multi-Regulated",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$100",
    maxLeverage: "1:400",
    spreadFrom: "0.9 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "AvaTrade does not currently accept clients from the United States. US traders should consider CFTC-regulated brokers or offshore alternatives that accept US clients.",
  },

  trustFeatures: [
    { icon: Shield, text: "CBI, ASIC, FCA" },
    { icon: CreditCard, text: "$100 Min Deposit" },
    { icon: Globe, text: "250+ Instruments" },
    { icon: Zap, text: "Copy Trading" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.5/5", colorClass: "text-success" },
    { label: "Established", value: "2006" },
    { label: "Regulation", value: "CBI, ASIC, FCA" },
    { label: "Min Deposit", value: "$100", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:400", colorClass: "text-primary" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-destructive" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.7, description: "Variable spreads from 0.9 pips" },
    { label: "Platform & Tools", score: 3.8, description: "MT4/MT5, AvaTradeGO" },
    { label: "Customer Support", score: 3.5, description: "Multilingual support" },
    { label: "Deposit & Withdrawal", score: 3.6, description: "Free deposits/withdrawals" },
    { label: "Trust & Reputation", score: 3.9, description: "Multi-regulated since 2006" },
  ],

  accountTypes: [
    { name: "Standard Account", minDeposit: "$100", leverage: "1:400", spread: "From 0.9 pips", commission: "No", features: ["MT4/MT5", "AvaTradeGO", "All instruments", "Copy Trading"], popular: true },
    { name: "Professional Account", minDeposit: "$1,000", leverage: "1:400", spread: "From 0.7 pips", commission: "No", features: ["Lower spreads", "Priority support", "All platforms", "Copy Trading"] },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit AvaTrade Website", description: "Click our link to access the official AvaTrade registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your personal details and choose your account type.", icon: UserPlus, time: "3 minutes" },
    { step: 3, title: "Verify Identity", description: "Upload ID and proof of address for KYC verification.", icon: FileText, time: "1-2 days" },
    { step: 4, title: "Fund Your Account", description: "Deposit minimum $100 via card, bank wire, or e-wallet.", icon: Wallet, time: "Instant - 3 days" },
    { step: 5, title: "Start Trading", description: "Download MT4/MT5 or AvaTradeGO and begin trading.", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "Bank Wire", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Skrill", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Neteller", deposit: "Free", withdrawal: "Free", fee: "Free" },
  ],

  competitors: [
    { name: "eToro", id: "etoro" },
    { name: "Pepperstone", id: "pepperstone" },
  ],

  competitorComparison: [
    { feature: "Minimum Deposit", broker: "$100", competitor1: "$50", competitor2: "$200" },
    { feature: "Maximum Leverage", broker: "1:400", competitor1: "1:30 (Retail)", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.9 pips", competitor1: "1.0 pips", competitor2: "0.0 pips" },
    { feature: "Regulation", broker: "CBI, ASIC, FCA", competitor1: "FCA, CySEC, ASIC", competitor2: "FCA, ASIC, CySEC" },
    { feature: "Copy Trading", broker: "Yes", competitor1: "Yes (Signature)", competitor2: "No" },
    { feature: "Mobile App", broker: "AvaTradeGO", competitor1: "eToro App", competitor2: "Standard MT4/MT5" },
    { feature: "Trading Instruments", broker: "250+", competitor1: "3,000+", competitor2: "1,200+" },
    { feature: "US Clients", broker: "No", competitor1: "Limited", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Excellent educational content",
      "User-friendly AvaTradeGO app",
      "Good copy trading feature",
      "Multiple regulatory licenses",
      "Responsive customer support",
    ],
    negativeThemes: [
      "US clients not accepted",
      "Inactivity fees apply",
      "Average spreads compared to ECN",
    ],
  },

  faqs: [
    {
      question: "Does AvaTrade accept US clients?",
      answer: "No, AvaTrade does not currently accept clients from the United States. US traders should consider CFTC-regulated brokers like OANDA or Forex.com, or offshore alternatives that accept US clients.",
    },
    {
      question: "Is AvaTrade regulated and safe?",
      answer: "Yes, AvaTrade is regulated by multiple authorities including the Central Bank of Ireland (CBI), ASIC (Australia), FCA (UK), FSCA (South Africa), and others. They have been operating since 2006 and offer negative balance protection.",
    },
    {
      question: "What is AvaTradeGO?",
      answer: "AvaTradeGO is AvaTrade's proprietary mobile trading app. It features an intuitive interface, social trading elements, and the unique AvaProtect risk management feature that lets you protect trades against losses for a limited time.",
    },
    {
      question: "What is the minimum deposit for AvaTrade?",
      answer: "The minimum deposit for a Standard AvaTrade account is $100. Professional accounts require a minimum of $1,000. AvaTrade supports multiple payment methods including cards, bank wire, and e-wallets.",
    },
    {
      question: "Does AvaTrade offer copy trading?",
      answer: "Yes, AvaTrade offers copy trading through its partnerships with platforms like ZuluTrade and DupliTrade. You can also use AvaSocial to follow and copy other traders directly within the AvaTrade ecosystem.",
    },
    {
      question: "What platforms does AvaTrade support?",
      answer: "AvaTrade supports MetaTrader 4 (MT4), MetaTrader 5 (MT5), AvaTradeGO (proprietary mobile app), and AvaOptions for options trading. This gives traders flexibility in choosing their preferred trading environment.",
    },
  ],

  pros: [
    "Multiple tier-1 regulations (ASIC, FCA, CBI)",
    "Excellent educational resources",
    "User-friendly AvaTradeGO mobile app",
    "Copy trading feature available",
    "Multiple platform options (MT4/MT5/AvaTradeGO)",
    "250+ trading instruments",
    "Negative balance protection",
    "Islamic swap-free accounts",
    "Good customer support",
    "Competitive spreads",
  ],

  cons: [
    "Does not accept US clients",
    "Higher minimum deposit than some competitors",
    "Limited leverage for some regions",
    "Withdrawal processing can be slow",
    "No cryptocurrency deposits",
  ],

  lastUpdated: "2026-02-14",
};
