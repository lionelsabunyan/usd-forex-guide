# SEO Audit Raporu v2 — 12 Mart 2026

## GENEL DURUM: 🔴 KRİTİK

| Metrik (90 gün) | Değer |
|------------------|-------|
| Toplam Tıklama | **1** |
| Toplam Gösterim | 498 |
| Ortalama CTR | 0.20% |
| Ortalama Pozisyon | 25.1 |
| İndekste görünen sayfa | **15 / 82** |
| Görünürlüğü SIFIR sayfa | **~67 sayfa** |
| Mart trendi | 📉 Günlük 0-6 gösterim (Şubat: 15-51) |

---

## 📊 İNDEKS DURUMU — Sayfa Sayfa Analiz

### ✅ Google'da Gösterim Alan Sayfalar (15 sayfa)

| Sayfa | Gösterim (28g) | Pozisyon | Durum |
|-------|---------------|----------|-------|
| /review/midasfx | 174 | 10.3 | ⚠️ En iyi sayfa ama 0 tıklama |
| /review/lmfx | 43 | 51.6 | 🔴 Çok geride |
| / (anasayfa) | 37 | 50.2 | 🔴 Çok geride |
| /review/exness | 35 | 13.3 | ⚠️ İlk 2 sayfa |
| /review/hfm | 35 | 36.6 | 🔴 Geride |
| /tools | 14 | 9.9 | ⚠️ İlk sayfa |
| /review/xm | 7 | 5.3 | ✅ İyi pozisyon |
| /about + /about/ | 9 | ~1.3 | ✅ İyi ama duplicate! |
| /brokers | 5 | 22.8 | 🔴 Geride |
| /compare | 4 | 16.0 | ⚠️ 2. sayfa |
| /guides + /guides/ | 3 | ~4 | ⚠️ Duplicate! |
| /guides/forex-trading-usa + / | 6 | ~10 | ⚠️ Duplicate! |

### 🔴 Google'da HİÇ Görünmeyen Sayfalar (~67 sayfa)

**Broker Review'lar (indekste YOK):**
- /review/fxglory, /review/hankotrade, /review/n1cm
- /review/oanda, /review/forexcom, /review/ig-markets
- /review/interactive-brokers, /review/tastyfx, /review/charles-schwab
- /review/etoro, /review/avatrade, /review/coinexx
- /review/plexytrade, /review/fxpro, /review/pepperstone, /review/fxtm, /review/fbs

**Ana Sayfalar (indekste YOK):**
- /blog, /faq, /glossary, /contact
- /resources/economic-calendar

**Tüm Guide Sayfaları (indekste YOK):**
- /guides/how-forex-works, /guides/us-forex-regulations
- /guides/forex-risk-management, /guides/choosing-broker
- /guides/technical-analysis, /guides/fundamental-analysis
- /guides/trading-psychology

**Tüm Blog Yazıları (18 adet — HİÇBİRİ indekste):**
- /blog/forex-trading-legal-usa, /blog/best-time-trade-forex
- /blog/demo-vs-live-trading, /blog/forex-tax-guide-usa
- /blog/spread-types-explained, ve diğerleri...

**Tüm Tool Sayfaları (alt sayfalar):**
- /tools/pip-calculator, /tools/position-size-calculator
- /tools/margin-calculator, /tools/profit-calculator, /tools/forex-converter

**TR Subdomain (12 sayfa — SIFIR veri):**
- GSC'de ayrı property YOK → izlenemiyor

---

## 🚨 KRİTİK SORUNLAR (Hemen Düzeltilmeli)

### 1. 🔴 Redirect Loop — DEPLOY BEKLİYOR
**Durum**: Kod düzeltildi ama henüz DEPLOY EDİLMEDİ!

Sorun: `dist/brokers.html` (flat file) → Cloudflare 308 `/brokers/` ekler → Netlify 301 `/brokers`'a geri yollar → SONSUZ DÖNGÜ

Bu, ~50 sayfanın Google tarafından crawl edilememesinin **ana sebebi**.

**GSC kanıtı**: `/about` vs `/about/` ayrı URL olarak görünüyor — trailing slash sorunu devam ediyor.

**Çözüm**: `generate-static-pages.cjs` directory-based çıktıya çevrildi. **BUGÜN deploy edilmeli.**

```
ÖNCEKİ: dist/brokers.html      → 308/301 loop → ❌ Crawl edilemez
SONRAKI: dist/brokers/index.html → 200 OK       → ✅ Crawl edilebilir
```

### 2. 🔴 og:url, twitter:title, twitter:description EKSİK — Tüm Sayfalarda
**index.html template'inde bu meta tag'ler hiç tanımlı değil:**
- `<meta property="og:url">` → YOK
- `<meta name="twitter:title">` → YOK
- `<meta name="twitter:description">` → YOK

`generate-static-pages.cjs` satır 163, 167-168'de bu tag'leri replace etmeye çalışıyor ama template'de olmadığı için regex hiçbir şey bulamıyor → **sessizce başarısız oluyor**.

**Sonuç**: 50+ statik HTML sayfasının hiçbirinde bu tag'ler yok. Facebook/LinkedIn/Twitter paylaşımlarında ve Google'ın social signal değerlendirmesinde kayıp.

### 3. 🔴 JSON-LD Structured Data SIFIR
Sitede hiç structured data yok:
- `WebSite` schema → YOK (sitelinks için gerekli)
- `Organization` schema → YOK (brand SERP için)
- `Review` / `AggregateRating` → YOK (yıldız rating'ler SERP'te görünmez)
- `BreadcrumbList` → YOK (breadcrumb zengin sonuçlar yok)
- `FAQPage` → YOK (FAQ sayfası genişletilmiş sonuçlar alamaz)

**Etki**: Broker review sayfaları SERP'te yıldız gösteremiyor → CTR düşük kalıyor.

### 4. 🔴 TR Subdomain GSC'de YOK
`tr.beginnerfxguide.com` için ayrı GSC property eklenmemiş.
- 12 TR sayfasının indeks durumu bilinmiyor
- Crawl hatası olup olmadığı bilinmiyor
- Hreflang çalışıp çalışmadığı doğrulanamıyor

---

## ⚠️ YÜKSEK ÖNCELİKLİ SORUNLAR

### 5. 🟠 Trailing Slash Tutarsızlığı
Sitemap URL'leri: `https://beginnerfxguide.com/brokers` (slash YOK)
Directory-based dosya: `dist/brokers/index.html` → `/brokers/` olarak servis edilir

Google her ikisini de ayrı sayfa olarak görüyor:
- `/about` → 3 gösterim, pozisyon 1.0
- `/about/` → 6 gösterim, pozisyon 1.5

**Bu, crawl budget'ı ikiye bölüyor ve canonical sinyali zayıflatıyor.**

### 6. 🟠 Affiliate Redirect'ler Eksik
`_redirects` dosyasında sadece **1 broker** redirect'i var (`/go/fxpro`).
`brokers.ts`'de 22 broker tanımlı. Diğer 21 broker'ın `/go/*` redirect'i yok.

JS devre dışı olan kullanıcılarda ve bot crawl'larında affiliate linkler çalışmaz.

### 7. 🟠 Hreflang Uygulaması Eksik ve Tutarsız
- EN sitemap'te sadece 8/22 review'da hreflang var
- `index.html` template'inde `hreflang="tr"` YOK (sadece en-us ve x-default var)
- Statik HTML'lere hreflang inject edilmiyor (sadece sitemap'e güveniliyor)
- Google sitemap hreflang'ı "düşük güvenilirlik" olarak değerlendiriyor

### 8. 🟠 Gösterim Düşüşü — Mart Krizi
```
Şubat ortalaması: ~18 gösterim/gün
Mart 1-10:        ~3.4 gösterim/gün  (↓ %81 düşüş)
Mart 8-10:        0 gösterim/gün
```
Bu düşüş redirect loop + crawl hatalarının birikmesiyle uyumlu. Google muhtemelen siteyi "crawl sorunlu" olarak işaretledi.

---

## 🟡 ORTA ÖNCELİKLİ SORUNLAR

### 9. Bing & Yandex Durumu
- **Bing**: UET tracking kodu mevcut (satır 53-54), msvalidate.01 doğrulaması var ✅
- **Yandex**: Metrika 106629069 aktif ✅
- Ancak her iki arama motorunda da ayrı webmaster panel kontrolü yapılmalı
- Bing Webmaster Tools'da sitemap submit edilmeli

### 10. Blog İçerikleri Tamamen Görünmez
18 blog yazısının HİÇBİRİ Google'da tek bir gösterim almamış.
- Internal link yetersiz olabilir (blog yazılarına anasayfa/guide'lardan link var mı?)
- Blog sayfası (/blog) kendisi bile indekste değil
- Thin content riski: Blog yazılarının kelime sayısı kontrol edilmeli

### 11. Tool Alt Sayfaları Görünmez
`/tools` 14 gösterim alıyor ama alt sayfalar (pip-calculator, position-size vb.) sıfır.
- Bu sayfalar doğrudan arama trafiği çekebilecek yüksek intent sayfalar
- "forex pip calculator", "position size calculator" gibi sorgular için optimize edilmeli

### 12. Sitemap'te URL Formatı
Sitemap'te URL'ler trailing slash'sız (`/brokers`), ama directory-based dosyalar slash'lı servis edilecek (`/brokers/`). Deploy sonrası sitemap URL'leri güncellenmeli veya canonical ile eşleşmeli.

---

## 🟢 ÖNERİLER

### 13. Internal Linking Stratejisi Yok
- Anasayfadan → review sayfalarına güçlü link geçişi
- Review sayfalarından → ilgili guide'lara cross-link
- Blog yazılarından → broker review'lara contextual link
- Glossary terimlerinden → ilgili sayfalara link

### 14. Content Depth Analizi Gerekli
Top 5 competitor'ün broker review'ları ile kelime sayısı/konu derinliği karşılaştırması yapılmalı. "Thin content" Google'ın indekslememe sebeplerinden biri.

### 15. Core Web Vitals Kontrolü
PageSpeed Insights ile LCP, FID, CLS metrikleri kontrol edilmeli. SPA olması LCP'yi etkileyebilir.

---

## 📋 AKSİYON PLANI (Öncelik Sırasına Göre)

### 🔥 BUGÜN (Deploy)
1. ✅ ~~Directory-based HTML fix~~ → **Kodu deploy et** (git push)
2. ✅ ~~Sitemap lastmod güncelleme~~ → Deploy ile birlikte gidecek
3. ✅ ~~robots.txt temizleme~~ → Deploy ile birlikte gidecek

### 📌 BU HAFTA (Meta Tag Fix'leri)
4. `index.html`'e eksik meta tag'leri ekle:
   - `<meta property="og:url" content="https://beginnerfxguide.com/" />`
   - `<meta name="twitter:title" content="..." />`
   - `<meta name="twitter:description" content="..." />`
5. JSON-LD `WebSite` + `Organization` schema ekle (index.html'e)
6. Broker review sayfaları için `Review` schema injection (generate-static-pages.cjs'e)

### 📌 BU HAFTA (GSC & Webmaster)
7. `tr.beginnerfxguide.com` için GSC property ekle
8. Bing Webmaster Tools'da sitemap submit et
9. Yandex Webmaster'da sitemap submit et
10. Deploy sonrası GSC'den "Tüm URL'leri yeniden crawl et" iste

### 📌 GELECEK HAFTA (İçerik & Teknik)
11. Trailing slash → sitemap URL'lerini directory-based'e uyumlu hale getir
12. `_redirects`'e 22 broker affiliate redirect ekle
13. Internal linking stratejisi uygula
14. Blog içeriklerinin derinliğini artır
15. FAQ sayfasına FAQPage schema ekle

---

## 📈 BEKLENEN ETKİ

| Aksiyon | Beklenen Etki | Süre |
|---------|---------------|------|
| Redirect loop fix (deploy) | ~50 sayfa crawl edilebilir hale gelir | 1-2 hafta |
| Meta tag fix'leri | Social paylaşım + SERP CTR artışı | 2-4 hafta |
| JSON-LD structured data | Rich results (yıldızlar, breadcrumb) | 2-6 hafta |
| TR GSC property | TR sayfaların izlenebilmesi | Anında |
| Internal linking | Crawl derinliği + sayfa otoritesi artışı | 2-4 hafta |

**Gerçekçi beklenti**: Deploy sonrası 2-3 hafta içinde indekslenen sayfa sayısı 15 → 40+ olmalı. 6-8 hafta içinde organik gösterimler 500+ / hafta seviyesine çıkabilir.

---

## ÖNCEKİ AUDİT İLE KARŞILAŞTIRMA

| Sorun | v1 (12 Mart) | v2 (12 Mart) |
|-------|-------------|-------------|
| Redirect loop | 🔴 Tanımlandı | ✅ Kod düzeltildi, deploy bekliyor |
| Hreflang | 🔴 Tek yönlü | ✅ Çift yönlü eklendi, deploy bekliyor |
| Sitemap lastmod | 🔴 Eski tarihler | ✅ Güncellendi, deploy bekliyor |
| robots.txt | 🟠 Gereksiz satırlar | ✅ Temizlendi, deploy bekliyor |
| og:url eksik | 🔴 (Yeni bulgu) | 🔴 Düzeltilmedi |
| twitter:title/desc eksik | 🔴 (Yeni bulgu) | 🔴 Düzeltilmedi |
| JSON-LD | 🔴 (Yeni bulgu) | 🔴 Düzeltilmedi |
| TR GSC property | 🟠 Tanımlandı | 🔴 Hala eklenmemiş |

---

*Rapor oluşturma: 12 Mart 2026 | Veri kaynağı: Google Search Console API (90 günlük)*
