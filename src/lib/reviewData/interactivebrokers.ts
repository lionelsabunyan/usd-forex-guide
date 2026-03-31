import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const interactivebrokersData: BrokerReviewData = {
  brokerId: "interactivebrokers",
  brokerName: "Interactive Brokers",
  subtitle: "Professional Trading Platform for US Traders",
  heroDescription:
    "Interactive Brokers (IB) is a leading US-regulated broker founded in 1978 and an <strong>S&P 500 company</strong> since August 2025, offering advanced trading platforms and <strong>multi-asset access</strong> across 150+ global markets. IB provides forex trading on 100+ currency pairs with competitive raw spreads from 0.2 pips and professional-grade tools.",

  seoTitle: "Interactive Brokers Review 2026",
  seoDescription:
    "Interactive Brokers review for US traders. CFTC/SEC-regulated S&P 500 broker with $0 minimum, competitive spreads, and advanced trading platform.",
  canonical: "/review/interactive-brokers",

  overallRating: 3.7,
  ratingCount: 10500,
  reviewCount: 5200,
  trustScore: 90,
  trustpilotRating: 3.6,
  trustpilotReviews: 5153,

  heroBadge: {
    icon: Award,
    text: "Multi-Asset Platform",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$100",
    maxLeverage: "1:30",
    spreadFrom: "0.2 pips",
    usClients: "YES",
  },

  warningBanner: {
    text: "Regulated by CFTC/SEC/FINRA. S&P 500 company. CFTC leverage limits (1:30 retail) with full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC/SEC Regulated" },
    { icon: Globe, text: "$0 Min Deposit" },
    { icon: Zap, text: "Multi-Asset" },
    { icon: Award, text: "S&P 500 Company" },
  ],

  quickStats: [
    { label: "Founded", value: "1978" },
    { label: "Headquarters", value: "Connecticut, USA" },
    { label: "Regulation", value: "CFTC, SEC, FINRA" },
    { label: "Min Deposit", value: "$100", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:30", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.8, description: "Raw spreads from 0.2 pips on EUR/USD with direct market access and commission-based pricing" },
    { label: "Platform & Tools", score: 4.2, description: "Extremely powerful TWS platform for advanced traders" },
    { label: "Customer Support", score: 3.5, description: "Support available but can be slow during peak hours" },
    { label: "Deposit & Withdrawal", score: 3.6, description: "Free ACH and wire transfers with standard processing" },
    { label: "Educational Resources", score: 3.4, description: "Traders Academy and webinars available but focused on equities" },
  ],

  accountTypes: [
    {
      name: "Individual Account",
      minDeposit: "$100",
      leverage: "1:30",
      spread: "From 0.2 pips",
      commission: "Variable",
      popular: true,
    },
    {
      name: "IRA Account",
      minDeposit: "$100",
      leverage: "1:30",
      spread: "From 0.2 pips",
      commission: "Variable",
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Apply Online", description: "Complete the comprehensive online application with personal, financial, and trading experience details", icon: UserPlus, time: "10 min" },
    { step: 2, title: "Verify Identity", description: "Upload government-issued ID and complete the identity verification process", icon: FileText, time: "1-3 days" },
    { step: 3, title: "Fund Account", description: "Deposit funds via ACH transfer or bank wire -- no minimum deposit required", icon: CreditCard, time: "1-2 days" },
    { step: 4, title: "Start Trading", description: "Download TWS (Trader Workstation) or use the web-based Client Portal to begin trading", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "Bank Wire", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "ACH Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Check", deposit: "N/A", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "Charles Schwab", id: "charlesschwab" },
    { name: "OANDA", id: "oanda" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$0", competitor1: "$0", competitor2: "$0" },
    { feature: "Max Leverage", broker: "1:30", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "0.2 pips", competitor1: "Variable", competitor2: "1.0 pips" },
    { feature: "Platforms", broker: "TWS, Client Portal", competitor1: "thinkorswim", competitor2: "OANDA, MT4" },
    { feature: "US Clients", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, SEC, FINRA", competitor1: "CFTC, NFA, SEC, FINRA", competitor2: "CFTC, NFA" },
    { feature: "Asset Classes", broker: "Multi-Asset", competitor1: "Multi-Asset", competitor2: "Forex Focus" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Lowest margin rates in the industry for larger accounts",
      "Access to 150+ global markets from one account",
      "TWS platform is extremely powerful once you learn it",
      "Excellent for algorithmic and API trading",
    ],
    negativeThemes: [
      "TWS has a steep learning curve for beginners",
      "Customer support can be slow during peak hours",
      "Interface feels dated compared to newer platforms",
      "Account verification process can be lengthy",
    ],
  },

  faqs: [
    {
      question: "Does Interactive Brokers accept US clients?",
      answer:
        "Yes, Interactive Brokers is fully available to US clients and is one of the most regulated brokers in the world. It is registered with the CFTC, SEC, and is publicly traded on NASDAQ (IBKR). US traders get access to forex, stocks, options, futures, and more from a single account with full regulatory protection.",
    },
    {
      question: "Is Interactive Brokers good for forex trading?",
      answer: "Interactive Brokers offers competitive forex raw spreads from 0.2 pips on EUR/USD with direct market access across 100+ currency pairs. However, it is primarily known for stocks and options trading. If you are a forex-only trader, a dedicated forex broker like OANDA or tastyfx may be a better fit.",
    },
    {
      question: "What is the minimum deposit for Interactive Brokers?",
      answer: "Interactive Brokers has no minimum deposit requirement. You can open an account and start trading with any amount, making it accessible for all traders.",
    },
    {
      question: "Is Interactive Brokers regulated in the US?",
      answer: "Yes, Interactive Brokers is regulated by the CFTC, SEC, and FINRA in the United States. It is publicly traded on NASDAQ (ticker: IBKR) and joined the S&P 500 index in August 2025, providing additional transparency and financial strength.",
    },
    {
      question: "What platforms does Interactive Brokers offer?",
      answer: "Interactive Brokers offers TWS (Trader Workstation) as its primary desktop platform, along with a web-based Client Portal and mobile apps. TWS is extremely powerful but has a steep learning curve.",
    },
    {
      question: "Can I trade multiple asset classes with Interactive Brokers?",
      answer: "Yes, Interactive Brokers offers access to forex, stocks, options, futures, bonds, and cryptocurrency from a single account across 150+ global markets.",
    },
    {
      question: "Does Interactive Brokers offer IRA accounts?",
      answer: "Yes, Interactive Brokers offers IRA accounts (Traditional, Roth, SEP, and SIMPLE) that can be used for forex and multi-asset trading with tax advantages.",
    },
  ],

  pros: [
    "CFTC and SEC regulated - maximum protection",
    "No minimum deposit requirement",
    "Multi-asset trading platform",
    "Advanced TWS platform",
    "Low forex spreads from 0.2 pips",
    "Direct market access",
    "S&P 500 company since August 2025",
    "Negative balance protection",
    "Segregated client accounts",
    "IRA account options",
  ],

  cons: [
    "Complex platform - steep learning curve",
    "Limited leverage (1:30 CFTC retail limit)",
    "Commission structure can be confusing",
    "Not ideal for forex-only traders",
    "Customer support response times vary",
  ],

  lastUpdated: "2026-03-31",  // Updated: Min deposit $0→$100, leverage 1:50→1:30
};
