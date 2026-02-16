import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const interactivebrokersData: BrokerReviewData = {
  brokerId: "interactivebrokers",
  brokerName: "Interactive Brokers",
  subtitle: "Professional Trading Platform for US Traders",
  heroDescription:
    "Interactive Brokers (IB) is a leading US-regulated broker founded in 1978, offering advanced trading platforms and <strong>multi-asset access</strong>. While primarily known for stocks and options, IB also provides forex trading with competitive spreads and professional-grade tools.",

  seoTitle: "Interactive Brokers Review 2026",
  seoDescription:
    "Complete Interactive Brokers review for US traders. CFTC-regulated broker with $0 minimum deposit, 1:50 leverage, and professional trading platform. Ideal for serious traders.",
  canonical: "/review/interactive-brokers",

  overallRating: 3.7,
  ratingCount: 10500,
  reviewCount: 5200,
  trustScore: 90,
  trustpilotRating: 3.2,
  trustpilotReviews: 5069,

  heroBadge: {
    icon: Award,
    text: "Multi-Asset Platform",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$0",
    maxLeverage: "1:50",
    spreadFrom: "0.5 pips",
    usClients: "YES",
  },

  warningBanner: {
    text: "Regulated by NFA/CFTC. Lower leverage (1:50 max) but full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC Regulated" },
    { icon: Globe, text: "$0 Min Deposit" },
    { icon: Zap, text: "Multi-Asset" },
    { icon: Award, text: "Since 1978" },
  ],

  quickStats: [
    { label: "Founded", value: "1978" },
    { label: "Headquarters", value: "Connecticut, USA" },
    { label: "Regulation", value: "CFTC, SEC" },
    { label: "Min Deposit", value: "$0", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:50", colorClass: "text-primary" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.8, description: "Low spreads from 0.5 pips with direct market access" },
    { label: "Platform & Tools", score: 4.2, description: "Extremely powerful TWS platform for advanced traders" },
    { label: "Customer Support", score: 3.5, description: "Support available but can be slow during peak hours" },
    { label: "Deposit & Withdrawal", score: 3.6, description: "Free ACH and wire transfers with standard processing" },
    { label: "Educational Resources", score: 3.4, description: "Traders Academy and webinars available but focused on equities" },
  ],

  accountTypes: [
    {
      name: "Individual Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.5 pips",
      commission: "Variable",
      popular: true,
    },
    {
      name: "IRA Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "From 0.5 pips",
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
    { feature: "Max Leverage", broker: "1:50", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "0.5 pips", competitor1: "Variable", competitor2: "1.0 pips" },
    { feature: "Platforms", broker: "TWS, Client Portal", competitor1: "thinkorswim", competitor2: "OANDA, MT4" },
    { feature: "US Clients", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, SEC", competitor1: "CFTC, NFA, SEC, FINRA", competitor2: "CFTC, NFA" },
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
      question: "Is Interactive Brokers good for forex trading?",
      answer: "Interactive Brokers offers competitive forex spreads from 0.5 pips with direct market access. However, it is primarily known for stocks and options trading. If you are a forex-only trader, a dedicated forex broker like OANDA or tastyfx may be a better fit.",
    },
    {
      question: "What is the minimum deposit for Interactive Brokers?",
      answer: "Interactive Brokers has no minimum deposit requirement. You can open an account and start trading with any amount, making it accessible for all traders.",
    },
    {
      question: "Is Interactive Brokers regulated in the US?",
      answer: "Yes, Interactive Brokers is regulated by the CFTC and SEC in the United States. It is also publicly traded on NASDAQ (ticker: IBKR), providing additional transparency.",
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
    "Low forex spreads",
    "Direct market access",
    "Strong reputation since 1978",
    "Negative balance protection",
    "Segregated client accounts",
    "IRA account options",
  ],

  cons: [
    "Complex platform - steep learning curve",
    "Limited leverage (1:50 CFTC limit)",
    "Commission structure can be confusing",
    "Not ideal for forex-only traders",
    "Customer support response times vary",
  ],

  lastUpdated: "2026-02-14",
};
