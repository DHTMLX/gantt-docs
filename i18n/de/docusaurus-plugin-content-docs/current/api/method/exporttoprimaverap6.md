---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 method
description: "exportiert Daten aus dem Gantt-Diagramm nach Primavera P6"
---

# exportToPrimaveraP6

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm nach Primavera P6

@signature: exportToPrimaveraP6: (_export_?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Einstellungen für den Export (siehe Details)


### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related samples
- [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
 Diese Methode ist Teil der **export**-Extension. Stellen Sie daher sicher, dass das Plugin [export_api](guides/extensions-list.md#exportservice) aktiviert ist. Weitere Details finden Sie im Artikel [Export und Import aus Primavera P6](guides/export-primavera.md#exporttoprimaverap6).
 
:::

:::note
 Für Gantt-Versionen vor 8.0 muss **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite eingebunden werden, um den Online-Export-Service nutzen zu können, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Die Methode **exportToPrimaveraP6()** akzeptiert ein Objekt mit mehreren optionalen Eigenschaften:

- **name** - (*string*) der Dateiname für die exportierte Datei (Standard: 'gantt.xml').
- **auto_scheduling** - (boolean) definiert den Planungsmodus der Tasks im exportierten Projekt. **true** markiert Tasks als automatisch geplant, **false** bedeutet manuelle Planung (Standard).
- **skip_circular_links** - (boolean) bestimmt, ob zirkuläre Verknüpfungen entfernt werden sollen. **true** entfernt sie (Standard), **false** behält sie bei.
- **project** - (object) ermöglicht die Angabe benutzerdefinierter Eigenschaften für das exportierte Projekt-Objekt.
- **tasks** - (object) erlaubt die Definition benutzerdefinierter Eigenschaften für die exportierten Tasks.
- **data** - (object) ermöglicht die Angabe einer eigenen Datenquelle für das ausgegebene Gantt-Diagramm. **start_date** und **end_date** sollten im Format mit Datum und Zeit vorliegen (*%d-%m-%Y %H:%i*).
- **callback** - (function) falls Sie eine URL zum Herunterladen der generierten XML-Datei erhalten möchten, können Sie diese Eigenschaft verwenden. Sie erhält ein JSON-Objekt mit der *url*.
- **resources** - (array) erlaubt den Export einer Liste von Ressourcen in die Primavera P6-Datei.
- **server** - (string) spezifiziert den API-Endpunkt für die Export-Anfrage. Dies kann genutzt werden, wenn Sie einen lokalen Export-Service installiert haben. Standard ist **https://export.dhtmlx.com/gantt**.

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

- **data** - ein gantt [Datenobjekt](guides/supported-data-formats.md#json). Jeder Task enthält Eigenschaften wie *id*, *open*, *parent*, *progress*, *start_date*, *text* und *resource*. Datumsangaben sind als Strings im Format "%Y-%m-%d %H:%i" formatiert.
- **config** - ein gantt [Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen, die aus der Projektdatei extrahiert wurden.
- **resources** - ein Array von Objekten, die Ressourcen aus der Projektdatei repräsentieren, jeweils mit den Eigenschaften *id*, *name* und *type*.
- **worktime** - ein Objekt mit den Arbeitszeit-Einstellungen aus dem Projektkalender.

### Related API
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- ["Export und Import aus Primavera P6"](guides/export-primavera.md#exporttoprimaverap6)

