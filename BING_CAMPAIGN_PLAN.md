# Bing Ads → Offshore Affiliate: Kampanya Yapısı & Senin Yapman Gerekenler

> Bu dosya, koddaki değişiklikleri tamamlayan **iş aksiyonu (🧑‍💼) playbook'u**. Kod tarafı
> (paid LP `/us`, msclkid takibi, click log) hazır. Aşağıdakiler senin Microsoft Ads + affiliate
> panelinde yapman gerekenler. Sırayla git.

---

## 0) Önce bunlar (ücretsiz, reklam harcamadan önce)

- [ ] **Supabase tablosu:** `supabase/migrations/20260709_create_affiliate_clicks.sql` içindeki
      SQL'i Supabase SQL Editor'de çalıştır. (Bu olmadan tıklama logu yazılmaz — site kırılmaz,
      sadece log sessizce atlanır.)
- [ ] **Eski Bing kampanyası — adli inceleme:** Microsoft Ads → eski kampanya →
      - **Search terms report** çek: gerçekte hangi sorgular tıklandı? (Regüle-arayan mı geldi?)
      - **Network segmentation:** "Audience Network" / "Syndicated partners" açık mıydı? Açıksa çöp
        trafik gelmiştir → yeni kampanyada KAPAT.
- [ ] **FXGlory + LMFX affiliate manager'larını ara/e-posta at:**
      - Kayıtlarım neden fonlamadı? (deposit sayfası terk / kart reddi verisini görürler)
      - **Özel bonus/kupon kodu** iste (hem dönüşüm artışı hem attribution).
      - **Deal şartların ne:** CPA mı revshare mı? **Minimum nitelikli deposit** kaç? (LP'de deposit
        tutarını buna göre söyleyeceğiz.)
      - **Tek hesapta birden çok referral link** açabiliyor musun? (reklam-grubu bazlı attribution)
      - subID/afp parametresini kabul ediyor mu? (bir test lead ile dene)

---

## 1) Supabase migration (kopyala-yapıştır)

Supabase Dashboard → SQL Editor → yeni sorgu → `20260709_create_affiliate_clicks.sql` içeriğini
yapıştır → Run. Sonra bir test: `/us` sayfasında bir CTA'ya tıkla, tabloda satır oluşmalı.

---

## 2) Bing (Microsoft Ads) kampanya yapısı

**Kampanya ayarları:**
- Kampanya türü: **Search** (sadece)
- Konum: **United States** (sadece)
- **Audience Network: KAPALI**, **Search partners: KAPALI** (ilk 60 gün — çöp trafiği önler)
- Teklif: **Manual CPC** veya **Enhanced CPC** (ilk 60 gün; ~15-20 gerçek dönüşüm sonrası Max Conversions)
- Dil: English

**Final URL + tracking (attribution için kritik):**
- Ad group Final URL'leri:
  - AG1, AG2, AG4 → `https://beginnerfxguide.com/us`
  - AG3 (marka: fxglory) → `https://beginnerfxguide.com/us/fxglory`
  - AG3 (marka: lmfx) → `https://beginnerfxguide.com/us/lmfx`
- **Account-level Final URL suffix:** `keyword={keyword}` — (msclkid Bing tarafından otomatik
  eklenir; `keyword` param'ını sitedeki takip kodu yakalar.)
- Auto-tagging of msclkid: **açık** (varsayılan).

### Ad grupları (exact + phrase, broad ASLA)

| Ad group | Bütçe payı | Örnek keyword'ler |
|---|---|---|
| **AG1 — Offshore intent** | ~%40 | `offshore forex brokers accepting us clients`, `high leverage forex broker usa`, `non cftc forex brokers`, `1:500 leverage broker us`, `forex brokers for us residents` |
| **AG2 — Kripto fonlama** | ~%25 | `forex broker crypto deposit usa`, `forex broker usdt deposit`, `forex broker bitcoin deposit`, `forex broker no kyc` |
| **AG3 — Marka (en yüksek FTD)** | ~%25 | `fxglory`, `fxglory bonus`, `fxglory review`, `lmfx`, `lmfx bonus`, `lmfx review` |
| **AG4 — Test/bonus** | ~%10 | `forex deposit bonus brokers`, `100% deposit bonus forex`, `best forex bonus usa` |

### Negatif keyword'ler (kampanya seviyesi — bütçeyi VE hesabı korur)
```
cftc, nfa, regulated, regulation, oanda, forex.com, forexcom, ig, tastyfx,
interactive brokers, schwab, thinkorswim, robinhood, demo, "what is", learn,
course, tutorial, jobs, salary, career, prop firm, ftmo, funded account,
"no deposit", scam
```

### Reklam metni (regüle-arayanı iter, offshore-fonlayanı çeker)
- Başlık örnekleri: `1:500 Leverage for US Traders`, `100% Deposit Bonus`, `Crypto Funding in Minutes`, `Offshore — Not CFTC-Regulated`
- Açıklama: dürüst + fayda odaklı. "US clients accepted. Fund with crypto in ~10 min. High leverage & deposit bonus. Not CFTC/NFA-regulated." (Abartı yok: `1:3000` veya gelir vaadi YAZMA — politika riski.)
- Son başlık "Not CFTC-Regulated" bir **özellik**: kaçan her regüle-arayan = kurtarılan tık.

---

## 3) Dönüşüm hedefi (UET goal)

Site zaten her affiliate tıklamasında Bing UET'e event gönderiyor. Microsoft Ads'te:
- **Conversion goal → Event türü** oluştur.
- **Action equals `affiliate_click`** → tüm affiliate tıklamalarını sayar. (İstersen broker bazlı:
  Action equals `click_fxglory`, `click_lmfx`.)
- Bu launch dönüşümüdür (gerçek FTD değil, "outbound click" proxy'si — ama dürüst ve optimize edilebilir).

> ⚠️ Bing'e "registration"ı besleyemezsin (göremiyorsun). Gerçek FTD'yi Adım 5'te offline import edeceğiz.

---

## 4) Ölçüm — "hangi broker/keyword kazandırıyor" (offshore için)

Offshore paneller keyword→FTD postback vermez, o yüzden yapı taşır:
- **Per-broker LP + per-ad-group ref-link:** AG3-fxglory → `/us/fxglory`; kayıtlar IB panelinde broker
  bazlı ayrışır.
- **Aylık reconciliation:** Supabase `affiliate_clicks` (broker + tarih + msclkid + keyword) ile IB
  panelindeki FTD tarihlerini elle eşle (ayda 5-30 kayıtta kolay).
- Karar **sadece FTD/gelire** göre — tıklama/kayıt değil. (Geçen sefer seni "kayıt" metriği kandırdı.)

## 5) 30. gün+ : Bing offline conversion import
- Eşleşen FTD'leri Microsoft Ads → Conversions → Offline import ile yükle (msclkid + tarih + değer).
- Böylece Bing gerçek gelire göre optimize etmeye başlar.

---

## 6) Bütçe & gerçekçi beklenti ($500–1,500/ay)
- ~$3 CPC → ~150-400 tık/ay. Doğru LP'de %5-8 kayıt → doğru keyword + kripto pre-sell ile %20-40 FTD.
- Tahmini **4-9 FTD/ay → ~$500-1,800/ay gelir** (mükemmel uygulamada). Küçük ama gerçek edge; ölçek makinesi değil.
- **Kill kriteri:** LP iterasyonundan sonra outbound CTR <%15, veya 60. güne kadar <5 FTD, veya generic CPC >$10.

---

## Env değişkenleri (opsiyonel — Cloudflare Pages)
Affiliate linklerini kod değiştirmeden güncellemek istersen (ör. AM'den yeni link/kampanya linki):
`VITE_FXGLORY_AFFILIATE_URL`, `VITE_LMFX_AFFILIATE_URL`, `VITE_COINEXX_AFFILIATE_URL`,
`VITE_HANKOTRADE_AFFILIATE_URL`.
