import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const forexcomData: BrokerReviewData = {
  brokerId: "forexcom",
  brokerName: "Forex.com",
  subtitle: "CFTC-Regulated Broker for US Traders",
  heroDescription:
    "Forex.com is a well-established, CFTC-regulated forex broker founded in 2001. As one of the largest US-regulated forex brokers, it offers a <strong>safe and secure trading environment</strong> for American traders with excellent educational resources and MT4/MT5 platform support.",

  seoTitle: "Forex.com Review 2026",
  seoDescription:
    "Complete Forex.com review for US traders. CFTC-regulated broker with $100 minimum deposit, 1:50 leverage, and excellent educational resources. Perfect for US traders seeking regulation.",
  canonical: "/review/forexcom",

  overallRating: 3.8,
  ratingCount: 12800,
  reviewCount: 6300,
  trustScore: 89,
  trustpilotRating: 4.7,
  trustpilotReviews: 2247,

  heroBadge: {
    icon: Shield,
    text: "CFTC Regulated",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$100",
    maxLeverage: "1:50",
    spreadFrom: "0.8 pips",
    usClients: "YES",
  },

  warningBanner: {
    text: "Regulated by NFA/CFTC. Lower leverage (1:50 max) but full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC Regulated" },
    { icon: Globe, text: "$100 Min Deposit" },
    { icon: Zap, text: "0.8 Pips Spread" },
    { icon: Award, text: "Since 2001" },
  ],

  quickStats: [
    { label: "Founded", value: "2001" },
    { label: "Headquarters", value: "New Jersey, USA" },
    { label: "Regulation", value: "CFTC, NFA" },
    { label: "Min Deposit", value: "$100", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:50", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.9, description: "Competitive spreads from 0.8 pips with market execution" },
    { label: "Platform & Tools", score: 4.0, description: "MT4/MT5 and proprietary platform options" },
    { label: "Customer Support", score: 3.7, description: "USA-based support with friendly and thorough representatives" },
    { label: "Deposit & Withdrawal", score: 3.8, description: "Free deposits with standard processing via ACH, wire, and card" },
    { label: "Educational Resources", score: 4.1, description: "Excellent educational content and research tools" },
  ],

  accountTypes: [
    {
      name: "Standard Account",
      minDeposit: "$100",
      leverage: "1:50",
      spread: "From 1.0 pips",
      commission: "No",
      popular: true,
    },
    {
      name: "Commission Account",
      minDeposit: "$100",
      leverage: "1:50",
      spread: "From 0.8 pips",
      commission: "$5 per lot",
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Register Online", description: "Complete the online registration form with your personal and financial details", icon: UserPlus, time: "5 min" },
    { step: 2, title: "Verify Identity", description: "Upload your government-issued ID and proof of address for KYC compliance", icon: FileText, time: "1-2 days" },
    { step: 3, title: "Fund Account", description: "Deposit a minimum of $100 via ACH, bank wire, or credit/debit card", icon: CreditCard, time: "1-3 days" },
    { step: 4, title: "Start Trading", description: "Choose MT4, MT5, or the Forex.com proprietary platform and start trading", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "Bank Wire", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "ACH Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Check", deposit: "N/A", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "OANDA", id: "oanda" },
    { name: "tastyfx", id: "tastyfx" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$100", competitor1: "$0", competitor2: "$0" },
    { feature: "Max Leverage", broker: "1:50", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "0.8 pips", competitor1: "1.0 pips", competitor2: "0.2 pips" },
    { feature: "Platforms", broker: "MT4/MT5, Proprietary", competitor1: "OANDA, MT4", competitor2: "Proprietary" },
    { feature: "US Clients", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, NFA", competitor1: "CFTC, NFA", competitor2: "CFTC, NFA" },
    { feature: "Founded", broker: "2001", competitor1: "1996", competitor2: "2019" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Transparent cost structure with competitive low spreads",
      "USA-based customer support that is friendly and thorough",
      "Robust trading tools and educational resources",
      "High Trustpilot rating (4.7/5) with 2,247+ reviews",
    ],
    negativeThemes: [
      "Spreads can widen during volatile market conditions",
      "Platform countdown clock issues reported by some users",
      "Higher minimum deposit ($100) compared to OANDA and tastyfx",
      "Limited cryptocurrency deposit options",
    ],
  },

  faqs: [
    {
      question: "Is Forex.com regulated in the US?",
      answer: "Yes, Forex.com is fully regulated by the Commodity Futures Trading Commission (CFTC) and is a member of the National Futures Association (NFA). It is one of the most established US-regulated forex brokers, operating since 2001.",
    },
    {
      question: "What is the minimum deposit for Forex.com?",
      answer: "The minimum deposit for Forex.com is $100 for both Standard and Commission account types. This applies to deposits via ACH, bank wire, and credit/debit card.",
    },
    {
      question: "Does Forex.com accept US clients?",
      answer: "Yes, Forex.com fully accepts US clients and is one of the few brokers specifically designed for the US market with full CFTC/NFA regulation.",
    },
    {
      question: "What platforms does Forex.com offer?",
      answer: "Forex.com offers MetaTrader 4 (MT4), MetaTrader 5 (MT5), and its own proprietary trading platform. All platforms are available on desktop, web, and mobile.",
    },
    {
      question: "What is the maximum leverage at Forex.com?",
      answer: "US clients are limited to 1:50 leverage on major currency pairs, as mandated by CFTC regulations. This applies to all CFTC-regulated forex brokers in the United States.",
    },
    {
      question: "Does Forex.com offer educational resources?",
      answer: "Yes, Forex.com provides comprehensive educational resources including trading courses, webinars, market analysis, economic calendars, and trading signals to help traders at all levels.",
    },
  ],

  pros: [
    "CFTC and NFA regulated - maximum protection",
    "Accepts US clients without restrictions",
    "Strong reputation since 2001",
    "Excellent educational resources",
    "User-friendly platforms (MT4/MT5)",
    "Fast withdrawal processing",
    "Negative balance protection",
    "Segregated client accounts",
    "Good customer support",
    "No minimum deposit on some accounts",
  ],

  cons: [
    "Limited leverage (1:50 maximum due to CFTC)",
    "FIFO rule required (can't hedge easily)",
    "Higher spreads than offshore brokers",
    "Limited cryptocurrency deposit options",
    "No high leverage options",
  ],

  lastUpdated: "2026-02-14",
};
