import { Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewProsAndConsProps {
  pros: string[];
  cons: string[];
}

const ReviewProsAndCons = ({ pros, cons }: ReviewProsAndConsProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-success/30">
              <CardHeader><CardTitle className="flex items-center gap-2 text-success"><Check className="w-6 h-6" />Advantages</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-success shrink-0 mt-0.5" /><span className="text-muted-foreground">{pro}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-destructive/30">
              <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-6 h-6" />Disadvantages</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-3"><span className="text-destructive shrink-0 mt-0.5">✕</span><span className="text-muted-foreground">{con}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewProsAndCons;
