import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const tastyfxData: BrokerReviewData = {
  brokerId: "tastyfx",
  brokerName: "tastyfx",
  subtitle: "CFTC/NFA Regulated US Forex Broker",
  heroDescription:
    "tastyfx is a CFTC and NFA regulated forex broker offering US traders a legally compliant way to trade forex. Part of the <strong>IG Group</strong>, tastyfx combines institutional-grade technology with competitive pricing and award-winning customer service. Named <strong>#1 US Broker for 2026</strong> by ForexBrokers.com.",

  seoTitle: "tastyfx Review 2026 - Best US Forex Broker | CFTC Regulated",
  seoDescription:
    "Complete tastyfx review for US traders. CFTC/NFA regulated forex broker with award-winning platform, 80+ pairs, $0 minimum deposit. ForexBrokers.com #1 US Broker 2026.",
  canonical: "/review/tastyfx",

  overallRating: 4.5,
  ratingCount: 8200,
  reviewCount: 4000,
  trustScore: 93,
  trustpilotRating: 4.0,
  trustpilotReviews: 200,

  heroBadge: {
    icon: Award,
    text: "Best US Broker 2026",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$0",
    maxLeverage: "1:50",
    spreadFrom: "0.2 pips",
    usClients: "YES",
  },

  warningBanner: {
    text: "Regulated by NFA/CFTC. Lower leverage (1:50 max) but full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC/NFA Regulated" },
    { icon: Globe, text: "$0 Min Deposit" },
    { icon: Zap, text: "80+ Forex Pairs" },
    { icon: Award, text: "#1 US Broker 2026" },
  ],

  quickStats: [
    { label: "Founded", value: "2019 (as IG US)" },
    { label: "Headquarters", value: "Chicago, USA" },
    { label: "Regulation", value: "CFTC/NFA", colorClass: "text-success" },
    { label: "Min Deposit", value: "$0", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:50" },
    { label: "Parent Company", value: "IG Group" },
    { label: "US Clients", value: "Regulated", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.6, description: "Tightest spreads among US-regulated brokers from 0.2 pips" },
    { label: "Platform & Tools", score: 4.8, description: "Award-winning proprietary platform with advanced charting" },
    { label: "Customer Support", score: 4.5, description: "Chicago-based support with excellent responsiveness" },
    { label: "Deposit & Withdrawal", score: 4.7, description: "Free deposits and same-day withdrawals to US bank accounts" },
    { label: "Educational Resources", score: 4.3, description: "Good educational content with market research integration" },
  ],

  accountTypes: [
    {
      name: "Standard Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.8 pips",
      commission: "No",
    },
    {
      name: "Mini Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 1.0 pips",
      commission: "No",
      popular: true,
    },
    {
      name: "Commission Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.2 pips",
      commission: "$5 per 100K",
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Apply Online", description: "Complete the tastyfx online application with personal and financial information", icon: UserPlus, time: "5 min" },
    { step: 2, title: "Verify Identity", description: "Submit your ID for verification as required by CFTC/NFA regulations", icon: FileText, time: "1-2 days" },
    { step: 3, title: "Fund Account", description: "Deposit via bank wire, ACH transfer, or debit card -- no minimum required", icon: CreditCard, time: "1-3 days" },
    { step: 4, title: "Start Trading", description: "Access the tastyfx platform on desktop, web, or mobile and begin trading 80+ pairs", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "ACH Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "Debit Card", deposit: "Free", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "OANDA", id: "oanda" },
    { name: "Forex.com", id: "forexcom" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$0", competitor1: "$0", competitor2: "$100" },
    { feature: "Max Leverage", broker: "1:50", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "0.2 pips", competitor1: "1.0 pips", competitor2: "0.8 pips" },
    { feature: "Platform", broker: "Proprietary", competitor1: "OANDA, MT4", competitor2: "MT4/MT5, Proprietary" },
    { feature: "US Clients", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, NFA", competitor1: "CFTC, NFA", competitor2: "CFTC, NFA" },
    { feature: "Our Rating", broker: "4.5/5", competitor1: "4.0/5", competitor2: "3.8/5" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Tightest spreads among US-regulated brokers (0.2 pips EUR/USD)",
      "Clean, modern platform from the tastytrade team",
      "$0 minimum deposit to start trading",
      "Excellent educational content integration",
    ],
    negativeThemes: [
      "Newer brand -- less established track record than competitors",
      "Limited currency pairs compared to IG or OANDA",
      "No MetaTrader 4/5 support -- proprietary platform only",
      "Mobile app still maturing compared to desktop",
    ],
  },

  faqs: [
    {
      question: "Is tastyfx regulated in the US?",
      answer: "Yes, tastyfx is fully regulated by the CFTC (Commodity Futures Trading Commission) and is a member of the NFA (National Futures Association, Member #0509630). It is one of the few brokers legally authorized to offer forex trading to US residents.",
    },
    {
      question: "What is the minimum deposit for tastyfx?",
      answer: "tastyfx has no minimum deposit requirement. You can open an account and start trading with any amount, making it highly accessible for beginner traders.",
    },
    {
      question: "Who owns tastyfx?",
      answer: "tastyfx is owned by IG Group, a publicly traded company (LSE: IGG) with over 45 years in the financial industry. This provides strong financial backing and institutional-grade technology.",
    },
    {
      question: "Does tastyfx support MetaTrader?",
      answer: "No, tastyfx does not offer MetaTrader 4 or MetaTrader 5. It uses its own proprietary trading platform, which has been designed specifically for forex trading with professional-grade charting and analysis tools.",
    },
    {
      question: "What spreads does tastyfx offer?",
      answer: "tastyfx offers spreads starting from 0.2 pips on the Commission Account. The Standard Account starts from 0.8 pips with no commission, and the Mini Account starts from 1.0 pips.",
    },
    {
      question: "Can I use tastyfx for algo trading?",
      answer: "Yes, tastyfx offers REST API access for algorithmic trading, allowing you to build custom trading bots and integrate with your existing trading systems.",
    },
  ],

  pros: [
    "CFTC/NFA regulated - full US legal protection",
    "No minimum deposit requirement",
    "Award-winning proprietary trading platform",
    "Excellent charting and technical analysis tools",
    "80+ forex pairs available",
    "Same-day withdrawals to US bank accounts",
    "Chicago-based customer support",
    "Strong educational resources and market research",
    "Part of IG Group - financially stable parent company",
    "ForexBrokers.com #1 US Broker 2026 award",
  ],

  cons: [
    "Maximum leverage limited to 1:50 (US regulation)",
    "No cryptocurrency trading available",
    "No MT4/MT5 platform support",
    "Higher spreads compared to offshore brokers",
    "FIFO rule applies (no hedging)",
  ],

  lastUpdated: "2026-02-14",
};
