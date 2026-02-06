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
    affiliateUrl: "/go/fxpro", // Redirect via our own domain to bypass ad blockers
    hasBonus: false,
    bonusDetails: "Bonus kampanyası bulunmuyor",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$50",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "FCA ve CySEC regülasyonlu, köklü broker",
  },
  hfm: {
    id: "hfm",
    affiliateUrl: "https://www.hf-anatbroker.com/en/?refid=30503439",
    homeUrl: "https://www.hfm-trade.com/sv/en/?refid=30503439",
    hasBonus: true,
    bonusDetails: "%20 Hoşgeldin Bonusu + Sadakat Programı",
    welcomeBonus: "%20 Hoşgeldin Bonusu (maks $5,000)",
    depositBonus: "%100 Supercharged Bonus",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$5",
    withdrawalTime: "Aynı gün - 24 saat",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Copy trading özelliği mevcut",
  },
  xm: {
    id: "xm",
    affiliateUrl: "https://affs.click/n3dTY",
    hasBonus: true,
    bonusDetails: "$30 Hoşgeldin Bonusu + %50 Yatırım Bonusu",
    welcomeBonus: "$30 Yatırımsız Bonus",
    depositBonus: "%50 + %20 Yatırım Bonusu (maks $5,000)",
    noDepositBonus: "$30",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$5",
    withdrawalTime: "24 saat içinde",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Düzenli webinarlar ve eğitimler",
  },
  exness: {
    id: "exness",
    affiliateUrl: "https://www.exness.com",
    hasBonus: false,
    bonusDetails: "Bonus kampanyası bulunmuyor",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto", "Papara"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto", "Papara"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$1",
    withdrawalTime: "Anında (kripto/e-cüzdan)",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Anında para çekme özelliği, Papara desteği",
  },
  fbs: {
    id: "fbs",
    affiliateUrl: "https://www.fbs.com",
    hasBonus: true,
    bonusDetails: "%100 Yatırım Bonusu + Cashback",
    welcomeBonus: "$100 Yatırımsız Bonus (Trade 100 Bonus)",
    depositBonus: "%100 Yatırım Bonusu",
    noDepositBonus: "$100 (Trade 100 Bonus)",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller", "Kripto"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller", "Kripto"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$1",
    withdrawalTime: "15 dakika - 48 saat",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "En yüksek kaldıraç (1:3000), cömert bonuslar",
  },
  pepperstone: {
    id: "pepperstone",
    affiliateUrl: "https://www.pepperstone.com",
    hasBonus: false,
    bonusDetails: "Bonus kampanyası bulunmuyor",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "PayPal", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "PayPal", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$0",
    withdrawalTime: "1-3 iş günü",
    turkishSupport: false,
    turkishWebsite: false,
    trNotes: "En düşük spread'ler, profesyonel trader'lar için ideal",
  },
  fxtm: {
    id: "fxtm",
    affiliateUrl: "https://www.forextime.com",
    hasBonus: true,
    bonusDetails: "Sadakat Cashback Programı",
    welcomeBonus: "Yok",
    depositBonus: "Cashback programı mevcut",
    noDepositBonus: "Yok",
    depositMethods: ["Banka Havalesi", "Kredi Kartı", "Skrill", "Neteller"],
    withdrawalMethods: ["Banka Havalesi", "Skrill", "Neteller"],
    depositFee: "Ücretsiz",
    withdrawalFee: "Ücretsiz",
    minWithdrawal: "$3",
    withdrawalTime: "24 saat içinde",
    turkishSupport: true,
    turkishWebsite: true,
    trNotes: "Copy trading (FXTM Invest) mevcut",
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
