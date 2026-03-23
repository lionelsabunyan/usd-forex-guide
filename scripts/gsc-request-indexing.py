#!/usr/bin/env python3
"""
GSC URL Inspection API - Check Indexing Status for All Sitemap Pages
Sitemap.xml ve sitemap-tr.xml'den tüm URL'leri okur, GSC API ile index durumunu kontrol eder.
Sonuçları data/gsc-indexing-status.json'a kaydeder.

Usage:
  python3 scripts/gsc-request-indexing.py              # tüm sitemap URL'leri
  python3 scripts/gsc-request-indexing.py --priority    # sadece öncelikli sayfalar (review, compare, ana sayfalar)
"""

import argparse
import os
import sys
import time
import json
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDENTIALS_PATH = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS', '/home/paperclip/google-credentials.json')
REPO_ROOT = Path(__file__).resolve().parent.parent
SITEMAP_FILES = [REPO_ROOT / 'public/sitemap.xml', REPO_ROOT / 'public/sitemap-tr.xml']
DATA_DIR = REPO_ROOT / 'data'

# Öncelikli URL pattern'leri (--priority modunda sadece bunlar kontrol edilir)
PRIORITY_PATTERNS = [
    '/review/',
    '/compare/',
    '/brokers/',
    '/guides/',
    '/tools/',
    '/blog/',
]
PRIORITY_EXACT = [
    'https://beginnerfxguide.com/',
    'https://beginnerfxguide.com/glossary/',
    'https://beginnerfxguide.com/faq/',
]


def parse_sitemap(sitemap_path: Path) -> list[str]:
    """Parse a sitemap.xml and return all <loc> URLs."""
    if not sitemap_path.exists():
        print(f"  Warning: {sitemap_path} not found, skipping")
        return []
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    return [loc.text.strip() for loc in root.findall('.//s:loc', ns) if loc.text]


def get_all_urls() -> list[str]:
    """Collect all URLs from sitemap files."""
    urls = []
    for sitemap_path in SITEMAP_FILES:
        found = parse_sitemap(sitemap_path)
        print(f"  {sitemap_path.name}: {len(found)} URLs")
        urls.extend(found)
    return sorted(set(urls))


def filter_priority(urls: list[str]) -> list[str]:
    """Filter URLs to only priority pages."""
    priority = []
    for url in urls:
        if url in PRIORITY_EXACT:
            priority.append(url)
            continue
        for pattern in PRIORITY_PATTERNS:
            if pattern in url:
                priority.append(url)
                break
    return priority


def main():
    parser = argparse.ArgumentParser(description='GSC URL Inspection - Check indexing status')
    parser.add_argument('--priority', action='store_true', help='Only check priority pages (reviews, compare, guides)')
    args = parser.parse_args()

    print(f"\n{'='*70}")
    print("GSC URL INSPECTION - INDEXING STATUS CHECK")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*70}\n")

    # Ensure data directory exists
    DATA_DIR.mkdir(exist_ok=True)

    # Get URLs from sitemap
    print("Reading sitemap files...")
    all_urls = get_all_urls()

    if args.priority:
        urls = filter_priority(all_urls)
        print(f"\nPriority mode: {len(urls)} priority URLs (from {len(all_urls)} total)")
    else:
        urls = all_urls
        print(f"\nFull mode: {len(urls)} URLs to check")

    if not urls:
        print("No URLs found in sitemaps!")
        sys.exit(1)

    # Initialize GSC API
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/webmasters']
    )
    service = build('searchconsole', 'v1', credentials=credentials)

    results = {
        'indexed': [],
        'not_indexed': [],
        'errors': []
    }

    total = len(urls)

    for i, url in enumerate(urls):
        print(f"\n[{i+1}/{total}] Checking: {url}")

        try:
            result = service.urlInspection().index().inspect(
                body={
                    'inspectionUrl': url,
                    'siteUrl': SITE_URL
                }
            ).execute()

            inspection = result.get('inspectionResult', {})
            idx_result = inspection.get('indexStatusResult', {})
            mobile = inspection.get('mobileUsabilityResult', {})
            rich_results = inspection.get('richResultsResult', {})

            coverage = idx_result.get('coverageState', 'UNKNOWN')
            verdict = idx_result.get('verdict', 'UNKNOWN')
            last_crawl = idx_result.get('lastCrawlTime', 'Never')
            crawled_as = idx_result.get('crawledAs', 'UNKNOWN')
            robots_txt = idx_result.get('robotsTxtState', 'UNKNOWN')
            indexing = idx_result.get('indexingState', 'UNKNOWN')
            mobile_verdict = mobile.get('verdict', 'N/A')
            rich_verdict = rich_results.get('verdict', 'N/A')

            entry = {
                'url': url,
                'coverage': coverage,
                'verdict': verdict,
                'last_crawl': last_crawl,
                'crawled_as': crawled_as,
                'robots_txt': robots_txt,
                'indexing': indexing,
                'mobile': mobile_verdict,
                'rich_results': rich_verdict,
            }

            if verdict == 'PASS' or 'indexed' in coverage.lower():
                print(f"  ✅ INDEXED - {coverage} | Mobile: {mobile_verdict} | Rich: {rich_verdict}")
                results['indexed'].append(entry)
            else:
                print(f"  ❌ NOT INDEXED - {coverage}")
                print(f"     Last Crawl: {last_crawl} | Crawled As: {crawled_as}")
                print(f"     Robots: {robots_txt} | Indexing: {indexing}")
                if rich_verdict != 'N/A':
                    print(f"     Rich Results: {rich_verdict}")
                results['not_indexed'].append(entry)

            # Rate limiting - GSC API has quota limits
            time.sleep(1.5)

        except HttpError as e:
            if e.resp.status == 429:
                print(f"  ⚠️ RATE LIMITED - Waiting 60 seconds...")
                time.sleep(60)
                continue
            else:
                print(f"  ❌ ERROR: HTTP {e.resp.status}")
                results['errors'].append({'url': url, 'error': str(e)})
        except Exception as e:
            print(f"  ❌ ERROR: {e}")
            results['errors'].append({'url': url, 'error': str(e)})

    # Summary
    print(f"\n{'='*70}")
    print("SUMMARY")
    print(f"{'='*70}")
    print(f"Total URLs Checked: {total}")
    print(f"Already Indexed: {len(results['indexed'])}")
    print(f"Not Indexed: {len(results['not_indexed'])}")
    print(f"Errors: {len(results['errors'])}")

    if results['not_indexed']:
        print(f"\n📋 UNINDEXED PAGES ({len(results['not_indexed'])}):")
        for item in results['not_indexed']:
            print(f"  - {item['url']}")
            print(f"    Status: {item['coverage']} | Robots: {item['robots_txt']}")

    # Check for mobile issues
    mobile_issues = [e for e in results['indexed'] + results['not_indexed'] if e.get('mobile') not in ('PASS', 'N/A')]
    if mobile_issues:
        print(f"\n📱 MOBILE USABILITY ISSUES ({len(mobile_issues)}):")
        for item in mobile_issues:
            print(f"  - {item['url']}: {item['mobile']}")

    # Check for rich results issues
    rich_issues = [e for e in results['indexed'] + results['not_indexed'] if e.get('rich_results') not in ('PASS', 'N/A', 'VERDICT_UNSPECIFIED')]
    if rich_issues:
        print(f"\n⚡ RICH RESULTS ISSUES ({len(rich_issues)}):")
        for item in rich_issues:
            print(f"  - {item['url']}: {item['rich_results']}")

    # Save results
    report_path = DATA_DIR / 'gsc-indexing-status.json'
    report_data = {
        'timestamp': datetime.now().isoformat(),
        'mode': 'priority' if args.priority else 'full',
        'total_checked': total,
        'indexed_count': len(results['indexed']),
        'not_indexed_count': len(results['not_indexed']),
        'error_count': len(results['errors']),
        'results': results
    }
    with open(report_path, 'w') as f:
        json.dump(report_data, f, indent=2)
    print(f"\n📁 Results saved to: {report_path}")

    print(f"\n{'='*70}")
    print(f"Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*70}\n")

    return results


if __name__ == '__main__':
    main()
