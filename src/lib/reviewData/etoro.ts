import { Shield, Globe, Users, CreditCard, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const etoroData: BrokerReviewData = {
  brokerId: "etoro",
  brokerName: "eToro",
  subtitle: "Social Trading Pioneer - 30M+ Users",
  heroDescription:
    "eToro is a globally recognized social trading platform that has revolutionized how people invest. With its innovative copy trading feature, beginners can automatically replicate the trades of successful investors while learning the markets.",

  seoTitle: "eToro Review 2026 - Social Trading Platform with Copy Trading",
  seoDescription:
    "Complete eToro review for US traders. Social trading platform with copy trading, $50 minimum deposit, and 30M+ users. Learn about eToro's features, fees, and trading conditions.",
  canonical: "/review/etoro",

  overallRating: 4.3,
  ratingCount: 14500,
  reviewCount: 7200,
  trustScore: 88,
  trustpilotRating: 4.1,
  trustpilotReviews: 25000,

  heroBadge: {
    icon: Users,
    text: "Best for Copy Trading",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$50",
    maxLeverage: "1:30",
    spreadFrom: "1.0 pips",
    usClients: "LIMITED",
  },

  warningBanner: {
    text: "67% of retail investor accounts lose money when trading CFDs with this provider. US clients have limited access to certain features.",
  },

  trustFeatures: [
    { icon: Shield, text: "FCA, CySEC, ASIC" },
    { icon: Users, text: "Copy Trading" },
    { icon: Globe, text: "30M+ Users" },
    { icon: CreditCard, text: "$50 Min Deposit" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.1/5", colorClass: "text-success" },
    { label: "Established", value: "2007" },
    { label: "Regulation", value: "FCA, CySEC, ASIC" },
    { label: "Min Deposit", value: "$50", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:30 (Retail)", colorClass: "text-primary" },
    { label: "US Clients", value: "Limited", colorClass: "text-amber-500" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.3, description: "Variable spreads, multiple assets" },
    { label: "Platform & Tools", score: 4.8, description: "Proprietary social trading platform" },
    { label: "Customer Support", score: 4.2, description: "Ticket-based support system" },
    { label: "Deposit & Withdrawal", score: 4.4, description: "Multiple methods, $5 withdrawal fee" },
    { label: "Trust & Reputation", score: 4.5, description: "Multi-regulated, 30M+ users" },
  ],

  accountTypes: [
    { name: "Retail Account", minDeposit: "$50", leverage: "1:30", spread: "From 1 pip", commission: "No", features: ["Copy Trading", "Social Feed", "Virtual Portfolio", "Mobile App"] },
    { name: "Professional Account", minDeposit: "$50", leverage: "1:400", spread: "From 1 pip", commission: "No", popular: true, features: ["Higher leverage", "Copy Trading", "Priority support", "Advanced tools"] },
    { name: "Corporate Account", minDeposit: "$10,000", leverage: "1:400", spread: "From 0.8 pips", commission: "No", features: ["Dedicated manager", "Custom solutions", "API access", "Multi-user access"] },
    { name: "Islamic Account", minDeposit: "$1,000", leverage: "1:30", spread: "From 1 pip", commission: "No", features: ["Swap-free", "Sharia compliant", "Copy Trading", "All instruments"] },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit eToro Website", description: "Click our link to access the official eToro registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Create Your Account", description: "Enter your email, create a username and password.", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Complete Verification", description: "Upload ID and proof of address for KYC compliance.", icon: FileText, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit minimum $50 via card, PayPal, or bank transfer.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Copy Trading", description: "Browse top traders, copy their strategies, or trade independently.", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "$5", fee: "$5", recommended: true },
    { method: "PayPal", deposit: "Free", withdrawal: "$5", fee: "$5", recommended: true },
    { method: "Bank Wire", deposit: "Free", withdrawal: "$5", fee: "$5" },
    { method: "Skrill", deposit: "Free", withdrawal: "$5", fee: "$5" },
    { method: "Neteller", deposit: "Free", withdrawal: "$5", fee: "$5" },
    { method: "Online Banking", deposit: "Free", withdrawal: "$5", fee: "$5" },
  ],

  competitors: [
    { name: "XM", id: "xm" },
    { name: "Pepperstone", id: "pepperstone" },
  ],

  competitorComparison: [
    { feature: "Copy Trading", broker: "Yes (Signature Feature)", competitor1: "No", competitor2: "No" },
    { feature: "Minimum Deposit", broker: "$50", competitor1: "$5", competitor2: "$200" },
    { feature: "Maximum Leverage", broker: "1:30 (Retail)", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Spreads From", broker: "1.0 pips", competitor1: "0.6 pips", competitor2: "0.0 pips" },
    { feature: "Total Assets", broker: "3,000+", competitor1: "1,000+", competitor2: "1,200+" },
    { feature: "US Clients", broker: "Limited", competitor1: "No", competitor2: "No" },
    { feature: "Withdrawal Fee", broker: "$5", competitor1: "Free", competitor2: "Free" },
    { feature: "Regulation", broker: "FCA, CySEC, ASIC", competitor1: "CySEC, ASIC", competitor2: "FCA, ASIC, CySEC" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Copy trading feature highly praised",
      "Very beginner-friendly platform",
      "Wide range of tradeable assets",
      "Active social community",
      "Good educational resources",
    ],
    negativeThemes: [
      "Spreads higher than specialist brokers",
      "$5 withdrawal fee",
      "Limited forex pairs vs specialists",
    ],
  },

  faqs: [
    {
      question: "Does eToro accept US clients?",
      answer: "eToro accepts US clients with limited functionality. US users can trade stocks and crypto but have restricted access to CFDs and forex trading due to US regulatory requirements.",
    },
    {
      question: "What is eToro's copy trading?",
      answer: "eToro's CopyTrader feature allows you to automatically replicate the trades of successful investors. You choose a trader to copy, allocate funds, and their trades are executed proportionally in your account.",
    },
    {
      question: "What is the minimum deposit for eToro?",
      answer: "The minimum deposit for eToro is $50 for most countries. This gives you access to all available features including copy trading and the virtual portfolio.",
    },
    {
      question: "Is eToro regulated and safe?",
      answer: "Yes, eToro is regulated by the FCA (UK), CySEC (Cyprus), and ASIC (Australia). They have been operating since 2007 and serve over 30 million users worldwide.",
    },
    {
      question: "Does eToro charge withdrawal fees?",
      answer: "Yes, eToro charges a $5 withdrawal fee per transaction. The minimum withdrawal amount is $30. Deposits are free for most payment methods.",
    },
    {
      question: "Can I practice trading on eToro?",
      answer: "Yes, eToro offers a free $100,000 virtual portfolio where you can practice trading without risking real money. This demo account is available to all registered users.",
    },
  ],

  pros: [
    "Revolutionary copy trading feature",
    "User-friendly platform for beginners",
    "Wide range of assets (3,000+)",
    "Strong regulatory framework (FCA, CySEC, ASIC)",
    "Free $100,000 virtual portfolio",
    "Active social trading community",
    "Commission-free stock trading",
    "Fractional shares available",
    "Excellent educational resources",
    "Mobile app highly rated",
  ],

  cons: [
    "Limited availability for US crypto trading",
    "Spreads higher than some competitors",
    "$5 withdrawal fee",
    "Inactivity fee after 12 months",
    "No MT4/MT5 support",
    "Limited forex pairs compared to specialists",
  ],

  lastUpdated: "2026-02-14",
};
