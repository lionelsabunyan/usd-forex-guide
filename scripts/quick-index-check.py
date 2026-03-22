#!/usr/bin/env python3
"""Quick index check - All broker review + compare pages via GSC URL Inspection API"""

import os
import sys
import time
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDS = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS', '/home/paperclip/google-credentials.json')

# Kritik broker review + compare sayfalari (trailing slash ile)
PRIORITY_URLS = [
    # 22 Broker Reviews
    'https://beginnerfxguide.com/review/oanda/',
    'https://beginnerfxguide.com/review/forexcom/',
    'https://beginnerfxguide.com/review/ig-markets/',
    'https://beginnerfxguide.com/review/interactive-brokers/',
    'https://beginnerfxguide.com/review/tastyfx/',
    'https://beginnerfxguide.com/review/charles-schwab/',
    'https://beginnerfxguide.com/review/etoro/',
    'https://beginnerfxguide.com/review/fxpro/',
    'https://beginnerfxguide.com/review/avatrade/',
    'https://beginnerfxguide.com/review/coinexx/',
    'https://beginnerfxguide.com/review/plexytrade/',
    'https://beginnerfxguide.com/review/pepperstone/',
    'https://beginnerfxguide.com/review/fxtm/',
    'https://beginnerfxguide.com/review/fbs/',
    'https://beginnerfxguide.com/review/fxglory/',
    'https://beginnerfxguide.com/review/hankotrade/',
    'https://beginnerfxguide.com/review/n1cm/',
    'https://beginnerfxguide.com/review/midasfx/',
    'https://beginnerfxguide.com/review/hfm/',
    'https://beginnerfxguide.com/review/lmfx/',
    'https://beginnerfxguide.com/review/exness/',
    'https://beginnerfxguide.com/review/xm/',
    # 4 Compare Pages
    'https://beginnerfxguide.com/compare/midasfx-vs-hankotrade/',
    'https://beginnerfxguide.com/compare/oanda-vs-forexcom/',
    'https://beginnerfxguide.com/compare/etoro-vs-xm/',
    'https://beginnerfxguide.com/compare/pepperstone-vs-exness/',
    # Main Pages
    'https://beginnerfxguide.com/',
    'https://beginnerfxguide.com/brokers/',
    'https://beginnerfxguide.com/brokers/australia/',
    'https://beginnerfxguide.com/brokers/uk/',
    'https://beginnerfxguide.com/compare/',
    'https://beginnerfxguide.com/guides/',
    'https://beginnerfxguide.com/tools/',
    'https://beginnerfxguide.com/blog/',
]

credentials = service_account.Credentials.from_service_account_file(
    CREDS, scopes=['https://www.googleapis.com/auth/webmasters']
)
service = build('searchconsole', 'v1', credentials=credentials)

print("\n" + "="*60)
print("GSC INDEX STATUS CHECK — BROKER REVIEWS + COMPARE")
print("="*60 + "\n")

indexed = 0
not_indexed = 0
errors = 0
results = []

for i, url in enumerate(PRIORITY_URLS):
    try:
        r = service.urlInspection().index().inspect(
            body={'inspectionUrl': url, 'siteUrl': SITE_URL}
        ).execute()
        idx = r.get('inspectionResult', {}).get('indexStatusResult', {})
        status = idx.get('coverageState', '?')
        verdict = idx.get('verdict', '?')

        page_name = url.replace('https://beginnerfxguide.com/', '').rstrip('/') or 'homepage'

        if verdict == 'PASS' or 'indexed' in status.lower():
            print(f"✅ [{i+1:02d}] INDEXED: {page_name}")
            indexed += 1
            results.append(('indexed', page_name, status))
        else:
            print(f"❌ [{i+1:02d}] {status[:40]}: {page_name}")
            not_indexed += 1
            results.append(('not_indexed', page_name, status))

        sys.stdout.flush()
        time.sleep(1.2)  # Rate limit
    except HttpError as e:
        print(f"⚠️ [{i+1:02d}] HTTP ERROR: {url} - {e}")
        errors += 1
    except Exception as e:
        print(f"⚠️ [{i+1:02d}] ERROR: {url} - {e}")
        errors += 1

print(f"\n{'='*60}")
print(f"RESULTS: {indexed} indexed | {not_indexed} not indexed | {errors} errors")
print(f"Total checked: {len(PRIORITY_URLS)}")
print("="*60)

if not_indexed > 0:
    print("\n❌ NOT INDEXED PAGES:")
    for status, page, reason in results:
        if status == 'not_indexed':
            print(f"  • {page} — {reason}")
print()
