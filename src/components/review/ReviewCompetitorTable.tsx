import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";
import type { BrokerId } from "@/lib/brokers";
import type { CompetitorComparisonRow, CompetitorInfo } from "@/lib/brokerReviewData";

interface ReviewCompetitorTableProps {
  brokerId: BrokerId;
  brokerName: string;
  competitors: [CompetitorInfo, CompetitorInfo];
  rows: CompetitorComparisonRow[];
}

const renderCell = (value: string, isPrimary: boolean) => {
  if (value === "Yes" || value.startsWith("Yes")) {
    return <span className={`${isPrimary ? "text-success font-medium" : "text-success"}`}>{value} ✓</span>;
  }
  if (value === "No") {
    return <span className="text-destructive">✗</span>;
  }
  return <span className={isPrimary ? "font-medium text-primary" : "text-muted-foreground"}>{value}</span>;
};

const ReviewCompetitorTable = ({ brokerId, brokerName, competitors, rows }: ReviewCompetitorTableProps) => {
  const broker = brokers[brokerId];
  const comp1 = brokers[competitors[0].id];
  const comp2 = brokers[competitors[1].id];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              {brokerName} vs Competitors
            </h2>
            <p className="text-muted-foreground">
              See how {brokerName} compares to other popular brokers
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <BrokerLogo broker={broker} className="w-8 h-8 rounded" imgClassName="p-1" />
                      <span className="font-bold text-primary">{brokerName}</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <BrokerLogo broker={comp1} className="w-8 h-8 rounded" imgClassName="p-1" />
                      <span className="font-medium text-foreground">{competitors[0].name}</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <BrokerLogo broker={comp2} className="w-8 h-8 rounded" imgClassName="p-1" />
                      <span className="font-medium text-foreground">{competitors[1].name}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4 text-muted-foreground">{row.feature}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row.broker, true)}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row.competitor1, false)}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row.competitor2, false)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCompetitorTable;
