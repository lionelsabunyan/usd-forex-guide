# Bing Dönüşüm Sayım Audit'i — 2026-08-07

## Özet

Bing "eksik saymıyor" — **Bing ile Telegram farklı şeyleri sayıyor.** Üç ayrı sebep üst üste binmiş
durumda, ve bunlardan biri ötekilerden çok daha pahalı.

| Kaynak | 28 Tem – 7 Ağu arası | Ne sayıyor |
|---|---|---|
| Bing reklam tıklaması | 192 | Reklama tıklayan kişi |
| Supabase `affiliate_clicks` (msclkid'li) | 29 satır / **20 tekil kişi** | Broker linkine çıkan kişi |
| Telegram bildirimi | 29 | Her buton basışı (tekrarlar dahil) |
| Bing "Conversions" sütunu | 23 | UET'in yakalayabildiği + hedef kurulumuna göre |
| **Gerçek** (UnitedPips IB paneli) | **7 kayıt / 3 verification / 1 FTD** | Para |

30 günlük harcama: **2.555** (hesap para birimi). Bing bu paranın karşılığında 23 "dönüşüm"
gördü. Gerçekte 1 tane para yatıran müşteri var. Bing'in optimize ettiği sayı ile paranın
geldiği sayı arasında ~23× fark var.

---

## 🔴 Kritik 1 — Bing paranın olduğu olayı hiç görmüyor

Bing'in gördüğü tek dönüşüm "affiliate linkine tıklandı" ([tracking.ts:149-173](src/lib/tracking.ts#L149-L173)).
Para ise şu zincirin sonunda: **çıkış tıklaması → kayıt → verification → FTD**. Bu zincirin
tıklamadan sonraki üç adımı offshore IB panelinde yaşıyor ve o panel bize postback göndermiyor.

Sonuç: akıllı teklif verme (bidding) "kim linke tıklar" sorusunu optimize ediyor, "kim para
yatırır" sorusunu değil. CPC'nin 36-56'ya çıkmasının sebebi bu — algoritma çıkış tıklaması
üreten pahalı kişilere doğru koşuyor, çünkü ona öğrettiğimiz hedef bu.

Bu, sayım hatası değil **ölçüm hedefi hatası** ve listedeki en pahalı madde.

## 🔴 Kritik 2 — UET tarayıcıda, Supabase sunucuda

`bat.bing.com` her adblock listesinde var; Edge tracking prevention, Brave ve Safari ITP de
kesiyor. Supabase insert'i ise kesilmiyor. Yani **aynı tıklama Telegram'a düşüp Bing'e
düşmeyebilir** — mekanizma tam olarak patronun gördüğü şey.

Kod tarafında engelleyici bir hata yok, kontrol ettim:
- CSP `bat.bing.com`'a `script-src`, `img-src` ve `connect-src` izni veriyor ([public/_headers:7](public/_headers#L7)) ✅
- UET tag'i `index.html` head'inde, `generate-static-pages.cjs` sadece meta tag'leri değiştiriyor, script'lere dokunmuyor ✅
- CTA'lar `target="_blank"` — sayfa kapanmadığı için beacon kaybı yok ✅
- `enableAutoSpaTracking: true` ve `uetq` array olarak önceden tanımlı, event kuyruğu doğru ✅

Yani tag doğru kurulmuş; kayıp **ortamsal**, kodla kapatılamaz. Kapatmanın tek yolu sunucudan
göndermek (aşağıdaki çözüm).

Somut kanıt: 28-29 Temmuz'da Supabase 4 tane msclkid'li çıkış tıklaması kaydetti, Bing o günlere
0 dönüşüm yazdı. *(Bunun adblock mı yoksa hedefin o tarihte henüz farklı yapılandırılmış olması mı
olduğunu Bing UI'da hedefin oluşturulma tarihine bakarak doğrula.)*

## 🟠 Yüksek 3 — Telegram bildirimi tekrarları da sayıyor

`trg_notify_telegram_affiliate_click` trigger'ı **her INSERT'te** ateşleniyor, dedup yok.
Tek bir ziyaretçi 4 broker kartına basarsa patron 4 bildirim alıyor.

| Gün | Telegram bildirimi | Gerçek kişi (tekil msclkid) |
|---|---|---|
| 08-01 | 5 | 3 |
| 08-02 | 3 | **1** |
| 08-04 | 4 | **1** |
| 08-05 | 4 | 2 |

29 bildirim = 20 kişi. **Telegram'ın "fazla" görünmesinin ~%31'i sadece bu.**

## 🟠 Yüksek 4 — Gün hizası tutmuyor (matematiksel olarak tutamaz)

Bing dönüşümü **reklam tıklamasının olduğu güne** yazar, dönüşümün olduğu güne değil.
Telegram ise dönüşüm anında düşer. Örnek: msclkid `45522eab` 2 Ağustos'ta siteden çıktı ama
reklam tıklaması 1 Ağustos'sa, Bing onu 1 Ağustos satırına yazar.

Bu yüzden 1 Ağustos'ta Bing 7 gösterirken Supabase 5, 6 Ağustos'ta Bing 2 gösterirken
Supabase 5 gösteriyor. **Gün gün karşılaştırma yapma** — 7-14 günlük toplamlara bak.
Ayrıca Bing dönüşüm raporlaması 24-48 saat gecikir; son 2 günün rakamı hiçbir zaman kesin değil.

## 🟡 Orta 5 — Tıklama başına 3 ayrı UET event push ediliyor

[tracking.ts:151-172](src/lib/tracking.ts#L151-L172) tek bir tıklamada üç event gönderiyor:
`affiliate_click`, `click_<broker>`, `ib_click`. Bing'de bunlardan **birden fazlası** dönüşüm
hedefi olarak tanımlıysa aynı tıklama 2-3 kez sayılır — bu sefer ters yönde hata.

08-04'te 4 tıklama vardı, Bing 5 dönüşüm gösterdi. Bu, ikinci bir hedefin de saydığına işaret
ediyor. Bing UI ▸ Dönüşüm hedefleri listesinde kaç aktif hedef olduğunu kontrol et; sadece
`affiliate_click` sayılmalı, diğer ikisi hedef olmamalı.

---

## ✅ Çözüm — Offline Conversion Import

Tek bir değişiklik yukarıdaki 1, 2 ve 3'ü birden kapatıyor: **Bing'i tarayıcı yerine
Postgres'ten besle.** msclkid'i zaten her çıkış tıklamasında sunucu tarafında saklıyoruz
([attribution.ts:108](src/lib/attribution.ts#L108)) — adblock buna dokunamıyor.

### Uygulandı (Supabase)

`supabase/migrations/20260807_bing_offline_conversions.sql` — canlıya alındı ve doğrulandı:

- **`broker_conversions` tablosu** — IB panelindeki gerçeğin yazıldığı yer.
  `stage` = `signup` / `verified` / `ftd`, artı `payout_usd` (Bing'in teklif vereceği değer).
  `msclkid` nullable, çünkü panel subid'i geri vermiyorsa {broker, tarih} ile elle eşleştireceğiz.
- **`bing_offline_conversions(from_ts, to_ts)` fonksiyonu** — Bing'in beklediği CSV kolonlarını
  birebir üretiyor. Çıkış tıklamalarını **msclkid başına tekilleştiriyor** (buton basışı başına
  değil), yani Madde 3'teki şişme burada otomatik düzeliyor.

Test edildi: son 30 gün → 20 satır (29 değil). Doğru.

```sql
select * from bing_offline_conversions(now() - interval '7 days');
```

### Yapılması gereken (Bing UI — kod değil, 10 dakika)

1. **Tools ▸ Conversion goals ▸ Create** — tür: *Offline conversion*
   - `offline_affiliate_click` — Count: **Unique**, Value: yok, **Include in "Conversions": ✅**
   - `offline_signup` — Count: Unique, **Include in "Conversions": ❌** (gözlem)
   - `offline_ftd` — Count: Unique, Value: **conversion-specific**, **Include in "Conversions": ❌** (şimdilik)

   > Hedefler tıklamadan *önce* var olmalı — bugün oluşturursan bugünden sonraki tıklamalar
   > yüklenebilir. Geriye dönük 90 güne kadar yükleme yapılabilir ama hedef önce var olmalı.

2. **Mevcut UET `affiliate_click` hedefini "Include in Conversions" listesinden çıkar.**
   Yoksa aynı tıklama hem UET'ten hem offline'dan gelir → çift sayım. Silme, sadece ikincil yap
   (adblock kaybının zaman içindeki oranını görmek için faydalı bir kontrol grubu olur).

3. **Haftalık rutin:** `bing_offline_conversions(now() - interval '8 days')` → CSV indir →
   Bing Ads ▸ Tools ▸ Import ▸ Offline conversions → zaman dilimi **UTC** seç.
   (8 gün, 7 değil — Bing'in raporlama gecikmesine karşı bir gün örtüşme payı.)

4. **FTD kaydı:** UnitedPips panelinde her kayıt/verification/deposit için bir satır:
   ```sql
   insert into broker_conversions (broker_id, stage, msclkid, occurred_at, deposit_usd, payout_usd, broker_account_ref)
   values ('unitedpips', 'ftd', '<msclkid>', '2026-08-06 14:00+00', 100, 250, '<panel_account_id>');
   ```
   msclkid'i panel `subid` alanında gösteriyorsa doğrudan kopyala — `getAffiliateUrl` zaten
   `subid=msclkid` gönderiyor ([tracking.ts:70](src/lib/tracking.ts#L70)). Göstermiyorsa
   `affiliate_clicks` içinden {broker, tarih} ile eşleştir.

5. **Hacim geldiğinde** (aylık 15+ FTD): bidding hedefini `offline_ftd`'ye çevir, strateji
   *Maximize conversion value* / Target ROAS. O noktaya kadar `offline_affiliate_click` sinyal
   olarak yeterli — 20/ay ile Bing'in öğrenmesi zaten sınırda.

### Bu turda yapılmayanlar

- **SOAP otomasyonu** (`ApplyOfflineConversions`) — ayda 20-30 satır için CSV upload yeterli.
  Haftalık manuel yükleme sıkıcı gelmeye başladığında yaz; auth pattern hazır
  (`Skill/.claude/skills/bing-ads/mcp-server/bing_ads_mcp.py`).
- **Telegram dedup** — trigger'a msclkid bazlı bir "ilk tıklama" filtresi eklenebilir, ama
  patronun her tıklamayı görmek isteyip istemediği belli değil. İstersen 3 satırlık değişiklik.
- **UET 3-event temizliği** — Bing'de kaç hedefin aktif olduğunu doğruladıktan sonra;
  gereksiz olanlar hedef değilse kodda dokunmaya değmez.

### Doğrulanamayan

Bing'deki dönüşüm hedeflerinin listesini API'den çekmeye çalıştım (`GetConversionGoalsByTagIds`),
ama credential dosyasını okuyan script bu oturumda izin katmanı tarafından bloklandı. Madde 5'teki
"kaç hedef aktif" sorusunu Bing UI'dan sen doğrula — ya da bir sonraki oturumda `Bash(python3:*)`
iznini açarsan çekerim.
