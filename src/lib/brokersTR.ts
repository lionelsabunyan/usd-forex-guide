// Türkiye'ye özel broker bilgileri
// Bu veriler ana brokers.ts'i override eder

import { BrokerId } from "./brokers";

export type TRBrokerInfo = {
  id: BrokerId;
  // Affiliate linkler
  affiliateUrl: string; // Hesap açma linki
  homeUrl?: string; // Ana sayfa linki (opsiyonel)
  // Bonus bilgileri
  hasBonus: boolean;
  bonusDetails?: string;
  welcomeBonus?: string;
  depositBonus?: string;
  noDepositBonus?: string;
  // Para yatırma/çekme
  depositMethods: string[];
  withdrawalMethods: string[];
  depositFee: string;
  withdrawalFee: string;
  minWithdrawal: string;
  withdrawalTime: string;
  // Türkçe destek
  turkishSupport: boolean;
  turkishWebsite: boolean;
  // Ekstra TR bilgileri
  trNotes?: string;
};

export const trBrokerInfo: Record<string, TRBrokerInfo> = {
  fxpro: {
    id: "fxpro",
    affiliateUrl: "/go/fxpro",
    hasBonus: true,
    bonusDetails: "%100 Yatırım Bonusu + Yarışmalar",
    welcomeBonus: "%100 Yatırım Bonusu (maks $1,000)",
    depositBonus: "%100 + %15 spread rebate",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$50",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "FCA ve CySEC regülasyonlu, canlı yarışmalar",
  },
  xm: {
    id: "xm",
    affiliateUrl: "https://affs.click/n3dTY",
    hasBonus: true,
    bonusDetails: "$30-$50 Yatırımsız + %100 Yatırım Bonusu",
    welcomeBonus: "$30 Yatırımsız Bonus (bazı bölgelerde $50)",
    depositBonus: "%100 + %50 + %20 Kademeli Bonus (maks $10,600)",
    noDepositBonus: "$30 (veya $50)",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$5",
    withdrawalTime: "24 saat içinde",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Webinar bonusu ($50), düzenli eğitimler",
  },
  exness: {
    id: "exness",
    affiliateUrl: "https://one.exnessonelink.com/a/c33epne0sj",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok, EXD Cashback var",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto", "Papara"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto", "Papara"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$1",
    withdrawalTime: "Anında (kripto/e-cüzdan)",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "EXD Cashback (%50'ye kadar), Premier program, anında para çekme",
  },
  fbs: {
    id: "fbs",
    affiliateUrl: "https://www.fbs.com",
    hasBonus: true,
    bonusDetails: "%100 Yatırım Bonusu + Cashback",
    welcomeBonus: "Yok (2026 itibarıyla durduruldu)",
    depositBonus: "%100 ilk yatırım + %60 sonraki yatırımlar",
    noDepositBonus: "Yok (eskiden $140 Level Up vardı)",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$1",
    withdrawalTime: "15 dakika - 48 saat",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "En yüksek kaldıraç (1:3000), %100 yatırım bonusu aktif",
  },
  pepperstone: {
    id: "pepperstone",
    affiliateUrl: "https://www.pepperstone.com",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok, TradingView & Rebate var",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "PayPal", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "PayPal", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "Ücretsiz TradingView, Active Trader rebate, en düşük spread'ler",
  },
  fxtm: {
    id: "fxtm",
    affiliateUrl: "https://www.fxtm.com",
    hasBonus: true,
    bonusDetails: "$500 Hoşgeldin + %30 Yatırım Bonusu",
    welcomeBonus: "$500 Hoşgeldin Bonusu (kod: HELLOFXTM)",
    depositBonus: "%30 Yatırım Bonusu (maks $300)",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$3",
    withdrawalTime: "24 saat içinde",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Sadakat cashback programı, Copy trading (FXTM Invest)",
  },
  oanda: {
    id: "oanda",
    affiliateUrl: "https://www.oanda.com",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "ACH Transfer", "Kredi Kartı"],
    withdrawalMethods: ["Banka Havalesi", "ACH Transfer"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "CFTC/NFA regülasyonlu, $0 minimum depozito, 1996'dan beri",
  },
  ig: {
    id: "ig",
    affiliateUrl: "https://www.ig.com",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "ACH Transfer", "Kredi Kartı"],
    withdrawalMethods: ["Banka Havalesi", "ACH Transfer"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "50+ yıllık deneyim, CFTC/NFA + FCA çift regülasyon, 17,000+ enstrüman",
  },
  etoro: {
    id: "etoro",
    affiliateUrl: "https://www.etoro.com",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Kredi Kartı", "PayPal", "Banka Havalesi", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "PayPal", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "$5",
    minWithdrawal: "$30",
    withdrawalTime: "1-2 iş günü",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "CopyTrader sosyal trading, çoklu varlık (forex + kripto + hisse), 40M+ kullanıcı",
  },
  forexcom: {
    id: "forexcom",
    affiliateUrl: "https://www.forex.com",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "ACH Transfer", "Kredi Kartı"],
    withdrawalMethods: ["Banka Havalesi", "ACH Transfer"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "CFTC/NFA regülasyonlu, 3 hesap türü (Standard, RAW Spread, DMA), MT4/MT5/TradingView",
  },
  avatrade: {
    id: "avatrade",
    affiliateUrl: "https://www.avatrade.com",
    hasBonus: false,
    bonusDetails: "Bonus yok (Tier-1 regülasyon)",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Apple Pay", "Google Pay"],
    withdrawalMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$100",
    withdrawalTime: "1-5 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "ASIC, CIRO, JFSA, MiFID regülasyonlu, MT4/MT5, 1:400 kaldıraç",
  },
  coinexx: {
    id: "coinexx",
    affiliateUrl: "https://www.coinexx.com",
    hasBonus: false,
    bonusDetails: "ECN kripto brokers bonus sunmaz",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Bitcoin", "Ethereum", "USDT", "Diğer kripto"],
    withdrawalMethods: ["Bitcoin", "Ethereum", "USDT", "Diğer kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ağ ücreti ile değişken",
    minWithdrawal: "$10",
    withdrawalTime: "15-60 dakika (blockchain)",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "Kripto-only ECN, 0.0 pips spread, anonim trading seçeneği, 4.8/5 Trustpilot",
  },
  interactivebrokers: {
    id: "interactivebrokers",
    affiliateUrl: "https://www.interactivebrokers.com",
    hasBonus: false,
    bonusDetails: "Kurumsal broker - bonus yok",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "ACH Transfer", "Kredi Kartı"],
    withdrawalMethods: ["Banka Havalesi", "ACH Transfer"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz ($0 minimum)",
    minWithdrawal: "$0",
    withdrawalTime: "1-2 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "Kurumsal-grade, SEC/FINRA/SIPC, TWS + Web platform, 17,000+ enstrüman",
  },
  lmfx: {
    id: "lmfx",
    affiliateUrl: "https://www.lmfx.com",
    hasBonus: true,
    bonusDetails: "%100 Yatırım Bonusu",
    welcomeBonus: "Yok",
    depositBonus: "%100 ilk yatırım bonusu (maks $10,000)",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$10",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "Vanuatu FSP regülasyonlu, %100 yatırım bonusu aktif, 1:1000 kaldıraç, 0.0 pips ECN",
  },
  midasfx: {
    id: "midasfx",
    affiliateUrl: "https://www.midasfx.com",
    hasBonus: true,
    bonusDetails: "FSA Bonus + Spread Rebate",
    welcomeBonus: "Yok",
    depositBonus: "%50 yatırım bonusu (maks $5,000)",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$1",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "FSA regülasyonlu (St. Vincent), 1:1000 kaldıraç, 0.0 pips ECN spread, spread rebate",
  },
  charlesschwab: {
    id: "charlesschwab",
    affiliateUrl: "https://www.schwab.com",
    hasBonus: false,
    bonusDetails: "ABD'nin en güvenilir brokerage",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "ACH Transfer", "Kredi Kartı"],
    withdrawalMethods: ["Banka Havalesi", "ACH Transfer"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "CFTC/NFA regülasyonlu, thinkorswim platform, ödüllü araştırma araçları",
  },
  fxglory: {
    id: "fxglory",
    affiliateUrl: "https://www.fxglory.com",
    hasBonus: true,
    bonusDetails: "Yüksek Bonus - Offshore Broker",
    welcomeBonus: "Yok",
    depositBonus: "%100 ilk yatırım bonusu",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$1",
    withdrawalTime: "Anında - 24 saat",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "St. Vincent FSA, 1:3000 kaldıraç, ABD traderlarını kabul ediyor",
  },
  hankotrade: {
    id: "hankotrade",
    affiliateUrl: "https://www.hankotrade.com",
    hasBonus: true,
    bonusDetails: "ECN Bonus + Rebate Programı",
    welcomeBonus: "Yok",
    depositBonus: "%50 yatırım bonusu",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$10",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "Vanuatu regülasyonlu, 1:500 kaldıraç, 0.0 pips ECN, spread rebate programı",
  },
  n1cm: {
    id: "n1cm",
    affiliateUrl: "https://www.n1cm.com",
    hasBonus: true,
    bonusDetails: "Yatırım Bonusu (ABD'ye kapalı)",
    welcomeBonus: "Yok",
    depositBonus: "%50 yatırım bonusu",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$10",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "Mwali (Comoros) MISA regülasyonlu, ABD artık kabul etmiyor, 1:1000 kaldıraç",
  },
  plexytrade: {
    id: "plexytrade",
    affiliateUrl: "https://www.plexytrade.com",
    hasBonus: true,
    bonusDetails: "Yüksek Kaldıraç + Bonus",
    welcomeBonus: "Yok",
    depositBonus: "%100 yatırım bonusu",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$50",
    withdrawalTime: "Anında - 24 saat",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "ABD artık kabul etmiyor, 1:2000 kaldıraç, kripto-only depozito, ECN spread",
  },
  tastyfx: {
    id: "tastyfx",
    affiliateUrl: "https://www.tastyfx.com",
    hasBonus: false,
    bonusDetails: "Geleneksel bonus yok",
    welcomeBonus: "Yok",
    depositBonus: "Yok",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "ACH", "Kredi Kartı"],
    withdrawalMethods: ["Banka Havalesi", "ACH"],
    depositFee: "Ücretsiz",
    withdrawalFee: "$15 (tel. havalesi)",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "NFA/CFTC regülasyonlu, $0 minimum depozito, 1:50 kaldıraç, Ohio'da mevcut değil",
  },
};

// Bonus özet metni
export const getBonusSummary = (info: TRBrokerInfo): string => {
  if (!info.hasBonus) return "Yok";
  if (info.noDepositBonus && info.noDepositBonus !== "Yok") {
    return info.noDepositBonus;
  }
  if (info.welcomeBonus) {
    return info.welcomeBonus.split(" ")[0]; // İlk kelimeyi al (örn: "%20" veya "$30")
  }
  return "Var";
};

// BonusOffer formatına çevir (BonusCard için)
export interface TRBonusOffer {
  title: string;
  amount: string;
  type: "deposit" | "no-deposit" | "welcome" | "cashback" | "vps";
  description: string;
  requirements?: string[];
  minDeposit?: string;
  maxBonus?: string;
  termsUrl?: string;
  highlighted?: boolean;
}

export const getBonusOffers = (brokerId: string): TRBonusOffer[] => {
  const info = trBrokerInfo[brokerId];
  if (!info || !info.hasBonus) return [];

  const offers: TRBonusOffer[] = [];

  // No Deposit Bonus
  if (info.noDepositBonus && info.noDepositBonus !== "Yok") {
    offers.push({
      title: "Yatırımsız Bonus",
      amount: info.noDepositBonus,
      type: "no-deposit",
      description: "Hesap açın, doğrulama yapın ve yatırım yapmadan hemen alın!",
      requirements: ["Hesap doğrulaması gereklidir", "İşlem hacmi şartı olabilir"],
      highlighted: true,
    });
  }

  // Welcome Bonus
  if (info.welcomeBonus && info.welcomeBonus !== "Yok") {
    offers.push({
      title: "Hoşgeldin Bonusu",
      amount: info.welcomeBonus,
      type: "welcome",
      description: "İlk yatırımınızda özel bonus kazanın!",
      requirements: info.noDepositBonus && info.noDepositBonus !== "Yok"
        ? undefined
        : ["İlk yatırım gereklidir", "Bonus şartları geçerlidir"],
    });
  }

  // Deposit Bonus
  if (info.depositBonus && info.depositBonus !== "Yok" && info.depositBonus !== info.welcomeBonus) {
    offers.push({
      title: "Yatırım Bonusu",
      amount: info.depositBonus,
      type: "deposit",
      description: "Her yatırımınızda ekstra bonus kazanın!",
      requirements: ["Minimum yatırım şartı olabilir", "Çekme şartları geçerlidir"],
    });
  }

  return offers;
};
