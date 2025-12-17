---
title: "Exportdienst - Systemanforderungen für eine eigenständige Installation"
sidebar_label: "Exportdienst - Systemanforderungen für eine eigenständige Installation"
---

Exportdienst - Systemanforderungen für eine eigenständige Installation
=================================================

Die dhtmlxGantt-Bibliothek ermöglicht das Exportieren und Importieren von Daten aus dem Gantt-Diagramm über einen Online-Exportdienst.

Alternativ kann der Export von Gantt-Diagrammen auch lokal erfolgen, indem Sie die [Exportdienste](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) auf Ihrem Computer installieren. Damit die Exportmodule reibungslos funktionieren, stellen Sie bitte sicher, dass Ihr System die folgenden Anforderungen erfüllt:

- PNG/PDF/Excel [Exportanforderungen](guides/export-requirements.md#pdfpngexcelservice)
- MS Project/Primavera P6 [Import- und Exportanforderungen](guides/export-requirements.md#importandexportfrommsprojectandprimaverap6)

## PDF/PNG/Excel-Dienst

### Übersicht

Der Export nach PDF/PNG/Excel ist eine plattformübergreifende Node.js-Anwendung, die in JavaScript entwickelt wurde.


Sie ist sowohl als Quellcode als auch als Docker-Image verfügbar.

### Systemanforderungen

<table class="dp_table">
  <tr>
  <th><b>Hardware</b></th><th><b>Betriebssystem</b></th><th><b>Laufzeitumgebung</b></th>
  </tr>
  <tr>
  <td>- 1 CPU-Kern (ein geteilter virtueller Kern ist ausreichend) - mindestens 500 MB RAM</td>
  <td>- Linux - Windows - MacOS</td>
  <td>- Node.js v12.03 oder neuer, empfohlen werden v18 oder v20 oder - Docker</td>
  </tr>
</table>


## Import und Export aus MS Project und Primavera P6

### Übersicht

Der Export nach MS Project ist eine Anwendung auf Basis des .Net Core Frameworks, die in C# geschrieben ist und unter Windows, MacOS und Linux läuft.

Der Quellcode steht für die Bereitstellung auf Ihrem eigenen Server oder bei jedem Cloud-Anbieter zur Verfügung.
Dieses Projekt ist kompatibel mit MS VisualStudio 2022 und neueren Versionen.

### Systemanforderungen

<table class="dp_table">
  <tr>
  <th><b>Hardware</b></th><th><b>Betriebssystem</b></th><th><b>Laufzeitumgebung</b></th>
  </tr>
  <tr>
  <td>- 1 CPU-Kern (ein geteilter virtueller Kern funktioniert) - mindestens 1000 MB RAM</td>
  <td>- Windows - MacOS - Linux</td>
  <td>- .NET Core 7.0 oder neuer</td>
  </tr>
</table>
