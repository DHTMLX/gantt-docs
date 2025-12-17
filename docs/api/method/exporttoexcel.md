---
sidebar_label: exportToExcel
title: exportToExcel method
description: "exports data from the Gantt chart to an Excel document"
---

# exportToExcel

### Description

@short: Exports data from the Gantt chart to an Excel document

@signature: exportToExcel: (_export_?: any) =\> void

### Parameters

- `export`	- object - optional, an object with export settings (see the details)

### Example

~~~jsx
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

### Details

:::note
This method is defined in the **export** extension, so you need to activate the [export_api](guides/extensions-list.md#export-service) plugin.
Read the details in the [](guides/excel.md) article.
:::

:::note
If you use the Gantt version older than 8.0, you need to include the `https://export.dhtmlx.com/gantt/api.js` on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The **exportToExcel()** method takes as a parameter an object with several properties (all the properties are optional):

- **name** - (*string*) sets the name of the output file with the extension '.xlsx' 
- **columns** - (*array*) allows configuring columns of the output Excel sheet. The properties of the column objects are:
    - **'id'** - (*string,number*) a property of the event that will be mapped to the column
    - **'header'** - (*string*) the column header
    - **'width'** - (*number*) the column width in pixels
    - **'type'** - (*string*) the column type
- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) If you want to receive an url to download a generated XLSX file, the callback property can be used. It receives a JSON object with the url property
- **visual** - (*boolean*) adds the timeline chart to an exported Excel document; *false* by default. Read [how to add task colors](guides/excel.md#adding-colors-of-tasks-to-export) to the exported file
- **cellColors** - (*boolean*) if set to *true*, the cells of the exported document will have the colors defined by the [](api/template/timeline_cell_class.md) template, the *color* and *background-color* 
properties are exported
- **data** - (*object*) sets a custom data source that will be presented in the output Gantt chart
- **date_format** - (*string*) sets the format the date will be displayed in the exported Excel document. The following format code can be used:

~~~css
table.my_table {
    width: 70%;
    padding: 0 20px;
}
table.my_table tr td {
    text-align: left;
    vertical-align: middle;
    width: 35%;
    border-bottom: 1px solid grey;
}
table.my_table td.version_info {
    text-align: left;
    font-weight: bold;
}
~~~

Format codeOutput:

<table class="my_table">
<tr><td class="version_info">Format code</td><td class="version_info">Output</td></tr>
<tr><td>d</td><td>9</td></tr>
<tr><td>dd</td><td>09</td></tr>
<tr><td>ddd</td><td>Mon</td></tr>
<tr><td>dddd</td><td>Monday</td></tr>
<tr><td>mm</td><td>01</td></tr>
<tr><td>mmm</td><td>Jan</td></tr>
<tr><td>mmmm</td><td>January</td></tr>
<tr><td>mmmmm</td><td>J</td></tr>
<tr><td>yy</td><td>12</td></tr>
<tr><td>yyyy</td><td>2021</td></tr>
<tr><td>mm/dd/yyyy</td><td>01/09/2021</td></tr>
<tr><td>m/d/y</td><td>1/9/21</td></tr>
<tr><td>ddd, mmm d</td><td>Mon, Jan 9</td></tr>
<tr><td>mm/dd/yyyy h:mm AM/PM</td><td>01/09/2021 6:20 PM</td></tr>
<tr><td>dd/mm/yyyy hh:mm:ss</td><td>09/01/2012 16:20:00</td></tr>
</table>


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

### Related API

- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides

- [Export/Import for Excel, Export to iCal](guides/excel.md)


