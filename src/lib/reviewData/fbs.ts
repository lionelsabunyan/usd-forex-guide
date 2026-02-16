import { Shield, CreditCard, Globe, Gift, Zap, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const fbsData: BrokerReviewData = {
  brokerId: "fbs",
  brokerName: "FBS",
  subtitle: "Multi-Regulated Since 2009",
  heroDescription:
    "FBS is a global forex broker known for extremely high leverage (up to 1:3000), very low minimum deposits, and generous bonus programs. With multiple regulations including CySEC and ASIC, it serves Turkish traders with local language support.",

  seoTitle: "FBS Review 2026 - High Leverage Broker with $1 Minimum Deposit",
  seoDescription:
    "Complete FBS review. Multi-regulated broker with 1:3000 leverage, $1 minimum deposit, and generous bonuses. Good for beginners.",
  canonical: "/review/fbs",

  overallRating: 3.0,
  ratingCount: 12500,
  reviewCount: 6200,
  trustScore: 80,
  trustpilotRating: 4.0,
  trustpilotReviews: 5000,

  heroBadge: {
    icon: Zap,
    text: "1:3000 Leverage Available",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$1",
    maxLeverage: "1:3000",
    spreadFrom: "0.5 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "Warning: 1:3000 leverage is extremely high risk. 80%+ of retail traders lose money with high leverage. FBS does not accept US clients.",
  },

  trustFeatures: [
    { icon: Shield, text: "CySEC & ASIC" },
    { icon: CreditCard, text: "$1 Min Deposit" },
    { icon: Globe, text: "Turkish Support" },
    { icon: Gift, text: "Welcome Bonus" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.0/5", colorClass: "text-success" },
    { label: "Established", value: "2009" },
    { label: "Regulation", value: "CySEC, ASIC" },
    { label: "Min Deposit", value: "$1", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:3000", colorClass: "text-primary" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-destructive" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.3, description: "Extremely high leverage (1:3000), low entry barrier" },
    { label: "Platform & Tools", score: 4.0, description: "MT4/MT5 plus FBS Trader mobile app" },
    { label: "Customer Support", score: 4.0, description: "24/7 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "$5 minimum, multiple options" },
    { label: "Trust & Reputation", score: 4.0, description: "CySEC & ASIC regulated since 2009" },
  ],

  accountTypes: [
    { name: "Cent", minDeposit: "$1", leverage: "1:1000", spread: "From 1.0 pips", commission: "No" },
    { name: "Standard", minDeposit: "$100", leverage: "1:3000", spread: "From 0.5 pips", commission: "No", popular: true },
    { name: "Zero Spread", minDeposit: "$500", leverage: "1:3000", spread: "0.0 pips", commission: "$20/lot" },
    { name: "ECN", minDeposit: "$1000", leverage: "1:500", spread: "From -1 pip", commission: "$6/lot" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit FBS Website", description: "Go to the official FBS website", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your details and choose account type", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Complete KYC Verification", description: "Upload ID and proof of address", icon: FileText, time: "5-10 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit minimum $1 via card, e-wallet, or crypto", icon: Wallet, time: "Instant - 1 day" },
    { step: 5, title: "Claim Bonus & Trade", description: "Activate your welcome bonus and start trading", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "15-20 min", fee: "Free", recommended: true },
    { method: "Bank Wire", deposit: "3-5 days", withdrawal: "3-5 days", fee: "Varies" },
    { method: "Skrill", deposit: "Instant", withdrawal: "15-20 min", fee: "Free", recommended: true },
    { method: "Neteller", deposit: "Instant", withdrawal: "15-20 min", fee: "Free" },
    { method: "Crypto", deposit: "1 hour", withdrawal: "1-3 hours", fee: "Network fee" },
    { method: "Perfect Money", deposit: "Instant", withdrawal: "15-20 min", fee: "Free" },
  ],

  competitors: [
    { name: "FXTM", id: "fxtm" },
    { name: "HFM", id: "hfm" },
  ],

  competitorComparison: [
    { feature: "Minimum Deposit", broker: "$1", competitor1: "$10", competitor2: "$5" },
    { feature: "Maximum Leverage", broker: "1:3000", competitor1: "1:2000", competitor2: "1:2000" },
    { feature: "Spreads From", broker: "0.5 pips", competitor1: "1.5 pips", competitor2: "1.2 pips" },
    { feature: "Regulation", broker: "CySEC, ASIC", competitor1: "FCA, CySEC", competitor2: "CySEC, FCA" },
    { feature: "Key Feature", broker: "Highest Leverage", competitor1: "FXTM Invest Copy", competitor2: "HFcopy" },
    { feature: "Account Types", broker: "4 types", competitor1: "3 types", competitor2: "5 types" },
    { feature: "Crypto Deposits", broker: "Yes", competitor1: "No", competitor2: "Yes" },
    { feature: "US Clients", broker: "No", competitor1: "No", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Low minimum deposit praised",
      "Good Turkish support",
      "Easy account opening",
      "Attractive bonuses",
      "Decent mobile app",
    ],
    negativeThemes: [
      "Extremely high leverage risky",
      "Some withdrawal issues reported",
      "Spreads widen during volatility",
    ],
  },

  faqs: [
    {
      question: "Is FBS regulated and safe?",
      answer: "Yes, FBS is regulated by CySEC (Cyprus), ASIC (Australia), FSCA (South Africa), and FSC (Belize). CySEC and ASIC are top-tier regulators. FBS has been operating since 2009 and offers segregated client funds and negative balance protection.",
    },
    {
      question: "Does FBS accept US clients?",
      answer: "No, FBS does not accept clients from the United States due to US regulatory requirements. US traders should look at brokers specifically licensed to serve US clients.",
    },
    {
      question: "Is 1:3000 leverage safe to use?",
      answer: "1:3000 leverage is extremely high and carries significant risk. While it allows you to open large positions with small capital, losses are also magnified. Most retail traders (80%+) lose money with high leverage. Beginners should use much lower leverage (1:10 to 1:50) until they have experience.",
    },
    {
      question: "What is the minimum deposit at FBS?",
      answer: "FBS offers one of the lowest minimum deposits in the industry. The Cent account requires just $1, while the Standard account needs $100. This makes FBS very accessible for beginners who want to start with small amounts.",
    },
    {
      question: "How do FBS bonuses work?",
      answer: "FBS offers various bonuses including welcome bonuses up to $140. However, bonuses have trading volume requirements before withdrawal. Read the terms carefully - you typically need to trade a certain number of lots before bonus funds can be withdrawn.",
    },
    {
      question: "How long do FBS withdrawals take?",
      answer: "FBS processes most withdrawals within 15-20 minutes for e-wallets (Skrill, Neteller) and cards. This is faster than many competitors. Bank wire transfers take 3-5 business days. Crypto withdrawals typically complete within 1-3 hours.",
    },
  ],

  pros: [
    "Multi-regulated (CySEC, ASIC, FSC, FSCA)",
    "Extremely high leverage up to 1:3000",
    "Very low minimum deposit ($1)",
    "Generous bonuses and promotions",
    "Turkish language support",
    "Good mobile trading app",
    "Copy trading available",
    "Negative balance protection",
    "Free VPS for active traders",
    "Fast withdrawal processing",
  ],

  cons: [
    "US clients NOT accepted",
    "Very high leverage = extreme risk",
    "Withdrawal fees may apply",
    "Spreads not the tightest",
    "Bonus terms can be restrictive",
  ],

  lastUpdated: "2026-02-14",
};
