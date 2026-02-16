import { Shield, Star, Check, Zap, Award, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const hankotradeData: BrokerReviewData = {
  brokerId: "hankotrade",
  brokerName: "Hankotrade",
  subtitle: "5.0 Trustpilot Rating - US Clients Welcome",
  heroDescription:
    'Hankotrade is an offshore forex broker with an exceptional <strong class="text-success">5.0/5 Trustpilot rating</strong> based on 2,300+ reviews. <strong class="text-success">Accepts US clients</strong> and offers ECN spreads from 0.0 pips with same-day crypto withdrawals.',

  seoTitle: "Hankotrade Review 2026 - 5.0 Trustpilot Rated Broker for US Traders",
  seoDescription:
    "Complete Hankotrade review for 2026. Perfect 5.0/5 Trustpilot rating, accepts US clients, ECN spreads from 0.0 pips, same-day crypto withdrawals. Trusted offshore broker.",
  canonical: "/review/hankotrade",

  overallRating: 4.7,
  ratingCount: 13800,
  reviewCount: 6800,
  trustScore: 88,
  trustpilotRating: 5.0,
  trustpilotReviews: 2363,

  heroBadge: {
    icon: Shield,
    text: "US OK",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$10",
    maxLeverage: "1:500",
    spreadFrom: "0.0",
    usClients: "YES",
  },

  warningBanner: {
    text: "Hankotrade is an offshore broker registered in Seychelles. While they have an exceptional Trustpilot rating and accept US clients, trading with offshore brokers carries additional risks. Only trade with funds you can afford to lose and consider your risk tolerance.",
  },

  trustFeatures: [
    { icon: Star, text: "5.0/5 Trustpilot" },
    { icon: Check, text: "US Clients Accepted" },
    { icon: Zap, text: "ECN Spreads 0.0" },
    { icon: Award, text: "Same-Day Withdrawals" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "5.0/5", colorClass: "text-success" },
    { label: "Reviews", value: "2,363+", colorClass: "text-foreground" },
    { label: "Headquarters", value: "Seychelles", colorClass: "text-foreground" },
    { label: "Regulation", value: "FSA (Seychelles)", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$10", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:500", colorClass: "text-primary" },
    { label: "Platforms", value: "MT4, MT5", colorClass: "text-foreground" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.8, description: "ECN spreads from 0.0 pips" },
    { label: "Platform & Tools", score: 4.5, description: "MT4 & MT5 available" },
    { label: "Customer Support", score: 4.3, description: "24/5 responsive support" },
    { label: "Deposit & Withdrawal", score: 4.5, description: "Same-day crypto withdrawals" },
    { label: "Trust & Reputation", score: 4.3, description: "5.0/5 Trustpilot, Seychelles FSA" },
  ],

  accountTypes: [
    { name: "STP Account", minDeposit: "$10", leverage: "1:500", spread: "From 1.0 pips", commission: "No" },
    { name: "ECN Account", minDeposit: "$100", leverage: "1:500", spread: "From 0.0 pips", commission: "$3 per lot", popular: true },
    { name: "ECN Plus", minDeposit: "$1,000", leverage: "1:500", spread: "From 0.0 pips", commission: "$2 per lot" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit Hankotrade Website", description: "Click our link to go to Hankotrade's official registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Fill Registration Form", description: "Enter your email, create a password, and provide basic personal information.", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Identity", description: "Upload ID document and proof of address. Verification is usually completed within 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit via crypto (BTC, ETH, USDT) or other methods. Minimum $10.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4 or MT5, choose your leverage, and begin trading forex & CFDs.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Bitcoin (BTC)", deposit: "Same day", withdrawal: "Same day", fee: "Free", recommended: true },
    { method: "USDT (Tether)", deposit: "Same day", withdrawal: "Same day", fee: "Free", recommended: true },
    { method: "Ethereum (ETH)", deposit: "Same day", withdrawal: "Same day", fee: "Free", recommended: true },
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-3 days", fee: "Free" },
    { method: "Bank Wire Transfer", deposit: "2-5 days", withdrawal: "2-5 days", fee: "Free" },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "LMFX", id: "lmfx" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$10", competitor1: "$10", competitor2: "$50" },
    { feature: "Maximum Leverage", broker: "1:500", competitor1: "1:1000", competitor2: "1:1000" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT5", competitor2: "MT4" },
    { feature: "Trustpilot Rating", broker: "5.0/5", competitor1: "4.2/5", competitor2: "N/A" },
    { feature: "Crypto Deposits", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Same-Day Withdrawals", broker: "Yes", competitor1: "Yes", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Exceptional 5.0/5 Trustpilot rating",
      "Fast same-day crypto withdrawals",
      "True ECN spreads from 0.0 pips",
      "Responsive and helpful support team",
      "US clients fully accepted",
    ],
    negativeThemes: [
      "Offshore broker (Seychelles FSA)",
      "Lower leverage than some competitors (1:500)",
      "Limited educational resources",
    ],
  },

  faqs: [
    {
      question: "Does Hankotrade accept US clients?",
      answer:
        "Yes, Hankotrade fully accepts US clients without restrictions. As an offshore broker registered in Seychelles, they're able to serve American traders who want access to higher leverage and ECN trading conditions.",
    },
    {
      question: "What is the minimum deposit at Hankotrade?",
      answer:
        "The minimum deposit is just $10 for the STP account, making it very accessible for beginners. The ECN account requires $100, and ECN Plus requires $1,000. We recommend starting with at least $100-200 for proper risk management.",
    },
    {
      question: "Is Hankotrade regulated and safe?",
      answer:
        "Hankotrade is registered in Seychelles (FSA). While not regulated by major authorities like FCA or CySEC, they have an exceptional 5.0/5 Trustpilot rating with 2,300+ reviews. They offer segregated accounts and negative balance protection. Trade only with funds you can afford to lose.",
    },
    {
      question: "How fast are Hankotrade withdrawals?",
      answer:
        "Hankotrade is known for fast withdrawals. Crypto withdrawals are typically processed same-day, often within hours. Bank wire and other methods may take 1-3 business days. This is faster than many competitors.",
    },
    {
      question: "What leverage does Hankotrade offer?",
      answer:
        "Hankotrade offers leverage up to 1:500 on all account types. While this is lower than some offshore brokers offering 1:1000+, it's still significantly higher than US-regulated brokers (max 1:50). High leverage amplifies both profits and losses.",
    },
    {
      question: "What makes Hankotrade's Trustpilot rating so high?",
      answer:
        "Hankotrade has maintained a perfect 5.0/5 Trustpilot rating based on 2,300+ reviews. Traders consistently praise their fast withdrawals, responsive support, and competitive ECN spreads. The high rating reflects genuine customer satisfaction.",
    },
  ],

  pros: [
    "Perfect 5.0/5 Trustpilot rating (2,300+ reviews)",
    "US clients fully accepted",
    "Same-day crypto withdrawals",
    "True ECN spreads from 0.0 pips",
    "Low minimum deposit ($10)",
    "Both MT4 and MT5 platforms",
    "Leverage up to 1:500",
    "Multiple crypto deposit options",
    "Negative balance protection",
    "Responsive 24/5 support",
    "Scalping and hedging allowed",
    "Expert Advisors supported",
  ],

  cons: [
    "Offshore broker (Seychelles FSA)",
    "Lower leverage than some competitors",
    "Limited educational resources",
    "No proprietary trading platform",
    "Not regulated by FCA/CySEC/ASIC",
  ],

  lastUpdated: "February 4, 2026",
};
