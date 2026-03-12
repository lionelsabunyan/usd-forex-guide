#!/usr/bin/env node
// Post-build script: Fix /tr page title for pre-rendering
//
// Problem: dist/tr/index.html doesn't exist after react-snap,
// so Cloudflare serves dist/index.html (US title) for /tr path.
// Bots/crawlers see the wrong title; React corrects it client-side
// but GA4 records both versions → duplicate entries in reports.
//
// Solution: Copy dist/index.html to dist/tr/index.html and
// replace the US title/meta tags with the correct TR values.

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const sourceHtml = path.join(distDir, 'index.html');
const trDir = path.join(distDir, 'tr');
const trHtml = path.join(trDir, 'index.html');

const TR_TITLE = "Türkiye'den Erişilebilen Forex Brokerları 2026 | Beginner FX Guide TR";
const TR_DESCRIPTION = "Türkiye'den açılabilen en iyi forex broker incelemeleri. Güvenilir, lisanslı brokerları karşılaştırın. Bağımsız ve tarafsız analizler.";
const TR_OG_TITLE = "Türkiye'den Erişilebilen Forex Brokerları 2026";

try {
  if (!fs.existsSync(sourceHtml)) {
    console.log('⚠️  dist/index.html not found, skipping TR title fix');
    process.exit(0);
  }

  // Create tr dir if needed
  if (!fs.existsSync(trDir)) {
    fs.mkdirSync(trDir, { recursive: true });
  }

  // If react-snap already generated tr/index.html with correct title, skip
  if (fs.existsSync(trHtml)) {
    const existing = fs.readFileSync(trHtml, 'utf8');
    if (existing.includes('Türkiye') || existing.includes('Beginner FX Guide TR')) {
      console.log('✅ dist/tr/index.html already has correct TR title, skipping');
      process.exit(0);
    }
  }

  let html = fs.readFileSync(sourceHtml, 'utf8');

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${TR_TITLE}</title>`
  );

  // Replace meta description
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${TR_DESCRIPTION}$2`
  );

  // Replace og:title
  html = html.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${TR_OG_TITLE}$2`
  );

  // Replace og:description
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${TR_DESCRIPTION}$2`
  );

  // Replace og:url if present
  html = html.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1https://beginnerfxguide.com/tr$2`
  );

  // Add lang=tr to html tag
  html = html.replace('<html lang="en">', '<html lang="tr">');

  fs.writeFileSync(trHtml, html, 'utf8');
  console.log('✅ Created dist/tr/index.html with correct TR title');

} catch (error) {
  console.error('❌ Error in fix-tr-title:', error.message);
  process.exit(0); // Don't fail build
}
