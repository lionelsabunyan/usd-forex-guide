# SEO Audit Raporu — beginnerfxguide.com

**Tarih:** 2026-03-12
**Kapsam:** Google Search Console + Bing + Yandex + Teknik SEO
**Site:** beginnerfxguide.com | TR subdomain: tr.beginnerfxguide.com

---

## Ozet

| Seviye | Sorun Sayisi |
|--------|-------------|
| KRITIK | 3 |
| YUKSEK | 5 |
| ORTA | 4 |
| DUSUK | 3 |

**Durum:** Site ciddi indeksleme sorunlari yasiyor. Son 28 gunde **0 tiklama**, sadece **364 gosterim**, ortalama pozisyon **22**. Ana neden: sayfalarin ~%80'inde **sonsuz redirect dongusu** (Cloudflare 308 + Netlify 301).

---

## KRITIK SORUNLAR

### 1. Sonsuz Redirect Dongusu (308 <-> 301) — Sayfalarin %80'i Etkileniyor

**Sorun:**
Cloudflare CDN, trailing-slash olmayan URL'lere otomatik **308 Permanent Redirect** ekliyor:
```
/brokers → 308 → /brokers/
```
Ancak Netlify'da `dist/brokers/index.html` dizini yok (flat file: `dist/brokers.html`), bu yuzden Netlify **301 redirect** ile geri gonderiyor:
```
/brokers/ → 301 → /brokers
```
Sonuc: **SONSUZ DONGÜ**

**Etkilenen Sayfalar (teyit edilen):**
- `/brokers` — GSC: "Redirect error"
- `/review/midasfx` — GSC: "Redirect error"
- `/review/exness` — GSC: "Redirect error"
- `/review/hfm` — GSC: "Redirect error"
- `/compare` — GSC: "Redirect error"

**Tahmini etki:** Tum review sayfalari (22 adet), compare sayfalari, blog sayfalari, guide sayfalari — toplam ~60+ URL

**Neden /tools calisiyor ama /brokers calismiyor:**
- `/tools` alt sayfalari var (pip-calculator, vb.) → build sirasinda `dist/tools/` dizini olusturuluyor → `/tools/` = 200 OK
- `/brokers` sadece `dist/brokers.html` (flat file) → dizin yok → `/brokers/` Netlify 301 geri gonderiyor

**Cozum Onerileri:**
1. **Cloudflare'de trailing-slash redirect'i kapat:** Cloudflare Dashboard → Rules → Transform Rules → URL Normalization → "Normalize incoming URLs" kapat veya "Append trailing slash" kural olustur
2. **VEYA** `generate-static-pages.cjs`'de flat file yerine directory-based olustur: `dist/brokers/index.html` (CLAUDE.md'de "flat file" kurali var, ama bu kural redirect dongusu yaratiyor — tekrar degerlendirilmeli)
3. **VEYA** `_redirects`'e her sayfa icin explicit rule ekle:
```
/brokers  /brokers.html  200
/compare  /compare.html  200
/review/* /review/:splat.html  200
```

**Oncelik:** ACIL — Bu duzeltilmeden hicbir SEO calismasi sonuc vermez.

---

### 2. TR Subdomain Google'da Tamamen Bilinmiyor

**Sorun:**
GSC URL Inspection sonucu: `/tr` → **"URL is unknown to Google"** (hic taranmamis)

**Nedenler:**
- `_redirects` dosyasindaki kural: `https://tr.beginnerfxguide.com/* /tr/:splat 200`
- Bu kural Netlify'da calisiyor olabilir, ancak Cloudflare DNS yapilandirmasi subdomain'i dogru yonlendirmiyor olabilir
- Sitemap-tr.xml icindeki URL'ler `https://beginnerfxguide.com/tr/...` formatinda — subdomain degil
- Google Search Console'da `tr.beginnerfxguide.com` ayri bir property olarak eklenmemis olabilir

**Cozum:**
1. GSC'ye `tr.beginnerfxguide.com` ayri property olarak ekle
2. `sitemap-tr.xml` icindeki URL'lerin dogru formatta oldugundan emin ol (subdomain mi, path mi?)
3. TR sayfalarinin HTTP 200 dondurdugunu dogrula (redirect dongusu burada da olabilir)
4. hreflang tag'larinin tutarli oldugunu kontrol et

---

### 3. Yandex Webmaster Dogrulamasi YOK

**Sorun:**
- `index.html`'de Yandex dogrulama meta tag'i **yok**
- `public/` dizininde Yandex dogrulama dosyasi (`yandex_*.html`) **yok**
- Yandex Metrika kodu mevcut (ID: 106629069), ancak Webmaster Tools dogrulamasi yapilmamis

**Etki:** Yandex indeksleme durumu takip edilemiyor, sitemap gonderilemedi, hata raporlari alinamiyor

**Cozum:**
1. https://webmaster.yandex.com adresine git
2. `beginnerfxguide.com` property'si ekle
3. Meta tag dogrulamasini sec, `index.html`'e ekle:
```html
<meta name="yandex-verification" content="DOGRULAMA_KODU" />
```
4. Sitemap URL'ini Yandex'e gonder: `https://beginnerfxguide.com/sitemap-index.xml`

---

## YUKSEK ONCELIKLI SORUNLAR

### 4. Sitemap lastmod Tarihleri Bayat

**Sorun:**
- `sitemap-index.xml`: lastmod = **2026-02-08** (32 gun once)
- `sitemap.xml`: Tum 70 URL icin lastmod = **2026-02-05** (35 gun once)
- `sitemap-tr.xml`: lastmod = **2026-02-08**

**Etki:** Arama motorlari bayat lastmod tarihlerini gorünce sayfayi tekrar taramaya oncelik vermiyor. Ozellikle yeni eklenen veya guncellenen icerikler icin kritik.

**Cozum:**
1. `generate-static-pages.cjs` icerisinde lastmod tarihini **build tarihine** otomatik ayarla
2. Veya sitemap'leri dinamik olarak CI/CD pipeline'inda olustur
3. Her deploy'da lastmod guncellenmeli

---

### 5. Bing Webmaster Tools Eksik Yapilandirma

**Sorun:**
- `msvalidate.01` meta tag'i mevcut (`38E420BDC12AC7FBF2E36299AD74F8E0`) ✅
- Ancak `BingSiteAuth.xml` dogrulama dosyasi **yok**
- Bing'e sitemap gonderilmis mi belirsiz
- Bing IndexNow protokolu kullanilmiyor

**Cozum:**
1. https://www.bing.com/webmasters adresinden dogrulama durumunu kontrol et
2. Sitemap'i Bing'e gonder (sitemap-index.xml)
3. IndexNow API key'i olustur ve Cloudflare'e veya deploy pipeline'a entegre et
4. `public/BingSiteAuth.xml` olustur (opsiyonel ama onerilen)

---

### 6. Blog Sayfalari Google'da Bilinmiyor

**Sorun:**
GSC URL Inspection: `/blog/how-to-start-forex-trading-usa-2026` → **"URL is unknown to Google"**

Bu, sitemap.xml'de listelenip (18 blog URL'si) Google tarafindan hic taranmamis sayfalar oldugunu gosteriyor. Muhtemel neden: redirect dongusu (Sorun #1) blog sayfalarini da etkiliyor.

**Cozum:** Sorun #1 cozuldukten sonra blog sayfalari da indekslenmeye baslamali. Ek olarak:
1. Google Search Console'dan "URL Inspection" ile tekrar tarama iste
2. Internal linking'i guclendir (ana sayfadan blog'a link)

---

### 7. Guide Sayfalari Redirect Sorunu

**Sorun:**
GSC URL Inspection: `/guides/forex-trading-usa` → **"Page with redirect"**
- Google'un sectigi canonical URL: trailing-slash versiyonu
- Bu, redirect dongusu olmasa bile Google'un URL tercihinde karisiklik oldugunu gosteriyor

**Cozum:**
1. Tum canonical tag'larda trailing-slash OLMAYAN versiyon kullan (tutarli ol)
2. `_redirects`'de explicit kural ekle
3. Sorun #1 cozulurse bu da buyuk olcude duzelmeli

---

### 8. `site:beginnerfxguide.com` Arama Sonucu YOK

**Sorun:**
Google'da `site:beginnerfxguide.com` aramasinda **sifir sonuc** donuyor. Bu, sitenin neredeyse tamamen indekslenmedigini gosteriyor.

**Not:** Ana sayfa (/) GSC'de "indexed" goruniyor, ancak site: aramasinda bile cikmamasi endise verici. Muhtemelen cok yeni indekslenmis ve henuz arama sonuclarina yansimamis.

---

## ORTA ONCELIKLI SORUNLAR

### 9. hreflang Tutarsizliklari

**Sorun:**
- `sitemap-tr.xml` icinde hreflang alternate linkleri var ✅
- Ancak `sitemap.xml` (EN) icinde TR alternatiflerine referans **yok**
- hreflang reciprocal (karsilikli) olmali — her iki taraf da birbirini gostermeli

**Cozum:**
1. `sitemap.xml`'deki EN URL'lere karsilik gelen TR URL'leri hreflang alternate olarak ekle
2. Veya HTML head'de hreflang tag'lari her iki dilde de karsilikli ekle

---

### 10. 404 Sayfa Yonetimi

**Sorun:**
- `fix-spa-fallback.cjs` build sonrasi `404.html`'i siliyor (SPA fallback icin gerekli)
- Bu, gercek 404 URL'lerin de `index.html` ile 200 dondurmesine neden oluyor
- Arama motorlari icin bu **soft 404** sorunu — var olmayan sayfalar 200 donduruyor

**Cozum:**
1. React Router'da 404 sayfasi icin `<meta name="robots" content="noindex">` ekle
2. Veya `_redirects`'de bilinen sayfalari explicit listele, gerisi 404 donsun
3. `X-Robots-Tag: noindex` header'i 404 icerigi icin eklenebilir

---

### 11. Open Graph / Twitter Card Gorsel Dosyasi

**Sorun:**
- `og:image` ve `twitter:image` olarak `/images/og/og-default.png` referans ediliyor
- Bu dosyanin `public/images/og/` dizininde var oldugundan emin olunmali
- Sayfa bazli OG gorselleri yok — tum sayfalar ayni gorseli kullaniyor

**Cozum:**
1. OG gorsel dosyasinin mevcudiyetini dogrula
2. Onemli sayfalar (ana sayfa, broker review'lar) icin ozel OG gorselleri olustur
3. `generate-static-pages.cjs`'de sayfa bazli OG gorseli inject et

---

### 12. Robots.txt Sitemap Fazlaligi

**Sorun:**
robots.txt'de 3 sitemap listelenmis:
```
Sitemap: https://beginnerfxguide.com/sitemap-index.xml
Sitemap: https://beginnerfxguide.com/sitemap.xml
Sitemap: https://beginnerfxguide.com/sitemap-tr.xml
```
`sitemap-index.xml` zaten `sitemap.xml` ve `sitemap-tr.xml`'i iceriyor. Direkt linkleme gereksiz ve kafa karistirici olabilir.

**Cozum:**
robots.txt'de sadece sitemap-index.xml birak:
```
Sitemap: https://beginnerfxguide.com/sitemap-index.xml
```

---

## DUSUK ONCELIKLI SORUNLAR

### 13. Affiliate Redirect Yolu Sinirliligi

**Sorun:**
- `_redirects`'de sadece `/go/fxpro` tanimli
- 22 broker var, ancak diger broker'larin affiliate redirect'leri dogrudan JS'te tanimli
- Ad-blocker bypass icin `/go/*` pattern'i kullanilabilir

**Oneri:** Tum broker affiliate linklerini `/go/broker-slug` uzerinden yonlendir

---

### 14. Performans Metrikleri (28 Gun)

| Metrik | Deger |
|--------|-------|
| Toplam Tiklama | 0 |
| Toplam Gosterim | 364 |
| Ortalama CTR | %0 |
| Ortalama Pozisyon | 22 |

**En Cok Gosterim Alan Sayfalar:**
| Sayfa | Gosterim |
|-------|----------|
| /review/midasfx | 174 |
| /review/lmfx | 43 |
| /review/exness | 35 |
| /review/hfm | 35 |

Bu rakamlarin dusuk olmasi buyuk olcude redirect dongusu sorunuyla aciklanabilir.

---

### 15. Schema.org Structured Data

**Sorun:**
Broker review sayfalari icin Review/Rating schema markup'i eksik olabilir. Bu, arama sonuclarinda yildiz/rating gosterimini engeller.

**Oneri:** JSON-LD formatinda `Review`, `Organization` ve `BreadcrumbList` schema'lari ekle.

---

## AKSIYON PLANI (Oncelik Sirasina Gore)

### Acil (Bu Hafta)
1. **Cloudflare trailing-slash redirect'ini kapat** VEYA `generate-static-pages.cjs`'de directory-based HTML uret
2. **Yandex Webmaster dogrulamasi yap** — meta tag ekle
3. **Bing Webmaster Tools'u kontrol et** — sitemap gonder

### Kisa Vade (1-2 Hafta)
4. **Sitemap lastmod tarihlerini otomatiklestir** — her build'de guncelle
5. **TR subdomain'i GSC'ye ayri ekle** (eger subdomain-based routing kullaniliyorsa)
6. **hreflang karsilikli referanslari duzelt** — EN sitemap'e TR alternatifleri ekle
7. **robots.txt'den gereksiz sitemap referanslarini kaldir**

### Orta Vade (2-4 Hafta)
8. **Soft 404 sorununu coz** — noindex meta veya dogru 404 HTTP kodu
9. **Schema.org structured data ekle** — Review, BreadcrumbList
10. **Blog ve guide sayfalari icin internal linking guclendir**
11. **IndexNow entegrasyonu** — Bing icin aninda indeksleme

### Uzun Vade (1-2 Ay)
12. **Sayfa bazli OG gorselleri olustur**
13. **Tum affiliate linkleri /go/* uzerinden yonlendir**
14. **Core Web Vitals optimizasyonu** (ayri audit gerektirir)

---

## SONUC

Sitenin en buyuk sorunu **Cloudflare 308 + Netlify 301 sonsuz redirect dongusu**. Bu, sayfalarin ~%80'inin arama motorlari tarafindan indekslenmesini engelliyor. Bu tek sorun cozulurse, indeksleme buyuk olcude iyilesecek.

Ikinci kritik sorun **Yandex Webmaster dogrulamasinin olmamasi** — Yandex Metrika kodu var ama Webmaster Tools'a kayit yapilmamis.

Ucuncu olarak **TR subdomain tamamen indekslenmemis** — ayri GSC property eklenmeli ve routing dogrulanmali.

Bu 3 kritik sorun cozuldukten sonra, orta ve dusuk oncelikli sorunlar organik trafik artisini hizlandirmak icin ele alinmali.
