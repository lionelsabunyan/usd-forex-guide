#!/usr/bin/env python3
"""
IndexNow API — Automatic Bing/Yandex Fast Indexing

Two modes:
  1. --changed  (default): git diff ile son commit'teki değişen sayfaları bulur,
                           sitemap.xml'den eşleşen URL'leri IndexNow'a gönderir.
  2. --all:                Sitemap.xml'deki TÜM URL'leri gönderir.

Usage:
  python3 scripts/indexnow-submit.py              # sadece değişen sayfalar
  python3 scripts/indexnow-submit.py --all         # tüm sitemap URL'leri
  python3 scripts/indexnow-submit.py --dry-run     # submit etmeden göster
"""

import argparse
import os
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import requests

# ── Config ──────────────────────────────────────────────────────────────────
INDEXNOW_KEY = os.environ.get("INDEXNOW_KEY", "")
HOST = "beginnerfxguide.com"
SITE_URL = f"https://{HOST}"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

REPO_ROOT = Path(__file__).resolve().parent.parent
SITEMAP_FILES = ["public/sitemap.xml", "public/sitemap-tr.xml"]

# Source paths that map to site pages
PAGE_SOURCE_PATTERNS = [
    r"^src/pages/",
    r"^src/components/tr/",
    r"^public/sitemap.*\.xml$",
]


def parse_sitemap(sitemap_path: Path) -> list[str]:
    """Parse a sitemap.xml and return all <loc> URLs."""
    if not sitemap_path.exists():
        return []
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [loc.text.strip() for loc in root.findall(".//s:loc", ns) if loc.text]


def get_all_sitemap_urls() -> list[str]:
    """Collect URLs from all sitemap files."""
    urls = []
    for rel_path in SITEMAP_FILES:
        full_path = REPO_ROOT / rel_path
        urls.extend(parse_sitemap(full_path))
    return sorted(set(urls))


def get_changed_files(compare_ref: str = "HEAD~1") -> list[str]:
    """Get list of changed files from git diff against compare_ref."""
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", compare_ref, "HEAD"],
            capture_output=True,
            text=True,
            cwd=REPO_ROOT,
        )
        if result.returncode != 0:
            # Fallback: diff staged + unstaged against HEAD
            result = subprocess.run(
                ["git", "diff", "--name-only", "HEAD"],
                capture_output=True,
                text=True,
                cwd=REPO_ROOT,
            )
        return [f.strip() for f in result.stdout.strip().split("\n") if f.strip()]
    except Exception as e:
        print(f"⚠️  git diff failed: {e}")
        return []


def file_to_url_paths(filepath: str) -> list[str]:
    """
    Convert a source file path to possible URL paths on the site.
    e.g. src/pages/FAQPage.tsx → /faq/
         src/pages/brokers/AustraliaPage.tsx → /brokers/australia/
         src/pages/guides/BestForexTradingApps.tsx → /guides/best-forex-trading-apps/
    """
    paths = []

    # Direct page mapping from src/pages/
    if filepath.startswith("src/pages/"):
        rel = filepath.replace("src/pages/", "").replace(".tsx", "").replace(".ts", "")

        # Handle nested paths like compare/MT4vsMT5
        parts = rel.split("/")

        # Convert CamelCase to kebab-case and strip "Page" suffix
        def to_slug(name: str) -> str:
            name = re.sub(r"Page$", "", name)
            # CamelCase → kebab-case
            slug = re.sub(r"(?<=[a-z])(?=[A-Z])", "-", name)
            slug = re.sub(r"(?<=[A-Z])(?=[A-Z][a-z])", "-", slug)
            return slug.lower()

        slugs = [to_slug(p) for p in parts]
        url_path = "/" + "/".join(slugs) + "/"
        paths.append(url_path)

    # TR components
    elif filepath.startswith("src/components/tr/"):
        paths.append("/tr/")

    # Broker data changes affect review pages
    elif filepath.startswith("src/lib/reviewData/"):
        broker_file = filepath.split("/")[-1].replace(".ts", "")
        paths.append(f"/review/{broker_file}/")
    elif filepath == "src/lib/brokers.ts":
        paths.append("/brokers/")
    elif filepath == "src/lib/brokersTR.ts":
        paths.append("/tr/")

    return paths


def match_changed_urls(changed_files: list[str], all_urls: list[str]) -> list[str]:
    """Match changed source files to sitemap URLs."""
    # Check if any files are page-relevant
    relevant_files = []
    for f in changed_files:
        for pattern in PAGE_SOURCE_PATTERNS:
            if re.match(pattern, f):
                relevant_files.append(f)
                break
        # Also check lib files that affect pages
        if f.startswith("src/lib/"):
            relevant_files.append(f)

    if not relevant_files:
        return []

    # Convert file paths to URL paths
    candidate_paths = set()
    for f in relevant_files:
        candidate_paths.update(file_to_url_paths(f))

    # If sitemap itself changed, submit everything
    if any("sitemap" in f for f in changed_files):
        return all_urls

    # Match candidates against sitemap URLs
    matched = []
    for url in all_urls:
        url_path = url.replace(SITE_URL, "")
        if url_path in candidate_paths:
            matched.append(url)

    return sorted(set(matched))


def submit_to_indexnow(urls: list[str], dry_run: bool = False) -> int | None:
    """Submit URLs to IndexNow API."""
    if not urls:
        print("ℹ️  No URLs to submit.")
        return None

    if not INDEXNOW_KEY:
        print("❌ INDEXNOW_KEY environment variable is not set")
        sys.exit(1)

    print("\n" + "=" * 60)
    print("INDEXNOW SUBMISSION — Bing & Yandex Fast Indexing")
    print("=" * 60)
    print(f"\n📊 URLs to submit: {len(urls)}")
    print(f"🔑 Key: {INDEXNOW_KEY[:8]}...")
    print(f"🌐 Host: {HOST}\n")

    for url in urls:
        print(f"  • {url}")

    if dry_run:
        print("\n🔍 DRY RUN — no submission made")
        return None

    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://{HOST}/{INDEXNOW_KEY}.txt",
        "urlList": urls,
    }

    headers = {"Content-Type": "application/json; charset=utf-8"}

    try:
        response = requests.post(INDEXNOW_ENDPOINT, json=payload, headers=headers)

        if response.status_code in (200, 202):
            print(f"\n✅ SUCCESS ({response.status_code})! URLs submitted to IndexNow")
            print("   Bing and Yandex will be notified.")
        else:
            print(f"\n⚠️  Response: {response.status_code}")
            print(f"   Body: {response.text}")

        return response.status_code
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(description="IndexNow URL submission for beginnerfxguide.com")
    parser.add_argument("--all", action="store_true", help="Submit all sitemap URLs")
    parser.add_argument("--dry-run", action="store_true", help="Show URLs without submitting")
    parser.add_argument("--ref", default="HEAD~1", help="Git ref to diff against (default: HEAD~1)")
    args = parser.parse_args()

    all_urls = get_all_sitemap_urls()
    print(f"📋 Total sitemap URLs: {len(all_urls)}")

    if args.all:
        print("📤 Mode: ALL sitemap URLs")
        submit_to_indexnow(all_urls, dry_run=args.dry_run)
    else:
        print(f"📤 Mode: CHANGED pages only (diff against {args.ref})")
        changed = get_changed_files(args.ref)
        if changed:
            print(f"📝 Changed files: {len(changed)}")
            for f in changed:
                print(f"   • {f}")
        else:
            print("ℹ️  No changed files detected.")
            return

        urls = match_changed_urls(changed, all_urls)
        if urls:
            submit_to_indexnow(urls, dry_run=args.dry_run)
        else:
            print("ℹ️  Changed files don't map to any sitemap URLs — nothing to submit.")


if __name__ == "__main__":
    main()
