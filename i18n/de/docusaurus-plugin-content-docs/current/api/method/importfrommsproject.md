---
sidebar_label: importFromMSProject
title: importFromMSProject method
description: "Konvertiert eine XML- oder MPP MS Project-Datei zu JSON"
---

# importFromMSProject

### Description

@short: Konvertiert eine XML- oder MPP-MS Project-Datei in JSON

@signature: importFromMSProject: (config: any) =\> void

### Parameters

- `config` - (erforderlich) *Objekt* - ein Objekt mit Konfigurationseigenschaften einer importierten Datei

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

### Details

:::note
Die Methode erfordert Unterstützung der HTML5 File API.
:::

:::note
Diese Methode ist im **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren. Lesen Sie die Details im Artikel Export/Import für Excel, Export nach iCal.
 
:::

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, müssen Sie das **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite einbinden, um den Online-Export-Service zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Die Methode nimmt als Parameter ein Objekt mit Konfigurationseigenschaften einer importierten Datei entgegen:

- **data** - (*object*) eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File), die entweder eine MPP- oder XML-Projektdatei enthalten soll.
- **callback** - eine Callback-Funktion.
- **durationUnit** - legt eine erwartete Dauer-Einheit fest ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - gibt ein Array von Projekt-Eigenschaften an, die in der Antwort enthalten sein sollen.
- **taskProperties** - gibt ein Array zusätzlicher Task-Eigenschaften an, die importiert werden sollen.

Überprüfen Sie die detaillierten Beschreibungen der Import-Einstellungen im [zugehörigen Abschnitt](guides/export-msproject.md#import-settings).

## Response

Die Antwort enthält ein JSON mit folgender Struktur:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {},
   calendars: []
}
~~~

- **data** - (*object*) ein gantt [Datenobjekt](guides/supported-data-formats.md). Jede Aufgabe hat die folgenden Eigenschaften: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Die Daten werden im Format "%Y-%m-%d %H:%i" als Strings dargestellt.
- **config** - (*object*) ein gantt [Konfiguration](api/overview/properties-overview.md) Objekt mit Einstellungen, die aus der Projektdatei abgerufen wurden.
- **resources** - (*array*) ein Array von Objekten (jeweils mit den folgenden Eigenschaften: \{*id: string, name: string, type: string, calendar: string*\}) die die Liste der Ressourcen aus der Projektdatei repräsentieren.
- **worktime** - (*object*) ein Objekt, das die Arbeitszeit-Einstellungen aus dem Projektkalender enthält. Es kann folgende Attribute enthalten:
    - **id** - (*string | number*) optional, die Kalender-ID
    - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, setzt Start- und Endzeiten der Aufgabe
    - **dates** - (*array*) ein Array von Datumsangaben, das enthalten kann:
        - 7 Wochentage (von 0 - Sonntag, bis 6 - Samstag), wobei 1/true für einen Arbeitstag steht und 0/false - ein Nicht-Arbeitstag
        - andere Einträge sind Datumsangaben
- **calendars** - (*array*) ein Array, das Kalender-Konfigurationsobjekte enthält, um einen neuen Kalender zu erstellen.
    - **calendarConfig** - (*object*) ein Kalender-Konfigurationsobjekt, das folgende Attribute enthalten kann:
      - **id** - (*string | number*) optional, die Kalender-ID
      - **name** - (*string*) der Kalendername
      - **hours** - (*array*) ein Array mit globalen Arbeitsstunden, setzt Start- und Endzeiten der Aufgabe
      - **dates** - (*array*) ein Array von Datumsangaben, das enthalten kann:
            - 7 Wochentage (von 0 - Sonntag bis 6 - Samstag), wobei 1/true für einen Arbeitstag steht und 0/false - ein Nicht-Arbeitstag
            - andere Einträge sind Datumsangaben

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [Export and Import from MS Project](guides/export-msproject.md#import-from-ms-project)