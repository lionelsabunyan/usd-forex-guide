import { Search, FileCheck, UserPlus, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Research Brokers",
    description: "Browse our comprehensive reviews and comparisons to find brokers that match your trading needs.",
  },
  {
    icon: FileCheck,
    title: "Compare Features",
    description: "Evaluate spreads, leverage, minimum deposits, and other key factors using our comparison tools.",
  },
  {
    icon: UserPlus,
    title: "Open an Account",
    description: "Click through to your chosen broker and complete their quick registration process.",
  },
  {
    icon: TrendingUp,
    title: "Start Trading",
    description: "Fund your account and begin trading with confidence, knowing you've made an informed choice.",
  },
];

const HowItWorks = () => {
  return (
    <section id="guides" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            How to Get Started
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to find and open your forex trading account
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <div className="relative flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-card border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:glow-gold group-hover:border-primary/50">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
