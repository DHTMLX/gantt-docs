---
sidebar_label: exportToICal
title: exportToICal method
description: "exportiert Daten aus dem Gantt-Diagramm als iCal-String"
---

# exportToICal

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm als iCal-String

@signature: exportToICal: (_export_?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Einstellungen für den Export (siehe Details)

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
note Diese Methode ist Teil der **export**-Extension, daher muss das Plugin [export_api](guides/extensions-list.md#exportservice) aktiviert sein. Weitere Details finden Sie im Artikel ["Export/Import für Excel, Export nach iCal"](guides/excel.md).

 
:::


Die Methode **exportToICal()** akzeptiert ein optionales Objekt mit folgenden Eigenschaften:

- **server** - (*string*) gibt den API-Endpunkt für die Export-Anfrage an. Dies ist nützlich, wenn ein lokal installierter Export-Service verwendet wird. Der Standard-Endpunkt ist **https://export.dhtmlx.com/gantt**;
- **name** - (*string*) ermöglicht das Festlegen eines benutzerdefinierten Dateinamens und einer Erweiterung, obwohl die Datei weiterhin im iCal-Format exportiert wird. [Siehe ein Beispiel hier](https://snippet.dhtmlx.com/atbhz9vq).

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
- ["Export/Import für Excel, Export nach iCal"](guides/excel.md#exporttoical)

