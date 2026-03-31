# SEO Agent Araclari

## Python Scriptleri
Calistirmadan once: cd /home/paperclip/usd-forex-guide

### Google Credentials Ayari
Scriptlerdeki CREDENTIALS_PATH degiskenini su sekilde ayarla:
CREDENTIALS_PATH = '/home/paperclip/google-credentials.json'

### Gerekli Python Paketleri
pip install google-auth google-auth-httplib2 google-api-python-client requests

### Script Listesi
1. seo-quick-check.py — Hizli SEO durum taramasi
2. gsc-request-indexing.py — Toplu GSC indexing istegi
3. submit-sitemap.py — Sitemap gonderimi
4. verify-sitemap.py — Sitemap dogrulama
5. indexnow-submit.py — IndexNow bildirimi
6. seo-improvement-agent.py — Kapsamli SEO audit
7. quick-index-check.py — URL bazli indeks kontrolu
8. request-indexing.py — Tekil indexing istegi

## Bash Komutlari
- git pull origin main: En son kodu cek
- git status: Degisiklikleri goster
- curl -s https://beginnerfxguide.com/sitemap.xml | head -50: Sitemap kontrol

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
