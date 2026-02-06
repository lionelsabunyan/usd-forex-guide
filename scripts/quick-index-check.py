#!/usr/bin/env python3
"""Quick index check - Top 15 priority pages only"""

import sys
import time
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDS = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'

PRIORITY_URLS = [
    'https://beginnerfxguide.com/brokers',
    'https://beginnerfxguide.com/compare', 
    'https://beginnerfxguide.com/guides',
    'https://beginnerfxguide.com/tools',
    'https://beginnerfxguide.com/glossary',
    'https://beginnerfxguide.com/review/fxglory',
    'https://beginnerfxguide.com/review/hankotrade',
    'https://beginnerfxguide.com/review/midasfx',
    'https://beginnerfxguide.com/review/n1cm',
    'https://beginnerfxguide.com/blog/best-forex-brokers-us-traders-2026',
    'https://beginnerfxguide.com/guides/forex-trading-usa',
    'https://beginnerfxguide.com/tools/pip-calculator',
    'https://beginnerfxguide.com/blog',
    'https://beginnerfxguide.com/faq',
    'https://beginnerfxguide.com/about',
]

credentials = service_account.Credentials.from_service_account_file(CREDS, scopes=['https://www.googleapis.com/auth/webmasters'])
service = build('searchconsole', 'v1', credentials=credentials)

print("\n" + "="*60)
print("QUICK INDEX STATUS CHECK - TOP 15 PAGES")
print("="*60 + "\n")

indexed = 0
not_indexed = 0

for i, url in enumerate(PRIORITY_URLS):
    try:
        r = service.urlInspection().index().inspect(body={'inspectionUrl': url, 'siteUrl': SITE_URL}).execute()
        idx = r.get('inspectionResult', {}).get('indexStatusResult', {})
        status = idx.get('coverageState', '?')
        verdict = idx.get('verdict', '?')
        
        if verdict == 'PASS' or 'indexed' in status.lower():
            print(f"✅ [{i+1:02d}] INDEXED: {url.split('/')[-1] or 'homepage'}")
            indexed += 1
        else:
            print(f"❌ [{i+1:02d}] {status[:30]}: {url.split('/')[-1] or url}")
            not_indexed += 1
        
        sys.stdout.flush()
        time.sleep(1)
    except Exception as e:
        print(f"⚠️ [{i+1:02d}] ERROR: {url} - {e}")

print(f"\n{'='*60}")
print(f"RESULT: {indexed} indexed, {not_indexed} not indexed")
print("="*60 + "\n")
