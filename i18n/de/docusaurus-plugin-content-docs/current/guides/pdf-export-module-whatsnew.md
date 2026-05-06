---
title: "Was gibt es Neues im PDF-Export-Modul"
sidebar_label: "Was gibt es Neues im PDF-Export-Modul"
---

Neuigkeiten im PDF-Export-Modul
================================

## 0.7.7

- Behebung: Die Parameter `width` und `height` werden beim Mehrseiten-PDF-Export ignoriert, wenn der Parameter `format` angegeben ist
- Behebung: Leere Seiten beim Einzelseiten-Export werden nicht mehr hinzugefügt, wenn `merge_pages` aktiviert ist
- Behebung: Temporäre Dateien werden nach dem Export gelöscht
- Behebung: HTML-Fehlausrichtung in komplexen Layouts
- Verbesserung der Seiten-Größenberechnung für den Gantt-PDF-Export
- Automatisierte Tests hinzugefügt, um den PDF- und PNG-Export für Gantt und Scheduler zu vergleichen

## 0.7.6

- Verbesserte Sanitierung von HTML-Inhalten für den PDF- und PNG-Export von Gantt und Scheduler
- Behebung von Remote-Code-Ausführung- und File-Read-Sicherheitslücken

## 0.7.4

- Behebung der Hintergrundfarbe in den Mehrseiten-PDF-Kopfzeilen und -Fußzeilen
- Behebung des PDF- und PNG-Exports auf älteren Scheduler-Versionen (4.2-5.1)
- Behebung des Scheduler-PDF-Exports mit Wasserzeichen

## 0.7.3

- Vorlagen für Gantt 9.1 aktualisiert

## 0.7.2

- Abhängigkeit von externen Google-Schriftarten für Gantt 9.0 entfernt
- PNG-Export verbessert, wenn die `slice_archive`-Konfiguration verwendet wird
- Verbesserte Unterstützung für Sonderzeichen im Dateinamen unter Windows
- Verbesserung der Timeout-Meldung beim PDF/PNG-Export
- Behebung des PDF-Exports im Landschaftsmodus mit der `merge_pages`-Konfiguration
- Behebung von Fehlern bei der Verwendung von HTML in den header- und footer-Parametern im Mehrseiten-Export
- Behebung des PDF- und PNG-Exports unter Windows, wenn der Export-Modulpfad Leerzeichen enthält
- Behebung des Zoomens des Inhalts von Kopf- bzw. Fußzeile im Mehrseiten-Export
- Behebung der `slice_checker`-Option bei Verwendung eines benutzerdefinierten Namens im PNG-Export
- Behebung von Hängen des PNG-Exports in einigen Szenarien
- Behebung des Abbruchs des PDF/PNG-Exports, wenn mehrere Exportanfragen innerhalb derselben Millisekunde unter Windows eingehen

## 0.7.1

- Excel-Export: Unterstützung für gesplittete Aufgaben in der gerenderten Timeline-Darstellung (`visual: true`)
- Excel-Export: Behebung der Aufgaben-Darstellung, wenn `end_date` früher als `start_date` in der gerenderten Timeline-Darstellung ist
- Excel-Export: Keine Anzeige der Daten von ungeplanten Aufgaben

## 0.7.0
  
- Electron-Version auf 29 aktualisiert
- Benutzerdefinierten Randabstand für den PDF-Export hinzugefügt
- Unterstützung für Kopfzeile und Fußzeile auf jeder Seite (einschließlich einer Möglichkeit, die Seitennummer anzugeben)
- Unterstützung für A0, A1, A2 und Ledger-Formate hinzugefügt
- Vorlagen für Gantt und Scheduler aktualisiert
- Der Stilbefehl `background-clip: text` und andere Stilregeln sollten funktionieren, da Chrome 122 unterstützt wird
- Behebung des PDF-Exports mit komplexem benutzerdefiniertem Layout
- Behebung des Teilinhaltsexports bei Verwendung des Ressourcenpanels
- Behebung leerer Seiten in PDFs, wenn im `header`-Parameter h1, h2 und ähnliche Tags hinzugefügt werden
- Behebung eines Exports-Hangs bei der Verwendung von benutzerdefinierten Daten mit den `raw: true`- und `merge_pages: true`-Konfigurationen
- Behebung des Electron-Starts unter Windows (EINVAL-Fehler)

## 0.6.7

- Vorlagen für DHTMLX Gantt 9.0 Raw-Export aktualisiert
- Behebungen für die sticky-Scale-Zellen beim `raw`-Export

## 0.6.6

- Ungeplante Aufgaben beim Export nach Excel mit der 'visual'-Konfiguration ignorieren
- Vorlagen für DHTMLX Gantt 9.0 hinzugefügt

## 0.6.5

- Korrekturen für DHTMLX Scheduler 7.0-Template

## 0.6.4

- Multipage-Export in einer PDF-Datei hinzugefügt (Diagramm für das angegebene Format in Blöcken exportieren und anschließend die Seiten zu einer Datei zusammenführen)
- Funktion, um Gitter- und Timeline-Kopfzeilen pro Seite anzuzeigen, wenn die Mehrseiten-Export-Funktionalität in einer Datei verwendet wird

## 0.6.3

- Basisbild für die Node.js-Umgebung auf Node.js 20 für die Docker-Images aktualisiert
- Dockerfile optimiert und Größe des Docker-Images reduziert

## 0.6.2

- Vorlage für DHTMLX Scheduler 7.0 hinzugefügt

## 0.6.0

- Endpunkt des MS Project / Primavera P6-Exportdienstes geändert
- Behebung des Excel-Exports: korrekte Hervorhebung der Timeline-Zellen mit dem Parameter `visual:true`
- Pakete zum Erstellen des Dockerfiles aktualisiert

## 0.5.9

- Node.js-Version für das Docker-Image aktualisiert
- Nicht verwendete Datei im Docker-Image entfernt, um die Sicherheitswarnung zu beheben
- Behebung des Fehlers, wenn der Export nicht funktioniert, wenn der Formatter in den Grid-Spalten vorhanden ist

## 0.5.8

- Hauptseite für das Export-Modul mit dem Link zum Testen der Export-Funktionalität (prüfen Sie die URL im Dropdown vor dem Testen).
Beispiel: [https://export.dhtmlx.com](https://export.dhtmlx.com)
- Neue Funktion: [Import und Export von Gantt für Node.js](guides/export-nodejs.md)
- Fehlerbehebung beim Excel-Export mit dem Parameter `visual:true`. Jetzt können Sie Daten mit mehreren Skalen exportieren, unterschiedliche Dauer-Einheiten verwenden, und Aufgaben müssen nicht am Anfang der Timeline-Zellen beginnen und enden

## 0.5.7

- Verbesserte Kompatibilität mit Node.js 14
- Korrekturen für benutzerdefinierte Lokalisierungen
- Hinzugefügt: der `init`-Prozess für das Docker-Image

## 0.5.6

- Behebung einiger Speicherlecks im Betrieb auf Headless-Servern (ohne grafische Oberfläche) und im Docker

## 0.5.5

- Verbesserung der Arbeit der Anwendung im Docker-Image

## 0.5.0

- Wechsel von PhantomJS zu Electron für den PDF- und PNG-Export