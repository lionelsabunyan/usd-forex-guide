#!/usr/bin/env python3
"""
Haftalik Performans Raporu — Board'a sunulacak format
Her Pazartesi calisir, onceki haftanin detayli analizini Telegram'a gonderir.

Veri kaynaklari:
  - Google Search Console (API)
  - Google Analytics 4 (API)
  - Supabase affiliate_metrics (REST)
  - Paperclip API (tamamlanan gorevler)
  - Git log (son commitler)
"""

import json
import os
import subprocess
import sys
from datetime import datetime, timedelta, timezone

import requests

# ---------------------------------------------------------------------------
# ENV
# ---------------------------------------------------------------------------
env_path = "/home/paperclip/.env"
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key, value)

os.environ.setdefault(
    "GOOGLE_APPLICATION_CREDENTIALS", "/home/paperclip/google-credentials.json"
)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "properties/519441201")
GSC_SITE_URL = os.getenv("GSC_SITE_URL", "https://beginnerfxguide.com/")
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")
REPO_DIR = "/home/paperclip/usd-forex-guide"
ISSUES_CACHE = os.path.join(REPO_DIR, "agents/ceo/memory/issues_cache.json")
TR_TZ = timezone(timedelta(hours=3))

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def send_telegram(message: str) -> bool:
    """Telegram'a mesaj gonder (4096 char limitine uygun parcala)."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("ERROR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set")
        return False

    # Telegram max 4096 char
    chunks = []
    while len(message) > 4096:
        split_at = message.rfind("\n", 0, 4096)
        if split_at == -1:
            split_at = 4096
        chunks.append(message[:split_at])
        message = message[split_at:]
    chunks.append(message)

    ok = True
    for chunk in chunks:
        try:
            resp = requests.post(
                f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
                json={
                    "chat_id": TELEGRAM_CHAT_ID,
                    "text": chunk,
                    "parse_mode": "Markdown",
                },
                timeout=15,
            )
            result = resp.json()
            if not result.get("ok"):
                print(f"Telegram error: {result}")
                ok = False
        except Exception as e:
            print(f"Telegram exception: {e}")
            ok = False
    return ok


def pct_change(current, previous):
    """Yuzde degisim hesapla, ok isareti ekle."""
    if not previous:
        return "N/A", ""
    change = ((current - previous) / previous) * 100
    if change > 0:
        return f"+{change:.1f}%", "📈"
    elif change < 0:
        return f"{change:.1f}%", "📉"
    return "0%", "➡️"


def trend_arrow(current, previous, reverse=False):
    """Basit trend oku (position icin reverse=True)."""
    if current is None or previous is None:
        return ""
    if reverse:
        current, previous = previous, current
    if current > previous:
        return "🟢"
    elif current < previous:
        return "🔴"
    return "⚪"


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


# ---------------------------------------------------------------------------
# Data Sources
# ---------------------------------------------------------------------------

def _google_creds(scopes):
    from google.oauth2 import service_account
    return service_account.Credentials.from_service_account_file(
        os.environ.get("GOOGLE_APPLICATION_CREDENTIALS",
                       "/home/paperclip/google-credentials.json"),
        scopes=scopes,
    )


def get_gsc_data(start_date, end_date):
    """GSC toplam metrikler."""
    try:
        from googleapiclient.discovery import build
        creds = _google_creds(["https://www.googleapis.com/auth/webmasters.readonly"])
        svc = build("searchconsole", "v1", credentials=creds)
        resp = svc.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                "startDate": start_date.strftime("%Y-%m-%d"),
                "endDate": end_date.strftime("%Y-%m-%d"),
                "dimensions": [],
                "rowLimit": 1,
            },
        ).execute()
        rows = resp.get("rows", [])
        if rows:
            r = rows[0]
            return {
                "clicks": int(r.get("clicks", 0)),
                "impressions": int(r.get("impressions", 0)),
                "ctr": round(r.get("ctr", 0) * 100, 2),
                "position": round(r.get("position", 0), 1),
            }
    except Exception as e:
        print(f"GSC error: {e}")
    return {}


def get_gsc_top_keywords(start_date, end_date, limit=10):
    """GSC top keyword'ler (clicks ile sirali)."""
    try:
        from googleapiclient.discovery import build
        creds = _google_creds(["https://www.googleapis.com/auth/webmasters.readonly"])
        svc = build("searchconsole", "v1", credentials=creds)
        resp = svc.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                "startDate": start_date.strftime("%Y-%m-%d"),
                "endDate": end_date.strftime("%Y-%m-%d"),
                "dimensions": ["query"],
                "rowLimit": limit,
            },
        ).execute()
        return [
            {
                "keyword": row["keys"][0],
                "clicks": int(row.get("clicks", 0)),
                "impressions": int(row.get("impressions", 0)),
                "position": round(row.get("position", 0), 1),
            }
            for row in resp.get("rows", [])
        ]
    except Exception as e:
        print(f"GSC keywords error: {e}")
    return []


def get_gsc_top_pages(start_date, end_date, limit=5):
    """GSC top sayfalar."""
    try:
        from googleapiclient.discovery import build
        creds = _google_creds(["https://www.googleapis.com/auth/webmasters.readonly"])
        svc = build("searchconsole", "v1", credentials=creds)
        resp = svc.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={
                "startDate": start_date.strftime("%Y-%m-%d"),
                "endDate": end_date.strftime("%Y-%m-%d"),
                "dimensions": ["page"],
                "rowLimit": limit,
            },
        ).execute()
        return [
            {
                "page": row["keys"][0].replace(GSC_SITE_URL.rstrip("/"), ""),
                "clicks": int(row.get("clicks", 0)),
                "impressions": int(row.get("impressions", 0)),
                "position": round(row.get("position", 0), 1),
            }
            for row in resp.get("rows", [])
        ]
    except Exception as e:
        print(f"GSC pages error: {e}")
    return []


def get_ga4_data(start_date, end_date):
    """GA4 toplam metrikler."""
    try:
        from googleapiclient.discovery import build
        creds = _google_creds(["https://www.googleapis.com/auth/analytics.readonly"])
        svc = build("analyticsdata", "v1beta", credentials=creds)
        resp = svc.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                }],
                "metrics": [
                    {"name": "sessions"},
                    {"name": "totalUsers"},
                    {"name": "screenPageViews"},
                    {"name": "bounceRate"},
                    {"name": "averageSessionDuration"},
                ],
            },
        ).execute()
        rows = resp.get("rows", [])
        if rows:
            v = rows[0].get("metricValues", [])
            return {
                "sessions": int(v[0]["value"]) if len(v) > 0 else 0,
                "users": int(v[1]["value"]) if len(v) > 1 else 0,
                "pageviews": int(v[2]["value"]) if len(v) > 2 else 0,
                "bounce_rate": round(float(v[3]["value"]) * 100, 1) if len(v) > 3 else 0,
                "avg_session": round(float(v[4]["value"]), 1) if len(v) > 4 else 0,
            }
    except Exception as e:
        print(f"GA4 error: {e}")
    return {}


def get_ga4_top_pages(start_date, end_date, limit=5):
    """GA4 en cok ziyaret edilen sayfalar."""
    try:
        from googleapiclient.discovery import build
        creds = _google_creds(["https://www.googleapis.com/auth/analytics.readonly"])
        svc = build("analyticsdata", "v1beta", credentials=creds)
        resp = svc.properties().runReport(
            property=GA4_PROPERTY_ID,
            body={
                "dateRanges": [{
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                }],
                "dimensions": [{"name": "pagePath"}],
                "metrics": [{"name": "screenPageViews"}],
                "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
                "limit": limit,
            },
        ).execute()
        pages = []
        for row in resp.get("rows", []):
            pages.append({
                "page": row["dimensionValues"][0]["value"],
                "views": int(row["metricValues"][0]["value"]),
            })
        return pages
    except Exception as e:
        print(f"GA4 top pages error: {e}")
    return []


def get_affiliate_data(start_date, end_date):
    """Supabase affiliate_metrics tablosundan affiliate tiklama verileri."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        return {}
    try:
        url = (
            f"{SUPABASE_URL}/rest/v1/affiliate_metrics"
            f"?select=broker_name,clicks,impressions,created_at"
            f"&created_at=gte.{start_date.strftime('%Y-%m-%d')}"
            f"&created_at=lte.{end_date.strftime('%Y-%m-%d')}"
            f"&order=clicks.desc"
        )
        resp = requests.get(
            url,
            headers={
                "apikey": SUPABASE_SERVICE_KEY,
                "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
            },
            timeout=10,
        )
        if resp.status_code == 200:
            rows = resp.json()
            total_clicks = sum(r.get("clicks", 0) for r in rows)
            # Broker bazli toplam
            broker_totals = {}
            for r in rows:
                name = r.get("broker_name", "unknown")
                broker_totals[name] = broker_totals.get(name, 0) + r.get("clicks", 0)
            top_brokers = sorted(broker_totals.items(), key=lambda x: x[1], reverse=True)[:5]
            return {
                "total_clicks": total_clicks,
                "top_brokers": top_brokers,
                "row_count": len(rows),
            }
        else:
            print(f"Supabase HTTP {resp.status_code}: {resp.text[:200]}")
    except Exception as e:
        print(f"Affiliate data error: {e}")
    return {}


def get_paperclip_completed_tasks():
    """Paperclip issue cache'den tamamlanan gorevleri al."""
    try:
        if os.path.exists(ISSUES_CACHE):
            with open(ISSUES_CACHE) as f:
                cache = json.load(f)
            done = cache.get("done", [])
            in_progress = cache.get("in_progress", [])
            todo = cache.get("todo", [])
            blocked = cache.get("blocked", [])
            return {
                "done": done,
                "in_progress": in_progress,
                "todo": todo,
                "blocked": blocked,
            }
    except Exception as e:
        print(f"Paperclip cache error: {e}")
    return {}


def get_recent_commits(days=7):
    """Son X gundeki commitler."""
    since = (datetime.now() - timedelta(days=days)).isoformat()
    output = git_cmd("log", f"--since={since}", "--oneline", "--no-merges", "-20")
    return output.split("\n") if output else []


# ---------------------------------------------------------------------------
# Report Builder
# ---------------------------------------------------------------------------

def build_weekly_report():
    now_tr = datetime.now(TR_TZ)
    bugun = now_tr.strftime("%d.%m.%Y")

    # Date ranges: GSC 3 gun gecikme
    gsc_end = datetime.now() - timedelta(days=3)
    gsc_start = gsc_end - timedelta(days=7)
    gsc_prev_end = gsc_start - timedelta(days=1)
    gsc_prev_start = gsc_prev_end - timedelta(days=7)

    # GA4 ranges
    ga_end = datetime.now() - timedelta(days=1)
    ga_start = ga_end - timedelta(days=7)
    ga_prev_end = ga_start - timedelta(days=1)
    ga_prev_start = ga_prev_end - timedelta(days=7)

    # Fetch data
    print("Fetching GSC data...")
    gsc_this = get_gsc_data(gsc_start, gsc_end)
    gsc_prev = get_gsc_data(gsc_prev_start, gsc_prev_end)
    gsc_keywords = get_gsc_top_keywords(gsc_start, gsc_end, limit=10)
    gsc_pages = get_gsc_top_pages(gsc_start, gsc_end, limit=5)

    print("Fetching GA4 data...")
    ga_this = get_ga4_data(ga_start, ga_end)
    ga_prev = get_ga4_data(ga_prev_start, ga_prev_end)
    ga_top_pages = get_ga4_top_pages(ga_start, ga_end, limit=5)

    print("Fetching affiliate data...")
    aff_this = get_affiliate_data(ga_start, ga_end)
    aff_prev = get_affiliate_data(ga_prev_start, ga_prev_end)

    print("Fetching Paperclip tasks...")
    tasks = get_paperclip_completed_tasks()
    commits = get_recent_commits(7)

    # Build message
    lines = []
    lines.append(f"📊 *HAFTALIK PERFORMANS RAPORU*")
    lines.append(f"📅 {bugun} | Hafta {now_tr.isocalendar()[1]}")
    lines.append(f"_{gsc_start.strftime('%d.%m')} — {gsc_end.strftime('%d.%m.%Y')}_")
    lines.append("")

    # --- GSC ---
    lines.append("═══════════════════════════")
    lines.append("🔍 *SEARCH CONSOLE*")
    lines.append("═══════════════════════════")

    if gsc_this:
        clicks_chg, clicks_icon = pct_change(
            gsc_this.get("clicks", 0), gsc_prev.get("clicks", 0)
        )
        imp_chg, imp_icon = pct_change(
            gsc_this.get("impressions", 0), gsc_prev.get("impressions", 0)
        )
        pos_arrow = trend_arrow(
            gsc_prev.get("position", 0), gsc_this.get("position", 0)
        )

        lines.append(
            f"• Tiklama: *{gsc_this['clicks']}* "
            f"({clicks_icon} {clicks_chg})"
        )
        lines.append(
            f"• Gosterim: *{gsc_this['impressions']}* "
            f"({imp_icon} {imp_chg})"
        )
        lines.append(f"• CTR: *%{gsc_this['ctr']}*")
        lines.append(
            f"• Ort. Pozisyon: *{gsc_this['position']}* {pos_arrow}"
        )
    else:
        lines.append("_Veri alinamadi_")
    lines.append("")

    # Top keywords
    if gsc_keywords:
        lines.append("🎯 *Top 10 Keyword:*")
        for i, kw in enumerate(gsc_keywords, 1):
            pos_str = f"P:{kw['position']}"
            lines.append(
                f"  {i}. `{kw['keyword'][:30]}` — "
                f"{kw['clicks']}c / {kw['impressions']}i ({pos_str})"
            )
        lines.append("")

    # Top pages by GSC
    if gsc_pages:
        lines.append("📄 *Top 5 Sayfa (GSC):*")
        for i, p in enumerate(gsc_pages, 1):
            page = p["page"] or "/"
            lines.append(
                f"  {i}. `{page[:35]}` — {p['clicks']}c (P:{p['position']})"
            )
        lines.append("")

    # --- GA4 ---
    lines.append("═══════════════════════════")
    lines.append("📈 *GOOGLE ANALYTICS*")
    lines.append("═══════════════════════════")

    if ga_this:
        sess_chg, sess_icon = pct_change(
            ga_this.get("sessions", 0), ga_prev.get("sessions", 0)
        )
        user_chg, user_icon = pct_change(
            ga_this.get("users", 0), ga_prev.get("users", 0)
        )
        pv_chg, pv_icon = pct_change(
            ga_this.get("pageviews", 0), ga_prev.get("pageviews", 0)
        )

        avg_sec = ga_this.get("avg_session", 0)
        avg_min = int(avg_sec // 60)
        avg_rem = int(avg_sec % 60)

        lines.append(
            f"• Oturum: *{ga_this['sessions']}* "
            f"({sess_icon} {sess_chg})"
        )
        lines.append(
            f"• Kullanici: *{ga_this['users']}* "
            f"({user_icon} {user_chg})"
        )
        lines.append(
            f"• Sayfa Gor.: *{ga_this['pageviews']}* "
            f"({pv_icon} {pv_chg})"
        )
        lines.append(f"• Bounce Rate: *%{ga_this['bounce_rate']}*")
        lines.append(f"• Ort. Oturum: *{avg_min}m {avg_rem}s*")
    else:
        lines.append("_Veri alinamadi_")
    lines.append("")

    # GA4 top pages
    if ga_top_pages:
        lines.append("🏆 *Top 5 Sayfa (GA4):*")
        for i, p in enumerate(ga_top_pages, 1):
            lines.append(f"  {i}. `{p['page'][:35]}` — {p['views']} goruntuleme")
        lines.append("")

    # --- Affiliate ---
    lines.append("═══════════════════════════")
    lines.append("💰 *AFFILIATE*")
    lines.append("═══════════════════════════")

    if aff_this:
        aff_chg, aff_icon = pct_change(
            aff_this.get("total_clicks", 0),
            aff_prev.get("total_clicks", 0),
        )
        lines.append(
            f"• Toplam Tiklama: *{aff_this['total_clicks']}* "
            f"({aff_icon} {aff_chg})"
        )
        if aff_this.get("top_brokers"):
            lines.append("• En cok tiklanan:")
            for name, clicks in aff_this["top_brokers"][:5]:
                lines.append(f"    {name}: {clicks}")
    else:
        lines.append("_Affiliate verisi yok veya alinamadi_")
    lines.append("")

    # --- Paperclip Tasks ---
    lines.append("═══════════════════════════")
    lines.append("📋 *GOREV DURUMU*")
    lines.append("═══════════════════════════")

    if tasks:
        for status, emoji, label in [
            ("done", "✅", "Tamamlanan"),
            ("in_progress", "🔄", "Devam Eden"),
            ("todo", "📋", "Yapilacak"),
            ("blocked", "🚫", "Bloklanan"),
        ]:
            items = tasks.get(status, [])
            if items:
                lines.append(f"{emoji} *{label}* ({len(items)}):")
                for item in items[:5]:
                    ident = item.get("identifier", "")
                    title = item.get("title", "")[:45]
                    lines.append(f"  • {ident}: {title}")
                if len(items) > 5:
                    lines.append(f"  _+{len(items) - 5} daha..._")
                lines.append("")
    else:
        lines.append("_Issue verisi henuz yok_")
        lines.append("")

    # --- Git ---
    lines.append(f"💻 *SON COMMITLER* ({len(commits)}):")
    if commits and commits[0]:
        for c in commits[:8]:
            parts = c.split(" ", 1)
            msg = parts[1] if len(parts) > 1 else c
            lines.append(f"  • {msg[:50]}")
        if len(commits) > 8:
            lines.append(f"  _+{len(commits) - 8} daha..._")
    else:
        lines.append("  _Bu hafta commit yok_")
    lines.append("")

    # --- Uyarilar ---
    warnings = []
    if gsc_this and gsc_prev:
        if gsc_this.get("clicks", 0) < gsc_prev.get("clicks", 1) * 0.7:
            warnings.append("⚠️ GSC tiklamalarda %30+ dusus!")
        if gsc_this.get("impressions", 0) < gsc_prev.get("impressions", 1) * 0.7:
            warnings.append("⚠️ GSC gosterimlerde %30+ dusus!")
        if gsc_this.get("position", 0) > gsc_prev.get("position", 100) + 5:
            warnings.append("⚠️ Ort. pozisyon 5+ sira geriledi!")
    if ga_this and ga_prev:
        if ga_this.get("sessions", 0) < ga_prev.get("sessions", 1) * 0.7:
            warnings.append("⚠️ GA4 oturumlarda %30+ dusus!")

    if warnings:
        lines.append("🚨 *UYARILAR:*")
        for w in warnings:
            lines.append(w)
        lines.append("")

    # Footer
    lines.append("═══════════════════════════")
    branch = git_cmd("rev-parse", "--abbrev-ref", "HEAD")
    last = git_cmd("log", "-1", "--pretty=format:%h %s")
    lines.append(f"🚀 `{branch}` | `{last[:40]}`")
    lines.append("_beginnerfxguide.com_")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    report = build_weekly_report()
    print(report)
    print("\n---\n")

    success = send_telegram(report)
    print("Rapor gonderildi!" if success else "Rapor GONDERILEMEDI!")
    return success


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
