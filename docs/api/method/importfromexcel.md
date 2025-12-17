---
sidebar_label: importFromExcel
title: importFromExcel method
description: "converts an Excel file to JSON"
---

# importFromExcel

### Description

@short: Converts an Excel file to JSON

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - an object with configuration properties of an imported file

### Example

~~~jsx
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~

### Related samples
- [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
The method requires HTML5 File API support. 
:::

:::note
This method is defined in the **export** extension, so you need to activate the [export_api](guides/extensions-list.md#export-service) plugin. Read the details in the [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel) article.
:::

:::note
If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The method takes as a parameter an object with configuration properties of an imported file:

- **server** - sets the API endpoint for the request. Can be used with the local install of the import service. The default value is **https://export.dhtmlx.com/gantt**.
- **data** - an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain an Excel (xlsx) file. 
- **callback** - a callback function.
- **sheet** - the number of the sheet of the document that should be returned by the import service.

## Response

The response will contain a JSON with an array of objects:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

where:

- Values of the first row are used as property names of imported objects.
- Each row is serialized as an individual object.
- Date values are serialized in the "%Y-%m-%d %H:%i" format.

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel)

