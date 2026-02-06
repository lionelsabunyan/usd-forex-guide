import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
  image?: string;
  tips?: string[];
  warning?: string;
};

type HesapAcmaRehberiProps = {
  brokerName: string;
  brokerId: string;
  affiliateUrl: string;
  steps: Step[];
  estimatedTime?: string;
  requirements?: string[];
};

const HesapAcmaRehberi = ({
  brokerName,
  brokerId,
  affiliateUrl,
  steps,
  estimatedTime = "5-10 dakika",
  requirements = ["Geçerli e-posta adresi", "Cep telefonu numarası", "Kimlik belgesi (doğrulama için)"],
}: HesapAcmaRehberiProps) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <section className="py-8 bg-gradient-to-b from-primary/5 to-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className="flex items-center justify-between cursor-pointer mb-6"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                📋 {brokerName} Hesap Açma Rehberi
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Tahmini süre: {estimatedTime} • {steps.length} adım
              </p>
            </div>
            <Button variant="ghost" size="sm">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>

          {isExpanded && (
            <>
              {/* Requirements */}
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Hesap Açmadan Önce Hazırlayın
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA Button */}
              <div className="mb-6 text-center">
                <Button size="lg" asChild className="gap-2">
                  <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                    {brokerName}'de Hesap Aç
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Aşağıdaki adımları takip ederek kolayca hesap açabilirsiniz
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "transition-all duration-200",
                      expandedStep === index ? "border-primary shadow-md" : "border-border"
                    )}
                  >
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => toggleStep(index)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-3">
                          <span className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            expandedStep === index
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}>
                            {index + 1}
                          </span>
                          {step.title}
                        </CardTitle>
                        {expandedStep === index ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>

                    {expandedStep === index && (
                      <CardContent className="pt-0">
                        <div className="pl-11">
                          <p className="text-muted-foreground mb-4">
                            {step.description}
                          </p>

                          {step.image && (
                            <div className="mb-4 rounded-lg overflow-hidden border border-border bg-secondary/50">
                              <img
                                src={step.image}
                                alt={`Adım ${index + 1}: ${step.title}`}
                                className="w-full h-auto"
                              />
                            </div>
                          )}

                          {step.tips && step.tips.length > 0 && (
                            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 mb-3">
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">💡 İpuçları:</p>
                              <ul className="space-y-1">
                                {step.tips.map((tip, i) => (
                                  <li key={i} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                                    <span>•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {step.warning && (
                            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3">
                              <p className="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {step.warning}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {/* Final CTA */}
              <div className="mt-8 text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">Hazır mısınız?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Yukarıdaki adımları takip ederek birkaç dakika içinde {brokerName} hesabınızı açabilirsiniz.
                </p>
                <Button size="lg" asChild className="gap-2">
                  <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                    Şimdi Hesap Aç
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HesapAcmaRehberi;
