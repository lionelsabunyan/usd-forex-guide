#!/usr/bin/env python3
"""
DEPRECATED — Use gsc-request-indexing.py instead.

The Google Indexing API (used by this script previously) only works for
JobPosting and BroadcastEvent structured data types. For regular web pages,
use URL Inspection API via gsc-request-indexing.py.

Redirect:
  python3 scripts/gsc-request-indexing.py --priority
"""

import sys
print("⚠️  This script is deprecated. Use gsc-request-indexing.py instead:")
print("    python3 scripts/gsc-request-indexing.py --priority")
print()
print("The Google Indexing API only works for JobPosting/BroadcastEvent.")
print("For regular web pages, gsc-request-indexing.py uses the URL Inspection API.")
sys.exit(0)
