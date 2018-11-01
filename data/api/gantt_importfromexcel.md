importFromExcel
=============

@short:
	converts an XML or Excel file to JSON

@params:

- config		object		an object with configuration properties of an imported file

@example:
gantt.importFromExcel({
	server:"https://export.dhtmlx.com/gantt",
	data: file,
	callback: function (project) {}
});


@template:	api_method
@descr:

{{note The method requires HTML5 File API support.}}

The method takes as a parameter an object with configuration properties of an imported file:

- **data** - an instance of [File](https://developer.mozilla.org/en/docs/Web/API/File) which should contain either MPP or XML Project file.
- **callback** - a callback function.
- **durationUnit** - sets an expected duration unit ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - specifies an array of project properties that should be put into the response.
- **taskProperties** - specifies an array of additional task properties to be imported.

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

@related:
desktop/excel.md

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
    
@todo: check and improve


