import { Shield, Award, Users, Copy, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const hfmData: BrokerReviewData = {
  brokerId: "hfm",
  brokerName: "HFM",
  subtitle: "Formerly HotForex - Multi-Regulated Since 2010",
  heroDescription:
    'HFM is a multi-regulated forex and CFD broker serving 3.5+ million clients since 2010. Regulated by CySEC, FCA, DFSA, and FSCA, it offers 1200+ instruments, zero spread accounts, and HFcopy social trading. <strong class="text-amber-500">Note: US clients not currently accepted.</strong>',

  seoTitle: "HFM Review 2026 - Award-Winning Multi-Regulated Broker",
  seoDescription:
    "Complete HFM (formerly HotForex) review for 2026. Multi-regulated broker with 1200+ instruments, zero spread accounts, HFcopy trading, and 1:2000 leverage. Trusted since 2010.",
  canonical: "/review/hfm",

  overallRating: 4.5,
  ratingCount: 17500,
  reviewCount: 8500,
  trustScore: 90,
  trustpilotRating: 4.2,
  trustpilotReviews: 8500,

  heroBadge: {
    icon: Award,
    text: "60+ AWARDS",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$0",
    maxLeverage: "1:2000",
    spreadFrom: "0.0",
    usClients: "NO",
  },

  warningBanner: {
    text: "HFM currently does not accept clients from the United States. This review is provided for informational purposes. If you're a US trader looking for offshore brokers that accept US clients, please check our broker comparison page for alternatives like MidasFX, Hankotrade, or LMFX.",
  },

  trustFeatures: [
    { icon: Shield, text: "CySEC & FCA Regulated" },
    { icon: Award, text: "60+ Industry Awards" },
    { icon: Users, text: "3.5M+ Clients" },
    { icon: Copy, text: "HFcopy Trading" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "4.2/5", colorClass: "text-success" },
    { label: "Established", value: "2010", colorClass: "text-foreground" },
    { label: "Headquarters", value: "Cyprus", colorClass: "text-foreground" },
    { label: "Regulation", value: "CySEC, FCA+", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$0", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:2000", colorClass: "text-primary" },
    { label: "Instruments", value: "1200+", colorClass: "text-foreground" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-amber-500" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.5, description: "Zero spreads, 1:2000 leverage" },
    { label: "Platform & Tools", score: 4.6, description: "MT4, MT5, HFM App" },
    { label: "Customer Support", score: 4.4, description: "24/5 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.5, description: "Multiple free options" },
    { label: "Trust & Reputation", score: 4.8, description: "Multi-regulated, 60+ awards" },
  ],

  accountTypes: [
    {
      name: "Micro Account",
      minDeposit: "$0",
      leverage: "1:2000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "No commission", "Cent accounts", "Beginners friendly", "Swap-free available"],
    },
    {
      name: "Premium Account",
      minDeposit: "$0",
      leverage: "1:2000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "Standard lots", "All instruments", "Expert Advisors", "Hedging allowed"],
      popular: true,
    },
    {
      name: "Zero Spread",
      minDeposit: "$0",
      leverage: "1:2000",
      spread: "From 0.0 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5 Platform", "Raw spreads", "Best for scalpers", "DMA execution", "VIP support"],
    },
    {
      name: "HFcopy Account",
      minDeposit: "$100",
      leverage: "1:400",
      spread: "From 1.0 pips",
      commission: "Performance fee",
      features: ["Copy trading", "Follow top traders", "Automated trading", "Risk management", "Strategy providers"],
    },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit HFM Website", description: "Click our link to go to HFM's official registration page with exclusive benefits.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Fill Registration Form", description: "Enter your email, create a password, and provide basic personal information.", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Identity", description: "Upload ID document and proof of address. HFM's verification is usually completed within 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Choose from 20+ payment methods including crypto. Most deposits are instant.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4, MT5, or use the HFM mobile app. Access 1200+ instruments instantly.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-3 days", fee: "Free", recommended: true },
    { method: "Bank Wire Transfer", deposit: "2-5 days", withdrawal: "2-5 days", fee: "Free" },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Bitcoin (BTC)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free", recommended: true },
    { method: "USDT (Tether)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "FasaPay", deposit: "Instant", withdrawal: "Instant", fee: "Free" },
    { method: "WebMoney", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "Hankotrade", id: "hankotrade" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "No", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$0", competitor1: "$10", competitor2: "$10" },
    { feature: "Maximum Leverage", broker: "1:2000", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT5", competitor2: "MT4, MT5" },
    { feature: "Copy Trading", broker: "Yes (HFcopy)", competitor1: "No", competitor2: "No" },
    { feature: "Crypto Deposits", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Regulation", broker: "CySEC, FCA", competitor1: "FSA (SVG)", competitor2: "FSA (SVG)" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Fast execution and competitive spreads",
      "Multiple regulation provides security",
      "Wide range of trading instruments",
      "Copy trading feature (HFcopy) praised",
      "Good educational resources",
    ],
    negativeThemes: [
      "US clients not accepted",
      "Some withdrawal delays reported",
      "Inactivity fees apply",
    ],
  },

  faqs: [
    {
      question: "Does HFM accept US clients?",
      answer:
        "No, HFM currently does not accept clients from the United States. US traders looking for offshore brokers should consider alternatives like MidasFX or Hankotrade which do accept US clients.",
    },
    {
      question: "What is the minimum deposit at HFM?",
      answer:
        "HFM has no minimum deposit requirement for most account types. You can start trading with any amount. However, for practical trading with proper risk management, we recommend starting with at least $100-$200.",
    },
    {
      question: "What leverage does HFM offer?",
      answer:
        "HFM offers leverage up to 1:2000 on its offshore entity. However, leverage varies by account type and instrument. For EU clients regulated by CySEC, maximum leverage is capped at 1:30 for retail traders.",
    },
    {
      question: "Is HFM regulated and safe?",
      answer:
        "Yes, HFM is multi-regulated by CySEC (Cyprus), FCA (UK), DFSA (Dubai), FSCA (South Africa), and FSA (SVG). They've won 60+ industry awards and serve over 3.5 million clients worldwide since 2010.",
    },
    {
      question: "How fast are HFM withdrawals?",
      answer:
        "HFM processes withdrawal requests within 24 hours. Actual receipt time depends on payment method: crypto (10-60 minutes), e-wallets (same day), credit cards (1-5 business days), bank wire (2-5 business days).",
    },
    {
      question: "What is HFcopy?",
      answer:
        "HFcopy is HFM's social/copy trading platform that allows you to automatically copy the trades of successful strategy providers. You can browse performance statistics and choose traders to follow based on their track record.",
    },
  ],

  pros: [
    "Multi-regulated broker (CySEC, FCA, DFSA, FSCA, FSA)",
    "Award-winning broker since 2010 (60+ awards)",
    "Zero spread accounts available",
    "High leverage up to 1:2000",
    "No minimum deposit required",
    "Copy trading via HFcopy platform",
    "1200+ trading instruments",
    "Both MT4 and MT5 platforms",
    "Negative balance protection",
    "Free VPS for qualified traders",
    "Extensive educational resources",
    "24/5 multilingual support",
  ],

  cons: [
    "US clients NOT currently accepted",
    "Offshore entity used for high leverage",
    "Inactivity fees ($5/month after 6 months)",
    "Limited crypto selection vs dedicated exchanges",
    "Withdrawal processing can take 2-5 days",
  ],

  bonusOffers: [
    {
      title: "100% Deposit Bonus",
      amount: "Up to $50,000",
      type: "deposit",
      description: "Double your trading capital with HFM's flagship bonus program.",
      requirements: [
        "Minimum deposit: $250",
        "Maximum bonus: $50,000",
        "Trading volume requirements apply",
        "Available on Micro, Premium, and Zero Spread accounts",
      ],
      minDeposit: "$250",
      maxBonus: "$50,000",
      termsUrl: "https://www.hfm.com/int/en/promotions/100-deposit-bonus",
      highlighted: true,
    },
    {
      title: "50% Welcome Bonus",
      amount: "On First Deposit",
      type: "welcome",
      description: "New traders get 50% extra on their first deposit.",
      requirements: [
        "Minimum deposit: $50",
        "For new clients only",
        "One-time bonus on first deposit",
        "Withdrawal conditions apply",
      ],
      minDeposit: "$50",
      termsUrl: "https://www.hfm.com/int/en/promotions",
    },
    {
      title: "Shield 500 Bonus",
      amount: "Up to $500",
      type: "welcome",
      description: "Protection bonus for your first deposit.",
      requirements: [
        "Available on first deposit",
        "Up to $500 bonus",
        "Risk protection feature",
        "Terms and conditions apply",
      ],
      maxBonus: "$500",
      termsUrl: "https://www.hfm.com/int/en/promotions",
    },
    {
      title: "ROFM (Return on Free Margin)",
      amount: "2-3% Annual",
      type: "cashback",
      description: "Earn 2-3% annual return on your free margin balance.",
      requirements: [
        "Automatic enrollment for eligible accounts",
        "Calculated daily, paid monthly",
        "2-3% annual percentage rate",
        "No trading volume required",
      ],
      termsUrl: "https://www.hfm.com/int/en/promotions",
    },
  ],

  lastUpdated: "February 4, 2026",
};
