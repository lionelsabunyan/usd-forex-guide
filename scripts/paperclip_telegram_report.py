#!/usr/bin/env python3
"""
Paperclip Gunluk Telegram Raporu — beginnerfxguide.com
Sabah 10:00 TR ve aksam 18:00 TR

Mesaj 1: GA4 Analytics + Affiliate Donusumleri
Mesaj 2: Paperclip Gorev Durumu + Git Commit Ozeti

Board istegi: Son 12 saat icinde yapilan butun isleri gor, detayli olsun.
"""

import json
import os
import sys
import subprocess
import requests
from datetime import datetime, timedelta, timezone

# Load .env — force-override system env to ensure correct bot token (BEG-110)
env_path = "/home/paperclip/.env"
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ[key] = value

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
REPO_DIR = "/home/paperclip/usd-forex-guide"
TR_TZ = timezone(timedelta(hours=3))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "properties/519441201")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def escape_md(text: str) -> str:
    """Remove Markdown formatting chars from dynamic text to prevent parse errors."""
    for ch in ("*", "`", "[", "]", "_", "~"):
        text = text.replace(ch, "")
    return text


def send_telegram(message: str) -> bool:
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("ERROR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set")
        return False
    try:
        resp = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "Markdown",
            },
            timeout=15,
        )
        result = resp.json()
        if not result.get("ok"):
            print(f"Telegram error: {result}")
            # Retry without Markdown if parse fails
            if "can't parse entities" in str(result.get("description", "")):
                print("Retrying without Markdown...")
                resp2 = requests.post(
                    f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
                    json={"chat_id": TELEGRAM_CHAT_ID, "text": message},
                    timeout=15,
                )
                return resp2.json().get("ok", False)
        return result.get("ok", False)
    except Exception as e:
        print(f"Telegram exception: {e}")
        return False


def git_cmd(*args):
    try:
        return subprocess.check_output(
            ["git"] + list(args),
            cwd=REPO_DIR,
            text=True,
            timeout=10,
            stderr=subprocess.DEVNULL,
        ).strip()
    except Exception:
        return ""


def get_recent_commits(hours: int = 12) -> list:
    since = (datetime.now() - timedelta(hours=hours)).isoformat()
    output = git_cmd("log", f"--since={since}", "--oneline", "--no-merges", "-20")
    return [c for c in output.split("\n") if c] if output else []


def supabase_query(table: str, params: str) -> list:
    if not SUPABASE_URL or not SUPABASE_KEY:
        return []
    try:
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        resp = requests.get(
            f"{SUPABASE_URL}/rest/v1/{table}?{params}",
            headers=headers,
            timeout=15,
        )
        return resp.json() if resp.status_code == 200 else []
    except Exception:
        return []


# ---------------------------------------------------------------------------
# GA4 Data (direct API)
# ---------------------------------------------------------------------------

def fetch_ga4_data(date_str: str) -> dict:
    """Fetch GA4 overview + affiliate clicks for a date."""
    try:
        creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/home/paperclip/google-credentials.json")
        if not os.path.isfile(creds_path):
            return {}

        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        credentials = service_account.Credentials.from_service_account_file(
            creds_path,
            scopes=["https://www.googleapis.com/auth/analytics.readonly"],
        )
        ga4 = build("analyticsdata", "v1beta", credentials=credentials)

        # Overview
        resp = ga4.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{"startDate": date_str, "endDate": date_str}],
                "metrics": [
                    {"name": "sessions"},
                    {"name": "totalUsers"},
                    {"name": "screenPageViews"},
                    {"name": "bounceRate"},
                    {"name": "averageSessionDuration"},
                    {"name": "conversions"},
                ],
            },
        ).execute()

        rows = resp.get("rows", [])
        v = rows[0].get("metricValues", []) if rows else []
        overview = {
            "sessions": int(v[0]["value"]) if len(v) > 0 else 0,
            "users": int(v[1]["value"]) if len(v) > 1 else 0,
            "pageviews": int(v[2]["value"]) if len(v) > 2 else 0,
            "bounce_rate": round(float(v[3]["value"]) * 100, 1) if len(v) > 3 else 0,
            "avg_duration": round(float(v[4]["value"])) if len(v) > 4 else 0,
            "conversions": int(v[5]["value"]) if len(v) > 5 else 0,
        }

        # Affiliate clicks by broker
        resp2 = ga4.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{"startDate": date_str, "endDate": date_str}],
                "dimensions": [{"name": "customEvent:broker_id"}],
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
        for row in resp2.get("rows", []):
            dims = row.get("dimensionValues", [])
            vals = row.get("metricValues", [])
            broker = dims[0]["value"] if dims else "unknown"
            if broker and broker != "(not set)":
                clicks.append({"broker": broker, "clicks": int(vals[0]["value"])})

        # Conversion events breakdown
        resp3 = ga4.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{"startDate": date_str, "endDate": date_str}],
                "dimensions": [{"name": "eventName"}],
                "metrics": [{"name": "conversions"}],
                "orderBys": [{"metric": {"metricName": "conversions"}, "desc": True}],
                "limit": 10,
            },
        ).execute()

        conv_events = []
        for row in resp3.get("rows", []):
            dims = row.get("dimensionValues", [])
            vals = row.get("metricValues", [])
            cnt = int(vals[0]["value"]) if vals else 0
            if cnt > 0:
                conv_events.append({"event": dims[0]["value"], "count": cnt})

        # Top traffic sources
        resp4 = ga4.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{"startDate": date_str, "endDate": date_str}],
                "dimensions": [{"name": "sessionSource"}, {"name": "sessionMedium"}],
                "metrics": [{"name": "sessions"}],
                "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}],
                "limit": 5,
            },
        ).execute()

        sources = []
        for row in resp4.get("rows", []):
            dims = row.get("dimensionValues", [])
            vals = row.get("metricValues", [])
            sources.append({
                "source": f"{dims[0]['value']}/{dims[1]['value']}" if len(dims) > 1 else dims[0]["value"],
                "sessions": int(vals[0]["value"]),
            })

        # Top pages
        resp5 = ga4.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{"startDate": date_str, "endDate": date_str}],
                "dimensions": [{"name": "pagePath"}],
                "metrics": [{"name": "screenPageViews"}],
                "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
                "limit": 5,
            },
        ).execute()

        top_pages = []
        for row in resp5.get("rows", []):
            dims = row.get("dimensionValues", [])
            vals = row.get("metricValues", [])
            top_pages.append({
                "page": dims[0]["value"][:40],
                "views": int(vals[0]["value"]),
            })

        return {
            "overview": overview,
            "affiliate_clicks": clicks,
            "conversion_events": conv_events,
            "sources": sources,
            "top_pages": top_pages,
        }
    except Exception as e:
        print(f"GA4 error: {e}")
        return {}


# ---------------------------------------------------------------------------
# Paperclip Issues (live from API)
# ---------------------------------------------------------------------------

def fetch_paperclip_issues() -> dict:
    """Fetch all issues grouped by status from Paperclip API."""
    try:
        config_path = os.getenv("PAPERCLIP_CONFIG", "/home/paperclip/.paperclip/instances/default/config.json")
        if not os.path.isfile(config_path):
            return {}
        with open(config_path) as f:
            config = json.load(f)

        api_url = config.get("apiUrl", "http://localhost:3100")
        company_id = config.get("companyId", "")
        if not company_id:
            return {}

        # Use paperclipai CLI to get issues as it handles auth
        issues = None
        try:
            result = subprocess.check_output(
                ["paperclipai", "issue", "list", "--company-id", company_id, "--limit", "200", "--json"],
                text=True,
                timeout=15,
                stderr=subprocess.DEVNULL,
            )
            issues = json.loads(result)
        except Exception:
            # Fallback: direct API call without auth (local mode)
            resp = requests.get(
                f"{api_url}/api/companies/{company_id}/issues?limit=200",
                timeout=15,
            )
            if resp.status_code == 200:
                issues = resp.json()
        if not issues:
            return {}
        grouped = {}
        for issue in issues:
            status = issue.get("status", "unknown")
            if status not in grouped:
                grouped[status] = []
            grouped[status].append({
                "identifier": issue.get("identifier", ""),
                "title": issue.get("title", ""),
                "priority": issue.get("priority", ""),
                "updatedAt": issue.get("updatedAt", ""),
            })

        return grouped
    except Exception as e:
        print(f"Paperclip error: {e}")
        return {}


# ---------------------------------------------------------------------------
# Build Messages
# ---------------------------------------------------------------------------

def build_analytics_message(report_type: str) -> str:
    """Mesaj 1: GA4 Analytics + Donusumler"""
    now_tr = datetime.now(TR_TZ)
    bugun = now_tr.strftime("%d.%m.%Y")
    gun_map = {
        0: "Pazartesi", 1: "Sali", 2: "Carsamba",
        3: "Persembe", 4: "Cuma", 5: "Cumartesi", 6: "Pazar",
    }
    gun = gun_map.get(now_tr.weekday(), "")

    if report_type == "morning":
        header = f"🌅 *Gunaydin! Sabah Raporu* (1/2)\n📅 {bugun} {gun}"
        # Morning report shows yesterday's full data
        date_str = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
        period_label = "Dun"
    else:
        header = f"🌆 *Aksam Raporu* (1/2)\n📅 {bugun} {gun}"
        # Evening report shows today's data so far
        date_str = datetime.now().strftime("%Y-%m-%d")
        period_label = "Bugun"

    lines = [header, ""]

    # GA4 data
    ga4 = fetch_ga4_data(date_str)
    if ga4 and ga4.get("overview"):
        ov = ga4["overview"]
        lines.append(f"📊 *Site Analitigi ({period_label} - {date_str})*")
        lines.append(f"  Oturum: *{ov['sessions']:,}* | Kullanici: *{ov['users']:,}*")
        lines.append(f"  Sayfa Gor: *{ov['pageviews']:,}* | Bounce: %{ov['bounce_rate']}")
        lines.append(f"  Ort. Sure: {ov['avg_duration']}s | Donusum: *{ov['conversions']}*")
        lines.append("")

        # Affiliate clicks
        clicks = ga4.get("affiliate_clicks", [])
        total_clicks = sum(c["clicks"] for c in clicks)
        if clicks:
            lines.append(f"💰 *Affiliate Click ({total_clicks} toplam)*")
            for c in clicks:
                lines.append(f"  • {c['broker']}: *{c['clicks']}*")
            lines.append("")

        # Conversion events
        conv = ga4.get("conversion_events", [])
        if conv:
            lines.append("🎯 *Donusum Detay*")
            for c in conv:
                ev = escape_md(c['event'])
                lines.append(f"  • {ev}: *{c['count']}*")
            lines.append("")

        # Traffic sources
        sources = ga4.get("sources", [])
        if sources:
            lines.append("🌐 *Trafik Kaynaklari*")
            for s in sources:
                src = escape_md(s['source'])
                lines.append(f"  • {src}: {s['sessions']}")
            lines.append("")

        # Top pages
        pages = ga4.get("top_pages", [])
        if pages:
            lines.append("📄 *En Cok Ziyaret*")
            for p in pages:
                pg = escape_md(p['page'])
                lines.append(f"  • {pg}: {p['views']}")
    else:
        lines.append("_GA4 verisi alinamadi_")

    lines.append("\n_beginnerfxguide.com_")
    return "\n".join(lines)


def build_work_message(report_type: str) -> str:
    """Mesaj 2: Gorev Durumu + Git Commit Ozeti"""
    now_tr = datetime.now(TR_TZ)
    bugun = now_tr.strftime("%d.%m.%Y")

    if report_type == "morning":
        header = "📋 *Gorev & Gelistirme Raporu* (2/2)"
        hours = 12
    else:
        header = "📋 *Gorev & Gelistirme Raporu* (2/2)"
        hours = 12

    lines = [header, ""]

    # Paperclip issues
    issues = fetch_paperclip_issues()
    if issues:
        total = sum(len(v) for v in issues.values())
        done_count = len(issues.get("done", []))
        lines.append(f"*Toplam:* {total} gorev | *Tamamlanan:* {done_count} (%{round(done_count/total*100) if total else 0})")
        lines.append("")

        for status, emoji, label in [
            ("in_progress", "🔄", "Devam Eden"),
            ("todo", "📋", "Yapilacak"),
            ("blocked", "🚫", "Bloklanan"),
        ]:
            items = issues.get(status, [])
            if items:
                lines.append(f"{emoji} *{label}* ({len(items)}):")
                for i in items:
                    prio = ""
                    if i.get("priority") == "critical":
                        prio = "🔴 "
                    elif i.get("priority") == "high":
                        prio = "🟠 "
                    title = escape_md(i['title'][:50])
                    lines.append(f"  • {prio}{i['identifier']}: {title}")
                lines.append("")

        # Recently completed (last 12h)
        done = issues.get("done", [])
        cutoff = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()
        recent_done = [i for i in done if i.get("updatedAt", "") >= cutoff]
        if recent_done:
            lines.append(f"✅ *Son {hours}s Tamamlanan* ({len(recent_done)}):")
            for i in recent_done[:10]:
                title = escape_md(i['title'][:50])
                lines.append(f"  • {i['identifier']}: {title}")
            if len(recent_done) > 10:
                lines.append(f"  _+{len(recent_done) - 10} daha..._")
            lines.append("")
    else:
        lines.append("_Paperclip verisi alinamadi_\n")

    # Git commits (last 12 hours)
    commits = get_recent_commits(hours)
    lines.append(f"💻 *Son {hours}s Commit* ({len(commits)}):")
    if commits:
        for c in commits[:10]:
            parts = c.split(" ", 1)
            msg = escape_md(parts[1] if len(parts) > 1 else c)
            lines.append(f"  • {msg[:55]}")
        if len(commits) > 10:
            lines.append(f"  _+{len(commits) - 10} daha..._")
    else:
        lines.append("  _Commit yok_")

    # Deploy status
    last_commit = git_cmd("log", "-1", "--pretty=format:%h %s")
    branch = git_cmd("rev-parse", "--abbrev-ref", "HEAD")
    lines.append(f"\n🚀 `{branch}` | `{last_commit[:45]}`")
    lines.append("_beginnerfxguide.com_")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    report_type = sys.argv[1] if len(sys.argv) > 1 else "morning"
    if report_type not in ("morning", "evening"):
        print(f"Usage: {sys.argv[0]} [morning|evening]")
        sys.exit(1)

    # Message 1: Analytics
    msg1 = build_analytics_message(report_type)
    print(msg1)
    print("\n---\n")
    ok1 = send_telegram(msg1)
    print("Msg 1 sent!" if ok1 else "Msg 1 FAILED!")

    # Message 2: Work report
    msg2 = build_work_message(report_type)
    print(msg2)
    print("\n---\n")
    ok2 = send_telegram(msg2)
    print("Msg 2 sent!" if ok2 else "Msg 2 FAILED!")

    sys.exit(0 if (ok1 and ok2) else 1)


if __name__ == "__main__":
    main()
