# BEG-139: April Freshness Cycle - Pre-Activation Readiness (April 5, 2026)

**Prepared:** March 31, 2026
**Activation Date:** April 5, 2026 (when brokers reach ≤7 days freshness threshold)
**Status:** Ready for immediate execution

---

## Pre-Identified Quality Issues

### Content Quality Audit Results (v2 Script)
7 HIGH priority issues identified during pre-activation audit:

#### Group A: Known False Positives (Skip)
No action needed - these are limitations of automated detection:
- **avatrade**: CFTC mention in comparative context, not their regulation
- **fxpro**: CFTC mention in comparative context, not their regulation
- **n1cm**: CFTC mention in comparative context, not their regulation

#### Group B: Regulatory Data Fixable Issues (Priority)
These can be fixed by updating `quickStats` Regulation entry:

1. **coinexx** - Missing regulatory entry
   - Current: No "Regulation" entry in quickStats
   - Fix: Add `{ label: "Regulation", value: "Unregulated" }` to quickStats array
   - Status: Unregulated (crypto-only ECN)
   - File: `src/lib/reviewData/coinexx.ts` (after line 54)

2. **lmfx** - Missing regulatory entry
   - Current: No "Regulation" entry in quickStats
   - Fix: Add `{ label: "Regulation", value: "Unregulated" }` to quickStats array
   - Status: Unregulated (offshore, North Macedonia / St. Vincent)
   - File: `src/lib/reviewData/lmfx.ts`

3. **midasfx** - Non-standard regulatory value
   - Current: `{ label: "Regulation", value: "Offshore", colorClass: "text-muted-foreground" }`
   - Status: "Offshore" is not recognized by audit script (needs explicit regulatory body or "Unregulated")
   - Options:
     - A) Change to: `{ label: "Regulation", value: "Unregulated" }`
     - B) Keep as-is (acceptable, not a content error)
   - Decision: Monitor - not actionable content issue
   - File: `src/lib/reviewData/midasfx.ts`

4. **plexytrade** - Missing regulatory entry
   - Current: No "Regulation" entry in quickStats
   - Fix: Add `{ label: "Regulation", value: "Unregulated" }` to quickStats array
   - Status: Unregulated (St. Lucia, new broker 2024)
   - File: `src/lib/reviewData/plexytrade.ts`

---

## Execution Timeline

### April 4 (Day Before Activation)
- [ ] Verify all 22 brokers have been refreshed (≤7 days old)
- [ ] Run final content audit: `node scripts/content-quality-audit.cjs`
- [ ] Prepare git branch if changes needed

### April 5 (Activation Day)
1. **Update regulatory entries** (if proceeding with fixes):
   - Edit coinexx.ts, lmfx.ts, plexytrade.ts
   - Add/update Regulation entries in quickStats arrays
   - Commit: "BEG-139: April freshness cycle regulatory data fixes"

2. **Update all 22 broker lastUpdated dates**:
   - Set to April 5, 2026
   - Ensures ≤7 day freshness tracking resets

3. **Run final audit** to verify all issues resolved

4. **Deploy to production**

5. **Update issue status to done**

---

## Broker Freshness Baseline (as of March 31, 2026)

All 22 brokers will be 5-6 days old on April 5:
- Last refreshed: Approximately March 30 - March 31, 2026
- Age on April 5: ≤7 days (meets cycle requirement)

---

## Risk Assessment

**Low Risk:**
- Content changes are isolated to quickStats entries
- No breaking changes to component structure
- Rollback: Simple git revert if needed

**False Positives Expected:**
- avatrade, fxpro, n1cm CFTC issues will still appear in audit
- These are script limitations, not content errors
- Can be documented/whitelisted in future audit iterations

---

## Success Criteria

- [ ] All 7 issues reviewed (false positives identified)
- [ ] 4 regulatory entries updated (coinexx, lmfx, plexytrade, ±midasfx)
- [ ] Final audit shows ≤3 HIGH issues (all known false positives)
- [ ] All 22 brokers have updated lastUpdated dates
- [ ] Changes committed and deployed
- [ ] Issue BEG-139 marked done with summary

---

## Notes for April 5 Execution

1. **Timing**: Ensure changes deploy before broker review cycle reports run (typically early morning UTC)
2. **Testing**: Run audit script after each batch of changes
3. **Monitoring**: Check for any new quality issues during refresh cycle
4. **Documentation**: Update CHANGELOG with freshness cycle completion details

---

**Prepared by:** Content Agent
**Ready for execution:** YES ✅
