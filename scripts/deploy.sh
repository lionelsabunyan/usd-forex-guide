#!/usr/bin/env bash
#
# One-command build + deploy for beginnerfxguide (Cloudflare Pages).
#
# Encodes the full CLAUDE.md build sequence so every deploy is correct:
#   - clears node_modules/.vite (avoids Radix export error)
#   - vite build (Node 22 via fnm)
#   - generate-static-pages.cjs (SEO meta injection)
#   - fix-tr-title.cjs + fix-spa-fallback.cjs
#   - prerender.cjs (Playwright; fills <div id="root">)
#   - wrangler pages deploy dist/  (directory-based; do NOT flat-file — 308 loop)
#
# prerender.cjs was missing here until 2026-08-07, so every manual deploy shipped a site
# whose pages were an empty <div id="root"></div>. Bots (Bing's landing-page quality bot
# included) saw nothing; /us scored 1-2/3 on Landing Page Experience because of it. The gate
# below refuses to deploy a body-less build rather than trusting the step ran.
#
# Auth: reads CLOUDFLARE_API_TOKEN (+ CLOUDFLARE_ACCOUNT_ID) from .cf-deploy.env,
# which is gitignored. See .cf-deploy.env.example to set it up.
#
# Usage:  bash scripts/deploy.sh
#
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .cf-deploy.env ]; then
  echo "ERROR: .cf-deploy.env not found. Copy .cf-deploy.env.example and add your token." >&2
  exit 1
fi
set -a; source .cf-deploy.env; set +a

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is empty in .cf-deploy.env." >&2
  exit 1
fi

echo "==> Building (Node 22, clearing vite cache)…"
rm -rf node_modules/.vite
fnm exec --using=22 npx vite build
fnm exec --using=22 node scripts/generate-static-pages.cjs
fnm exec --using=22 node scripts/fix-tr-title.cjs
fnm exec --using=22 node scripts/fix-spa-fallback.cjs
fnm exec --using=22 node scripts/prerender.cjs

echo "==> Gate: verifying pages actually have a rendered body…"
for page in index brokers us us/unitedpips; do
  f="dist/$page/index.html"
  [ "$page" = "index" ] && f="dist/index.html"
  size=$(wc -c < "$f" | tr -d ' ')
  if [ "$size" -lt 20000 ]; then
    echo "ERROR: $f is only ${size} bytes — prerender did not fill it. Aborting deploy." >&2
    exit 1
  fi
  echo "    $f  ${size} bytes  ok"
done

echo "==> Deploying dist/ to Cloudflare Pages…"
fnm exec --using=22 npx wrangler pages deploy dist/ \
  --project-name=beginnerfxguide --branch=main --commit-dirty=true

echo "==> Done. Live at https://beginnerfxguide.com"
