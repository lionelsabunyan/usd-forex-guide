#!/usr/bin/env python3
"""
IndexNow API - Hızlı Bing/Yandex Indexing
https://www.indexnow.org/
"""

import requests
import json

INDEXNOW_KEY = "b8f3e2a1c4d5e6f7a8b9c0d1e2f3a4b5"
HOST = "beginnerfxguide.com"

# Öncelikli URL'ler
URLS = [
    "https://beginnerfxguide.com/",
    "https://beginnerfxguide.com/brokers",
    "https://beginnerfxguide.com/compare",
    "https://beginnerfxguide.com/guides",
    "https://beginnerfxguide.com/tools",
    "https://beginnerfxguide.com/blog",
    "https://beginnerfxguide.com/glossary",
    "https://beginnerfxguide.com/review/fxglory",
    "https://beginnerfxguide.com/review/hankotrade",
    "https://beginnerfxguide.com/review/midasfx",
    "https://beginnerfxguide.com/review/n1cm",
    "https://beginnerfxguide.com/review/oanda",
    "https://beginnerfxguide.com/review/forexcom",
    "https://beginnerfxguide.com/review/etoro",
    "https://beginnerfxguide.com/review/exness",
    "https://beginnerfxguide.com/review/pepperstone",
    "https://beginnerfxguide.com/review/xm",
    "https://beginnerfxguide.com/guides/forex-trading-usa",
    "https://beginnerfxguide.com/tools/pip-calculator",
    "https://beginnerfxguide.com/blog/best-forex-brokers-us-traders-2026",
]

def submit_to_indexnow():
    print("\n" + "="*60)
    print("INDEXNOW SUBMISSION - Bing & Yandex Fast Indexing")
    print("="*60 + "\n")
    
    # IndexNow API endpoint (Bing)
    endpoint = "https://api.indexnow.org/indexnow"
    
    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://{HOST}/{INDEXNOW_KEY}.txt",
        "urlList": URLS
    }
    
    headers = {
        "Content-Type": "application/json; charset=utf-8"
    }
    
    print(f"Submitting {len(URLS)} URLs to IndexNow...")
    print(f"Key: {INDEXNOW_KEY}")
    print(f"Host: {HOST}")
    print()
    
    try:
        response = requests.post(endpoint, json=payload, headers=headers)
        
        if response.status_code == 200:
            print("✅ SUCCESS! All URLs submitted to IndexNow")
            print("   Bing and Yandex will be notified immediately")
        elif response.status_code == 202:
            print("✅ ACCEPTED! URLs queued for processing")
        else:
            print(f"⚠️ Response: {response.status_code}")
            print(f"   Body: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n" + "="*60)
    print("URLs Submitted:")
    for url in URLS:
        print(f"  • {url}")
    print("="*60 + "\n")

if __name__ == "__main__":
    submit_to_indexnow()
