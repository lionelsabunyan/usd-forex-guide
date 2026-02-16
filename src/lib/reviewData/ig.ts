import { Shield, Zap, Globe, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const igData: BrokerReviewData = {
  brokerId: "ig",
  brokerName: "IG Markets",
  subtitle: "CFTC-Regulated Broker for US Traders",
  heroDescription:
    "IG Markets is a well-established, CFTC-regulated forex broker founded in 1974. With a professional trading platform and <strong>tight spreads from 0.6 pips</strong>, IG Markets offers a reliable trading environment for American traders, though with CFTC-mandated leverage limits and a higher minimum deposit.",

  seoTitle: "IG Markets Review 2026",
  seoDescription:
    "Complete IG Markets review for US traders. CFTC-regulated broker with professional platform, tight spreads from 0.6 pips, and $250 minimum deposit.",
  canonical: "/review/ig-markets",

  overallRating: 3.9,
  ratingCount: 11200,
  reviewCount: 5500,
  trustScore: 88,
  trustpilotRating: 3.9,
  trustpilotReviews: 8650,

  heroBadge: {
    icon: Shield,
    text: "CFTC Regulated",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$250",
    maxLeverage: "1:50",
    spreadFrom: "0.6 pips",
    usClients: "LIMITED",
  },

  warningBanner: {
    text: "Regulated by NFA/CFTC. Lower leverage (1:50 max) but full regulatory protection.",
  },

  trustFeatures: [
    { icon: Shield, text: "CFTC Regulated" },
    { icon: Globe, text: "$250 Min Deposit" },
    { icon: Zap, text: "0.6 Pips Spread" },
    { icon: Award, text: "Since 1974" },
  ],

  quickStats: [
    { label: "Founded", value: "1974" },
    { label: "Headquarters", value: "London, UK" },
    { label: "Regulation", value: "CFTC, NFA" },
    { label: "Min Deposit", value: "$250", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:50", colorClass: "text-primary" },
    { label: "US Clients", value: "Forex Only", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.8, description: "Tight spreads from 0.6 pips with market execution" },
    { label: "Platform & Tools", score: 4.1, description: "Professional IG platform with ProRealTime charting" },
    { label: "Customer Support", score: 3.7, description: "Support available but response times can vary" },
    { label: "Deposit & Withdrawal", score: 3.9, description: "Standard US banking methods with free processing" },
    { label: "Educational Resources", score: 4.0, description: "IG Academy provides excellent educational content" },
  ],

  accountTypes: [
    {
      name: "Standard Account",
      minDeposit: "$250",
      leverage: "1:50",
      spread: "From 0.6 pips",
      commission: "No",
      popular: true,
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Apply Online", description: "Complete the IG Markets online application with your personal and financial details", icon: UserPlus, time: "5 min" },
    { step: 2, title: "Verify Identity", description: "Submit government-issued ID and proof of address for regulatory verification", icon: FileText, time: "1-3 days" },
    { step: 3, title: "Fund Account", description: "Deposit a minimum of $250 via ACH, bank wire, or debit card", icon: CreditCard, time: "1-3 days" },
    { step: 4, title: "Start Trading", description: "Access the IG trading platform or MT4 and start placing trades", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "Bank Wire", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "ACH Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Check", deposit: "N/A", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "OANDA", id: "oanda" },
    { name: "Forex.com", id: "forexcom" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$250", competitor1: "$0", competitor2: "$100" },
    { feature: "Max Leverage", broker: "1:50", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "0.6 pips", competitor1: "1.0 pips", competitor2: "0.8 pips" },
    { feature: "Platforms", broker: "IG, MT4", competitor1: "OANDA, MT4", competitor2: "MT4/MT5, Proprietary" },
    { feature: "US Clients", broker: "Forex Only", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CFTC, NFA", competitor1: "CFTC, NFA", competitor2: "CFTC, NFA" },
    { feature: "Founded", broker: "1974", competitor1: "1996", competitor2: "2001" },
  ],

  communityFeedback: {
    positiveThemes: [
      "ProRealTime charting is exceptional for technical analysis",
      "Fast execution with minimal slippage on major pairs",
      "Educational content and IG Academy are top-notch",
      "Multi-asset access from one account (forex, indices, crypto)",
    ],
    negativeThemes: [
      "Spreads can widen significantly during news events",
      "Customer service response times vary",
      "Inactivity fees apply after 2 years of no trading",
      "US account has more limited product range than international",
    ],
  },

  faqs: [
    {
      question: "Can US residents trade with IG Markets?",
      answer: "US residents can trade forex with IG Markets through their US entity, which is CFTC/NFA regulated. However, the product range is more limited compared to the international offering -- primarily forex and some CFDs.",
    },
    {
      question: "What is the minimum deposit for IG Markets?",
      answer: "The minimum deposit for IG Markets is $250 for US clients, which is higher than some competitors like OANDA ($0) but the tighter spreads can offset this cost over time.",
    },
    {
      question: "Is IG Markets safe for US traders?",
      answer: "Yes, IG Markets is regulated by the CFTC and is a member of the NFA. It is also one of the oldest brokers in the industry, founded in 1974, with a strong track record of financial stability.",
    },
    {
      question: "What platforms does IG Markets offer?",
      answer: "IG Markets offers its proprietary trading platform with ProRealTime charting integration, as well as MetaTrader 4 (MT4) for US clients.",
    },
    {
      question: "Does IG Markets charge inactivity fees?",
      answer: "Yes, IG Markets charges an inactivity fee of $12 per month after 2 years of no trading activity. You can avoid this by placing at least one trade within the 2-year period.",
    },
    {
      question: "What spreads does IG Markets offer?",
      answer: "IG Markets offers variable spreads starting from 0.6 pips on major currency pairs like EUR/USD. Spreads may widen during volatile market conditions and news events.",
    },
  ],

  pros: [
    "CFTC and NFA regulated - maximum protection",
    "Strong reputation since 1974",
    "Professional trading platform",
    "MT4 also available",
    "Tight spreads from 0.6 pips",
    "Fast withdrawal processing",
    "Negative balance protection",
    "Segregated client accounts",
    "Good customer support",
    "Comprehensive educational resources",
  ],

  cons: [
    "Higher minimum deposit ($250)",
    "Limited leverage (1:50 maximum due to CFTC)",
    "FIFO rule required (can't hedge easily)",
    "Platform may be complex for beginners",
    "No cryptocurrency deposit options",
  ],

  lastUpdated: "2026-02-14",
};
