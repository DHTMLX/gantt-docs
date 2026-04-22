---
sidebar_label: exportToICal
title: метод exportToICal
description: "экспортирует данные из диаграммы Ганта в строку iCal"
---

# exportToICal

### Description

@short: Экспортирует данные диаграммы Ганта в строку iCal

@signature: exportToICal: (_export_?: any) =\> void

### Parameters

- `export`	- object - optional, an object with export settings (see the details)

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
This method is defined in the **export** extension, so you need to activate the [export_api](guides/extensions-list.md#export-service) plugin. Read the details in the [Export/Import for Excel, Export to iCal](guides/excel.md) article.

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

The **exportToICal()** method takes as a parameter an object with the following properties (optional):

- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) allows specifying custom name and extension for the file but the file will still be exported in the iCal format. [Check the example](https://snippet.dhtmlx.com/atbhz9vq).

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
- [Экспорт/Импорт для Excel, Экспорт в iCal](guides/excel.md#export-to-ical)