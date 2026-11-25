---
title: "Export and Import for Excel"
sidebar_label: "Excel"
---

# Export and Import for Excel

The dhtmlxGantt library allows you to export data from the Gantt chart in the Excel format. You can also import data into Gantt from an Excel file. To export data in the iCal format, see [Export to iCal](guides/ical.md).

:::note
The online export service is free. For the license terms, see [License and watermark](guides/export-common.md#license-and-watermark).
:::

There are several export services available. You can install them on your computer and export Gantt chart to Excel locally.
Note that export services are not included into the Gantt package, 
read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) to learn the terms of using each of them.

## Online export service restrictions

:::note
The online export service has time and request size limits. See [Online export service limits](guides/export-common.md#service-limits).
:::

## Using export modules

To export large charts, to export without the limits of the online export service, or to keep your data in your network, install an [export module](guides/export-modules.md) on your own server. Read more on the usage of the [export module for PDF, PNG, Excel, and iCal](guides/pdf-export-module.md).

## Export to Excel

To export data from the Gantt chart to an Excel document, do the following:

- To use the export/import functionality, enable the <b>export_api</b> plugin via the [plugins](api/method/plugins.md) method:
~~~js
gantt.plugins({
    export_api: true
});
~~~

It allows you to use either the online export service or a local export module.

:::note
If you use the Gantt version older than 8.0, you need to include the `https://export.dhtmlx.com/gantt/api.js` on your page to enable the export functionality e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Call the [exportToExcel](api/method/exporttoexcel.md) method to export data from the Gantt chart: 

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Related sample**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Related sample**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### Parameters of the export method

The **exportToExcel()** method takes as a parameter an object with several properties (all the properties are optional):

- **name** - (*string*) sets the name of the output file with the extension '.xlsx' 
- **columns** - (*array*) allows configuring columns of the output Excel sheet. The properties of the column objects are:
    - **'id'** - (*string,number*) a property of the event that will be mapped to the column
    - **'header'** - (*string*) the column header
    - **'width'** - (*number*) the column width in pixels
    - **'type'** - (*string*) the column type
- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is `https://export.dhtmlx.com/gantt`
- **raw** - (*boolean*) defines the way Gantt data is exported. *false* by default. Read more in the [Exporting filtered tasks and hidden columns](#exporting-filtered-tasks-and-hidden-columns) section
- **callback** - (*function*) If you want to receive an url to download a generated XLSX file, the callback property can be used. It receives a JSON object with the url property
- **visual** - (*boolean*) adds the timeline chart to an exported Excel document. *false* by default
- **cellColors** - (*boolean*) if set to *true*, the cells of the exported document will have the colors defined by the [timeline_cell_class](api/template/timeline_cell_class.md) template, the *color* and *background-color* 
properties are exported
- **data** - (*object*) sets a custom data source that will be presented in the output Gantt chart
- **date_format** - (*string*) sets the format the date will be displayed in the exported Excel document. You can see the full list of the available format code [here](api/method/exporttoexcel.md).        

~~~jsx title="Calling the export method with optional properties" 
gantt.exportToExcel({
    name: "document.xlsx", 
    columns:[
        { id: "text",  header: "Title", width: 150 },
        { id: "start_date",  header: "Start date", width: 250, type: "date" }
    ],
    server: "https://myapp.com/myexport/gantt",
    callback: (res) => {
        alert(res.url);
    },
    visual: true,
    cellColors: true,
    data: { },
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Default date parameters

The Export module expects the **start_date** and **end_date** columns to have the *Date* type and the **duration** column to have the *number* type. 

In case of applying [custom templates](guides/specifying-columns.md#datamappingandtemplates), it is necessary either to return a value of the expected type or to define a different value in the **name** property of the column configuration. For instance:

~~~jsx {7,10-12}
gantt.config.columns = [
    ...
    { name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor },
    { name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor },
    { name: "duration_formatted", 
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: (task) => { 
            return formatter.format(task.duration_formatted); 
        }
    },
    ...
];
~~~

Otherwise, the Gantt data won't be exported. [Check the related example](https://snippet.dhtmlx.com/q1lhyvt3).

### Setting a custom data source to export

To export the Gantt chart with a custom data set (i.e. not with the data presented in the initial Gantt chart), use the **data** property in the parameter of the [exportToExcel](api/method/exporttoexcel.md) method:

~~~js
gantt.exportToExcel({   
    name: "document.xlsx", 
    data: [
        { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18},
        { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1},
        { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1}
    ]      
});
~~~

:::note
Note, you cannot specify some URL as the value of the **data** parameter, just a data object.
:::

### Adding colors of tasks to export

You can add the colors of tasks to the exported Excel file of the Gantt chart via setting the value of the **visual** property to *"base-colors"*:

~~~js
gantt.exportToExcel({
    visual: "base-colors", 
    cellColors: true
})
~~~

**Related sample**: [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)

### Exporting filtered tasks and hidden columns

By default, the [`exportToExcel()`](api/method/exporttoexcel.md) method exports all tasks and columns of the Gantt chart, regardless of any filtering applied via the [`onBeforeTaskDisplay`](api/event/onbeforetaskdisplay.md) event or any columns [hidden](guides/specifying-columns.md#visibility) via the `hide:true` setting.

To ensure the export excludes tasks filtered out via `onBeforeTaskDisplay`, set the **raw** property to *true*:

~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    // hide tasks that don't match the search value
    return task.text.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
});

gantt.exportToExcel({
    raw: true
});
~~~

**Related sample**: [Gantt. Export filtered data to PDF, Excel, and MSProject files](https://snippet.dhtmlx.com/twfy116w)

Likewise, to exclude columns hidden via the `hide:true` setting, set the **raw** property to *true*:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true },
    { name: "start_date", align: "center", width: 120, resize: true },
    // hidden columns are excluded from the export when raw: true
    { name: "end_date", align: "center", label: "End Time", hide: true, width: 120, resize: true },
    { name: "duration", align: "center", width: 70, hide: true, resize: true }
];

gantt.exportToExcel({
    raw: true
});
~~~

**Related sample**: [Gantt. Export to Excel. Hide grid columns with the raw mode](https://snippet.dhtmlx.com/b7y0ps8m)

## Import from Excel {#importfromexcel}

Since there is no way to automatically map arbitrary columns of the Excel document to Gantt data model, the export service converts a document to an array of rows which is returned in JSON. 
Conversion of the resulting document to the Gantt data is the responsibility of end developers.

In order to convert an Excel file, you need to send the following request to the export service:

- Request URL - `https://export.dhtmlx.com/gantt`
- Request Method - **POST**
- Content-Type - **multipart/form-data**

The request parameters are:

- **file** - an Excel file
- **type** - "excel-parse"
- **data** - (*optional*) JSON string with settings

For example:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternatively, you can use the [client-side API](api/method/importfromexcel.md):

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: (project) => {
        console.log(project)
    }
});
~~~


**Related sample**: [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


Where *file* is an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain an Excel (xlsx) file.

:::note
**gantt.importFromExcel** requires HTML5 File API support.
:::


### Response

The response will contain a JSON with an array of objects:

~~~js
[
   { "Name": "Task Name", "Start": "2026-04-11 10:00", "Duration": 8 },
   ...
]
~~~

where:

- Values of the first row are used as property names of imported objects.
- Each row is serialized as an individual object.
- Date values are serialized in the "%Y-%m-%d %H:%i" format. 


### Import settings

- The import service expects the first row of the imported sheet to be a header row containing column names.
- By default, the service returns the first sheet of the document. In order to return a different sheet, use the **sheet** parameter (zero-based)

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    sheet: 2, // print third sheet
    callback: (rows) => {}
});
~~~


## Export to iCal

Export to iCal is described in the [Export to iCal](guides/ical.md) article.
