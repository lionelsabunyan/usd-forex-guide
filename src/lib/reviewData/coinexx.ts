import { Star, Bitcoin, Zap, Clock, Check, Globe, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const coinexxData: BrokerReviewData = {
  brokerId: "coinexx",
  brokerName: "Coinexx",
  subtitle: "Crypto-Only ECN Broker Since 2017",
  heroDescription:
    'Coinexx is a crypto-only ECN broker that accepts US clients. With an excellent <strong class="text-success">4.9/5 Trustpilot rating</strong>, true 0.0 pip spreads, and anonymous trading options, it\'s a top choice for scalpers and traders who prefer cryptocurrency transactions.',

  seoTitle: "Coinexx Review 2026 - Crypto-Only ECN Broker for US Traders",
  seoDescription:
    "Complete Coinexx review for US traders. 4.9 Trustpilot rating, true ECN with 0.0 spreads, crypto-only deposits. Best for scalpers seeking anonymous trading.",
  canonical: "/review/coinexx",

  overallRating: 4.85,
  ratingCount: 10200,
  reviewCount: 5100,
  trustScore: 76,
  trustpilotRating: 4.9,
  trustpilotReviews: 500,

  heroBadge: {
    icon: Star,
    text: "4.9/5 TRUSTPILOT",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$10",
    maxLeverage: "1:500",
    spreadFrom: "0.0",
    usClients: "YES",
  },

  warningBanner: {
    text: "Coinexx only accepts cryptocurrency deposits and withdrawals. You must have access to crypto (Bitcoin, Ethereum, USDT, etc.) to use this broker. They are unregulated but have an excellent community reputation.",
  },

  trustFeatures: [
    { icon: Star, text: "4.9/5 Trustpilot" },
    { icon: Bitcoin, text: "Crypto-Only" },
    { icon: Zap, text: "0.0 ECN Spreads" },
    { icon: Clock, text: "Same-Day Withdrawals" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.9/5", colorClass: "text-success" },
    { label: "Established", value: "2017", colorClass: "text-foreground" },
    { label: "Headquarters", value: "St. Vincent", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$10", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:500", colorClass: "text-primary" },
    { label: "ECN Spreads", value: "From 0.0 pips", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.0, description: "True ECN with 0.0 spreads" },
    { label: "Platform & Tools", score: 3.8, description: "MT4 & MT5 available" },
    { label: "Customer Support", score: 3.5, description: "Email & live chat" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "Fast crypto processing, same-day" },
    { label: "Trust & Reputation", score: 3.5, description: "4.9/5 Trustpilot, unregulated" },
  ],

  accountTypes: [
    {
      name: "ECN Account",
      minDeposit: "$10",
      leverage: "1:500",
      spread: "From 0.0 pips",
      commission: "$3.50 per lot",
      features: ["MT4/MT5 Platform", "True ECN execution", "Crypto deposits only", "Anonymous trading", "Fast withdrawals"],
      popular: true,
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit Coinexx", description: "Click our link to access the official Coinexx registration page with exclusive benefits.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Enter your email and create a password. Minimal verification for anonymous trading.", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Get Crypto Wallet Address", description: "Coinexx will provide you with a deposit wallet address for your chosen cryptocurrency.", icon: Wallet, time: "1 minute" },
    { step: 4, title: "Deposit Crypto", description: "Send crypto from your wallet to Coinexx. Minimum $10 worth of any supported crypto.", icon: Bitcoin, time: "10-60 minutes" },
    { step: 5, title: "Start ECN Trading", description: "Download MT4/MT5, login with your credentials, and enjoy true 0.0 pip spreads!", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Bitcoin (BTC)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free", recommended: true },
    { method: "USDT (Tether TRC20)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free", recommended: true },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "USDT (Tether ERC20)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "Litecoin (LTC)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free" },
    { method: "Bitcoin Cash (BCH)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free" },
  ],

  competitors: [
    { name: "Hankotrade", id: "hankotrade" },
    { name: "MidasFX", id: "midasfx" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$10", competitor1: "$50", competitor2: "$10" },
    { feature: "Max Leverage", broker: "1:500", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Raw Spreads", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Commission", broker: "$3.50/lot", competitor1: "$4/lot", competitor2: "$6/lot" },
    { feature: "Trustpilot Rating", broker: "4.9/5", competitor1: "4.4/5", competitor2: "4.6/5" },
    { feature: "Platforms", broker: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "Crypto Deposits", broker: "Crypto Only", competitor1: "Available", competitor2: "Available" },
    { feature: "Anonymous Trading", broker: "Yes", competitor1: "Limited", competitor2: "No" },
    { feature: "Withdrawal Speed", broker: "Same Day", competitor1: "24-48h", competitor2: "1-24h" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Excellent Trustpilot rating (4.9/5)",
      "True ECN execution with 0.0 spreads",
      "Fast crypto withdrawals",
      "Anonymous trading possible",
      "Low minimum deposit ($10)",
      "Great for scalpers",
    ],
    negativeThemes: [
      "Crypto-only deposits/withdrawals",
      "Unregulated broker",
      "No traditional payment methods",
      "Limited customer support hours",
    ],
  },

  faqs: [
    {
      question: "Does Coinexx accept US clients?",
      answer:
        "Yes, Coinexx accepts US clients without restrictions. As a crypto-only broker based in St. Vincent and the Grenadines, they operate outside US regulatory jurisdiction. US traders can open accounts and trade all instruments including forex, metals, indices, and cryptocurrencies.",
    },
    {
      question: "How do I deposit money into Coinexx?",
      answer:
        "Coinexx only accepts cryptocurrency deposits. Supported cryptos include Bitcoin (BTC), Ethereum (ETH), USDT (TRC20 & ERC20), Litecoin (LTC), and Bitcoin Cash (BCH). Simply send crypto to your unique deposit address and funds typically arrive within 10-60 minutes depending on network confirmation times.",
    },
    {
      question: "Is Coinexx safe and trustworthy?",
      answer:
        "Coinexx has an excellent 4.9/5 rating on Trustpilot from 500+ reviews, which is one of the highest in the industry. While they are not regulated by major authorities (they're registered in St. Vincent), their reputation in the trading community is strong. They've been operating since 2017 with consistent positive feedback.",
    },
    {
      question: "What are Coinexx's spreads and commissions?",
      answer:
        "Coinexx offers true ECN trading with raw spreads starting from 0.0 pips. The commission is $3.50 per lot round turn, which is competitive for a true ECN broker. There are no deposit or withdrawal fees, and the minimum lot size is 0.01.",
    },
    {
      question: "Can I trade anonymously with Coinexx?",
      answer:
        "Yes, Coinexx offers anonymous trading. Due to their crypto-only model and minimal verification requirements, you can maintain privacy while trading. This is attractive for traders who prioritize financial privacy.",
    },
    {
      question: "How fast are withdrawals from Coinexx?",
      answer:
        "Coinexx processes withdrawals very quickly, typically same-day for cryptocurrency withdrawals. Once approved, the crypto arrives in your wallet within 10-60 minutes depending on blockchain confirmation times. There are no withdrawal fees from Coinexx's side.",
    },
  ],

  pros: [
    "Accepts US clients",
    "Excellent Trustpilot rating (4.9/5)",
    "True ECN with 0.0 pip spreads",
    "Very low minimum deposit ($10)",
    "Fast crypto withdrawals (same day)",
    "Anonymous trading available",
    "Both MT4 and MT5 platforms",
    "No deposit or withdrawal fees",
    "Scalping and hedging allowed",
    "Expert Advisors supported",
  ],

  cons: [
    "Cryptocurrency-only funding",
    "Unregulated (St. Vincent)",
    "No traditional payment methods",
    "Limited customer support",
    "Newer broker (2017)",
  ],

  lastUpdated: "February 4, 2026",
};
