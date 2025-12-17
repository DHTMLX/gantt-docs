---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "konvertiert eine XML- oder XER-Datei von Primavera P6 in das JSON-Format"
---

# importFromPrimaveraP6

### Description

@short: Konvertiert eine XML- oder XER-Datei von Primavera P6 in das JSON-Format

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - ein Objekt, das Konfigurationsoptionen für die importierte Datei enthält

### Example

~~~jsx
gantt.importFromPrimaveraP6({
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
- [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)

### Details

:::note
 Die Methode erfordert Unterstützung für die HTML5 File API. 
:::

:::note
 Diese Methode ist Teil der **export**-Erweiterung, daher muss das Plugin [export_api](guides/extensions-list.md#exportservice) aktiviert sein. Weitere Details finden Sie im Artikel ["Export und Import aus Primavera P6"](guides/export-primavera.md#importfromprimaverap6). 
:::

:::note
 Für Gantt-Versionen vor 8.0 muss **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite eingebunden werden, um den Online-Export-Service zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Diese Methode akzeptiert ein Objekt mit Konfigurationsoptionen für die importierte Datei:

- **data** - eine [File](https://developer.mozilla.org/en-US/docs/Web/API/File)-Instanz, die entweder eine XER- oder XML-Projektdatei enthält.
- **callback** - eine Funktion, die nach dem Import aufgerufen wird.
- **durationUnit** - legt die erwartete Dauer-Einheit fest ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - ein Array von Projekteigenschaften, die in der Antwort enthalten sein sollen.
- **taskProperties** - ein Array zusätzlicher Aufgaben-Eigenschaften, die importiert werden sollen.

## Response

Die Antwort ist ein JSON-Objekt mit folgender Struktur:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - ein gantt [Datenobjekt](guides/supported-data-formats.md#json), bei dem jede Aufgabe Eigenschaften wie *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* enthält. Die Datumsangaben sind als Strings im Format "%Y-%m-%d %H:%i" formatiert.
- **config** - ein gantt [Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen, die aus der Projektdatei extrahiert wurden.
- **resources** - ein Array von Objekten, die Ressourcen aus der Projektdatei repräsentieren, jeweils mit *id*, *name* und *type*.
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
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- ["Export und Import aus Primavera P6"](guides/export-primavera.md#importfromprimaverap6)

