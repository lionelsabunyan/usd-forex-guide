import { Shield, Users, Zap, TrendingUp, DollarSign, Check, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const n1cmData: BrokerReviewData = {
  brokerId: "n1cm",
  brokerName: "N1CM",
  subtitle: "Number One Capital Market - High Leverage Specialist",
  heroDescription:
    "N1CM (Number One Capital Market) is an offshore forex broker established in 2017 that accepts US clients. With high leverage up to 1:1000, a $1 minimum deposit, and multiple crypto payment options, it's an accessible option for American traders seeking alternatives to CFTC-regulated brokers.",

  seoTitle: "N1CM Review 2026 - High Leverage Broker for US Traders",
  seoDescription:
    "Complete N1CM review for 2026. Offshore broker accepting US clients with 1:1000 leverage, $1 minimum deposit, crypto deposits, and PAMM accounts. Established 2017.",
  canonical: "/review/n1cm",

  overallRating: 4.3,
  ratingCount: 8500,
  reviewCount: 4200,
  trustScore: 78,
  trustpilotRating: 3.8,
  trustpilotReviews: 350,

  heroBadge: {
    icon: Shield,
    text: "SINCE 2017",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$1",
    maxLeverage: "1:1000",
    spreadFrom: "0.5",
    usClients: "YES",
  },

  warningBanner: {
    text: "Recent user reports indicate some withdrawal delays at N1CM. Additionally, as an offshore broker regulated only by Vanuatu VFSC, you don't have access to major regulatory protections. Trade with caution and only risk capital you can afford to lose.",
  },

  trustFeatures: [
    { icon: TrendingUp, text: "1:1000 Leverage" },
    { icon: DollarSign, text: "$1 Min Deposit" },
    { icon: Users, text: "PAMM Accounts" },
    { icon: Check, text: "US Accepted" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "3.8/5", colorClass: "text-success" },
    { label: "Established", value: "2017", colorClass: "text-foreground" },
    { label: "Headquarters", value: "Vanuatu", colorClass: "text-foreground" },
    { label: "Regulation", value: "VFSC", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$1", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:1000", colorClass: "text-primary" },
    { label: "Instruments", value: "200+", colorClass: "text-foreground" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.0, description: "1:1000 leverage, 0.5 pips" },
    { label: "Platform & Tools", score: 4.3, description: "MT4, MT5 platforms" },
    { label: "Customer Support", score: 4.0, description: "24/5 support available" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "Multiple crypto options" },
    { label: "Trust & Reputation", score: 4.0, description: "Since 2017, offshore" },
  ],

  accountTypes: [
    { name: "Cent Account", minDeposit: "$1", leverage: "1:1000", spread: "From 0.9 pips", commission: "No" },
    { name: "Standard Account", minDeposit: "$10", leverage: "1:1000", spread: "From 0.8 pips", commission: "No", popular: true },
    { name: "ECN Pro Account", minDeposit: "$100", leverage: "1:1000", spread: "From 0.5 pips", commission: "$5 per lot" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit N1CM Website", description: "Click our link to go to N1CM's official registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Fill Registration Form", description: "Enter your email, create a password, and provide basic personal information.", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Identity", description: "Upload ID document and proof of address. Verification is usually completed within 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Choose from multiple payment methods including crypto. Most deposits are instant.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4 or MT5 and access 200+ instruments with up to 1:1000 leverage.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-3 days", fee: "Free", recommended: true },
    { method: "Bank Wire Transfer", deposit: "1-5 days", withdrawal: "1-5 days", fee: "Free" },
    { method: "Bitcoin (BTC)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "USDT (Tether)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "Litecoin (LTC)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free" },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "1%" },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "1%" },
    { method: "Perfect Money", deposit: "Instant", withdrawal: "Instant", fee: "1%" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "Hankotrade", id: "hankotrade" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$1", competitor1: "$50", competitor2: "$10" },
    { feature: "Maximum Leverage", broker: "1:1000", competitor1: "1:500", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.5 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platforms", broker: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5" },
    { feature: "PAMM/MAM", broker: "Yes", competitor1: "Yes", competitor2: "No" },
    { feature: "Crypto Deposits", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Established", broker: "2017", competitor1: "2019", competitor2: "2020" },
  ],

  communityFeedback: {
    positiveThemes: [
      "High leverage available (1:1000)",
      "Very low minimum deposit ($1)",
      "Multiple cryptocurrency payment options",
      "PAMM/MAM accounts for investors",
      "Scalping and EA trading allowed",
    ],
    negativeThemes: [
      "Recent reports of withdrawal delays",
      "Limited educational content",
      "Customer support response times can be slow",
      "Offshore regulation only",
    ],
  },

  faqs: [
    {
      question: "Does N1CM accept US clients?",
      answer:
        "Yes, N1CM (Number One Capital Market) accepts clients from the United States. As an offshore broker registered in Vanuatu, they are not subject to CFTC/NFA regulations, allowing them to serve US traders with high leverage options.",
    },
    {
      question: "What is the minimum deposit at N1CM?",
      answer:
        "N1CM has a very low minimum deposit of just $1 for the Cent Account and $10 for the Standard Account. This makes it one of the most accessible forex brokers for beginners. ECN Pro accounts require $100.",
    },
    {
      question: "What leverage does N1CM offer?",
      answer:
        "N1CM offers leverage up to 1:1000, which is significantly higher than the 1:50 limit imposed by CFTC-regulated US brokers. This high leverage is available on all account types but increases both profit potential and risk.",
    },
    {
      question: "Is N1CM regulated and safe?",
      answer:
        "N1CM is regulated by the Vanuatu Financial Services Commission (VFSC). While not a major regulator like CFTC, FCA, or ASIC, they have been operating since 2017. Always trade with caution and only risk capital you can afford to lose.",
    },
    {
      question: "How fast are N1CM withdrawals?",
      answer:
        "N1CM processes withdrawal requests within 24 hours. Crypto withdrawals (Bitcoin, Ethereum, USDT) are typically completed in 10-30 minutes. Bank wire and credit card withdrawals take 1-5 business days.",
    },
    {
      question: "Does N1CM offer Islamic accounts?",
      answer:
        "Yes, N1CM offers Islamic swap-free accounts for traders who require Sharia-compliant trading conditions. You can request to convert your account to swap-free through customer support.",
    },
  ],

  pros: [
    "Accepts US clients without restrictions",
    "Very low minimum deposit ($1 for Cent account)",
    "High leverage up to 1:1000",
    "Multiple cryptocurrency payment options",
    "Scalping and EA trading fully allowed",
    "Both MT4 and MT5 platforms available",
    "PAMM/MAM accounts for investors",
    "Negative balance protection",
    "200+ trading instruments",
    "Islamic swap-free accounts available",
  ],

  cons: [
    "Offshore regulation (Vanuatu VFSC) - lower investor protection",
    "Recent reports of withdrawal delays",
    "Limited educational content",
    "Customer support response times can be slow",
    "No proprietary trading platform",
  ],

  bonusOffers: [
    {
      title: "First Deposit Bonus",
      amount: "35% up to $5,000",
      type: "deposit",
      description: "Get 35% bonus on your first deposit, maximum bonus amount of $5,000. Available for new Standard and ECN accounts.",
      requirements: ["35% of first deposit", "Max bonus: $5,000", "New accounts only"],
      highlighted: true,
    },
    {
      title: "Re-Deposit Bonus",
      amount: "25%",
      type: "deposit",
      description: "Ongoing 25% bonus on subsequent deposits for existing clients. Help grow your trading capital with every deposit.",
      requirements: ["25% on re-deposits", "Existing clients eligible", "Standard trading requirements"],
    },
  ],

  lastUpdated: "February 4, 2026",
};
