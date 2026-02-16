import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const charlesschwabData: BrokerReviewData = {
  brokerId: "charlesschwab",
  brokerName: "Charles Schwab",
  subtitle: "Forex Trading with thinkorswim Platform",
  heroDescription:
    "Charles Schwab is America's most trusted brokerage, now offering forex trading through the powerful <strong>thinkorswim platform</strong> acquired from TD Ameritrade. With full CFTC/NFA regulation, $0 minimum deposit, and award-winning research tools, Schwab is the gold standard for US forex traders seeking security and advanced trading capabilities.",

  seoTitle: "Charles Schwab Forex Review 2026 | thinkorswim Trading Platform",
  seoDescription:
    "Complete Charles Schwab forex review for US traders. Explore thinkorswim platform features, trading conditions, and why Schwab earned #1 Overall Broker 2026. CFTC/NFA regulated with 36.5M clients.",
  canonical: "/review/charles-schwab",

  overallRating: 4.4,
  ratingCount: 9500,
  reviewCount: 4700,
  trustScore: 95,
  trustpilotRating: 1.5,
  trustpilotReviews: 500,

  heroBadge: {
    icon: Award,
    text: "#1 Overall Broker 2026",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$0",
    maxLeverage: "1:50",
    spreadFrom: "Variable",
    usClients: "YES",
  },

  warningBanner: {
    text: "Regulated by NFA/CFTC. Lower leverage (1:50 max) but full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC/NFA Regulated" },
    { icon: Globe, text: "$0 Min Deposit" },
    { icon: Zap, text: "thinkorswim Platform" },
    { icon: Award, text: "#1 Broker 2026" },
  ],

  quickStats: [
    { label: "Founded", value: "1971 (Forex: 2009)" },
    { label: "Headquarters", value: "San Francisco, USA" },
    { label: "Regulation", value: "CFTC/NFA, SEC, FINRA", colorClass: "text-success" },
    { label: "Min Deposit", value: "$0", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:50" },
    { label: "US Clients", value: "Regulated & Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.3, description: "Competitive spreads for a full-service US broker" },
    { label: "Platform & Tools", score: 4.9, description: "thinkorswim is the industry-leading platform with 400+ indicators" },
    { label: "Customer Support", score: 4.5, description: "24/7 US-based customer support representatives" },
    { label: "Deposit & Withdrawal", score: 4.6, description: "Integrated banking with free ACH and internal transfers" },
    { label: "Educational Resources", score: 4.7, description: "Comprehensive learning center with courses, webinars, and coaching" },
  ],

  accountTypes: [
    {
      name: "Standard Brokerage",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "Variable",
      commission: "Spread-based",
    },
    {
      name: "Schwab One Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "Variable",
      commission: "Spread-based",
      popular: true,
    },
    {
      name: "Active Trader Account",
      minDeposit: "$0",
      leverage: "1:50",
      spread: "Competitive",
      commission: "Spread-based",
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Apply Online", description: "Complete the Schwab online application with your personal and financial information", icon: UserPlus, time: "10 min" },
    { step: 2, title: "Verify Identity", description: "Schwab verifies your identity through their secure process -- no document upload needed for most applicants", icon: FileText, time: "1-2 days" },
    { step: 3, title: "Fund Account", description: "Deposit funds via ACH transfer, bank wire, or check -- no minimum deposit required", icon: CreditCard, time: "1-3 days" },
    { step: 4, title: "Download thinkorswim", description: "Download the thinkorswim desktop platform or use the web/mobile version to start trading", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "ACH Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "Bank Wire", deposit: "Free (incoming)", withdrawal: "$25", fee: "$25 outgoing wire" },
    { method: "Check Deposit", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Internal Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "Interactive Brokers", id: "interactivebrokers" },
    { name: "tastyfx", id: "tastyfx" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$0", competitor1: "$0", competitor2: "$0" },
    { feature: "Max Leverage", broker: "1:50", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads", broker: "Variable", competitor1: "From 0.5 pips", competitor2: "From 0.8 pips" },
    { feature: "Platform", broker: "thinkorswim", competitor1: "TWS", competitor2: "Proprietary" },
    { feature: "US Clients", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, NFA, SEC, FINRA", competitor1: "CFTC, SEC", competitor2: "CFTC, NFA" },
    { feature: "Total Clients", broker: "36.5M", competitor1: "2.5M+", competitor2: "N/A" },
  ],

  communityFeedback: {
    positiveThemes: [
      "thinkorswim charting and technical analysis tools are industry-leading",
      "Paper trading feature is excellent for strategy testing",
      "$0 minimum deposit and no account maintenance fees",
      "America's most trusted brokerage brand with 50+ years",
    ],
    negativeThemes: [
      "Wider spreads compared to dedicated forex brokers",
      "thinkorswim platform has a steep learning curve",
      "Mobile app occasionally experiences sync issues",
      "Forex is secondary focus -- better for multi-asset traders",
    ],
  },

  faqs: [
    {
      question: "Can I trade forex with Charles Schwab?",
      answer: "Yes, Charles Schwab offers forex trading through the thinkorswim platform, which was acquired from TD Ameritrade. You can trade 70+ currency pairs with competitive spreads.",
    },
    {
      question: "What is the minimum deposit for Charles Schwab?",
      answer: "Charles Schwab has no minimum deposit requirement for opening an account. You can start with any amount and access the full thinkorswim platform.",
    },
    {
      question: "Is Charles Schwab regulated?",
      answer: "Yes, Charles Schwab is regulated by CFTC, NFA, SEC, and FINRA -- providing the highest level of regulatory protection available to US traders. Accounts are also SIPC protected.",
    },
    {
      question: "What happened to TD Ameritrade?",
      answer: "Charles Schwab completed its $26 billion acquisition of TD Ameritrade in 2023. All TD Ameritrade accounts were migrated to Schwab, and the thinkorswim platform is now offered under the Schwab brand.",
    },
    {
      question: "Does Charles Schwab offer paper trading?",
      answer: "Yes, through thinkorswim's paperMoney feature you can practice trading with $100,000 in virtual money, allowing you to test strategies risk-free before trading with real funds.",
    },
    {
      question: "How does Schwab's forex offering compare to dedicated forex brokers?",
      answer: "Schwab's spreads may be slightly wider than dedicated forex brokers, but the platform quality, regulatory protection, and integrated banking services make it an excellent choice for traders who value security and comprehensive tools.",
    },
  ],

  pros: [
    "Most trusted brokerage brand in the United States",
    "thinkorswim platform - industry-leading trading tools",
    "No minimum deposit requirement",
    "Excellent research and educational resources",
    "Full regulatory protection (CFTC/NFA, SEC, FINRA)",
    "24/7 customer support with US-based representatives",
    "Paper trading available for practice",
    "36.5 million clients worldwide",
    "Integrated banking and brokerage services",
    "#1 Overall Broker award from StockBrokers.com (2026)",
  ],

  cons: [
    "Limited to 1:50 leverage (US regulatory limit)",
    "No cryptocurrency trading available",
    "Spreads higher than some discount/offshore brokers",
    "Complex platform can be overwhelming for beginners",
    "FIFO rule limits hedging strategies",
  ],

  lastUpdated: "2026-02-14",
};
