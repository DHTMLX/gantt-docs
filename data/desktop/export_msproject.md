Export and Import from MS Project
============================

Export to MS Project
-----------------------

The Gantt component allows exporting links, tasks and resources into MS Project.

To export data from the Gantt chart to MS Project, do the following:

- Include the **"https://export.dhtmlx.com/gantt/api.js"** file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

- Call the api/gantt_exporttomsproject.md method to export data from the Gantt chart.

~~~js
gantt.exportToMSProject();
~~~

The method will send a request to the remote service, which will either output an XML Project file or return an url to download a generated file.

{{sample
	08_api/08_export_other.html
}}

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
- **resources** - an array of objects (each having the following properties: {*id: string, name:string, type:string*}) that represent the list of resources from the project file.
- **worktime** - an object containing the working time settings from the project calendar.


###Export settings

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

The properties of this object correspond to the appropriate properties of the [Project entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx). 
The list of supported properties can be found [here](desktop/tags.md). The properties may contain either fixed values or functions that will be executed when export is called.

- **tasks** - (object) allows setting custom properties to the exported task items

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

The properties of this object correspond to the appropriate properties of the [Task entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx), 
here is a list of supported [properties](desktop/tags.md#tasksproperties).
The properties may contain either fixed values or functions that will be called for each task in the dataset when export is called.


- **callback** - (function) If you want to receive an url to download a generated XML, the *callback* property can be used. It receives a JSON object with the *url* property:

~~~js
gantt.exportToMSProject({
	callback: function(res){
		alert(res.url);
	}
});
~~~
 
- **resources** - (array) allows exporting the list of resources into an MS Project file

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

- **server** - (string) the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToMSProject({
   server:"https://myapp.com/myexport/gantt"
});
~~~


Import from MS Project
----------------------

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
It extracts arbitrary properties of [the Project entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx) 
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
It extracts arbitrary properties of the [Task entities](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx). Here is the list of supported [properties](desktop/tags.md#tasksproperties):

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

##Limits on request size and import of large files

There are two API endpoints for the MSProject export/import services:

- <b>*https://export.dhtmlx.com/gantt*</b> - the default endpoint which serves all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.
- <b>*https://export.dhtmlx.com/gantt/project*</b> - the endpoint dedicated to MS Project services (*exportToMSProject*/*importFromMSProject* only). **Max request size: 40 MB**.

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

dhtmlxGantt vs MS Project time calculation
------------------------------------------

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


@index:
- desktop/tags.md