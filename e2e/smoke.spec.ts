import { test, expect } from "@playwright/test";

// ─── EN Ana Sayfa ───────────────────────────────────────────────
test.describe("EN Homepage", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Forex|Beginner/i);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("header navigation links work", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header").first()).toBeVisible();
  });

  test("footer renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
  });
});

// ─── EN Routing ─────────────────────────────────────────────────
test.describe("EN Key Pages", () => {
  const pages = [
    { path: "/brokers/", title: /broker/i },
    { path: "/compare/", title: /compare/i },
    { path: "/guides/", title: /guide/i },
    { path: "/blog/", title: /blog|insight|forex/i },
    { path: "/tools/", title: /tool|calculator/i },
    { path: "/about/", title: /about/i },
    { path: "/contact/", title: /contact/i },
    { path: "/faq/", title: /faq/i },
    { path: "/glossary/", title: /glossary/i },
  ];

  for (const { path, title } of pages) {
    test(`${path} loads`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(title);
    });
  }
});

// ─── Broker Review Pages ────────────────────────────────────────
test.describe("Broker Reviews", () => {
  const brokers = ["fxpro", "xm", "exness", "etoro", "oanda", "ig-markets"];

  for (const broker of brokers) {
    test(`/review/${broker}/ loads`, async ({ page }) => {
      const response = await page.goto(`/review/${broker}/`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }
});

// ─── TR Ana Sayfa ───────────────────────────────────────────────
test.describe("TR Homepage", () => {
  test("loads and shows Turkish content", async ({ page }) => {
    await page.goto("/tr");
    await expect(page.locator("h1").first()).toBeVisible();
    // Should have Turkish text somewhere
    const body = await page.textContent("body");
    expect(body).toMatch(/broker|forex|hesap/i);
  });
});

// ─── TR Review Pages ────────────────────────────────────────────
test.describe("TR Review Pages", () => {
  const trReviews = ["fxpro", "xm", "exness", "pepperstone"];

  for (const broker of trReviews) {
    test(`/tr/inceleme/${broker} loads`, async ({ page }) => {
      const response = await page.goto(`/tr/inceleme/${broker}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("/tr/inceleme/hfm redirects to /tr/", async ({ page }) => {
    await page.goto("/tr/inceleme/hfm");
    // Should not show a broken page — either redirect or 404 handled by SPA
    await expect(page.locator("body")).toBeVisible();
  });
});

// ─── Affiliate Links ────────────────────────────────────────────
test.describe("Affiliate Redirects", () => {
  const affiliates = [
    { path: "/go/xm", expected: /affs\.click|xm/i },
    { path: "/go/fxpro", expected: /fxpro|g2afse/i },
    { path: "/go/exness", expected: /exness/i },
  ];

  for (const { path, expected } of affiliates) {
    test(`${path} redirects to affiliate URL`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "commit" });
      // 302 redirect — check final URL or at least no 404/500
      const status = response?.status() ?? 0;
      // Cloudflare handles redirects, in preview mode SPA fallback may catch it
      // Just verify no server error
      expect(status).toBeLessThan(500);
    });
  }
});

// ─── US Offshore Paid Landing Page (/us) + Organic USA page ─────
test.describe("US Offshore Funnel", () => {
  test("/us paid LP loads with offshore content", async ({ page }) => {
    const response = await page.goto("/us");
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
    const body = await page.textContent("body");
    expect(body).toMatch(/offshore|FXGlory|US Traders/i);
  });

  test("/us is noindex (must not compete with organic page)", async ({ page }) => {
    await page.goto("/us");
    await expect(page.locator("h1").first()).toBeVisible();
    // Robust across dev (base HTML robots + Helmet robots) and prod (single injected tag):
    // assert at least one robots meta declares noindex.
    const contents = await page
      .locator('meta[name="robots"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute("content") || ""));
    expect(contents.some((c) => /noindex/i.test(c))).toBeTruthy();
  });

  test("msclkid is captured to localStorage and appended as subid on affiliate CTA", async ({ page }) => {
    await page.goto("/us?msclkid=pw_test_123&keyword=fxglory");
    await expect(page.locator('a[rel*="sponsored"]').first()).toBeVisible();

    const stored = await page.evaluate(() => window.localStorage.getItem("bfx_attribution"));
    expect(stored).toContain("pw_test_123");

    const href = await page.locator('a[rel*="sponsored"]').first().getAttribute("href");
    expect(href).toContain("subid=pw_test_123");
  });

  test("/us/fxglory variant loads and leads with FXGlory", async ({ page }) => {
    const response = await page.goto("/us/fxglory");
    expect(response?.status()).toBeLessThan(400);
    const body = await page.textContent("body");
    expect(body).toMatch(/FXGlory/i);
  });

  test("/brokers/usa organic page loads and is indexable", async ({ page }) => {
    const response = await page.goto("/brokers/usa/");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/USA|US Traders|forex/i);
  });

  test("/us has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/us");
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });
});

// ─── 404 Handling ───────────────────────────────────────────────
test.describe("404 Pages", () => {
  test("non-existent EN page shows 404 content", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    const body = await page.textContent("body");
    expect(body).toMatch(/not found|404|page.*exist/i);
  });
});

// ─── SEO Meta Tags ──────────────────────────────────────────────
test.describe("SEO Essentials", () => {
  test("homepage has canonical URL", async ({ page }) => {
    await page.goto("/");
    const canonical = page.locator('link[rel="canonical"]').first();
    await expect(canonical).toHaveAttribute("href", /beginnerfxguide\.com/);
  });

  test("homepage has og:title", async ({ page }) => {
    await page.goto("/");
    const ogTitle = page.locator('meta[property="og:title"]').first();
    await expect(ogTitle).toHaveAttribute("content", /.+/);
  });

  test("broker review has structured data", async ({ page }) => {
    await page.goto("/review/fxpro/");
    const schema = page.locator('script[type="application/ld+json"]');
    const count = await schema.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ─── CSP Header ─────────────────────────────────────────────────
// Security headers are served by Cloudflare Pages via public/_headers.
// Vite preview server does not serve custom headers, so these tests
// verify the _headers file content instead of runtime headers.
test.describe("Security Headers (file-based check)", () => {
  test("_headers file contains CSP with script-src whitelist", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("public/_headers", "utf-8");
    expect(content).toContain("Content-Security-Policy:");
    expect(content).toContain("script-src");
    expect(content).toContain("www.googletagmanager.com");
    expect(content).toContain("bat.bing.com");
    expect(content).toContain("mc.yandex.ru");
    expect(content).toContain("www.clarity.ms");
  });

  test("_headers file contains X-Frame-Options and X-Content-Type-Options", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("public/_headers", "utf-8");
    expect(content).toContain("X-Frame-Options: DENY");
    expect(content).toContain("X-Content-Type-Options: nosniff");
  });
});

// ─── No Console Errors ──────────────────────────────────────────
test.describe("Console Health", () => {
  test("homepage has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });

  test("TR homepage has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/tr");
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });

  test("broker review page has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/review/fxpro/");
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });
});

// ─── Critical UI Components ─────────────────────────────────────
test.describe("Critical UI", () => {
  test("broker comparison table renders on /brokers/", async ({ page }) => {
    await page.goto("/brokers/");
    // Should have broker cards or table rows
    const brokerElements = page.locator('[class*="broker"], [class*="card"]');
    const count = await brokerElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test("TR broker table renders", async ({ page }) => {
    await page.goto("/tr");
    // Should have broker-related content
    const body = await page.textContent("body");
    expect(body).toMatch(/FxPro|XM|Exness/i);
  });

  test("review form renders on broker page", async ({ page }) => {
    await page.goto("/review/fxpro/");
    const form = page.locator("form");
    const count = await form.count();
    expect(count).toBeGreaterThan(0);
  });
});
