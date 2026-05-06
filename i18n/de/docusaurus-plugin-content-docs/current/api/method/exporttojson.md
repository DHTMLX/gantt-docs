---
sidebar_label: exportToJSON
title: exportToJSON method
description: "Exportiert die Struktur und Daten eines Gantt-Diagramms in ein JSON-Objekt"
---

# exportToJSON

### Description

@short: Exportiert die Struktur und Daten eines Gantt-Diagramms in ein JSON-Objekt

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - Objekt - optional, ein Objekt mit Gantt-Konfiguration

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
Diese Methode ist im **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren.
:::

:::note
note Wenn Sie eine Gantt-Version verwenden, die älter als 8.0 ist, müssen Sie die `https://export.dhtmlx.com/gantt/api.js` auf Ihrer Seite einbinden, um den Online-Export-Service zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Das **config**-Objekt kann folgende Optionen enthalten:

- name - Der Name der exportierten JSON-Datei
- data - (Array) Liste der Aufgaben, die exportiert werden sollen. Der gesamte Gantt wird exportiert, falls nichts angegeben ist

### Verwandte API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)