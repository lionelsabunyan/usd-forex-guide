import { Check, AlertTriangle, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Fact {
  label: string;
  value: string;
  type?: "positive" | "warning" | "neutral";
}

interface QuickFactsProps {
  facts: Fact[];
  title?: string;
}

const QuickFacts = ({ facts, title = "Quick Facts" }: QuickFactsProps) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case "positive":
        return <Check className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getIconBg = (type?: string) => {
    switch (type) {
      case "positive":
        return "bg-green-50";
      case "warning":
        return "bg-amber-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <Card className="my-8 border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className={`p-2 rounded-full ${getIconBg(fact.type)}`}>
                {getIcon(fact.type)}
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground font-medium">
                  {fact.label}
                </div>
                <div className="text-base font-semibold mt-1">{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickFacts;
