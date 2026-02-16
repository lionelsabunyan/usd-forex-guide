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
  hfm: {
    id: "hfm",
    affiliateUrl: "https://www.hf-anatbroker.com/en/?refid=30503439",
    homeUrl: "https://www.hfm-trade.com/sv/en/?refid=30503439",
    hasBonus: true,
    bonusDetails: "%50 Hoşgeldin + %100 Supercharged Bonus",
    welcomeBonus: "%50 Hoşgeldin Bonusu (min $50)",
    depositBonus: "%100 Supercharged Bonus (maks $50,000)",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$5",
    withdrawalTime: "Aynı gün - 24 saat",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Shield 500 bonusu + Copy trading özelliği",
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
    affiliateUrl: "https://www.exness.com",
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
    affiliateUrl: "https://www.forextime.com",
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
};

// Bonus durumuna göre etiket rengi
export const getBonusBadgeClass = (hasBonus: boolean): string => {
  return hasBonus
    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
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
