Export and Import from MS Project
============================

The dhtmlxGantt library allows you to export data from the Gantt chart into MS Project. You can also import data into Gantt from MS Project.

{{note
The service is free, but the output file will contain the library's watermark under the GPL license. 
In case you buy a license, the result of export will be available without a watermark
during the valid support period (12 months for all PRO licenses).
}}

There are several export services available. You can install them on your computer and export Gantt chart to MS Project locally.
Note that export services are not included into the Gantt package, 
read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) to learn the terms of using each of them.

Online export service restrictions
-----------------------------

{{note The export service has time and request size restrictions.}}

### Time limits

If the process takes over than 20 seconds, the export will be canceled and the following error will occur:

~~~html
Error: Timeout trigger 20 seconds
~~~

If several people export Gantt at the same time, the process can take more time than usual. But that's fine because the time which is spent for export request from a specific user is counted separately.

### Limits on request size

There is a common API endpoint **https://export.dhtmlx.com/gantt** which serves for all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.

There is also a separate API endpoint **https://export.dhtmlx.com/gantt/project** specific for the [MSProject](#limitsonrequestsizeandimportoflargefiles) and 
[Primavera P6](desktop/export_primavera.md) 
export/import services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* only). **Max request size: 40 MB**.

Using export modules
---------------------

{{note If you need to export large charts, you can use a [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). 
The export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).}}

[Read more on the usage of the export module for MS Project](desktop/msp_export_module.md). 


## Export to MS Project

The Gantt component allows exporting links, tasks and resources into MS Project.

To export data from the Gantt chart to MS Project, do the following:

- To use the online export service, enable the <b>export_api</b> plugin via the api/gantt_plugins.md method:

~~~js
gantt.plugins({
  	export_api: true
});
~~~

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}

- Call the api/gantt_exporttomsproject.md method to export data from the Gantt chart.

~~~js
gantt.exportToMSProject();
~~~

The method will send a request to the remote service, which will either output an XML Project file or return an url to download a generated file.

{{sample
	08_api/08_export_other.html
}}

<h3 id="exportsettings">Export settings</h3>

The **exportToMSProject()** method takes as a parameter an object with a number of properties (all of the properties are optional):

- **name** - (string) the name of the obtained file ('gantt.xml' by default).

~~~js
gantt.exportToMSProject({
	name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) indicates scheduling mode for tasks in the exported project. **true** will mark tasks as auto scheduled, **false** will mark tasks as manually scheduled (the default state).

~~~js
gantt.exportToMSProject({
	auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) indicates whether the circular links will be removed or not (true - will be removed (the default mode), false - will not be removed).

~~~js
gantt.exportToMSProject({
	skip_circular_links: false
});
~~~

- **project** - (object) allows setting custom properties to the exported project entity

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

The properties of this object correspond to the appropriate properties of the  [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). 
The list of supported properties can be found [here](desktop/tags.md). The properties may contain either fixed values or functions that will be executed when export is called.

- <p id="tasks"><b>tasks</b> - (object) allows setting custom properties to the exported task items</p>

~~~js
gantt.exportToMSProject({
   tasks: {
       'StartVariance': function (task) {
           if (task.startVariance)
               return task.startVariance;
           else
               return 0;
       },
       'PercentWorkComplete': function (task) {
           return (task.progress + 0.1);
       },
       'Custom': function (task) {
           return 'Custom value';
       },
       'Custom 2': 'My Custom value'
   }
});
~~~

The properties of this object correspond to the appropriate properties of the [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), 
here is a list of supported [properties](desktop/tags.md#tasksproperties).
The properties may contain either fixed values or functions that will be called for each task in the dataset when export is called.

- **data** - (object) allows setting a custom data source that will be presented in the output Gantt chart

{{note It is expected that the **start_date** and **end_date** properties will be specified in the format which includes both the date and time (*%d-%m-%Y %H:%i*).}}

~~~js
const customData = {
    "data": [
        { "id": "10", "text": "Project #5", "start_date": "01-04-2025 00:00", 
            "duration": 3, "order": 10, "progress": 0.4, "open": true, 
            "end_date": "04-04-2025 00:00", "parent": 0 
        },
        { "id": "1", "text": "Task #67", "start_date": "02-04-2025 00:00", 
            "duration": 2, "order": 10, "progress": 0.6, "parent": "10", 
            "end_date": "04-04-2025 00:00" 
        },
        { "id": "2", "text": "Task #89", "start_date": "01-04-2025 00:00", 
            "duration": 2, "order": 20, "progress": 0.6, "parent": "10", 
            "end_date": "03-04-2025 00:00" 
        },
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
    ]
}

gantt.exportToMSProject({
    data: customData
});
~~~

{{editor	https://snippet.dhtmlx.com/10ytgdxs	Gantt. Export custom data}}

- **callback** - (function) If you want to receive an url to download a generated XML, the *callback* property can be used. It receives a JSON object with the *url* property:

~~~js
gantt.exportToMSProject({
	callback: function(res){
		alert(res.url);
	}
});
~~~
 
- <p id="resources"><b>resources</b> - (array) allows exporting the list of resources into an MS Project file</p>

~~~js
gantt.exportToMSProject({
  resources: [
    {"id":"1","name":"John","type":"work"},
    {"id":"2","name":"Mike","type":"work"},
    {"id":"3","name":"Anna","type":"work"}
  ]
});
~~~

Possible resource types are "work", "cost", "material". Resource assignments are specified using the **ResourceAssignments** property of the tasks configuration:

~~~js
var users = [// resources
  {key:'0', label: "N/A"},
  {key:'1', label: "John"},
  {key:'2', label: "Mike"},
  {key:'3', label: "Anna"}
];

gantt.exportToMSProject({
  resources: users
     .filter(function(u){
        if(u.key === '0')//skip the default option 
           return false;
        return true;
     })
     .map(function(u){
        return {
           id: u.key,
           name: u.label,
           type: "work"
       	};
  	 }),
  tasks: {
     ResourceAssignments: function(task){  /*!*/
        return task.user;				   /*!*/
     }									   /*!*/
  }
});
~~~

The **ResourceAssignments** property is set as a function that takes the task object as a parameter and returns either a string/number value or an array of string/number values:

~~~js
tasks: {
	ResourceAssignments: function(task){
		return [task.user, task.office];
	}
}
~~~

It is possible to specify the *units* parameter for resource assignments by returning the following object in the **ResourceAssignments** property:

~~~js
{
  resource_id: "id",
  units: "units value"
}
~~~

- **resource calendars**

By default, each task has some calendar added to it. If the resource calendars are used, you need to specify -1 for a task in the 
*CalendarUID* property during the export (in the [tasks](#tasks) object). Then the task will use the resource calendar.

While exporting [resource calendars](api/gantt_resource_calendars_config.md), it is possible to specify the resource calendar in an object of the [resources](#resources) array: 

~~~js
gantt.exportToMSProject({
  resources: [
    {
      id: "10",
      name: "John",
      type: "work",
      calendar: gantt.config.resource_calendars[10]
    }
  ]
});    
~~~

- **server** - (string) the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToMSProject({
   server:"https://myapp.com/myexport/gantt"
});
~~~

## Import from MS Project

In order to convert an XML or MPP MS Project file, you need to send the following request to the export service:

 - Request URL - **https://export.dhtmlx.com/gantt**
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

The request parameters are:

 - **file** - an MPP or XML MS Project file
 - **type** - "msproject-parse"
 - **data** - (*optional*) a JSON string with settings

For example:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternatively, you can use the [client-side API](api/gantt_importfrommsproject.md), like this:

~~~js
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
~~~

{{sample
	08_api/18_load_from_mpp.html
}}

Where *file* is an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either an XML or MPP Project file.

{{note	
**gantt.importFromMSProject** requires HTML5 File API support.
}}


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
- **resources** - (*array*) an array of objects (each having the following properties: {*id: string, name: string, type: string, calendar: string*} 
that represent the list of resources from the project file.
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
     
<h3 id="importsettings">Import settings</h3>

#### Setting the duration unit

To set an expected duration unit, the **durationUnit** ("minute", "hour", "day", "week", "month", "year") string can also be sent to the server.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
    	value="{ \"durationUnit\": \"hour\" }" />
    <button type="submit">Get</button>
</form>
~~~

or

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### Getting properties of the Project

To get project fields, the **projectProperties** input with an array of necessary fields can be sent to the server.
It extracts arbitrary properties of [the Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 
into the **config** property of the output. Here is the list of supported [properties](desktop/tags.md#projectproperties).

 - **projectProperties** - specifies an array of project properties that should be put into the response.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
    	value="{ \"projectProperties\": [\"Author\", \"Title\"] }" />
    <button type="submit">Get</button>
</form>
~~~

or

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
    }
});
~~~

#### Getting tasks properties

To get task fields, the **taskProperties** input with an array of necessary fields can be sent to the server.
It extracts arbitrary properties of the [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Here is the list of supported [properties](desktop/tags.md#tasksproperties):

 - **taskProperties** - specify an array of additional task properties to be imported.


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
    	value="{ \"taskProperties\": [\"Contact\", \"Priority\"] }" />
    <button type="submit">Get</button>
</form>
~~~
or
~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", function(task) {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~

#### Getting task types

The following logic allows you to obtain the task type: the tasks with the **Project** type have the `Summary: "1"` property, and the tasks with the **Milestone** type have the `Milestone: "1"` property. We need to import the data with these properties and then set the task type depending on these properties.

The call of the import function will look like this:

~~~js
gantt.importFromMSProject({
        data: file,
        taskProperties: [
            "Summary",
            "Milestone",
        ],
        callback: function (project) {
            if (project) {
                console.log(project)
                gantt.clearAll();
                if (project.config.duration_unit) {
                    gantt.config.duration_unit = project.config.duration_unit;
                }
                console.log('import: ', project.data);
                gantt.parse(project.data);
            }
        }
    });
~~~

After that you can convert the types of tasks based on the received properties as follows:

~~~js
gantt.attachEvent("onTaskLoading", function (task) {
    if (task.$custom_data) {
        if (task.$custom_data.Summary == "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone == "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

{{editor	https://snippet.dhtmlx.com/sjka4br8		Gantt. Import MSP files. Get task type from properties}}

#### Adding and adjusting calendars

Note that calendars aren't automatically added during the import. You need to add them using the [addCalendar()](api/gantt_addcalendar.md) method. 
After that, you should specify calendar settings via the [setWorkTime()](api/gantt_setworktime.md) method. For example:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // settings for adding calendars
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // adding working time settings for the global calendar
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt doesn't add a calendar 
                    // if the `hours` parameter is an empty array
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (let element in worktimeDates) {
                    const date = new Date(+element)
                    if (element < 10) {
                        addedCalendar.setWorkTime({ 
                            day: element, 
                            hours: worktimeDates[element] 
                        })
                    }
                    else {
                        addedCalendar.setWorkTime({ 
                            date: date, 
                            hours: worktimeDates[element] 
                        })
                    }
                }
            })
        }
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/668xqts7		Gantt. Calendars settings for export/import in MSProject and Primavera6}}

#### Resource calendars

If there are resource calendars, you need to specify them via the [gantt.config.resource_calendars](api/gantt_resource_calendars_config.md) property:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // settings for calendars
            project.calendars.forEach(function (calendar) {
                // adding the calendars and work time settings for them 
            })

            // settings for resource calendars
            gantt.config.resource_calendars = {}

            project.resources.forEach(function (resource) {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            })
        }
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/10czv54b		Gantt. Resource calendars settings for export/import in MSProject and Primavera6}}

#### Resources and resource assignments

If there are resources in the file, they come in the **resources** array during the import. The *calendar* parameter of the 
**resources** property specifies the resource calendar:

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // more resources
    ]
}
~~~

If there are resource assignments, they will be imported in the **assignments** array, where the assignment object contains the 
*resource_id: string* and *value: number* parameters. For example:

~~~js
{
    tasks: [
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        // more tasks
    ],
    links: [],
    assignments: [
        { id: 1, task_id: 5, resource_id: 6, value: 3},
        // more assignments
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        // more resources
    ]
}
~~~

## Limits on request size and import of large files

There are two API endpoints for the MSProject export/import services:

- **https://export.dhtmlx.com/gantt** - the default endpoint which serves all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.
- **https://export.dhtmlx.com/gantt/project** - the endpoint specific for the [MSProject](desktop/export_msproject.md) and 
[Primavera P6](desktop/export_primavera.md) 
export/import services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* only). **Max request size: 40 MB**.

The endpoint can be specified by the **server** property of the export configuration object:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

If no endpoint is specified, <b>*https://export.dhtmlx.com/gantt*</b> is used by default. The following call is equivalent to the one above:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

In order to export or import large projects that exceed the 4MB limit, the second endpoint can be used:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

It allows sending requests up to 40MB in size and supports MS Project exports and imports. It can be used for MS Project exports only. 

Any other methods, for example, *gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})* should return a server error.

## dhtmlxGantt vs MS Project time calculation

There are fundamental differences between how date calculations work in dhtmlxGantt and MS Project, and in some cases it leads to different results. 

The differences also vary on a combination of configs used in the gantt. But you can change the settings of the gantt which can influence the results of calculations:

1\. Firstly, there are differences in duration conversions between dhtmlxGantt and [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/).

It can be bypassed by specifying *HoursPerDay* and *MinutesPerDay* when you export the gantt to MS Project:

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: function () {
            return 24;
        },
        MinutesPerDay: function () {
            return 24 * 60;
        }
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/92fje5jq		Export to MSProject without the "work_time" settings}}

2\. Secondly, your project may have the [work_time](desktop/working_time.md) setting disabled:

~~~js
gantt.config.work_time = false;
~~~

Note, even when the work time calculations are disabled, the gantt still has the default calendar settings in the config (8 hours per day, Mon-Fri workweek).
And our export client always sends the default calendar to MS Project, even if the worktime is disabled in gantt. That’s why MS Project calculates task durations differently.

As a workaround, you can clear the default calendar so even if it’s sent to MS Project, tasks durations will be calculated in the same way as in the gantt:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3\. Besides, you may notice divergence between dates of summary items if you have specified [gantt.config.duration_unit](api/gantt_duration_unit_config.md) to "day":

~~~js
gantt.config.duration_unit = "day";
~~~

In this case the gantt will round durations to total days count. But MS Project won't do it and will display fraction durations. For example, the top project will have a duration of 439 in the gantt but 438.58 in MS Project.

The only workaround for it would be to switch [duration_unit](api__gantt_duration_unit_config.html) to hour units:

~~~js
gantt.config.duration_unit = "hour";
~~~

{{editor	https://snippet.dhtmlx.com/92fje5jq		Export to MSProject without the "work_time" settings}}


@index:
- desktop/tags.md