---
sidebar_label: importFromExcel
title: importFromExcel method
description: "Konvertiert eine Excel-Datei in JSON"
---

# importFromExcel

### Description

@short: Wandelt eine Excel-Datei in JSON um

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (erforderlich) *Objekt* - ein Objekt mit Konfigurationsparametern einer importierten Datei

### Example

~~~jsx
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~

### Related samples
- [Excel-Datei importieren](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
Die Methode benötigt HTML5 File API-Unterstützung.
:::

:::note
Diese Methode ist in der **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren. Lesen Sie die Details im [Export/Import für Excel, Export nach iCal](guides/excel.md#importfromexcel) Artikel.
:::

:::note
Wenn Sie eine Gantt-Version verwenden, die älter als 8.0 ist, müssen Sie auf Ihrer Seite das **https://export.dhtmlx.com/gantt/api.js** einbinden, um den Online-Export-Service zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Die Methode nimmt als Parameter ein Objekt mit Konfigurationsparametern einer importierten Datei:

- **server** - legt den API-Endpunkt für die Anfrage fest. Kann mit der lokalen Installation des Importdienstes verwendet werden. Der Standardwert ist **https://export.dhtmlx.com/gantt**.
- **data** - eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File) die eine Excel-Datei (xlsx) enthalten sollte.
- **callback** - eine Callback-Funktion.
- **sheet** - die Nummer des Arbeitsblatts des Dokuments, das vom Importdienst zurückgegeben werden soll.

## Antwort

Die Antwort enthält ein JSON-Objekt mit einem Array von Objekten:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

wo:

- Werte der ersten Zeile dienen als Eigenschaftsnamen der importierten Objekte.
- Jede Zeile wird als eigenständiges Objekt serialisiert.
- Datumswerte werden im Format "%Y-%m-%d %H:%i" serialisiert.

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export/Import für Excel, Export nach iCal](guides/excel.md#importfromexcel)