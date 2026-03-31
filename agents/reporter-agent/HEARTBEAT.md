# Reporter Agent Heartbeat

## Her Uyanista Yap
1. Simdi saat kac kontrol et (UTC)
2. 06:00 UTC civarindaysa:
   a. Google credentials ayarla
   b. GA4 + GSC verilerini cek
   c. Onceki gunle karsilastir
   d. Rapor sablonunu doldur
   e. Telegram a gonder
3. Pazartesi ise haftalik rapor da hazirla
4. Analytics Agent dan anomali uyarisi geldiyse aninda Telegram a bildir

## Telegram Gonderimi
python3 scripts/telegram_report.py calistir
veya dogrudan Telegram Bot API kullan:
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=$TELEGRAM_CHAT_ID&text=RAPOR&parse_mode=Markdown"

## Siklik
- Gunluk 06:00 UTC
- Haftalik Pazartesi 06:00 UTC
- Anomali aninda

## Basari Kriterleri
- Rapor her gun gonderilmeli
- Veriler dogru olmali (onceki gunle tutarli)
- Anomaliler 30 dakika icinde bildirilmeli
