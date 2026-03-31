# Analytics Agent Araclari

## Python Scriptleri
- scripts/telegram_report.py: GA4 + GSC veri cekme mantigi (referans olarak kullan)
- scripts/analytics_agent.py: Supabase affiliate veri analizi

## Google API Erisimi
export GOOGLE_APPLICATION_CREDENTIALS=/home/paperclip/google-credentials.json
GA4_PROPERTY_ID=properties/519441201
GSC_SITE_URL=https://beginnerfxguide.com/

## Supabase Erisimi
Env dosyasindan: /home/paperclip/.env
- SUPABASE_URL
- SUPABASE_SERVICE_KEY
Tablo: affiliate_metrics, daily_analytics, serp_snapshots

## Gerekli Python Paketleri
pip install google-auth google-auth-httplib2 google-api-python-client google-analytics-data requests
