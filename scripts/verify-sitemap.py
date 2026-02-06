#!/usr/bin/env python3
"""Verify sitemap submission after waiting"""

import time
import sys
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

SITE_URL = 'https://beginnerfxguide.com/'
SITEMAP_URL = 'https://beginnerfxguide.com/sitemap.xml'
CREDENTIALS_PATH = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'

def main():
    wait_minutes = int(sys.argv[1]) if len(sys.argv) > 1 else 10
    
    print(f"\n{'='*60}")
    print(f"SITEMAP VERIFICATION - Waiting {wait_minutes} minutes")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}\n")
    
    # Wait
    for i in range(wait_minutes):
        print(f"Waiting... {i+1}/{wait_minutes} minutes elapsed")
        time.sleep(60)
        
    print(f"\n{'='*60}")
    print("VERIFYING SITEMAP STATUS")
    print(f"{'='*60}\n")
    
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/webmasters']
    )
    
    service = build('searchconsole', 'v1', credentials=credentials)
    
    try:
        sitemaps = service.sitemaps().list(siteUrl=SITE_URL).execute()
        
        for sm in sitemaps.get('sitemap', []):
            if sm.get('path') == SITEMAP_URL:
                print(f"Sitemap: {sm.get('path')}")
                print(f"  Last Submitted: {sm.get('lastSubmitted')}")
                print(f"  Last Downloaded: {sm.get('lastDownloaded')}")
                print(f"  Pending: {sm.get('isPending', False)}")
                print(f"  Warnings: {sm.get('warnings', 0)}")
                print(f"  Errors: {sm.get('errors', 0)}")
                
                for c in sm.get('contents', []):
                    print(f"  Content Type: {c.get('type')}")
                    print(f"    Submitted: {c.get('submitted')}")
                    print(f"    Indexed: {c.get('indexed')}")
                    
                # Check if submission was recent
                last_submitted = sm.get('lastSubmitted', '')
                if '2026-02-05' in last_submitted:
                    print(f"\n✓ VERIFIED: Sitemap was resubmitted today!")
                else:
                    print(f"\n⚠ Note: Last submission timestamp: {last_submitted}")
                    
    except Exception as e:
        print(f"Error verifying sitemap: {e}")
        
    print(f"\n{'='*60}")
    print(f"Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
