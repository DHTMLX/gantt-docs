importFromExcel
=============

@short:
	converts an Excel file to JSON

@params:

- config		object		an object with configuration properties of an imported file

@example:
gantt.importFromExcel({
	server:"https://export.dhtmlx.com/gantt",
	data: file,
	callback: function(project){
    	console.log(project)
    }
});


@template:	api_method
@descr:
{{note The method requires HTML5 File API support.}}

{{note This method is defined in the **export** extension, so you need to include it on the page:
~~~html
<script src="http://export.dhtmlx.com/gantt/api.js"></script>  
~~~
Read the details in the desktop/excel.md#importfromexcel article.

}}


The method takes as a parameter an object with configuration properties of an imported file:

- **server** - sets the API endpoint for the request. Can be used with the local install of the import service. The default value is **https://export.dhtmlx.com/gantt**.
- **data** - an instance of [File](https://developer.mozilla.org/en/docs/Web/API/File) which should contain an Excel (xlsx) file. 
- **callback** - a callback function.
- **sheet** - the number of the sheet of the document that should be returned by the import service.

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


@related:
desktop/excel.md#importfromexcel

@relatedapi:
api/gantt_exporttoexcel.md
api/gantt_exporttomsproject.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_importfrommsproject.md

@relatedsample:
	08_api/21_load_from_excel.html
    



