import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calculator, Target, DollarSign, TrendingUp, Clock, Percent, Calendar } from "lucide-react";
import SEO from "@/components/SEO";

const tools = [
  {
    id: "pip-calculator",
    name: "Pip Calculator",
    description: "Calculate pip value for any forex pair instantly. Essential for risk management.",
    icon: Calculator,
    url: "/tools/pip-calculator",
    status: "live",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "position-size-calculator",
    name: "Position Size Calculator",
    description: "Calculate perfect position size based on account size and risk tolerance.",
    icon: Target,
    url: "/tools/position-size-calculator",
    status: "live",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "profit-loss-calculator",
    name: "Profit/Loss Calculator",
    description: "Calculate potential profit or loss before entering a trade.",
    icon: TrendingUp,
    url: "/tools/profit-loss-calculator",
    status: "live",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "margin-calculator",
    name: "Margin Calculator",
    description: "Calculate required margin for your trades based on leverage.",
    icon: Percent,
    url: "/tools/margin-calculator",
    status: "live",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "forex-tax-calculator",
    name: "Forex Tax Calculator (US)",
    description: "Estimate your forex trading taxes. Section 988 vs 1256 comparison.",
    icon: DollarSign,
    url: "/tools/forex-tax-calculator",
    status: "live",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "economic-calendar",
    name: "Economic Calendar",
    description: "Track market-moving economic events in real-time. Essential for news trading.",
    icon: Calendar,
    url: "/tools/economic-calendar",
    status: "live",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "trading-session-clock",
    name: "Trading Session Clock",
    description: "See which forex markets are open right now with live session times.",
    icon: Clock,
    url: "/tools/trading-sessions",
    status: "coming-soon",
    color: "bg-cyan-100 text-cyan-600",
  },
];

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Forex Trading Tools & Calculators 2026"
        description="Free forex tools: Pip calculator, position size calculator, profit/loss calculator, margin calculator, and more. Essential tools for forex traders."
        canonical="/tools"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Forex Trading Tools",
          "description": "Free forex trading calculators and tools",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": tools.map((tool, index) => ({
              "@type": "SoftwareApplication",
              "position": index + 1,
              "name": tool.name,
              "description": tool.description,
              "applicationCategory": "FinanceApplication",
              "offers": { "@type": "Offer", "price": "0" }
            }))
          }
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-4 inline-block">
              100% Free Tools
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Forex Trading <span className="text-gradient-gold">Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Essential calculators and tools for forex traders. All free, no signup required.
              Calculate pip value, position size, profit/loss, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className={`bg-card border border-border rounded-2xl p-6 transition-all ${
                  tool.status === "live"
                    ? "hover:border-primary/50 hover:shadow-lg cursor-pointer"
                    : "opacity-70"
                }`}
              >
                {tool.status === "live" ? (
                  <Link to={tool.url} className="block">
                    <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                    <span className="inline-flex items-center text-primary text-sm font-medium">
                      Use Tool →
                    </span>
                  </Link>
                ) : (
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4 opacity-50`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                    <span className="inline-flex items-center text-muted-foreground text-sm">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Why Use Our Tools */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-heading font-bold mb-8 text-center">
              Why Use Our <span className="text-gradient-gold">Tools?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">✓</span>
                </div>
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-sm text-muted-foreground">
                  No signup, no credit card, no hidden fees. Use our tools instantly.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time calculations. See results as you type - no page reloads.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🇺🇸</span>
                </div>
                <h3 className="font-semibold mb-2">US Trader Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Built with CFTC regulations in mind. Includes US-specific features like tax calculator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolsPage;
