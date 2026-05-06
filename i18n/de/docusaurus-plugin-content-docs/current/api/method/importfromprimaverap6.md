---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 Methode
description: "konvertiert eine XML- oder XER-Datei von Primavera P6 in JSON"
---

# importFromPrimaveraP6

### Description

@short: Konvertiert eine XML- oder XER-Datei von Primavera P6 in JSON

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - ein Objekt mit Konfigurationsparametern einer importierten Datei

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

### Details

:::note
Die Methode erfordert HTML5 File API-Unterstützung. 
:::

:::note
Diese Methode ist in der **export**-Erweiterung definiert, daher muss das [export_api](guides/extensions-list.md#export-service) Plugin aktiviert werden. Lesen Sie die Details im Artikel [Export/Import für Excel, Export nach iCal](guides/excel.md#importfromexcel).
:::

:::note
Wenn Sie die Gantt-Version älter als 8.0 verwenden, müssen Sie auf Ihrer Seite das **https://export.dhtmlx.com/gantt/api.js** einbinden, um den Online-Export-Service zu aktivieren, z. B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Die Methode nimmt als Parameter ein Objekt mit Konfigurationsparametern einer importierten Datei entgegen:

- **data** - eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File), die entweder XER- oder XML-Projektdatei enthält.
- **callback** - eine Callback-Funktion.
- **durationUnit** - setzt eine erwartete Dauer-Einheit ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - gibt ein Array von Projekt-Eigenschaften an, die in die Antwort aufgenommen werden sollen.
- **taskProperties** - gibt ein Array zusätzlicher Task-Eigenschaften an, die importiert werden sollen.

Überprüfen Sie die detaillierten Beschreibungen der Import-Einstellungen im entsprechenden Abschnitt.

## Response

Die Antwort enthält ein JSON mit der folgenden Struktur:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {},
    calendars: []
}
~~~

- **data** - (*object*) ein gantt [data object](guides/supported-data-formats.md). Jedes Task hat die folgenden Eigenschaften: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*.  
Dates werden im Format "%Y-%m-%d %H:%i" als Strings dargestellt. 
- **config** - (*object*) ein gantt [Configuration](api/overview/properties-overview.md) Objekt mit Einstellungen, die aus der Projektdatei abgerufen wurden.
- **resources** - (*array*) ein Array von Objekten (jeweils mit den folgenden Eigenschaften: 
\{*id: string, name: string, type: string, calendar: string*\}) die Liste der Ressourcen aus der Projektdatei repräsentieren.
- **worktime** - (*object*) ein Objekt, das die Arbeitszeiteinstellungen aus dem Projektkalender enthält. Es kann die folgenden Attribute enthalten:
    - **id** - (*string | number*) optional, die Kalender-ID
    - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, legt die Start- und Endzeiten der Aufgabe fest
    - **dates** - (*array*) ein Array von Daten, die Folgendes enthalten können:
        - 7 Tage der Woche (von 0 - Sonntag bis 6 - Samstag), wobei 1/wahr für einen Arbeitstag steht und 0/false - ein Nicht-Arbeitstag
        - andere Datensätze sind Daten 
- **calendars** - (*array*) ein Array, das Kalender-Konfigurationsobjekte zur Erstellung eines neuen Kalenders enthält. 
    - **calendarConfig** - (*object*) ein Kalender-Konfigurationsobjekt, das Folgendes enthalten kann:
      - **id** - (*string | number*) optional, die Kalender-ID
      - **name** - (*string*) der Kalendername
      - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, legt die Start- und Endzeiten der Aufgabe fest
      - **dates** - (*array*) ein Array von Daten, die Folgendes enthalten können:
            - 7 Tage der Woche (von 0 - Sonntag bis 6 - Samstag), wobei 1/wahr für einen Arbeitstag steht und 0/falsch - ein Nicht-Arbeitstag
            - andere Datensätze sind Daten

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromExcel](api/method/importfromexcel.md)

### Related Guides
- [Export und Import aus Primavera P6](guides/export-primavera.md#import-from-primavera-p6)