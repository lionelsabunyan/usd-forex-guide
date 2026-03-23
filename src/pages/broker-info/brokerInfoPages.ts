import { BrokerId, brokers } from "@/lib/brokers";

export type BrokerInfoTopic = "minimum-deposit" | "spreads" | "fees";

export const BROKER_SLUGS: Record<BrokerId, string> = {
  fxglory: "fxglory",
  hankotrade: "hankotrade",
  midasfx: "midasfx",
  n1cm: "n1cm",
  hfm: "hfm",
  lmfx: "lmfx",
  coinexx: "coinexx",
  plexytrade: "plexytrade",
  exness: "exness",
  pepperstone: "pepperstone",
  xm: "xm",
  fxtm: "fxtm",
  fbs: "fbs",
  etoro: "etoro",
  fxpro: "fxpro",
  oanda: "oanda",
  ig: "ig",
  forexcom: "forex-com",
  interactivebrokers: "interactive-brokers",
  avatrade: "avatrade",
  charlesschwab: "charles-schwab",
  tastyfx: "tastyfx",
};

export const SLUG_TO_BROKER_ID: Record<string, BrokerId> = Object.fromEntries(
  Object.entries(BROKER_SLUGS).map(([id, slug]) => [slug, id as BrokerId])
) as Record<string, BrokerId>;

export function getBrokerBySlug(slug: string) {
  const brokerId = SLUG_TO_BROKER_ID[slug];
  if (!brokerId) return null;
  return brokers[brokerId];
}

export function getAllBrokerInfoRoutes() {
  const topics: BrokerInfoTopic[] = ["minimum-deposit", "spreads", "fees"];
  const routes: { path: string; brokerId: BrokerId; topic: BrokerInfoTopic }[] = [];

  for (const [brokerId, slug] of Object.entries(BROKER_SLUGS)) {
    for (const topic of topics) {
      routes.push({
        path: `/brokers/${slug}/${topic}`,
        brokerId: brokerId as BrokerId,
        topic,
      });
    }
  }

  return routes;
}

// Top 5 brokers by category for comparison tables
export function getTopBrokersByMinDeposit() {
  return Object.values(brokers)
    .sort((a, b) => a.minDeposit - b.minDeposit)
    .slice(0, 5);
}

export function getTopBrokersBySpreads() {
  return Object.values(brokers)
    .sort((a, b) => a.spreadsFrom - b.spreadsFrom)
    .slice(0, 5);
}

export function getIndustryAverageMinDeposit() {
  const deposits = Object.values(brokers).map((b) => b.minDeposit);
  return Math.round(deposits.reduce((a, b) => a + b, 0) / deposits.length);
}

export function getIndustryAverageSpread() {
  const spreads = Object.values(brokers).map((b) => b.spreadsFrom);
  return +(spreads.reduce((a, b) => a + b, 0) / spreads.length).toFixed(1);
}
