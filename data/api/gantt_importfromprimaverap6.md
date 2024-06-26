importFromPrimaveraP6
=============


@short:
	converts an XML or XER Primavera P6 file to JSON

@params:
- config		object		an object with configuration properties of an imported file


@example:

gantt.importFromPrimaveraP6({
	data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
    	if (project) {
        	gantt.clearAll();
            if (project.config.duration_unit) {
            	gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});


@template:	api_method
@descr:

{{note The method requires HTML5 File API support.}}

{{note This method is defined in the **export** extension, so you need to activate the [export_api](desktop/extensions_list.md#exportservice) plugin. Read the details in the desktop/export_primavera.md#importfromprimaverap6 article.}}

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}

The method takes as a parameter an object with configuration properties of an imported file:

- **data** - an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either XER or XML Project file.
- **callback** - a callback function.
- **durationUnit** - sets an expected duration unit ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - specifies an array of project properties that should be put into the response.
- **taskProperties** - specifies an array of additional task properties to be imported.

### Response

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
desktop/export_primavera.md#importfromprimaverap6

@relatedapi:
api/gantt_exporttomsproject.md
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_importfromexcel.md
api/gantt_importfrommsproject.md


@relatedsample:
08_api/18_load_from_primaverap6.html
