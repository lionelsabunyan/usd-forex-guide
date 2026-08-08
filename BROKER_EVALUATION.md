# Broker Değerlendirme — 2026-07-09

**Kapsam:** US kabul eden 5 offshore affiliate broker. **Ağırlık:** Affiliate ödeme güvenilirliği %50 · Bonus %30 · Müşteri hizmeti %20.
**Yöntem:** 5 Fable 5 araştırma ajanı (web) + 5 karşıt-doğrulama ajanı (sahte-yorum/scam kontrolü) + patronun birinci-el ödeme deneyimi.

## ⚠️ Ana bulgu (dürüst)

**Hiçbiri "iyi" veya "sorunsuz" değil.** Beşinin de belgelenmiş **kâr müsaderesi / büyük çekim engelleme** paterni var: küçük çekimler (özellikle kripto) ödeniyor, ama **kâr birikince ve büyük meblağ çekilmek istenince** geçmişe dönük "kural ihlali" bahaneleriyle el konuyor. Hepsi regülesiz = **sıfır yasal başvuru**. Puanlar 100 üzerinden 13-30 arası — yani "en iyi"yi değil, **"en az kötü"yü** seçiyoruz.

## 🏆 Leaderboard (ağırlıklı)

| # | Broker | Affiliate %50 | Bonus %30 | Müşteri %20 | **Ağırlıklı** | Güven | Kritik not |
|---|--------|---------------|-----------|-------------|---------------|-------|-----------|
| — | **LMFX** | 35* | 28 | 18 | **29.5** | düşük | 🚫 **US'ü BIRAKTI (Haz 2024)** — US hesaplarını zorla kapattı. /us'te kullanılamaz. $68K→$6.1K müsadere vakası. |
| 1 | **FXGlory** | 35* | 18 | 18 | **26.5** | orta | US-uygun en az kötü. *Sana ödedi (birinci-el). AMA web: bir IB'den ~**$600K** müsadere + kendi IB kuralı "komisyon iade edilebilir/dondurulabilir". |
| 2 | **Hankotrade** | 18 | 33 | 20 | **22.9** | düşük | 🚫 **CFTC RED listesinde (Tem 2022)** — US'e yasa dışı satış. Promote etmek yasal risk. Kâr silme vakaları. |
| 3 | **Coinexx** | 20 | 28 | 20 | **22.4** | düşük | $80,913 "swap" müsaderesi, "çekmek için para yatır" tehdidi, sahte Trustpilot. |
| 4 | **MidasFX** | 20 | 18 | 18 | **19.0** | düşük | Advance-fee paterni ("%10 vergi öde, BTC'ni bırakalım"), kopya scam domain (midasfxtrades.com). |

\* **Affiliate skoru birinci-el düzeltmeli:** FXGlory ve LMFX sana gerçekten ödedi → web-skorunu (FXGlory 8, LMFX 25) yukarı çektim. Ama bu **küçük ölçekte**; her ikisinin de dokümante paterni "küçük öde, büyüğe/kâra el koy". FXGlory'nin **kendi IB kuralları** komisyonun geri alınabilir olduğunu yazıyor ve ~$600K'lık bir IB müsaderesi belgeli → **ölçek büyüdükçe senin komisyonun da risk altında.**

## ✅ Öneri: #1 = FXGlory (US için) — ama "iyi" değil, "en az kötü"

Neden FXGlory:
- **Sana ödedi** (birinci-el kanıt) — diğer 3'ünde (MidasFX/Hankotrade/Coinexx) hiç deneyimin yok, web verisi de kötü.
- Müşteri funnel'ı için en iyi metrikler: $1 min, 1:3000, gerçek bonus, hızlı küçük kripto çekimi → referansların en azından hesap açıp yatırır (funnel dönüşümü).
- Yasal bayrağı yok (Hankotrade CFTC RED, LMFX US-exit gibi diskalifiye durumu yok).

**Ama şart:** kendi komisyon bakiyeni broker'da biriktirme — sık çek, düşük tut. $600K IB vakası senin başına da gelebilir. Ölçek büyürse çıkışa hazır ol.

## 🔴 Funnel için ACİL 2 düzeltme (kod)

Şu an `/us` LP'si ve `DEFAULT_ORDER` = **[fxglory, lmfx, coinexx]** ([USOffshore.tsx](src/pages/USOffshore.tsx)). İki sorun:

1. **LMFX'i US'ten kaldır.** LMFX 2024'te US'ü bıraktı — US trafiğine LMFX göstermek yanıltıcı ve **sıfır dönüşüm** (kullanıcı hesap açamaz). `/us/lmfx` varyantını ve DEFAULT_ORDER'dan `lmfx`'i çıkar.
2. **Hankotrade'i US'e öne çıkarma.** CFTC RED listesinde — US'e promote etmek doğrudan yasal risk.

**Önerilen yeni sıra:** `DEFAULT_ORDER = [fxglory, coinexx]` (istersen 3.'ye midasfx). LMFX çıkar, Hankotrade US'te kullanma.

## 🧭 Stratejik uyarı

Bu araştırma, ilk konuştuğumuz riski doğruladı: bu broker seti **müşteriyi de affiliate'i de dolandırma paterni** taşıyor. Kısa vadede FXGlory ile funnel'ı test edebilirsin, ama:
- Komisyonun ölçekte geri alınabilir (FXGlory $600K IB vakası + kendi kuralı).
- CFTC RED (Hankotrade) ve regülesiz-US-solicitation, US-odaklı affiliate siten için yasal/itibari risk.
- Uzun vadede daha güvenli monetizasyon (prop firm'ler / US-regüle programlar) hâlâ masada — bu offshore setine tam bağlanma.

---
### Kaynaklar (özet)
FXGlory: ForexPeaceArmy 2.0/5, WikiFX 2.35/10, fxglory.com/forex/ib (kendi IB kuralı), $600K IB vakası. · LMFX: FPA #83389 ($68K→$6.1K), forexforum US-exit teyidi, WikiFX 2.24/10. · Hankotrade: cftc.gov/node/241186 (RED list), WikiFX 1.57/10. · Coinexx: FPA #83274 ($80,913), Sitejabber 1.9/5, WikiFX 2.30/10. · MidasFX: WikiFX 2.08/10, advance-fee raporları, midasfxtrades.com kopya domain.
_(Tam kaynak listesi ve ajan çıktıları: workflow journal.)_

---

# Ek: Piyasa taraması — "beyond these" US-kabul offshore adaylar (2026-07-09)

28 aday bulundu, en iyi 14'ü Fable ajanlarıyla incelendi. **Ana bulgu: tek bir "temiz" broker yok** — 0 appears-ok, 9 scam-pattern, 4 mixed, 3 US'ü kendi şartlarında hariç tutuyor. Genişlemek "güvenli" bir broker bulmak değil, **komisyon riskini dağıtmak** demek.

## US-kullanılabilir adaylar (US kabul + affiliate programı var)

| Broker | İtibar | Affiliate programı | Fonlama | Kritik bayrak |
|--------|--------|--------------------|---------|---------------|
| **UnitedPips** | mixed | IB rebate ~$10/lot | **Kripto-only DEĞİL** (kart/PayPal/PM) | En ilginç ADD (US kart fonlama → düşük FTD sürtünmesi). Ama $103K çekim reddi vakası, kaldıraç 1:1000→1:100 kırpma. |
| **LHFX** (Longhorn/EagleFX) | mixed | $4-5/lot, günlük, $10 min | Kripto-only | Selefi **EagleFX CFTC RED listesinde**; FAQ "US yok" diyor ama pratikte alıyor (disclaimer-only). |
| **HeroFX** | mixed | $5/$3/$2 3-kademe, günlük | Ağırlıkla kripto + Apple Pay | Yanıltıcı "denetim" iması; yeni (2023 St. Lucia). |
| **DefcoFX** | mixed | ~$3/lot | Kripto-only | Spread manipülasyonu raporları; bonus margin-only. |
| PlexyTrade | 🔴 scam | $7/lot / 70% revshare | Kripto-only | **LQDFX yeniden markası** (CFTC RED soyağacı), kâr müsaderesi. Kaçın. |
| Hugo's Way | 🔴 scam | $2/lot 5-kademe | Kripto-merkez | WikiFX 1.4/10, ağır çekim reddi, 6.7M müsadere iddiası. Kaçın. |
| Fyntura | 🔴 scam | IB rebate | Kripto-only | Rus Merkez Bankası "yasa dışı faaliyet" listesi. Kaçın. |
| DuraMarkets | 🔴 scam | %20→50 revshare | Kripto-only | BrokersView "scam broker"; 2024 Comoros. Kaçın. |
| GatesFX | 🔴 scam | $8-20/lot | Kripto+kart | Sahte "regulated" iddia; $7K/$40K müsadere. Kaçın. |
| Xtream Markets | 🔴 scam | $7/lot + %60 revshare | Kart/wire/e-cüzdan | Kâr müsaderesi + FPA'da sahte-yorum manipülasyonu. Kaçın. |
| **N1CM** (zaten sende) | 🔴 scam | CPA + pip rebate | US/CA kripto-only | ⚠️ **FPA, N1CM'in Mart 2025'ten beri AFFILIATE komisyonlarını ödemediğini bildiriyor** — senin elinde N1CM linki var; bu hesap ödeme riski taşıyor. |

**US'ü kendi şartında hariç tutanlar (kullanılamaz):** TradeSmart, ZForex, Grand Capital (Seychelles FSA scam uyarısı).

## Öneri
- **Tek anlamlı ADD adayı: UnitedPips** — çünkü kripto-only değil (US kart/PayPal fonlama → FTD sürtünmesini düşürür), ve "scam-pattern" değil "mixed". Ama yine de $103K çekim reddi var → sadece riski dağıtmak için, cap-and-withdraw-fast disipliniyle ekle.
- **Elindeki N1CM'i gözden geçir:** FPA'ya göre affiliate ödemiyor — komisyonun risk altında.
- Diğer 9 scam-pattern adaydan uzak dur (özellikle PlexyTrade/Hugo's Way/GatesFX — CFTC RED soyağacı veya ağır müsadere).
- **Büyük resim:** Bu kategoride "temiz" yok. Diversifikasyon = tek broker'a bağlı kalmamak; güvenlik değil. Uzun vadede prop-firm / US-regüle monetizasyon hâlâ tek gerçek "güvenli" yol.
