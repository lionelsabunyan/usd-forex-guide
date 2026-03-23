#!/usr/bin/env python3
"""
GA4 Data API Analytics — beginnerfxguide.com
Fetches daily analytics, stores in Supabase, exports JSON/CSV, sends Telegram summary.

Usage:
  python ga4_analytics.py collect          # Fetch yesterday's data → Supabase + JSON/CSV
  python ga4_analytics.py report daily     # Send daily Telegram report
  python ga4_analytics.py report weekly    # Send weekly Telegram report
  python ga4_analytics.py export 7         # Export last 7 days to CSV

Required env vars:
  GOOGLE_CREDENTIALS    — JSON string of service account key
  GA4_PROPERTY_ID       — e.g. "properties/519441201"
  GSC_SITE_URL          — e.g. "https://beginnerfxguide.com/"
  SUPABASE_URL          — Supabase project URL
  SUPABASE_SERVICE_KEY  — Supabase service_role key (NOT anon)
  TELEGRAM_BOT_TOKEN    — Telegram bot token
  TELEGRAM_CHAT_ID      — Telegram chat ID
"""

import os
import sys
import json
import csv
from datetime import datetime, timedelta
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

GOOGLE_CREDENTIALS = os.getenv("GOOGLE_CREDENTIALS")
GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "properties/519441201")
GSC_SITE_URL = os.getenv("GSC_SITE_URL", "https://beginnerfxguide.com/")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

REPORTS_DIR = Path(__file__).parent.parent / "reports"

# ---------------------------------------------------------------------------
# Google Auth
# ---------------------------------------------------------------------------

def setup_google_credentials():
    """Write Google credentials JSON to temp file and return path."""
    if not GOOGLE_CREDENTIALS:
        raise RuntimeError("GOOGLE_CREDENTIALS env var not set")
    creds_path = "/tmp/google-credentials.json"
    with open(creds_path, "w") as f:
        f.write(GOOGLE_CREDENTIALS)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_path
    return creds_path


def get_ga4_service():
    from google.oauth2 import service_account
    from googleapiclient.discovery import build

    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/tmp/google-credentials.json")
    credentials = service_account.Credentials.from_service_account_file(
        creds_path,
        scopes=["https://www.googleapis.com/auth/analytics.readonly"],
    )
    return build("analyticsdata", "v1beta", credentials=credentials)


def get_gsc_service():
    from google.oauth2 import service_account
    from googleapiclient.discovery import build

    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/tmp/google-credentials.json")
    credentials = service_account.Credentials.from_service_account_file(
        creds_path,
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    return build("searchconsole", "v1", credentials=credentials)


# ---------------------------------------------------------------------------
# GA4 Data Fetching
# ---------------------------------------------------------------------------

def fetch_ga4_overview(service, date_str: str) -> dict:
    """Fetch aggregate metrics for a single day."""
    response = service.properties().runReport(
        property=GA4_PROPERTY_ID,
        body={
            "dateRanges": [{"startDate": date_str, "endDate": date_str}],
            "metrics": [
                {"name": "sessions"},
                {"name": "totalUsers"},
                {"name": "screenPageViews"},
                {"name": "bounceRate"},
                {"name": "averageSessionDuration"},
            ],
        },
    ).execute()

    rows = response.get("rows", [])
    if not rows:
        return {"sessions": 0, "users": 0, "pageviews": 0, "bounce_rate": 0, "avg_session_duration": 0}

    v = rows[0].get("metricValues", [])
    return {
        "sessions": int(v[0]["value"]) if len(v) > 0 else 0,
        "users": int(v[1]["value"]) if len(v) > 1 else 0,
        "pageviews": int(v[2]["value"]) if len(v) > 2 else 0,
        "bounce_rate": round(float(v[3]["value"]) * 100, 2) if len(v) > 3 else 0,
        "avg_session_duration": round(float(v[4]["value"]), 2) if len(v) > 4 else 0,
    }


def fetch_ga4_top_pages(service, date_str: str, limit: int = 20) -> list:
    """Fetch top pages by pageviews for a single day."""
    response = service.properties().runReport(
        property=GA4_PROPERTY_ID,
        body={
            "dateRanges": [{"startDate": date_str, "endDate": date_str}],
            "dimensions": [{"name": "pagePath"}],
            "metrics": [
                {"name": "screenPageViews"},
                {"name": "sessions"},
                {"name": "averageSessionDuration"},
            ],
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
            "limit": limit,
        },
    ).execute()

    pages = []
    for row in response.get("rows", []):
        dims = row.get("dimensionValues", [])
        vals = row.get("metricValues", [])
        pages.append({
            "page_path": dims[0]["value"] if dims else "/",
            "pageviews": int(vals[0]["value"]) if len(vals) > 0 else 0,
            "sessions": int(vals[1]["value"]) if len(vals) > 1 else 0,
            "avg_time_on_page": round(float(vals[2]["value"]), 2) if len(vals) > 2 else 0,
        })
    return pages


def fetch_ga4_traffic_sources(service, date_str: str) -> list:
    """Fetch traffic by source/medium for a single day."""
    response = service.properties().runReport(
        property=GA4_PROPERTY_ID,
        body={
            "dateRanges": [{"startDate": date_str, "endDate": date_str}],
            "dimensions": [
                {"name": "sessionSource"},
                {"name": "sessionMedium"},
            ],
            "metrics": [
                {"name": "sessions"},
                {"name": "totalUsers"},
            ],
            "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}],
            "limit": 20,
        },
    ).execute()

    sources = []
    for row in response.get("rows", []):
        dims = row.get("dimensionValues", [])
        vals = row.get("metricValues", [])
        sources.append({
            "source": dims[0]["value"] if len(dims) > 0 else "(direct)",
            "medium": dims[1]["value"] if len(dims) > 1 else "(none)",
            "sessions": int(vals[0]["value"]) if len(vals) > 0 else 0,
            "users": int(vals[1]["value"]) if len(vals) > 1 else 0,
        })
    return sources


def fetch_ga4_affiliate_clicks(service, date_str: str) -> list:
    """Fetch affiliate_click events grouped by broker (eventParameter: broker)."""
    response = service.properties().runReport(
        property=GA4_PROPERTY_ID,
        body={
            "dateRanges": [{"startDate": date_str, "endDate": date_str}],
            "dimensions": [{"name": "customEvent:broker"}],
            "metrics": [{"name": "eventCount"}],
            "dimensionFilter": {
                "filter": {
                    "fieldName": "eventName",
                    "stringFilter": {"value": "affiliate_click"},
                }
            },
            "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}],
        },
    ).execute()

    clicks = []
    for row in response.get("rows", []):
        dims = row.get("dimensionValues", [])
        vals = row.get("metricValues", [])
        broker = dims[0]["value"] if dims else "unknown"
        if broker and broker != "(not set)":
            clicks.append({
                "broker": broker,
                "clicks": int(vals[0]["value"]) if vals else 0,
            })
    return clicks


def fetch_gsc_data(service, date_str: str) -> dict:
    """Fetch Search Console aggregate metrics for a date (3-day lag)."""
    try:
        # GSC has ~3 day data lag; for recent dates this may return empty
        response = service.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                "startDate": date_str,
                "endDate": date_str,
                "dimensions": [],
                "rowLimit": 1,
            },
        ).execute()

        rows = response.get("rows", [])
        if rows:
            row = rows[0]
            return {
                "clicks": int(row.get("clicks", 0)),
                "impressions": int(row.get("impressions", 0)),
                "ctr": round(row.get("ctr", 0) * 100, 2),
                "position": round(row.get("position", 0), 1),
            }
    except Exception as e:
        print(f"GSC warning (may be within lag period): {e}")
    return {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0}


# ---------------------------------------------------------------------------
# Supabase Storage
# ---------------------------------------------------------------------------

def get_supabase_headers():
    return {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
    }


def save_to_supabase(date_str: str, overview: dict, gsc: dict, pages: list, sources: list, clicks: list):
    """Upsert analytics data to Supabase tables."""
    import requests

    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Supabase credentials not set, skipping DB save")
        return

    headers = get_supabase_headers()
    base = f"{SUPABASE_URL}/rest/v1"

    # daily_analytics
    requests.post(f"{base}/daily_analytics", headers=headers, json={
        "date": date_str,
        "sessions": overview["sessions"],
        "users": overview["users"],
        "pageviews": overview["pageviews"],
        "bounce_rate": overview["bounce_rate"],
        "avg_session_duration": overview["avg_session_duration"],
        "gsc_clicks": gsc["clicks"],
        "gsc_impressions": gsc["impressions"],
        "gsc_ctr": gsc["ctr"],
        "gsc_avg_position": gsc["position"],
    })

    # daily_top_pages
    if pages:
        page_rows = [{"date": date_str, **p} for p in pages]
        requests.post(f"{base}/daily_top_pages", headers=headers, json=page_rows)

    # daily_traffic_sources
    if sources:
        source_rows = [{"date": date_str, **s} for s in sources]
        requests.post(f"{base}/daily_traffic_sources", headers=headers, json=source_rows)

    # daily_affiliate_clicks
    if clicks:
        click_rows = [{"date": date_str, **c} for c in clicks]
        requests.post(f"{base}/daily_affiliate_clicks", headers=headers, json=click_rows)

    print(f"Saved to Supabase: {date_str}")


# ---------------------------------------------------------------------------
# JSON/CSV Export
# ---------------------------------------------------------------------------

def save_json(date_str: str, data: dict):
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    path = REPORTS_DIR / f"analytics_{date_str}.json"
    with open(path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved JSON: {path}")


def export_csv(days: int = 7):
    """Export last N days from Supabase to CSV."""
    import requests

    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Supabase credentials required for CSV export")
        return

    headers = get_supabase_headers()
    base = f"{SUPABASE_URL}/rest/v1"
    cutoff = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

    resp = requests.get(
        f"{base}/daily_analytics?date=gte.{cutoff}&order=date.desc",
        headers=headers,
    )
    rows = resp.json()

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    path = REPORTS_DIR / f"analytics_last_{days}d.csv"
    if rows:
        with open(path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=rows[0].keys())
            writer.writeheader()
            writer.writerows(rows)
        print(f"Exported CSV: {path} ({len(rows)} rows)")
    else:
        print("No data to export")


# ---------------------------------------------------------------------------
# Telegram Reporting
# ---------------------------------------------------------------------------

def send_telegram(message: str) -> bool:
    import requests

    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram credentials not set, printing report instead:")
        print(message)
        return False

    resp = requests.post(
        f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
        json={"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "Markdown"},
    )
    result = resp.json()
    if not result.get("ok"):
        print(f"Telegram error: {result}")
    return result.get("ok", False)


def daily_telegram_report():
    """Send yesterday's analytics summary to Telegram."""
    setup_google_credentials()
    ga4 = get_ga4_service()

    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    overview = fetch_ga4_overview(ga4, yesterday)
    clicks = fetch_ga4_affiliate_clicks(ga4, yesterday)

    total_aff = sum(c["clicks"] for c in clicks)
    top_brokers = clicks[:3]

    bugun = datetime.now().strftime("%d.%m.%Y")
    gun_map = {0: "Pazartesi", 1: "Sali", 2: "Carsamba", 3: "Persembe", 4: "Cuma", 5: "Cumartesi", 6: "Pazar"}
    gun = gun_map.get(datetime.now().weekday(), "")

    msg = f"""*Gunaydin! Gunluk Rapor*
{bugun} {gun}

*Analytics ({yesterday}):*
- Oturum: {overview['sessions']:,}
- Kullanici: {overview['users']:,}
- Sayfa Goruntuuleme: {overview['pageviews']:,}
- Bounce Rate: %{overview['bounce_rate']}
- Ort. Oturum: {overview['avg_session_duration']:.0f}s

*Affiliate Clicks:* {total_aff}"""

    if top_brokers:
        msg += "\n*Top Brokers:*"
        for b in top_brokers:
            msg += f"\n- {b['broker']}: {b['clicks']}"

    msg += "\n\n_beginnerfxguide.com_"
    return send_telegram(msg)


def weekly_telegram_report():
    """Send 7-day analytics summary to Telegram."""
    setup_google_credentials()
    ga4 = get_ga4_service()
    gsc = get_gsc_service()

    end = datetime.now() - timedelta(days=1)
    start = end - timedelta(days=6)
    start_str = start.strftime("%Y-%m-%d")
    end_str = end.strftime("%Y-%m-%d")

    # Fetch 7-day aggregate
    response = ga4.properties().runReport(
        property=GA4_PROPERTY_ID,
        body={
            "dateRanges": [{"startDate": start_str, "endDate": end_str}],
            "metrics": [
                {"name": "sessions"},
                {"name": "totalUsers"},
                {"name": "screenPageViews"},
                {"name": "bounceRate"},
                {"name": "averageSessionDuration"},
            ],
        },
    ).execute()

    rows = response.get("rows", [])
    v = rows[0].get("metricValues", []) if rows else []
    overview = {
        "sessions": int(v[0]["value"]) if len(v) > 0 else 0,
        "users": int(v[1]["value"]) if len(v) > 1 else 0,
        "pageviews": int(v[2]["value"]) if len(v) > 2 else 0,
        "bounce_rate": round(float(v[3]["value"]) * 100, 2) if len(v) > 3 else 0,
        "avg_session": round(float(v[4]["value"]), 1) if len(v) > 4 else 0,
    }

    # GSC 7-day (with lag)
    gsc_end = datetime.now() - timedelta(days=3)
    gsc_start = gsc_end - timedelta(days=6)
    try:
        gsc_resp = gsc.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                "startDate": gsc_start.strftime("%Y-%m-%d"),
                "endDate": gsc_end.strftime("%Y-%m-%d"),
            },
        ).execute()
        gsc_rows = gsc_resp.get("rows", [])
        gsc_data = gsc_rows[0] if gsc_rows else {}
    except Exception:
        gsc_data = {}

    # Top keywords
    try:
        kw_resp = gsc.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                "startDate": gsc_start.strftime("%Y-%m-%d"),
                "endDate": gsc_end.strftime("%Y-%m-%d"),
                "dimensions": ["query"],
                "rowLimit": 5,
            },
        ).execute()
        keywords = kw_resp.get("rows", [])
    except Exception:
        keywords = []

    bugun = datetime.now().strftime("%d.%m.%Y")

    msg = f"""*Haftalik Performans Raporu*
{bugun}

*GA4 (7 gun):*
- Oturum: {overview['sessions']:,}
- Kullanici: {overview['users']:,}
- Sayfa Goruntuuleme: {overview['pageviews']:,}
- Bounce Rate: %{overview['bounce_rate']}
- Ort. Oturum: {overview['avg_session']:.0f}s

*Search Console (7 gun):*
- Gosterim: {gsc_data.get('impressions', 'N/A'):,}
- Tiklama: {gsc_data.get('clicks', 'N/A'):,}
- CTR: %{round(gsc_data.get('ctr', 0) * 100, 2)}
- Ort. Pozisyon: {round(gsc_data.get('position', 0), 1)}
"""

    if keywords:
        msg += "\n*Top 5 Keyword:*"
        for i, kw in enumerate(keywords, 1):
            msg += f"\n{i}. {kw['keys'][0][:30]} (P:{round(kw.get('position', 0), 1)})"

    msg += "\n\n_beginnerfxguide.com_"
    return send_telegram(msg)


# ---------------------------------------------------------------------------
# Main: collect
# ---------------------------------------------------------------------------

def collect(date_str: str = None):
    """Fetch all analytics for a date, save to Supabase and JSON."""
    setup_google_credentials()

    if not date_str:
        date_str = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    print(f"Collecting analytics for {date_str}...")

    ga4 = get_ga4_service()
    gsc = get_gsc_service()

    overview = fetch_ga4_overview(ga4, date_str)
    pages = fetch_ga4_top_pages(ga4, date_str)
    sources = fetch_ga4_traffic_sources(ga4, date_str)
    clicks = fetch_ga4_affiliate_clicks(ga4, date_str)
    gsc_data = fetch_gsc_data(gsc, date_str)

    # Save to Supabase
    save_to_supabase(date_str, overview, gsc_data, pages, sources, clicks)

    # Save JSON
    save_json(date_str, {
        "date": date_str,
        "overview": overview,
        "gsc": gsc_data,
        "top_pages": pages,
        "traffic_sources": sources,
        "affiliate_clicks": clicks,
    })

    print(f"Collection complete: {overview['sessions']} sessions, {overview['pageviews']} pageviews, {len(clicks)} broker clicks")
    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == "collect":
        date_arg = sys.argv[2] if len(sys.argv) > 2 else None
        success = collect(date_arg)
        sys.exit(0 if success else 1)

    elif cmd == "report":
        report_type = sys.argv[2] if len(sys.argv) > 2 else "daily"
        if report_type == "daily":
            success = daily_telegram_report()
        elif report_type == "weekly":
            success = weekly_telegram_report()
        else:
            print(f"Unknown report type: {report_type}")
            sys.exit(1)
        sys.exit(0 if success else 1)

    elif cmd == "export":
        days = int(sys.argv[2]) if len(sys.argv) > 2 else 7
        export_csv(days)

    else:
        print(f"Unknown command: {cmd}")
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
