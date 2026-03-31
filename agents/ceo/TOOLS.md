# Tools

(Your tools will go here. Add notes about them as you acquire and use them.)

## Cloudflare Pages Deploy
source ~/.env
export CLOUDFLARE_API_KEY CLOUDFLARE_EMAIL
unset CLOUDFLARE_API_TOKEN
cd /home/paperclip/usd-forex-guide

# Build
rm -rf node_modules/.vite && npx vite build
node scripts/generate-static-pages.cjs
node scripts/fix-tr-title.cjs
node scripts/fix-spa-fallback.cjs

# Deploy
npx wrangler pages deploy dist/ --project-name=beginnerfxguide --branch=main --commit-dirty=true
