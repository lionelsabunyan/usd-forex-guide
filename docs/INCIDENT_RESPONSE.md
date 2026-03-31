# Incident Response Procedure — beginnerfxguide.com

## Alert System

- **Monitor**: `scripts/uptime_monitor.py` (cron, her 5 dk)
- **Kanal**: Telegram (`TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`)
- **Kontroller**: HTTP status, response time (>5s), SSL expiry (<14 gün)
- **Alert kuralı**: 2 ardışık başarısız kontrol sonrası alert (flapping koruması)

## 30 Dakika Müdahale Prosedürü

### 0-5 dk: Triage

1. Telegram alertini gör
2. Siteyi tarayıcıdan kontrol et: `https://beginnerfxguide.com/`
3. Cloudflare Status kontrol: `https://www.cloudflarestatus.com/`
4. Sorunun kapsamını belirle (ana site / TR subdomain / her ikisi)

### 5-15 dk: Teşhis

| Belirti | Olası Sebep | Kontrol |
|---------|-------------|---------|
| 522/524 timeout | CF Pages origin down | CF Dashboard → Pages → Deployments |
| 5xx hatası | Build hatası / bozuk deploy | Son deployment loglarını kontrol et |
| SSL hatası | Sertifika süresi dolmuş | CF Dashboard → SSL/TLS |
| Yavaş response | CDN cache miss / büyük bundle | CF Analytics → Performance |
| DNS hatası | DNS propagation / ayar hatası | `dig beginnerfxguide.com` |

### 15-25 dk: Müdahale

**CF Pages deploy sorunu:**
```bash
# Son çalışan build'e rollback
wrangler pages deployment list --project-name=beginnerfxguide
wrangler pages deployment rollback --project-name=beginnerfxguide --deployment-id=<WORKING_ID>
```

**Yeni deploy gerekiyorsa:**
```bash
cd /home/paperclip/usd-forex-guide
rm -rf node_modules/.vite && fnm exec --using=22 npx vite build
fnm exec --using=22 node scripts/generate-static-pages.cjs
fnm exec --using=22 node scripts/fix-tr-title.cjs
fnm exec --using=22 node scripts/fix-spa-fallback.cjs
wrangler pages deploy dist/ --project-name=beginnerfxguide --branch=main --commit-dirty=true
```

**SSL sorunu:**
- CF Dashboard → SSL/TLS → Edge Certificates
- "Advanced Certificate Manager" ile yeni sertifika oluştur
- CF Universal SSL otomatik yenileme kontrolü

**DNS sorunu:**
- CF Dashboard → DNS
- A/CNAME kayıtlarını kontrol et
- Proxy (turuncu bulut) aktif mi kontrol et

### 25-30 dk: Doğrulama & Bildirim

1. Siteyi tarayıcıdan test et (incognito)
2. `python3 scripts/uptime_monitor.py test` ile monitor'ün çalıştığını doğrula
3. Recovery alertinin geldiğini kontrol et
4. Telegram'dan kısa incident özeti paylaş

## Escalation

- 30 dk içinde çözülemezse → Cloudflare Support ticket aç
- Tekrarlayan sorunlar → `INCIDENT_LOG.md` dosyasına kaydet
- SSL sertifikası 7 günden az kaldıysa → acil yenileme

## Monitoring Detayları

| Parametre | Değer |
|-----------|-------|
| Kontrol sıklığı | 5 dakika |
| Kontrol edilen URL'ler | `https://beginnerfxguide.com/`, `https://tr.beginnerfxguide.com/` |
| Response time eşiği | 5 saniye |
| SSL uyarı eşiği | 14 gün |
| Alert tetikleme | 2 ardışık hata |
| State dosyası | `/tmp/uptime_monitor_state.json` |

## Model A: GSC Manuel Doğrulama Runbook'u

Bu akış, indeksleme veya snippet görünürlüğü şüphesinde Search Console tarafında manuel teyit için kullanılır.

### Ön Koşullar

- Search Console'da `https://beginnerfxguide.com/` property erişimi (Owner/Full).
- Doğrulanacak URL listesi (en az 1 adet kanonik URL).
- Ekran görüntülerinin saklanacağı klasör: `reports/gsc-manual/<YYYY-MM-DD>/`.

### Adım Listesi (Manuel GSC)

1. GSC'de ilgili property'yi aç: `https://search.google.com/search-console`.
2. Sol menüden `URL Inspection` aracına gir.
3. Her hedef URL için:
   - URL'yi yapıştır ve "Enter" ile sorgula.
   - "Live Test" çalıştır.
   - Sonuç "URL is available to Google" değilse engel nedenini not al.
   - Gerekliyse `Request Indexing` tetikle.
4. `Pages` (Indexing) raporunda URL'nin durumunu kontrol et:
   - "Indexed" veya "Crawled - currently not indexed" durumunu kaydet.
5. `Performance` raporunda ilgili sayfanın son 7 gün tıklama/gösterim trendini kontrol et (varsa düşüşü not et).
6. Tüm çıktıları kanıt şablonuna işle ve issue comment olarak paylaş.

### Screenshot Kanıt Formatı

Dosya adlandırma standardı:

`reports/gsc-manual/<YYYY-MM-DD>/<slug>-<step>-<UTC-HHMM>.png`

Örnek:

`reports/gsc-manual/2026-03-23/us-forex-regulations-url-inspection-2015.png`

Comment içinde kullanılacak kanıt şablonu:

| Alan | Değer |
|------|-------|
| Check zamanı (UTC) | `2026-03-23T20:15:00Z` |
| URL | `https://beginnerfxguide.com/...` |
| URL Inspection sonucu | `Indexed` / `Not indexed` |
| Live Test sonucu | `Available` / `Blocked` + neden |
| Request Indexing | `Yes/No` |
| Pages raporu durumu | `Indexed`, `Discovered`, `Crawled - currently not indexed` |
| Performance notu (7g) | `Clicks X, Impressions Y, trend +/-` |
| Screenshot'lar | Dosya yolları listesi |
| Sonraki kontrol zamanı | `+24s` veya `+72s` |

### Done Kriterleri

- Tüm hedef URL'ler için URL Inspection + Live Test sonucu kaydedildi.
- En az aşağıdaki ekran görüntüleri issue comment'te linklendi:
  - URL Inspection sonuç ekranı
  - Live Test sonuç ekranı
  - Pages raporu durumu
  - Performance görünümü (varsa veri)
- `Request Indexing` kararı her URL için açıkça belirtildi.
- Tek bir issue comment içinde özet + kanıt tablosu + sonraki kontrol zamanı paylaşıldı.
