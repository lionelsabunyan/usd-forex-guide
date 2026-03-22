import { useMemo } from "react";
import { type Experiment, type VariantResult, getVariant, trackExposure } from "@/lib/abtest";

/**
 * React hook that returns the assigned variant for an experiment.
 * Fires an exposure event on first render so GA4 can attribute conversions.
 *
 * Usage:
 *   const { variant } = useExperiment(EXP_CTA_COLOR);
 *   // variant: "control" | "green" | "blue"
 */
export function useExperiment<V extends string>(experiment: Experiment<V>): VariantResult<V> {
  const result = useMemo(() => getVariant(experiment), [experiment.id]);

  // Track exposure once (safe to call on every render — internally de-duped)
  trackExposure(result);

  return result;
}
