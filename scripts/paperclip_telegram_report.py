#!/usr/bin/env python3
"""
Paperclip Gunluk Telegram Raporu
Sabah 10:00 TR ve aksam 18:00 TR
Git commit ozeti + Paperclip issue durumlari (from cached snapshot)
"""

import json
import os
import sys
import subprocess
import requests
from datetime import datetime, timedelta, timezone

# Load .env
env_path = "/home/paperclip/.env"
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key, value)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
REPO_DIR = "/home/paperclip/usd-forex-guide"
ISSUES_CACHE = "/home/paperclip/usd-forex-guide/agents/ceo/memory/issues_cache.json"
TR_TZ = timezone(timedelta(hours=3))


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


def get_recent_commits(hours: int = 24) -> list:
    since = (datetime.now() - timedelta(hours=hours)).isoformat()
    output = git_cmd("log", f"--since={since}", "--oneline", "--no-merges", "-15")
    return output.split("\n") if output else []


def load_issues_cache() -> dict:
    """Load issue status from cached snapshot (written by heartbeats)."""
    try:
        if os.path.exists(ISSUES_CACHE):
            with open(ISSUES_CACHE) as f:
                return json.load(f)
    except Exception as e:
        print(f"Cache read error: {e}")
    return {}


def build_report(report_type: str = "morning") -> str:
    now_tr = datetime.now(TR_TZ)
    bugun = now_tr.strftime("%d.%m.%Y")
    gun_map = {
        0: "Pazartesi", 1: "Sali", 2: "Carsamba",
        3: "Persembe", 4: "Cuma", 5: "Cumartesi", 6: "Pazar",
    }
    gun = gun_map.get(now_tr.weekday(), "")

    hours = 24 if report_type == "morning" else 10
    commits = get_recent_commits(hours)
    cache = load_issues_cache()

    if report_type == "morning":
        header = f"🌅 *Gunaydin! Sabah Raporu*\n📅 {bugun} {gun}"
    else:
        header = f"🌆 *Aksam Raporu*\n📅 {bugun} {gun}"

    lines = [header, ""]

    # Paperclip issues from cache
    for status, emoji, label in [
        ("done", "✅", "Tamamlanan"),
        ("in_progress", "🔄", "Devam Eden"),
        ("todo", "📋", "Yapilacak"),
        ("blocked", "🚫", "Bloklanan"),
    ]:
        issues = cache.get(status, [])
        if issues:
            lines.append(f"{emoji} *{label}* ({len(issues)}):")
            for i in issues[:6]:
                lines.append(f"  • {i['identifier']}: {i['title'][:50]}")
            if len(issues) > 6:
                lines.append(f"  _+{len(issues) - 6} daha..._")
            lines.append("")

    if not any(cache.get(s) for s in ("done", "in_progress", "todo", "blocked")):
        lines.append("_Issue verisi henuz yok (ilk heartbeat bekleniyor)_\n")

    # Git commits
    lines.append(f"💻 *Son Commitler* ({len(commits)}):")
    if commits:
        for c in commits[:6]:
            parts = c.split(" ", 1)
            msg = parts[1] if len(parts) > 1 else c
            lines.append(f"  • {msg[:55]}")
        if len(commits) > 6:
            lines.append(f"  _+{len(commits) - 6} daha..._")
    else:
        period = "dun" if report_type == "morning" else "bugun"
        lines.append(f"  _Henuz {period} commit yok_")

    # Deploy status
    last_commit = git_cmd("log", "-1", "--pretty=format:%h %s")
    branch = git_cmd("rev-parse", "--abbrev-ref", "HEAD")
    lines.append(f"\n🚀 `{branch}` | `{last_commit[:45]}`")
    lines.append("_beginnerfxguide.com_")

    return "\n".join(lines)


def main():
    report_type = sys.argv[1] if len(sys.argv) > 1 else "morning"
    if report_type not in ("morning", "evening"):
        print(f"Usage: {sys.argv[0]} [morning|evening]")
        sys.exit(1)

    message = build_report(report_type)
    print(message)
    print("---")

    success = send_telegram(message)
    print("Sent!" if success else "FAILED!")
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
