--- 
title: "Export Service - Systemvoraussetzungen für eine eigenständige Installation" 
sidebar_label: "Export Service - Systemvoraussetzungen für eine eigenständige Installation" 
---

# Export Service - Systemvoraussetzungen für eine eigenständige Installation

Die dhtmlxGantt-Bibliothek bietet Ihnen die Möglichkeit, Daten aus dem Gantt-Diagramm über den Export als Online-Dienst zu exportieren und zu importieren.

Sie können Gantt auch lokal exportieren, indem Sie [Exportdienste](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) auf Ihrem Computer installieren. Sie müssen sicherstellen, dass Ihr System die Systemanforderungen erfüllt, um Exportmodule verwenden zu können:

- PNG/PDF/Excel [Export-Anforderungen](guides/export-requirements.md#pdfpngexcel-service)
- MS Project/Primavera P6 [Import- und Export-Anforderungen](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6) 

## PDF/PNG/Excel-Dienst

### Überblick

Der Export nach PDF/PNG/Excel ist eine plattformübergreifende Node.js-Anwendung, die auf JavaScript basiert. 

Er wird in Form von Quellcode und als Docker-Image verteilt.

### Systemanforderungen

<table class="dp_table">
  <tr>
  <th><b>Hardware</b></th><th><b>Betriebssysteme</b></th><th><b>Laufzeitumgebung</b></th>
  </tr>
  <tr>
  <td>- 1 CPU-Kern (geteilte virtuelle Kerne reichen) - mindestens 500 MB RAM</td>
  <td>- Linux - Windows - macOS</td>
  <td>- Node.js v12.03 oder neuer, v18 oder v20 werden empfohlen oder - Docker</td>
  </tr>
</table>


## Import und Export aus MS Project und Primavera P6

### Überblick

Der Export nach MS Project ist eine .NET Core-Anwendung, die in C# geschrieben ist und unter Windows, macOS und Linux läuft.

Wir können Ihnen den Quellcode zur Verfügung stellen, der auf Ihrem eigenen Server oder bei jedem Cloud-Anbieter bereitgestellt werden kann.
Das Quellprojekt ist kompatibel mit MS Visual Studio 2022+.

### Systemanforderungen

<table class="dp_table">
  <tr>
  <th><b>Hardware</b></th><th><b>Betriebssysteme</b></th><th><b>Laufzeitumgebung</b></th>
  </tr>
  <tr>
  <td>- 1 CPU-Kern (geteilte virtuelle Kerne reichen) - mindestens 1000 MB RAM</td>
  <td>- Windows - macOS - Linux</td>
  <td>- .NET Core 7.0+</td>
  </tr>
</table>