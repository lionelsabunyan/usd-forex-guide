import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Globe, Sun, Moon, Info } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import NewsletterCTA from "@/components/NewsletterCTA";

interface Session {
  name: string;
  city: string;
  openUTC: number;  // hour in UTC
  closeUTC: number; // hour in UTC
  color: string;
  bgColor: string;
  pairs: string[];
}

const sessions: Session[] = [
  {
    name: "Sydney",
    city: "Sydney",
    openUTC: 21,
    closeUTC: 6,
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    pairs: ["AUD/USD", "NZD/USD", "AUD/JPY"],
  },
  {
    name: "Tokyo",
    city: "Tokyo",
    openUTC: 0,
    closeUTC: 9,
    color: "text-red-600",
    bgColor: "bg-red-100",
    pairs: ["USD/JPY", "EUR/JPY", "GBP/JPY", "AUD/JPY"],
  },
  {
    name: "London",
    city: "London",
    openUTC: 7,
    closeUTC: 16,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    pairs: ["EUR/USD", "GBP/USD", "EUR/GBP", "USD/CHF"],
  },
  {
    name: "New York",
    city: "New York",
    openUTC: 12,
    closeUTC: 21,
    color: "text-green-600",
    bgColor: "bg-green-100",
    pairs: ["EUR/USD", "USD/CAD", "GBP/USD", "USD/JPY"],
  },
];

const overlaps = [
  { name: "Tokyo–London", startUTC: 7, endUTC: 9, description: "Moderate volatility as Asian session winds down and European traders enter." },
  { name: "London–New York", startUTC: 12, endUTC: 16, description: "Highest volume and volatility — over 50% of daily forex volume occurs here." },
  { name: "New York–Sydney", startUTC: 21, endUTC: 21, description: "Brief overlap with lower liquidity. Spreads may widen." },
];

function isSessionOpen(session: Session, nowUTC: Date): boolean {
  const hour = nowUTC.getUTCHours();
  const minute = nowUTC.getUTCMinutes();
  const time = hour + minute / 60;

  if (session.openUTC < session.closeUTC) {
    return time >= session.openUTC && time < session.closeUTC;
  }
  // Wraps midnight (e.g. Sydney 21:00–06:00)
  return time >= session.openUTC || time < session.closeUTC;
}

function formatTime(hourUTC: number, offsetMinutes: number): string {
  const totalMinutes = hourUTC * 60 + offsetMinutes;
  const adjusted = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(adjusted / 60);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:00 ${period}`;
}

function getTimezoneName(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

const faqs = [
  {
    question: "What are the main forex trading sessions?",
    answer: "There are four main forex trading sessions: Sydney (5 PM – 2 AM ET), Tokyo (7 PM – 4 AM ET), London (3 AM – 12 PM ET), and New York (8 AM – 5 PM ET). The forex market is open 24 hours a day, 5 days a week because these sessions overlap."
  },
  {
    question: "When is the best time to trade forex?",
    answer: "The London–New York overlap (8 AM – 12 PM ET) is generally the best time to trade forex. This is when the two largest financial centers are both active, producing the highest volume, tightest spreads, and most significant price movements."
  },
  {
    question: "What is the London–New York overlap?",
    answer: "The London–New York overlap occurs from approximately 8 AM to 12 PM ET (12:00–16:00 UTC). During this period, both London and New York markets are open simultaneously, accounting for over 50% of daily forex trading volume. Major pairs like EUR/USD see the tightest spreads during this window."
  },
  {
    question: "Does the forex market close on weekends?",
    answer: "Yes, the forex market closes at 5 PM ET on Friday (New York close) and reopens at 5 PM ET on Sunday (Sydney open). There is no trading during weekends for retail forex traders, though some OTC and crypto markets remain open."
  },
  {
    question: "How does Daylight Saving Time (DST) affect forex sessions?",
    answer: "DST shifts the local times of sessions in affected regions. The US, UK, and Australia all observe DST but at different dates. For example, when the US 'springs forward,' the New York session opens an hour earlier in UTC terms. Our clock automatically adjusts to your local timezone."
  },
  {
    question: "Which currency pairs are most active during each session?",
    answer: "Sydney/Tokyo: AUD, NZD, and JPY pairs. London: EUR, GBP, and CHF pairs. New York: USD pairs across the board. Pairs involving currencies from the active session tend to have tighter spreads and more movement."
  },
];

const TradingSessionsClock = () => {
  const [searchParams] = useSearchParams();
  const isEmbedMode = searchParams.get("embed") === "true";
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const offsetMinutes = useMemo(() => -now.getTimezoneOffset(), [now]);
  const tzName = useMemo(() => getTimezoneName(), []);

  const sessionStatus = useMemo(() => {
    return sessions.map((s) => ({
      ...s,
      isOpen: isSessionOpen(s, now),
    }));
  }, [now]);

  const openSessions = sessionStatus.filter((s) => s.isOpen);
  const activeOverlaps = useMemo(() => {
    const hour = now.getUTCHours();
    return overlaps.filter((o) => {
      if (o.startUTC < o.endUTC) return hour >= o.startUTC && hour < o.endUTC;
      return hour >= o.startUTC || hour < o.endUTC;
    });
  }, [now]);

  // 24-hour timeline bar percentages
  const getBarStyle = (openUTC: number, closeUTC: number) => {
    const left = (openUTC / 24) * 100;
    const duration = openUTC < closeUTC
      ? closeUTC - openUTC
      : 24 - openUTC + closeUTC;
    const width = (duration / 24) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  const clockContent = (
    <>
      {/* Current Time */}
      <div className="text-center mb-8">
        <div className="text-4xl md:text-5xl font-mono font-bold tracking-wide mb-2">
          {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
        <p className="text-sm text-muted-foreground">
          Your Time ({tzName}) · UTC {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })}
        </p>
      </div>

      {/* Session Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {sessionStatus.map((session) => (
          <div
            key={session.name}
            className={`relative rounded-xl border p-4 transition-all ${
              session.isOpen
                ? "border-primary/50 bg-card shadow-lg"
                : "border-border bg-card/50 opacity-70"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg ${session.bgColor} flex items-center justify-center`}>
                {session.isOpen ? (
                  <Sun className={`w-4 h-4 ${session.color}`} />
                ) : (
                  <Moon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{session.name}</h3>
                <span className={`text-xs font-medium ${session.isOpen ? "text-green-600" : "text-muted-foreground"}`}>
                  {session.isOpen ? "OPEN" : "CLOSED"}
                </span>
              </div>
              {session.isOpen && (
                <span className="ml-auto relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              )}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Open:</span>
                <span className="font-mono">{formatTime(session.openUTC, offsetMinutes)}</span>
              </div>
              <div className="flex justify-between">
                <span>Close:</span>
                <span className="font-mono">{formatTime(session.closeUTC, offsetMinutes)}</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {session.pairs.map((pair) => (
                <span key={pair} className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-mono">
                  {pair}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Timeline */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          24-Hour Session Timeline (UTC)
        </h2>
        <div className="space-y-3">
          {sessions.map((session) => {
            const barStyle = getBarStyle(session.openUTC, session.closeUTC);
            return (
              <div key={session.name} className="flex items-center gap-3">
                <span className="w-20 text-xs font-medium text-right shrink-0">{session.name}</span>
                <div className="relative flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  {/* Handle wrap-around by rendering two bars */}
                  {session.openUTC > session.closeUTC ? (
                    <>
                      <div
                        className={`absolute top-0 h-full rounded-full ${session.bgColor} ${session.color} text-[10px] flex items-center justify-center font-medium opacity-80`}
                        style={{ left: `${(session.openUTC / 24) * 100}%`, width: `${((24 - session.openUTC) / 24) * 100}%` }}
                      />
                      <div
                        className={`absolute top-0 h-full rounded-full ${session.bgColor} ${session.color} text-[10px] flex items-center justify-center font-medium opacity-80`}
                        style={{ left: "0%", width: `${(session.closeUTC / 24) * 100}%` }}
                      />
                    </>
                  ) : (
                    <div
                      className={`absolute top-0 h-full rounded-full ${session.bgColor} ${session.color} text-[10px] flex items-center justify-center font-medium opacity-80`}
                      style={barStyle}
                    />
                  )}
                  {/* Current time marker */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-foreground/60 z-10"
                    style={{ left: `${(now.getUTCHours() / 24) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* UTC hour labels */}
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0" />
            <div className="relative flex-1 flex justify-between text-[10px] text-muted-foreground px-0">
              {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
                <span key={h}>{h.toString().padStart(2, "0")}:00</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlap Info */}
      {activeOverlaps.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-2">
            <Info className="w-4 h-4" />
            Active Overlap{activeOverlaps.length > 1 ? "s" : ""}
          </h3>
          {activeOverlaps.map((o) => (
            <p key={o.name} className="text-sm text-amber-700 dark:text-amber-300">
              <strong>{o.name}:</strong> {o.description}
            </p>
          ))}
        </div>
      )}

      {/* Market Status Summary */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Market Status</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{openSessions.length}</div>
            <div className="text-xs text-muted-foreground">Sessions Open</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600">{activeOverlaps.length}</div>
            <div className="text-xs text-muted-foreground">Active Overlaps</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {now.getUTCDay() === 0 || now.getUTCDay() === 6 ? "Closed" : "Open"}
            </div>
            <div className="text-xs text-muted-foreground">Forex Market</div>
          </div>
        </div>
      </div>

      {/* Session Details Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
        <div className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-1">Session Schedule</h2>
          <p className="text-sm text-muted-foreground mb-4">All times shown in your local timezone ({tzName})</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t bg-muted/50">
                <th className="text-left px-4 md:px-6 py-3 font-medium">Session</th>
                <th className="text-left px-4 md:px-6 py-3 font-medium">Opens</th>
                <th className="text-left px-4 md:px-6 py-3 font-medium">Closes</th>
                <th className="text-left px-4 md:px-6 py-3 font-medium">Duration</th>
                <th className="text-left px-4 md:px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sessionStatus.map((session) => {
                const duration = session.openUTC < session.closeUTC
                  ? session.closeUTC - session.openUTC
                  : 24 - session.openUTC + session.closeUTC;
                return (
                  <tr key={session.name} className="border-t">
                    <td className="px-4 md:px-6 py-3 font-medium">{session.name}</td>
                    <td className="px-4 md:px-6 py-3 font-mono text-xs">{formatTime(session.openUTC, offsetMinutes)}</td>
                    <td className="px-4 md:px-6 py-3 font-mono text-xs">{formatTime(session.closeUTC, offsetMinutes)}</td>
                    <td className="px-4 md:px-6 py-3">{duration}h</td>
                    <td className="px-4 md:px-6 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        session.isOpen ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${session.isOpen ? "bg-green-500" : "bg-gray-400"}`} />
                        {session.isOpen ? "Open" : "Closed"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overlap Schedule */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Session Overlaps</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Overlaps are when two sessions are open simultaneously — these windows typically offer higher liquidity and tighter spreads.
        </p>
        <div className="space-y-4">
          {overlaps.map((o) => (
            <div key={o.name} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:w-48 shrink-0">
                <Globe className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{o.name}</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground sm:w-32 shrink-0">
                {formatTime(o.startUTC, offsetMinutes)} – {formatTime(o.endUTC, offsetMinutes)}
              </div>
              <p className="text-sm text-muted-foreground">{o.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  if (isEmbedMode) {
    return <div className="p-4">{clockContent}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Forex Trading Sessions Clock — Live Market Hours 2026"
        description="See which forex markets are open right now. Live trading session clock with Tokyo, London, New York, and Sydney hours, overlap times, and timezone support."
        canonical="/tools/trading-sessions"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Trading Sessions Clock",
          "description": "Live forex market hours clock showing Sydney, Tokyo, London, and New York session times with overlap indicators.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://beginnerfxguide.com/tools/trading-sessions/"
        }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Trading Sessions Clock" },
            ]}
          />
          <div className="flex items-center gap-3 mb-4 mt-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                Forex Trading <span className="text-gradient-gold">Sessions Clock</span>
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            See which forex markets are open right now. Live session times for Sydney, Tokyo, London, and New York —
            automatically adjusted to your timezone.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {clockContent}

          {/* Trading Tips */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Trading Session Tips for US Traders</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <h3 className="font-medium text-sm">Best Time for EUR/USD</h3>
                <p className="text-sm text-muted-foreground">
                  Trade during the London–New York overlap (8 AM – 12 PM ET) for the tightest spreads and highest volume.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm">Best Time for USD/JPY</h3>
                <p className="text-sm text-muted-foreground">
                  Active during Tokyo session (7 PM – 4 AM ET) and again during New York hours (8 AM – 5 PM ET).
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm">Avoid Low-Liquidity Windows</h3>
                <p className="text-sm text-muted-foreground">
                  The period between NY close and Sydney open (5 PM – 6 PM ET) has the lowest liquidity and wider spreads.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm">Sunday Gaps</h3>
                <p className="text-sm text-muted-foreground">
                  The market reopens Sunday at 5 PM ET. Weekend news can cause price gaps — use caution with open positions.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link to="/tools/pip-calculator" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <h3 className="font-medium text-sm">Pip Calculator</h3>
                <p className="text-xs text-muted-foreground">Calculate pip value for any pair</p>
              </Link>
              <Link to="/tools/economic-calendar" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <h3 className="font-medium text-sm">Economic Calendar</h3>
                <p className="text-xs text-muted-foreground">Track market-moving events</p>
              </Link>
              <Link to="/tools/position-size-calculator" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <h3 className="font-medium text-sm">Position Size Calculator</h3>
                <p className="text-xs text-muted-foreground">Calculate optimal lot size</p>
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection faqs={faqs} title="Trading Sessions FAQ" />
        </div>
      </section>

      <NewsletterCTA />
      <Footer />
    </div>
  );
};

export default TradingSessionsClock;
