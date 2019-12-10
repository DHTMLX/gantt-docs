exportToICal
=============

@short:
	exports data from the Gantt chart to an iCal string

@params:
- export		object		an object with export settings (see the details)


@example:
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});


@template:	api_method
@descr:

{{note This method is defined in the **export** extension, so you need to include it on the page:
~~~html
<script src="http://export.dhtmlx.com/gantt/api.js"></script>  
~~~
Read the details in the desktop/excel.md article.

}}



The **exportToICal()** method takes as a parameter an object with the following property (optional):

- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.

@related:
desktop/excel.md#exporttoical

@relatedapi:
api/gantt_exporttomsproject.md
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_importfromexcel.md
api/gantt_importfromprimaverap6.md
api/gantt_importfrommsproject.md