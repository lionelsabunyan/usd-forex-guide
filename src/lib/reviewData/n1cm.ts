import { Shield, Users, Zap, TrendingUp, DollarSign, Check, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const n1cmData: BrokerReviewData = {
  brokerId: "n1cm",
  brokerName: "N1CM",
  subtitle: "Number One Capital Market - High Leverage Specialist",
  heroDescription:
    "N1CM (Number One Capital Market) is an offshore forex broker established in 2017. With high leverage up to 1:1000, a $10 minimum deposit, and multiple crypto payment options, it targets traders seeking high-leverage conditions. Note: N1CM no longer accepts clients from the United States.",

  seoTitle: "N1CM Review 2026 - High Leverage Offshore Broker",
  seoDescription:
    "N1CM review. High-leverage offshore broker with 1:1000 leverage, $10 minimum, crypto deposits, PAMM accounts, and fast execution.",
  canonical: "/review/n1cm",

  overallRating: 3.8,
  ratingCount: 8500,
  reviewCount: 4200,
  trustScore: 65,
  trustpilotRating: 3.8,
  trustpilotReviews: 350,

  heroBadge: {
    icon: Shield,
    text: "SINCE 2017",
    colorClass: "bg-primary/10 border border-primary/20 text-primary",
  },

  keyHighlights: {
    minDeposit: "$10",
    maxLeverage: "1:1000",
    spreadFrom: "0.5",
    usClients: "NO",
  },

  warningBanner: {
    text: "Important: N1CM no longer accepts clients from the United States. The broker has moved its regulation from Vanuatu VFSC to Mwali (Comoros) MISA. As an offshore broker, you don't have access to major regulatory protections. Trade with caution and only risk capital you can afford to lose.",
  },

  trustFeatures: [
    { icon: TrendingUp, text: "1:1000 Leverage" },
    { icon: DollarSign, text: "$10 Min Deposit" },
    { icon: Users, text: "PAMM Accounts" },
    { icon: Shield, text: "MISA Regulated" },
  ],

  quickStats: [
    { label: "Trustpilot", value: "3.8/5", colorClass: "text-foreground" },
    { label: "Established", value: "2017", colorClass: "text-foreground" },
    { label: "Headquarters", value: "Comoros", colorClass: "text-foreground" },
    { label: "Regulation", value: "MISA", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$10", colorClass: "text-success" },
    { label: "Max Leverage", value: "1:1000", colorClass: "text-primary" },
    { label: "Instruments", value: "200+", colorClass: "text-foreground" },
    { label: "US Clients", value: "Not Accepted", colorClass: "text-destructive" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 4.0, description: "1:1000 leverage, 0.5 pips" },
    { label: "Platform & Tools", score: 4.3, description: "MT4, MT5 platforms" },
    { label: "Customer Support", score: 4.0, description: "24/5 support available" },
    { label: "Deposit & Withdrawal", score: 4.0, description: "Crypto-focused, 3-5 day withdrawals" },
    { label: "Trust & Reputation", score: 3.5, description: "Since 2017, moved to MISA regulation" },
  ],

  accountTypes: [
    { name: "Standard Account", minDeposit: "$10", leverage: "1:1000", spread: "From 0.8 pips", commission: "No", popular: true },
    { name: "ECN Account", minDeposit: "$10", leverage: "1:1000", spread: "From 0.5 pips", commission: "$2.5 per side" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit N1CM Website", description: "Click our link to go to N1CM's official registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Fill Registration Form", description: "Enter your email, create a password, and provide basic personal information.", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Identity", description: "Upload ID document and proof of address. Verification is usually completed within 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Choose from cryptocurrency or e-wallet payment methods. Minimum deposit is $10. All deposits are instant and fee-free.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4 or MT5 and access 200+ instruments with up to 1:1000 leverage.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Bitcoin (BTC)", deposit: "Instant", withdrawal: "3-5 days", fee: "Free", recommended: true },
    { method: "Ethereum (ETH)", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
    { method: "USDT (Tether TRC20)", deposit: "Instant", withdrawal: "3-5 days", fee: "Free", recommended: true },
    { method: "Litecoin (LTC)", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
    { method: "USDC", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
    { method: "Ripple (XRP)", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
    { method: "Perfect Money", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
    { method: "Fasapay", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
    { method: "Sticpay", deposit: "Instant", withdrawal: "3-5 days", fee: "Free" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "Hankotrade", id: "hankotrade" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "No", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$10", competitor1: "$50", competitor2: "$10" },
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
      "Low minimum deposit ($10)",
      "Multiple cryptocurrency payment options",
      "PAMM/MAM accounts for investors",
      "Scalping and EA trading allowed",
    ],
    negativeThemes: [
      "No longer accepts US clients",
      "Moved to weaker MISA regulation (Comoros)",
      "Withdrawal processing takes 3-5 days",
      "Limited educational content",
      "Customer support response times can be slow",
    ],
  },

  faqs: [
    {
      question: "Does N1CM accept US clients?",
      answer:
        "No, N1CM (Number One Capital Market) no longer accepts clients from the United States. The broker explicitly excludes US, Canada, Spain, Italy, Finland, and Turkey from its services. US traders should consider other offshore brokers that still accept American clients.",
    },
    {
      question: "What is the minimum deposit at N1CM?",
      answer:
        "N1CM requires a minimum deposit of $10 for both the Standard and ECN accounts. This makes it accessible for beginners looking to start with a small amount.",
    },
    {
      question: "What leverage does N1CM offer?",
      answer:
        "N1CM offers leverage up to 1:1000, which is significantly higher than the 1:50 limit imposed by CFTC-regulated US brokers. This high leverage is available on all account types but increases both profit potential and risk.",
    },
    {
      question: "Is N1CM regulated and safe?",
      answer:
        "N1CM is regulated by the Mwali International Services Authority (MISA) in Comoros with license number BFX2024134. Previously regulated by Vanuatu VFSC, they moved to MISA regulation. While not a major regulator like CFTC, FCA, or ASIC, they have been operating since 2017. Always trade with caution and only risk capital you can afford to lose.",
    },
    {
      question: "How fast are N1CM withdrawals?",
      answer:
        "N1CM processes withdrawals within 3-5 business days. Deposits via cryptocurrency (Bitcoin, Ethereum, USDT, etc.) are processed instantly. The broker charges no fees on deposits or withdrawals.",
    },
    {
      question: "Does N1CM offer Islamic accounts?",
      answer:
        "Yes, N1CM offers Islamic swap-free accounts for traders who require Sharia-compliant trading conditions. You can request to convert your account to swap-free through customer support.",
    },
  ],

  pros: [
    "High leverage up to 1:1000",
    "Low minimum deposit ($10)",
    "Multiple cryptocurrency payment options",
    "No deposit or withdrawal fees",
    "Scalping and EA trading fully allowed",
    "Both MT4 and MT5 platforms available",
    "PAMM/MAM accounts for investors",
    "Negative balance protection",
    "200+ trading instruments",
    "Islamic swap-free accounts available",
  ],

  cons: [
    "Does not accept US clients",
    "Offshore regulation (Mwali MISA) - lower investor protection",
    "Moved regulation from Vanuatu VFSC to Comoros MISA",
    "Withdrawals take 3-5 business days",
    "Limited educational content",
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

  lastUpdated: "2026-03-31",
};
