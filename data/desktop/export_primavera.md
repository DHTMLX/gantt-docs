Export and Import from Primavera P6
============================

Export to Primavera P6
-----------------------

The Gantt component allows exporting links, tasks and resources into Primavera P6.

To export data from the Gantt chart to Primavera P6, do the following:

- Include the **"https://export.dhtmlx.com/gantt/api.js"** file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

- Call the [exportToPrimaveraP6()](api/gantt_exporttoprimaverap6.md) method to export data from the Gantt chart.

~~~js
gantt.exportToPrimaveraP6();
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


### Export settings

The **exportToPrimaveraP6()** method takes as a parameter an object with a number of properties (all of the properties are optional):

- **name** - (string) the name of the obtained file ('gantt.xml' by default).

~~~js
gantt.exportToPrimaveraP6({
	name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) indicates scheduling mode for tasks in the exported project. **true** will mark tasks as auto scheduled, **false** will mark tasks as manually scheduled (the default state).

~~~js
gantt.exportToPrimaveraP6({
	auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) indicates whether the circular links will be removed or not (true - will be removed (the default mode), false - will not be removed).

~~~js
gantt.exportToPrimaveraP6({
	skip_circular_links: false
});
~~~

- **project** - (object) allows setting custom properties to the exported project entity

~~~js
gantt.exportToPrimaveraP6({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

The properties of this object correspond to the appropriate properties of the [Project entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx). 
The list of supported properties can be found [here](desktop/properties.md). The properties may contain either fixed values or functions that will be executed when export is called.

- **tasks** - (object) allows setting custom properties to the exported task items

~~~js
gantt.exportToPrimaveraP6({
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
       '    Custom 2': 'My Custom value'
    }
});
~~~

The properties of this object correspond to the appropriate properties of the [Task entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx), 
here is a list of supported [properties](desktop/properties.md#tasksproperties).
The properties may contain either fixed values or functions that will be called for each task in the dataset when export is called.

- **data** - (object) allows setting a custom data source that will be presented in the output Gantt chart. 

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

gantt.exportToPrimaveraP6({
    data: customData
});
~~~

{{editor	https://snippet.dhtmlx.com/10ytgdxs	Gantt. Export custom data
}}

- **callback** - (function) If you want to receive an url to download a generated XML, the *callback* property can be used. It receives a JSON object with the *url* property:

~~~js
gantt.exportToPrimaveraP6({
	callback: function(res){
		alert(res.url);
	}
});
~~~
 
- **resources** - (array) allows exporting the list of resources into an Primavera P6 file

~~~js
gantt.exportToPrimaveraP6({
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

gantt.exportToPrimaveraP6({
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

{{editor	https://snippet.dhtmlx.com/5/68c831215	Export Gantt with resources to Primavera P6}}

- **server** - (string) the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToPrimaveraP6({
    server:"https://myapp.com/myexport/gantt"
});
~~~


Import from Primavera P6
----------------------

In order to convert an XML or XER file, you need to send the following request to the export service:

 - Request URL - **https://export.dhtmlx.com/gantt**
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

The request parameters are:

 - **file** - an XER or XML Primavera P6 file
 - **type** - "primaveraP6-parse"
 - **data** - (*optional*) a JSON string with settings

For example:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternatively, you can use the [client-side API](api/gantt_importfromprimaverap6.md), like this:

~~~js
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
~~~

{{sample
	08_api/18_load_from_primaverap6.html
}}

Where *file* is an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either an XML or XER Project file.

{{note	
**gantt.importFromPrimaveraP6** requires HTML5 File API support.
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
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
    	value="{ \"durationUnit\": \"hour\" }" />
    <button type="submit">Get</button>
</form>
~~~

or

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### Getting properties of the Project

To get project fields, the **projectProperties** input with an array of necessary fields can be sent to the server.
It extracts arbitrary properties of [the Project entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx) 
into the **config** property of the output. Here is the list of supported [properties](desktop/properties.md#projectproperties).

 - **projectProperties** - specifies an array of project properties that should be put into the response.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
    	value="{ \"projectProperties\": [\"Author\", \"Title\"] }" />
    <button type="submit">Get</button>
</form>
~~~

or

~~~js
gantt.importFromPrimaveraP6({
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
It extracts arbitrary properties of the [Task entities](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx). Here is the list of supported [properties](desktop/properties.md#tasksproperties):

 - **taskProperties** - specify an array of additional task properties to be imported.


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
	enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
    	value="{ \"taskProperties\": [\"Contact\", \"Priority\"] }" />
    <button type="submit">Get</button>
</form>
~~~
or
~~~js
gantt.importFromPrimaveraP6({
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

There are two API endpoints for the Primavera P6 export/import services:

- <b>*https://export.dhtmlx.com/gantt*</b> - the default endpoint which serves all export methods (*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6*, etc.). **Max request size is 10 MB**.
- <b>*https://export.dhtmlx.com/gantt/project*</b> - the endpoint dedicated to Primavera P6 services (*exportToPrimaveraP6*/*importFromPrimaveraP6* only). **Max request size: 40 MB**.

The endpoint can be specified by the **server** property of the export configuration object:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

If no endpoint is specified, <b>*https://export.dhtmlx.com/gantt*</b> is used by default. The following call is equivalent to the one above:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

In order to export or import large projects that exceed the 4MB limit, the second endpoint can be used:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

It allows sending requests up to 40MB in size and supports Primavera P6 exports and imports. It can be used for Primavera P6 exports only. 

Any other methods, for example, *gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})* should return a server error.




@index:
- desktop/properties.md