#!/usr/bin/env node

/**
 * Daily Content Freshness Cron Job
 *
 * Runs daily (via n8n, cron, or Paperclip scheduler):
 * 1. Queries content_freshness for overdue pages
 * 2. Creates Paperclip tasks for overdue content reviews
 * 3. Outputs a weekly summary of upcoming reviews
 *
 * Usage:
 *   node scripts/freshness-cron.cjs
 *
 * Env vars:
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY — Supabase access
 *   PAPERCLIP_API_URL, PAPERCLIP_API_KEY — Paperclip task creation (optional)
 *   PAPERCLIP_COMPANY_ID — Company for task creation
 *   PAPERCLIP_PROJECT_ID — Project to assign tasks to
 *   PAPERCLIP_GOAL_ID — Goal for content freshness tasks
 *   PAPERCLIP_PARENT_ID — Parent issue for freshness tasks
 *   CONTENT_AGENT_ID — Agent to assign review tasks to (optional)
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
// Paperclip integration (optional)
// ---------------------------------------------------------------------------

async function createPaperclipTask(page) {
  const apiUrl = process.env.PAPERCLIP_API_URL;
  const apiKey = process.env.PAPERCLIP_API_KEY;
  const companyId = process.env.PAPERCLIP_COMPANY_ID;
  const projectId = process.env.PAPERCLIP_PROJECT_ID;
  const goalId = process.env.PAPERCLIP_GOAL_ID;
  const parentId = process.env.PAPERCLIP_PARENT_ID;
  const contentAgentId = process.env.CONTENT_AGENT_ID;

  if (!apiUrl || !apiKey || !companyId) {
    return null; // Paperclip not configured
  }

  const daysOverdue = Math.floor(
    (Date.now() - new Date(page.next_review).getTime()) / 86400000
  );

  const body = {
    title: `İçerik güncelle: ${page.page_title}`,
    description: [
      `Bu sayfa ${daysOverdue} gün gecikmiş durumda ve güncellenmesi gerekiyor.`,
      "",
      `- **Sayfa:** ${page.page_path}`,
      `- **Tür:** ${page.page_type}`,
      `- **Son İnceleme:** ${page.last_reviewed}`,
      `- **Planlanan İnceleme:** ${page.next_review}`,
      "",
      "Yapılacaklar:",
      "1. Broker verilerini (spread, minimum depozit, düzenleyici durumu) kontrol et",
      "2. Değişen bilgileri güncelle",
      "3. `lastUpdated` tarihini güncelle",
      "4. `node scripts/content-freshness.cjs update ${page.page_path}` ile takip tablosunu güncelle",
    ].join("\n"),
    status: "todo",
    priority: daysOverdue > 14 ? "high" : "medium",
    projectId: projectId || undefined,
    goalId: goalId || undefined,
    parentId: parentId || undefined,
    assigneeAgentId: contentAgentId || undefined,
  };

  try {
    const res = await fetch(`${apiUrl}/api/companies/${companyId}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`  Paperclip task creation failed: ${res.status} ${text}`);
      return null;
    }

    const task = await res.json();
    console.log(`  ✅ Created task ${task.identifier}: ${body.title}`);
    return task;
  } catch (err) {
    console.error(`  Paperclip error: ${err.message}`);
    return null;
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
  } else {
    console.log(`\n🔴 ${overdue.length} overdue page(s):`);

    // Check for existing Paperclip tasks to avoid duplicates
    const existingTasks = new Set();
    const apiUrl = process.env.PAPERCLIP_API_URL;
    const apiKey = process.env.PAPERCLIP_API_KEY;
    const companyId = process.env.PAPERCLIP_COMPANY_ID;

    if (apiUrl && apiKey && companyId) {
      try {
        const res = await fetch(
          `${apiUrl}/api/companies/${companyId}/issues?q=İçerik+güncelle&status=todo,in_progress`,
          {
            headers: { Authorization: `Bearer ${apiKey}` },
          }
        );
        if (res.ok) {
          const existing = await res.json();
          const issues = existing.issues || existing;
          if (Array.isArray(issues)) {
            for (const issue of issues) {
              // Extract page path from description
              const match = issue.description?.match(
                /\*\*Sayfa:\*\*\s+(\S+)/
              );
              if (match) existingTasks.add(match[1]);
            }
          }
        }
      } catch {
        // Non-critical — proceed without dedup
      }
    }

    for (const page of overdue) {
      const daysOverdue = Math.floor(
        (new Date(today) - new Date(page.next_review)) / 86400000
      );
      console.log(
        `  ${page.page_type.padEnd(15)} ${page.page_path.padEnd(45)} ${daysOverdue}d overdue`
      );

      // Create Paperclip task if not already created
      if (!existingTasks.has(page.page_path)) {
        await createPaperclipTask(page);
      } else {
        console.log(`  ⏭️  Task already exists for ${page.page_path}`);
      }
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
