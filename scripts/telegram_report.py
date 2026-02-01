#!/usr/bin/env python3
"""
Telegram Trafik Raporu - GitHub Actions için
Günlük ve haftalık raporları Telegram'a gönderir
"""

import os
import json
import requests
from datetime import datetime, timedelta

# Environment variables (GitHub Secrets'tan gelir)
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
GOOGLE_CREDENTIALS = os.getenv("GOOGLE_CREDENTIALS")  # JSON string
GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "properties/519441201")
GSC_SITE_URL = os.getenv("GSC_SITE_URL", "https://beginnerfxguide.com/")


def setup_google_credentials():
    """Google credentials'ı geçici dosyaya yaz"""
    if GOOGLE_CREDENTIALS:
        creds_path = "/tmp/google-credentials.json"
        with open(creds_path, "w") as f:
            f.write(GOOGLE_CREDENTIALS)
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_path
        return creds_path
    return None


def send_telegram(message: str) -> bool:
    """Telegram'a mesaj gönder"""
    try:
        response = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "Markdown"
            }
        )
        result = response.json()
        if not result.get("ok"):
            print(f"Telegram error: {result}")
        return result.get("ok", False)
    except Exception as e:
        print(f"Telegram exception: {e}")
        return False


def get_ga4_data(days: int = 7) -> dict:
    """Google Analytics 4 verilerini çek"""
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        credentials = service_account.Credentials.from_service_account_file(
            os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/tmp/google-credentials.json"),
            scopes=['https://www.googleapis.com/auth/analytics.readonly']
        )
        service = build('analyticsdata', 'v1beta', credentials=credentials)

        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)

        response = service.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                'dateRanges': [{
                    'startDate': start_date.strftime('%Y-%m-%d'),
                    'endDate': end_date.strftime('%Y-%m-%d')
                }],
                'metrics': [
                    {'name': 'sessions'},
                    {'name': 'totalUsers'},
                    {'name': 'screenPageViews'},
                    {'name': 'bounceRate'},
                    {'name': 'averageSessionDuration'}
                ],
                'dimensions': []
            }
        ).execute()

        rows = response.get('rows', [])
        if rows:
            values = rows[0].get('metricValues', [])
            return {
                'sessions': int(values[0].get('value', 0)) if len(values) > 0 else 0,
                'users': int(values[1].get('value', 0)) if len(values) > 1 else 0,
                'pageviews': int(values[2].get('value', 0)) if len(values) > 2 else 0,
                'bounce_rate': round(float(values[3].get('value', 0)) * 100, 1) if len(values) > 3 else 0,
                'avg_session': round(float(values[4].get('value', 0)), 1) if len(values) > 4 else 0
            }
    except Exception as e:
        print(f"GA4 error: {e}")
    return {}


def get_gsc_data(days: int = 7) -> dict:
    """Google Search Console verilerini çek"""
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        credentials = service_account.Credentials.from_service_account_file(
            os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/tmp/google-credentials.json"),
            scopes=['https://www.googleapis.com/auth/webmasters.readonly']
        )
        service = build('searchconsole', 'v1', credentials=credentials)

        end_date = datetime.now() - timedelta(days=3)  # GSC 3 gün gecikme
        start_date = end_date - timedelta(days=days)

        response = service.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                'startDate': start_date.strftime('%Y-%m-%d'),
                'endDate': end_date.strftime('%Y-%m-%d'),
                'dimensions': [],
                'rowLimit': 1
            }
        ).execute()

        rows = response.get('rows', [])
        if rows:
            row = rows[0]
            return {
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1)
            }
    except Exception as e:
        print(f"GSC error: {e}")
    return {}


def get_top_keywords(limit: int = 5) -> list:
    """En iyi keyword'leri çek"""
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        credentials = service_account.Credentials.from_service_account_file(
            os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/tmp/google-credentials.json"),
            scopes=['https://www.googleapis.com/auth/webmasters.readonly']
        )
        service = build('searchconsole', 'v1', credentials=credentials)

        end_date = datetime.now() - timedelta(days=3)
        start_date = end_date - timedelta(days=28)

        response = service.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                'startDate': start_date.strftime('%Y-%m-%d'),
                'endDate': end_date.strftime('%Y-%m-%d'),
                'dimensions': ['query'],
                'rowLimit': limit
            }
        ).execute()

        keywords = []
        for row in response.get('rows', []):
            keywords.append({
                'keyword': row['keys'][0],
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'position': round(row.get('position', 0), 1)
            })
        return keywords
    except Exception as e:
        print(f"Keywords error: {e}")
    return []


def daily_report():
    """Günlük rapor gönder"""
    setup_google_credentials()

    ga_data = get_ga4_data(days=1)
    gsc_data = get_gsc_data(days=1)

    bugun = datetime.now().strftime('%d.%m.%Y')
    gun_map = {0: "Pazartesi", 1: "Salı", 2: "Çarşamba", 3: "Perşembe", 4: "Cuma", 5: "Cumartesi", 6: "Pazar"}
    gun = gun_map.get(datetime.now().weekday(), "")

    message = f"""🌅 *Günaydın Sedo!*
📅 {bugun} {gun}

*Dünün Özeti:*

📈 *Analytics:*
• Oturum: {ga_data.get('sessions', 'N/A')}
• Kullanıcı: {ga_data.get('users', 'N/A')}
• Sayfa Görüntüleme: {ga_data.get('pageviews', 'N/A')}

🔍 *Search Console:*
• Gösterim: {gsc_data.get('impressions', 'N/A')}
• Tıklama: {gsc_data.get('clicks', 'N/A')}

_beginnerfxguide.com_"""

    return send_telegram(message)


def weekly_report():
    """Haftalık rapor gönder"""
    setup_google_credentials()

    ga_data = get_ga4_data(days=7)
    gsc_data = get_gsc_data(days=7)
    keywords = get_top_keywords(limit=5)

    bugun = datetime.now().strftime('%d.%m.%Y')

    message = f"""📊 *Haftalık Performans Raporu*
📅 {bugun}

═══════════════════════════════

*📈 Google Analytics (7 gün):*
• Oturum: {ga_data.get('sessions', 'N/A')}
• Kullanıcı: {ga_data.get('users', 'N/A')}
• Sayfa Görüntüleme: {ga_data.get('pageviews', 'N/A')}
• Bounce Rate: %{ga_data.get('bounce_rate', 'N/A')}
• Ort. Oturum: {ga_data.get('avg_session', 'N/A')}s

*🔍 Search Console (7 gün):*
• Gösterim: {gsc_data.get('impressions', 'N/A')}
• Tıklama: {gsc_data.get('clicks', 'N/A')}
• CTR: %{gsc_data.get('ctr', 'N/A')}
• Ort. Pozisyon: {gsc_data.get('position', 'N/A')}

"""

    if keywords:
        message += "*🎯 Top 5 Keyword:*\n"
        for i, kw in enumerate(keywords, 1):
            message += f"{i}. {kw['keyword'][:25]} (P:{kw['position']})\n"

    message += """
═══════════════════════════════
_beginnerfxguide.com_"""

    return send_telegram(message)


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Kullanım: python telegram_report.py [daily|weekly]")
        sys.exit(1)

    report_type = sys.argv[1]

    if report_type == "daily":
        success = daily_report()
    elif report_type == "weekly":
        success = weekly_report()
    else:
        print(f"Bilinmeyen rapor tipi: {report_type}")
        sys.exit(1)

    sys.exit(0 if success else 1)
