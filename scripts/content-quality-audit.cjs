#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const brokerDir = '/home/paperclip/usd-forex-guide/src/lib/reviewData';
const files = fs.readdirSync(brokerDir).filter(f => f.endsWith('.ts'));

console.log('📝 BROKER REVIEW CONTENT QUALITY AUDIT (v2 - Refined)\n');
console.log('='.repeat(80));

const issues = [];

files.forEach(file => {
  const brokerName = file.replace('.ts', '');
  const filePath = path.join(brokerDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // 1. Check seoDescription length (should be 150-160 chars for optimal SEO)
  const seoDescMatch = content.match(/seoDescription:\s*"([^"]+)"/);
  if (seoDescMatch) {
    const len = seoDescMatch[1].length;
    if (len < 120 || len > 160) {
      issues.push({
        broker: brokerName,
        severity: 'medium',
        type: 'SEO',
        message: `SEO description length ${len} chars (ideal 150-160)`
      });
    }
  }

  // 2. Check heroDescription for double spaces
  const heroMatch = content.match(/heroDescription:\s*"([^"]+)"/);
  if (heroMatch && heroMatch[1].includes('  ')) {
    issues.push({
      broker: brokerName,
      severity: 'low',
      type: 'Content',
      message: 'Double spaces detected in heroDescription'
    });
  }

  // 3. IMPROVED: Parse quickStats to detect unregulated status
  const quickStatsMatch = content.match(/quickStats:\s*\[([\s\S]*?)\],/);
  const usClientsMatch = content.match(/usClients:\s*"([^"]+)"/);
  const usClientsValue = usClientsMatch ? usClientsMatch[1] : null;

  if (quickStatsMatch) {
    const quickStatsContent = quickStatsMatch[1];
    // Look for explicit "Unregulated" or "Not regulated" in quickStats
    if (quickStatsContent.match(/Unregulated|Not regulated|No regulation/i)) {
      // This broker is explicitly marked as unregulated - acceptable
    } else if (!quickStatsContent.match(/CFTC|NFA|FCA|CySEC|ASIC|MISA|FSA|DFSA|CMA|FSCA|SCB|FEA|BaFin|AFM|AMF|MiFID/i)) {
      // No regulatory mention in quickStats AND not explicitly unregulated - potential issue
      issues.push({
        broker: brokerName,
        severity: 'high',
        type: 'Compliance',
        message: 'Missing regulatory information in quickStats'
      });
    }
  }

  // 4. IMPROVED: Check CFTC consistency more accurately
  // Only flag if BOTH:
  //   a) The broker is explicitly regulated by CFTC/NFA (in regulation field/quickStats)
  //   b) usClients is marked as NO
  const isCFTCRegulated = content.match(/regulation:.*?(CFTC|NFA)/i) ||
                          content.match(/quickStats[\s\S]*?(CFTC|NFA)[\s\S]*?\]/);

  if (isCFTCRegulated && usClientsValue === 'NO') {
    issues.push({
      broker: brokerName,
      severity: 'high',
      type: 'Compliance',
      message: 'CFTC/NFA-regulated broker marked as NO US clients (likely error)'
    });
  }

  // 5. Check rating consistency (cons and pros should match rating)
  const ratingMatch = content.match(/overallRating:\s*([\d.]+)/);
  const prosMatch = content.match(/pros:\s*\[([\s\S]*?)\]/);
  const consMatch = content.match(/cons:\s*\[([\s\S]*?)\]/);

  if (ratingMatch && prosMatch && consMatch) {
    const rating = parseFloat(ratingMatch[1]);
    const prosCount = (prosMatch[1].match(/"/g) || []).length / 2;
    const consCount = (consMatch[1].match(/"/g) || []).length / 2;

    if (rating >= 4.5 && consCount > 3) {
      issues.push({
        broker: brokerName,
        severity: 'medium',
        type: 'Content',
        message: `High rating (${rating}) but ${consCount} cons listed (should be 2-3)`
      });
    }
    if (rating <= 3.0 && prosCount < 3) {
      issues.push({
        broker: brokerName,
        severity: 'medium',
        type: 'Content',
        message: `Low rating (${rating}) but only ${prosCount} pros listed (should be 4-5)`
      });
    }
  }
});

// Report findings
console.log(`\n📋 AUDIT RESULTS: ${issues.length} issues found\n`);

const bySeverity = {
  high: issues.filter(i => i.severity === 'high'),
  medium: issues.filter(i => i.severity === 'medium'),
  low: issues.filter(i => i.severity === 'low')
};

if (bySeverity.high.length > 0) {
  console.log('🔴 HIGH PRIORITY ISSUES:\n');
  bySeverity.high.forEach(issue => {
    console.log(`  ${issue.broker.padEnd(20)} [${issue.type}] ${issue.message}`);
  });
}

if (bySeverity.medium.length > 0) {
  console.log('\n🟡 MEDIUM PRIORITY ISSUES:\n');
  bySeverity.medium.forEach(issue => {
    console.log(`  ${issue.broker.padEnd(20)} [${issue.type}] ${issue.message}`);
  });
}

if (bySeverity.low.length > 0) {
  console.log('\n🟢 LOW PRIORITY ISSUES:\n');
  bySeverity.low.forEach(issue => {
    console.log(`  ${issue.broker.padEnd(20)} [${issue.type}] ${issue.message}`);
  });
}

console.log('\n' + '='.repeat(80));
console.log(`\nSummary: ${bySeverity.high.length} high | ${bySeverity.medium.length} medium | ${bySeverity.low.length} low\n`);
