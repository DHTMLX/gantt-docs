exportToExcel
=============


@short:
	exports data from the Gantt chart to an Excel document

@params:

- export		object		an object with export settings (see the details)


@example:
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


@template:	api_method
@descr:

{{note This method is defined in the **export** extension, so you need to include it on the page:
~~~html
<script src="http://export.dhtmlx.com/gantt/api.js"></script>  
~~~
Read the details in the desktop/excel.md article.

}}



The **exportToExcel()** method takes as a parameter an object with several properties (all the properties are optional):

- **name** - (*string*) sets the name of the output file with the extension '.xlsx' 
- **columns** - (*array*) allows configuring columns of the output Excel sheet. The properties of the column objects are:
	- **'id'** - (*string,number*) a property of the event that will be mapped to the column
    - **'header'** - (*string*) the column header
    - **'width'** - (*number*) the column width in pixels
    - **'type'** - (*string*) the column type</li>
- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**
- **visual** - (*boolean*) adds the timeline chart to an exported Excel document. *false* by default
- **cellColors** - (*boolean*) if set to *true*, the cells of the exported document will have the colors defined by the api/gantt_timeline_cell_class_template.md template, the *color* and *background-color* 
properties are exported

@related:
desktop/excel.md

@relatedapi:
api/gantt_importfromexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_exporttomsproject.md
api/gantt_importfrommsproject.md

