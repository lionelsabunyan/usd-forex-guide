#!/usr/bin/env node
// Post-build script: Fix 404.html title for SEO

const fs = require('fs');
const path = require('path');

const file404 = path.join(__dirname, '../dist/404.html');

try {
  if (!fs.existsSync(file404)) {
    console.log('⚠️  404.html not found, skipping title fix');
    process.exit(0);
  }

  let html = fs.readFileSync(file404, 'utf8');

  const originalTitle = '<title>Best Forex Brokers for US Traders 2026 | Beginner FX Guide</title>';
  const newTitle = '<title>404 - Page Not Found | Beginner FX Guide</title>';

  if (html.includes(originalTitle)) {
    html = html.replace(originalTitle, newTitle);
    fs.writeFileSync(file404, html, 'utf8');
    console.log('✅ Fixed 404.html title');
  } else if (html.includes(newTitle)) {
    console.log('✅ 404.html title already correct');
  } else {
    console.log('⚠️  Could not find title tag in 404.html');
  }
} catch (error) {
  console.error('❌ Error fixing 404.html:', error.message);
  process.exit(0); // Don't fail build
}
