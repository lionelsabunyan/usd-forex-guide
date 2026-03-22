#!/usr/bin/env python3
"""Wrapper that loads .env and runs the daily Telegram report."""
import os
import sys

# Load env from /home/paperclip/.env
env_path = "/home/paperclip/.env"
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ[key] = value

# Set credentials path
os.environ.setdefault("GOOGLE_APPLICATION_CREDENTIALS", "/home/paperclip/google-credentials.json")

# Import and run
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from telegram_report import daily_report

success = daily_report()
print("Report sent!" if success else "Report FAILED!")
sys.exit(0 if success else 1)
