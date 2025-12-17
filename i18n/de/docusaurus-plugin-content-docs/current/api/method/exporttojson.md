---
sidebar_label: exportToJSON
title: exportToJSON method
description: "erstellt ein JSON-Objekt, das die Struktur und Daten eines Gantt-Diagramms enthält"
---

# exportToJSON

### Description

@short: Erstellt ein JSON-Objekt, das die Struktur und Daten eines Gantt-Diagramms enthält

@signature: exportToJSON: (config?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Konfiguration, ein Objekt mit Gantt-Einstellungen


### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
 Diese Methode ist Teil der **export** Erweiterung, daher stellen Sie sicher, dass das [export_api](guides/extensions-list.md#exportservice) Plugin aktiviert ist.
 
:::

:::note
 Für Gantt-Versionen vor 8.0 müssen Sie **https://export.dhtmlx.com/gantt/api.js** zu Ihrer Seite hinzufügen, um den Online-Export-Service zu nutzen, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Das **config** Objekt unterstützt folgende Optionen:

- name - der Dateiname der exportierten JSON-Datei
- data - (Array) eine Liste von Tasks, die exportiert werden sollen; wird dieser Parameter weggelassen, wird das gesamte Gantt-Diagramm exportiert

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

