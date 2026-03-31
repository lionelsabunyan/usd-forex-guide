# GSC Model A Helper (Template + Reminder)

Bu helper, manuel GSC dogrulama adimlarini tek komutta standard ciktiya cevirir.
Urettigi cikti:

- `model-a-checklist.md`: Agent/operator tarafinda issue comment'e yapistirilacak checklist + kanit tablosu sablonu
- `model-a-reminders.json`: T+0 / T+24h / T+72h takip takvimi

## Ne Zaman Kullanilir

- GSC tarafinda manuel tiklama/adim gereken senaryolarda
- `Request Indexing` veya `Duzeltmeyi Dogrula` sonrasi takip plani lazimsa
- Kanitlari tek formatta toplamak istedigimizde

## Komut

```bash
cd /home/paperclip/usd-forex-guide
python3 scripts/gsc-model-a-helper.py \
  --issue BEG-39 \
  --url https://beginnerfxguide.com/ \
  --url https://beginnerfxguide.com/brokers \
  --url https://beginnerfxguide.com/learn
```

Alternatif olarak URL dosyasi kullan:

```bash
python3 scripts/gsc-model-a-helper.py --issue BEG-39 --url-file reports/target-urls.txt
```

## Cikti Konumu

Varsayilan klasor:

`reports/gsc-manual/<YYYY-MM-DD>/`

Dosyalar:

- `reports/gsc-manual/<YYYY-MM-DD>/model-a-checklist.md`
- `reports/gsc-manual/<YYYY-MM-DD>/model-a-reminders.json`

## Pratik Akis

1. Scripti calistir, checklist dosyasini ac.
2. GSC arayuzunde manuel adimlari uygula ve screenshot al.
3. Checklist icindeki URL tablolarini gercek sonuclarla doldur.
4. Comment snippet'i issue'ya yapistir.
5. `model-a-reminders.json` icindeki T+24h ve T+72h saatlerinde yeniden kontrol et.

## Opsiyonel Parametreler

- `--property-url`: varsayilan `GSC_SITE_URL` env degeridir
- `--start-at`: UTC anchor zamani (`2026-03-23T20:30:00Z` gibi)
- `--output-dir`: ozel cikti klasoru
