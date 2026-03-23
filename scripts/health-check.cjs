#!/usr/bin/env node

/**
 * Health Check Script — beginnerfxguide.com
 *
 * Crawls the codebase and validates:
 * 1. Route ↔ generate-static-pages.cjs meta tag consistency
 * 2. Route ↔ sitemap.xml consistency
 * 3. Affiliate link validity (well-formed HTTPS URLs)
 * 4. Internal link consistency (Link to= destinations match routes)
 * 5. Schema markup presence on key page types
 *
 * Usage: node scripts/health-check.cjs
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

let issues = { critical: 0, high: 0, medium: 0, info: 0 };

function report(level, message) {
  issues[level]++;
  const prefix = {
    critical: red("🔴 CRITICAL"),
    high: yellow("🟠 HIGH"),
    medium: "🟡 MEDIUM",
    info: "🟢 INFO",
  }[level];
  console.log(`  ${prefix}: ${message}`);
}

// --- 1. Extract routes from App.tsx ---
function extractRoutes() {
  const appTsx = fs.readFileSync(path.join(ROOT, "src/App.tsx"), "utf-8");
  const routeRegex = /path="([^"]+)"/g;
  const routes = [];
  let match;
  while ((match = routeRegex.exec(appTsx)) !== null) {
    const p = match[1];
    // Skip dynamic routes, admin routes, and relative admin sub-routes
    if (p.includes(":") || p.startsWith("/admin") || p === "*") continue;
    if (!p.startsWith("/")) continue; // skip relative paths (admin child routes)
    routes.push(p);
  }
  return routes;
}

// --- 2. Extract meta tag paths from generate-static-pages.cjs ---
function extractMetaPaths() {
  const script = fs.readFileSync(
    path.join(ROOT, "scripts/generate-static-pages.cjs"),
    "utf-8"
  );
  // Match path patterns like '/brokers' or '/guides/beginners-guide'
  const pathRegex = /['"](\/([\w-]+\/?)+)['"]/g;
  const paths = new Set();
  let match;
  while ((match = pathRegex.exec(script)) !== null) {
    const p = match[1].replace(/\/$/, ""); // normalize trailing slash
    if (p && !p.includes("dist") && !p.includes("node_modules")) {
      paths.add(p);
    }
  }
  return paths;
}

// --- 3. Extract sitemap URLs ---
function extractSitemapPaths() {
  const sitemap = fs.readFileSync(
    path.join(ROOT, "public/sitemap.xml"),
    "utf-8"
  );
  const locRegex = /<loc>https:\/\/beginnerfxguide\.com([^<]+)<\/loc>/g;
  const paths = new Set();
  let match;
  while ((match = locRegex.exec(sitemap)) !== null) {
    paths.add(match[1].replace(/\/$/, "")); // normalize
  }
  return paths;
}

// --- 4. Check affiliate links ---
function checkAffiliateLinks() {
  const brokersFile = fs.readFileSync(
    path.join(ROOT, "src/lib/brokers.ts"),
    "utf-8"
  );
  const urlRegex = /affiliateUrl:\s*["']([^"']+)["']/g;
  const problems = [];
  let match;
  while ((match = urlRegex.exec(brokersFile)) !== null) {
    const url = match[1];
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") {
        problems.push(`Non-HTTPS affiliate URL: ${url}`);
      }
    } catch {
      problems.push(`Malformed affiliate URL: ${url}`);
    }
  }
  return problems;
}

// --- 5. Check internal links ---
function checkInternalLinks(routes) {
  const routeSet = new Set(routes);
  const srcDir = path.join(ROOT, "src");
  const problems = [];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.match(/\.(tsx?|jsx?)$/)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const linkRegex = /to=["']([^"'{}]+)["']/g;
        let m;
        while ((m = linkRegex.exec(content)) !== null) {
          const dest = m[1];
          if (dest.startsWith("/") && !dest.startsWith("/admin")) {
            // Blog posts use dynamic routing /blog/:slug — skip blog post links
            if (dest.match(/^\/blog\/[^/]+$/) && dest !== "/blog") continue;
            if (!routeSet.has(dest) && !routeSet.has(dest.replace(/\/$/, ""))) {
              const relPath = path.relative(ROOT, fullPath);
              problems.push(`${relPath}: Link to="${dest}" — no matching route`);
            }
          }
        }
      }
    }
  }

  scanDir(srcDir);
  return problems;
}

// --- 6. Check schema markup ---
function checkSchemaMarkup() {
  const findings = [];
  const reviewDir = path.join(ROOT, "src/pages");

  function scanForSchema(dir, expectedType, label) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const hasSchema = content.includes("application/ld+json") || content.includes("jsonLd");
      if (!hasSchema) {
        findings.push({ file: `${label}/${file}`, missing: expectedType });
      }
    }
  }

  // Guides should have Article schema
  scanForSchema(path.join(ROOT, "src/pages/guides"), "Article", "guides");

  return findings;
}

// --- Main ---
console.log(bold("\n📋 beginnerfxguide.com Health Check Report\n"));
console.log(`Date: ${new Date().toISOString().split("T")[0]}\n`);

// 1. Route coverage
console.log(bold("1. Route ↔ Meta Tag Coverage"));
const routes = extractRoutes();
const metaPaths = extractMetaPaths();
let metaMissing = 0;
for (const route of routes) {
  if (route === "/") continue; // root is always handled
  if (!metaPaths.has(route)) {
    const found = [...metaPaths].some(
      (p) => p === route || p === route + "/" || p.endsWith(route)
    );
    if (!found) {
      report("high", `Route ${route} missing from generate-static-pages.cjs`);
      metaMissing++;
    }
  }
}
if (metaMissing === 0) console.log(green("  ✅ All routes have meta tags\n"));
else console.log();

// 2. Sitemap coverage
console.log(bold("2. Route ↔ Sitemap Coverage"));
const sitemapPaths = extractSitemapPaths();
let sitemapMissing = 0;
for (const route of routes) {
  if (route === "/") continue; // root is always handled
  if (!sitemapPaths.has(route)) {
    report("high", `Route ${route} missing from sitemap.xml`);
    sitemapMissing++;
  }
}
if (sitemapMissing === 0)
  console.log(green("  ✅ All routes present in sitemap\n"));
else console.log();

// 3. Affiliate links
console.log(bold("3. Affiliate Link Validation"));
const affiliateProblems = checkAffiliateLinks();
if (affiliateProblems.length === 0) {
  console.log(green("  ✅ All affiliate links are valid HTTPS URLs\n"));
} else {
  for (const p of affiliateProblems) report("critical", p);
  console.log();
}

// 4. Internal links
console.log(bold("4. Internal Link Consistency"));
const linkProblems = checkInternalLinks(routes);
if (linkProblems.length === 0) {
  console.log(green("  ✅ All internal links point to valid routes\n"));
} else {
  for (const p of linkProblems) report("medium", p);
  console.log();
}

// 5. Schema markup
console.log(bold("5. Schema Markup Coverage"));
const schemaFindings = checkSchemaMarkup();
if (schemaFindings.length === 0) {
  console.log(green("  ✅ All key pages have schema markup\n"));
} else {
  for (const f of schemaFindings)
    report("medium", `${f.file} missing ${f.missing} schema`);
  console.log();
}

// Summary
console.log(bold("━━━ Summary ━━━"));
console.log(`Routes: ${routes.length}`);
console.log(`Sitemap URLs: ${sitemapPaths.size}`);
console.log(
  `Issues: ${red(issues.critical + " critical")} | ${yellow(issues.high + " high")} | ${issues.medium} medium | ${issues.info} info`
);
console.log(
  issues.critical > 0
    ? red("\n⛔ Critical issues found — fix before deploy!")
    : issues.high > 0
      ? yellow("\n⚠️  High-priority issues need attention")
      : green("\n✅ All checks passed!")
);
console.log();
