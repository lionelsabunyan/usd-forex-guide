#!/usr/bin/env python3
"""Quick SEO check - samples a few important pages"""

import os
import json
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDENTIALS_PATH = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'

# Priority URLs to check
PRIORITY_URLS = [
    'https://beginnerfxguide.com/',
    'https://beginnerfxguide.com/brokers',
    'https://beginnerfxguide.com/compare',
    'https://beginnerfxguide.com/guides',
    'https://beginnerfxguide.com/tools',
    'https://beginnerfxguide.com/review/fxglory',
    'https://beginnerfxguide.com/review/hankotrade',
    'https://beginnerfxguide.com/review/midasfx',
    'https://beginnerfxguide.com/blog/best-forex-brokers-us-traders-2026',
    'https://beginnerfxguide.com/glossary',
]

def main():
    print(f"\n{'='*60}")
    print("QUICK SEO CHECK - {datetime.now()}")
    print(f"{'='*60}\n")
    
    # Initialize
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/webmasters']
    )
    service = build('searchconsole', 'v1', credentials=credentials)
    
    # Check sitemap status first
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
    
    print(f"\n{'='*60}")
    print("URL INSPECTION (Priority Pages)")
    print(f"{'='*60}\n")
    
    indexed = []
    not_indexed = []
    
    for url in PRIORITY_URLS:
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
    
    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    print(f"Indexed: {len(indexed)}/{len(PRIORITY_URLS)}")
    print(f"Not Indexed: {len(not_indexed)}")
    
    if not_indexed:
        print("\nUnindexed URLs:")
        for item in not_indexed:
            print(f"  - {item['url']}: {item['reason']}")
            
    # Get search performance data
    print(f"\n{'='*60}")
    print("SEARCH PERFORMANCE (Last 28 days)")
    print(f"{'='*60}")
    
    try:
        perf = service.searchanalytics().query(
            siteUrl=SITE_URL,
            body={
                'startDate': '2026-01-08',
                'endDate': '2026-02-05',
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
