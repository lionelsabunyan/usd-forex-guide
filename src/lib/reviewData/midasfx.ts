import { Shield, Users, Bitcoin, Zap, Clock, Globe, UserPlus, FileText, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const midasfxData: BrokerReviewData = {
  brokerId: "midasfx",
  brokerName: "MidasFX",
  subtitle: "Offshore Broker - TradersWay Family Since 2010",
  heroDescription:
    'MidasFX is an offshore forex broker that accepts US clients and offers high leverage trading with cryptocurrency deposits. Part of the TradersWay family with 13+ years of proven operation. <strong class="text-success">US clients welcome.</strong>',

  seoTitle: "MidasFX Review 2026 - Offshore Broker Accepting US Clients",
  seoDescription:
    "Complete MidasFX review. Offshore broker accepting US clients with 1:1000 leverage, ECN spreads from 0.0 pips, $10 minimum deposit. Crypto deposits only.",
  canonical: "/review/midasfx",

  overallRating: 4.8,
  ratingCount: 22000,
  reviewCount: 11500,
  trustScore: 90,
  trustpilotRating: 4.2,
  trustpilotReviews: 1800,

  heroBadge: {
    icon: Shield,
    text: "US ACCEPTED",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$10",
    maxLeverage: "1:1000",
    spreadFrom: "0.0",
    usClients: "YES",
  },

  warningBanner: {
    text: "Offshore Broker: No major regulatory protection. High leverage increases risk. Trade responsibly.",
  },

  trustFeatures: [
    { icon: Users, text: "US Accepted" },
    { icon: Bitcoin, text: "Crypto Deposits" },
    { icon: Zap, text: "1:1000 Leverage" },
    { icon: Clock, text: "Fast Withdrawals" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.2/5", colorClass: "text-foreground" },
    { label: "Track Record", value: "13+ Years", colorClass: "text-foreground" },
    { label: "Regulation", value: "Offshore", colorClass: "text-muted-foreground" },
    { label: "Min Deposit", value: "$10", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:1000", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  promoBanner: {
    imageWebp: "/images/brokers/midasfx-banner.webp",
    imagePng: "/images/brokers/midasfx-banner.png",
    alt: "MidasFX - $1 Min Deposit, 100% Deposit Bonus, 1:1000 Leverage",
    href: "https://www.midasfx.com/?ib=1136695",
  },

  ratings: [
    { label: "Trading Conditions", score: 4.6, description: "ECN spreads from 0.0 pips, high leverage" },
    { label: "Platform & Tools", score: 4.5, description: "MT4 & MT5 with full EA support" },
    { label: "Customer Support", score: 4.5, description: "24/5 live chat and email" },
    { label: "Deposit & Withdrawal", score: 4.8, description: "Fast crypto processing" },
    { label: "Trust & Reputation", score: 4.5, description: "13+ year track record via TradersWay" },
  ],

  accountTypes: [
    { name: "MT4.VAR", minDeposit: "$10", leverage: "1:1000", spread: "From 1.5 pips", commission: "No" },
    { name: "MT4.ECN", minDeposit: "$10", leverage: "1:500", spread: "From 0.0 pips", commission: "$3/lot", popular: true },
    { name: "MT5.VAR", minDeposit: "$10", leverage: "1:1000", spread: "From 1.5 pips", commission: "No" },
    { name: "MT5.ECN", minDeposit: "$10", leverage: "1:500", spread: "From 0.0 pips", commission: "$3/lot" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit MidasFX Website", description: "Go to the official MidasFX registration page", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your email and create password", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Verify Your Email", description: "Click the verification link sent to your inbox", icon: FileText, time: "1 minute" },
    { step: 4, title: "Fund with Crypto", description: "Deposit using USDT TRC20, BTC, ETH, or other cryptos", icon: Bitcoin, time: "5-30 minutes" },
    { step: 5, title: "Start Trading", description: "Download MT4/MT5 and place your first trade", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "USDT (TRC20)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free", recommended: true },
    { method: "Bitcoin (BTC)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free" },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "Litecoin (LTC)", deposit: "5-30 min", withdrawal: "5-30 min", fee: "Free" },
    { method: "USDT (ERC20)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
  ],

  competitors: [
    { name: "Hankotrade", id: "hankotrade" },
    { name: "HFM", id: "hfm" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "No" },
    { feature: "Minimum Deposit", broker: "$10", competitor1: "$10", competitor2: "$0" },
    { feature: "Maximum Leverage", broker: "1:1000", competitor1: "1:500", competitor2: "1:2000" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "Crypto Deposits", broker: "Yes (Only)", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "Offshore", competitor1: "FSA (SVG)", competitor2: "CySEC, FCA" },
    { feature: "Track Record", broker: "13+ Years", competitor1: "5+ Years", competitor2: "14+ Years" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Fast crypto withdrawals",
      "Good ECN spreads",
      "US client acceptance praised",
      "Reliable platform",
      "Responsive support",
    ],
    negativeThemes: [
      "Crypto-only can be limiting",
      "Offshore status concerns some",
      "Leverage is risky for beginners",
    ],
  },

  faqs: [
    {
      question: "Does MidasFX accept US clients?",
      answer:
        "Yes, MidasFX accepts clients from the United States. As an offshore broker operating outside US jurisdiction, they can serve US traders who want access to higher leverage and more trading flexibility than domestic brokers offer.",
    },
    {
      question: "Is MidasFX regulated?",
      answer:
        "MidasFX operates as an offshore broker and is not regulated by major financial authorities like the FCA or ASIC. However, they have a strong track record through their connection to TradersWay (13+ years). Offshore brokers offer more flexibility but less regulatory protection.",
    },
    {
      question: "What payment methods does MidasFX accept?",
      answer:
        "MidasFX accepts cryptocurrency deposits only - including USDT (TRC20 recommended), Bitcoin, Ethereum, Litecoin, and Stellar. This crypto-only approach allows them to serve US clients and provide fast same-day withdrawals.",
    },
    {
      question: "What is the minimum deposit at MidasFX?",
      answer:
        "The minimum deposit at MidasFX is just $10 for all account types (MT4.VAR, MT4.ECN, MT5.VAR, MT5.ECN). This low barrier makes it accessible for beginners to start trading.",
    },
    {
      question: "How fast are MidasFX withdrawals?",
      answer:
        "MidasFX processes crypto withdrawals very quickly - typically within 5-60 minutes depending on the cryptocurrency. USDT TRC20 is the fastest option, usually completing in 5-30 minutes.",
    },
    {
      question: "What leverage does MidasFX offer?",
      answer:
        "MidasFX offers up to 1:1000 leverage on VAR accounts and up to 1:500 on ECN accounts. This high leverage is available because they operate as an offshore broker, but remember that high leverage significantly increases risk.",
    },
  ],

  pros: [
    "Accepts US clients",
    "High leverage up to 1:1000",
    "Low minimum deposit ($10)",
    "ECN spreads from 0.0 pips",
    "Fast crypto withdrawals",
    "MT4 & MT5 platforms",
    "No deposit fees",
    "Full EA/scalping support",
    "13+ year track record via TradersWay",
  ],

  cons: [
    "Offshore (no major regulation)",
    "Crypto deposits only",
    "No card/bank wire options",
    "Limited customer protection",
    "Not suitable for risk-averse traders",
  ],

  bonusOffers: [
    {
      title: "100% Deposit Bonus",
      amount: "Up to $10,000",
      type: "deposit",
      description: "Choose between 10% to 100% bonus on your deposit. Convert to real cash at $0.40 per lot traded.",
      requirements: [
        "Available on MT4.STD and MT4.ECN accounts",
        "Minimum deposit: $1",
        "Bonus converts to cash: $0.40 per lot",
        "Flexible bonus percentage selection (10%-100%)",
      ],
      minDeposit: "$1",
      maxBonus: "$10,000",
      termsUrl: "https://midasfx.com/deposit-bonus",
      highlighted: true,
    },
  ],

  lastUpdated: "February 4, 2026",
};
