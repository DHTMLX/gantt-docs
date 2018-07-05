Export to Excel and iCal
===========================================

Starting from version 3.2, the library allows you to export data from the Gantt chart in  the Excel and iCal formats. 


Export to Excel
-------------------

To export data from the Gantt chart to an Excel document, do the following:

<ol>
	<li>Include the <b>"http://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToExcel</b> method to export data from the Gantt chart: 
~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
	gantt.init("gantt_here");
	gantt.parse(demo_tasks);
</script>
~~~

</li>
</ol>
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
    - **'type'** - (*string*) the column type</li>
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



Export to iCal
-------------------

To export data from the Gantt chart to an iCal string, do the following:

<ol>
	<li>Include the <b>"http://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToIcal</b> method to export data from the Gantt chart: 
~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
	gantt.init("gantt_here");
	gantt.parse(demo_tasks);
</script>
~~~

</li>
</ol>
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
