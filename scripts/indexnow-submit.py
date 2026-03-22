#!/usr/bin/env python3
"""
IndexNow API - Hızlı Bing/Yandex Indexing
https://www.indexnow.org/

Tüm sitemap URL'lerini IndexNow ile bildirir.
Trailing slash ZORUNLU (Cloudflare Pages + canonical tutarlılığı).
"""

import requests
import json
import sys
import os

INDEXNOW_KEY = os.environ.get('INDEXNOW_KEY', '')
HOST = "beginnerfxguide.com"

# Tüm sitemap URL'leri — trailing slash ile
URLS = [
    # Main Pages
    "https://beginnerfxguide.com/",
    "https://beginnerfxguide.com/brokers/",
    "https://beginnerfxguide.com/brokers/australia/",
    "https://beginnerfxguide.com/brokers/uk/",
    "https://beginnerfxguide.com/compare/",
    "https://beginnerfxguide.com/guides/",
    "https://beginnerfxguide.com/tools/",
    "https://beginnerfxguide.com/blog/",
    "https://beginnerfxguide.com/faq/",
    "https://beginnerfxguide.com/glossary/",
    "https://beginnerfxguide.com/about/",
    "https://beginnerfxguide.com/contact/",

    # Broker Reviews (17 — kritik öncelikli)
    "https://beginnerfxguide.com/review/oanda/",
    "https://beginnerfxguide.com/review/forexcom/",
    "https://beginnerfxguide.com/review/ig-markets/",
    "https://beginnerfxguide.com/review/interactive-brokers/",
    "https://beginnerfxguide.com/review/tastyfx/",
    "https://beginnerfxguide.com/review/charles-schwab/",
    "https://beginnerfxguide.com/review/etoro/",
    "https://beginnerfxguide.com/review/fxpro/",
    "https://beginnerfxguide.com/review/avatrade/",
    "https://beginnerfxguide.com/review/coinexx/",
    "https://beginnerfxguide.com/review/plexytrade/",
    "https://beginnerfxguide.com/review/pepperstone/",
    "https://beginnerfxguide.com/review/fxtm/",
    "https://beginnerfxguide.com/review/fbs/",
    "https://beginnerfxguide.com/review/fxglory/",
    "https://beginnerfxguide.com/review/hankotrade/",
    "https://beginnerfxguide.com/review/n1cm/",
    "https://beginnerfxguide.com/review/midasfx/",
    "https://beginnerfxguide.com/review/hfm/",
    "https://beginnerfxguide.com/review/lmfx/",
    "https://beginnerfxguide.com/review/exness/",
    "https://beginnerfxguide.com/review/xm/",

    # Compare Pages
    "https://beginnerfxguide.com/compare/midasfx-vs-hankotrade/",
    "https://beginnerfxguide.com/compare/oanda-vs-forexcom/",
    "https://beginnerfxguide.com/compare/etoro-vs-xm/",
    "https://beginnerfxguide.com/compare/pepperstone-vs-exness/",

    # Guides
    "https://beginnerfxguide.com/guides/forex-trading-usa/",
    "https://beginnerfxguide.com/guides/beginners-guide/",
    "https://beginnerfxguide.com/guides/us-forex-regulations/",
    "https://beginnerfxguide.com/guides/broker-comparison/",
    "https://beginnerfxguide.com/guides/risk-management/",
    "https://beginnerfxguide.com/guides/technical-analysis/",
    "https://beginnerfxguide.com/guides/fundamental-analysis/",
    "https://beginnerfxguide.com/guides/how-we-review/",

    # Tools
    "https://beginnerfxguide.com/tools/pip-calculator/",
    "https://beginnerfxguide.com/tools/position-size-calculator/",
    "https://beginnerfxguide.com/tools/margin-calculator/",
    "https://beginnerfxguide.com/tools/profit-loss-calculator/",
    "https://beginnerfxguide.com/tools/forex-tax-calculator/",
    "https://beginnerfxguide.com/tools/economic-calendar/",

    # Resources
    "https://beginnerfxguide.com/resources/us-forex-checklist/",
    "https://beginnerfxguide.com/resources/infographics/",

    # Blog Posts
    "https://beginnerfxguide.com/blog/how-to-start-forex-trading-usa-2026/",
    "https://beginnerfxguide.com/blog/best-forex-brokers-us-traders-2026/",
    "https://beginnerfxguide.com/blog/how-to-open-offshore-forex-account-usa/",
    "https://beginnerfxguide.com/blog/why-us-traders-choose-offshore-brokers/",
    "https://beginnerfxguide.com/blog/cfdc-vs-offshore-forex-trading/",
    "https://beginnerfxguide.com/blog/crypto-deposits-forex-trading/",
    "https://beginnerfxguide.com/blog/forex-trading-taxes-usa/",
    "https://beginnerfxguide.com/blog/fxglory-vs-hankotrade-comparison/",
    "https://beginnerfxguide.com/blog/forex-trading-psychology-emotions/",
    "https://beginnerfxguide.com/blog/currency-pairs-explained-beginners/",
    "https://beginnerfxguide.com/blog/best-forex-strategies-beginners/",
    "https://beginnerfxguide.com/blog/forex-scams-avoid/",
    "https://beginnerfxguide.com/blog/mt4-vs-mt5-which-platform/",
    "https://beginnerfxguide.com/blog/forex-leverage-explained/",
    "https://beginnerfxguide.com/blog/forex-spreads-explained/",
    "https://beginnerfxguide.com/blog/forex-demo-account-guide/",
    "https://beginnerfxguide.com/blog/forex-risk-management-guide/",
    "https://beginnerfxguide.com/blog/forex-trading-hours-best-times/",

    # Legal
    "https://beginnerfxguide.com/legal/privacy/",
    "https://beginnerfxguide.com/legal/terms/",
    "https://beginnerfxguide.com/legal/disclaimer/",
    "https://beginnerfxguide.com/legal/affiliate-disclosure/",
]

def submit_to_indexnow(urls=None):
    if not INDEXNOW_KEY:
        print("❌ INDEXNOW_KEY environment variable is not set")
        sys.exit(1)
    target_urls = urls or URLS
    print("\n" + "="*60)
    print("INDEXNOW SUBMISSION - Bing & Yandex Fast Indexing")
    print("="*60 + "\n")

    # IndexNow batch limit is 10000
    endpoint = "https://api.indexnow.org/indexnow"

    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://{HOST}/{INDEXNOW_KEY}.txt",
        "urlList": target_urls
    }

    headers = {
        "Content-Type": "application/json; charset=utf-8"
    }

    print(f"Submitting {len(target_urls)} URLs to IndexNow...")
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
    for url in target_urls:
        print(f"  • {url}")
    print("="*60 + "\n")

    return response.status_code if 'response' in dir() else None

if __name__ == "__main__":
    submit_to_indexnow()
