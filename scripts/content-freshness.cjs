#!/usr/bin/env node

/**
 * Content Freshness Tracking System
 *
 * Commands:
 *   seed     — Populate content_freshness table with all site pages
 *   check    — Report overdue and upcoming reviews
 *   update   — Mark a page as reviewed (updates last_reviewed + next_review)
 *
 * Usage:
 *   node scripts/content-freshness.cjs seed
 *   node scripts/content-freshness.cjs check
 *   node scripts/content-freshness.cjs check --json
 *   node scripts/content-freshness.cjs update /review/exness/
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY (service_role key for writes)
 */

const { createClient } = require("@supabase/supabase-js");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Error: SUPABASE_URL and SUPABASE_SERVICE_KEY env vars required."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Review intervals (days)
const INTERVALS = {
  broker_review: 30, // monthly
  comparison: 30, // monthly (broker data changes)
  guide: 90, // quarterly
  tool: 180, // bi-annually (tools rarely change)
  legal: 180,
  blog: 90,
  other: 90,
};

// ---------------------------------------------------------------------------
// Page registry — all content pages on the site
// ---------------------------------------------------------------------------

function getAllPages() {
  const pages = [];

  // 22 Broker Reviews
  const brokers = [
    "fxglory", "hankotrade", "midasfx", "n1cm", "hfm", "lmfx",
    "coinexx", "plexytrade", "exness", "pepperstone", "xm", "fxtm",
    "fbs", "etoro", "fxpro", "oanda", "ig", "forexcom",
    "interactive-brokers", "avatrade", "charles-schwab", "tastyfx",
  ];

  // Map slug → lastUpdated from review data files
  const lastUpdatedMap = {
    fxglory: "2026-03-23", hankotrade: "2026-03-23", midasfx: "2026-03-23",
    n1cm: "2026-03-23", hfm: "2026-03-23", lmfx: "2026-03-23",
    coinexx: "2026-03-23", plexytrade: "2026-03-23",
    exness: "2026-03-26", pepperstone: "2026-03-26", xm: "2026-03-26",
    fxtm: "2026-03-23", fbs: "2026-03-23", etoro: "2026-03-26",
    fxpro: "2026-03-26", oanda: "2026-03-26", ig: "2026-03-26",
    forexcom: "2026-03-26", "interactive-brokers": "2026-03-26",
    avatrade: "2026-03-26", "charles-schwab": "2026-03-26",
    tastyfx: "2026-03-25",
  };

  for (const slug of brokers) {
    const name = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    pages.push({
      page_path: `/review/${slug}/`,
      page_type: "broker_review",
      page_title: `${name} Review`,
      last_reviewed: lastUpdatedMap[slug] || null,
      review_interval_days: INTERVALS.broker_review,
    });
  }

  // 13 Comparison pages
  const comparisons = [
    { path: "midasfx-vs-hankotrade", title: "MidasFX vs Hankotrade" },
    { path: "oanda-vs-forexcom", title: "OANDA vs Forex.com" },
    { path: "etoro-vs-xm", title: "eToro vs XM" },
    { path: "pepperstone-vs-exness", title: "Pepperstone vs Exness" },
    { path: "ig-vs-interactive-brokers", title: "IG vs Interactive Brokers" },
    { path: "etoro-vs-oanda", title: "eToro vs OANDA" },
    { path: "pepperstone-vs-xm", title: "Pepperstone vs XM" },
    { path: "tastyfx-vs-forexcom", title: "tastyfx vs Forex.com" },
    { path: "avatrade-vs-etoro", title: "AvaTrade vs eToro" },
    { path: "oanda-vs-ig-markets", title: "OANDA vs IG Markets" },
    { path: "charles-schwab-vs-interactive-brokers", title: "Charles Schwab vs Interactive Brokers" },
    { path: "xm-vs-fxtm", title: "XM vs FXTM" },
    { path: "mt4-vs-mt5", title: "MT4 vs MT5" },
  ];

  for (const c of comparisons) {
    pages.push({
      page_path: `/compare/${c.path}/`,
      page_type: "comparison",
      page_title: c.title,
      last_reviewed: null,
      review_interval_days: INTERVALS.comparison,
    });
  }

  // 19 Guide pages
  const guides = [
    { path: "beginners-guide", title: "Forex Trading Beginner's Guide" },
    { path: "us-forex-regulations", title: "US Forex Regulations" },
    { path: "broker-comparison", title: "Broker Comparison Guide" },
    { path: "risk-management", title: "Risk Management Guide" },
    { path: "technical-analysis", title: "Technical Analysis Guide" },
    { path: "fundamental-analysis", title: "Fundamental Analysis Guide" },
    { path: "how-we-review", title: "How We Review Brokers" },
    { path: "us-forex-trading", title: "US Forex Trading Guide" },
    { path: "best-copy-trading-platforms", title: "Best Copy Trading Platforms" },
    { path: "best-forex-trading-apps", title: "Best Forex Trading Apps" },
    { path: "best-forex-demo-accounts", title: "Best Forex Demo Accounts" },
    { path: "best-scalping-brokers", title: "Best Scalping Brokers" },
    { path: "best-high-leverage-brokers", title: "Best High Leverage Brokers" },
    { path: "forex-day-trading", title: "Forex Day Trading Guide" },
    { path: "best-forex-signal-providers", title: "Best Forex Signal Providers" },
    { path: "best-low-spread-brokers", title: "Best Low Spread Brokers" },
    { path: "most-trusted-forex-brokers", title: "Most Trusted Forex Brokers" },
    { path: "best-forex-charting-software", title: "Best Forex Charting Software" },
    { path: "best-hedging-brokers", title: "Best Forex Hedging Brokers" },
  ];

  for (const g of guides) {
    pages.push({
      page_path: `/guides/${g.path}/`,
      page_type: "guide",
      page_title: g.title,
      last_reviewed: null,
      review_interval_days: INTERVALS.guide,
    });
  }

  // 9 Tool pages
  const tools = [
    { path: "pip-calculator", title: "Pip Calculator" },
    { path: "position-size-calculator", title: "Position Size Calculator" },
    { path: "forex-tax-calculator", title: "Forex Tax Calculator" },
    { path: "margin-calculator", title: "Margin Calculator" },
    { path: "profit-loss-calculator", title: "Profit/Loss Calculator" },
    { path: "economic-calendar", title: "Economic Calendar" },
    { path: "trading-sessions", title: "Trading Sessions" },
    { path: "broker-quiz", title: "Broker Quiz" },
  ];

  for (const t of tools) {
    pages.push({
      page_path: `/tools/${t.path}/`,
      page_type: "tool",
      page_title: t.title,
      last_reviewed: null,
      review_interval_days: INTERVALS.tool,
    });
  }

  return pages;
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function seed() {
  const pages = getAllPages();
  const today = new Date().toISOString().split("T")[0];

  const rows = pages.map((p) => {
    const lastReviewed = p.last_reviewed || today;
    const nextDate = new Date(lastReviewed);
    nextDate.setDate(nextDate.getDate() + p.review_interval_days);

    return {
      page_path: p.page_path,
      page_type: p.page_type,
      page_title: p.page_title,
      last_reviewed: lastReviewed,
      next_review: nextDate.toISOString().split("T")[0],
      review_interval_days: p.review_interval_days,
    };
  });

  const { data, error } = await supabase
    .from("content_freshness")
    .upsert(rows, { onConflict: "page_path" });

  if (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} pages into content_freshness.`);

  // Summary by type
  const counts = {};
  for (const r of rows) {
    counts[r.page_type] = (counts[r.page_type] || 0) + 1;
  }
  console.table(counts);
}

async function check(jsonOutput = false) {
  const today = new Date().toISOString().split("T")[0];

  // Overdue: next_review <= today
  const { data: overdue, error: e1 } = await supabase
    .from("content_freshness")
    .select("*")
    .lte("next_review", today)
    .order("next_review", { ascending: true });

  if (e1) {
    console.error("Query error:", e1.message);
    process.exit(1);
  }

  // Upcoming in 7 days
  const weekFromNow = new Date();
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  const weekStr = weekFromNow.toISOString().split("T")[0];

  const { data: upcoming, error: e2 } = await supabase
    .from("content_freshness")
    .select("*")
    .gt("next_review", today)
    .lte("next_review", weekStr)
    .order("next_review", { ascending: true });

  if (e2) {
    console.error("Query error:", e2.message);
    process.exit(1);
  }

  if (jsonOutput) {
    console.log(JSON.stringify({ overdue, upcoming, today }, null, 2));
    return { overdue, upcoming };
  }

  console.log(`\n📅 Content Freshness Report — ${today}`);
  console.log("=".repeat(60));

  if (overdue.length > 0) {
    console.log(`\n🔴 OVERDUE (${overdue.length} pages):`);
    for (const p of overdue) {
      const daysOverdue = Math.floor(
        (new Date(today) - new Date(p.next_review)) / 86400000
      );
      console.log(
        `  ${p.page_type.padEnd(15)} ${p.page_path.padEnd(45)} ${daysOverdue}d overdue (last: ${p.last_reviewed})`
      );
    }
  } else {
    console.log("\n✅ No overdue pages.");
  }

  if (upcoming.length > 0) {
    console.log(`\n🟡 DUE THIS WEEK (${upcoming.length} pages):`);
    for (const p of upcoming) {
      console.log(
        `  ${p.page_type.padEnd(15)} ${p.page_path.padEnd(45)} due: ${p.next_review}`
      );
    }
  } else {
    console.log("\n✅ No reviews due this week.");
  }

  console.log("");
  return { overdue, upcoming };
}

async function update(pagePath) {
  const today = new Date().toISOString().split("T")[0];

  // Get current record to know the interval
  const { data: current, error: e1 } = await supabase
    .from("content_freshness")
    .select("*")
    .eq("page_path", pagePath)
    .single();

  if (e1 || !current) {
    console.error(`Page not found: ${pagePath}`);
    process.exit(1);
  }

  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + current.review_interval_days);

  const { error: e2 } = await supabase
    .from("content_freshness")
    .update({
      last_reviewed: today,
      next_review: nextDate.toISOString().split("T")[0],
    })
    .eq("page_path", pagePath);

  if (e2) {
    console.error("Update error:", e2.message);
    process.exit(1);
  }

  console.log(`✅ Updated ${pagePath}`);
  console.log(`   last_reviewed: ${today}`);
  console.log(`   next_review:   ${nextDate.toISOString().split("T")[0]}`);
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "seed":
      await seed();
      break;
    case "check":
      await check(args.includes("--json"));
      break;
    case "update":
      if (!args[0]) {
        console.error("Usage: content-freshness.cjs update /review/exness/");
        process.exit(1);
      }
      await update(args[0]);
      break;
    default:
      console.log("Usage: content-freshness.cjs <seed|check|update> [args]");
      console.log("");
      console.log("  seed              Populate table with all site pages");
      console.log("  check [--json]    Report overdue and upcoming reviews");
      console.log("  update <path>     Mark a page as reviewed today");
      process.exit(1);
  }
}

// Export for use by other scripts (e.g., cron)
module.exports = { check, update, getAllPages };

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
