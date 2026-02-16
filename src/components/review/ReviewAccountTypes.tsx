import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AccountType } from "@/lib/brokerReviewData";

interface ReviewAccountTypesProps {
  accountTypes: AccountType[];
}

const ReviewAccountTypes = ({ accountTypes }: ReviewAccountTypesProps) => {
  const gridCols = accountTypes.length <= 2
    ? "md:grid-cols-2"
    : accountTypes.length === 3
    ? "md:grid-cols-3"
    : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Account Types</h2>
          <div className={`grid ${gridCols} gap-4`}>
            {accountTypes.map((account, i) => (
              <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                {account.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Recommended</div>}
                <CardHeader className="text-center pb-2"><CardTitle className="text-lg">{account.name}</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Min Deposit</span><span className="font-medium">{account.minDeposit}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Leverage</span><span className="font-medium">{account.leverage}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Spread</span><span className="font-medium">{account.spread}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="font-medium">{account.commission}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewAccountTypes;
