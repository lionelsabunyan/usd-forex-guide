# Reporter Agent Araclari

## Mevcut Script
python3 scripts/telegram_report.py
Gerekli env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GOOGLE_CREDENTIALS, GA4_PROPERTY_ID, GSC_SITE_URL

## Telegram Bot API
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d "chat_id=$TELEGRAM_CHAT_ID" \
  -d "text=Mesaj icerigi" \
  -d "parse_mode=Markdown"

## Google API
export GOOGLE_APPLICATION_CREDENTIALS=/home/paperclip/google-credentials.json

## Gerekli Python Paketleri
pip install google-auth google-auth-httplib2 google-api-python-client google-analytics-data requests
