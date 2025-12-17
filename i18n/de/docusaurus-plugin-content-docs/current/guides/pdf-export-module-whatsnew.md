---
title: "Was ist neu im PDF Export Modul"
sidebar_label: "Was ist neu im PDF Export Modul"
---

Was ist neu im PDF Export Modul
===============================

## 0.6.6

* Nicht terminierte Aufgaben werden beim Export nach Excel mit der 'visual'-Konfiguration jetzt ignoriert.

* Templates für DHTMLX Gantt 9.0 wurden hinzugefügt.

## 0.6.5

* Anpassungen am Template für DHTMLX Scheduler 7.0 vorgenommen.

## 0.6.4

* Multipage-Export innerhalb einer einzigen PDF-Datei eingeführt (das Diagramm wird basierend auf dem angegebenen Format in Abschnitten exportiert und anschließend zu einer Datei zusammengeführt).

* Optionen hinzugefügt, um Gitternetz- und Zeitachsenköpfe auf jeder Seite während des Multipage-Exports in einer Datei anzuzeigen.

## 0.6.3

* Das Basis-Image für die Node.js-Umgebung in den Docker-Images auf Version 20 aktualisiert.

* Die Dockerfile wurde optimiert, was zu einer kleineren Docker-Image-Größe führt.

## 0.6.2

* Ein Template für DHTMLX Scheduler 7.0 hinzugefügt.

## 0.6.0

* Der Endpunkt für den MS Project / Primavera P6 Export-Service wurde geändert.

* Der Excel-Export hebt Zeitachsen-Zellen beim Verwenden des Parameters "visual:true" jetzt korrekt hervor.

* Die für den Bau der Docker-Datei verwendeten Pakete wurden aktualisiert.

## 0.5.9

* Die Node.js-Version im Docker-Image wurde aktualisiert.

* Eine nicht verwendete Datei wurde aus dem Docker-Image entfernt, um eine Sicherheitswarnung zu beheben.

* Ein Problem behoben, bei dem der Export fehlschlug, wenn ein Formatter in den Grid-Spalten vorhanden war.

## 0.5.8

* Eine Hauptseite für das Exportmodul mit einem Link zum Testen der Funktionalität hinzugefügt (achten Sie darauf, die URL im Dropdown-Menü vor dem Testen zu überprüfen).
Beispiel: [https://export.dhtmlx.com](https://export.dhtmlx.com)

* Neue Funktion eingeführt: [Import und Export von Gantt für Node.js](guides/export-nodejs.md).

* Fehler beim Excel-Export im Zusammenhang mit dem Parameter `visual:true` behoben, wodurch der Export mit mehreren Skalen, verschiedenen Dauereinheiten und Aufgaben ermöglicht wird, die nicht exakt an den Grenzen der Zeitachsen-Zellen beginnen oder enden müssen.

## 0.5.7

* Kompatibilität mit Node.js 14 verbessert.

* Probleme mit benutzerdefinierten Sprachversionen behoben.

* Einen "init"-Prozess für Docker hinzugefügt.

## 0.5.6

* Speicherlecks beim Betrieb auf Headless-Servern (ohne grafische Oberfläche) und innerhalb von Docker behoben.

## 0.5.5

* Die Gesamtleistung der Anwendung im Docker-Image verbessert.

## 0.5.0

* PhantomJS durch Electron für PDF- und PNG-Export ersetzt.
