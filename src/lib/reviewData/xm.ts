import { Shield, CreditCard, Globe, Gift, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";
import type { BonusOffer } from "@/components/BonusCard";

const bonusOffers: BonusOffer[] = [
  {
    title: "Webinar Bonus",
    amount: "$50",
    type: "no-deposit",
    description: "Receive $50 webinar bonus by attending XM educational webinars. February 2026 campaign for new clients.",
    requirements: ["Attend scheduled webinar", "New accounts only", "Valid February 2026"],
  },
  {
    title: "Deposit Bonus",
    amount: "100% up to $500 + 20% up to $10K",
    type: "deposit",
    description: "Get 100% bonus on your first $500 deposit, then 20% on deposits up to $10,000. Maximum total bonus: $10,500.",
    requirements: ["100% on first $500", "20% on next $9,500", "Max bonus: $10,500"],
  },
  {
    title: "Weekly Bonus",
    amount: "Up to $8,750/week",
    type: "cashback",
    description: "Limited-time weekly bonus campaign running February-March 2026. Earn up to $8,750 per week based on trading volume.",
    requirements: ["Feb-Mar 2026 only", "Based on trading volume", "Up to $8,750/week"],
  },
];

export const xmData: BrokerReviewData = {
  brokerId: "xm",
  brokerName: "XM",
  subtitle: "Multi-Regulated Since 2009 - 5M+ Clients",
  heroDescription:
    'XM is a globally popular forex broker serving over 5 million clients since 2009. Regulated by CySEC and ASIC, it\'s known for ultra-low minimum deposits, generous bonuses, and excellent customer support in multiple languages including Turkish. <strong class="text-amber-500">Note: US clients not accepted.</strong>',

  seoTitle: "XM Review 2026 - Low Deposit Broker with Generous Bonuses",
  seoDescription:
    "Complete XM review. Globally popular broker with $5 minimum deposit, 1:1000 leverage, extensive education, and welcome bonuses. CySEC and ASIC regulated.",
  canonical: "/review/xm",

  overallRating: 4.4,
  ratingCount: 18500,
  reviewCount: 9200,
  trustScore: 84,
  trustpilotRating: 3.8,
  trustpilotReviews: 1500,

  heroBadge: {
    icon: Shield,
    text: "Trust Score: 84/100",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$5",
    maxLeverage: "1:1000",
    spreadFrom: "0.6 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "XM does not accept clients from the United States. This review is provided for informational purposes. US traders should check our broker comparison for alternatives.",
  },

  trustFeatures: [
    { icon: Shield, text: "CySEC & ASIC" },
    { icon: CreditCard, text: "$5 Min Deposit" },
    { icon: Globe, text: "Turkish Support" },
    { icon: Gift, text: "Welcome Bonus" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "3.8/5", colorClass: "text-foreground" },
    { label: "Established", value: "2009" },
    { label: "Regulation", value: "CySEC, ASIC" },
    { label: "Min Deposit", value: "$5", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:1000", colorClass: "text-primary" },
    { label: "Bonuses", value: "Available", colorClass: "text-success" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-amber-500" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.0, description: "Ultra-low spreads, 1:1000 leverage" },
    { label: "Platform & Tools", score: 4.3, description: "MT4, MT5, XM App" },
    { label: "Customer Support", score: 4.3, description: "24/5 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "No fees, multiple options" },
    { label: "Trust & Reputation", score: 4.3, description: "CySEC, ASIC, DFSA regulated" },
  ],

  accountTypes: [
    { name: "Micro", minDeposit: "$5", leverage: "1:1000", spread: "From 1.0 pips", commission: "No" },
    { name: "Standard", minDeposit: "$5", leverage: "1:1000", spread: "From 1.0 pips", commission: "No", popular: true },
    { name: "XM Ultra Low", minDeposit: "$5", leverage: "1:1000", spread: "From 0.6 pips", commission: "No" },
    { name: "Shares", minDeposit: "$10,000", leverage: "1:1", spread: "Variable", commission: "Yes" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit XM Website", description: "Click our link to access XM's registration page with bonus offer.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Complete Registration", description: "Enter email, password, and personal details. Turkish language available.", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Account", description: "Upload ID and proof of address. Verification usually takes 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit from just $5 via card, e-wallet, or bank transfer. No fees!", icon: Wallet, time: "Instant" },
    { step: 5, title: "Claim Bonus & Trade", description: "Get your welcome bonus and start trading with MT4/MT5.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Skrill", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "Neteller", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Local Bank Transfer", deposit: "Free", withdrawal: "Free", fee: "Free" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "Hankotrade", id: "hankotrade" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "No", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$5", competitor1: "$10", competitor2: "$10" },
    { feature: "Maximum Leverage", broker: "1:1000", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.6 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT5", competitor2: "MT4, MT5" },
    { feature: "Welcome Bonus", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Deposit/Withdrawal Fees", broker: "Free", competitor1: "Free", competitor2: "Free" },
    { feature: "Regulation", broker: "CySEC, ASIC", competitor1: "FSA (SVG)", competitor2: "FSA (SVG)" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Excellent Turkish support",
      "Fast withdrawals praised",
      "Good educational content",
      "Generous welcome bonus",
      "Low minimum deposit",
    ],
    negativeThemes: [
      "Spreads can widen significantly",
      "Bonus terms restrictive",
      "US traders not accepted",
    ],
  },

  faqs: [
    {
      question: "Does XM accept US clients?",
      answer: "No, XM does not accept clients from the United States. US traders seeking offshore brokers should consider alternatives like MidasFX or Hankotrade which do accept US clients.",
    },
    {
      question: "What is the minimum deposit at XM?",
      answer: "XM has one of the lowest minimum deposits in the industry at just $5 for Micro, Standard, and Ultra Low accounts. This makes it very accessible for beginners.",
    },
    {
      question: "What leverage does XM offer?",
      answer: "XM offers leverage up to 1:1000 on its offshore entity. For EU clients under CySEC regulation, leverage is capped at 1:30 for retail traders as per ESMA regulations.",
    },
    {
      question: "Is XM regulated and safe?",
      answer: "Yes, XM is regulated by multiple authorities including CySEC (Cyprus), ASIC (Australia), and FSC (Belize). They've been operating since 2009 and have negative balance protection.",
    },
    {
      question: "Does XM offer bonuses?",
      answer: "Yes, XM is known for generous bonuses including welcome bonuses and loyalty programs. Bonus terms and availability vary by region - check their website for current offers.",
    },
    {
      question: "What payment methods does XM accept?",
      answer: "XM accepts a wide range of payment methods including credit/debit cards, bank wire, Skrill, Neteller, and various local payment methods. Deposits and withdrawals are free.",
    },
  ],

  pros: [
    "Multi-regulated (CySEC, ASIC, FSC)",
    "Very low minimum deposit ($5)",
    "No deposit/withdrawal fees",
    "Generous bonuses and promotions",
    "24/5 multilingual support",
    "Turkish language fully supported",
    "Free educational webinars",
    "Negative balance protection",
    "Ultra-low spread accounts available",
    "Established since 2009",
    "Over 5 million clients worldwide",
  ],

  cons: [
    "US clients NOT accepted",
    "Mixed Trustpilot reviews (3.8/5)",
    "Spreads wider than ECN brokers",
    "Limited cryptocurrency trading",
    "Inactivity fee after 90 days",
  ],

  bonusOffers,
  lastUpdated: "2026-02-14",
};
