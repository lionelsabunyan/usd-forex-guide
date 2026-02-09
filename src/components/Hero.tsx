import { useState, useEffect } from "react";
import { ArrowRight, Shield, Award, TrendingUp, CheckCircle, RefreshCw, FileText } from "lucide-react";
import { Button } from "./ui/button";

// Country code to name mapping
const countryNames: Record<string, string> = {
  US: "the United States",
  GB: "the United Kingdom",
  UK: "the United Kingdom",
  DE: "Germany",
  AU: "Australia",
  CA: "Canada",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "the Netherlands",
  BE: "Belgium",
  CH: "Switzerland",
  AT: "Austria",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  IE: "Ireland",
  PL: "Poland",
  PT: "Portugal",
  GR: "Greece",
  CZ: "Czech Republic",
  RO: "Romania",
  HU: "Hungary",
  TR: "Turkey",
  RU: "Russia",
  UA: "Ukraine",
  IN: "India",
  PK: "Pakistan",
  BD: "Bangladesh",
  ID: "Indonesia",
  MY: "Malaysia",
  SG: "Singapore",
  TH: "Thailand",
  VN: "Vietnam",
  PH: "the Philippines",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  HK: "Hong Kong",
  TW: "Taiwan",
  NZ: "New Zealand",
  ZA: "South Africa",
  NG: "Nigeria",
  EG: "Egypt",
  KE: "Kenya",
  GH: "Ghana",
  AE: "the UAE",
  SA: "Saudi Arabia",
  IL: "Israel",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CO: "Colombia",
  CL: "Chile",
  PE: "Peru",
};

const Hero = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/country/", {
          signal: AbortSignal.timeout(3000),
        });
        if (response.ok) {
          const countryCode = await response.text();
          setCountry(countryCode.trim().toUpperCase());
        }
      } catch {
        // Silently fail, will show fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  const getHeadline = () => {
    if (loading) {
      return (
        <>
          Find Your <span className="text-gradient-gold">Perfect</span> Forex Broker
        </>
      );
    }

    // Only show geo-personalization for US and TR visitors (target markets)
    if (country === "US" || country === "TR") {
      return (
        <>
          Find Your Forex Broker <span className="text-gradient-gold">in {countryNames[country]}</span>
        </>
      );
    }

    // All other countries see generic headline
    return (
      <>
        Find Your <span className="text-gradient-gold">Perfect</span> Forex Broker
      </>
    );
  };

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center bg-gradient-hero overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

        {/* Trading Chart SVG Background */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-auto opacity-[0.06] hidden lg:block"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid lines */}
          <g stroke="currentColor" strokeWidth="0.5" className="text-primary">
            {[...Array(6)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} opacity="0.3" />
            ))}
            {[...Array(9)].map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" opacity="0.3" />
            ))}
          </g>

          {/* Candlestick chart */}
          <g className="text-success">
            {/* Green candles (up) */}
            <rect x="20" y="120" width="8" height="60" fill="currentColor" opacity="0.8" />
            <line x1="24" y1="100" x2="24" y2="200" stroke="currentColor" strokeWidth="2" />

            <rect x="60" y="80" width="8" height="80" fill="currentColor" opacity="0.8" />
            <line x1="64" y1="60" x2="64" y2="180" stroke="currentColor" strokeWidth="2" />

            <rect x="140" y="100" width="8" height="50" fill="currentColor" opacity="0.8" />
            <line x1="144" y1="80" x2="144" y2="170" stroke="currentColor" strokeWidth="2" />

            <rect x="220" y="70" width="8" height="70" fill="currentColor" opacity="0.8" />
            <line x1="224" y1="50" x2="224" y2="160" stroke="currentColor" strokeWidth="2" />

            <rect x="300" y="60" width="8" height="60" fill="currentColor" opacity="0.8" />
            <line x1="304" y1="40" x2="304" y2="140" stroke="currentColor" strokeWidth="2" />

            <rect x="340" y="50" width="8" height="80" fill="currentColor" opacity="0.8" />
            <line x1="344" y1="30" x2="344" y2="150" stroke="currentColor" strokeWidth="2" />
          </g>

          <g className="text-destructive">
            {/* Red candles (down) */}
            <rect x="100" y="100" width="8" height="70" fill="currentColor" opacity="0.8" />
            <line x1="104" y1="80" x2="104" y2="190" stroke="currentColor" strokeWidth="2" />

            <rect x="180" y="90" width="8" height="60" fill="currentColor" opacity="0.8" />
            <line x1="184" y1="70" x2="184" y2="170" stroke="currentColor" strokeWidth="2" />

            <rect x="260" y="80" width="8" height="50" fill="currentColor" opacity="0.8" />
            <line x1="264" y1="60" x2="264" y2="150" stroke="currentColor" strokeWidth="2" />
          </g>

          {/* Trend line */}
          <path
            d="M 20 180 Q 100 140, 180 120 T 340 60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
            opacity="0.6"
            strokeDasharray="5,5"
          />

          {/* Moving average line */}
          <path
            d="M 20 150 C 80 130, 140 110, 200 100 S 280 80, 380 50"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-accent"
            opacity="0.5"
          />
        </svg>

        {/* US Flag inspired stripes (subtle) */}
        <div className="absolute left-0 bottom-0 w-32 h-64 opacity-[0.03] hidden md:block">
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`h-4 ${i % 2 === 0 ? 'bg-red-500' : 'bg-white'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/70 font-medium">Independent Forex Broker Reviews</span>
          </div>

          {/* Dynamic headline */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {getHeadline()}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            For serious traders who value research over hype.
          </p>
          <p className="text-base text-muted-foreground/70 max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            Unbiased reviews. Real comparisons. Data-driven analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" asChild>
              <a href="/compare">
                Compare Brokers Now
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-primary/30 text-foreground hover:bg-primary/5"
              asChild
            >
              <a href="/guides/how-we-review">
                See Our Methodology
              </a>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {/* Numbers row */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">25+</p>
                <p className="text-sm text-muted-foreground">Brokers Reviewed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">In-Depth Guides</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">$0</p>
                <p className="text-sm text-muted-foreground">Min. Deposit Options</p>
              </div>
            </div>

            {/* Checkmark trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Transparent Methodology
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-green-500" />
                Updated Monthly
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-500" />
                No Paid Placements
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
