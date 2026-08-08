# Claude — beginnerfxguide.com Kılavuzu

## 📌 Proje Kimliği

- **Site**: beginnerfxguide.com | TR subdomain: tr.beginnerfxguide.com
- **Model**: Forex affiliate — broker review/karşılaştırma, US market odaklı
- **Gelir**: Broker affiliate linkleri → Supabase `affiliate_metrics` tablosunda takip
- **Dil**: EN (ana site) + TR (subdomain, mimari farklı — aşağıya bak)

## 🏗️ Tech Stack

- React 18 + TypeScript + **Vite 6.x** — SPA, lazy-loaded sayfalar
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router v6 | React Query v5 | React Helmet (SEO meta)
- **Cloudflare Pages** deploy (wrangler CLI) + Cloudflare edge cache + prerender.io worker
- Tracking: GA4 (`VITE_GA_ID`), EmailJS, n8n → Supabase otomasyonu

## ⚠️ Kritik Kararlar — Bunlara Dokunma

| Kural | Neden |
|-------|-------|
| Build: `dist/brokers/index.html` (directory-based), flat file KULLANMA | Flat file Cloudflare 308 trailing-slash redirect loop yaratır |
| TR subdomaini directory-based KALMALI (`dist/tr/index.html`) | Subdomain splat routing gerektiriyor, flat file çalışmaz |
| Canonical URL'ler trailing slash ile bitmeli (`/brokers/`) | Sitemap, CF Pages serve ve canonical tutarlı olmalı — yoksa Google indekslemez |
| Vite **6.x** — downgrade etme | 5.4.x Node 25'te deadlock yapıyor |
| Lokal build için `node_modules/.vite` cache'i temizle | `rm -rf node_modules/.vite` — yoksa Radix UI export hatası alırsın |
| Yeni sayfa eklendiğinde `scripts/generate-static-pages.cjs`'e meta tag girişi de ekle | Yoksa tüm SEO meta'ları (`<title>`, og:*, canonical) eksik kalır |
| CF Pages Git entegrasyonu kopuksa `wrangler pages deploy dist/` kullan | Manuel deploy gerektiğinde lokal build + wrangler deploy |

## 📁 Anahtar Dosyalar

```
src/lib/brokers.ts                  → 22 broker tanımı + affiliate linkleri
src/lib/reviewData/*.ts             → Her broker için detaylı review içeriği (22 dosya)
src/lib/brokersTR.ts                → Türkçe broker verileri
src/App.tsx                         → Routing (25+ lazy-loaded sayfa)
scripts/generate-static-pages.cjs  → Build sonrası 50+ static HTML üretir (SEO meta'ları inject eder)
public/_redirects                   → Affiliate yönlendirmeleri + subdomain routing + SPA fallback
src/components/tr/                  → Türkçe bileşenler
src/pages/admin/                    → Admin dashboard (8 dosya, şifre korumalı)
```

## 🚀 Build & Deploy

```bash
# Lokal build (Node 22 gerekli, node_modules/.vite cache temizle)
rm -rf node_modules/.vite && fnm exec --using=22 npx vite build
fnm exec --using=22 node scripts/generate-static-pages.cjs
fnm exec --using=22 node scripts/fix-tr-title.cjs
fnm exec --using=22 node scripts/fix-spa-fallback.cjs
fnm exec --using=22 node scripts/prerender.cjs   # ⚠️ ATLAMA — yoksa dist tamamen boş <div id="root"></div> çıkar

# Deploy öncesi kapı: gövde gerçekten basıldı mı?
grep -o 'id="root">.\{0,60\}' dist/us/unitedpips/index.html   # içerik GÖRÜNMELİ

# Deploy (CF Pages Git entegrasyonu kopuksa)
wrangler pages deploy dist/ --project-name=beginnerfxguide --branch=main --commit-dirty=true
```

> ⚠️ **`prerender.cjs` bu tarifte eksikti ve Ağustos 2026'ya kadar canlıda hiçbir sayfanın
> gövdesi yoktu** — `npm run build` zinciri onu içeriyor ama elle deploy edenler atlıyordu.
> Bing'in landing-page kalite botu boş sayfa gördüğü için `/us` LPE skoru 1-2/3'te takılmıştı.

- **Cloudflare Pages** deploy — Git entegrasyonu varsa otomatik, yoksa `wrangler pages deploy` ile manuel
- `beginnerfxguide-prerender` worker: bot isteklerini prerender.io'ya yönlendirir (SEO)
- Zorunlu env var: `VITE_GA_ID` | Opsiyonel: `VITE_GTM_ID`, broker affiliate URL'leri

---

## 🔧 Bilinen Teknik Borc

- Admin auth client-side only (localStorage) — server-side auth migration gerekli
- TypeScript strict mode kapalı (noImplicitAny, strictNullChecks false)
- netlify.toml mevcut ama site Cloudflare Pages'te (referans için korunuyor)

---

## 🔍 Audit Modu

Komutu çalıştırarak audit başlatırsın:

> "audit modunda çalış ve CLAUDE.md kurallarına göre projeyi tara, sonuçları AUDIT_REPORT.md olarak kaydet"

### 1. Dead Code

- Import edilmeyen component, çağrılmayan fonksiyon, kullanılmayan export
- `console.log`, `debugger`, 10+ satır yorum bloğu
- Kullanılmayan `useState`, `useEffect`

### 2. Kompak Kod

- 200+ satır component → bölünmeli
- DRY ihlalleri, 3+ parametre alan fonksiyonlar, 3+ seviye iç içe koşul
- Aynı işi yapan duplicate util'ler

### 3. Güvenlik

**Kritik**: `dangerouslySetInnerHTML`, hardcoded API key/secret (sk-, pk_, Bearer), `eval()`, `.env` gitignore kontrolü

**Yüksek**: Client-side auth kontrolü, `localStorage`'da hassas veri, CORS wildcard `*`, ham SQL/NoSQL sorgusu

**Orta**: HTTP URL (HTTPS olmalı), sanitize edilmemiş kullanıcı girdisi, outdated dependency, `^` versiyonlar

### 4. React/Vite Spesifik

- Client Component ama server'da çalışabilecek yapılar
- `<img>` yerine Image component kullanılabilecek yerler
- `useEffect` içinde veri çekme (React Query öner)
- Eksik `key` prop, büyük bundle import'ları (dynamic import öner)

### 5. Performans

- Her render'da yeniden oluşan obje/array (`useMemo` öner)
- Gereksiz re-render (`useCallback` öner)
- Lazy load edilmesi gereken büyük component'ler
- Hatalı/eksik `useEffect` dependency array

### Rapor Formatı

```
# Audit Raporu — [TARİH]
## Özet: X dosya, X sorun (Kritik: X | Yüksek: X | Orta: X | Düşük: X)
## 🔴 Kritik | 🟠 Yüksek | 🟡 Orta | 🟢 Öneri | 📁 Silinebilecek | ✅ Düzeltilen
Her sorun için: dosya adı + satır numarası + öneri
```

### Audit Kuralları

- Önce listele, sonra düzelt (kritik güvenlik açıkları hariç — onları hemen düzelt)
- `node_modules`, `.next`, `dist`, `build` klasörlerini tarama
- `*.test.ts`, `*.spec.ts` ayrı kategoride değerlendir
- Şüpheli ama emin olamadığın durumlar → "Belirsiz" olarak işaretle

### Dokunma

`package-lock.json` | `.env*` dosyaları (sadece raporla) | Migration dosyaları

### Audit Geçmişi

| Tarih | Bulunan | Düzeltilen | Notlar |
|-------|---------|-----------|--------|
| 2026-04-12 | ~30 dosya | ~30 | Cleanup: Paperclip remnants, dead scripts, unused deps, admin hardening |
