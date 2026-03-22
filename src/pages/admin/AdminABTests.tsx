import { useState, useMemo } from "react";
import {
  FlaskConical,
  Trophy,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EXP_CTA_COLOR, EXP_CTA_COPY } from "@/lib/abtest";

// ── Types ────────────────────────────────────────────────────────────────────

interface VariantMetrics {
  variant: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

interface ExperimentData {
  experimentId: string;
  label: string;
  variants: VariantMetrics[];
  startDate: string;
}

// ── Statistical helpers ──────────────────────────────────────────────────────

/** Minimum impressions per variant before significance testing is meaningful. */
const MIN_SAMPLE_SIZE = 100;

/**
 * Two-proportion Z-test.
 * Returns { zScore, pValue, significant } comparing treatment vs control.
 */
function zTestProportions(
  controlImpressions: number,
  controlClicks: number,
  treatmentImpressions: number,
  treatmentClicks: number,
  alpha = 0.05
) {
  if (controlImpressions === 0 || treatmentImpressions === 0) {
    return { zScore: 0, pValue: 1, significant: false, lift: 0 };
  }

  const p1 = controlClicks / controlImpressions;
  const p2 = treatmentClicks / treatmentImpressions;
  const pPool =
    (controlClicks + treatmentClicks) /
    (controlImpressions + treatmentImpressions);

  const se = Math.sqrt(
    pPool * (1 - pPool) * (1 / controlImpressions + 1 / treatmentImpressions)
  );

  if (se === 0) return { zScore: 0, pValue: 1, significant: false, lift: 0 };

  const z = (p2 - p1) / se;
  // Approximate two-tailed p-value using the error function
  const pValue = 2 * (1 - normalCdf(Math.abs(z)));
  const lift = p1 === 0 ? 0 : ((p2 - p1) / p1) * 100;

  return { zScore: z, pValue, significant: pValue < alpha, lift };
}

/** Standard normal CDF approximation (Abramowitz & Stegun 7.1.26). */
function normalCdf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

// ── Demo data (replace with GA4 API fetch) ───────────────────────────────────

function generateDemoData(): ExperimentData[] {
  return [
    {
      experimentId: EXP_CTA_COLOR.id,
      label: "CTA Button Color",
      startDate: "2026-03-01",
      variants: EXP_CTA_COLOR.variants.map((v) => {
        const impressions =
          v === "control" ? 1842 : v === "green" ? 1756 : 1691;
        const clicks = v === "control" ? 68 : v === "green" ? 94 : 72;
        return {
          variant: v,
          impressions,
          clicks,
          ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        };
      }),
    },
    {
      experimentId: EXP_CTA_COPY.id,
      label: "CTA Copy Text",
      startDate: "2026-03-01",
      variants: EXP_CTA_COPY.variants.map((v) => {
        const impressions =
          v === "control" ? 1823 : v === "urgency" ? 1789 : 1701;
        const clicks = v === "control" ? 61 : v === "urgency" ? 87 : 79;
        return {
          variant: v,
          impressions,
          clicks,
          ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        };
      }),
    },
  ];
}

// ── Component ────────────────────────────────────────────────────────────────

const AdminABTests = () => {
  const [dateRange, setDateRange] = useState("30d");
  const experiments = useMemo(() => generateDemoData(), []);

  // Determine the winning variant per experiment
  function getWinner(exp: ExperimentData) {
    const control = exp.variants[0];
    let best: VariantMetrics | null = null;
    let bestResult: ReturnType<typeof zTestProportions> | null = null;

    for (const v of exp.variants.slice(1)) {
      const result = zTestProportions(
        control.impressions,
        control.clicks,
        v.impressions,
        v.clicks
      );
      if (
        result.significant &&
        result.lift > 0 &&
        (!bestResult || result.lift > bestResult.lift)
      ) {
        best = v;
        bestResult = result;
      }
    }
    return { winner: best, result: bestResult };
  }

  // Aggregate stats
  const totalImpressions = experiments.reduce(
    (sum, e) => sum + e.variants.reduce((s, v) => s + v.impressions, 0),
    0
  );
  const totalClicks = experiments.reduce(
    (sum, e) => sum + e.variants.reduce((s, v) => s + v.clicks, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-2">
            <FlaskConical className="w-8 h-8 text-primary" />
            A/B Test Results
          </h1>
          <p className="text-muted-foreground">
            Track CTA experiments and find winning variants
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {experiments.length}
            </p>
            <p className="text-sm text-muted-foreground">Active Experiments</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {totalImpressions.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Impressions</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {totalClicks.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {experiments.filter((e) => getWinner(e).winner).length}
            </p>
            <p className="text-sm text-muted-foreground">
              Significant Winners
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Experiment Cards */}
      {experiments.map((exp) => {
        const control = exp.variants[0];
        const { winner, result: winnerResult } = getWinner(exp);
        const lowSample = exp.variants.some(
          (v) => v.impressions < MIN_SAMPLE_SIZE
        );

        return (
          <Card key={exp.experimentId} className="bg-gradient-card border-border">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {exp.label}
                    <Badge variant="outline" className="font-mono text-xs">
                      {exp.experimentId}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Running since {exp.startDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {lowSample && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            variant="outline"
                            className="border-amber-500/50 text-amber-500"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Low Sample
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Some variants have fewer than {MIN_SAMPLE_SIZE}{" "}
                            impressions. Results may not be reliable.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {winner ? (
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                      <Trophy className="w-3 h-3 mr-1" />
                      Winner: {winner.variant}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Info className="w-3 h-3 mr-1" />
                      No significant winner yet
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Variant
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Impressions
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Clicks
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        CTR
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Lift vs Control
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Significance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exp.variants.map((v) => {
                      const isControl = v.variant === control.variant;
                      const test = isControl
                        ? null
                        : zTestProportions(
                            control.impressions,
                            control.clicks,
                            v.impressions,
                            v.clicks
                          );
                      const isWinner = winner?.variant === v.variant;

                      return (
                        <tr
                          key={v.variant}
                          className={`border-b border-border last:border-0 ${
                            isWinner ? "bg-green-500/5" : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground capitalize">
                                {v.variant}
                              </span>
                              {isControl && (
                                <Badge variant="outline" className="text-xs">
                                  Control
                                </Badge>
                              )}
                              {isWinner && (
                                <Trophy className="w-4 h-4 text-amber-500" />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-foreground">
                            {v.impressions.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-foreground">
                            {v.clicks.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-foreground">
                            {v.ctr.toFixed(2)}%
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isControl ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <span
                                className={
                                  test && test.lift > 0
                                    ? "text-green-500"
                                    : test && test.lift < 0
                                    ? "text-red-500"
                                    : "text-muted-foreground"
                                }
                              >
                                {test
                                  ? `${test.lift > 0 ? "+" : ""}${test.lift.toFixed(1)}%`
                                  : "—"}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isControl ? (
                              <span className="text-muted-foreground">
                                Baseline
                              </span>
                            ) : test ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge
                                      variant="outline"
                                      className={
                                        test.significant
                                          ? "border-green-500/50 text-green-500"
                                          : "border-muted-foreground/50 text-muted-foreground"
                                      }
                                    >
                                      {test.significant
                                        ? "Significant"
                                        : "Not significant"}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      p-value: {test.pValue.toFixed(4)} | z:{" "}
                                      {test.zScore.toFixed(2)}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Winner summary */}
              {winner && winnerResult && (
                <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">
                        <span className="capitalize">{winner.variant}</span>{" "}
                        beats control by{" "}
                        <span className="text-green-500">
                          +{winnerResult.lift.toFixed(1)}%
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        CTR: {winner.ctr.toFixed(2)}% vs {control.ctr.toFixed(2)}%
                        (control) — p-value: {winnerResult.pValue.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Methodology note */}
      <Card className="bg-gradient-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">How results are calculated</p>
              <p>
                Statistical significance is determined using a two-proportion Z-test
                at 95% confidence (α = 0.05). A variant is declared the winner only
                when it outperforms the control with statistical significance.
                Minimum {MIN_SAMPLE_SIZE} impressions per variant required for
                reliable results.
              </p>
              <p>
                Events tracked: <code className="text-xs bg-secondary px-1 py-0.5 rounded">experiment_exposure</code> (impressions)
                and <code className="text-xs bg-secondary px-1 py-0.5 rounded">affiliate_click</code> with{" "}
                <code className="text-xs bg-secondary px-1 py-0.5 rounded">exp_cta_color</code> /{" "}
                <code className="text-xs bg-secondary px-1 py-0.5 rounded">exp_cta_copy</code> (conversions).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminABTests;
