Export/Import for Excel, Export to iCal
==============================

The dhtmlxGantt library allows you to export data from the Gantt chart in the Excel and iCal formats. You can also import data into Gantt from an Excel file.

{{note
The service is free, but the output Excel/iCal file will contain the library's watermark under the GPL license. 
In case you buy a license, the result of export will be available without a watermark
during the valid support period (12 months for all PRO licenses).
}}

There are several export services available. You can install them on your computer and export Gantt chart to Excel or iCal locally.
Note that export services are not included into the Gantt package, 
read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) to learn the terms of using each of them.

Online export service restrictions
-----------------------------

{{note The export service has time and request size restrictions.}}

### Time limits

If the process takes over than 20 seconds, the export will be canceled and the following error will occur:

~~~html
Error: Timeout trigger 20 seconds
~~~

If several people export Gantt at the same time, the process can take more time than usual. But that's fine because the time which is spent for export request from a specific user is counted separately.

### Limits on request size

There is a common API endpoint **https://export.dhtmlx.com/gantt** which serves for all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.

There is also a separate API endpoint **https://export.dhtmlx.com/gantt/project** specific for the [MSProject](desktop/export_msproject.md) and 
[Primavera P6](desktop/export_primavera.md) 
export/import services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* only). **Max request size: 40 MB**.

Using export modules
---------------------

{{note If you need to export large charts, you can use a [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). 
The export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).}}

[Read more on the usage of the export module for PDF](desktop/pdf_export_module.md). This export module can export data to PDF, PNG, Excel, and iCal files.

Export to Excel
-------------------

To export data from the Gantt chart to an Excel document, do the following:

- To use the online export service, enable the <b>export_api</b> plugin via the api/gantt_plugins.md method:
~~~js
gantt.plugins({
  	export_api: true
});
~~~

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}

- Call the api/gantt_exporttoexcel.md method to export data from the Gantt chart: 

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
	gantt.init("gantt_here");
	gantt.parse(demo_tasks);
</script>
~~~


{{sample
	08_api/08_export_other.html
}}

{{sample
	08_api/09_export_store.html
}}      
        

####Parameters of the export method

The **exportToExcel()** method takes as a parameter an object with several properties (all the properties are optional):

- **name** - (*string*) sets the name of the output file with the extension '.xlsx' 
- **columns** - (*array*) allows configuring columns of the output Excel sheet. The properties of the column objects are:
	- **'id'** - (*string,number*) a property of the event that will be mapped to the column
    - **'header'** - (*string*) the column header
    - **'width'** - (*number*) the column width in pixels
    - **'type'** - (*string*) the column type
- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) If you want to receive an url to download a generated XLSX file, the callback property can be used. It receives a JSON object with the url property
- **visual** - (*boolean*) adds the timeline chart to an exported Excel document. *false* by default
- **cellColors** - (*boolean*) if set to *true*, the cells of the exported document will have the colors defined by the api/gantt_timeline_cell_class_template.md template, the *color* and *background-color* 
properties are exported
- **data** - (*object*) sets a custom data source that will be presented in the output Gantt chart
- **date_format** - (*string*) sets the format the date will be displayed in the exported Excel document. You can see the full list of the available format code [here](api/gantt_exporttoexcel.md).		

{{snippet
Calling the export method with optional properties
}}
~~~js
gantt.exportToExcel({
	name:"document.xlsx", 
    columns:[
		{ id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    data:{},
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Default date parameters

The Export module expects the **start_date** and **end_date** columns to have the *Date* type and the **duration** column to have the *number* type. 

In case of applying [custom templates](desktop/specifying_columns.md#datamappingandtemplates), it is necessary either to return a value of the expected type or to define a different value in the **name** property of the column configuration. For instance:

~~~js

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", /*!*/
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
			return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

Otherwise, the Gantt data won't be exported. [Check the related example](https://snippet.dhtmlx.com/q1lhyvt3).

###Setting a custom data source to export

To export the Gantt chart with a custom data set (i.e. not with the data presented in the initial Gantt chart), use the **data** property in the parameter of the 
api/gantt_exporttoexcel.md method:

~~~js
gantt.exportToExcel({   
    name:"document.xlsx", 
    data:[
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
        {id:2, text:"Task #1", start_date:"02-04-2020",duration:8, parent:1},
        {id:3, text:"Task #2", start_date:"11-04-2020",duration:8, parent:1}
    ]      
});
~~~

{{note
Note, you cannot specify some URL as the value of the **data** parameter, just a data object.
}}

###Adding colors of tasks to export

You can add the colors of tasks to the exported Excel file of the Gantt chart via setting the value of the **visual** property to *"base-colors"*:

~~~js
gantt.exportToExcel({
    visual: "base-colors", /*!*/
    cellColors: true
})
~~~

{{editor https://snippet.dhtmlx.com/t2znjrfj		Export colors of tasks}}

Import from Excel
-------------------

Since there is no way to automatically map arbitrary columns of the Excel document to Gantt data model, the export service converts a document to an array of rows which is returned in JSON. 
Conversion of the resulting document to the Gantt data is the responsibility of end developers.

In order to convert an Excel file, you need to send the following request to the export service:

- Request URL - **https://export.dhtmlx.com/gantt**
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

Alternatively, you can use the [client-side API](api/gantt_importfromexcel.md):

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
    	console.log(project)
    }
});
~~~

{{sample
	08_api/21_load_from_excel.html
}}

Where *file* is an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain an Excel (xlsx) file.

{{note	
**gantt.importFromExcel** requires HTML5 File API support.
}}


###Response

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


###Import settings

- The import service expects the first row of the imported sheet to be a header row containing column names.
- By default, the service returns the first sheet of the document. In order to return a different sheet, use the **sheet** parameter (zero-based)

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    sheet:2, // print third sheet
    callback: function (rows) {}
});
~~~


Export to iCal
-------------------

To export data from the Gantt chart to an iCal string, do the following:

- To use the online export service, enable the <b>export_api</b> plugin via the api/gantt_plugins.md method:
~~~js
gantt.plugins({
  	export_api: true
});
~~~

- Call the api/gantt_exporttoical.md method to export data from the Gantt chart: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
	gantt.init("gantt_here");
	gantt.parse(demo_tasks);
</script>
~~~


{{sample
	08_api/08_export_other.html
}}

{{sample
	08_api/09_export_store.html
}}


####Parameters of the export method

The [exportToICal()](api/gantt_exporttoical.md) method takes as a parameter an object with the following properties (optional):

- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**;
- **name** - (*string*) allows specifying custom name and extension for the file but the file will still be exported in the iCal format.
		
{{snippet
Calling the export method with optional properties
}}
~~~js
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~


