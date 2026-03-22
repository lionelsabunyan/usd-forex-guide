import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ChevronRight, ChevronLeft, Star, ExternalLink, RotateCcw } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { brokers, Broker, BrokerId } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick } from "@/lib/tracking";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";

// ─── Quiz Types ───────────────────────────────────────────

type QuizAnswer = {
  experience: "beginner" | "intermediate" | "advanced" | null;
  usTrader: boolean | null;
  platform: "mt4" | "mt5" | "any" | null;
  deposit: "micro" | "low" | "medium" | "high" | null;
  style: "scalping" | "swing" | "position" | null;
  regulation: "strict" | "offshore_ok" | "no_pref" | null;
  priority: "low_spreads" | "low_deposit" | "high_leverage" | "strong_regulation" | null;
};

type QuizStep = {
  key: keyof QuizAnswer;
  question: string;
  subtitle: string;
  options: { value: string; label: string; description: string }[];
};

const QUIZ_STEPS: QuizStep[] = [
  {
    key: "usTrader",
    question: "Are you based in the United States?",
    subtitle: "This affects which brokers can legally serve you.",
    options: [
      { value: "true", label: "Yes, I'm a US resident", description: "Show only US-accepted brokers" },
      { value: "false", label: "No, I'm outside the US", description: "Show all available brokers" },
    ],
  },
  {
    key: "experience",
    question: "What's your forex trading experience?",
    subtitle: "We'll match brokers to your skill level.",
    options: [
      { value: "beginner", label: "Beginner", description: "New to forex, looking for easy-to-use platforms" },
      { value: "intermediate", label: "Intermediate", description: "Some experience, want better tools & conditions" },
      { value: "advanced", label: "Advanced", description: "Experienced trader, need pro-level execution" },
    ],
  },
  {
    key: "platform",
    question: "Which trading platform do you prefer?",
    subtitle: "Most brokers support MetaTrader, but some have proprietary platforms.",
    options: [
      { value: "mt4", label: "MetaTrader 4", description: "Classic, reliable, huge EA/indicator library" },
      { value: "mt5", label: "MetaTrader 5", description: "Newer, more timeframes, depth of market" },
      { value: "any", label: "No preference", description: "I'm open to any platform" },
    ],
  },
  {
    key: "deposit",
    question: "What's your initial deposit budget?",
    subtitle: "Some brokers allow starting with as little as $1.",
    options: [
      { value: "micro", label: "Under $50", description: "Micro accounts, test the waters" },
      { value: "low", label: "$50 – $200", description: "Small but serious start" },
      { value: "medium", label: "$200 – $500", description: "Standard trading capital" },
      { value: "high", label: "$500+", description: "Full-size accounts, best conditions" },
    ],
  },
  {
    key: "style",
    question: "What's your preferred trading style?",
    subtitle: "Different styles need different broker features.",
    options: [
      { value: "scalping", label: "Scalping", description: "Quick trades, tight spreads essential" },
      { value: "swing", label: "Swing Trading", description: "Hold for days, need good analysis tools" },
      { value: "position", label: "Position Trading", description: "Long-term, swap rates matter" },
    ],
  },
  {
    key: "regulation",
    question: "How important is broker regulation to you?",
    subtitle: "Stricter regulation usually means more safety but lower leverage.",
    options: [
      { value: "strict", label: "Top-tier regulation only", description: "CFTC/NFA, FCA, ASIC, CySEC" },
      { value: "offshore_ok", label: "Offshore is fine", description: "Higher leverage, more flexibility" },
      { value: "no_pref", label: "No strong preference", description: "Show me the best overall match" },
    ],
  },
  {
    key: "priority",
    question: "What matters most to you in a broker?",
    subtitle: "Pick your #1 priority — we'll weight results accordingly.",
    options: [
      { value: "low_spreads", label: "Lowest spreads", description: "Minimize trading costs" },
      { value: "low_deposit", label: "Low minimum deposit", description: "Start small, grow over time" },
      { value: "high_leverage", label: "High leverage", description: "Maximize position size" },
      { value: "strong_regulation", label: "Strong regulation", description: "Safety first" },
    ],
  },
];

// ─── Scoring Engine ───────────────────────────────────────

function scoreBroker(broker: Broker, answers: QuizAnswer): number {
  let score = 0;

  // Base score from broker rating
  score += broker.rating * 2;

  // US trader filter (hard filter, but we also weight it)
  if (answers.usTrader === true && !broker.usAccepted) return -1;

  // Platform match
  if (answers.platform === "mt4" && broker.platforms.includes("MT4")) score += 3;
  if (answers.platform === "mt5" && broker.platforms.includes("MT5")) score += 3;
  if (answers.platform === "any") score += 1;

  // Deposit budget match
  if (answers.deposit === "micro" && broker.minDeposit <= 50) score += 3;
  if (answers.deposit === "low" && broker.minDeposit <= 200) score += 2;
  if (answers.deposit === "medium" && broker.minDeposit <= 500) score += 2;
  if (answers.deposit === "high") score += 1;

  // Trading style
  if (answers.style === "scalping") {
    score += broker.spreadsFrom <= 0.5 ? 4 : broker.spreadsFrom <= 1.0 ? 2 : 0;
    score += broker.scores.tradingConditions >= 4 ? 2 : 0;
  }
  if (answers.style === "swing") {
    score += broker.scores.platformTools >= 4 ? 3 : 1;
    score += broker.scores.tradingConditions >= 4 ? 2 : 0;
  }
  if (answers.style === "position") {
    score += broker.scores.trustReputation >= 4 ? 3 : 1;
    score += broker.type === "regulated" ? 2 : 0;
  }

  // Regulation preference
  if (answers.regulation === "strict") {
    score += broker.type === "regulated" ? 5 : -2;
  }
  if (answers.regulation === "offshore_ok") {
    score += broker.type === "offshore" ? 3 : 1;
    score += broker.leverageValue >= 500 ? 2 : 0;
  }

  // Experience level
  if (answers.experience === "beginner") {
    score += broker.scores.customerSupport >= 4 ? 2 : 0;
    score += broker.minDeposit <= 100 ? 2 : 0;
    score += broker.negativeBalanceProtection ? 2 : 0;
  }
  if (answers.experience === "advanced") {
    score += broker.scores.tradingConditions >= 4.5 ? 3 : 0;
    score += broker.spreadsFrom <= 0.3 ? 2 : 0;
    score += broker.accountTypes.some(t => t.toLowerCase().includes("ecn")) ? 2 : 0;
  }

  // Priority weighting
  if (answers.priority === "low_spreads") {
    score += broker.spreadsFrom === 0 ? 5 : broker.spreadsFrom <= 0.5 ? 3 : 0;
  }
  if (answers.priority === "low_deposit") {
    score += broker.minDeposit <= 10 ? 5 : broker.minDeposit <= 50 ? 3 : 0;
  }
  if (answers.priority === "high_leverage") {
    score += broker.leverageValue >= 1000 ? 5 : broker.leverageValue >= 500 ? 3 : 0;
  }
  if (answers.priority === "strong_regulation") {
    score += broker.type === "regulated" ? 5 : 0;
    score += broker.scores.trustReputation >= 4.5 ? 3 : 0;
  }

  // Bonus for featured brokers (slight preference)
  if (broker.featured) score += 1;

  return score;
}

function getMatchReasons(broker: Broker, answers: QuizAnswer): string[] {
  const reasons: string[] = [];

  if (answers.style === "scalping" && broker.spreadsFrom <= 0.5)
    reasons.push(`Ultra-low spreads from ${broker.spreads}`);
  if (answers.priority === "low_deposit" && broker.minDeposit <= 10)
    reasons.push(`Start with just ${broker.minDepositDisplay}`);
  if (answers.priority === "high_leverage")
    reasons.push(`${broker.leverage} leverage available`);
  if (answers.regulation === "strict" && broker.type === "regulated")
    reasons.push(`Regulated by ${broker.regulation}`);
  if (answers.experience === "beginner" && broker.negativeBalanceProtection)
    reasons.push("Negative balance protection included");
  if (answers.platform === "mt4" && broker.platforms.includes("MT4"))
    reasons.push("MT4 platform supported");
  if (answers.platform === "mt5" && broker.platforms.includes("MT5"))
    reasons.push("MT5 platform supported");
  if (broker.bonus) reasons.push(`Bonus: ${broker.bonus}`);

  // Always add rating
  reasons.push(`${broker.rating}/5 overall rating`);

  return reasons.slice(0, 4);
}

// ─── GA4 Quiz Tracking ───────────────────────────────────

function trackQuizEvent(action: string, data: Record<string, string | number | boolean> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", `broker_quiz_${action}`, {
      send_to: "G-P860PCCF1T",
      ...data,
    });
  }
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: `broker_quiz_${action}`,
      ...data,
    });
  }
}

// ─── UTM Config for Quiz Results ─────────────────────────

const QUIZ_UTM = {
  source: "broker_quiz",
  medium: "cta",
  campaign: "quiz_result",
  content: "open_account",
};

// ─── FAQ Data ─────────────────────────────────────────────

const faqs = [
  {
    question: "How does the Broker Finder Quiz work?",
    answer: "Our quiz asks 7 questions about your trading experience, preferences, and priorities. We then score all 22 brokers in our database against your answers using a weighted algorithm that considers platform compatibility, deposit requirements, trading conditions, regulation status, and more. The top 3 matches are shown with personalized reasons."
  },
  {
    question: "Is this quiz really free?",
    answer: "Yes, 100% free with no signup required. We earn revenue through broker affiliate partnerships — if you open an account through our links, we may receive a commission at no extra cost to you. This is clearly disclosed on every result."
  },
  {
    question: "Can US traders use this quiz?",
    answer: "Absolutely. If you select 'US resident', we automatically filter results to only show brokers that legally accept US clients. This includes both CFTC/NFA regulated brokers and offshore brokers that serve US traders."
  },
  {
    question: "How accurate are the quiz results?",
    answer: "Our algorithm matches based on objective broker data — spreads, minimum deposits, platforms, regulation status, and user ratings. However, we recommend reading the full review of any broker before opening an account. The quiz is a starting point, not financial advice."
  },
  {
    question: "Why are some offshore brokers recommended?",
    answer: "If you indicated that offshore regulation is acceptable, our algorithm will include offshore brokers that may offer benefits like higher leverage or lower minimum deposits. We always clearly label broker regulation status so you can make an informed decision."
  },
  {
    question: "Can I retake the quiz with different answers?",
    answer: "Yes! Click the 'Start Over' button on the results page to retake the quiz. Try different combinations to see how your preferences affect the recommendations."
  },
];

// ─── Component ────────────────────────────────────────────

const BrokerFinderQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer>({
    experience: null,
    usTrader: null,
    platform: null,
    deposit: null,
    style: null,
    regulation: null,
    priority: null,
  });

  const handleAnswer = useCallback((key: keyof QuizAnswer, value: string) => {
    const parsed = key === "usTrader" ? value === "true" : value;
    setAnswers(prev => ({ ...prev, [key]: parsed }));

    trackQuizEvent("step_complete", {
      step: currentStep + 1,
      question: key,
      answer: value,
    });

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < QUIZ_STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowResults(true);
        trackQuizEvent("complete", {
          total_steps: QUIZ_STEPS.length,
        });
      }
    }, 300);
  }, [currentStep]);

  const results = useMemo(() => {
    if (!showResults) return [];
    const scored = Object.values(brokers)
      .map(broker => ({
        broker,
        score: scoreBroker(broker, answers),
        reasons: getMatchReasons(broker, answers),
      }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Track result brokers
    scored.forEach((r, i) => {
      trackQuizEvent("result_shown", {
        position: i + 1,
        broker_id: r.broker.id,
        broker_name: r.broker.name,
        match_score: r.score,
      });
    });

    return scored;
  }, [showResults, answers]);

  const resetQuiz = () => {
    setCurrentStep(0);
    setShowResults(false);
    setAnswers({
      experience: null,
      usTrader: null,
      platform: null,
      deposit: null,
      style: null,
      regulation: null,
      priority: null,
    });
    trackQuizEvent("restart");
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const step = QUIZ_STEPS[currentStep];
  const progress = showResults ? 100 : ((currentStep) / QUIZ_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Broker Finder Quiz — Find Your Perfect Forex Broker | BeginnerFXGuide"
        description="Answer 7 quick questions to find the best forex broker for your trading style, experience, and budget. Free interactive tool with personalized results."
        canonical="/tools/broker-quiz"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Broker Finder Quiz",
          "description": "Interactive quiz to match traders with the best forex broker based on experience, preferences, and trading style.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      <Header />

      {/* Hero / Breadcrumb */}
      <section className="pt-24 pb-6 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Broker Finder Quiz" },
            ]}
          />
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">

            {!showResults ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                    <Search className="w-3 h-3" />
                    Question {currentStep + 1} of {QUIZ_STEPS.length}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    Find Your <span className="text-gradient-gold">Perfect Broker</span>
                  </h1>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-1">{step.question}</h2>
                  <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {step.options.map((option) => {
                    const currentValue = answers[step.key];
                    const isSelected = currentValue !== null && String(currentValue) === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(step.key, option.value)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                          ${isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/40 hover:shadow-sm bg-card"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground mt-0.5">
                              {option.description}
                            </div>
                          </div>
                          <ChevronRight className={`w-5 h-5 transition-colors ${isSelected ? "text-primary" : "text-muted-foreground/40"}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                {currentStep > 0 && (
                  <div className="mt-6">
                    <Button variant="ghost" size="sm" onClick={goBack}>
                      <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* ─── Results ─────────────────────────── */
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-4">
                    Your Top Matches
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    Your <span className="text-gradient-gold">Best Broker Matches</span>
                  </h1>
                  <p className="text-muted-foreground">
                    Based on your answers, here are the top {results.length} brokers for you.
                  </p>
                </div>

                {/* Progress Bar Complete */}
                <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full w-full" />
                </div>

                {/* Results Cards */}
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div
                      key={result.broker.id}
                      className={`bg-card border rounded-2xl p-5 md:p-6 relative ${
                        index === 0 ? "border-primary shadow-lg" : "border-border"
                      }`}
                    >
                      {index === 0 && (
                        <span className="absolute -top-3 left-4 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                          #1 Best Match
                        </span>
                      )}

                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        <img
                          src={result.broker.logoSrc}
                          alt={`${result.broker.name} logo`}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-contain bg-white border border-border p-1.5"
                          width={64}
                          height={64}
                          loading={index === 0 ? "eager" : "lazy"}
                        />

                        <div className="flex-1 min-w-0">
                          {/* Name + Rating */}
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg font-bold">{result.broker.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              result.broker.type === "regulated"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {result.broker.type === "regulated" ? "Regulated" : "Offshore"}
                            </span>
                          </div>

                          {/* Rating Stars */}
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(result.broker.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                            <span className="text-sm font-medium ml-1">{result.broker.rating}</span>
                          </div>

                          {/* Quick Stats */}
                          <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                            <div>
                              <div className="text-muted-foreground">Min. Deposit</div>
                              <div className="font-semibold">{result.broker.minDepositDisplay}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Spreads</div>
                              <div className="font-semibold">{result.broker.spreads}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Leverage</div>
                              <div className="font-semibold">{result.broker.leverage}</div>
                            </div>
                          </div>

                          {/* Match Reasons */}
                          <div className="space-y-1 mb-4">
                            {result.reasons.map((reason, ri) => (
                              <div key={ri} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                                <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                                {reason}
                              </div>
                            ))}
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={getAffiliateUrl(result.broker.id, QUIZ_UTM)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                trackAffiliateClick(result.broker.id, "broker_quiz_result", "open_account");
                                trackQuizEvent("result_click", {
                                  broker_id: result.broker.id,
                                  position: index + 1,
                                });
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
                            >
                              Open Account <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <Link
                              to={result.broker.reviewUrl}
                              className="inline-flex items-center gap-1.5 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors min-h-[44px]"
                            >
                              Read Review
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Restart */}
                <div className="text-center mt-8">
                  <Button variant="outline" onClick={resetQuiz} className="min-h-[44px]">
                    <RotateCcw className="w-4 h-4 mr-2" /> Start Over
                  </Button>
                </div>

                {/* Affiliate Disclosure */}
                <p className="text-xs text-muted-foreground text-center mt-6 max-w-lg mx-auto">
                  <strong>Disclosure:</strong> We may earn a commission if you open an account through our links.
                  This does not affect our recommendations.{" "}
                  <Link to="/legal/affiliate-disclosure" className="underline">Learn more</Link>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section (always visible) */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQSection faqs={faqs} title="Broker Finder Quiz FAQ" />
        </div>
      </section>

      <NewsletterCTA />
      <Footer />
    </div>
  );
};

export default BrokerFinderQuiz;
