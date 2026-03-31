# Content Agent Araclari

## Dosya Okuma
- cat src/lib/brokers.ts: Broker listesi
- cat src/lib/reviewData/oanda.ts: Spesifik broker review
- ls -la src/lib/reviewData/: Tum review dosyalari

## Git Komutlari
- git log --oneline -5 src/lib/reviewData/: Son degisiklikler
- git blame src/lib/reviewData/oanda.ts | head -20: Kim, ne zaman degistirmis
- git diff HEAD~10 src/lib/brokers.ts: Son 10 commit teki degisiklikler

## Arastirma
- curl ile broker web sitelerinden guncel bilgi cekebilirsin
- Ancak bilgi dogrulama icin kullan, dogrudan icerik alma
