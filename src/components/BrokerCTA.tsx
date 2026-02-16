import { TrendingUp, ArrowRight, Star, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { brokers, type BrokerId } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

interface BrokerCTAProps {
  resultText: string;
  brokerName: string;
  brokerSlug: string;
  minDeposit: string;
  leverage: string;
  rating: string;
  ctaText?: string;
}

const BrokerCTA = ({
  resultText,
  brokerName,
  brokerSlug,
  minDeposit,
  leverage,
  rating,
  ctaText = "Open Account"
}: BrokerCTAProps) => {
  const brokerId = brokerSlug as BrokerId;
  const broker = brokers[brokerId];
  const hasAffiliate = broker?.affiliateUrl;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-5 mt-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
            {resultText}
          </p>
          <p className="text-lg font-bold text-green-900 dark:text-green-100">
            Recommended Broker for Your Position
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-green-200 dark:border-green-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {brokerName}
              </h4>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">
                  {rating}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Min Deposit</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{minDeposit}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Max Leverage</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{leverage}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Button
              asChild
              size="lg"
              className="bg-gradient-gold hover:opacity-90 text-primary-foreground"
            >
              <a
                href={getAffiliateUrl(brokerId, UTM_CONFIGS.BLOG_INLINE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick(brokerId, "tool_result", "open_account")}
                className="gap-2"
              >
                {ctaText}
                {hasAffiliate ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/review/${brokerSlug}`} className="gap-1 text-xs">
                Read Full Review
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-muted-foreground">
            ✓ US Traders Accepted • ✓ Crypto Deposits • ✓ Fast Withdrawals
          </p>
        </div>
      </div>

      <p className="text-xs text-green-700 dark:text-green-300 mt-3 text-center">
        This recommendation is based on your position size and risk profile
      </p>
    </div>
  );
};

export default BrokerCTA;
