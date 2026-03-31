# Content Quality Audit Script

## Overview
The `content-quality-audit.cjs` script performs automated quality checks on broker review data to identify content consistency issues, regulatory compliance gaps, and pro/con balance problems.

## Purpose
This script is used during content quality cycles (e.g., BEG-143, BEG-135) to validate:
- **SEO Descriptions**: Ensures meta descriptions are within 150-160 character range (optimal for search result display)
- **Regulatory Information**: Validates that all brokers have proper regulatory details (either explicit regulation or marked as "Unregulated")
- **CFTC/NFA Consistency**: Flags brokers that claim CFTC/NFA regulation but mark US clients as NO (likely data errors)
- **Pro/Con Balance**: Ensures pros and cons counts align with broker ratings (high-rated brokers should have 2-3 cons, low-rated should have 4-5 pros)
- **Content Quality**: Detects double spaces and other formatting issues in descriptions

## Running the Script

```bash
node scripts/content-quality-audit.cjs
```

Output is grouped by severity level:
- 🔴 **HIGH**: Compliance issues (regulatory gaps, CFTC consistency errors)
- 🟡 **MEDIUM**: Content issues (SEO length, pro/con balance)
- 🟢 **LOW**: Formatting issues (double spaces)

## Key Improvements (v2)

**Structured Regulatory Detection:**
- Instead of naive string matching for "CFTC", the script now parses the `quickStats` field structure
- Correctly distinguishes between brokers that are explicitly regulated vs. unregulated vs. missing regulatory info
- Reduces false positives on CFTC detection

**Better Pro/Con Thresholds:**
- Uses rating-aligned thresholds for pro/con balance checks
- High-rated brokers (4.5+): should have 2-3 cons
- Low-rated brokers (≤3.0): should have 4-5 pros

## Example Usage Flow

1. Run script to identify issues:
   ```bash
   node scripts/content-quality-audit.cjs > audit-results.txt
   ```

2. Review output and prioritize by severity

3. For each issue:
   - Open the broker file in `src/lib/reviewData/`
   - Make targeted fixes (update seoDescription length, adjust pros/cons, verify regulatory info)
   - Re-run script to verify

4. Commit fixes with reference to audit cycle (e.g., "BEG-143: Content quality optimization")

## Data Structure Reference

Broker review files in `src/lib/reviewData/` follow this pattern:

```typescript
export const brokerName = {
  seoDescription: "...", // Should be 150-160 chars
  heroDescription: "...",
  quickStats: [
    "Regulated by [REGULATOR_NAME]",
    // or
    "Unregulated / Not regulated"
    // ...
  ],
  usClients: "YES" | "NO",
  regulation: "...",
  overallRating: 4.5,
  pros: ["...", "...", "..."],  // Count should match rating
  cons: ["...", "..."],           // Count should match rating
  // ... other fields
}
```

## False Positives

Some brokers may trigger HIGH priority warnings for reasons that are actually correct:
- **AvaTrade, FxPro, N1CM**: Mention CFTC in comparative/historical context, not as their own regulation
- **Plexytrade**: Correctly unregulated, but script may flag as missing regulatory info if "Unregulated" isn't explicitly in quickStats

These are audit script limitations that can be further refined in future cycles.

## Last Run
- **Date**: March 31, 2026 (as part of BEG-143)
- **Issues Found**: 4 HIGH (all false positives), 0 MEDIUM, 0 LOW
- **Status**: All actionable issues resolved; false positives documented

## Maintenance
If broker data structure changes, update the regex patterns in the script:
- Line 20: seoDescription pattern
- Line 34: heroDescription pattern
- Line 45-46: quickStats and usClients patterns
- Line 69-70: CFTC regulation detection
