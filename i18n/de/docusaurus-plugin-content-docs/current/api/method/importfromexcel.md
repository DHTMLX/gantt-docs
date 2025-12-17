---
sidebar_label: importFromExcel
title: importFromExcel method
description: "wandelt eine Excel-Datei in das JSON-Format um"
---

# importFromExcel

### Description

@short: Wandelt eine Excel-Datei in das JSON-Format um

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - ein Objekt, das Konfigurationseinstellungen für die importierte Datei enthält

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
- [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
 Diese Methode erfordert Unterstützung für die HTML5 File API. 
:::

:::note
 Diese Methode ist Teil der **export**-Erweiterung, daher müssen Sie das [export_api](guides/extensions-list.md#exportservice) Plugin aktivieren. Weitere Details finden Sie im Artikel ["Export/Import für Excel, Export nach iCal"](guides/excel.md#importfromexcel).

 
:::

:::note
 Für Gantt-Versionen vor 8.0 müssen Sie **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite einbinden, um den Online-Export-Service zu nutzen, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Diese Methode akzeptiert ein Objekt mit Konfigurationsoptionen für die zu importierende Datei:

- **server** - gibt den API-Endpunkt für die Anfrage an. Kann mit einem lokal installierten Import-Service verwendet werden. Standard ist **https://export.dhtmlx.com/gantt**.
- **data** - eine [File](https://developer.mozilla.org/en-US/docs/Web/API/File) Instanz, die die Excel-(xlsx)-Datei enthält.
- **callback** - eine Funktion, die aufgerufen wird, sobald der Import abgeschlossen ist.
- **sheet** - die Indexnummer des Sheets im Dokument, das vom Import-Service verarbeitet werden soll.

## Response

Die Antwort liefert JSON mit einem Array von Objekten:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

Details:

- Die Werte der ersten Zeile werden als Eigenschaftsnamen für die importierten Objekte verwendet.
- Jede nachfolgende Zeile wird in ein separates Objekt umgewandelt.
- Datumsangaben sind im Format "%Y-%m-%d %H:%i" formatiert.

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- ["Export/Import für Excel, Export nach iCal"](guides/excel.md#importfromexcel)

