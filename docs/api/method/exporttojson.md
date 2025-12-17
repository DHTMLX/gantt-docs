---
sidebar_label: exportToJSON
title: exportToJSON method
description: "exports the structure and data of a Gantt chart into a JSON object"
---

# exportToJSON

### Description

@short: Exports the structure and data of a Gantt chart into a JSON object

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - object	 - optional, an object with Gantt configuration

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
This method is defined in the **export** extension, so you need to activate the [export_api](guides/extensions-list.md#export-service) plugin.
:::

:::note
note If you use the Gantt version older than 8.0, you need to include the `https://export.dhtmlx.com/gantt/api.js` on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

The **config** object can contain following options:

- name - the name of the exported json file
- data - (array) list of tasks to be exported. The whole gantt will be exported if not specified

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

