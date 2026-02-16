import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const oandaData: BrokerReviewData = {
  brokerId: "oanda",
  brokerName: "OANDA",
  subtitle: "CFTC-Regulated Broker for US Traders",
  heroDescription:
    "OANDA is a well-established, CFTC-regulated forex broker founded in 1996. Known for its innovative trading platform and <strong>$0 minimum deposit</strong>, OANDA offers a safe and accessible trading environment for American traders, though with CFTC-mandated leverage limits.",

  seoTitle: "OANDA Review 2026",
  seoDescription:
    "Complete OANDA review for US traders. CFTC-regulated broker with $0 minimum deposit, 1:50 leverage, and excellent trading platform. Perfect for beginners and experienced traders.",
  canonical: "/review/oanda",

  overallRating: 4.0,
  ratingCount: 13200,
  reviewCount: 6500,
  trustScore: 92,
  trustpilotRating: 4.1,
  trustpilotReviews: 1185,

  heroBadge: {
    icon: Shield,
    text: "CFTC Regulated",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$0",
    maxLeverage: "1:50",
    spreadFrom: "1.0 pips",
    usClients: "YES",
  },

  warningBanner: {
    text: "Regulated by NFA/CFTC. Lower leverage (1:50 max) but full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC Regulated" },
    { icon: Globe, text: "$0 Min Deposit" },
    { icon: Zap, text: "1:50 Leverage" },
    { icon: Award, text: "Since 1996" },
  ],

  quickStats: [
    { label: "Founded", value: "1996" },
    { label: "Headquarters", value: "New York, USA" },
    { label: "Regulation", value: "CFTC, NFA" },
    { label: "Min Deposit", value: "$0", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:50", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.1, description: "Solid variable spreads with market execution" },
    { label: "Platform & Tools", score: 4.2, description: "Excellent proprietary platform alongside MT4" },
    { label: "Customer Support", score: 3.9, description: "Helpful US-based support with reasonable response times" },
    { label: "Deposit & Withdrawal", score: 4.0, description: "Free ACH and wire transfers with fast processing" },
    { label: "Educational Resources", score: 4.0, description: "Comprehensive learning materials for all skill levels" },
  ],

  accountTypes: [
    {
      name: "Standard Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 1.0 pips",
      commission: "No",
      popular: true,
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Apply Online", description: "Complete the online application form with personal and financial information", icon: UserPlus, time: "5 min" },
    { step: 2, title: "Verify Identity", description: "Upload government-issued ID and proof of address for verification", icon: FileText, time: "1-2 days" },
    { step: 3, title: "Fund Account", description: "Deposit via ACH transfer, bank wire, or debit card -- no minimum required", icon: CreditCard, time: "1-3 days" },
    { step: 4, title: "Start Trading", description: "Access the OANDA platform or MT4 and begin trading forex", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "Bank Wire", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "ACH Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Check", deposit: "N/A", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "Forex.com", id: "forexcom" },
    { name: "tastyfx", id: "tastyfx" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$0", competitor1: "$100", competitor2: "$0" },
    { feature: "Max Leverage", broker: "1:50", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "1.0 pips", competitor1: "0.8 pips", competitor2: "0.8 pips" },
    { feature: "Platforms", broker: "OANDA, MT4", competitor1: "MT4/MT5, Proprietary", competitor2: "Proprietary" },
    { feature: "US Clients", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, NFA", competitor1: "CFTC, NFA", competitor2: "CFTC, NFA" },
    { feature: "Founded", broker: "1996", competitor1: "2001", competitor2: "2019" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Most professional, stable and trustworthy broker since 2008",
      "Easy onboarding and beginner-friendly app similar to TradingView",
      "98/100 Trust Score with three tier-1 regulators",
      "No minimum deposit and excellent $0 entry barrier",
    ],
    negativeThemes: [
      "Forex trading costs are generally steep with high effective spreads",
      "Finance charges can be significant for position traders",
      "FIFO rule limits hedging capabilities",
      "Limited to 1:50 leverage due to US regulations",
    ],
  },

  faqs: [
    {
      question: "Is OANDA regulated in the US?",
      answer: "Yes, OANDA is fully regulated by the Commodity Futures Trading Commission (CFTC) and is a member of the National Futures Association (NFA), providing maximum protection for US traders.",
    },
    {
      question: "What is the minimum deposit for OANDA?",
      answer: "OANDA has no minimum deposit requirement. You can start trading with any amount, making it one of the most accessible US-regulated forex brokers.",
    },
    {
      question: "Does OANDA accept US clients?",
      answer: "Yes, OANDA is one of the few forex brokers that fully accepts US clients under CFTC/NFA regulation.",
    },
    {
      question: "What platforms does OANDA offer?",
      answer: "OANDA offers its proprietary trading platform (web, desktop, and mobile) as well as MetaTrader 4 (MT4) for US clients.",
    },
    {
      question: "What is the maximum leverage at OANDA for US clients?",
      answer: "US clients are limited to 1:50 leverage on major currency pairs, as mandated by CFTC regulations. This applies to all US-regulated forex brokers.",
    },
    {
      question: "Does OANDA charge withdrawal fees?",
      answer: "No, OANDA does not charge withdrawal fees. Bank wire, ACH transfer, and card withdrawals are all free of charge.",
    },
  ],

  pros: [
    "CFTC and NFA regulated - maximum protection",
    "No minimum deposit requirement",
    "Strong reputation since 1996",
    "Excellent proprietary trading platform",
    "MT4 also available",
    "Fast withdrawal processing",
    "Negative balance protection",
    "Segregated client accounts",
    "Good customer support",
    "Comprehensive educational resources",
  ],

  cons: [
    "Limited leverage (1:50 maximum due to CFTC)",
    "FIFO rule required (can't hedge easily)",
    "Higher spreads than some competitors",
    "No cryptocurrency deposit options",
    "No high leverage options",
  ],

  lastUpdated: "2026-02-14",
};
