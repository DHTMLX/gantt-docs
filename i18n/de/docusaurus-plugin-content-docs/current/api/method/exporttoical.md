---
sidebar_label: exportToICal
title: exportToICal-Methode
description: "exportiert Daten aus dem Gantt-Diagramm in eine iCal-Zeichenkette"
---

# exportToICal

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm in eine iCal-Zeichenkette

@signature: exportToICal: (_export_?: any) =\> void

### Parameters

- `export`	- Objekt - optional, ein Objekt mit Export-Einstellungen (siehe Details)

- `server` - (*string*) legt den API-Endpunkt für die Anfrage fest. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`;
- `name` - (*string*) ermöglicht das Festlegen eines benutzerdefinierten Namens und einer Erweiterung für die Datei, aber die Datei wird weiterhin im iCal-Format exportiert. [Beispiel ansehen](https://snippet.dhtmlx.com/atbhz9vq).

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
Diese Methode ist in der **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service)-Plugin aktivieren. Lesen Sie die Details im Artikel [Export/Import für Excel, Export zu iCal](guides/excel.md).

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

Die **exportToICal()**-Methode nimmt als Parameter ein Objekt mit den folgenden Eigenschaften (optional):

- **server** - (*string*) legt den API-Endpunkt für die Anfrage fest. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) ermöglicht das Festlegen eines benutzerdefinierten Namens und einer Erweiterung für die Datei, aber die Datei wird weiterhin im iCal-Format exportiert. [Beispiel ansehen](https://snippet.dhtmlx.com/atbhz9vq).

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export/Import für Excel, Export zu iCal](guides/excel.md#export-to-ical)