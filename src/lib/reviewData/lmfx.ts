import { Shield, Check, TrendingUp, Bitcoin, Award, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

export const lmfxData: BrokerReviewData = {
  brokerId: "lmfx",
  brokerName: "LMFX",
  subtitle: "Offshore Broker Since 2015 - High Leverage",
  heroDescription:
    'LMFX is an offshore forex broker established in 2015 that <strong class="text-success">fully accepts US clients</strong>. With leverage up to 1:1000, multiple crypto deposit options, and $25,000 trading contests, it\'s a solid choice for American traders seeking offshore alternatives.',

  seoTitle: "LMFX Review 2026 - US Accepted Broker with 1:1000 Leverage",
  seoDescription:
    "Complete LMFX review for US traders. High leverage up to 1:1000, crypto deposits, $25K trading contests. Accepts US clients with no restrictions.",
  canonical: "/review/lmfx",

  overallRating: 4.6,
  ratingCount: 9800,
  reviewCount: 4800,
  trustScore: 72,

  heroBadge: {
    icon: Shield,
    text: "US OK",
    colorClass: "bg-success/10 border border-success/20 text-success",
  },

  keyHighlights: {
    minDeposit: "$50",
    maxLeverage: "1:1000",
    spreadFrom: "0.0",
    usClients: "YES",
  },

  warningBanner: {
    text: "LMFX is an offshore broker registered in St. Vincent and the Grenadines. While they've operated since 2015 and accept US clients, trading with offshore brokers carries additional risks. Only trade with funds you can afford to lose and consider your risk tolerance before opening an account.",
  },

  trustFeatures: [
    { icon: Check, text: "US Clients Accepted" },
    { icon: TrendingUp, text: "1:1000 Leverage" },
    { icon: Bitcoin, text: "Crypto Deposits" },
    { icon: Award, text: "$25K Contests" },
  ],

  quickStats: [
    { label: "Established", value: "2015", colorClass: "text-foreground" },
    { label: "Headquarters", value: "St. Vincent", colorClass: "text-foreground" },
    { label: "Min Deposit", value: "$50", colorClass: "text-primary" },
    { label: "Max Leverage", value: "1:1000", colorClass: "text-primary" },
    { label: "Spreads", value: "From 0.0 pips", colorClass: "text-primary" },
    { label: "Platform", value: "MT4", colorClass: "text-foreground" },
    { label: "US Clients", value: "Accepted", colorClass: "text-success" },
  ],

  ratings: [
    { label: "Trading Conditions", score: 3.8, description: "Zero spreads, 1:1000 leverage" },
    { label: "Platform & Tools", score: 3.5, description: "MT4 only, full EA support" },
    { label: "Customer Support", score: 3.8, description: "24/5 responsive support" },
    { label: "Deposit & Withdrawal", score: 3.8, description: "Crypto + multiple options" },
    { label: "Trust & Reputation", score: 3.3, description: "Unregulated offshore broker" },
  ],

  accountTypes: [
    { name: "Premium Account", minDeposit: "$50", leverage: "1:1000", spread: "From 1.0 pips", commission: "No" },
    { name: "Fixed Account", minDeposit: "$250", leverage: "1:400", spread: "Fixed 2.0 pips", commission: "No", popular: true },
    { name: "Zero Account", minDeposit: "$100", leverage: "1:1000", spread: "From 0.0 pips", commission: "$4 per lot" },
  ],

  accountOpeningSteps: [
    { step: 1, title: "Visit LMFX Website", description: "Click our link to access LMFX's secure registration page.", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Complete Registration", description: "Fill in your details - name, email, phone, and country (US accepted).", icon: FileText, time: "2 minutes" },
    { step: 3, title: "Verify Your Identity", description: "Upload ID and proof of address. Verification typically takes 24 hours.", icon: UserPlus, time: "5 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit via crypto (BTC, ETH, USDT), card, or e-wallet. Minimum $50.", icon: Wallet, time: "Instant" },
    { step: 5, title: "Start Trading", description: "Download MT4, choose your leverage (up to 1:1000), and begin trading.", icon: PlayCircle, time: "Ready!" },
  ],

  paymentMethods: [
    { method: "Bitcoin (BTC)", deposit: "10-60 min", withdrawal: "10-60 min", fee: "Free", recommended: true },
    { method: "USDT (Tether)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "Ethereum (ETH)", deposit: "10-30 min", withdrawal: "10-30 min", fee: "Free", recommended: true },
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-5 days", fee: "Free" },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Bank Wire Transfer", deposit: "2-5 days", withdrawal: "2-5 days", fee: "$25" },
  ],

  competitors: [
    { name: "MidasFX", id: "midasfx" },
    { name: "Hankotrade", id: "hankotrade" },
  ],

  competitorComparison: [
    { feature: "US Clients Accepted", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Minimum Deposit", broker: "$50", competitor1: "$10", competitor2: "$10" },
    { feature: "Maximum Leverage", broker: "1:1000", competitor1: "1:1000", competitor2: "1:500" },
    { feature: "Spreads From", broker: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips" },
    { feature: "Trading Platform", broker: "MT4 only", competitor1: "MT5", competitor2: "MT4, MT5" },
    { feature: "Trading Contests", broker: "Yes ($25K)", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Crypto Deposits", broker: "Yes", competitor1: "Yes", competitor2: "Yes" },
    { feature: "Fixed Spread Option", broker: "Yes", competitor1: "No", competitor2: "No" },
  ],

  communityFeedback: {
    positiveThemes: [
      "Accepts US clients without restrictions",
      "High leverage (1:1000) available",
      "Multiple deposit methods including crypto",
      "Regular trading contests with prizes",
      "Responsive customer support",
    ],
    negativeThemes: [
      "Offshore broker (not tier-1 regulated)",
      "MT4 only - no MT5 available",
      "Wire withdrawal fee ($25)",
    ],
  },

  faqs: [
    {
      question: "Does LMFX accept US clients?",
      answer:
        "Yes, LMFX fully accepts US clients without restrictions. As an offshore broker registered in St. Vincent and the Grenadines, they're able to serve American traders who want access to higher leverage and more trading flexibility.",
    },
    {
      question: "What is the minimum deposit at LMFX?",
      answer:
        "The minimum deposit is $50 for the Premium Account, $100 for the Zero Account, and $250 for the Fixed Account. We recommend starting with at least $100-200 for proper risk management.",
    },
    {
      question: "Is LMFX regulated?",
      answer:
        "LMFX is registered in St. Vincent and the Grenadines. While not regulated by major authorities like FCA or CySEC, they've been operating since 2015 with a solid track record. Trade only with funds you can afford to lose.",
    },
    {
      question: "How can I deposit and withdraw at LMFX?",
      answer:
        "LMFX offers multiple options: credit/debit cards, bank wire, and cryptocurrencies (Bitcoin, Ethereum, USDT). Crypto deposits are free and processed within minutes. Note: wire withdrawals have a $25 fee.",
    },
    {
      question: "What leverage does LMFX offer?",
      answer:
        "LMFX offers leverage up to 1:1000 on the Premium and Zero accounts, and up to 1:400 on the Fixed account. High leverage amplifies both profits and losses - use appropriate risk management.",
    },
    {
      question: "Does LMFX have trading contests?",
      answer:
        "Yes! LMFX runs regular trading contests with prize pools up to $25,000. Both demo and live account contests are available, giving traders opportunities to win cash prizes.",
    },
  ],

  pros: [
    "Fully accepts US clients",
    "High leverage up to 1:1000",
    "Multiple crypto deposit options (BTC, ETH, USDT)",
    "Established since 2015",
    "$25K trading contest prizes",
    "Zero spread account available",
    "Fixed spread option for news trading",
    "Negative balance protection",
    "Scalping and hedging allowed",
    "Expert Advisors fully supported",
    "24/5 responsive support",
  ],

  cons: [
    "Offshore broker (St. Vincent registered)",
    "MT4 only - no MT5 platform",
    "Wire withdrawal fee ($25)",
    "Higher minimum for Fixed account ($250)",
    "Limited instrument selection",
  ],

  bonusOffers: [
    {
      title: "100% Credit Bonus",
      amount: "$100 - $30,000",
      type: "deposit",
      description: "Double your trading capital with LMFX's generous credit bonus program.",
      requirements: [
        "Minimum deposit: $100",
        "Maximum bonus: $30,000",
        "Trading volume requirements apply",
        "Terms and conditions on LMFX website",
      ],
      minDeposit: "$100",
      maxBonus: "$30,000",
      termsUrl: "https://lmfx.com/en/landing-pages/landing-page-04?refid=136384",
      highlighted: true,
    },
    {
      title: "Cashback Program",
      amount: "Up to $7 per lot",
      type: "cashback",
      description: "Earn cashback on every trade with LMFX's exclusive IB cashback program.",
      requirements: [
        "Available for all account types",
        "Up to $7 per standard lot",
        "Paid monthly to your account",
        "No minimum trading volume",
      ],
      termsUrl: "https://lmfx.com/en/promotions/cashback?refid=136384",
    },
    {
      title: "Phoenix Bonus",
      amount: "15% Recovery",
      type: "cashback",
      description: "Get 15% recovery bonus on your re-deposits to continue trading.",
      requirements: [
        "Available on re-deposits",
        "15% bonus on subsequent deposits",
        "Helps recover from losses",
        "Standard terms apply",
      ],
      termsUrl: "https://lmfx.com/en/landing-pages/phoenix-bonus?refid=136384",
    },
    {
      title: "Learn & Earn",
      amount: "Up to $1,750",
      type: "welcome",
      description: "Complete trading education modules and earn up to $1,750 in rewards.",
      requirements: [
        "Complete educational courses",
        "Pass quizzes and assessments",
        "Maximum $1,750 in earnings",
        "Available for new clients",
      ],
      maxBonus: "$1,750",
      termsUrl: "https://lmfx.com/promotions/bonus-offerings",
    },
  ],

  lastUpdated: "February 4, 2026",
};
