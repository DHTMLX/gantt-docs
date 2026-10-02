---
title: "Exportieren und Importieren von Daten"
sidebar_label: "Exportieren und Importieren von Daten"
---

# Exportieren und Importieren von Daten

dhtmlxGantt kann ein Diagramm in PDF-, PNG-, Excel-, iCal-, MS-Project-, Primavera-P6- und JSON-Dateien exportieren und Daten aus Excel-, MS-Project- und Primavera-P6-Dateien importieren. Jeder Datei-Export und -Import läuft über einen Exportdienst: entweder über den von DHTMLX gehosteten Online-Exportdienst oder über ein [Exportmodul](guides/export-modules.md), das Sie auf Ihrem eigenen Server installieren.

In dieser Dokumentation gilt:

- **Exportdienst** ist die Software, die Gantt-Daten in eine Datei oder eine Datei in Gantt-Daten umwandelt;
- **Online-Exportdienst** ist die Instanz des Exportdienstes, die DHTMLX unter `https://export.dhtmlx.com` betreibt;
- **Exportmodul** ist ein Exportdienst, den Sie selbst installieren und betreiben.

## Was Sie exportieren und importieren können

| Format | Export | Import | Methoden | Exportmodul | Anleitung |
|---|---|---|---|---|---|
| PDF | Ja | - | [exportToPDF()](api/method/exporttopdf.md) | PDF/PNG/Excel-Modul | [PDF und PNG](guides/export.md) |
| PNG | Ja | - | [exportToPNG()](api/method/exporttopng.md) | PDF/PNG/Excel-Modul | [PDF und PNG](guides/export.md) |
| Excel | Ja | Ja | [exportToExcel()](api/method/exporttoexcel.md), [importFromExcel()](api/method/importfromexcel.md) | PDF/PNG/Excel-Modul | [Excel](guides/excel.md) |
| iCal | Ja | - | [exportToICal()](api/method/exporttoical.md) | PDF/PNG/Excel-Modul | [iCal](guides/ical.md) |
| MS Project | Ja | Ja | [exportToMSProject()](api/method/exporttomsproject.md), [importFromMSProject()](api/method/importfrommsproject.md) | MS Project/P6-Modul | [MS Project](guides/export-msproject.md) |
| Primavera P6 | Ja | Ja | [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md), [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) | MS Project/P6-Modul | [Primavera P6](guides/export-primavera.md) |
| JSON-Datei | Ja | - | [exportToJSON()](api/method/exporttojson.md) | PDF/PNG/Excel-Modul | - |
| JSON oder XML auf der Seite | Ja | - | [serialize()](api/method/serialize.md) | nicht erforderlich, läuft im Browser | [JSON und XML](guides/serialization.md) |

Informationen zum Export und Import von Daten auf der Serverseite finden Sie unter [Export und Import von Daten in Node.js](guides/export-nodejs.md).

## So funktioniert der Export

1. Sie aktivieren das Plugin `export_api` mit der Methode [plugins](api/method/plugins.md) und rufen eine Export- oder Importmethode auf, zum Beispiel `gantt.exportToPDF()`.
2. Die Methode sendet die Gantt-Daten in einer POST-Anfrage an einen Exportdienst.
3. Der Exportdienst erstellt die Datei oder liest die importierte Datei.
4. Der Browser erhält die Datei. Beim Import erhält die `callback`-Funktion der Methode die Daten. Beim Export kann eine `callback`-Funktion stattdessen die URL der generierten Datei erhalten.

Standardmäßig senden alle Methoden Anfragen an den Online-Exportdienst unter `https://export.dhtmlx.com/gantt`. Um sie an einen anderen Exportdienst zu senden, zum Beispiel an Ihr eigenes Exportmodul, legen Sie den Parameter `server` der Methode fest:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Online-Exportdienst oder eigene Installation

- **Wasserzeichen.** Der Online-Exportdienst ist kostenlos, aber die von ihm erstellten PDF- und PNG-Dateien enthalten ein Wasserzeichen, sofern Sie keine gültige Lizenz haben. Siehe [Lizenz und Wasserzeichen](#license-and-watermark).
- **Limits.** Der Online-Exportdienst hat Zeit- und Größenlimits für Anfragen. Siehe [Limits des Online-Exportdienstes](#service-limits). Ein Exportmodul, das Sie installieren, hat die Limits, die Sie konfigurieren.
- **Speicherort der Daten.** Der Online-Exportdienst verarbeitet Ihre Daten auf den Servern von DHTMLX. Mit Exportmodulen können Sie die Daten in Ihrem Netzwerk behalten. Siehe [Zusammenspiel der beiden Module](guides/export-modules.md#service-topology).
- **Einrichtung.** Der Online-Exportdienst erfordert keine Einrichtung. Ein Exportmodul benötigt einen Server: Node.js oder Docker für das PDF/PNG/Excel-Modul, .NET für das MS Project/P6-Modul. Siehe [Export-Module](guides/export-modules.md).

## Limits des Online-Exportdienstes {#service-limits}

:::note
Der Online-Exportdienst hat Zeit- und Größenbeschränkungen für Anfragen.
:::

### Zeitlimits

Wenn der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und folgender Fehler tritt auf:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Personen gleichzeitig Gantt exportieren, kann der Prozess länger dauern als üblich. Das ist jedoch unproblematisch, da die Zeit, die für die Exportanfrage eines bestimmten Benutzers aufgewendet wird, separat gezählt wird.

### Limits der Anfragegröße

Es gibt einen gemeinsamen API-Endpunkt `https://export.dhtmlx.com/gantt`, der für alle Exportmethoden (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.) dient. **Die maximale Anfragegröße beträgt 10 MB**.

Es gibt auch einen separaten API-Endpunkt `https://export.dhtmlx.com/gantt/project`, der speziell für die Export-/Import-Dienste von MS Project und Primavera P6 (nur *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*) vorgesehen ist. **Maximale Anfragegröße: 40 MB**. Wie Sie ihn verwenden, erfahren Sie für [MS Project](guides/export-msproject.md#limits-on-request-size-and-import-of-large-files) und [Primavera P6](guides/export-primavera.md#limits-on-request-size-and-import-of-large-files).

## Lizenz und Wasserzeichen {#license-and-watermark}

:::note
Der Online-Exportdienst ist kostenlos, aber die ausgegebenen PDF- und PNG-Dateien enthalten das Wasserzeichen der Bibliothek.
Um ohne Wasserzeichen zu exportieren, benötigen Sie eine gültige Lizenz – das Exportergebnis steht ohne Wasserzeichen
während der gültigen Support-Periode (12 Monate für alle PRO-Lizenzen) zur Verfügung.
:::

Exportmodule sind nicht im Gantt-Paket enthalten. Ein Exportmodul wird kostenlos bereitgestellt, wenn Sie Gantt unter einer [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-, [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)- oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-Lizenz erworben haben, oder Sie können das Modul [separat kaufen](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). Lesen Sie den [entsprechenden Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), um die Nutzungsbedingungen jedes Moduls zu erfahren.