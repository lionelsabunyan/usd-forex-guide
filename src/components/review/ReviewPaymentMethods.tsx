import { Card } from "@/components/ui/card";
import type { PaymentMethod } from "@/lib/brokerReviewData";

interface ReviewPaymentMethodsProps {
  paymentMethods: PaymentMethod[];
}

const ReviewPaymentMethods = ({ paymentMethods }: ReviewPaymentMethodsProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Deposit & Withdrawal Methods</h2>
          <Card className="bg-gradient-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Method</th>
                    <th className="text-left p-4 font-medium text-foreground">Deposit Time</th>
                    <th className="text-left p-4 font-medium text-foreground">Withdrawal Time</th>
                    <th className="text-left p-4 font-medium text-foreground">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{method.method}</span>
                          {method.recommended && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Recommended</span>}
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{method.deposit}</td>
                      <td className="p-4 text-muted-foreground">{method.withdrawal}</td>
                      <td className="p-4 text-muted-foreground">{method.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReviewPaymentMethods;
