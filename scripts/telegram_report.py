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


def _pct(current, previous):
    """Yuzde degisim + emoji."""
    if not previous:
        return "N/A", ""
    change = ((current - previous) / previous) * 100
    if change > 0:
        return f"+{change:.1f}%", "📈"
    elif change < 0:
        return f"{change:.1f}%", "📉"
    return "0%", "➡️"


def get_top_pages_ga4(days=1, limit=5):
    """GA4 top sayfalar."""
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
                'dateRanges': [{'startDate': start_date.strftime('%Y-%m-%d'), 'endDate': end_date.strftime('%Y-%m-%d')}],
                'dimensions': [{'name': 'pagePath'}],
                'metrics': [{'name': 'screenPageViews'}],
                'orderBys': [{'metric': {'metricName': 'screenPageViews'}, 'desc': True}],
                'limit': limit,
            },
        ).execute()
        return [(r['dimensionValues'][0]['value'], int(r['metricValues'][0]['value'])) for r in response.get('rows', [])]
    except Exception as e:
        print(f"GA4 top pages error: {e}")
    return []


def daily_report():
    """Gunluk rapor — onceki gune gore karsilastirmali."""
    setup_google_credentials()

    ga_today = get_ga4_data(days=1)
    ga_prev = get_ga4_data(days=2)  # onceki 2 gun toplam — fark ile onceki gun
    gsc_today = get_gsc_data(days=1)
    gsc_prev = get_gsc_data(days=2)
    top_keywords = get_top_keywords(limit=5)
    top_pages = get_top_pages_ga4(days=1, limit=5)

    bugun = datetime.now().strftime('%d.%m.%Y')
    gun_map = {0: "Pazartesi", 1: "Sali", 2: "Carsamba", 3: "Persembe", 4: "Cuma", 5: "Cumartesi", 6: "Pazar"}
    gun = gun_map.get(datetime.now().weekday(), "")

    # GSC degisimler
    clicks_chg, clicks_icon = _pct(gsc_today.get('clicks', 0), gsc_prev.get('clicks', 0))
    imp_chg, imp_icon = _pct(gsc_today.get('impressions', 0), gsc_prev.get('impressions', 0))

    # GA4 degisimler
    sess_chg, sess_icon = _pct(ga_today.get('sessions', 0), ga_prev.get('sessions', 0))
    user_chg, user_icon = _pct(ga_today.get('users', 0), ga_prev.get('users', 0))

    avg_sec = ga_today.get('avg_session', 0)
    avg_min = int(avg_sec // 60)
    avg_rem = int(avg_sec % 60)

    message = f"""🌅 *BEGINNER FX GUIDE — Gunluk Rapor*
📅 {bugun} {gun}

🔍 *GSC Metrikleri:*
• Tiklama: *{gsc_today.get('clicks', 'N/A')}* ({clicks_icon} {clicks_chg})
• Gosterim: *{gsc_today.get('impressions', 'N/A')}* ({imp_icon} {imp_chg})
• Ort. Pozisyon: *{gsc_today.get('position', 'N/A')}*
• CTR: *%{gsc_today.get('ctr', 'N/A')}*

📈 *GA4 Metrikleri:*
• Oturum: *{ga_today.get('sessions', 'N/A')}* ({sess_icon} {sess_chg})
• Kullanici: *{ga_today.get('users', 'N/A')}* ({user_icon} {user_chg})
• Sayfa Gor.: *{ga_today.get('pageviews', 'N/A')}*
• Bounce Rate: *%{ga_today.get('bounce_rate', 'N/A')}*
• Ort. Oturum: *{avg_min}m {avg_rem}s*
"""

    if top_pages:
        message += "\n🏆 *Top 5 Sayfa:*\n"
        for i, (page, views) in enumerate(top_pages, 1):
            message += f"  {i}. `{page[:30]}` — {views} ziyaret\n"

    if top_keywords:
        message += "\n🎯 *Top 5 Keyword:*\n"
        for i, kw in enumerate(top_keywords, 1):
            message += f"  {i}. `{kw['keyword'][:25]}` (P:{kw['position']})\n"

    # Anomali uyarilari
    warnings = []
    if gsc_today and gsc_prev:
        if gsc_today.get('clicks', 0) < gsc_prev.get('clicks', 1) * 0.5:
            warnings.append("⚠️ GSC tiklamalarda ciddi dusus!")
        if gsc_today.get('impressions', 0) < gsc_prev.get('impressions', 1) * 0.5:
            warnings.append("⚠️ GSC gosterimlerde ciddi dusus!")
    if ga_today and ga_prev:
        if ga_today.get('sessions', 0) < ga_prev.get('sessions', 1) * 0.5:
            warnings.append("⚠️ GA4 oturumlarda ciddi dusus!")

    if warnings:
        message += "\n🚨 *Uyarilar:*\n"
        for w in warnings:
            message += f"{w}\n"

    message += "\n_beginnerfxguide.com_"

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
