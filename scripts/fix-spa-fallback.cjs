#!/usr/bin/env node
// Post-build script: Fix Cloudflare Pages SPA fallback
//
// Problem: Cloudflare Pages serves 404.html with HTTP 404 status for unknown paths,
// bypassing the _redirects SPA fallback rule (/* -> /index.html 200).
// This causes ALL non-pre-rendered routes to return HTTP 404 instead of 200.
//
// Solution: Remove 404.html so Cloudflare falls back to _redirects rule,
// which serves index.html with 200 status. React Router then handles routing client-side.

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const file404 = path.join(distDir, '404.html');

try {
  if (fs.existsSync(file404)) {
    fs.unlinkSync(file404);
    console.log('✅ Removed 404.html - SPA fallback via _redirects will now work correctly');
  } else {
    console.log('ℹ️  404.html not found, nothing to remove');
  }

  // Also clean up any duplicate files from multiple react-snap runs
  const files = fs.readdirSync(distDir);
  const duplicates = files.filter(f => /^404\s+\d+\.html$/.test(f));
  for (const dup of duplicates) {
    fs.unlinkSync(path.join(distDir, dup));
    console.log(`✅ Removed duplicate: ${dup}`);
  }
} catch (error) {
  console.error('❌ Error in fix-spa-fallback:', error.message);
  process.exit(0); // Don't fail build
}
