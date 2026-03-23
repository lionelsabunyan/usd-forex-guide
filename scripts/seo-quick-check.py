#!/usr/bin/env python3
"""
Quick SEO check — Sitemap status + priority page inspection + search performance.
Reads URLs dynamically from sitemap.xml.

Usage:
  python3 scripts/seo-quick-check.py
"""

import os
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from pathlib import Path
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDENTIALS_PATH = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS', '/home/paperclip/google-credentials.json')
REPO_ROOT = Path(__file__).resolve().parent.parent

# Priority: high-value pages to always check
PRIORITY_EXACT = [
    'https://beginnerfxguide.com/',
    'https://beginnerfxguide.com/brokers/',
    'https://beginnerfxguide.com/compare/',
    'https://beginnerfxguide.com/guides/',
    'https://beginnerfxguide.com/tools/',
    'https://beginnerfxguide.com/blog/',
    'https://beginnerfxguide.com/glossary/',
]
PRIORITY_PREFIXES = ['/review/', '/guides/forex-trading-usa/']


def parse_sitemap(sitemap_path: Path) -> list[str]:
    if not sitemap_path.exists():
        return []
    tree = ET.parse(sitemap_path)
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    return [loc.text.strip() for loc in tree.getroot().findall('.//s:loc', ns) if loc.text]


def get_priority_urls() -> list[str]:
    """Get priority URLs: all reviews + key pages, up to ~15 for quick check."""
    all_urls = parse_sitemap(REPO_ROOT / 'public/sitemap.xml')
    priority = list(PRIORITY_EXACT)
    for url in all_urls:
        path = url.replace(SITE_URL.rstrip('/'), '')
        if any(path.startswith(p) for p in PRIORITY_PREFIXES):
            if url not in priority:
                priority.append(url)
    # Cap at 15 to keep it quick (API rate limits)
    return priority[:15]


def main():
    print(f"\n{'='*60}")
    print(f"QUICK SEO CHECK - {datetime.now()}")
    print(f"{'='*60}\n")

    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/webmasters']
    )
    service = build('searchconsole', 'v1', credentials=credentials)

    # Check sitemap status
    print("SITEMAP STATUS:")
    print("-" * 40)
    try:
        sitemaps = service.sitemaps().list(siteUrl=SITE_URL).execute()
        for sm in sitemaps.get('sitemap', []):
            print(f"  Path: {sm.get('path')}")
            print(f"  Last Submitted: {sm.get('lastSubmitted')}")
            print(f"  Last Downloaded: {sm.get('lastDownloaded')}")
            print(f"  Pending: {sm.get('isPending', False)}")
            print(f"  Warnings: {sm.get('warnings', 0)}")
            print(f"  Errors: {sm.get('errors', 0)}")
            for c in sm.get('contents', []):
                print(f"  Content: {c.get('type')} - Submitted: {c.get('submitted')}, Indexed: {c.get('indexed')}")
    except Exception as e:
        print(f"  Error: {e}")

    # URL Inspection
    priority_urls = get_priority_urls()
    print(f"\n{'='*60}")
    print(f"URL INSPECTION ({len(priority_urls)} Priority Pages)")
    print(f"{'='*60}\n")

    indexed = []
    not_indexed = []
    import time

    for url in priority_urls:
        print(f"Checking: {url}")
        try:
            result = service.urlInspection().index().inspect(
                body={'inspectionUrl': url, 'siteUrl': SITE_URL}
            ).execute()

            inspection = result.get('inspectionResult', {})
            idx = inspection.get('indexStatusResult', {})

            coverage = idx.get('coverageState', 'UNKNOWN')
            verdict = idx.get('verdict', 'UNKNOWN')
            crawled = idx.get('lastCrawlTime', 'Never')

            if verdict == 'PASS':
                indexed.append(url)
                print(f"  ✓ INDEXED - {coverage}")
            else:
                not_indexed.append({'url': url, 'reason': coverage})
                print(f"  ✗ NOT INDEXED - {coverage}")

            print(f"    Last crawl: {crawled}")
            print(f"    Mobile: {inspection.get('mobileUsabilityResult', {}).get('verdict', 'N/A')}")

        except HttpError as e:
            print(f"  ERROR: {e.resp.status} - {e._get_reason()}")
        except Exception as e:
            print(f"  ERROR: {e}")

        print()
        time.sleep(1.2)

    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    print(f"Indexed: {len(indexed)}/{len(priority_urls)}")
    print(f"Not Indexed: {len(not_indexed)}")

    if not_indexed:
        print("\nUnindexed URLs:")
        for item in not_indexed:
            print(f"  - {item['url']}: {item['reason']}")

    # Search performance data
    print(f"\n{'='*60}")
    print("SEARCH PERFORMANCE (Last 28 days)")
    print(f"{'='*60}")

    try:
        perf = service.searchanalytics().query(
            siteUrl=SITE_URL,
            body={
                'startDate': (datetime.now() - timedelta(days=28)).strftime('%Y-%m-%d'),
                'endDate': (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d'),
                'dimensions': ['query'],
                'rowLimit': 10
            }
        ).execute()

        rows = perf.get('rows', [])
        if rows:
            print("\nTop 10 Queries:")
            for row in rows:
                q = row.get('keys', [''])[0]
                clicks = row.get('clicks', 0)
                impressions = row.get('impressions', 0)
                ctr = row.get('ctr', 0) * 100
                pos = row.get('position', 0)
                print(f"  '{q}': {clicks} clicks, {impressions} impressions, {ctr:.1f}% CTR, pos {pos:.1f}")
        else:
            print("  No search data available yet")

    except Exception as e:
        print(f"  Error getting search data: {e}")

    print(f"\n{'='*60}")
    print("DONE")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    main()
