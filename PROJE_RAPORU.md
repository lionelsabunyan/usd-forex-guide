# beginnerfxguide.com — Durum Raporu (12 Nisan 2026)

## Proje Ne Yapıyor?

Forex affiliate sitesi. ABD ve uluslararası trader'lara broker review, karşılaştırma, eğitim içeriği sunuyor. Gelir modeli: broker affiliate linkleri (IB ortaklıkları). Türkçe alt domain ile TR pazarına da açılmış.

---

## İçerik Envanteri

| Kategori | EN | TR | Toplam |
|----------|----|----|--------|
| Broker review | 22 | 10 | 32 |
| Blog yazısı | 33 | 7 | 40 |
| Rehber sayfası | 17 | 0 | 17 |
| Karşılaştırma sayfası | 14 | 0 | 14 |
| Araç sayfası | 8 | 0 | 8 |
| Bölgesel sayfa (AU, UK, CA, SG, EU) | 6 | 0 | 6 |
| Programatik SEO (min deposit, spreads, fees) | 66 | 0 | 66 |
| **Toplam sayfa** | **166+** | **17** | **183+** |

---

## Gelir Altyapısı

### IB Ortakları (Ana Gelir — Yüksek Komisyon)
| Broker | Affiliate Link | Durum |
|--------|---------------|-------|
| FXGlory | ✅ IB link aktif | Çalışıyor |
| HankoTrade | ✅ IB link aktif | Çalışıyor |
| MidasFX | ✅ IB link aktif | Çalışıyor |
| N1CM | ✅ IB link aktif | Çalışıyor |
| Coinexx | ✅ IB link aktif | Çalışıyor |

### Diğer Broker'lar (Standart Affiliate)
16 broker daha affiliate link ile yönlendiriliyor (XM, Exness, Pepperstone, eToro, OANDA, vb.)

### Eksikler
- **PlexyTrade**: affiliateUrl boş — IB kurulumu bekliyor
- Bazı broker'larda (Pepperstone, FXTM, FBS, AvaTrade) siteUrl fallback kullanılıyor

---

## Teknik Altyapı Durumu

### Çalışan Sistemler ✅
- **Analytics**: GA4 + GTM + Microsoft Clarity + Yandex Metrika + Bing UET
- **Affiliate tracking**: 4 katmanlı (GA4 event + GTM dataLayer + Bing UET + Yandex goal)
- **Email otomasyon**: 7 günlük drip kampanya (n8n webhook → email)
- **A/B testing**: 3 aktif deney (CTA renk, CTA copy, exit intent popup)
- **SEO**: 200+ statik HTML, sitemap, trailing slash canonical, prerender.io worker
- **CRO**: Exit intent popup, mobile sticky footer, lead magnet banner
- **Admin panel**: Mesajlar, aboneler, review moderasyonu, analytics dashboard
- **Güvenlik**: CSP headers, X-Frame-Options, CORS, bot koruması

### Bilinen Sorunlar ⚠️
- Admin auth client-side only (localStorage) — backend migration gerekli
- TypeScript strict mode kapalı
- Admin analytics dashboard simüle data gösteriyor (GA4 API bağlı değil)
- A/B testlerde istatistiksel anlamlılık hesabı yok

---

## TR Alt Domain Durumu

### Tamamlanan ✅
- 10 broker inceleme (FXPro, XM, Exness, FBS, Pepperstone, FXTM, OANDA, IG, eToro, Forex.com)
- 7 blog yazısı
- Ana sayfalar (hakkımızda, iletişim, gizlilik, yasal uyarı)
- TR-spesifik tracking (Yandex Direct Pixel, TR conversion events)
- TR exit intent popup + mobile sticky footer

### Eksik ❌
- 12 broker inceleme (FXGlory, Hankotrade, MidasFX, N1CM, HFM, LMFX, Coinexx, PlexyTrade, AvaTrade, Charles Schwab, tastyfx, Interactive Brokers)
- Rehber sayfaları (0/17)
- Karşılaştırma sayfaları (0/14)
- Araç sayfaları (0/8)
- Bölgesel sayfalar (0/6)
- TR sayfaları generate-static-pages.cjs'de yok (SEO meta eksik)

---

## Nerede Kaldık?

Son 20 commit'e bakılırsa şu sırayla çalışıldı:

1. **İçerik genişletme** — Rehber sayfaları, karşılaştırma sayfaları, programatik SEO sayfaları eklendi
2. **TR pazarı** — Türkçe blog ve broker incelemeleri eklendi
3. **Analytics** — GA4, Clarity, Yandex entegrasyonu yapıldı
4. **CRO** — A/B test altyapısı, exit intent popup, mobile sticky footer
5. **Paperclip AI** — Denendi, verim alınamadı, kapatıldı
6. **Temizlik** — Bugün yapıldı (10.050 satır silindi)

---

## Sırada Ne Var? (Öncelik Sırasına Göre)

### 🔴 Kritik — Hemen Yapılmalı
1. **Unstaged değişiklikleri commit et** — 10 dosyada TR içerik güncellemeleri + routing değişiklikleri bekliyor
2. **Deploy et** — Temizlik sonrası Cloudflare Pages'e deploy gerekli

### 🟠 Yüksek — Bu Hafta
3. **TR broker incelemelerini tamamla** — En az IB ortakları (FXGlory, Hankotrade, MidasFX, Coinexx, N1CM) TR'ye eklenmeli — bunlar gelir getiriyor
4. **TR sayfalarını static generation'a ekle** — generate-static-pages.cjs'e TR meta tagları ekle, yoksa Google indekslemiyor
5. **PlexyTrade affiliate link'i kur** — affiliateUrl boş, gelir kaybı

### 🟡 Orta — Bu Ay
6. **Admin analytics'i gerçek veriye bağla** — GA4 API veya Supabase'e günlük veri çekimi
7. **A/B test sonuçlarını değerlendir** — 3 deney çalışıyor ama sonuç analizi yok
8. **TR rehber sayfaları** — En azından "Forex Nedir?", "Broker Nasıl Seçilir?" gibi temel rehberler
9. **Drip kampanya performansı** — Açılma/tıklanma oranları takip edilmiyor

### 🟢 Düşük — Gelecek Ay
10. **Admin auth backend migration** — Supabase Auth ile server-side auth
11. **TypeScript strict mode** — Aşamalı geçiş
12. **TR karşılaştırma ve araç sayfaları**
13. **Cohort analizi** — Drip kampanya → affiliate conversion takibi
