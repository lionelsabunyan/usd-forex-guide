#!/usr/bin/env node

/**
 * Daily Content Freshness Cron Job
 *
 * Runs daily (via n8n or cron):
 * 1. Queries content_freshness for overdue pages
 * 2. Sends an optional Telegram summary and logs them
 * 3. Outputs a weekly summary of upcoming reviews (Mondays)
 *
 * Usage:
 *   node scripts/freshness-cron.cjs
 *
 * Env vars:
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY — Supabase access
 *   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID — optional summary notifications
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY required.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------------------------------------------------------------------
// Telegram notification (optional)
// ---------------------------------------------------------------------------

async function sendTelegram(text) {
  if (process.env.TELEGRAM_DISABLE === "1") return;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );
  } catch (err) {
    console.error("Telegram error:", err.message);
  }
}

// ---------------------------------------------------------------------------
// Main cron logic
// ---------------------------------------------------------------------------

async function run() {
  const today = new Date().toISOString().split("T")[0];
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon

  console.log(`\n🔄 Content Freshness Cron — ${today}`);
  console.log("=".repeat(50));

  // 1. Get overdue pages
  const { data: overdue, error: e1 } = await supabase
    .from("content_freshness")
    .select("*")
    .lte("next_review", today)
    .order("next_review", { ascending: true });

  if (e1) {
    console.error("Query error:", e1.message);
    process.exit(1);
  }

  if (overdue.length === 0) {
    console.log("\n✅ No overdue pages. Nothing to do.");
  }

  // 1b. Send Telegram summary for overdue pages
  if (overdue.length > 0) {
    const lines = overdue.slice(0, 15).map((p) => {
      const d = Math.floor(
        (new Date(today) - new Date(p.next_review)) / 86400000
      );
      return `• \`${p.page_path}\` — ${d}d overdue`;
    });
    const extra = overdue.length > 15 ? `\n_...ve ${overdue.length - 15} sayfa daha_` : "";
    await sendTelegram(
      `🔴 *İçerik Tazelik Raporu* — ${today}\n\n` +
      `${overdue.length} sayfa güncellenmeli:\n${lines.join("\n")}${extra}`
    );
  }

  if (overdue.length > 0) {
    console.log(`\n🔴 ${overdue.length} overdue page(s):`);

    for (const page of overdue) {
      const daysOverdue = Math.floor(
        (new Date(today) - new Date(page.next_review)) / 86400000
      );
      console.log(
        `  ${page.page_type.padEnd(15)} ${page.page_path.padEnd(45)} ${daysOverdue}d overdue`
      );
    }
  }

  // 2. Weekly summary (Monday only)
  if (dayOfWeek === 1) {
    const weekStr = new Date(Date.now() + 7 * 86400000)
      .toISOString()
      .split("T")[0];

    const { data: upcoming } = await supabase
      .from("content_freshness")
      .select("*")
      .gt("next_review", today)
      .lte("next_review", weekStr)
      .order("next_review", { ascending: true });

    if (upcoming && upcoming.length > 0) {
      console.log(`\n🟡 This week's upcoming reviews (${upcoming.length}):`);
      for (const p of upcoming) {
        console.log(
          `  ${p.page_type.padEnd(15)} ${p.page_path.padEnd(45)} due: ${p.next_review}`
        );
      }
    }
  }

  console.log("\n✅ Cron complete.\n");
}

run().catch((err) => {
  console.error("Cron failed:", err);
  process.exit(1);
});
