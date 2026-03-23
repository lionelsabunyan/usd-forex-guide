import { useEffect, useRef } from "react";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { brokers, BrokerId, Broker } from "@/lib/brokers";
import BrokerLogo from "./BrokerLogo";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

export type WidgetColumn =
  | "rating"
  | "minDeposit"
  | "leverage"
  | "spreads"
  | "regulation"
  | "platforms"
  | "bonus"
  | "usAccepted";

interface BrokerComparisonWidgetProps {
  /** Broker IDs to display */
  brokerSlugs: BrokerId[];
  /** Columns to show (default: rating, spreads, leverage, minDeposit) */
  columns?: WidgetColumn[];
  /** Widget title */
  title?: string;
  /** GA4 tracking context — identifies where the widget is placed */
  trackingContext?: string;
}

const COLUMN_LABELS: Record<WidgetColumn, string> = {
  rating: "Rating",
  minDeposit: "Min Deposit",
  leverage: "Leverage",
  spreads: "Spreads",
  regulation: "Regulation",
  platforms: "Platforms",
  bonus: "Bonus",
  usAccepted: "US Accepted",
};

const DEFAULT_COLUMNS: WidgetColumn[] = ["rating", "spreads", "leverage", "minDeposit"];

function getCellValue(broker: Broker, col: WidgetColumn): React.ReactNode {
  switch (col) {
    case "rating":
      return (
        <span className="inline-flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="font-semibold">{broker.rating?.toFixed(1)}</span>
        </span>
      );
    case "minDeposit":
      return broker.minDepositDisplay;
    case "leverage":
      return broker.leverage;
    case "spreads":
      return broker.spreads;
    case "regulation":
      return broker.regulation;
    case "platforms":
      return broker.platforms.join(", ");
    case "bonus":
      return broker.bonus ? (
        <span className="text-primary font-medium">{broker.bonus}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    case "usAccepted":
      return broker.usAccepted ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-muted-foreground">No</span>
      );
    default:
      return "—";
  }
}

const BrokerComparisonWidget = ({
  brokerSlugs,
  columns = DEFAULT_COLUMNS,
  title,
  trackingContext = "widget",
}: BrokerComparisonWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  const widgetBrokers = brokerSlugs
    .map((slug) => brokers[slug])
    .filter(Boolean);

  // GA4: track widget_view when visible
  useEffect(() => {
    const el = widgetRef.current;
    if (!el || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "widget_view", {
              widget_type: "broker_comparison",
              widget_context: trackingContext,
              broker_count: widgetBrokers.length,
              broker_ids: brokerSlugs.join(","),
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trackingContext, widgetBrokers.length, brokerSlugs]);

  const handleClick = (brokerId: BrokerId) => {
    trackAffiliateClick(brokerId, `widget_${trackingContext}`, "open_account");

    // GA4: widget_click
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "widget_click", {
        widget_type: "broker_comparison",
        widget_context: trackingContext,
        broker_id: brokerId,
        broker_name: brokers[brokerId]?.name,
      });
    }
  };

  if (widgetBrokers.length === 0) return null;

  return (
    <div ref={widgetRef} className="my-8">
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary">
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Broker
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-center text-xs font-semibold text-foreground uppercase tracking-wider"
                >
                  {COLUMN_LABELS[col]}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {widgetBrokers.map((broker) => (
              <tr
                key={broker.id}
                className="border-t border-border transition-colors hover:bg-secondary/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <BrokerLogo
                      broker={broker}
                      className="w-8 h-8 rounded-md"
                    />
                    <Link
                      to={broker.reviewUrl}
                      className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
                    >
                      {broker.name}
                    </Link>
                  </div>
                </td>
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-4 py-3 text-center text-sm text-foreground"
                  >
                    {getCellValue(broker, col)}
                  </td>
                ))}
                <td className="px-4 py-3 text-center">
                  <Button variant="default" size="sm" className="gap-1" asChild>
                    <a
                      href={getAffiliateUrl(broker.id, {
                        source: trackingContext,
                        medium: "widget",
                        campaign: "comparison_widget",
                        content: "visit_broker",
                      })}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      onClick={() => handleClick(broker.id)}
                    >
                      Visit Broker
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {widgetBrokers.map((broker) => (
          <div
            key={broker.id}
            className="rounded-xl border border-border p-4 bg-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <BrokerLogo broker={broker} className="w-10 h-10 rounded-lg" />
              <div>
                <Link
                  to={broker.reviewUrl}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {broker.name}
                </Link>
                {columns.includes("rating") && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-sm font-medium">
                      {broker.rating?.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {columns
                .filter((col) => col !== "rating")
                .slice(0, 4)
                .map((col) => (
                  <div
                    key={col}
                    className="bg-secondary rounded-lg px-2.5 py-1.5 text-center"
                  >
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {COLUMN_LABELS[col]}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {getCellValue(broker, col)}
                    </p>
                  </div>
                ))}
            </div>

            <Button
              variant="default"
              size="sm"
              className="w-full gap-1 min-h-[44px]"
              asChild
            >
              <a
                href={getAffiliateUrl(broker.id, {
                  source: trackingContext,
                  medium: "widget_mobile",
                  campaign: "comparison_widget",
                  content: "visit_broker",
                })}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => handleClick(broker.id)}
              >
                Visit Broker
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
        <span className="font-medium text-yellow-600">Risk Warning:</span>{" "}
        Trading forex/CFDs carries high risk. 74-89% of retail accounts lose
        money.
      </p>
    </div>
  );
};

export default BrokerComparisonWidget;
