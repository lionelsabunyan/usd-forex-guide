#!/usr/bin/env node
// IndexNow Bulk URL Submission Script
//
// Reads all URLs from sitemap.xml and sitemap-tr.xml, then submits them
// to IndexNow API for faster indexing by Bing, Yandex, and other engines.
//
// Usage:
//   INDEXNOW_KEY=your-key node scripts/submit-indexnow.cjs
//
// Prerequisites:
//   1. Generate an IndexNow key at https://www.bing.com/indexnow/getstarted
//   2. Place the key file as public/{key}.txt (contains just the key string)
//   3. Set INDEXNOW_KEY env var or pass as CLI arg
//
// Cloudflare Crawler Hints (recommended):
//   If your site is on Cloudflare, enable Crawler Hints in the dashboard
//   (Caching → Configuration → Crawler Hints). This automates IndexNow
//   notifications at the edge — no script needed. This script is a
//   supplementary tool for manual/bulk submissions.

const fs = require('fs');
const path = require('path');
const https = require('https');

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || process.argv[2];
const HOST = 'beginnerfxguide.com';
const SEARCH_ENGINE = 'api.indexnow.org';

if (!INDEXNOW_KEY) {
  console.error('❌ INDEXNOW_KEY is required. Set env var or pass as argument.');
  console.error('   Generate one at: https://www.bing.com/indexnow/getstarted');
  process.exit(1);
}

// Verify key file exists in public/
const keyFilePath = path.join(__dirname, '../public', `${INDEXNOW_KEY}.txt`);
if (!fs.existsSync(keyFilePath)) {
  console.warn(`⚠️  Key file not found at public/${INDEXNOW_KEY}.txt`);
  console.warn(`   Creating it now...`);
  fs.writeFileSync(keyFilePath, INDEXNOW_KEY, 'utf8');
  console.log(`✅ Created public/${INDEXNOW_KEY}.txt`);
}

// Extract URLs from sitemap XML files
function extractUrls(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) return [];
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const url = match[1];
    // Only include URLs from our host
    if (url.includes(HOST)) {
      urls.push(url);
    }
  }
  return urls;
}

const publicDir = path.join(__dirname, '../public');
const enUrls = extractUrls(path.join(publicDir, 'sitemap.xml'));
const trUrls = extractUrls(path.join(publicDir, 'sitemap-tr.xml'));
const allUrls = [...new Set([...enUrls, ...trUrls])];

if (allUrls.length === 0) {
  console.error('❌ No URLs found in sitemaps.');
  process.exit(1);
}

console.log(`📋 Found ${allUrls.length} URLs to submit (${enUrls.length} EN + ${trUrls.length} TR)`);

// Submit to IndexNow API
const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
  urlList: allUrls,
});

const options = {
  hostname: SEARCH_ENGINE,
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  },
};

console.log(`🚀 Submitting ${allUrls.length} URLs to IndexNow (${SEARCH_ENGINE})...`);

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    const status = res.statusCode;
    if (status === 200 || status === 202) {
      console.log(`✅ IndexNow accepted (HTTP ${status}): ${allUrls.length} URLs submitted successfully`);
    } else if (status === 400) {
      console.error(`❌ Bad request (HTTP 400): Check URL format. Response: ${body}`);
    } else if (status === 403) {
      console.error(`❌ Forbidden (HTTP 403): Invalid key or missing key file at https://${HOST}/${INDEXNOW_KEY}.txt`);
    } else if (status === 422) {
      console.error(`❌ Unprocessable (HTTP 422): URLs don't match host. Response: ${body}`);
    } else if (status === 429) {
      console.error(`⚠️  Rate limited (HTTP 429): Try again later.`);
    } else {
      console.error(`❌ Unexpected response (HTTP ${status}): ${body}`);
    }
  });
});

req.on('error', (err) => {
  console.error(`❌ Request failed: ${err.message}`);
  process.exit(1);
});

req.write(payload);
req.end();
