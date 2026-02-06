#!/usr/bin/env python3
"""
SEO Improvement Agent for beginnerfxguide.com
Autonomous agent that:
1. Analyzes GSC indexing status
2. Checks pages for technical issues
3. Implements fixes
4. Deploys changes
5. Resubmits sitemap
6. Verifies submission
7. Logs all actions
"""

import os
import sys
import json
import time
import re
import subprocess
from datetime import datetime, timedelta
from pathlib import Path
from xml.etree import ElementTree as ET

# Google API imports
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Configuration
SITE_URL = 'https://beginnerfxguide.com/'
CREDENTIALS_PATH = '/Users/sedo/Downloads/Skill/.claude/skills/sedo-assistant/scripts/google-credentials.json'
PROJECT_DIR = '/Users/sedo/Desktop/usd-forex-guide'
REPORT_PATH = '/Users/sedo/Downloads/Skill/data/seo-agent-report.md'
SITEMAP_PATH = os.path.join(PROJECT_DIR, 'public/sitemap.xml')

class SEOAgent:
    def __init__(self):
        self.credentials = None
        self.search_console = None
        self.indexing_service = None
        self.report_lines = []
        self.issues_found = []
        self.fixes_applied = []
        self.errors = []
        self.unindexed_pages = []
        
    def log(self, message, level='INFO'):
        """Log message to console and report"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_line = f"[{timestamp}] [{level}] {message}"
        print(log_line)
        self.report_lines.append(log_line)
        
    def initialize_google_services(self):
        """Initialize Google Search Console and Indexing API services"""
        self.log("Initializing Google API services...")
        
        try:
            self.credentials = service_account.Credentials.from_service_account_file(
                CREDENTIALS_PATH,
                scopes=[
                    'https://www.googleapis.com/auth/webmasters',
                    'https://www.googleapis.com/auth/webmasters.readonly',
                    'https://www.googleapis.com/auth/indexing'
                ]
            )
            
            self.search_console = build('searchconsole', 'v1', credentials=self.credentials)
            self.indexing_service = build('indexing', 'v3', credentials=self.credentials)
            
            self.log("Google API services initialized successfully")
            return True
            
        except Exception as e:
            self.log(f"Failed to initialize Google services: {e}", 'ERROR')
            self.errors.append(f"Google API init failed: {e}")
            return False

    def get_sitemap_urls(self):
        """Parse sitemap and return all URLs"""
        self.log("Parsing sitemap...")
        urls = []
        
        try:
            tree = ET.parse(SITEMAP_PATH)
            root = tree.getroot()
            namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            for url_elem in root.findall('ns:url', namespace):
                loc = url_elem.find('ns:loc', namespace)
                if loc is not None:
                    urls.append(loc.text)
                    
            self.log(f"Found {len(urls)} URLs in sitemap")
            return urls
            
        except Exception as e:
            self.log(f"Failed to parse sitemap: {e}", 'ERROR')
            self.errors.append(f"Sitemap parse failed: {e}")
            return []
            
    def inspect_url(self, url):
        """Use URL Inspection API to check indexing status"""
        try:
            result = self.search_console.urlInspection().index().inspect(
                body={
                    'inspectionUrl': url,
                    'siteUrl': SITE_URL
                }
            ).execute()
            
            return result
            
        except HttpError as e:
            if e.resp.status == 429:
                self.log(f"Rate limited, waiting 60 seconds...", 'WARN')
                time.sleep(60)
                return self.inspect_url(url)
            else:
                self.log(f"URL inspection failed for {url}: {e}", 'ERROR')
                return None
        except Exception as e:
            self.log(f"URL inspection error for {url}: {e}", 'ERROR')
            return None

    def analyze_indexing_status(self, urls):
        """Check indexing status for all URLs"""
        self.log("=" * 60)
        self.log("PHASE 1: ANALYZING GSC INDEXING STATUS")
        self.log("=" * 60)
        
        indexed = []
        not_indexed = []
        errors = []
        
        total = len(urls)
        for i, url in enumerate(urls):
            self.log(f"Inspecting URL {i+1}/{total}: {url}")
            
            result = self.inspect_url(url)
            
            if result is None:
                errors.append({'url': url, 'reason': 'inspection_failed'})
                continue
                
            inspection = result.get('inspectionResult', {})
            index_status = inspection.get('indexStatusResult', {})
            coverage_state = index_status.get('coverageState', 'UNKNOWN')
            verdict = index_status.get('verdict', 'UNKNOWN')
            
            page_info = {
                'url': url,
                'coverage_state': coverage_state,
                'verdict': verdict,
                'crawled_as': index_status.get('crawledAs', 'UNKNOWN'),
                'robots_txt_state': index_status.get('robotsTxtState', 'UNKNOWN'),
                'indexing_state': index_status.get('indexingState', 'UNKNOWN'),
                'last_crawl_time': index_status.get('lastCrawlTime', 'Never'),
                'page_fetch_state': index_status.get('pageFetchState', 'UNKNOWN'),
                'google_canonical': index_status.get('googleCanonical', ''),
                'user_canonical': index_status.get('userCanonical', ''),
                'mobile_usability': inspection.get('mobileUsabilityResult', {}).get('verdict', 'UNKNOWN'),
                'rich_results': inspection.get('richResultsResult', {}).get('verdict', 'UNKNOWN')
            }
            
            # Check if indexed
            if verdict == 'PASS' or coverage_state == 'Submitted and indexed':
                indexed.append(page_info)
                self.log(f"  ✓ INDEXED: {coverage_state}")
            else:
                not_indexed.append(page_info)
                self.unindexed_pages.append(page_info)
                self.log(f"  ✗ NOT INDEXED: {coverage_state} - {verdict}")
                
            # Rate limit protection
            time.sleep(1)
            
        self.log(f"\nIndexing Summary:")
        self.log(f"  Indexed: {len(indexed)}")
        self.log(f"  Not Indexed: {len(not_indexed)}")
        self.log(f"  Errors: {len(errors)}")
        
        return {
            'indexed': indexed,
            'not_indexed': not_indexed,
            'errors': errors
        }

    def check_technical_issues(self, page_info):
        """Check a page for technical SEO issues"""
        url = page_info['url']
        issues = []
        
        # Extract path from URL
        path = url.replace(SITE_URL.rstrip('/'), '')
        if not path:
            path = '/'
            
        self.log(f"Checking technical issues for: {url}")
        
        # Check robots.txt blocking
        if page_info.get('robots_txt_state') == 'DISALLOWED':
            issues.append({
                'type': 'robots_blocked',
                'severity': 'critical',
                'description': 'Page blocked by robots.txt'
            })
            
        # Check noindex tag
        if page_info.get('indexing_state') == 'INDEXING_NOT_ALLOWED':
            issues.append({
                'type': 'noindex',
                'severity': 'critical',
                'description': 'Page has noindex directive'
            })
            
        # Check page fetch issues
        fetch_state = page_info.get('page_fetch_state', '')
        if fetch_state not in ['SUCCESSFUL', 'UNKNOWN']:
            issues.append({
                'type': 'fetch_error',
                'severity': 'critical',
                'description': f'Page fetch failed: {fetch_state}'
            })
            
        # Check canonical mismatch
        google_canonical = page_info.get('google_canonical', '')
        user_canonical = page_info.get('user_canonical', '')
        if google_canonical and user_canonical and google_canonical != user_canonical:
            issues.append({
                'type': 'canonical_mismatch',
                'severity': 'high',
                'description': f'Canonical mismatch: user={user_canonical}, google={google_canonical}'
            })
            
        # Check mobile usability
        if page_info.get('mobile_usability') == 'FAIL':
            issues.append({
                'type': 'mobile_issues',
                'severity': 'medium',
                'description': 'Mobile usability issues detected'
            })
            
        # Coverage state issues
        coverage = page_info.get('coverage_state', '')
        if 'Discovered' in coverage and 'indexed' not in coverage.lower():
            issues.append({
                'type': 'discovered_not_indexed',
                'severity': 'medium',
                'description': 'Page discovered but not indexed yet'
            })
        elif 'Crawled' in coverage and 'indexed' not in coverage.lower():
            issues.append({
                'type': 'crawled_not_indexed',
                'severity': 'high',
                'description': 'Page crawled but not indexed - likely quality issue'
            })
            
        return issues

    def analyze_all_technical_issues(self):
        """Analyze technical issues for all unindexed pages"""
        self.log("=" * 60)
        self.log("PHASE 2: CHECKING TECHNICAL ISSUES")
        self.log("=" * 60)
        
        all_issues = []
        
        for page_info in self.unindexed_pages:
            issues = self.check_technical_issues(page_info)
            if issues:
                all_issues.append({
                    'url': page_info['url'],
                    'page_info': page_info,
                    'issues': issues
                })
                self.log(f"Found {len(issues)} issues for {page_info['url']}")
                for issue in issues:
                    self.log(f"  - [{issue['severity']}] {issue['type']}: {issue['description']}")
                    
        self.issues_found = all_issues
        self.log(f"\nTotal pages with issues: {len(all_issues)}")
        return all_issues

    def check_page_content(self, url):
        """Check page content for thin content issues"""
        # Map URL to component file
        path = url.replace(SITE_URL.rstrip('/'), '')
        
        # Common patterns for finding source files
        file_mappings = {
            '/review/': 'src/pages/BrokerReview.tsx',
            '/guides/': 'src/pages/Guides.tsx',
            '/blog/': 'src/pages/Blog.tsx',
            '/tools/': 'src/pages/Tools.tsx',
            '/glossary': 'src/pages/Glossary.tsx',
        }
        
        issues = []
        
        # Check if the page is a dynamic route that might have thin content
        for pattern, source_file in file_mappings.items():
            if pattern in path:
                source_path = os.path.join(PROJECT_DIR, source_file)
                if os.path.exists(source_path):
                    with open(source_path, 'r') as f:
                        content = f.read()
                        # Basic content checks
                        if len(content) < 1000:
                            issues.append({
                                'type': 'thin_content',
                                'severity': 'high',
                                'description': f'Source file {source_file} is very small'
                            })
                            
        return issues

    def fix_robots_txt(self):
        """Ensure robots.txt allows all important pages"""
        self.log("Checking robots.txt configuration...")
        robots_path = os.path.join(PROJECT_DIR, 'public/robots.txt')
        
        try:
            with open(robots_path, 'r') as f:
                content = f.read()
                
            # Check for any disallow rules that might block important pages
            if 'Disallow: /' in content and 'Disallow: / ' not in content:
                self.log("WARNING: robots.txt might be blocking all pages!", 'WARN')
                
            # Ensure sitemap is referenced
            if 'Sitemap:' not in content:
                content += '\n\nSitemap: https://beginnerfxguide.com/sitemap.xml\n'
                with open(robots_path, 'w') as f:
                    f.write(content)
                self.log("Added sitemap reference to robots.txt")
                self.fixes_applied.append('Added sitemap to robots.txt')
                
            return True
        except Exception as e:
            self.log(f"Error checking robots.txt: {e}", 'ERROR')
            return False

    def update_sitemap_lastmod(self):
        """Update lastmod dates in sitemap for all pages"""
        self.log("Updating sitemap lastmod dates...")
        
        try:
            tree = ET.parse(SITEMAP_PATH)
            root = tree.getroot()
            namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            today = datetime.now().strftime('%Y-%m-%d')
            updated_count = 0
            
            for url_elem in root.findall('ns:url', namespace):
                lastmod = url_elem.find('ns:lastmod', namespace)
                if lastmod is not None:
                    # Update to today's date
                    lastmod.text = today
                    updated_count += 1
                    
            # Write back with proper namespace
            ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
            tree.write(SITEMAP_PATH, encoding='UTF-8', xml_declaration=True)
            
            self.log(f"Updated lastmod for {updated_count} URLs to {today}")
            self.fixes_applied.append(f'Updated sitemap lastmod dates to {today}')
            return True
            
        except Exception as e:
            self.log(f"Error updating sitemap: {e}", 'ERROR')
            return False

    def check_meta_tags(self):
        """Check index.html for proper meta tags"""
        self.log("Checking meta tags in index.html...")
        index_path = os.path.join(PROJECT_DIR, 'index.html')
        
        try:
            with open(index_path, 'r') as f:
                content = f.read()
                
            issues = []
            fixes = []
            
            # Check for essential meta tags
            if '<meta name="description"' not in content:
                issues.append('Missing meta description')
                
            if '<meta name="viewport"' not in content:
                issues.append('Missing viewport meta tag')
                
            if '<link rel="canonical"' not in content:
                issues.append('Missing canonical tag')
                
            if '<meta property="og:' not in content:
                issues.append('Missing Open Graph tags')
                
            if '<meta name="robots"' in content:
                if 'noindex' in content.lower():
                    issues.append('CRITICAL: noindex found in meta robots!')
                    
            for issue in issues:
                self.log(f"  Meta issue: {issue}", 'WARN')
                
            return issues
            
        except Exception as e:
            self.log(f"Error checking meta tags: {e}", 'ERROR')
            return []

    def implement_fixes(self):
        """Implement all identified fixes"""
        self.log("=" * 60)
        self.log("PHASE 3: IMPLEMENTING FIXES")
        self.log("=" * 60)
        
        # Fix 1: Update robots.txt
        self.fix_robots_txt()
        
        # Fix 2: Update sitemap dates
        self.update_sitemap_lastmod()
        
        # Fix 3: Check meta tags
        meta_issues = self.check_meta_tags()
        
        # Fix 4: Add or update _headers for caching
        self.update_headers()
        
        self.log(f"\nTotal fixes applied: {len(self.fixes_applied)}")
        return self.fixes_applied

    def update_headers(self):
        """Update _headers file for better caching and SEO"""
        self.log("Checking _headers configuration...")
        headers_path = os.path.join(PROJECT_DIR, 'public/_headers')
        
        optimal_headers = '''/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/sitemap.xml
  Cache-Control: public, max-age=3600
  Content-Type: application/xml

/robots.txt
  Cache-Control: public, max-age=3600
  Content-Type: text/plain
'''
        
        try:
            # Check if current headers are optimal
            current = ''
            if os.path.exists(headers_path):
                with open(headers_path, 'r') as f:
                    current = f.read()
                    
            if 'Cache-Control' not in current or 'sitemap.xml' not in current:
                with open(headers_path, 'w') as f:
                    f.write(optimal_headers)
                self.log("Updated _headers with optimal caching rules")
                self.fixes_applied.append('Updated _headers for better caching')
            else:
                self.log("_headers already optimized")
                
            return True
        except Exception as e:
            self.log(f"Error updating _headers: {e}", 'ERROR')
            return False

    def deploy_changes(self):
        """Deploy changes to Cloudflare Pages"""
        self.log("=" * 60)
        self.log("PHASE 4: DEPLOYING CHANGES")
        self.log("=" * 60)
        
        try:
            # Build the project
            self.log("Building project...")
            build_result = subprocess.run(
                ['npm', 'run', 'build'],
                cwd=PROJECT_DIR,
                capture_output=True,
                text=True,
                timeout=300
            )
            
            if build_result.returncode != 0:
                self.log(f"Build failed: {build_result.stderr}", 'ERROR')
                self.errors.append(f"Build failed: {build_result.stderr}")
                return False
                
            self.log("Build successful!")
            
            # Deploy to Cloudflare
            self.log("Deploying to Cloudflare Pages...")
            deploy_env = os.environ.copy()
            deploy_env['CLOUDFLARE_API_TOKEN'] = 'W1rNy7ISGH9BTkwPuY2Q3BQ9tX6IbQTiLRttNk6H'
            
            deploy_result = subprocess.run(
                ['npx', 'wrangler', 'pages', 'deploy', 'dist', '--project-name=beginnerfxguide'],
                cwd=PROJECT_DIR,
                capture_output=True,
                text=True,
                timeout=300,
                env=deploy_env
            )
            
            if deploy_result.returncode != 0:
                self.log(f"Deploy failed: {deploy_result.stderr}", 'ERROR')
                self.errors.append(f"Deploy failed: {deploy_result.stderr}")
                return False
                
            self.log("Deployment successful!")
            self.fixes_applied.append('Deployed to Cloudflare Pages')
            return True
            
        except subprocess.TimeoutExpired:
            self.log("Deployment timed out", 'ERROR')
            return False
        except Exception as e:
            self.log(f"Deployment error: {e}", 'ERROR')
            return False

    def submit_sitemap_to_gsc(self):
        """Submit sitemap to Google Search Console"""
        self.log("=" * 60)
        self.log("PHASE 5: SUBMITTING SITEMAP TO GSC")
        self.log("=" * 60)
        
        sitemap_url = f"{SITE_URL}sitemap.xml"
        
        try:
            # First, check current sitemap status
            self.log(f"Checking current sitemap status: {sitemap_url}")
            
            sitemaps = self.search_console.sitemaps().list(siteUrl=SITE_URL).execute()
            self.log(f"Current sitemaps: {json.dumps(sitemaps, indent=2)}")
            
            # Submit/resubmit the sitemap
            self.log(f"Submitting sitemap: {sitemap_url}")
            result = self.search_console.sitemaps().submit(
                siteUrl=SITE_URL,
                feedpath=sitemap_url
            ).execute()
            
            self.log(f"Sitemap submitted successfully!")
            self.fixes_applied.append('Submitted sitemap to GSC')
            return True
            
        except HttpError as e:
            self.log(f"GSC API error: {e}", 'ERROR')
            self.errors.append(f"Sitemap submission failed: {e}")
            return False
        except Exception as e:
            self.log(f"Error submitting sitemap: {e}", 'ERROR')
            self.errors.append(f"Sitemap submission error: {e}")
            return False

    def request_indexing(self, urls):
        """Request indexing for specific URLs via Indexing API"""
        self.log("Requesting indexing for unindexed pages...")
        
        success_count = 0
        fail_count = 0
        
        for url in urls[:10]:  # Limit to 10 URLs per day (API quota)
            try:
                self.log(f"Requesting indexing for: {url}")
                
                result = self.indexing_service.urlNotifications().publish(
                    body={
                        'url': url,
                        'type': 'URL_UPDATED'
                    }
                ).execute()
                
                self.log(f"  ✓ Indexing requested: {result.get('urlNotificationMetadata', {}).get('latestUpdate', {}).get('notifyTime', 'unknown')}")
                success_count += 1
                time.sleep(1)  # Rate limiting
                
            except HttpError as e:
                if e.resp.status == 403:
                    self.log(f"  ✗ Indexing API not enabled or quota exceeded", 'WARN')
                else:
                    self.log(f"  ✗ Failed: {e}", 'ERROR')
                fail_count += 1
            except Exception as e:
                self.log(f"  ✗ Error: {e}", 'ERROR')
                fail_count += 1
                
        self.log(f"\nIndexing requests: {success_count} successful, {fail_count} failed")
        if success_count > 0:
            self.fixes_applied.append(f'Requested indexing for {success_count} URLs')
        return success_count > 0

    def verify_submission(self, wait_minutes=10):
        """Wait and verify sitemap submission was received"""
        self.log("=" * 60)
        self.log(f"PHASE 6: WAITING {wait_minutes} MINUTES AND VERIFYING")
        self.log("=" * 60)
        
        self.log(f"Waiting {wait_minutes} minutes before verification...")
        
        # Wait in chunks to show progress
        for i in range(wait_minutes):
            self.log(f"  Waiting... {i+1}/{wait_minutes} minutes")
            time.sleep(60)
            
        # Verify sitemap status
        self.log("Verifying sitemap submission...")
        
        try:
            sitemaps = self.search_console.sitemaps().list(siteUrl=SITE_URL).execute()
            
            sitemap_url = f"{SITE_URL}sitemap.xml"
            for sitemap in sitemaps.get('sitemap', []):
                if sitemap.get('path') == sitemap_url:
                    self.log(f"Sitemap verified:")
                    self.log(f"  Path: {sitemap.get('path')}")
                    self.log(f"  Last Submitted: {sitemap.get('lastSubmitted')}")
                    self.log(f"  Last Downloaded: {sitemap.get('lastDownloaded')}")
                    self.log(f"  Warnings: {sitemap.get('warnings', 0)}")
                    self.log(f"  Errors: {sitemap.get('errors', 0)}")
                    
                    contents = sitemap.get('contents', [])
                    for content in contents:
                        self.log(f"  Content type: {content.get('type')}")
                        self.log(f"    Submitted: {content.get('submitted')}")
                        self.log(f"    Indexed: {content.get('indexed')}")
                        
                    return True
                    
            self.log("Sitemap not found in GSC list", 'WARN')
            return False
            
        except Exception as e:
            self.log(f"Verification error: {e}", 'ERROR')
            return False

    def generate_report(self):
        """Generate final markdown report"""
        self.log("=" * 60)
        self.log("PHASE 7: GENERATING REPORT")
        self.log("=" * 60)
        
        report = f"""# SEO Improvement Agent Report
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Site: {SITE_URL}

## Summary

| Metric | Count |
|--------|-------|
| Total URLs in Sitemap | {len(self.get_sitemap_urls())} |
| Unindexed Pages Found | {len(self.unindexed_pages)} |
| Issues Identified | {len(self.issues_found)} |
| Fixes Applied | {len(self.fixes_applied)} |
| Errors Encountered | {len(self.errors)} |

## Unindexed Pages

"""
        
        if self.unindexed_pages:
            for page in self.unindexed_pages:
                report += f"### {page['url']}\n"
                report += f"- Coverage State: {page.get('coverage_state', 'Unknown')}\n"
                report += f"- Verdict: {page.get('verdict', 'Unknown')}\n"
                report += f"- Last Crawl: {page.get('last_crawl_time', 'Never')}\n"
                report += f"- Mobile Usability: {page.get('mobile_usability', 'Unknown')}\n\n"
        else:
            report += "All pages are indexed! 🎉\n\n"

        report += """## Issues Found

"""
        if self.issues_found:
            for item in self.issues_found:
                report += f"### {item['url']}\n"
                for issue in item['issues']:
                    report += f"- **[{issue['severity'].upper()}]** {issue['type']}: {issue['description']}\n"
                report += "\n"
        else:
            report += "No critical issues found.\n\n"
            
        report += """## Fixes Applied

"""
        if self.fixes_applied:
            for fix in self.fixes_applied:
                report += f"- ✓ {fix}\n"
        else:
            report += "No fixes were necessary.\n"
            
        report += """

## Errors Encountered

"""
        if self.errors:
            for error in self.errors:
                report += f"- ✗ {error}\n"
        else:
            report += "No errors encountered.\n"
            
        report += """

## Recommendations

"""
        # Add recommendations based on findings
        if len(self.unindexed_pages) > 0:
            report += """### For Unindexed Pages:
1. Ensure each page has unique, valuable content (>300 words)
2. Add internal links to these pages from indexed pages
3. Check that pages load quickly (<3 seconds)
4. Verify mobile-friendliness using Google's Mobile-Friendly Test
5. Consider adding structured data (Schema.org) for rich results

"""
        
        report += """### General SEO Best Practices:
1. Regularly update content with fresh, relevant information
2. Build quality backlinks from authoritative sources
3. Monitor Core Web Vitals in GSC
4. Keep submitting sitemap monthly if making regular updates
5. Use GSC URL Inspection tool for priority pages

## Agent Activity Log

"""
        for line in self.report_lines[-50:]:  # Last 50 log lines
            report += f"{line}\n"
            
        # Save report
        try:
            with open(REPORT_PATH, 'w') as f:
                f.write(report)
            self.log(f"Report saved to: {REPORT_PATH}")
        except Exception as e:
            self.log(f"Error saving report: {e}", 'ERROR')
            
        return report

    def run(self, skip_wait=False):
        """Run the full SEO improvement workflow"""
        self.log("=" * 60)
        self.log("SEO IMPROVEMENT AGENT STARTED")
        self.log(f"Site: {SITE_URL}")
        self.log("=" * 60)
        
        # Phase 1: Initialize
        if not self.initialize_google_services():
            self.log("Cannot proceed without Google services", 'ERROR')
            return self.generate_report()
            
        # Phase 2: Get URLs and analyze indexing
        urls = self.get_sitemap_urls()
        if not urls:
            self.log("No URLs found in sitemap", 'ERROR')
            return self.generate_report()
            
        indexing_status = self.analyze_indexing_status(urls)
        
        # Phase 3: Analyze technical issues
        if self.unindexed_pages:
            self.analyze_all_technical_issues()
            
        # Phase 4: Implement fixes
        self.implement_fixes()
        
        # Phase 5: Deploy changes
        deploy_success = self.deploy_changes()
        
        # Phase 6: Submit sitemap
        if deploy_success:
            self.submit_sitemap_to_gsc()
            
            # Request indexing for unindexed pages
            unindexed_urls = [p['url'] for p in self.unindexed_pages]
            if unindexed_urls:
                self.request_indexing(unindexed_urls)
                
        # Phase 7: Wait and verify
        if not skip_wait and deploy_success:
            self.verify_submission(wait_minutes=10)
        elif skip_wait:
            self.log("Skipping wait phase (skip_wait=True)")
            
        # Phase 8: Generate report
        return self.generate_report()


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='SEO Improvement Agent')
    parser.add_argument('--skip-wait', action='store_true', help='Skip the 10-minute wait')
    parser.add_argument('--analyze-only', action='store_true', help='Only analyze, do not fix or deploy')
    args = parser.parse_args()
    
    agent = SEOAgent()
    
    if args.analyze_only:
        agent.initialize_google_services()
        urls = agent.get_sitemap_urls()
        agent.analyze_indexing_status(urls)
        agent.analyze_all_technical_issues()
        agent.generate_report()
    else:
        agent.run(skip_wait=args.skip_wait)
