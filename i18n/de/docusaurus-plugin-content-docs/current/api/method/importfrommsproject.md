---
sidebar_label: importFromMSProject
title: importFromMSProject method
description: "konvertiert eine MS Project Datei im XML- oder MPP-Format in JSON"
---

# importFromMSProject

### Description

@short: Konvertiert eine MS Project Datei im XML- oder MPP-Format in JSON

@signature: importFromMSProject: (config: any) =\> void

### Parameters

- `config` - (required) *object* - ein Objekt mit Konfigurationseinstellungen für die importierte Datei

### Example

~~~jsx
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});
~~~

### Related samples
- [Import MS Project file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)

### Details

:::note
 Diese Methode benötigt Unterstützung für die HTML5 File API. 
:::

:::note
 Diese Methode ist Teil der **export**-Erweiterung, daher stellen Sie sicher, dass das Plugin [export_api](guides/extensions-list.md#exportservice) aktiviert ist. Weitere Details finden Sie im Artikel [Export and Import from MS Project](guides/export-msproject.md#importfrommsproject).

 
:::

:::note
 Für Gantt-Versionen vor 8.0 binden Sie das Skript **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite ein, um den Online-Export-Service zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Die Methode akzeptiert ein Objekt mit Konfigurationsoptionen für die importierte Datei:

- **data** - eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File), die die MPP- oder XML-Projektdatei enthält.
- **callback** - eine Funktion, die nach dem Import aufgerufen wird.
- **durationUnit** - gibt die erwartete Zeiteinheit für die Dauer an ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - ein Array mit den Projekteigenschaften, die in der Antwort enthalten sein sollen.
- **taskProperties** - ein Array mit zusätzlichen Aufgaben-Eigenschaften, die importiert werden sollen.

## Response

Die Antwort liefert ein JSON-Objekt mit folgender Struktur:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - ein gantt [Datenobjekt](guides/supported-data-formats.md#json). Jede Aufgabe enthält Eigenschaften wie *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Datumswerte sind als Strings im Format "%Y-%m-%d %H:%i" formatiert.
- **config** - ein gantt [Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen, die aus der Projektdatei extrahiert wurden.
- **resources** - ein Array von Objekten, die Ressourcen aus der Projektdatei repräsentieren, jeweils mit den Eigenschaften \{*id:string, name:string, type:string*\}.
- **worktime** - ein Objekt mit den Arbeitszeit-Einstellungen aus dem Projektkalender.

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [Export and Import from MS Project](guides/export-msproject.md)

