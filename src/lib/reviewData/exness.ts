import { Shield, Globe, Zap, Star, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const exnessData: BrokerReviewData = {
  brokerId: "exness",
  brokerName: "Exness",
  subtitle: "Multi-Regulated Broker Since 2008",
  heroDescription:
    "Exness is one of the world's leading forex brokers, regulated by FCA, CySEC, and other authorities. Known for instant withdrawals, ultra-tight spreads, and high leverage up to 1:2000. Popular choice for Turkish traders with local payment support.",

  seoTitle: "Exness Review 2026 - Multi-Regulated Broker with Instant Withdrawals",
  seoDescription:
    "Complete Exness review. 4.8/5 Trustpilot rating, instant withdrawals, leverage up to 1:2000. Regulated by FCA & CySEC. One of the largest forex brokers by volume.",
  canonical: "/review/exness",

  overallRating: 4.8,
  ratingCount: 24500,
  reviewCount: 12800,
  trustScore: 95,
  trustpilotRating: 4.8,
  trustpilotReviews: 27000,

  heroBadge: {
    icon: Shield,
    text: "Trust Score: 95/100",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$10",
    maxLeverage: "1:2000",
    spreadFrom: "0.0 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "Exness does not accept US clients. CFDs are complex instruments. High leverage can work against you.",
  },

  trustFeatures: [
    { icon: Shield, text: "FCA Regulated" },
    { icon: Zap, text: "Instant Withdrawals" },
    { icon: Globe, text: "Turkish Support" },
    { icon: Star, text: "27K+ Reviews" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.8/5", colorClass: "text-success" },
    { label: "Established", value: "2008" },
    { label: "Regulation", value: "FCA, CySEC" },
    { label: "Min Deposit", value: "$10", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:2000", colorClass: "text-primary" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-destructive" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.8, description: "Ultra-tight spreads" },
    { label: "Platform & Tools", score: 4.5, description: "MT4/MT5 available" },
    { label: "Customer Support", score: 4.5, description: "24/7 multilingual" },
    { label: "Deposit & Withdrawal", score: 4.9, description: "Instant withdrawals" },
    { label: "Trust & Reputation", score: 4.8, description: "27K+ reviews" },
  ],

  accountTypes: [
    { name: "Standard", minDeposit: "$10", leverage: "1:2000", spread: "From 0.3 pips", commission: "No" },
    { name: "Standard Cent", minDeposit: "$10", leverage: "1:2000", spread: "From 0.3 pips", commission: "No" },
    { name: "Pro", minDeposit: "$200", leverage: "1:2000", spread: "From 0.1 pips", commission: "No", popular: true },
    { name: "Raw Spread", minDeposit: "$200", leverage: "1:2000", spread: "From 0.0 pips", commission: "$3.5/lot" },
    { name: "Zero", minDeposit: "$200", leverage: "1:2000", spread: "0.0 pips (30 pairs)", commission: "$3.5/lot" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit Exness", description: "Click our link to access the official Exness registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Enter your email, create password, and select your country of residence.", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Verify Identity", description: "Upload ID documents for KYC verification. Usually approved within hours.", icon: FileText, time: "1-24 hours" },
    { step: 4, title: "Fund Account", description: "Deposit via bank transfer, card, or e-wallet. Many local payment options available.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4/MT5, login and start trading with instant execution!", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Bank Transfer", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Visa/Mastercard", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "Skrill", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "Neteller", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Perfect Money", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Crypto (BTC, USDT)", deposit: "Free", withdrawal: "Free", fee: "Free" },
  ],

  competitors: [
    { name: "XM", id: "xm" },
    { name: "Pepperstone", id: "pepperstone" },
  ],

  competitorComparison: [
    { feature: "Trustpilot Rating", broker: "4.8/5", competitor1: "3.8/5", competitor2: "4.4/5" },
    { feature: "Min Deposit", broker: "$10", competitor1: "$5", competitor2: "$200" },
    { feature: "Max Leverage", broker: "1:2000", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.6 pips", competitor2: "0.0 pips" },
    { feature: "Regulation", broker: "FCA, CySEC", competitor1: "CySEC, ASIC", competitor2: "FCA, ASIC, CySEC" },
    { feature: "Withdrawal Speed", broker: "Instant", competitor1: "24-48h", competitor2: "1-3 days" },
    { feature: "Account Types", broker: "5 types", competitor1: "4 types", competitor2: "2 types" },
    { feature: "US Clients", broker: "No", competitor1: "No", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Instant withdrawals praised consistently",
      "Tight spreads and low costs",
      "Reliable execution",
      "Good mobile app",
      "Turkish support available",
    ],
    negativeThemes: [
      "High leverage can lead to quick losses",
      "US traders cannot access",
      "Some platform crashes reported",
    ],
  },

  faqs: [
    {
      question: "Is Exness a regulated broker?",
      answer: "Yes, Exness is regulated by multiple top-tier authorities including the Financial Conduct Authority (FCA) in the UK, Cyprus Securities and Exchange Commission (CySEC), and Financial Services Authority (FSA) in Seychelles. This multi-regulatory framework provides strong client protection.",
    },
    {
      question: "Does Exness accept US clients?",
      answer: "No, Exness does not accept clients from the United States due to US regulatory restrictions. US traders should look at regulated US brokers like OANDA, Forex.com, or offshore options that accept US clients.",
    },
    {
      question: "How fast are Exness withdrawals?",
      answer: "Exness is famous for instant withdrawals. Most withdrawal requests are processed automatically and instantly for e-wallets and many payment methods. Bank transfers may take 1-3 business days depending on your bank.",
    },
    {
      question: "What is the minimum deposit for Exness?",
      answer: "The minimum deposit for Standard and Standard Cent accounts is just $10. For Pro, Raw Spread, and Zero accounts, the minimum deposit is $200. This makes Exness accessible to traders with different capital levels.",
    },
    {
      question: "Is 1:2000 leverage safe to use?",
      answer: "While Exness offers leverage up to 1:2000, this is extremely risky and not recommended for beginners. Higher leverage means higher potential losses. Start with lower leverage (1:50 or less) and only increase as you gain experience and implement proper risk management.",
    },
    {
      question: "What platforms does Exness support?",
      answer: "Exness supports MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms, available on desktop, web browser, and mobile devices. They also have their own Exness Terminal and mobile trading app for convenient access.",
    },
  ],

  pros: [
    "Multi-regulated (FCA, CySEC, FSA)",
    "Excellent Trustpilot rating (4.8/5 with 27K+ reviews)",
    "Instant withdrawals - no waiting",
    "Ultra-high leverage up to 1:2000",
    "Low minimum deposit ($10)",
    "Zero spread accounts available",
    "Turkish language support",
    "Papara payment method for Turkey",
    "Negative balance protection",
  ],

  cons: [
    "US clients NOT accepted",
    "Very high leverage = very high risk",
    "Limited educational content",
    "No cTrader platform",
  ],

  lastUpdated: "2026-02-14",
};
