---
sidebar_label: exportToMSProject
title: exportToMSProject method
description: "exportiert Daten aus dem Gantt-Diagramm nach MS Project"
---

# exportToMSProject

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm nach MS Project

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Einstellungen für den Export (siehe Details)


### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
 Diese Methode ist Teil der **export** Erweiterung, daher stellen Sie sicher, dass das [export_api](guides/extensions-list.md#exportservice) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel [Export and Import from MS Project](guides/export-msproject.md#exporttomsproject).
 
:::

:::note
 Für Gantt-Versionen vor 8.0 binden Sie das Skript **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite ein, um den Online-Exportservice zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Die Methode **exportToMSProject()** akzeptiert ein Objekt mit mehreren optionalen Eigenschaften:

- **name** - (*string*) der Dateiname für die exportierte Datei (Standard ist 'gantt.xml').
- **auto_scheduling** - (boolean) legt den Planungsmodus für Aufgaben im exportierten Projekt fest. **true** markiert Aufgaben als automatisch geplant, **false** als manuell geplant (Standard).
- **skip_circular_links** - (boolean) bestimmt, ob zirkuläre Verknüpfungen entfernt werden sollen. **true** (Standard) entfernt sie, **false** behält sie.
- **project** - (object) ermöglicht das Hinzufügen benutzerdefinierter Eigenschaften zum exportierten Projektobjekt.
- **tasks** - (object) ermöglicht das Hinzufügen benutzerdefinierter Eigenschaften zu den exportierten Aufgaben.
- **data** - (object) erlaubt die Angabe einer benutzerdefinierten Datenquelle für das Ausgabe-Gantt. Die **start_date** und **end_date** sollten im Format Datum und Uhrzeit vorliegen (*%d-%m-%Y %H:%i*).
- **callback** - (function) bietet eine Möglichkeit, eine Download-URL für die generierte XML-Datei zu erhalten. Die Callback-Funktion erhält ein JSON-Objekt mit der Eigenschaft *url*.
- **resources** - (array) ermöglicht den Export einer Liste von Ressourcen in die MS Project-Datei.
- **server** - (string) spezifiziert den API-Endpunkt für die Exportanfrage, nützlich bei Verwendung eines lokal installierten Exportservices. Standard ist **https://export.dhtmlx.com/gantt**.

## Antwort

Die Antwort liefert ein JSON-Objekt mit folgender Struktur:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - ein gantt [Datenobjekt](guides/supported-data-formats.md#json). Jede Aufgabe enthält: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Die Datumsangaben folgen dem String-Format "%Y-%m-%d %H:%i".
- **config** - ein gantt [Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen aus der Projektdatei.
- **resources** - ein Array von Ressourcenobjekten, jeweils mit: \{*id: string, name:string, type:string*\}, die Ressourcen aus der Projektdatei repräsentieren.
- **worktime** - ein Objekt mit den Arbeitszeit-Einstellungen aus dem Projektkalender.

### Related API
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export and Import from MS Project](guides/export-msproject.md#exporttomsproject)

