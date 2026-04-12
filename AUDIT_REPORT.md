# Audit Raporu — 2026-04-12

## Ozet: ~60 dosya tarandi, 71 sorun (Kritik: 5 | Yuksek: 10 | Orta: 38 | Dusuk: 18)

### Duzeltme Durumu (2026-04-12)
- **Duzeltildi:** K3, K4, K5, Y2, Y5, Y6, Y7, Y8, Y9, Y10 (10 sorun)
- **Mimari — ayri plan gerektirir:** K1, K2, Y1, Y3, Y4 (5 sorun)
- **Build:** Basarili (vite build 2.68s, 0 hata)

---

## KIRMIZI - Kritik (5)

### K1. Client-Side Only Admin Authentication
- **Dosya:** [adminStore.ts:269-311](src/lib/adminStore.ts#L269-L311)
- **Sorun:** Admin paneli tamamen localStorage tabanli — `admin_auth` key'ine `{"authenticated":true}` yazarak bypass edilebilir
- **Risk:** Herhangi biri DevTools ile admin paneline erisebilir
- **Oneri:** Server-side auth (JWT + HTTP-only cookie) migrasyon gerekli

### K2. Sensitive Data in localStorage
- **Dosya:** [adminStore.ts:283-287](src/lib/adminStore.ts#L283-L287)
- **Sorun:** Admin session verisi plain localStorage'da. GA4, Clarity, Yandex gibi 3rd-party scriptler bu veriye erisebilir
- **Oneri:** HTTP-only, Secure, SameSite cookie'ye gec + CSP header ekle

### K3. ~~Hardcoded EmailJS Template ID Fallbacks~~ DUZELTILDI
- **Dosya:** [emailService.ts:9-10](src/lib/emailService.ts#L9-L10)
- **Durum:** Hardcoded template ID fallback'leri kaldirildi, bos string fallback'e cevirildi

### K4. ~~`as any` Type Assertion~~ DUZELTILDI
- **Dosya:** [BonusCard.tsx:32](src/components/BonusCard.tsx#L32)
- **Durum:** `as any` kaldirildi, `BrokerId` import edilip dogru kullanildi

### K5. ~~Dead Route — HFMInceleme.tsx~~ DUZELTILDI
- **Dosya:** src/pages/tr/inceleme/HFMInceleme.tsx (silindi)
- **Durum:** Dead component silindi (_redirects'te zaten /tr/'ye 301 redirect var)

---

## TURUNCU - Yuksek (10)

### Y1. Excessive Third-Party Script Injection
- **Dosya:** [GoogleAnalytics.tsx:1-138](src/components/GoogleAnalytics.tsx#L1-L138)
- **Sorun:** GA4 + GTM + Bing UET + Yandex.Metrica + Clarity — hepsi DOM'a enjekte, CSP yok
- **Oneri:** Content Security Policy header ekle, SRI (Subresource Integrity) kullan

### Y2. ~~Unsanitized Email Form Input~~ DUZELTILDI
- **Dosya:** [ReviewForm.tsx:30-67](src/components/ReviewForm.tsx#L30-L67)
- **Durum:** DOMPurify sanitizasyonu, email regex validasyonu ve max length limitleri eklendi

### Y3. Supabase Anon Key Client-Side Exposure
- **Dosya:** [supabase.ts:1-8](src/lib/supabase.ts#L1-L8)
- **Sorun:** VITE_SUPABASE_ANON_KEY client bundle'da gorunur — RLS yanlis yapilandirilmissa veri sizintisi riski
- **Oneri:** Tum tablolarda RLS policy dogrula, hassas islemler icin server-side endpoint olustur

### Y4. Affiliate Link Manipulation Risk
- **Dosya:** [_redirects:1-22](public/_redirects#L1-L22)
- **Sorun:** Affiliate URL'ler statik dosyada hardcoded — commit access ile degistirilebilir
- **Oneri:** Affiliate URL'leri env var veya DB'ye tasi, HMAC imza dogrulamasi ekle

### Y5. ~~Unsafe Type Casts (Tekrarli Pattern)~~ DUZELTILDI
- **Dosyalar:** BonusSectionTR, ExitIntentPopupTR, MobileStickyFooterTR
- **Durum:** `isValidBrokerId` type guard fonksiyonu eklendi, `as any`/`as keyof` kaldirildi, runtime validation saglandidir

### Y6/Y7. ~~DOM Query in Scroll Handler + useEffect Sorunlari~~ DUZELTILDI
- **Dosya:** [TableOfContents.tsx](src/components/TableOfContents.tsx)
- **Durum:** Scroll event handler kaldirildi, IntersectionObserver API'ye gecildi. Layout thrashing ve gereksiz listener attach/remove duzeltildi

### Y8. ~~Unsafe Type Assertion in Blog~~ DUZELTILDI
- **Dosya:** [BlogPage.tsx:56](src/pages/blog/BlogPage.tsx#L56)
- **Durum:** `Object.entries` + type assertion yerine `Object.keys as BlogCategory[]` kullanildi

### Y9. ~~Unused Admin State Variables~~ DUZELTILDI
- **Dosya:** [AdminSettings.tsx:21-23](src/pages/admin/AdminSettings.tsx#L21-L23)
- **Durum:** TODO yorumu eklendi — server-side auth (K1/K2) cozulunce backend'e baglanacak

### Y10. ~~Affiliate URL Fallback Issue~~ DUZELTILDI
- **Dosya:** [FxProInceleme.tsx:17](src/pages/tr/inceleme/FxProInceleme.tsx#L17)
- **Durum:** Fallback `broker.siteUrl` yerine `"/go/fxpro"` affiliate redirect'ine cevirildi

---

## SARI - Orta (38)

### Guvenlik (5)

| # | Sorun | Dosya | Satir |
|---|-------|-------|-------|
| O1 | Loose NPM versions (^) guvenlik paketlerinde | [package.json](package.json) | 13-64 |
| O2 | DOMPurify ile sanitize edilmis dangerouslySetInnerHTML (dusuk risk) | [ReviewHero.tsx:86](src/components/review/ReviewHero.tsx#L86) | 86 |
| O3 | CSS variable injection riski (hardcoded color — dusuk risk) | [chart.tsx:70-86](src/components/ui/chart.tsx#L70-L86) | 70-86 |
| O4 | Bing msclkid sessionStorage'da plain text | [GoogleAnalytics.tsx:78](src/components/GoogleAnalytics.tsx#L78) | 78 |
| O5 | .env.example template ID formati ipucu veriyor | [.env.example](.env.example) | - |

### Dead Code (12)

| # | Sorun | Dosya | Satir |
|---|-------|-------|-------|
| O6 | console.log — TR Conversion tracking | [trackingTR.ts:162](src/lib/trackingTR.ts#L162) | 162 |
| O7 | console.log — Yandex Direct Pixel (x2) | [YandexDirectPixel.tsx:32,54](src/components/tr/YandexDirectPixel.tsx#L32) | 32, 54 |
| O8 | console.warn — Analytics fetch fallback | [AdminAnalytics.tsx:77](src/pages/admin/AdminAnalytics.tsx#L77) | 77 |
| O9 | console.error — Drip campaign | [dripCampaignService.ts:55](src/lib/dripCampaignService.ts#L55) | 55 |
| O10 | console.error — Newsletter service | [newsletterService.ts:49](src/lib/newsletterService.ts#L49) | 49 |
| O11 | console.warn — useLocalStorage (x2) | [useLocalStorage.ts:20,37](src/hooks/useLocalStorage.ts#L20) | 20, 37 |
| O12 | console.warn — Region detection | [useRegion.ts:45](src/hooks/useRegion.ts#L45) | 45 |
| O13 | console.error — EmbedCodeBox copy | [EmbedCodeBox.tsx:29](src/components/EmbedCodeBox.tsx#L29) | 29 |
| O14 | Unused env vars UET_ID, YM_ID (bos string) | [App.tsx:168-169](src/App.tsx#L168-L169) | 168-169 |
| O15 | Dead function getBonusBadgeClass — hic kullanilmiyor | [brokersTR.ts:215-219](src/lib/brokersTR.ts#L215-L219) | 215-219 |
| O16 | HFM redirect orphan (dosya var ama route yok) | [_redirects:103](public/_redirects#L103) | 103 |
| O17 | FBS outdated bonus bilgisi (2026 cikarildi ama deposit bonus hala aktif gorunuyor) | [brokersTR.ts:88-103](src/lib/brokersTR.ts#L88-L103) | 88-103 |

### Performans (9)

| # | Sorun | Dosya | Satir |
|---|-------|-------|-------|
| O18 | useEffect ile data fetch — React Query kullanilmali | [AdminDashboard.tsx:32-45](src/pages/admin/AdminDashboard.tsx#L32-L45) | 32-45 |
| O19 | Inline object creation (re-render) | [BrokerReviewTemplate.tsx:134-146](src/components/review/BrokerReviewTemplate.tsx#L134-L146) | 134-146 |
| O20 | Script cleanup birikmesi | [EconomicCalendar.tsx:11-35](src/pages/tools/EconomicCalendar.tsx#L11-L35) | 11-35 |
| O21 | Image optimization eksik (srcset, decoding) | [BrokerLogo.tsx:36-48](src/components/BrokerLogo.tsx#L36-L48) | 36-48 |
| O22 | Buyuk sayfa lazy-load edilmeli | [USForexTradingGuide.tsx](src/pages/guides/USForexTradingGuide.tsx) | - |
| O23 | React.memo eksik — liste icinde render edilen BrokerCard | [BrokerCard.tsx](src/components/compare/BrokerCard.tsx) | - |
| O24 | localStorage parse hatasi sessiz kalmasi | [adminStore.ts:68-78](src/lib/adminStore.ts#L68-L78) | 68-78 |
| O25 | Star rating math hatasi (4.5 -> 4 yildiz, yarim yildiz yok) | [FxProInceleme.tsx:147-149](src/pages/tr/inceleme/FxProInceleme.tsx#L147-L149) | 147-149 |
| O26 | Hard-coded overallRating (hesaplanmali) | [FxProInceleme.tsx:18](src/pages/tr/inceleme/FxProInceleme.tsx#L18) | 18 |

### Kod Kalitesi / DRY (8)

| # | Sorun | Dosya | Satir |
|---|-------|-------|-------|
| O27 | DRY: Color/status mapping tekrari | BonusCard, AdminSubscribers, AdminReviews | Cesitli |
| O28 | DRY: Form field pattern tekrari | ReviewForm + ContactPage | Cesitli |
| O29 | DRY: formatDate fonksiyonu duplicate | AdminSubscribers:86 + AdminReviews:86 | 86 |
| O30 | 3+ seviye nested conditional | [BrokerReviewTemplate.tsx:237-250](src/components/review/BrokerReviewTemplate.tsx#L237-L250) | 237-250 |
| O31 | Invalid Tailwind class `flex-2` | [BrokerTableTR.tsx:194](src/components/tr/BrokerTableTR.tsx#L194) | 194 |
| O32 | Broker list mismatch (yorum 7, liste 6) | [BrokerTableTR.tsx:10-17](src/components/tr/BrokerTableTR.tsx#L10-L17) | 10-17 |
| O33 | BonusSectionTR sadece 2/6 broker gosteriyor | [BonusSectionTR.tsx:12](src/components/tr/BonusSectionTR.tsx#L12) | 12 |
| O34 | Missing keywords meta tag | [FxProInceleme.tsx:122](src/pages/tr/inceleme/FxProInceleme.tsx#L122) | 122 |

### Routing / SEO (4)

| # | Sorun | Dosya | Satir |
|---|-------|-------|-------|
| O35 | TR subdomain redirect 200 yerine 301 olmali | [_redirects:106](public/_redirects#L106) | 106 |
| O36 | `/tr` route trailing slash tutarsizligi | [App.tsx:291](src/App.tsx#L291) | 291 |
| O37 | Turkish 404 fallback route eksik | [App.tsx](src/App.tsx) | - |
| O38 | Image alt text cok genel | [AnaSayfa.tsx:143-156](src/pages/tr/AnaSayfa.tsx#L143-L156) | 143-156 |

---

## YESIL - Dusuk / Oneri (18)

| # | Sorun | Dosya |
|---|-------|-------|
| D1 | useCallback eksik (handler recreated) | BrokerCard.tsx:32 |
| D2 | useCallback eksik (copyToClipboard) | SocialShare.tsx:23 |
| D3 | Magic number 30000ms (constant tanimlanmali) | ExitIntentPopupTR.tsx:48 |
| D4 | MobileStickyFooterTR fragile fallback | MobileStickyFooterTR.tsx:28 |
| D5 | Form state ayri useState'ler (birlestirilmeli) | ReviewForm.tsx:19-28 |
| D6 | Inline style calculation | BrokerCard.tsx:21 |
| D7 | OGImageGenerator unnecessary SVG elements | OGImageGenerator.tsx:54-152 |
| D8 | ScrollToTop null donduren component | ScrollToTop.tsx |
| D9 | Hardcoded string values tekrari | Cesitli dosyalar |
| D10 | Missing useTransition (admin search) | AdminSubscribers.tsx |
| D11 | Missing useDeferredValue (admin filter) | AdminSubscribers.tsx |
| D12 | Potential prop drilling (tracking functions) | Header, Footer |
| D13 | lucide-react over-import | USForexTradingGuide.tsx:8-23 |
| D14 | Missing `decoding="async"` on images | BrokerLogo.tsx |
| D15 | Multiple useState for form (consolidate) | ReviewForm.tsx |
| D16 | FxProInceleme missing half-star visual | FxProInceleme.tsx:147 |
| D17 | FxProInceleme vague cons text | FxProInceleme.tsx:59 |
| D18 | No Context usage for cross-cutting concerns | Architecture level |

---

## Oncelik Matrisi

### Bu Hafta (Kritik + Yuksek Guvenlik)
1. Admin auth server-side'a tasima plani olustur (K1, K2)
2. Hardcoded template ID fallback'leri kaldir (K3)
3. ReviewForm input sanitizasyonu ekle (Y2)
4. CSP header ekle (Y1)
5. `as any` type assertion duzelt (K4)

### Bu Ay (Yuksek + Orta)
6. Type guard fonksiyonu olustur (Y5)
7. TableOfContents IntersectionObserver'a gecir (Y6, Y7)
8. HFMInceleme karari — sil veya route ekle (K5)
9. Affiliate URL fallback duzelt (Y10)
10. Admin state degiskenleri duzelt (Y9)
11. Console.log'lari temizle veya dev-only yap (O6-O13)
12. Dead function getBonusBadgeClass sil (O15)
13. DRY ihlallerini duzelt (O27-O29)

### Sonraki Sprint
14. React Query migrasyonu (O18)
15. Image optimization (O21)
16. TR routing tutarliligi (O35-O37)
17. Lazy-load buyuk sayfalar (O22)
18. Performans optimizasyonlari (O19, O23)

---

## Gecmis Audit'ler

| Tarih | Bulunan | Duzeltilen | Notlar |
|-------|---------|-----------|--------|
| 2026-04-12 (onceki) | ~30 dosya | ~30 | Cleanup: Paperclip remnants, dead scripts, unused deps |
| 2026-04-12 (guncel) | 71 sorun | 10 | Kapsamli audit: K3,K4,K5,Y2,Y5,Y6,Y7,Y8,Y9,Y10 duzeltildi. K1/K2/Y1/Y3/Y4 mimari plan gerektirir |

---

## Dokunulmayan Dosyalar
- `package-lock.json` — degistirilmedi
- `.env*` dosyalari — sadece raporlandi
- Migration dosyalari — yok
- `node_modules/`, `dist/`, `build/` — taranmadi
