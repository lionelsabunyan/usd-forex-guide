#!/usr/bin/env bash
# Auto Deploy Pipeline — beginnerfxguide.com
# Hourly cron: checks for uncommitted changes, builds, deploys, notifies.
# Usage: scripts/auto-deploy.sh [--force]
#
# Skips deploy if no changes detected (unless --force).
# Excludes agents/ docs/ from auto-commits.

set -euo pipefail

REPO_DIR="/home/paperclip/usd-forex-guide"
LOG_FILE="/tmp/auto-deploy.log"
LOCK_FILE="/tmp/auto-deploy.lock"
ENV_FILE="/home/paperclip/.env"

# ── Load env vars (Telegram, IndexNow, etc.) ──
if [[ -f "$ENV_FILE" ]]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# ── Helpers ──

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

send_telegram() {
  local msg="$1"
  if [[ "${TELEGRAM_DISABLE:-}" == "1" ]]; then
    return 0
  fi
  if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d chat_id="$TELEGRAM_CHAT_ID" \
      -d parse_mode="Markdown" \
      -d text="$msg" >/dev/null 2>&1 || true
  fi
}

cleanup() {
  rm -f "$LOCK_FILE"
}
trap cleanup EXIT

# ── Prevent concurrent runs ──
if [[ -f "$LOCK_FILE" ]]; then
  pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    log "Another deploy is running (PID $pid). Skipping."
    exit 0
  fi
  log "Stale lock file found. Removing."
  rm -f "$LOCK_FILE"
fi
echo $$ > "$LOCK_FILE"

cd "$REPO_DIR"

FORCE=false
[[ "${1:-}" == "--force" ]] && FORCE=true

# ── Step 1: Check for changes ──
log "Checking for changes..."

# Stage trackable changes (exclude agents/ docs/ scripts/__pycache__)
git add --all -- ':!agents/' ':!docs/' ':!scripts/__pycache__/' 2>/dev/null || true

CHANGES=$(git diff --cached --name-only 2>/dev/null || true)

if [[ -z "$CHANGES" ]] && [[ "$FORCE" == "false" ]]; then
  log "No changes detected. Skipping deploy."
  exit 0
fi

# ── Step 2: Commit changes ──
if [[ -n "$CHANGES" ]]; then
  CHANGE_COUNT=$(echo "$CHANGES" | wc -l)
  # Build a short summary of changed areas
  SUMMARY=""
  echo "$CHANGES" | grep -q "^src/pages/" && SUMMARY="${SUMMARY}pages, "
  echo "$CHANGES" | grep -q "^src/components/" && SUMMARY="${SUMMARY}components, "
  echo "$CHANGES" | grep -q "^src/lib/" && SUMMARY="${SUMMARY}lib, "
  echo "$CHANGES" | grep -q "^scripts/" && SUMMARY="${SUMMARY}scripts, "
  echo "$CHANGES" | grep -q "^public/" && SUMMARY="${SUMMARY}public, "
  SUMMARY="${SUMMARY%%, }"  # trim trailing comma
  [[ -z "$SUMMARY" ]] && SUMMARY="misc"

  COMMIT_MSG="chore(auto-deploy): ${CHANGE_COUNT} files updated (${SUMMARY})

Co-Authored-By: Paperclip <noreply@paperclip.ing>"

  git commit -m "$COMMIT_MSG" || {
    log "ERROR: git commit failed"
    send_telegram "❌ *Auto-Deploy Failed*%0Agit commit hatası"
    exit 1
  }
  log "Committed ${CHANGE_COUNT} files (${SUMMARY})"
else
  log "No new changes to commit (--force mode, rebuilding)"
fi

# ── Step 3: Build ──
log "Building..."
rm -rf node_modules/.vite

npx vite build 2>&1 | tail -5 | tee -a "$LOG_FILE"
BUILD_EXIT=${PIPESTATUS[0]}

if [[ $BUILD_EXIT -ne 0 ]]; then
  log "ERROR: vite build failed (exit $BUILD_EXIT)"
  send_telegram "❌ *Auto-Deploy Failed*%0Avite build hatası (exit $BUILD_EXIT)"
  exit 1
fi
log "Build completed."

# ── Step 4: Post-build scripts ──
log "Running post-build scripts..."

node scripts/generate-static-pages.cjs 2>&1 | tee -a "$LOG_FILE"
node scripts/fix-tr-title.cjs 2>&1 | tee -a "$LOG_FILE"
node scripts/fix-spa-fallback.cjs 2>&1 | tee -a "$LOG_FILE"

log "Post-build scripts completed."

# ── Step 5: Deploy to Cloudflare Pages ──
log "Deploying to Cloudflare Pages..."

DEPLOY_OUTPUT=$(npx wrangler pages deploy dist/ \
  --project-name=beginnerfxguide \
  --branch=main \
  --commit-dirty=true 2>&1) || {
  log "ERROR: wrangler deploy failed"
  log "$DEPLOY_OUTPUT"
  send_telegram "❌ *Auto-Deploy Failed*%0Awrangler deploy hatası"
  exit 1
}

DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.pages\.dev' | head -1 || echo "")
log "Deploy completed. URL: ${DEPLOY_URL:-unknown}"

# ── Step 6: IndexNow submit ──
log "Submitting to IndexNow..."
python3 scripts/indexnow-submit.py --changed 2>&1 | tee -a "$LOG_FILE" || {
  log "WARNING: IndexNow submit failed (non-critical)"
}

# ── Step 7: Telegram notification ──
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
TIMESTAMP=$(date '+%H:%M TR')

send_telegram "✅ *Auto-Deploy Başarılı*
📦 Commit: \`${COMMIT_HASH}\`
📁 ${CHANGE_COUNT:-0} dosya güncellendi
🔗 ${DEPLOY_URL:-deploy URL yok}
⏰ ${TIMESTAMP}"

log "Deploy pipeline completed successfully."
