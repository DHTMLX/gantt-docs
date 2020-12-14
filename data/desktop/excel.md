Export/Import for Excel, Export to iCal
==============================

The dhtmlxGantt library allows you to export data from the Gantt chart in the Excel and iCal formats. You can also import data into Gantt from an Excel file.

Limits on request size
--------------------

There is a common API endpoint [https://export.dhtmlx.com/gantt](https://export.dhtmlx.com/gantt) which serves for all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.) and for the *importFromExcel*
method. **Max request size is 10 MB**.

There is also a separate API endpoint [https://export.dhtmlx.com/gantt/project](https://export.dhtmlx.com/gantt/project) specific for the [MSProject export/import services](desktop/export_msproject.md) 
(*exportToMSProject*/*importFromMSProject* only). **Max request size: 40 MB**.

Export to Excel
-------------------

To export data from the Gantt chart to an Excel document, do the following:

- Include the **"http://export.dhtmlx.com/gantt/api.js"** file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

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
    visual:true,
    cellColors:true,
    data:{},
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Default date parameters

To export Gantt to the Excel file correctly when [inline editing](desktop/inline_editing.md) is enabled in Grid, you should set the type of the **start_date** and **end_date** editors to *Date*, and the type of the **duration** editor to *number*. 

In case of applying custom template to the editor, it is necessary to define a different value in the **name** property of the column configuration. For instance:

~~~js
...
var start_dateEditor = {type: "date", map_to: "start_date"};
var end_dateEditor = {type: "date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100}; /*!*/
...

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
			return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

Otherwise, the Gantt data won't be exported. [Check the related example](https://snippet.dhtmlx.com/5/310ae348d).

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

{{editor https://snippet.dhtmlx.com/5/ba21cf5e8		Export colors of tasks}}

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

Where *file* is an instance of [File](https://developer.mozilla.org/en/docs/Web/API/File) which should contain an Excel (xlsx) file.

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

- Include the **"http://export.dhtmlx.com/gantt/api.js"** file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
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

The **exportToICal()** method takes as a parameter an object with the following property (optional):

- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.
		
{{snippet
Calling the export method with optional properties
}}
~~~js
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~


