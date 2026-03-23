#!/usr/bin/env python3
"""
Generate Model A (manual GSC verification) checklist and reminder artifacts.

Outputs:
- Markdown checklist template for issue comments
- reminder schedule JSON for +24h and +72h follow-up
"""

from __future__ import annotations

import argparse
import json
import os
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Iterable
from urllib.parse import urlparse


@dataclass
class Reminder:
    when_utc: str
    label: str
    reason: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate Model A checklist + reminder files for manual GSC ops"
    )
    parser.add_argument(
        "--url",
        action="append",
        default=[],
        help="Target canonical URL (repeatable)",
    )
    parser.add_argument(
        "--url-file",
        help="Text file with one URL per line (# comments supported)",
    )
    parser.add_argument(
        "--issue",
        help="Issue identifier (example: BEG-39)",
    )
    parser.add_argument(
        "--property-url",
        default=os.getenv("GSC_SITE_URL", "https://beginnerfxguide.com/"),
        help="Search Console property URL",
    )
    parser.add_argument(
        "--start-at",
        default=None,
        help="Anchor UTC timestamp in ISO format (default: now)",
    )
    parser.add_argument(
        "--output-dir",
        default=None,
        help=(
            "Output directory. Default: reports/gsc-manual/<YYYY-MM-DD>/"
        ),
    )
    return parser.parse_args()


def collect_urls(cmd_urls: list[str], url_file: str | None) -> list[str]:
    urls: list[str] = []

    def add(raw: Iterable[str]) -> None:
        for item in raw:
            value = item.strip()
            if not value or value.startswith("#"):
                continue
            parsed = urlparse(value)
            if parsed.scheme not in {"http", "https"} or not parsed.netloc:
                raise ValueError(f"Invalid URL: {value}")
            urls.append(value)

    add(cmd_urls)
    if url_file:
        add(Path(url_file).read_text(encoding="utf-8").splitlines())

    deduped = list(dict.fromkeys(urls))
    if not deduped:
        raise ValueError("At least one --url or --url-file entry is required")
    return deduped


def parse_start(value: str | None) -> datetime:
    if not value:
        return datetime.now(UTC)

    normalized = value.strip().replace("Z", "+00:00")
    dt = datetime.fromisoformat(normalized)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=UTC)
    return dt.astimezone(UTC)


def reminders(start: datetime) -> list[Reminder]:
    return [
        Reminder(
            when_utc=start.isoformat().replace("+00:00", "Z"),
            label="T+0 immediate manual verification",
            reason="Run URL Inspection + Live Test for all target URLs",
        ),
        Reminder(
            when_utc=(start + timedelta(hours=24)).isoformat().replace("+00:00", "Z"),
            label="T+24h re-check",
            reason="Validate indexing state changes and update issue evidence",
        ),
        Reminder(
            when_utc=(start + timedelta(hours=72)).isoformat().replace("+00:00", "Z"),
            label="T+72h escalation check",
            reason="Escalate pages still not indexed after repeated attempts",
        ),
    ]


def slug_from_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return "home"
    return path.replace("/", "-") or "page"


def build_markdown(
    issue: str | None,
    property_url: str,
    start: datetime,
    urls: list[str],
    reminder_items: list[Reminder],
) -> str:
    check_time = start.isoformat().replace("+00:00", "Z")

    lines: list[str] = []
    lines.append("# GSC Model A Checklist")
    lines.append("")
    lines.append("## Context")
    lines.append("")
    lines.append(f"- Issue: `{issue or 'N/A'}`")
    lines.append(f"- Property: `{property_url}`")
    lines.append(f"- Check start (UTC): `{check_time}`")
    lines.append("")
    lines.append("## Operator Checklist")
    lines.append("")
    lines.append("- [ ] Open Search Console and select the correct property")
    lines.append("- [ ] Run URL Inspection for each target URL")
    lines.append("- [ ] Run Live Test for each URL and capture result")
    lines.append("- [ ] If needed, click Request Indexing")
    lines.append("- [ ] Confirm Pages report state (Indexed / Crawled / Discovered)")
    lines.append("- [ ] Check Performance (last 7 days) and note trend")
    lines.append("- [ ] Attach screenshots under reports/gsc-manual/<date>/")
    lines.append("- [ ] Post final evidence summary as issue comment")
    lines.append("")
    lines.append("## URL Evidence Template")
    lines.append("")

    for index, url in enumerate(urls, start=1):
        slug = slug_from_url(url)
        lines.append(f"### {index}. `{url}`")
        lines.append("")
        lines.append("| Field | Value |")
        lines.append("|---|---|")
        lines.append(f"| Check time (UTC) | `{check_time}` |")
        lines.append(f"| URL | `{url}` |")
        lines.append("| URL Inspection | `Indexed` / `Not indexed` |")
        lines.append("| Live Test | `Available` / `Blocked` (+reason) |")
        lines.append("| Request Indexing | `Yes` / `No` |")
        lines.append("| Pages report state | `Indexed` / `Discovered` / `Crawled - currently not indexed` |")
        lines.append("| Performance note (7d) | `Clicks X, Impressions Y, trend +/-` |")
        lines.append(
            f"| Screenshots | `reports/gsc-manual/<YYYY-MM-DD>/{slug}-url-inspection-<HHMM>.png`, `...-live-test-<HHMM>.png`, `...-pages-<HHMM>.png`, `...-performance-<HHMM>.png` |"
        )
        lines.append("| Next check | `+24h` or `+72h` |")
        lines.append("")

    lines.append("## Reminder Plan")
    lines.append("")
    for item in reminder_items:
        lines.append(f"- `{item.when_utc}` - **{item.label}**: {item.reason}")

    lines.append("")
    lines.append("## Comment Snippet")
    lines.append("")
    lines.append("```md")
    lines.append("## Model A Manual Verification Update")
    lines.append("")
    lines.append("Manual verification completed for selected URLs.")
    lines.append("")
    lines.append("- Property: `<property-url>`")
    lines.append("- Check start (UTC): `<timestamp>`")
    lines.append("- Evidence folder: `reports/gsc-manual/<YYYY-MM-DD>/`")
    lines.append("- Next check: `<+24h or +72h>`")
    lines.append("")
    lines.append("[Paste URL evidence tables here]")
    lines.append("```")

    return "\n".join(lines) + "\n"


def main() -> int:
    args = parse_args()
    urls = collect_urls(args.url, args.url_file)
    start = parse_start(args.start_at)
    reminder_items = reminders(start)

    date_str = start.strftime("%Y-%m-%d")
    output_dir = Path(
        args.output_dir or f"reports/gsc-manual/{date_str}"
    )
    output_dir.mkdir(parents=True, exist_ok=True)

    checklist_path = output_dir / "model-a-checklist.md"
    reminders_path = output_dir / "model-a-reminders.json"

    checklist = build_markdown(
        issue=args.issue,
        property_url=args.property_url,
        start=start,
        urls=urls,
        reminder_items=reminder_items,
    )
    checklist_path.write_text(checklist, encoding="utf-8")

    reminder_payload = {
        "issue": args.issue,
        "propertyUrl": args.property_url,
        "generatedAt": datetime.now(UTC).isoformat().replace("+00:00", "Z"),
        "schedule": [item.__dict__ for item in reminder_items],
        "targets": urls,
        "checklistPath": str(checklist_path),
    }
    reminders_path.write_text(
        json.dumps(reminder_payload, indent=2, ensure_ascii=True) + "\n",
        encoding="utf-8",
    )

    print(f"Generated checklist: {checklist_path}")
    print(f"Generated reminder schedule: {reminders_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
