#!/usr/bin/env python3
"""Submit sitemap to Google Search Console"""

import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE_URL = 'https://beginnerfxguide.com/'
SITEMAP_URL = 'https://beginnerfxguide.com/sitemap.xml'
CREDENTIALS_PATH = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'

def main():
    print("\n" + "="*60)
    print("GOOGLE SEARCH CONSOLE - SITEMAP SUBMISSION")
    print("="*60 + "\n")
    
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=['https://www.googleapis.com/auth/webmasters']
    )
    
    service = build('searchconsole', 'v1', credentials=credentials)
    
    # Check current sitemap status
    print("Current sitemaps in GSC:")
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
            print()
    except Exception as e:
        print(f"  Error listing sitemaps: {e}")
    
    # Submit/resubmit sitemap
    print("\nSubmitting sitemap...")
    print("-" * 40)
    try:
        result = service.sitemaps().submit(
            siteUrl=SITE_URL,
            feedpath=SITEMAP_URL
        ).execute()
        
        print(f"✓ Sitemap submitted successfully!")
        print(f"  URL: {SITEMAP_URL}")
        
    except HttpError as e:
        print(f"✗ Failed to submit sitemap: HTTP {e.resp.status}")
        print(f"  Reason: {e._get_reason()}")
    except Exception as e:
        print(f"✗ Error: {e}")
    
    print("\n" + "="*60)
    print("DONE")
    print("="*60 + "\n")

if __name__ == '__main__':
    main()
