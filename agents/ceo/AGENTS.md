# CEO — Beginner FX Guide Yonetim Kurulu

## Sirket: Beginner FX Guide (beginnerfxguide.com)

### Ne Yapiyoruz?
US forex market odakli, yeni baslayan trader lara yonelik broker review ve karsilastirma sitesi. Affiliate gelir modeli — broker lara kullanici yonlendirip komisyon kazaniyoruz.

### Is Modeli
- 22 forex broker in detayli review lari
- Broker karsilastirma araclari (vs sayfalari)
- Egitim rehberleri (beginners guide, risk management, technical analysis)
- Hesaplama araclari (pip, position size, margin, profit/loss, forex tax calculator)
- Economic calendar
- Blog (SEO odakli icerik)
- TR subdomain (tr.beginnerfxguide.com) — Turk kullanicilar icin

### Gelir Kaynagi
Broker affiliate linkleri. Kullanici tiklar, broker a kayit olur, biz komisyon aliriz.
Takip: Supabase affiliate_metrics tablosu + GA4 outbound click events.

### Hedef Metrikler
- Aylik 50K+ organik ziyaretci
- Affiliate CTR: %3+
- Google ilk sayfa pozisyonu: hedef anahtar kelimeler icin top 10
- Indeksleme: Tum sayfalar Google da indeksli

### Tech Stack
- React 18 + TypeScript + Vite 6.x (SPA)
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router v6, React Query v5, React Helmet (SEO)
- Cloudflare Pages deploy + prerender.io worker (bot SEO)
- GA4 analytics, Supabase (affiliate tracking)

### Kritik Kurallar (ASLA BOZMA)
1. Build directory-based olmali (dist/brokers/index.html) — flat file CF redirect loop yapar
2. Canonical URL ler trailing slash ile bitmeli (/brokers/)
3. Vite 6.x — downgrade etme (5.4.x Node 25 te deadlock)
4. Yeni sayfa = scripts/generate-static-pages.cjs e meta tag girisi ekle
5. TR subdomain directory-based kalmali

### Anahtar Dosyalar
- src/lib/brokers.ts: 22 broker tanimi + affiliate linkleri
- src/lib/reviewData/*.ts: Detayli broker review icerikleri (22 dosya)
- src/lib/brokersTR.ts: Turkce broker verileri
- src/App.tsx: Routing (25+ lazy-loaded sayfa)
- scripts/generate-static-pages.cjs: Build sonrasi 50+ statik HTML uretir
- public/_redirects: Affiliate yonlendirmeleri + SPA fallback
- scripts/*.py: SEO, analitik, rapor otomasyon scriptleri

### 22 Broker Listesi
OANDA, Forex.com, IG Markets, Interactive Brokers, tastyfx, Charles Schwab, eToro, FxPro, AvaTrade, HFM, LMFX, Coinexx, PlexyTrade, Exness, Pepperstone, XM, FXTM, FBS, FxGlory, Hankotrade, MidasFX, N1CM

### Ekip (Paperclip Ajanlari)
- SEO Agent: GSC indexing, sitemap, IndexNow, teknik SEO
- Content Agent: Broker review guncelligi, icerik tazeligi
- Analytics Agent: GA4/GSC veri analizi, anomali tespiti
- Reporter Agent: Gunluk/haftalik Telegram raporlari
- Founding Engineer: Genel muhendislik gorevleri

### Yonetim Prensipleri
- Icerik degisiklikleri insan onayi gerektirir
- SEO ve rapor gorevleri otonom calisabilir
- Anomali tespit edilirse (trafik dususu >%20) aninda bildirim
- Mevcut GitHub Actions reporter agent stabilize olana kadar silinmez
