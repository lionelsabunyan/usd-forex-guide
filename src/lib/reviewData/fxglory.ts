import { Shield, TrendingUp, DollarSign, Clock, Check, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const fxgloryData: BrokerReviewData = {
  brokerId: "fxglory",
  brokerName: "FXGlory",
  subtitle: "Highest Leverage Broker for US Traders",
  heroDescription:
    "FXGlory is an offshore forex broker established in 2011 that actively accepts US clients. With the highest leverage in the industry at 1:3000, a $1 minimum deposit, and multiple crypto payment options, it's a popular choice for American traders seeking alternatives to CFTC-regulated brokers.",

  seoTitle: "FXGlory Review 2026 - Highest Leverage Broker for US Traders",
  seoDescription:
    "Complete FXGlory review for 2026. Offshore broker accepting US clients with 1:3000 leverage, $1 minimum deposit, crypto deposits, and 24/7 support. Operating since 2011.",
  canonical: "/review/fxglory",

  overallRating: 4.9,
  ratingCount: 14200,
  reviewCount: 6900,
  trustScore: 80,
  trustpilotRating: 4.0,
  trustpilotReviews: 500,

  heroBadge: {
    icon: Shield,
    text: "SINCE 2011",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$1",
    maxLeverage: "1:3000",
    spreadFrom: "0.1",
    usClients: "YES",
  },

  warningBanner: {
    text: "FXGlory is registered in St. Vincent and the Grenadines, not regulated by CFTC/NFA. While legal for US residents to use, you don't have access to US regulatory protections. The extremely high leverage (1:3000) significantly increases both profit potential and risk. Only trade with funds you can afford to lose.",
  },

  trustFeatures: [
    { icon: TrendingUp, text: "1:3000 Leverage" },
    { icon: DollarSign, text: "$1 Min Deposit" },
    { icon: Clock, text: "24/7 Support" },
    { icon: Check, text: "US Accepted" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.0/5", colorClass: "text-success" },
    { label: "Established", value: "2011", colorClass: "text-foreground" },
    { label: "Headquarters", value: "St. Vincent", colorClass: "text-foreground" },
    { label: "Regulation", value: "SVG FSA", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$1", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:3000", colorClass: "text-primary" },
    { label: "Instruments", value: "50+", colorClass: "text-foreground" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.8, description: "1:3000 leverage, low spreads" },
    { label: "Platform & Tools", score: 4.5, description: "MT4, MT5 platforms" },
    { label: "Customer Support", score: 4.8, description: "24/7 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.8, description: "Multiple options, fast crypto" },
    { label: "Trust & Reputation", score: 4.5, description: "Since 2011, offshore" },
  ],

  accountTypes: [
    {
      name: "Micro Account",
      minDeposit: "$1",
      leverage: "1:3000",
      spread: "From 2 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "All instruments", "Hedging allowed", "Expert Advisors", "Beginners friendly"],
    },
    {
      name: "Standard Account",
      minDeposit: "$100",
      leverage: "1:3000",
      spread: "From 1.5 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "All instruments", "Priority support", "Expert Advisors", "Hedging allowed"],
      popular: true,
    },
    {
      name: "VIP Account",
      minDeposit: "$5,000",
      leverage: "1:3000",
      spread: "From 0.5 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "All instruments", "Dedicated manager", "Lower spreads", "VIP support"],
    },
    {
      name: "ECN Account",
      minDeposit: "$500",
      leverage: "1:500",
      spread: "From 0.1 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5 Platform", "Raw ECN spreads", "Institutional liquidity", "DMA access", "Best for scalpers"],
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit FXGlory Website", description: "Click our link to go to FXGlory's official registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Fill Registration Form", description: "Enter your email, create a password, and provide basic personal information.", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Identity", description: "Upload ID document and proof of address. Verification usually completed within 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Choose from multiple payment methods including crypto. Deposits are instant.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4 or MT5 and access 50+ forex pairs with up to 1:3000 leverage.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-3 days", fee: "Free", recommended: true },
    { method: "Bank Wire Transfer", deposit: "1-5 days", withdrawal: "1-5 days", fee: "Free" },
    { method: "Bitcoin (BTC)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "USDT (Tether)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "1%" },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "1%" },
    { method: "Perfect Money", deposit: "Instant", withdrawal: "Instant", fee: "1%" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "Hankotrade", id: "hankotrade" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$1", competitor1: "$50", competitor2: "$10" },
    { feature: "Maximum Leverage", broker: "1:3000", competitor1: "1:500", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.1 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "24/7 Support", broker: "Yes", competitor1: "No", competitor2: "No" },
    { feature: "Crypto Deposits", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Established", broker: "2011", competitor1: "2019", competitor2: "2020" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Highest leverage available (1:3000)",
      "Very low minimum deposit ($1)",
      "24/7 customer support",
      "Fast crypto withdrawals",
      "Both MT4 and MT5 supported",
    ],
    negativeThemes: [
      "Not regulated by major authorities",
      "Higher spreads than ECN brokers",
      "No negative balance protection guarantee",
    ],
  },

  faqs: [
    {
      question: "Does FXGlory accept US clients?",
      answer:
        "Yes, FXGlory actively accepts clients from the United States. As an offshore broker registered in St. Vincent and the Grenadines, they are not subject to CFTC/NFA regulations, allowing them to serve US traders with high leverage options.",
    },
    {
      question: "What is the minimum deposit at FXGlory?",
      answer:
        "FXGlory has an extremely low minimum deposit of just $1 for the Micro Account. This makes it one of the most accessible forex brokers for beginners. Standard accounts require $100, and VIP accounts require $5,000.",
    },
    {
      question: "What leverage does FXGlory offer?",
      answer:
        "FXGlory offers leverage up to 1:3000, which is the highest in the industry. This is significantly higher than the 1:50 limit imposed by CFTC-regulated US brokers. However, high leverage increases both profit potential and risk.",
    },
    {
      question: "Is FXGlory regulated and safe?",
      answer:
        "FXGlory is registered with the SVG FSA (St. Vincent and the Grenadines Financial Services Authority). While not regulated by major authorities like CFTC, FCA, or ASIC, they have been operating since 2011 with a generally positive track record.",
    },
    {
      question: "How fast are FXGlory withdrawals?",
      answer:
        "FXGlory processes withdrawal requests within 24 hours. Crypto withdrawals (Bitcoin, Ethereum, USDT) are typically completed in 10-30 minutes. Bank wire and credit card withdrawals take 1-5 business days.",
    },
    {
      question: "Can I use Expert Advisors (EAs) on FXGlory?",
      answer:
        "Yes, FXGlory fully supports Expert Advisors (automated trading robots) on both MT4 and MT5 platforms. Scalping and hedging strategies are also allowed without restrictions.",
    },
  ],

  pros: [
    "Accepts US clients without restrictions",
    "Extremely low minimum deposit ($1)",
    "Highest leverage in industry (1:3000)",
    "Multiple cryptocurrency payment options",
    "24/7 customer support availability",
    "Fast withdrawal processing (24-48 hours)",
    "Both MT4 and MT5 platforms available",
    "No deposit fees on most methods",
    "Scalping and hedging allowed",
    "Expert Advisors (EA) fully supported",
    "Operating since 2011",
  ],

  cons: [
    "Not regulated by major financial authorities (SEC, FCA, ASIC)",
    "Limited educational resources and webinars",
    "No US-based phone support",
    "Spreads higher than some ECN brokers",
    "No guaranteed negative balance protection",
  ],

  bonusOffers: [
    {
      title: "50% Deposit Bonus",
      amount: "Up to $2,000",
      type: "deposit",
      description: "Boost your trading capital with FXGlory's generous 50% bonus on deposits.",
      requirements: [
        "Minimum deposit: $1,000",
        "Maximum bonus: $2,000",
        "Verified account required",
        "Standard terms and conditions apply",
      ],
      minDeposit: "$1,000",
      maxBonus: "$2,000",
      termsUrl: "https://fxglory.com/promotions/",
      highlighted: true,
    },
    {
      title: "Free VPS",
      amount: "Free",
      type: "vps",
      description: "Get a free Virtual Private Server for 24/7 automated trading.",
      requirements: [
        "Minimum deposit: $1,000",
        "Available for MT4/MT5 Expert Advisors",
        "99.9% uptime guarantee",
        "Low latency connection",
      ],
      minDeposit: "$1,000",
      termsUrl: "https://fxglory.com/promotions/",
    },
  ],

  lastUpdated: "February 4, 2026",
};
