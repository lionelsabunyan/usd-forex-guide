import { Shield, Globe, Zap, Star, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const pepperstoneData: BrokerReviewData = {
  brokerId: "pepperstone",
  brokerName: "Pepperstone",
  subtitle: "Multi-Regulated Since 2010",
  heroDescription:
    "Pepperstone is an award-winning forex and CFD broker regulated by top-tier authorities including FCA and ASIC. Known for razor-sharp spreads, lightning-fast execution, and excellent platform variety including cTrader and TradingView integration.",

  seoTitle: "Pepperstone Review 2026 - Award-Winning Multi-Regulated Broker",
  seoDescription:
    "Complete Pepperstone review. Award-winning Australian broker with FCA, ASIC, CySEC regulation. Raw spreads from 0.0 pips, MT4/MT5/cTrader platforms.",
  canonical: "/review/pepperstone",

  overallRating: 4.6,
  ratingCount: 19500,
  reviewCount: 9800,
  trustScore: 93,
  trustpilotRating: 4.4,
  trustpilotReviews: 2800,

  heroBadge: {
    icon: Shield,
    text: "Trust Score: 93/100",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$200",
    maxLeverage: "1:500",
    spreadFrom: "0.0 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "Pepperstone does not accept US clients. CFDs are complex instruments. 74-89% of retail investor accounts lose money when trading CFDs.",
  },

  trustFeatures: [
    { icon: Shield, text: "FCA & ASIC Regulated" },
    { icon: Zap, text: "30ms Execution" },
    { icon: Globe, text: "cTrader Available" },
    { icon: Star, text: "Award Winner" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.4/5", colorClass: "text-success" },
    { label: "Established", value: "2010" },
    { label: "Regulation", value: "FCA, ASIC, CySEC" },
    { label: "Min Deposit", value: "$200", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:500", colorClass: "text-primary" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-destructive" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.7, description: "Raw spreads from 0.0" },
    { label: "Platform & Tools", score: 4.8, description: "MT4, MT5, cTrader" },
    { label: "Customer Support", score: 4.5, description: "24/5 support" },
    { label: "Deposit & Withdrawal", score: 4.5, description: "Fast processing" },
    { label: "Trust & Reputation", score: 4.8, description: "Multi-regulated" },
  ],

  accountTypes: [
    { name: "Standard", minDeposit: "$200", leverage: "1:500", spread: "From 1.0 pips", commission: "No" },
    { name: "Razor", minDeposit: "$200", leverage: "1:500", spread: "From 0.0 pips", commission: "$3.5/lot", popular: true },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit Pepperstone", description: "Click our link to access the official Pepperstone registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Complete the online application with your personal information.", icon: UserPlus, time: "5 minutes" },
    { step: 3, title: "Verify Identity", description: "Upload ID and proof of address. Verification usually takes 1-2 business days.", icon: FileText, time: "1-2 days" },
    { step: 4, title: "Fund Account", description: "Deposit funds via bank transfer, card, or e-wallet. Min $200 for all accounts.", icon: Wallet, time: "Instant-3 days" },
    { step: 5, title: "Start Trading", description: "Download your preferred platform and start trading with award-winning conditions!", icon: PlayCircle, time: "5 minutes" },
  ],

  paymentMethods: [
    { method: "Bank Transfer", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Visa/Mastercard", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "PayPal", deposit: "Free", withdrawal: "Free", fee: "Free", recommended: true },
    { method: "Skrill", deposit: "Free", withdrawal: "Free", fee: "Free" },
    { method: "Neteller", deposit: "Free", withdrawal: "Free", fee: "Free" },
  ],

  competitors: [
    { name: "Exness", id: "exness" },
    { name: "XM", id: "xm" },
  ],

  competitorComparison: [
    { feature: "Trustpilot Rating", broker: "4.4/5", competitor1: "4.8/5", competitor2: "3.8/5" },
    { feature: "Min Deposit", broker: "$200", competitor1: "$10", competitor2: "$5" },
    { feature: "Max Leverage", broker: "1:500", competitor1: "1:2000", competitor2: "1:1000" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.6 pips" },
    { feature: "Regulation", broker: "FCA, ASIC, CySEC", competitor1: "FCA, CySEC", competitor2: "CySEC, ASIC" },
    { feature: "cTrader", broker: "Yes", competitor1: "No", competitor2: "No" },
    { feature: "Execution Speed", broker: "30ms", competitor1: "Standard", competitor2: "Standard" },
    { feature: "US Clients", broker: "No", competitor1: "No", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Excellent execution speed",
      "Raw spreads highly praised",
      "Great platform selection",
      "Professional customer service",
      "Reliable and trustworthy",
    ],
    negativeThemes: [
      "Spreads widen during news",
      "US traders cannot access",
      "Some withdrawal delays reported",
    ],
  },

  faqs: [
    {
      question: "Is Pepperstone a regulated broker?",
      answer: "Yes, Pepperstone is one of the most heavily regulated brokers in the industry. They hold licenses from the Financial Conduct Authority (FCA) in the UK, Australian Securities and Investments Commission (ASIC), Cyprus Securities and Exchange Commission (CySEC), and Dubai Financial Services Authority (DFSA).",
    },
    {
      question: "Does Pepperstone accept US clients?",
      answer: "No, Pepperstone does not accept clients from the United States due to US regulatory restrictions. US traders should look at regulated US brokers like OANDA, Forex.com, or offshore options that accept US clients.",
    },
    {
      question: "What platforms does Pepperstone offer?",
      answer: "Pepperstone offers an excellent selection of trading platforms including MetaTrader 4 (MT4), MetaTrader 5 (MT5), cTrader, and TradingView integration. This variety makes Pepperstone one of the best choices for traders who value platform flexibility.",
    },
    {
      question: "What is the minimum deposit for Pepperstone?",
      answer: "The minimum deposit for both Standard and Razor accounts at Pepperstone is $200. While this is higher than some competitors, Pepperstone's superior trading conditions and platform variety justify the higher entry point.",
    },
    {
      question: "How fast is Pepperstone's execution?",
      answer: "Pepperstone is known for lightning-fast execution with an average execution speed of 30 milliseconds. They operate as a true ECN broker with no dealing desk intervention, ensuring your trades are executed at the best available prices.",
    },
    {
      question: "Does Pepperstone offer a free VPS?",
      answer: "Yes, Pepperstone offers a free Virtual Private Server (VPS) to qualified traders who meet certain trading volume requirements. This is excellent for traders using Expert Advisors (EAs) who need 24/7 connectivity.",
    },
  ],

  pros: [
    "Multi-regulated (FCA, ASIC, CySEC, DFSA)",
    "Award-winning broker (Best Forex Broker 2024)",
    "Excellent platform variety (MT4, MT5, cTrader, TradingView)",
    "Raw spreads from 0.0 pips",
    "Fast execution speed (avg 30ms)",
    "Turkish language support",
    "No dealing desk - true ECN",
    "Negative balance protection",
    "Free VPS for qualified traders",
  ],

  cons: [
    "US clients NOT accepted",
    "Higher minimum deposit ($200)",
    "Inactivity fee after 12 months",
    "Limited cryptocurrency selection",
  ],

  lastUpdated: "2026-02-14",
};
