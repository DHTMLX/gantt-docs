--- 
title: "Export-Module: Systemvoraussetzungen" 
sidebar_label: "Systemvoraussetzungen" 
---

# Export-Module: Systemvoraussetzungen

Um die [Export-Module](guides/export-modules.md) auf Ihrem eigenen Server zu installieren, stellen Sie sicher, dass Ihr System die unten aufgeführten Anforderungen des jeweiligen Moduls erfüllt.

## PDF/PNG/Excel-Dienst {#pdfpngexcel-service}

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
  <td>- Node.js v20 oder neuer oder - Docker</td>
  </tr>
</table>


## Import und Export aus MS Project und Primavera P6 {#import-and-export-from-ms-project-and-primavera-p6}

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