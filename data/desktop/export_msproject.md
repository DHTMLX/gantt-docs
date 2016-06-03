Exporting to MS Project
============================

##Export to MS Project

To export data from the Gantt chart to an MS Project, do the following:

- Include the <b>"http://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:

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

##Export settings

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

The properties of this object correspond to the appropriate properties of the [Task entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx), here is a list of supported [properties](desktop/tags.md#tagsthatcanberepresentedinthetasksobject).
The properties may contain either fixed values or functions that will be called for each task in the dataset when export is called.


- **callback** - (function) If you want to receive an url to download a generated XML, the *callback* property can be used. It receives a JSON object with the *url* property:

~~~js
gantt.exportToMSProject({
	callback: function(res){
		alert(res.url);
	}
});
~~~


##Import from MS Project

In order to convert XML or MPP MS Project file, you need to send the following request to the export service:

 - Request URL - **https://export.dhtmlx.com/gantt**
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

The request parameters:

 - **file** - MPP or XML MSProject file
 - **type** - "msproject-parse"
 - data - (optional) JSON string with settings

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

 - data - gantt data object desktop/supported_data_formats.md#json. Each task has the following properties: id, open, parent, progress, start_date, text, resource. Dates are stringified in the "%Y-%m-%d %H:%i" format.
 - config - gantt [configuration](api/refs/gantt_props.md) object with settings retrieved from the project file.
 - resources - array of objects {id:string, name:string} that represent list of resources from the project file.
 - worktime - object containing the working time settings from the project calendar.


##Import settings
###Setting the duration unit

To set an expected duration unit, the "durationUnit" (minute, hour, day, week, month, year) string can also be sent to the server.

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

Extract arbitrary properties of [the Project entity](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx) into the **config** property of the output, here is the list of supported 
[properties](desktop/tags.md#projectproperties).

 - **projectProperties** - specify an array of project properties that should be put into the response.

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

Extract arbitrary properties of the [Task entities](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx), here is the list of supported [properties](desktop/tags.md#taskproperties).
To get project fields, the "projectProperties" input with an array of necessary fields can be sent to the server.

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

@index:

- desktop/tags.md