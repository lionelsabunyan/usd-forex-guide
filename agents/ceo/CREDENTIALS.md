# Mevcut Credentials — Son Guncelleme: 2026-03-22

## Kritik (Sistem icin zorunlu)
| Credential | Durum | Konum |
|-----------|-------|-------|
| Google Service Account JSON | ✅ MEVCUT | /home/paperclip/google-credentials.json |
| Cloudflare API Key + Email | ✅ MEVCUT | ~/.env → CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL |
| Prerender.io Token | ✅ MEVCUT | ~/.env → PRERENDER_TOKEN |

## Yuksek (Raporlama ve iletisim)
| Credential | Durum | Konum |
|-----------|-------|-------|
| Telegram Bot Token + Chat ID | ✅ MEVCUT | ~/.env → TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID |
| EmailJS Service ID + Public Key | ✅ MEVCUT | ~/.env → EMAILJS_SERVICE_ID + EMAILJS_PUBLIC_KEY (client-side, referans icin) |
| GitHub SSH Key | ✅ MEVCUT | ~/.ssh/id_ed25519 (git push calisir) |

## Orta (Takip ve analitik)
| Credential | Durum | Konum |
|-----------|-------|-------|
| Microsoft Clarity | ✅ MEVCUT | ~/.env → CLARITY_PROJECT_ID (vzw5mhh6ic) |
| IndexNow Key | ✅ MEVCUT | ~/.env → INDEXNOW_KEY |

## API Erisimleri
| API | Property/ID | Durum |
|-----|------------|-------|
| GA4 | properties/519441201 | ✅ |
| GSC | https://beginnerfxguide.com/ | ✅ (siteOwner) |
| Supabase | njxgikhrhxvfveywvsuh.supabase.co | ✅ |

## Kullanim
Tum env vars: source ~/.env
Google API: export GOOGLE_APPLICATION_CREDENTIALS=/home/paperclip/google-credentials.json
CF Deploy: export CLOUDFLARE_API_KEY CLOUDFLARE_EMAIL && unset CLOUDFLARE_API_TOKEN
Git push: git push origin main (SSH key otomatik)
