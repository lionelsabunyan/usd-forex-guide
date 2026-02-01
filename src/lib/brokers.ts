export type BrokerId = "fxglory" | "hankotrade" | "midasfx" | "n1cm" | "etoro" | "fxpro" | "oanda" | "ig" | "forexcom" | "interactivebrokers" | "avatrade" | "charlesschwab" | "tastyfx";

export type Broker = {
  id: BrokerId;
  name: string;
  rating?: number;
  minDeposit?: string;
  leverage?: string;
  spreads?: string;
  usAccepted?: boolean;
  reviewUrl?: string;
  /** Official homepage */
  siteUrl?: string;
  /** Affiliate registration URL (preferred CTA) */
  affiliateUrl?: string;
  /** Public path under /public (e.g. "/brokers/fxglory.svg") */
  logoSrc?: string;
  featured?: boolean;
};

const env = import.meta.env as unknown as Record<string, string | undefined>;

export const brokers: Record<BrokerId, Broker> = {
  fxglory: {
    id: "fxglory",
    name: "FXGlory",
    rating: 4.8,
    minDeposit: "$1",
    leverage: "1:3000",
    spreads: "0.1 pips",
    usAccepted: true,
    featured: true,
    reviewUrl: "/review/fxglory",
    siteUrl: env.VITE_FXGLORY_VISIT_URL || "https://fxglory.com/?ib=82027",
    affiliateUrl: env.VITE_FXGLORY_AFFILIATE_URL || "https://app.fxglory.com/auth/register?ib=82027",
    logoSrc: "/brokers/fxglory.png",
  },
  hankotrade: {
    id: "hankotrade",
    name: "Hankotrade",
    rating: 4.7,
    minDeposit: "$10",
    leverage: "1:500",
    spreads: "0.0 pips",
    usAccepted: true,
    featured: true,
    reviewUrl: "/review/hankotrade",
    siteUrl: "https://hankotrade.com",
    affiliateUrl: "https://login.hankotrade.com/register?refLink=OTE0Mzk=&refRm=11",
    logoSrc: "/brokers/hankotrade.svg",
  },
  midasfx: {
    id: "midasfx",
    name: "MidasFX",
    rating: 4.6,
    minDeposit: "$10",
    leverage: "1:1000",
    spreads: "0.0 pips",
    usAccepted: true,
    featured: true,
    reviewUrl: "/review/midasfx",
    siteUrl: "https://www.tradersway.com/?ib=1679928",
    affiliateUrl: "https://www.tradersway.com/?ib=1679928",
    logoSrc: "/brokers/midasfx.png",
  },
  n1cm: {
    id: "n1cm",
    name: "N1CM",
    rating: 4.6,
    minDeposit: "$1",
    leverage: "1:1000",
    spreads: "0.5 pips",
    usAccepted: true,
    reviewUrl: "/review/n1cm",
    siteUrl: "https://www.n1cm.com",
    affiliateUrl: env.VITE_N1CM_AFFILIATE_URL || "https://register.n1cmpro.com/en?partner_id=250473",
    logoSrc: "/brokers/n1cm.webp",
  },
  etoro: {
    id: "etoro",
    name: "eToro",
    rating: 4.3,
    minDeposit: "$50",
    leverage: "1:30",
    spreads: "1.0 pips",
    usAccepted: true,
    reviewUrl: "/review/etoro",
    siteUrl: "https://www.etoro.com",
    logoSrc: "/brokers/etoro.png",
  },
  fxpro: {
    id: "fxpro",
    name: "FxPro",
    rating: 4.1,
    minDeposit: "$100",
    leverage: "1:200",
    spreads: "0.6 pips",
    usAccepted: false,
    reviewUrl: "/review/fxpro",
    siteUrl: "https://www.fxpro.com",
    logoSrc: "/brokers/fxpro.svg",
  },
  oanda: {
    id: "oanda",
    name: "OANDA",
    rating: 4.0,
    minDeposit: "$0",
    leverage: "1:50",
    spreads: "1.0 pips",
    usAccepted: true,
    reviewUrl: "/review/oanda",
    siteUrl: "https://www.oanda.com",
    logoSrc: "/brokers/oanda.svg",
  },
  ig: {
    id: "ig",
    name: "IG Markets",
    rating: 3.9,
    minDeposit: "$250",
    leverage: "1:50",
    spreads: "0.6 pips",
    usAccepted: true,
    reviewUrl: "/review/ig-markets",
    siteUrl: "https://www.ig.com",
    logoSrc: "/brokers/ig.svg",
  },
  forexcom: {
    id: "forexcom",
    name: "Forex.com",
    rating: 3.8,
    minDeposit: "$100",
    leverage: "1:50",
    spreads: "0.8 pips",
    usAccepted: true,
    reviewUrl: "/review/forexcom",
    siteUrl: "https://www.forex.com",
    logoSrc: "/brokers/forexcom.svg",
  },
  interactivebrokers: {
    id: "interactivebrokers",
    name: "Interactive Brokers",
    rating: 3.7,
    minDeposit: "$0",
    leverage: "1:50",
    spreads: "0.5 pips",
    usAccepted: true,
    reviewUrl: "/review/interactive-brokers",
    siteUrl: "https://www.interactivebrokers.com",
    logoSrc: "/brokers/interactivebrokers.svg",
  },
  avatrade: {
    id: "avatrade",
    name: "AvaTrade",
    rating: 3.6,
    minDeposit: "$100",
    leverage: "1:400",
    spreads: "0.9 pips",
    usAccepted: false,
    reviewUrl: "/review/avatrade",
    siteUrl: "https://www.avatrade.com",
    logoSrc: "/brokers/avatrade.svg",
  },
  charlesschwab: {
    id: "charlesschwab",
    name: "Charles Schwab",
    rating: 4.4,
    minDeposit: "$0",
    leverage: "1:50",
    spreads: "Variable",
    usAccepted: true,
    reviewUrl: "/review/charles-schwab",
    siteUrl: "https://www.schwab.com",
    logoSrc: "/brokers/charlesschwab.png",
  },
  tastyfx: {
    id: "tastyfx",
    name: "tastyfx",
    rating: 4.5,
    minDeposit: "$0",
    leverage: "1:50",
    spreads: "0.2 pips",
    usAccepted: true,
    reviewUrl: "/review/tastyfx",
    siteUrl: "https://tastyfx.com",
    logoSrc: "/brokers/tastyfx.png",
  },
};

export const topBrokers = [
  brokers.fxglory,
  brokers.hankotrade,
  brokers.midasfx,
  brokers.n1cm,
  brokers.tastyfx,
  brokers.etoro,
  brokers.fxpro,
  brokers.oanda,
  brokers.ig,
  brokers.forexcom,
  brokers.interactivebrokers,
  brokers.avatrade,
  brokers.charlesschwab,
] as const;

export const reviewedBrokers = [
  brokers.fxglory,
  brokers.hankotrade,
  brokers.midasfx,
  brokers.n1cm,
  brokers.tastyfx,
  brokers.etoro,
  brokers.fxpro,
  brokers.oanda,
  brokers.ig,
  brokers.forexcom,
  brokers.interactivebrokers,
  brokers.avatrade,
  brokers.charlesschwab,
] as const;

