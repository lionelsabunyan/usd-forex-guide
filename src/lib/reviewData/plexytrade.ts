import { Rocket, Zap, Bitcoin, Check, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const plexytradeData: BrokerReviewData = {
  brokerId: "plexytrade",
  brokerName: "PlexyTrade",
  subtitle: "New Broker with LQDFX Infrastructure - 2024",
  heroDescription:
    "PlexyTrade is a new offshore broker launched in 2024 that offers the highest leverage in the market at 1:2000. Built on the proven LQDFX infrastructure, it accepts US clients and provides zero spread ECN accounts with crypto-only funding.",

  seoTitle: "PlexyTrade Review 2026 - Highest Leverage Broker for US Traders",
  seoDescription:
    "Complete PlexyTrade review for US traders. Highest leverage at 1:2000, zero spread ECN accounts, built on LQDFX infrastructure. New broker analysis.",
  canonical: "/review/plexytrade",

  overallRating: 3.0,
  ratingCount: 2100,
  reviewCount: 1050,
  trustScore: 60,
  trustpilotRating: 4.4,
  trustpilotReviews: 200,

  heroBadge: {
    icon: Rocket,
    text: "1:2000 LEVERAGE",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$50",
    maxLeverage: "1:2000",
    spreadFrom: "0.0",
    usClients: "YES",
  },

  warningBanner: {
    text: "PlexyTrade launched in 2024 and has limited operating history. While it's built on LQDFX infrastructure and has good initial reviews, exercise caution with newer unregulated brokers. Only trade with funds you can afford to lose.",
  },

  trustFeatures: [
    { icon: Rocket, text: "1:2000 Leverage" },
    { icon: Zap, text: "0.0 ECN Spreads" },
    { icon: Bitcoin, text: "Crypto Deposits" },
    { icon: Check, text: "US Accepted" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.4/5", colorClass: "text-success" },
    { label: "Established", value: "2024", colorClass: "text-foreground" },
    { label: "Headquarters", value: "St. Lucia", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$50", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:2000", colorClass: "text-primary" },
    { label: "ECN Spreads", value: "From 0.0 pips", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.3, description: "1:2000 leverage, 0.0 ECN spreads" },
    { label: "Platform & Tools", score: 3.8, description: "MT4 & MT5 available" },
    { label: "Customer Support", score: 3.5, description: "Email & live chat support" },
    { label: "Deposit & Withdrawal", score: 4.0, description: "Crypto-only, fast processing" },
    { label: "Trust & Reputation", score: 3.0, description: "New broker, unregulated" },
  ],

  accountTypes: [
    {
      name: "Standard Account",
      minDeposit: "$50",
      leverage: "1:2000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "No commission", "All instruments", "Hedging allowed", "EA supported"],
    },
    {
      name: "ECN Account",
      minDeposit: "$100",
      leverage: "1:2000",
      spread: "From 0.0 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5 Platform", "Raw ECN spreads", "Best for scalpers", "DMA execution", "Fast fills"],
      popular: true,
    },
    {
      name: "VIP Account",
      minDeposit: "$10,000",
      leverage: "1:2000",
      spread: "From 0.0 pips",
      commission: "$2 per lot",
      features: ["MT4/MT5 Platform", "Lowest commission", "Priority support", "Personal manager", "Premium conditions"],
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit Website", description: "Go to PlexyTrade official site", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Fill Application", description: "Complete the online form", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Identity", description: "Upload ID documents", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund with Crypto", description: "Deposit via cryptocurrency", icon: Wallet, time: "10-60 minutes" },
    { step: 5, title: "Start Trading", description: "Access MT4/MT5 platforms", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Bitcoin (BTC)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free" },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "USDT (Tether TRC20)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free" },
    { method: "USDT (Tether ERC20)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "Litecoin (LTC)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free" },
    { method: "USD Coin (USDC)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
  ],

  competitors: [
    { name: "Hankotrade", id: "hankotrade" },
    { name: "MidasFX", id: "midasfx" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$50", competitor1: "$10", competitor2: "$10" },
    { feature: "Maximum Leverage", broker: "1:2000", competitor1: "1:500", competitor2: "1:1000" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "Crypto Deposits", broker: "Crypto Only", competitor1: "Yes", competitor2: "Yes (Only)" },
    { feature: "Established", broker: "2024", competitor1: "2020", competitor2: "2019" },
    { feature: "Trustpilot Rating", broker: "4.4/5", competitor1: "5.0/5", competitor2: "4.2/5" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Highest leverage available (1:2000)",
      "Zero spread ECN accounts",
      "Fast execution speeds",
      "Built on LQDFX infrastructure",
      "Good customer support",
    ],
    negativeThemes: [
      "Very new broker (2024)",
      "Crypto-only deposits",
      "Unregulated",
      "Limited track record",
    ],
  },

  faqs: [
    {
      question: "Is PlexyTrade legit and safe?",
      answer:
        "PlexyTrade is a legitimate broker built on LQDFX infrastructure. However, it's important to note that it's very new (launched 2024) and unregulated. While it has good Trustpilot reviews (4.4/5), exercise caution and only trade with funds you can afford to lose.",
    },
    {
      question: "Does PlexyTrade accept US clients?",
      answer:
        "Yes, PlexyTrade accepts US clients. As an offshore broker based in St. Lucia, they are not restricted by US regulations and can offer services to American traders.",
    },
    {
      question: "What is the maximum leverage at PlexyTrade?",
      answer:
        "PlexyTrade offers the highest leverage in the market at 1:2000. This is available on all account types, though traders should be aware that high leverage significantly increases both potential profits and risks.",
    },
    {
      question: "How do I deposit funds at PlexyTrade?",
      answer:
        "PlexyTrade only accepts cryptocurrency deposits. You can fund your account using Bitcoin (BTC), Ethereum (ETH), USDT (TRC20 and ERC20), Litecoin (LTC), or USD Coin (USDC). All deposits and withdrawals are free with processing times of 5-60 minutes.",
    },
    {
      question: "What platforms does PlexyTrade offer?",
      answer:
        "PlexyTrade offers both MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms. Both platforms support Expert Advisors (EAs), allowing for automated trading strategies.",
    },
    {
      question: "What is the minimum deposit at PlexyTrade?",
      answer:
        "The minimum deposit at PlexyTrade is $50 for the Standard Account, $100 for the ECN Account, and $10,000 for the VIP Account. All deposits must be made via cryptocurrency.",
    },
  ],

  pros: [
    "Accepts US clients",
    "Highest leverage available (1:2000)",
    "Zero spread ECN accounts",
    "Good Trustpilot rating (4.4/5)",
    "Built on proven LQDFX infrastructure",
    "Both MT4 and MT5 platforms",
    "Fast execution speeds",
    "No deposit or withdrawal fees",
    "Scalping and hedging allowed",
    "Expert Advisors supported",
  ],

  cons: [
    "Very new broker (launched 2024)",
    "Unregulated (St. Lucia)",
    "Crypto-only deposits",
    "Limited operating history",
    "No traditional payment methods",
  ],

  lastUpdated: "February 4, 2026",
};
