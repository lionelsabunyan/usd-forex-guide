#!/usr/bin/env python3
"""
Quick index check — Priority pages via GSC URL Inspection API.
Reads URLs from sitemap.xml, filters to priority pages (reviews, compare, main pages).

Usage:
  python3 scripts/quick-index-check.py          # priority pages only
  python3 scripts/quick-index-check.py --all     # all sitemap URLs
"""

import argparse
import os
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDS = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS', '/home/paperclip/google-credentials.json')
REPO_ROOT = Path(__file__).resolve().parent.parent
SITEMAP_FILES = [REPO_ROOT / 'public/sitemap.xml', REPO_ROOT / 'public/sitemap-tr.xml']

# Priority: review, compare, and main nav pages
PRIORITY_PREFIXES = ['/review/', '/compare/', '/brokers/', '/guides/', '/tools/']
PRIORITY_EXACT_PATHS = ['/', '/blog/', '/glossary/', '/faq/']


def parse_sitemap(sitemap_path: Path) -> list[str]:
    if not sitemap_path.exists():
        return []
    tree = ET.parse(sitemap_path)
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    return [loc.text.strip() for loc in tree.getroot().findall('.//s:loc', ns) if loc.text]


def get_urls(all_mode: bool) -> list[str]:
    urls = []
    for sp in SITEMAP_FILES:
        urls.extend(parse_sitemap(sp))
    urls = sorted(set(urls))

    if all_mode:
        return urls

    # Filter to priority pages
    priority = []
    for url in urls:
        path = url.replace(SITE_URL.rstrip('/'), '')
        if not path:
            path = '/'
        if path in PRIORITY_EXACT_PATHS:
            priority.append(url)
            continue
        if any(path.startswith(p) for p in PRIORITY_PREFIXES):
            priority.append(url)
    return priority


def main():
    parser = argparse.ArgumentParser(description='Quick GSC index check')
    parser.add_argument('--all', action='store_true', help='Check all sitemap URLs instead of priority only')
    args = parser.parse_args()

    urls = get_urls(args.all)
    mode = 'ALL' if args.all else 'PRIORITY'

    credentials = service_account.Credentials.from_service_account_file(
        CREDS, scopes=['https://www.googleapis.com/auth/webmasters']
    )
    service = build('searchconsole', 'v1', credentials=credentials)

    print(f"\n{'='*60}")
    print(f"GSC INDEX STATUS CHECK — {mode} ({len(urls)} URLs)")
    print('=' * 60 + '\n')

    indexed = 0
    not_indexed = 0
    errors = 0
    results = []

    for i, url in enumerate(urls):
        page_name = url.replace(SITE_URL, '').rstrip('/') or 'homepage'
        try:
            r = service.urlInspection().index().inspect(
                body={'inspectionUrl': url, 'siteUrl': SITE_URL}
            ).execute()
            idx = r.get('inspectionResult', {}).get('indexStatusResult', {})
            status = idx.get('coverageState', '?')
            verdict = idx.get('verdict', '?')

            if verdict == 'PASS' or 'indexed' in status.lower():
                print(f"✅ [{i+1:02d}] INDEXED: {page_name}")
                indexed += 1
                results.append(('indexed', page_name, status))
            else:
                print(f"❌ [{i+1:02d}] {status[:40]}: {page_name}")
                not_indexed += 1
                results.append(('not_indexed', page_name, status))

            sys.stdout.flush()
            time.sleep(1.2)
        except HttpError as e:
            print(f"⚠️ [{i+1:02d}] HTTP ERROR: {page_name} - {e}")
            errors += 1
        except Exception as e:
            print(f"⚠️ [{i+1:02d}] ERROR: {page_name} - {e}")
            errors += 1

    print(f"\n{'='*60}")
    print(f"RESULTS: {indexed} indexed | {not_indexed} not indexed | {errors} errors")
    print(f"Total checked: {len(urls)}")
    print('=' * 60)

    if not_indexed > 0:
        print("\n❌ NOT INDEXED PAGES:")
        for status, page, reason in results:
            if status == 'not_indexed':
                print(f"  - {page} — {reason}")
    print()


if __name__ == '__main__':
    main()
