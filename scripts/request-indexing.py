#!/usr/bin/env python3
"""Request indexing for priority URLs via Google Indexing API"""

import time
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

CREDENTIALS_PATH = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'

# Priority URLs to request indexing for
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
]

def main():
    print("\n" + "="*60)
    print("REQUESTING GOOGLE INDEXING FOR PRIORITY URLS")
    print("="*60 + "\n")
    
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/indexing']
    )
    
    service = build('indexing', 'v3', credentials=credentials)
    
    success = 0
    failed = 0
    
    for url in PRIORITY_URLS:
        print(f"Requesting indexing for: {url}")
        try:
            result = service.urlNotifications().publish(
                body={
                    'url': url,
                    'type': 'URL_UPDATED'
                }
            ).execute()
            
            notify_time = result.get('urlNotificationMetadata', {}).get('latestUpdate', {}).get('notifyTime', 'unknown')
            print(f"  ✓ SUCCESS - Notified at: {notify_time}")
            success += 1
            time.sleep(1)
            
        except HttpError as e:
            if e.resp.status == 403:
                print(f"  ✗ FAILED - Indexing API quota exceeded or not enabled")
                print(f"    Note: Indexing API has strict quota limits (200 requests/day)")
            else:
                print(f"  ✗ FAILED - HTTP {e.resp.status}: {e._get_reason()}")
            failed += 1
        except Exception as e:
            print(f"  ✗ FAILED - {e}")
            failed += 1
            
    print("\n" + "="*60)
    print(f"SUMMARY: {success} successful, {failed} failed")
    print("="*60 + "\n")
    
    if failed > 0 and success == 0:
        print("NOTE: The Indexing API is typically only for JobPosting and BroadcastEvent schema.")
        print("For regular web pages, focus on:")
        print("  1. Sitemap submission via Search Console")
        print("  2. URL Inspection tool to request crawling")
        print("  3. Building quality backlinks")
        
if __name__ == '__main__':
    main()
