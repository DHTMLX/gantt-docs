Export and Import from MS Project
============================

##Export to MS Project

The Gantt component allows exporting links, tasks and resources into MS Project.

To export data from the Gantt chart to MS Project, do the following:

- Include the <b>"https://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

- Call the **exportToMSProject()** method to export data from the Gantt chart.

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


##Export settings

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
The list of supported properties can be found [here](desktop/tags.md).
The properties may contain either fixed values or functions that will be executed when export is called.

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
here is a list of supported [properties](desktop/tags.md#tagsthatcanberepresentedinthetasksobject).
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

Possible resource types are "work", "cost", "material".
Resource assignments are specified using the **ResourceAssignments** property of the tasks configuration:

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
     ResourceAssignments: function(task){
        return task.user;
     }
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


##Import from MS Project

In order to convert XML or MPP MS Project file, you need to send the following request to the export service:

 - Request URL - **https://export.dhtmlx.com/gantt**
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

The request parameters:

 - **file** - MPP or XML MS Project file
 - **type** - "msproject-parse"
 - **data** - (optional) JSON string with settings

For example:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternatively, you can use the client-side API:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
        if(project){
            gantt.clearAll();

            if(project.config){
                gantt.mixin(gantt.config, project.config, true);
            }
            gantt.parse(project.data);
        }
        if(callback)
            callback(project);
    }
});
~~~

{{sample
	08_api/18_load_from_mpp.html
}}

Where *file* is an instance of [File](https://developer.mozilla.org/en/docs/Web/API/File) which should contain either MPP or XML Project file.

{{note
gantt.importFromMSProject requires HTML5 File API support.
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


##Import settings
###Setting the duration unit

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

###Getting properties of the Project

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

###Getting tasks properties

To get task fields, the **taskProperties** input with an array of necessary fields can be sent to the server.
It extracts arbitrary properties of the [Task entities](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx). 
Here is the list of supported [properties](desktop/tags.md#tasksproperties).


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

- [https://export.dhtmlx.com/gantt](https://export.dhtmlx.com/gantt) - the default endpoint which serves all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 4MB**.
- [https://export.dhtmlx.com/gantt/project](https://export.dhtmlx.com/gantt/project) - the endpoint dedicated to MS Project services (*exportToMSProject*/*importFromMSProject* only). **Max request size: 40MB**.

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

If no endpoint is specified, [https://export.dhtmlx.com/gantt](https://export.dhtmlx.com/gantt) is used by default. The following call is equivalent to the one above:

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

@index:

- desktop/tags.md