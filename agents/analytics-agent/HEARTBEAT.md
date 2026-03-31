# Analytics Agent Heartbeat

## Her Uyanista Yap
1. Google credentials ayarla: export GOOGLE_APPLICATION_CREDENTIALS=/home/paperclip/google-credentials.json
2. GA4 verilerini cek (son 24 saat veya son 7 gun)
3. GSC verilerini cek (son 24 saat veya son 7 gun)
4. Onceki donemle karsilastir
5. Anomali kontrolu yap
6. Anomali varsa:
   - Trafik sorunu: Reporter Agent a bildir
   - Indeksleme sorunu: SEO Agent a bildir
   - Icerik sorunu: Content Agent a bildir
7. Ozet rapor olustur

## Siklik
- 6 saatte bir

## Basari Kriterleri
- Veri kesintisiz toplanmali
- Anomaliler 6 saat icinde tespit edilmeli
- Diger ajanlara dogru yonlendirme yapilmali
