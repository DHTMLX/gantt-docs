importFromMSProject
=============

@short:
	converts an XML or MPP MS Project file to JSON

@params:

- config		object		an object with configuration properties of an imported file

@example:
gantt.importFromMSProject({
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

{{note This method is defined in the **export** extension, so you need to activate the [export_api](desktop/extensions_list.md#exportservice) plugin. Read the details in the desktop/export_msproject.md#importfrommsproject article.

}}

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}

The method takes as a parameter an object with configuration properties of an imported file:

- **data** - an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either MPP or XML Project file.
- **callback** - a callback function.
- **durationUnit** - sets an expected duration unit ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - specifies an array of project properties that should be put into the response.
- **taskProperties** - specifies an array of additional task properties to be imported.

Check the detailed descriptions of the import settings in the [related section](desktop/export_msproject.md#importsettings).

### Response

The response will contain a JSON of the following structure:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {},
   calendars: []
}
~~~

- **data** - (*object*) a gantt [data object](desktop/supported_data_formats.md#json). Each task has the following properties: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 
Dates are stringified in the "%Y-%m-%d %H:%i" format. 
- **config** - (*object*) a gantt [configuration](api/refs/gantt_props.md) object with settings retrieved from the project file.
- **resources** - (*array*) an array of objects (each having the following properties: {*id: string, name: string, type: string, calendar: string*} that represent the list of resources from the project file.
- **worktime** - (*object*) an object containing the working time settings from the project calendar. It can contain the following attributes:
   - **id** - (*string | number*) optional, the calendar id
   - **hours** - (*array*) an array with global working hours, sets the start and end hours of the task
    - **dates** - (*array*) an array of dates that can contain:
        - 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
        - other records are dates 
- **calendars** - (*array*) an array containing calendar configuration objects for creating a new calendar. 
    - **calendarConfig** - (*object*) a calendar configuration object that can contain the following attributes:
      - **id** - (*string | number*) optional, the calendar id
      - **name** - (*string*) the calendar name
      - **hours** - (*array*) an array with global working hours, sets the start and end hours of the task
      - **dates** - (*array*) an array of dates that can contain:
            - 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
            - other records are dates

@related:
desktop/export_msproject.md#importfrommsproject

@relatedapi:
api/gantt_exporttomsproject.md
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_importfromexcel.md
api/gantt_importfromprimaverap6.md

@relatedsample:
	08_api/18_load_from_mpp.html


