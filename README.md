# KApps

Portale ufficiale delle applicazioni pubblicate da canbelieve.

## Sito

https://canbelieve.github.io/

## Applicazioni

- **KAde Suite**  
  https://canbelieve.github.io/kade-suite/

- **Jotta Explorer**  
  https://canbelieve.github.io/jotta-explorer.html

- **AblVST Studio**  
  https://canbelieve.github.io/ablvst-studio.html

## Download

### Jotta Explorer

Le release di Jotta Explorer sono distribuite tramite GitHub Releases.

https://github.com/canbelieve/canbelieve.github.io/releases

### AblVST Studio

Windows e macOS di AblVST Studio vengono pubblicati nella stessa release GitHub del repository `canbelieve/ablvst-studio`:

https://github.com/canbelieve/ablvst-studio/releases/latest

La pagina prodotto `ablvst-studio.html` legge automaticamente la release pubblicata piu' recente e collega installer Windows, versione portatile, DMG macOS, checksum e report di build. Per ogni aggiornamento e' quindi sufficiente pubblicare una nuova release con gli asset di entrambe le piattaforme; non serve modificare i link della pagina.

La cartella `downloads/ablvst-studio/` rimane temporaneamente come fallback locale per i file Windows della versione 1.0.1 e potra' essere rimossa dopo aver verificato che la prima release unificata contenga tutti gli asset:

- installer: `AblVST-Studio-1.0.1-Windows-x64-Setup.exe`
- versione portatile: `AblVST-Studio-1.0.1-Windows-x64-Portable.zip`
- checksum: `SHA256SUMS-windows.txt`
- report: `BUILD-REPORT-windows.txt`

Gli asset macOS devono essere aggiunti alla release GitHub insieme al DMG e, quando disponibili, al relativo ZIP, checksum e report. La release deve essere pubblicata come release stabile, non come bozza o prerelease.


---

© 2026 KApps
