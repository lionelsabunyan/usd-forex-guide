import { LucideIcon } from "lucide-react";
import { BrokerId } from "./brokers";
import { BonusOffer } from "@/components/BonusCard";

export interface ReviewRating {
  label: string;
  score: number;
  description: string;
}

export interface AccountType {
  name: string;
  minDeposit: string;
  leverage: string;
  spread: string;
  commission: string;
  features?: string[];
  popular?: boolean;
}

export interface AccountOpeningStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  time: string;
}

export interface PaymentMethod {
  method: string;
  deposit: string;
  withdrawal: string;
  fee: string;
  recommended?: boolean;
}

export interface CompetitorComparisonRow {
  feature: string;
  broker: string;
  competitor1: string;
  competitor2: string;
}

export interface CompetitorInfo {
  name: string;
  id: BrokerId;
}

export interface CommunityFeedback {
  positiveThemes: string[];
  negativeThemes: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface QuickStat {
  label: string;
  value: string;
  colorClass?: string; // e.g. "text-primary", "text-success", "text-muted-foreground"
}

export interface PromoBanner {
  imageWebp: string;
  imagePng: string;
  alt: string;
  href?: string; // If not provided, uses affiliate URL
}

export interface BrokerReviewData {
  // Identity
  brokerId: BrokerId;
  brokerName: string;
  subtitle: string;
  heroDescription: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
  canonical: string;

  // Ratings
  overallRating: number;
  ratingCount: number;
  reviewCount: number;
  trustScore: number;
  trustpilotRating?: number;
  trustpilotReviews?: number;

  // Hero badge
  heroBadge: {
    icon: LucideIcon;
    text: string;
    colorClass: string;
  };

  // Key Highlights
  keyHighlights: {
    minDeposit: string;
    maxLeverage: string;
    spreadFrom: string;
    usClients: "YES" | "NO" | "LIMITED";
  };

  // Warning banner
  warningBanner: {
    text: string;
  };

  // Trust features (4 items)
  trustFeatures: Array<{
    icon: LucideIcon;
    text: string;
  }>;

  // Quick Stats sidebar
  quickStats: QuickStat[];

  // Optional promo banner
  promoBanner?: PromoBanner;

  // Data sections
  ratings: ReviewRating[];
  accountTypes: AccountType[];
  accountOpeningSteps: AccountOpeningStep[];
  paymentMethods: PaymentMethod[];

  // Competitor comparison
  competitors: [CompetitorInfo, CompetitorInfo];
  competitorComparison: CompetitorComparisonRow[];

  communityFeedback: CommunityFeedback;
  faqs: FAQItem[];
  pros: string[];
  cons: string[];

  // Optional sections
  bonusOffers?: BonusOffer[];
  lastUpdated?: string;
  quotableFact?: {
    fact: string;
    source?: string;
    type?: "stat" | "quote" | "money" | "regulation" | "time";
  };
}
