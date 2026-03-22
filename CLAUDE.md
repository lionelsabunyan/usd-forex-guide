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

# Deploy (CF Pages Git entegrasyonu kopuksa)
wrangler pages deploy dist/ --project-name=beginnerfxguide --branch=main --commit-dirty=true
```

- **Cloudflare Pages** deploy — Git entegrasyonu varsa otomatik, yoksa `wrangler pages deploy` ile manuel
- `beginnerfxguide-prerender` worker: bot isteklerini prerender.io'ya yönlendirir (SEO)
- Zorunlu env var: `VITE_GA_ID` | Opsiyonel: `VITE_GTM_ID`, broker affiliate URL'leri

---

## 🤖 Paperclip AI Orkestrasyon

- **Platform**: [paperclip.ing](https://paperclip.ing) — açık kaynak AI ajan orkestrasyonu
- **UI**: https://paperclip.beginnerfxguide.com (authenticated mode, Let's Encrypt SSL)
- **VPS**: Hetzner `89.167.17.240` — systemd servisi, 7/24 çalışır, crash'te auto-restart
- **SSH**: `ssh -i ~/.ssh/verimio_vps_new root@89.167.17.240`
- **Paperclip user**: `paperclip` (non-root) — config: `/home/paperclip/.paperclip/instances/default/`
- **DB**: Embedded PostgreSQL (port 54329), saatlik backup, 30 gün retention
- **Claude CLI**: VPS'te login'li (Max subscription), `su - paperclip` ile kullan
- **Lokal**: Mac'te de kurulu (`npm run paperclip`), geliştirme/test için

### VPS Komutları
```bash
# Servis yönetimi (root olarak)
ssh -i ~/.ssh/verimio_vps_new root@89.167.17.240
systemctl status paperclip     # Durum kontrol
systemctl restart paperclip    # Yeniden başlat
journalctl -u paperclip -n 50  # Son loglar

# Claude CLI test (paperclip user olarak)
su - paperclip
echo "test" | claude --print
```

### Ajanlar (UI'dan oluşturulacak)
| Ajan | Adapter | Schedule | Sarar |
|------|---------|----------|-------|
| SEO Agent | Claude Code | Günlük 07:00 UTC | `scripts/seo-*.py`, `scripts/gsc-*.py` |
| Content Agent | Claude Code | Haftalık Çarşamba | `src/lib/reviewData/*.ts` okuma + güncelleme |
| Analytics Agent | Claude Code | 6 saatte bir | `scripts/telegram_report.py` mantığı |
| Reporter Agent | Claude Code | Günlük 06:00 UTC | `scripts/telegram_report.py` |

### Kurallar
- Paperclip verileri VPS'te `~/.paperclip/` altında — repo'ya dahil değil
- Content Agent insan onayı gerektirir (governance)
- Mevcut GitHub Actions (`daily-report.yml`, `weekly-report.yml`) Reporter Agent stabilize olana kadar silinmez
- API key kullanılmaz — tüm LLM işlemleri Claude Max aboneliği üzerinden
- Caddy reverse proxy config: `/data/coolify/proxy/caddy/dynamic/paperclip.caddy`
- VPS'teki mevcut servislere (n8n, Coolify) dokunma

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
| —     | —       | —         | İlk audit |
