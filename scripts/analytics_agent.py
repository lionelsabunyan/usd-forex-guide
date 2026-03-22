#!/usr/bin/env python3
"""
Analytics Agent — beginnerfxguide.com
Runs every 6 hours. Queries Supabase daily_analytics and affiliate_metrics.
Detects anomalies and prints a structured report to stdout.
Exit 0 = OK, Exit 1 = anomaly detected, Exit 2 = script error.
"""

import os
import sys
import json
from datetime import datetime, timedelta, timezone

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print(json.dumps({"error": "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY", "ts": datetime.now(timezone.utc).isoformat()}))
    sys.exit(2)

try:
    import requests
except ImportError:
    print(json.dumps({"error": "requests library not installed. Run: pip install requests", "ts": datetime.now(timezone.utc).isoformat()}))
    sys.exit(2)

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}

# Anomaly thresholds
THRESHOLDS = {
    "sessions_drop_pct": 30,       # % drop vs 7-day avg → WARNING
    "affiliate_clicks_drop_pct": 40,  # % drop → CRITICAL
    "conversion_change_pct": 25,   # % change → WARNING
}


def query(table: str, params: dict) -> list:
    """Query a Supabase table via REST API."""
    qs = "&".join(f"{k}={v}" for k, v in params.items())
    url = f"{SUPABASE_URL}/rest/v1/{table}?{qs}"
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return resp.json()


def avg(values: list, key: str) -> float:
    vals = [float(r.get(key, 0) or 0) for r in values if r.get(key) is not None]
    return sum(vals) / len(vals) if vals else 0.0


def pct_change(current: float, baseline: float) -> float:
    if baseline == 0:
        return 0.0
    return round((current - baseline) / baseline * 100, 1)


def run():
    now_utc = datetime.now(timezone.utc)
    today = now_utc.date().isoformat()
    seven_days_ago = (now_utc - timedelta(days=7)).date().isoformat()
    yesterday = (now_utc - timedelta(days=1)).date().isoformat()

    anomalies = []
    report = {"ts": now_utc.isoformat(), "checks": [], "anomalies": []}

    # --- daily_analytics check ---
    try:
        recent = query("daily_analytics", {
            "date": f"gte.{seven_days_ago}",
            "order": "date.desc",
            "limit": "8",
            "select": "date,sessions,users,pageviews"
        })
        if recent:
            today_rows = [r for r in recent if r.get("date") == today]
            baseline_rows = [r for r in recent if r.get("date") not in (today, yesterday)]

            baseline_sessions = avg(baseline_rows, "sessions")
            today_sessions = avg(today_rows, "sessions") if today_rows else None

            check = {
                "table": "daily_analytics",
                "baseline_sessions_avg": round(baseline_sessions, 1),
                "today_sessions": today_sessions,
                "rows_fetched": len(recent),
            }

            if today_sessions is not None and baseline_sessions > 0:
                chg = pct_change(today_sessions, baseline_sessions)
                check["sessions_change_pct"] = chg
                if chg <= -THRESHOLDS["sessions_drop_pct"]:
                    anomalies.append({
                        "severity": "WARNING",
                        "metric": "sessions",
                        "detail": f"Sessions dropped {abs(chg)}% vs 7-day avg ({baseline_sessions:.0f} → {today_sessions:.0f})"
                    })
            elif now_utc.hour >= 18 and today_sessions is None:
                anomalies.append({
                    "severity": "WARNING",
                    "metric": "sessions",
                    "detail": f"No daily_analytics data for today ({today}) after 18:00 UTC"
                })

            report["checks"].append(check)
        else:
            report["checks"].append({"table": "daily_analytics", "note": "no rows returned"})

    except Exception as e:
        report["checks"].append({"table": "daily_analytics", "error": str(e)})

    # --- affiliate_metrics check ---
    try:
        aff_recent = query("affiliate_metrics", {
            "date": f"gte.{seven_days_ago}",
            "order": "date.desc",
            "limit": "50",
            "select": "date,broker,clicks,conversions,revenue"
        })
        if aff_recent:
            today_aff = [r for r in aff_recent if r.get("date") == today]
            baseline_aff = [r for r in aff_recent if r.get("date") not in (today, yesterday)]

            baseline_clicks = avg(baseline_aff, "clicks")
            today_clicks = sum(float(r.get("clicks", 0) or 0) for r in today_aff) if today_aff else None
            today_revenue = sum(float(r.get("revenue", 0) or 0) for r in today_aff) if today_aff else None

            check = {
                "table": "affiliate_metrics",
                "baseline_clicks_avg": round(baseline_clicks, 1),
                "today_clicks": today_clicks,
                "today_revenue": today_revenue,
                "rows_fetched": len(aff_recent),
            }

            if today_clicks is not None and baseline_clicks > 0:
                chg = pct_change(today_clicks, baseline_clicks)
                check["clicks_change_pct"] = chg
                if chg <= -THRESHOLDS["affiliate_clicks_drop_pct"]:
                    anomalies.append({
                        "severity": "CRITICAL",
                        "metric": "affiliate_clicks",
                        "detail": f"Affiliate clicks dropped {abs(chg)}% vs 7-day avg ({baseline_clicks:.0f} → {today_clicks:.0f})"
                    })

            report["checks"].append(check)
        else:
            report["checks"].append({"table": "affiliate_metrics", "note": "no rows returned"})

    except Exception as e:
        report["checks"].append({"table": "affiliate_metrics", "error": str(e)})

    report["anomalies"] = anomalies
    report["status"] = "ANOMALY_DETECTED" if anomalies else "OK"

    print(json.dumps(report, indent=2, default=str))

    if anomalies:
        critical = [a for a in anomalies if a["severity"] == "CRITICAL"]
        sys.exit(1 if not critical else 1)
    sys.exit(0)


if __name__ == "__main__":
    run()
