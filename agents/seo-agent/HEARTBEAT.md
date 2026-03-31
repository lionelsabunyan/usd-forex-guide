# SEO Agent Heartbeat

## Her Uyanista Yap
1. cd /home/paperclip/usd-forex-guide
2. git pull origin main (en son kodu al)
3. python3 scripts/seo-quick-check.py calistir
4. Indekslenmemis sayfa varsa: python3 scripts/gsc-request-indexing.py calistir
5. Sitemap dogrula: python3 scripts/verify-sitemap.py
6. Sonuclari ozetle ve raporla
7. Kritik sorun varsa Analytics Agent a bildir

## Siklik
- Gunluk 07:00 UTC
- Acil durumlarda (indeksleme sorunu tespiti) aninda

## Basari Kriterleri
- Tum sayfalar indeksli
- Sitemap gecerli ve guncel
- Canonical URL ler tutarli
