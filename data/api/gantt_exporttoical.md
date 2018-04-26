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
The **exportToICal()** method takes as a parameter an object with the following property (optional):

- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.

@related:
desktop/excel.md#exporttoical

@relatedapi:
api/gantt_exporttoexcel.md
api/gantt_exporttopng.md
api/gantt_exporttopdf.md
api/gantt_exporttojson.md
api/gantt_exporttomsproject.md
api/gantt_importfrommsproject.md