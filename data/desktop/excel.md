Export/Import for Excel and iCal
==============================

The dhtmlxGantt library allows you to export data from the Gantt chart in the Excel and iCal formats. 

Limits on request size
--------------------

There is a common API endpoint [https://export.dhtmlx.com/gantt](https://export.dhtmlx.com/gantt) which serves for all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.

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
- **cellColors** - (*boolean*) if set to *true*, the cells of the exported document will have the colors defined by the api/gantt_task_cell_class_template.md template, the *color* and *background-color* 
properties are exported
		

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
    cellColors:true
});
~~~

Import from Excel
-------------------

In order to convert an XML or Excel file, you need to send the following request to the export service:

 - Request URL - **https://export.dhtmlx.com/gantt**
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

The request parameters:

 - **file** - an XML or Excel file
 - **type** - "excel-parse"
 - **data** - (optional) JSON string with settings

For example:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternatively, you can use the client-side API:

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function (project) {}
});
~~~

{{sample
	08_api/21_load_from_excel.html
}}

Where *file* is an instance of [File](https://developer.mozilla.org/en/docs/Web/API/File) which should contain either an XML or Excel file.

{{note	
**gantt.importFromExcel** requires HTML5 File API support.??
}}


###Response

The response will contain a JSON of the following structure:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

 
- **data** - a gantt [data object](desktop/supported_data_formats.md#json). Each task has the following properties: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 
Dates are stringified in the "%Y-%m-%d %H:%i" format. 
- **config** - a gantt [configuration](api/refs/gantt_props.md) object with settings retrieved from the project file.
- **resources** - an array of objects (each having the following properties: {*id:string, name:string, type:string*} that represent the list of resources from the project file.
- **worktime** - an object containing the working time settings from the project calendar.


###Import settings



Export to iCal
-------------------

To export data from the Gantt chart to an iCal string, do the following:

- Include the **"http://export.dhtmlx.com/gantt/api.js"** file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

- Call the **exportToIcal** method to export data from the Gantt chart: 

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


@todo: check info on import from excel: request,response, setting, limits