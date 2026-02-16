import { Shield, Globe, Zap, Award, UserPlus, FileText, PlayCircle, CreditCard, Clock } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const fxproData: BrokerReviewData = {
  brokerId: "fxpro",
  brokerName: "FxPro",
  subtitle: "Professional Trading for Serious Traders",
  heroDescription:
    "FxPro is a well-established, multi-regulated forex and CFD broker founded in 2006. With over <strong>2,100 trading instruments</strong> and multiple platform options, it caters to both beginner and professional traders seeking a reliable trading environment.",

  seoTitle: "FxPro Review 2026",
  seoDescription:
    "Complete FxPro review for US traders. Multi-regulated broker with 2,100+ instruments, 1:200 leverage, and professional trading platforms. Learn about FxPro's features and trading conditions.",
  canonical: "/review/fxpro",

  overallRating: 4.3,
  ratingCount: 16500,
  reviewCount: 8200,
  trustScore: 85,

  heroBadge: {
    icon: Award,
    text: "Multi-Regulated Since 2006",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$100",
    maxLeverage: "1:200",
    spreadFrom: "0.0 pips",
    usClients: "NO",
  },

  warningBanner: {
    text: "Not Available to US Residents: This broker does not accept clients from the United States.",
  },

  trustFeatures: [
    { icon: Shield, text: "Multi-Regulated" },
    { icon: Globe, text: "2,100+ Instruments" },
    { icon: Zap, text: "4 Platforms" },
    { icon: Award, text: "70+ Awards" },
  ],

  quickStats: [
    { label: "Founded", value: "2006" },
    { label: "Headquarters", value: "Cyprus/UK" },
    { label: "Regulation", value: "FCA, CySEC, FSCA" },
    { label: "Min Deposit", value: "$100", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:200", colorClass: "text-primary" },
    { label: "Instruments", value: "2,100+", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.5, description: "Competitive spreads with NDD execution across all platforms" },
    { label: "Platform & Tools", score: 4.6, description: "Four platform choices including MT4, MT5, cTrader, and FxPro Edge" },
    { label: "Customer Support", score: 4.2, description: "Responsive support via live chat, email, and phone" },
    { label: "Deposit & Withdrawal", score: 4.0, description: "Multiple free funding options with reasonable processing times" },
    { label: "Educational Resources", score: 4.2, description: "Good educational content for improving trading skills" },
  ],

  accountTypes: [
    {
      name: "MT4 Standard",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 1.2 pips",
      commission: "No",
    },
    {
      name: "MT5 Standard",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 1.2 pips",
      commission: "No",
      popular: true,
    },
    {
      name: "cTrader",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 0.3 pips",
      commission: "$35 per million",
    },
    {
      name: "FxPro Edge",
      minDeposit: "$100",
      leverage: "1:200",
      spread: "From 0.0 pips",
      commission: "Variable",
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Register Online", description: "Fill out the online registration form with your personal details and email address", icon: UserPlus, time: "2 min" },
    { step: 2, title: "Verify Identity", description: "Upload your ID document and proof of address for KYC verification", icon: FileText, time: "1-24 hrs" },
    { step: 3, title: "Fund Account", description: "Deposit a minimum of $100 using bank wire, card, or e-wallet", icon: CreditCard, time: "Instant" },
    { step: 4, title: "Start Trading", description: "Choose your preferred platform (MT4, MT5, cTrader, or FxPro Edge) and begin trading", icon: PlayCircle, time: "Immediate" },
  ],

  paymentMethods: [
    { method: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", fee: "No fee", recommended: true },
    { method: "PayPal", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Skrill", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Neteller", deposit: "Free", withdrawal: "Free", fee: "No fee" },
    { method: "Union Pay", deposit: "Free", withdrawal: "Free", fee: "No fee" },
  ],

  competitors: [
    { name: "OANDA", id: "oanda" },
    { name: "IG Markets", id: "ig" },
  ],

  competitorComparison: [
    { feature: "Min Deposit", broker: "$100", competitor1: "$0", competitor2: "$250" },
    { feature: "Max Leverage", broker: "1:200", competitor1: "1:50", competitor2: "1:50" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "1.0 pips", competitor2: "0.6 pips" },
    { feature: "Platforms", broker: "MT4, MT5, cTrader, Edge", competitor1: "OANDA, MT4", competitor2: "IG, MT4" },
    { feature: "US Clients", broker: "No", competitor1: "Yes", competitor2: "Limited" },
    { feature: "Regulation", broker: "FCA, CySEC, FSCA", competitor1: "CFTC, NFA", competitor2: "CFTC, NFA" },
    { feature: "Instruments", broker: "2,100+", competitor1: "70+", competitor2: "80+" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Multiple tier-1 regulatory licenses provide strong trust",
      "cTrader platform praised for exceptional charting and execution speed",
      "Wide range of trading instruments including stocks CFDs",
      "Consistently wins industry awards (70+ to date)",
    ],
    negativeThemes: [
      "Spreads can widen during high volatility news events",
      "Inactivity fee applies after 6 months of no trading",
      "No cryptocurrency deposit options available",
      "Not available to US-based traders",
    ],
  },

  faqs: [
    {
      question: "Is FxPro available to US traders?",
      answer: "No, FxPro does not accept clients from the United States. US traders should consider CFTC-regulated alternatives like OANDA, Forex.com, or tastyfx.",
    },
    {
      question: "What is the minimum deposit for FxPro?",
      answer: "The minimum deposit for all FxPro account types is $100, which applies across MT4, MT5, cTrader, and FxPro Edge platforms.",
    },
    {
      question: "Which trading platforms does FxPro offer?",
      answer: "FxPro offers four trading platforms: MetaTrader 4 (MT4), MetaTrader 5 (MT5), cTrader, and their proprietary FxPro Edge platform.",
    },
    {
      question: "Is FxPro regulated?",
      answer: "Yes, FxPro is regulated by multiple tier-1 authorities including the FCA (UK), CySEC (Cyprus), FSCA (South Africa), and SCB (Bahamas).",
    },
    {
      question: "Does FxPro charge withdrawal fees?",
      answer: "No, FxPro does not charge fees on deposits or withdrawals. All payment methods including bank wire, cards, and e-wallets are free.",
    },
    {
      question: "What is the maximum leverage at FxPro?",
      answer: "The maximum leverage at FxPro is 1:200, though this may vary by jurisdiction and the regulatory body overseeing your account.",
    },
  ],

  pros: [
    "Multiple tier-1 regulations (FCA, CySEC, FSCA)",
    "Choice of 4 trading platforms (MT4, MT5, cTrader, FxPro Edge)",
    "2,100+ trading instruments including stocks CFDs",
    "No dealing desk execution",
    "Strong reputation since 2006",
    "Free VPS hosting for qualifying clients",
    "Excellent educational resources",
    "Negative balance protection",
    "Multiple account currencies supported",
    "Award-winning broker (70+ awards)",
  ],

  cons: [
    "Not available to US residents",
    "Higher minimum deposit than some competitors ($100)",
    "Spreads can widen during high volatility",
    "No cryptocurrency deposits",
    "Inactivity fee after 6 months",
  ],

  lastUpdated: "2026-02-14",
};
