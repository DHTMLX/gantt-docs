---
title: "Export-Module"
sidebar_label: "Export-Module"
---

# Export-Module

Ein Exportmodul ist ein Exportdienst, den Sie auf Ihrem eigenen Server installieren, statt den Online-Exportdienst unter `https://export.dhtmlx.com` zu verwenden. Um Export- und Importanfragen an Ihr Modul zu senden, legen Sie den Parameter `server` der Export- und Importmethoden auf die Adresse des Moduls fest:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

Verwenden Sie ein Exportmodul, wenn Sie große Diagramme exportieren, den Export ohne die Limits des Online-Exportdienstes durchführen oder die Projektdaten in Ihrem eigenen Netzwerk behalten möchten. Die Liste der Formate und Methoden finden Sie unter [Exportieren und Importieren von Daten](guides/export-common.md).

## Die zwei Module

| Modul | Technologie | Formate | Anforderungen | Installation | Versionshistorie |
|---|---|---|---|---|---|
| PDF/PNG/Excel-Modul | Node.js, auch als Docker-Image verfügbar | PDF, PNG, Excel (Export und Import), iCal, JSON | [Systemvoraussetzungen](guides/export-requirements.md#pdfpngexcel-service) | [Export-Modul für PDF, PNG, Excel und iCal](guides/pdf-export-module.md) | [Neuigkeiten](guides/pdf-export-module-whatsnew.md) |
| MS Project/P6-Modul | .NET (C#) | MS Project und Primavera P6 (Export und Import) | [Systemvoraussetzungen](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6) | [Export-Modul für MS Project und Primavera P6](guides/msp-export-module.md) | [Neuigkeiten](guides/msp-export-module-whatsnew.md) |

Sie können beide Module im [Client-Bereich](https://dhtmlx.com/clients/) auf der Registerkarte Downloads herunterladen.

## Zusammenspiel der beiden Module {#service-topology}

Jedes Modul verarbeitet nur seine eigenen Formate:

- Das PDF/PNG/Excel-Modul erstellt PDF-, PNG-, Excel-, iCal- und JSON-Dateien und importiert Excel-Dateien. Es kann keine MS-Project- und Primavera-P6-Dateien konvertieren. Wenn es eine Anfrage für MS Project oder Primavera P6 erhält, leitet es die Anfrage an einen MS-Project-Dienst weiter.
- Das MS Project/P6-Modul verarbeitet nur Anfragen für MS Project und Primavera P6. Andere Anfragen, zum Beispiel `gantt.exportToPDF({server: "msp-module-url"})`, funktionieren nicht.

| Methoden | Was das PDF/PNG/Excel-Modul mit der Anfrage macht |
|---|---|
| `exportToPDF()`, `exportToPNG()`, `exportToExcel()`, `importFromExcel()`, `exportToICal()`, `exportToJSON()` | Verarbeitet sie selbst |
| `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()`, `importFromPrimaveraP6()` | Leitet sie an die Adresse in der Umgebungsvariable `MSP_SERVICE_ENDPOINT` weiter. Die Standardadresse ist der Online-Dienst `https://export.dhtmlx.com/msproject` |

:::warning
Standardmäßig sendet ein PDF/PNG/Excel-Modul auf Ihrem Server alle Daten für MS Project und Primavera P6 an den Online-Exportdienst unter `https://export.dhtmlx.com/msproject`. Um diese Daten in Ihrem Netzwerk zu behalten, installieren Sie das MS Project/P6-Modul und legen Sie `MSP_SERVICE_ENDPOINT` auf dessen Adresse fest.
:::

Sie können Anfragen für MS Project und Primavera P6 auch direkt an das MS Project/P6-Modul senden: Legen Sie dazu den Parameter `server` von `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()` und `importFromPrimaveraP6()` auf dessen Adresse fest.

## Alle Daten im eigenen Netzwerk behalten

1. Legen Sie den Parameter `server` jeder Export- und Importmethode, die Sie verwenden, auf die Adresse Ihres Moduls fest. Eine Methode ohne `server` sendet die Daten an den Online-Exportdienst.
2. Wenn Anfragen für MS Project oder Primavera P6 über das PDF/PNG/Excel-Modul laufen, legen Sie dessen Umgebungsvariable `MSP_SERVICE_ENDPOINT` auf die Stammadresse Ihres MS Project/P6-Moduls fest, zum Beispiel:

   ~~~
   MSP_SERVICE_ENDPOINT=http://localhost:5128
   ~~~

3. Wenn Exporte keine Hosts außerhalb Ihres Netzwerks kontaktieren dürfen, schränken Sie die externen Ressourcen ein, die das PDF/PNG/Excel-Modul beim Rendern eines Diagramms laden kann. Die Umgebungsvariablen `EXPORT_ALLOWED_RESOURCE_HOSTS` und `EXPORT_BLOCK_EXTERNAL_RESOURCES` bewirken dies. Die README-Datei des Moduls beschreibt sie.

## Lizenz und Download

Exportmodule sind nicht im Gantt-Paket enthalten. Ein Exportmodul wird kostenlos bereitgestellt, wenn Sie Gantt unter einer [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-, [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)- oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-Lizenz erworben haben, oder Sie können das Modul [separat kaufen](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). Lesen Sie den [entsprechenden Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), um die Nutzungsbedingungen jedes Moduls zu erfahren.

Nachdem Sie eine Lizenz erhalten haben, laden Sie die Module im Client-Bereich auf der Registerkarte Downloads herunter.