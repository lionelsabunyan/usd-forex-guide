#!/usr/bin/env python3
"""
Uptime Monitor — beginnerfxguide.com
5-dakika aralikla calisir, site down olunca Telegram alert gonderir.
Kontroller: HTTP status, response time, SSL expiry.
"""

import json
import os
import ssl
import socket
import sys
import time
import requests
from datetime import datetime, timedelta, timezone
from pathlib import Path

# --- Config ---
SITES = [
    {"name": "Main Site", "url": "https://beginnerfxguide.com/"},
    # TR subdomain DNS not configured yet — re-enable when ready
    # {"name": "TR Subdomain", "url": "https://tr.beginnerfxguide.com/"},
]
RESPONSE_TIME_THRESHOLD_SEC = 5.0
SSL_EXPIRY_WARNING_DAYS = 14
STATE_FILE = Path("/tmp/uptime_monitor_state.json")
HTTP_TIMEOUT_SEC = 15
MAX_CONSECUTIVE_FAILURES = 2  # Alert after 2 consecutive failures (avoid flapping)

TR_TZ = timezone(timedelta(hours=3))

# --- Load env ---
env_path = Path("/home/paperclip/.env")
if env_path.exists():
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key, value)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")


def send_telegram(message: str) -> bool:
    """Send a Telegram message. Returns True on success."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("WARN: Telegram credentials not set, skipping alert")
        return False
    try:
        resp = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "HTML",
            },
            timeout=10,
        )
        return resp.ok
    except Exception as e:
        print(f"Telegram send failed: {e}")
        return False


def check_http(url: str) -> dict:
    """Check HTTP status and response time."""
    try:
        start = time.monotonic()
        resp = requests.get(url, timeout=HTTP_TIMEOUT_SEC, allow_redirects=True)
        elapsed = time.monotonic() - start
        return {
            "ok": 200 <= resp.status_code < 400,
            "status_code": resp.status_code,
            "response_time": round(elapsed, 3),
            "slow": elapsed > RESPONSE_TIME_THRESHOLD_SEC,
        }
    except requests.exceptions.Timeout:
        return {"ok": False, "status_code": 0, "response_time": HTTP_TIMEOUT_SEC, "slow": True, "error": "timeout"}
    except Exception as e:
        return {"ok": False, "status_code": 0, "response_time": 0, "slow": False, "error": str(e)}


def check_ssl(hostname: str) -> dict:
    """Check SSL certificate expiry."""
    try:
        ctx = ssl.create_default_context()
        with ctx.wrap_socket(socket.socket(), server_hostname=hostname) as s:
            s.settimeout(10)
            s.connect((hostname, 443))
            cert = s.getpeercert()
        expiry_str = cert["notAfter"]  # e.g. 'Mar 15 12:00:00 2026 GMT'
        expiry = datetime.strptime(expiry_str, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
        days_left = (expiry - datetime.now(timezone.utc)).days
        return {
            "ok": days_left > SSL_EXPIRY_WARNING_DAYS,
            "expiry": expiry.isoformat(),
            "days_left": days_left,
        }
    except Exception as e:
        return {"ok": False, "expiry": None, "days_left": -1, "error": str(e)}


def load_state() -> dict:
    """Load previous state from disk."""
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except Exception:
            pass
    return {}


def save_state(state: dict):
    """Persist state to disk."""
    STATE_FILE.write_text(json.dumps(state, indent=2))


def run_checks():
    now = datetime.now(TR_TZ)
    state = load_state()
    alerts = []
    recoveries = []

    for site in SITES:
        name = site["name"]
        url = site["url"]
        hostname = url.split("//")[1].rstrip("/")
        site_key = hostname.replace(".", "_")

        prev = state.get(site_key, {"consecutive_failures": 0, "was_down": False, "ssl_warned": False})

        # HTTP check
        http = check_http(url)
        # SSL check (once per hour to avoid hammering)
        last_ssl_check = prev.get("last_ssl_check", "")
        ssl_result = None
        if not last_ssl_check or (now - datetime.fromisoformat(last_ssl_check)).total_seconds() > 3600:
            ssl_result = check_ssl(hostname)
            prev["last_ssl_check"] = now.isoformat()
            prev["ssl_result"] = ssl_result

        # Evaluate HTTP
        if not http["ok"]:
            prev["consecutive_failures"] = prev.get("consecutive_failures", 0) + 1
            if prev["consecutive_failures"] >= MAX_CONSECUTIVE_FAILURES and not prev.get("was_down"):
                error_detail = http.get("error", f"HTTP {http['status_code']}")
                alerts.append(
                    f"🔴 <b>{name} DOWN</b>\n"
                    f"URL: {url}\n"
                    f"Hata: {error_detail}\n"
                    f"Süre: {http['response_time']}s"
                )
                prev["was_down"] = True
                prev["down_since"] = now.isoformat()
        else:
            if prev.get("was_down"):
                down_since = prev.get("down_since", "?")
                recoveries.append(
                    f"🟢 <b>{name} RECOVERED</b>\n"
                    f"URL: {url}\n"
                    f"Response: {http['response_time']}s\n"
                    f"Down since: {down_since}"
                )
            prev["consecutive_failures"] = 0
            prev["was_down"] = False
            prev.pop("down_since", None)

            # Slow response warning (only when site is up)
            if http["slow"]:
                alerts.append(
                    f"🟡 <b>{name} YAVAS</b>\n"
                    f"URL: {url}\n"
                    f"Response: {http['response_time']}s (eşik: {RESPONSE_TIME_THRESHOLD_SEC}s)"
                )

        # Evaluate SSL
        if ssl_result and not ssl_result["ok"] and not prev.get("ssl_warned"):
            if ssl_result.get("error"):
                alerts.append(
                    f"🔴 <b>{name} SSL HATASI</b>\n"
                    f"Hostname: {hostname}\n"
                    f"Hata: {ssl_result['error']}"
                )
            else:
                alerts.append(
                    f"🟠 <b>{name} SSL YAKINDA BİTİYOR</b>\n"
                    f"Hostname: {hostname}\n"
                    f"Kalan gün: {ssl_result['days_left']}\n"
                    f"Son tarih: {ssl_result['expiry']}"
                )
            prev["ssl_warned"] = True
        elif ssl_result and ssl_result["ok"]:
            prev["ssl_warned"] = False

        state[site_key] = prev

        # Log to stdout
        ssl_info = f", SSL {ssl_result['days_left']}d" if ssl_result else ""
        status = "OK" if http["ok"] else "FAIL"
        print(f"[{now.strftime('%H:%M:%S')}] {name}: {status} {http['status_code']} {http['response_time']}s{ssl_info}")

    save_state(state)

    # Send alerts
    for msg in recoveries + alerts:
        header = f"⏰ {now.strftime('%d.%m.%Y %H:%M')} TR\n\n"
        send_telegram(header + msg)


def test_mode():
    """Send a test alert to verify Telegram is working."""
    now = datetime.now(TR_TZ)
    ok = send_telegram(
        f"✅ <b>Uptime Monitor Test</b>\n\n"
        f"Zaman: {now.strftime('%d.%m.%Y %H:%M:%S')} TR\n"
        f"Kontrol edilen siteler:\n"
        + "\n".join(f"• {s['name']}: {s['url']}" for s in SITES)
    )
    print("Test alert sent" if ok else "Test alert FAILED")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        test_mode()
    else:
        run_checks()
