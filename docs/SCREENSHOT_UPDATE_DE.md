# Megashift – hochauflösende Website-Produktbilder

## Ausgangsbasis und Umfang

Die hochgeladene Website-ZIP entspricht exakt dem Git-Dateibaum von `website-i18n` bei Commit `f66c61d89119ae0099c264cf735c150d269d36c0`:

`2670867c374e5de193dd18435f0b36adb747b8bc`

Als gestalterische Referenz wurden `pages/index.js`, `styles/Home.module.css` und `styles/Site.module.css` aus `main` bei `331c31d5319250313c00eb291ef9d669f2556ac1` geprüft. Es wurde weder nach GitHub gepusht noch PR #4 gemerged. Diese Lieferung ist ein lokal vorbereitetes Update, kein bereits veröffentlichtes Deployment.

Die drei Teile des Screenshot-Archivs wurden in der Reihenfolge `.001`, `.002`, `.003` zusammengefügt und erfolgreich entpackt. Das Material enthält 38 Sprach-/Regionssets. Für die 37 Website-Sprachen wird Englisch (en-US) verwendet; das zusätzliche australische Englisch wird nicht einer weiteren Website-Route zugeordnet.

## Neue Assets

185 Einzeldateien unter `public/images/screenshots/<locale>/`, insgesamt rund 53,24 MiB. Eine Seite verwendet nur die fünf Bilder ihrer Sprache; Kalender und Auswertungen werden innerhalb der Seite wiederverwendet. Das gesamte 37-Sprachen-Paket wird nicht als ein Bild geladen.

| Ansicht | Quelldatei | Native Ausgabe | Ausschnitt im Original, rechts/unten exklusiv |
|---|---|---|---|
| Kalender | 02.png | 1144 × 2473 | 518, 718, 1662, 3191 |
| Kalender + Termine | 03.png | 1144 × 2473 | 518, 718, 1662, 3191 |
| Auswertungen | 04.png; Bengali: 05.png | 1118 × 2473 | 527, 713, 1645, 3186 |
| PDF | 06.png | 2064 × 2545 | 77, 742, 2141, 3287 |
| Cloud | 07.png | 2096 × 2040 | 33, 1100, 2129, 3140 |

Die Originale sind jeweils 2160 × 3840 Pixel groß. Die Ausgabe erfolgt als **verlustfreies WebP**, ohne Verkleinern, Hochskalieren, Nachschärfen, KI-Rekonstruktion oder verlustbehaftete Neukomprimierung. Die dekodierten RGB-Pixel jedes WebP stimmen exakt mit dem jeweiligen PNG-Ausschnitt überein. Die Phone-Ausschnitte enthalten keinen Metall-/Geräterand und keine Store-Überschriften oder Fußtexte. Die maskierten Display-Ecken liegen innerhalb des CSS-Phone-Rahmens wie bei Main.

PDF und Cloud bleiben die bisherigen Produktkompositionen: überlagerte PDF-Seiten bzw. Telefon und Tablet. Sie werden nicht in einen neuen einzelnen Phone-Mockup umgebaut. Die Store-Überschrift und der Store-Fußtext sind entfernt. Die Bildausschnitte erhalten die Seitenverhältnisse von Main mit weniger als 0,05 % Abweichung durch ganzzahlige native Pixelgrenzen.

Die native Breite reicht auch bei den größten vorgesehenen Darstellungen für DPR 3. Für Deutsch liegen die beiden Hero-Dateien zusammen bei rund 471 KiB; alle fünf Dateien zusammen bei rund 1,41 MiB. Nur die zwei Hero-Bilder werden priorisiert, die weiteren Bilder behalten Lazy Loading. `next/image` liefert die WebP-Dateien mittels `unoptimized` ohne zusätzliche Qualitätsreduzierung aus.

## Wiederhergestellte Main-Gestaltung

Der originale dunkle Rahmen ist wieder aktiv: 7 px Rand, Farbe `#111728`, 34 px Radius, 1 px Außenlinie und der ursprüngliche Schatten. Hero-Phones: 255/215 px auf Desktop, Rotation +6°/−9°. Auswertungs-Phone: 245 px und −4°. Kalenderpaar: 235/185 px auf Desktop, −4°/+4°, inklusive der ursprünglichen Abdunklung/Überlagerung des hinteren Telefons.

Tablet-/Mobilgrößen, Positionen und die Cloud-/PDF-Komposition entsprechen den referenzierten Main-Regeln. Die zusätzlichen Atlas-Branch-Schlagschatten wurden entfernt. Die Auswertungen verwenden wieder direkt `Phone` statt eines zusätzlichen Wrapper-Divs. Die offiziellen Store-Badges, Texte, Language Selector, SEO-, Sitemap- und Routing-Struktur bleiben erhalten.

## Wichtige Probleme im gelieferten Screenshot-Material

Die folgenden Inhalte können nicht durch einen Zuschnitt übersetzt werden:

| Website-Sprache | Betroffene Quellen/Assets | Nachgewiesener Inhalt |
|---|---|---|
| Thai (`th`) | 02, 03, 06, 07 / Kalender, Termine, PDF, Cloud | Die zugeschnittenen Pixel sind identisch mit den deutschen Bildern. |
| Hindi (`hi`) | 02, 03, 06, 07 / Kalender, Termine, PDF, Cloud | Die zugeschnittenen Pixel sind identisch mit den englischen Bildern. |

Die Auswertungsbilder aus 04 sind für Thai und Hindi tatsächlich lokalisiert. Die oben genannten Bilder wurden quellgetreu zugeschnitten und **nicht** künstlich umbeschriftet. Das ist kein Fehler bei der Locale-Auswahl und kein ausgelöster Englisch-Fallback.

Bengali ist vollständig verwendbar. In diesem Sprachset sind die Motive 04 und 05 gegenüber den anderen Sprachen vertauscht: 04 zeigt „Einträge & Stunden“, die passende „Übersicht“ mit Ringdiagramm liegt in `05.png`. Die Zuordnung wurde deshalb ausdrücklich auf `05.png` korrigiert und durch einen eigenen Regressionstest geschützt. Für Bengali ist kein zusätzliches Ausgangsbild nötig.

Die beiden portugiesischen Sets enthalten ebenfalls dieselben Bilder; das ist als gemeinsame Sprache/Artwork zugelassen und wird nicht mit den sprachlich falschen Thai-/Hindi-Quellen gleichgesetzt. Regionale Beispielwährungen sollten bei der inhaltlichen Freigabe geprüft werden.

`node scripts/review-screenshot-localization.mjs` meldet die acht unerwarteten Duplikat-Gruppen. Mit `--strict` beendet sich der Prüfer bis zur Korrektur mit Fehlerstatus. Dieser zusätzliche Freigabe-Check ist bewusst vom technischen Build getrennt, damit zunächst eine Preview zur Sichtprüfung erstellt werden kann.

## Auth-Sicherheit

Vor und nach der Bearbeitung wurden die folgenden vier Dateien als Rohbytes per SHA-256 verglichen. Alle sind unverändert:

```text
pages/welcome.js
323c733d712d7c0a0988f24f4068b37008553d00d0c4a5a3adfabbd97d216f65

pages/reset-password.js
e996d4e8e1461f508b61e6301e7e8790bddb687c82e363d9467f1ad5c908dcfe

messages/reset-password-messages.js
327f74c0bde5736a3b91766b6b6fd5e7f13f1630fd08e851e2668762c2c8adf5

next.config.mjs
7737efa209ec05812c08fb628c177e28f4f2b2df882a3e792bc3bbca23aa2526
```

Der vorhandene Test `existing auth implementation remains unchanged` wurde unverändert beibehalten. Nur die veralteten Atlas-Erwartungen im separaten Lokalisierungstest wurden ersetzt. Ein weiterer Test schützt zusätzlich `next.config.mjs`. Auch `_app.js`, `_document.js`, die Auth-Routen, die rechtlichen Seiten, globale CSS-Datei, Sprachdaten und npm-Abhängigkeiten wurden nicht verändert.

## Prüfstatus dieser Lieferung

- Node-Regressionstests: 16 von 16 bestanden, inklusive der bisherigen Auth-Tests.
- Assets: 185 von 185 erfolgreich dekodiert und gegen Dateihashes, Dimensionen und die Original-PNG-Pixel geprüft.
- Isolierte Browser-/CSS-Prüfung: 22 Fälle in Chromium, Desktop DPR 2, Mobil DPR 3 und Tablet DPR 2. Zehn repräsentative Sprachen auf Desktop und Mobil, zusätzlich Englisch/Deutsch auf Tablet. Alle sieben Bildinstanzen aus fünf lokalen Einzeldateien pro Fall geladen; Rahmen, Größen und native Pixeldichte geprüft.
- Die Browserprüfung verwendet isolierte Render-Fixtures der Marketing-Komponenten und CSS-Dateien. Wegen gesperrter lokaler HTTP-Navigation wurden die lokalen Dateien nur für diese Prüfung eingebettet. Das ist **kein Next.js-/React-Hydrationstest und keine Vercel Preview**. Externe Store-Badges waren nicht Gegenstand dieses Offline-Checks.
- Zusätzliche JavaScript-Syntaxdiagnostik per TypeScript-Transpiler: ohne Syntaxfehler. Dies ist kein Ersatz für ESLint.
- `npm run lint`: gestartet, aber mit `eslint: not found` abgebrochen (Exit 127).
- `npm run build`: Prebuild/Sitemap/Tests ausgeführt; der eigentliche Build ist mit `next: not found` abgebrochen (Exit 127).
- `npm ci` konnte in dieser Umgebung nicht abgeschlossen werden; `registry.npmjs.org` und GitHub sind über die lokale Netzwerkumgebung nicht auflösbar.
- Neue Vercel Preview: **nicht erstellt**. Die verfügbaren GitHub-/Vercel-Aktionen dieser Sitzung erlauben keine Veröffentlichung/Schreiboperation. Der Production-Build, reale Routen-/Hydrationstests und die Preview-Freigabe sind deshalb offen.

## Update im vorhandenen Repository anwenden

Nur **eine** der beiden Varianten verwenden: entweder die vollständigen Projektdateien aus der ZIP übernehmen oder den mitgelieferten Git-Patch anwenden. Die vollständige Projekt-ZIP enthält keine `.git`-Historie, keine `node_modules`, keinen Build-Output und keine echten Umgebungsvariablen. Beim manuellen Kopieren müssen außerdem die drei unten aufgeführten Atlas-Dateien gelöscht werden.

Empfohlen ist der Patch auf dem unveränderten Ausgangsbranch. Zuerst sicherstellen, dass der Arbeitsbaum sauber ist:

```bash
git switch website-i18n
git status --short
git rev-parse HEAD
# Erwarteter Ausgangscommit: f66c61d89119ae0099c264cf735c150d269d36c0

git apply --check /pfad/zu/changes.patch
git apply /pfad/zu/changes.patch
node scripts/verify-auth.mjs

npm ci
npm run lint
npm test
npm run build
```

Danach lokal prüfen und ausschließlich den Feature-Branch pushen:

```bash
git diff --stat
git diff -- pages/welcome.js pages/reset-password.js messages/reset-password-messages.js next.config.mjs
# Der letzte Befehl muss leer bleiben.

git add -A
git commit -m "Replace screenshot atlases with lossless localized assets"
git push origin website-i18n
```

Die bestehende Vercel-Git-Integration kann daraus eine neue Branch-Preview bauen. Die neue Deployment-URL und die Build-Logs anschließend tatsächlich prüfen; eine alte Preview ist kein Nachweis für dieses Update. In der echten Preview zusätzlich `/`, `/de`, `/ja`, `/ko`, `/th`, `/bn`, `/hi`, `/zh-cn`, `/zh-tw`, lokalisierte Support-Seiten sowie `/welcome` und `/reset-password` kontrollieren. Die Auth-Routen dürfen nicht umgeleitet werden; Sprache im Browser darf `/` nicht automatisch weiterleiten.

PR #4 bleibt ein Draft. **Nicht nach `main` mergen und nicht als Production deployen**, solange Quellenkorrekturen, Lint/Build und die echte Preview-Prüfung offen sind.

## Entfallene Dateien

```text
public/images/screenshots-phone.avif
public/images/screenshots-pdf.avif
public/images/screenshots-cloud.avif
```

Die bisherigen englischen SVG-Dateien bleiben absichtlich vorhanden. Die neuen Marketing-Phones, PDF- und Cloud-Bilder verwenden sie nicht mehr; `hours.svg` und `themes.svg` bleiben für bisherige optionale `Phone`-Aufrufer erhalten.
