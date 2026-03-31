# Affiliate Donusum Funnel Analizi

**Tarih:** 2026-03-23
**Donem:** Son 90 gun (2025-12-23 — 2026-03-23)
**Kaynak:** GA4 (properties/519441201) — `affiliate_click`, `ib_partner_click`, `open_account_click` eventleri

---

## 1. Ozet Metrikler

| Metrik | Deger |
|--------|-------|
| Toplam affiliate_click | 1,978 |
| IB partner click | 890 |
| Open account click | 147 |
| Genel outbound click | 790 |
| **IB / Toplam oran** | **%45** |
| **Open account / Toplam** | **%7.4** |

### Cihaz Dagilimi

| Cihaz | Click | Pay |
|-------|-------|-----|
| Mobile | 1,508 | %76.2 |
| Desktop | 371 | %18.8 |
| Tablet | 99 | %5.0 |

> **Bulgu:** Affiliate tiklarin %76'si mobilden geliyor. Mobile sticky CTA en kritik donusum noktasi.

---

## 2. Sayfa Bazinda Affiliate Click Dagilimi

| # | Sayfa | Clicks | Oturum | Click/Oturum |
|---|-------|--------|--------|-------------|
| 1 | `/` (Homepage EN) | 1,056 | 2,452 | %43.1 |
| 2 | `/tr` (TR Ana Sayfa) | 344 | 8,691 | %4.0 |
| 3 | `/tr/` | 294 | 2,160 | %13.6 |
| 4 | `/compare/` | 54 | 67 | %80.6 |
| 5 | `/tr/inceleme/xm` | 54 | 66 | %81.8 |
| 6 | `/compare` | 30 | 234 | %12.8 |
| 7 | `/brokers` | 22 | 105 | %21.0 |
| 8 | `/review/midasfx` | 18 | 41 | %43.9 |
| 9 | `/tr/inceleme/fxpro` | 18 | 24 | %75.0 |
| 10 | `/tr/inceleme/hfm` | 16 | 35 | %45.7 |
| 11 | `/review/coinexx` | 15 | 13 | %115.4* |
| 12 | `/review/fxglory` | 15 | 41 | %36.6 |
| 13 | `/review/hankotrade` | 8 | 30 | %26.7 |
| 14 | `/review/lmfx` | 6 | 10 | %60.0 |
| 15 | `/tr/inceleme/fxtm` | 5 | 11 | %45.5 |

> *\*%100 ustu deger: ayni oturumda birden fazla click*

### En Yuksek CTR Sayfalar (Click/Oturum)

1. **`/tr/inceleme/xm`** — %81.8 (54 click / 66 oturum)
2. **`/compare/`** — %80.6 (54 click / 67 oturum)
3. **`/tr/inceleme/fxpro`** — %75.0 (18 click / 24 oturum)
4. **`/review/lmfx`** — %60.0 (6 click / 10 oturum)
5. **`/tr/inceleme/hfm`** — %45.7 (16 click / 35 oturum)

### En Dusuk CTR Sayfalar (iyilestirme adayi)

1. **`/tr`** — %4.0 (344 click / 8,691 oturum) — En yuksek trafikli sayfa ama CTR cok dusuk
2. **`/compare`** (trailing slash yok) — %12.8 (30 click / 234 oturum)
3. **`/tr/`** — %13.6 (294 click / 2,160 oturum)
4. **`/brokers`** — %21.0 (22 click / 105 oturum)
5. **`/review/hankotrade`** — %26.7 (8 click / 30 oturum)

---

## 3. Broker Bazinda Click Dagilimi

| # | Broker | Clicks | IB? | Pay |
|---|--------|--------|-----|-----|
| 1 | hankotrade | 649 | IB | %32.8 |
| 2 | (not set) | 546 | — | %27.6 |
| 3 | fxglory | 216 | IB | %10.9 |
| 4 | hfm | 200 | — | %10.1 |
| 5 | midasfx | 132 | IB | %6.7 |
| 6 | xm | 96 | — | %4.9 |
| 7 | fxpro | 59 | — | %3.0 |
| 8 | fxtm | 19 | — | %1.0 |
| 9 | coinexx | 17 | IB | %0.9 |
| 10 | pepperstone | 17 | — | %0.9 |
| 11 | fbs | 12 | — | %0.6 |
| 12 | lmfx | 8 | — | %0.4 |
| 13 | exness | 7 | — | %0.4 |

**IB Toplam:** 1,014 click (%51.3 — hankotrade + fxglory + midasfx + coinexx)

> **KRITIK:** 546 click (%27.6) `(not set)` broker_id ile geliyor. Bu, tracking.ts'deki `trackAffiliateClick` fonksiyonuna broker_id gecilmeyen CTA'lardan kaynaklaniyor. **Gelir kaybi riski.**

---

## 4. CTA Turu Bazinda Performans

| # | CTA Konumu | Clicks | Pay | Notlar |
|---|-----------|--------|-----|--------|
| 1 | (not set) | 546 | %27.6 | Takip edilemeyen clickler |
| 2 | mobile_sticky | 541 | %27.3 | EN homepage mobile sticky |
| 3 | hero | 186 | %9.4 | EN homepage hero CTA |
| 4 | tr_comparison | 150 | %7.6 | TR karsilastirma tablosu |
| 5 | mobile_sticky_tr_home | 87 | %4.4 | TR mobile sticky (home) |
| 6 | mobile_sticky_tr | 85 | %4.3 | TR mobile sticky (genel) |
| 7 | header | 69 | %3.5 | Ust menu CTA |
| 8 | featured_broker | 49 | %2.5 | Featured broker karti |
| 9 | tr_review_hero | 49 | %2.5 | TR review hero CTA |
| 10 | hero_secondary | 45 | %2.3 | Secondary hero CTA |
| 11 | review_hero | 43 | %2.2 | EN review hero CTA |
| 12 | bonus_section | 38 | %1.9 | Bonus bolumu |
| 13 | comparison_mobile | 18 | %0.9 | Mobile karsilastirma |
| 14 | compare_page | 14 | %0.7 | Karsilastirma sayfasi |
| 15 | tr_review_commission_banner | 9 | %0.5 | TR komisyon banner |
| 16 | comparison_table | 8 | %0.4 | Desktop karsilastirma |
| 17 | exit_intent_popup | 4 | %0.2 | Cikis popup'i |
| 18 | review_sticky | 3 | %0.2 | Review sticky bar |

### CTA Kategori Ozeti

| Kategori | Clicks | Pay |
|----------|--------|-----|
| **Mobile Sticky (tum)** | 713 | %36.0 |
| **Hero CTA (tum)** | 231 | %11.7 |
| **Karsilastirma tablosu (tum)** | 190 | %9.6 |
| **Review hero (tum)** | 92 | %4.7 |
| **Header** | 69 | %3.5 |
| **Featured broker** | 49 | %2.5 |
| **Bonus section** | 38 | %1.9 |
| **Takip edilemeyen** | 546 | %27.6 |

---

## 5. Button Type Analizi

| Buton Metni | Clicks | Pay |
|-------------|--------|-----|
| get_started | 628 | %31.7 |
| (not set) | 546 | %27.6 |
| hesap_ac | 311 | %15.7 |
| open_account | 289 | %14.6 |
| start_trading | 72 | %3.6 |
| visit_site | 58 | %2.9 |
| claim_bonus | 38 | %1.9 |
| tr_comparison | 25 | %1.3 |

> "Get Started" en cok tiklanan CTA metni. "Hesap Ac" (TR) ikinci sirada.

---

## 6. Haftalik Trend

| Hafta | Clicks | Trend |
|-------|--------|-------|
| W06 | 12 | Baslangic |
| W07 | 232 | +1,833% |
| W08 | 397 | +71% |
| W09 | 515 | +30% (PEAK) |
| W10 | 378 | -27% |
| W11 | 387 | +2% |
| W12 | 45 | -88% |
| W13 | 12 | Mevcut hafta (eksik veri) |

> W09 peak sonrasi stabilize olmus. W12 dusus muhtemelen hafta ici eksik veri degil, gercek dusus olabilir — arastirilmali.

---

## 7. Aksiyonlar ve Oneriler

### KRITIK — Hemen Yapilmali

1. **`(not set)` broker_id sorununu duzelt** — 546 click (%27.6) takip edilemiyor. `trackAffiliateClick` cagrilmayan veya eksik parametreli CTA'lar tespit edilmeli. Muhtemel kaynaklar:
   - Eski `<a href>` linkleri (tracking fonksiyonu cagrilmadan dogrudan yonlendirme)
   - `_redirects` dosyasindaki `/aclick` path'leri
   - GTM/dataLayer uzerinden gelen ama broker_id icermeyen eventler

2. **`/tr` sayfasi CTR iyilestirmesi** — 8,691 oturum ama sadece %4 CTR. Bu sitenin en yuksek trafikli sayfasi:
   - Mobil sticky CTA'yi daha gorse (renk, boyut) yap
   - Hero bolumune broker karsilastirma snippet'i ekle
   - Inline CTA'lar ekle (su an sadece comparison table var)

### YUKSEK — Bu Hafta

3. **Hankotrade homepage dominansini azalt** — Hankotrade tek basina homepage'deki 1,056 click'in 644'unu (%61) aliyor. Eger hankotrade IB komisyonu dusukse, featured broker rotasyonuna diger IB'ler (fxglory, midasfx) ekle.

4. **Review sayfalarina inline CTA ekle** — Review sayfalari yuksek CTR (%36-82) ama dusuk trafik. Review sayfalarina SEO trafigi cekmek icin:
   - Long-tail keyword hedeflemesi (`fxglory review 2026`, `is midasfx safe`)
   - Internal linking guclendir (homepage, compare sayfalarindan review'lara)

5. **Compare sayfasini optimize et** — %80 CTR, ancak trailing-slash/no-slash versiyonu sayfa bolunmesi yaratıyor (`/compare` vs `/compare/`). Canonical ve redirect duzelt.

### ORTA — Gelecek Sprint

6. **Exit intent popup'i test et** — 4 click ile cok dusuk performans. Ya kaldır ya da A/B test ile iyilestir.

7. **TR review sayfalarina komisyon banner ekle** — `tr_review_commission_banner` 9 click ile dusuk ama potansiyeli var. Tum TR review sayfalarinda banner olmadigini kontrol et.

8. **Blog + Guide sayfalarinda affiliate CTA eksik** — `/guides` ve `/blog` sayfalari neredeyse 0 affiliate click uretiyor. Ilgili guide'lara contextual CTA ekle.

---

## 8. Diger Ajanlara Yonlendirme

| Ajan | Aksiyon |
|------|---------|
| **SEO Agent** | Review sayfalari icin long-tail keyword arastirmasi yap. `/compare` vs `/compare/` canonical/redirect sorunu duzelt. |
| **Content Agent** | `/tr` sayfasina inline CTA bloklari ekle. Blog postlarina contextual affiliate CTA entegre et. |
| **Dev/Teknik** | `(not set)` broker_id leak noktalarini tespit et ve tracking.ts entegrasyonunu tamamla. |
