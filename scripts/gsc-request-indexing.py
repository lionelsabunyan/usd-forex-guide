#!/usr/bin/env python3
"""
GSC URL Inspection API - Request Indexing for All Unindexed Pages
Bu script GSC API üzerinden tüm unindexed sayfalar için indexing request yapar.
"""

import time
import json
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
CREDENTIALS_PATH = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'

# Öncelik sırasına göre tüm URL'ler
ALL_URLS = [
    # Ana Sayfalar (En Yüksek Öncelik)
    'https://beginnerfxguide.com/brokers',
    'https://beginnerfxguide.com/compare',
    'https://beginnerfxguide.com/guides',
    'https://beginnerfxguide.com/tools',
    'https://beginnerfxguide.com/blog',
    'https://beginnerfxguide.com/glossary',
    'https://beginnerfxguide.com/faq',
    'https://beginnerfxguide.com/about',
    'https://beginnerfxguide.com/contact',
    
    # Broker Reviews (Yüksek Öncelik - Para Getiren Sayfalar)
    'https://beginnerfxguide.com/review/fxglory',
    'https://beginnerfxguide.com/review/hankotrade',
    'https://beginnerfxguide.com/review/midasfx',
    'https://beginnerfxguide.com/review/n1cm',
    'https://beginnerfxguide.com/review/oanda',
    'https://beginnerfxguide.com/review/forexcom',
    'https://beginnerfxguide.com/review/ig-markets',
    'https://beginnerfxguide.com/review/interactive-brokers',
    'https://beginnerfxguide.com/review/tastyfx',
    'https://beginnerfxguide.com/review/charles-schwab',
    'https://beginnerfxguide.com/review/etoro',
    'https://beginnerfxguide.com/review/fxpro',
    'https://beginnerfxguide.com/review/avatrade',
    'https://beginnerfxguide.com/review/hfm',
    'https://beginnerfxguide.com/review/lmfx',
    'https://beginnerfxguide.com/review/coinexx',
    'https://beginnerfxguide.com/review/plexytrade',
    'https://beginnerfxguide.com/review/exness',
    'https://beginnerfxguide.com/review/pepperstone',
    'https://beginnerfxguide.com/review/xm',
    'https://beginnerfxguide.com/review/fxtm',
    'https://beginnerfxguide.com/review/fbs',
    
    # Guide Sayfaları (Pillar Content)
    'https://beginnerfxguide.com/guides/forex-trading-usa',
    'https://beginnerfxguide.com/guides/beginners-guide',
    'https://beginnerfxguide.com/guides/us-forex-regulations',
    'https://beginnerfxguide.com/guides/broker-comparison',
    'https://beginnerfxguide.com/guides/risk-management',
    'https://beginnerfxguide.com/guides/technical-analysis',
    'https://beginnerfxguide.com/guides/fundamental-analysis',
    'https://beginnerfxguide.com/guides/how-we-review',
    
    # Tools
    'https://beginnerfxguide.com/tools/pip-calculator',
    'https://beginnerfxguide.com/tools/position-size-calculator',
    'https://beginnerfxguide.com/tools/margin-calculator',
    'https://beginnerfxguide.com/tools/profit-loss-calculator',
    'https://beginnerfxguide.com/tools/forex-tax-calculator',
    'https://beginnerfxguide.com/tools/economic-calendar',
    
    # Blog Posts
    'https://beginnerfxguide.com/blog/best-forex-brokers-us-traders-2026',
    'https://beginnerfxguide.com/blog/how-to-open-offshore-forex-account-usa',
    'https://beginnerfxguide.com/blog/how-to-start-forex-trading-usa-2026',
    'https://beginnerfxguide.com/blog/why-us-traders-choose-offshore-brokers',
    'https://beginnerfxguide.com/blog/cfdc-vs-offshore-forex-trading',
    'https://beginnerfxguide.com/blog/crypto-deposits-forex-trading',
    'https://beginnerfxguide.com/blog/forex-trading-taxes-usa',
    'https://beginnerfxguide.com/blog/fxglory-vs-hankotrade-comparison',
    'https://beginnerfxguide.com/blog/forex-trading-psychology-emotions',
    'https://beginnerfxguide.com/blog/currency-pairs-explained-beginners',
    'https://beginnerfxguide.com/blog/best-forex-strategies-beginners',
    'https://beginnerfxguide.com/blog/forex-scams-avoid',
    'https://beginnerfxguide.com/blog/mt4-vs-mt5-which-platform',
    'https://beginnerfxguide.com/blog/forex-leverage-explained',
    'https://beginnerfxguide.com/blog/forex-spreads-explained',
    'https://beginnerfxguide.com/blog/forex-demo-account-guide',
    'https://beginnerfxguide.com/blog/forex-risk-management-guide',
    'https://beginnerfxguide.com/blog/forex-trading-hours-best-times',
    
    # Comparison & Resources
    'https://beginnerfxguide.com/compare/midasfx-vs-hankotrade',
    'https://beginnerfxguide.com/resources/us-forex-checklist',
]

def main():
    print(f"\n{'='*70}")
    print("GSC URL INSPECTION - BULK INDEXING REQUEST")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*70}\n")
    
    # Initialize
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/webmasters']
    )
    service = build('searchconsole', 'v1', credentials=credentials)
    
    results = {
        'indexed': [],
        'not_indexed': [],
        'inspection_requested': [],
        'errors': []
    }
    
    total = len(ALL_URLS)
    
    for i, url in enumerate(ALL_URLS):
        print(f"\n[{i+1}/{total}] Checking: {url}")
        
        try:
            # URL Inspection API call
            result = service.urlInspection().index().inspect(
                body={
                    'inspectionUrl': url,
                    'siteUrl': SITE_URL
                }
            ).execute()
            
            inspection = result.get('inspectionResult', {})
            idx_result = inspection.get('indexStatusResult', {})
            
            coverage = idx_result.get('coverageState', 'UNKNOWN')
            verdict = idx_result.get('verdict', 'UNKNOWN')
            last_crawl = idx_result.get('lastCrawlTime', 'Never')
            
            if verdict == 'PASS' or 'indexed' in coverage.lower():
                print(f"  ✅ ALREADY INDEXED - {coverage}")
                results['indexed'].append(url)
            else:
                print(f"  ⏳ NOT INDEXED - {coverage}")
                print(f"     Last Crawl: {last_crawl}")
                results['not_indexed'].append({
                    'url': url,
                    'status': coverage,
                    'last_crawl': last_crawl
                })
                
            # Rate limiting - GSC API has quota limits
            time.sleep(1.5)
            
        except HttpError as e:
            if e.resp.status == 429:
                print(f"  ⚠️ RATE LIMITED - Waiting 60 seconds...")
                time.sleep(60)
                # Retry
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
            print(f"    Status: {item['status']}")
    
    # Save results
    report_path = '/Users/sedo/Downloads/Skill/data/gsc-indexing-status.json'
    with open(report_path, 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'results': results
        }, f, indent=2)
    print(f"\n📁 Results saved to: {report_path}")
    
    print(f"\n{'='*70}")
    print(f"Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*70}\n")
    
    return results

if __name__ == '__main__':
    main()
