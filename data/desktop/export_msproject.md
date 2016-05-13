Exporting Data to MS Project
============================


To export data from the Gantt chart to an MS Project, do the following:

- Include the <b>"http://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="http://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

- Call the **exportToMSProject()** method to export data from the Gantt chart.

You are able to use it either with some custom parameters or without them.
In the second case just call this method and wait for an XML file to return.

##The list of available custom parameters 

- **name** - (string) the name of the obtained file ('gantt.xml' by default).

~~~js
gantt.exportToMSProject({
	name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) indicates whether auto schedule mode will be switched on or off in MS Project (true - on, false - off (by default)).

~~~js
gantt.exportToMSProject({
	auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) indicates whether the circular links will be removed or not (true - will be removed, false - will not be removed (by default)).

~~~js
gantt.exportToMSProject({
	skip_circular_links: false
});
~~~

- **project** - (object) a property (properties) of this object represents one of the [tags from the list](desktop/tags.md#tagsthatcanberepresentedintheprojectobject).


[See official documentation on the XML Schema for the MS Project](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx)
and nested in the main 'Project' tag.

A value of this property (-ies) is represented by a string or a function (with custom body) 
that takes gantt config object as a parameter and will be called for getting the value. 

So the user is able to set custom values through setting custom functions or values for the tags he needs.

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function (config) {
            return config.hours_per_day * 60;
        }
    }
});
~~~

- **tasks** - (object) a property (properties) of this object represents one of the [tags from the list](desktop/tags.md#tagsthatcanberepresentedinthetasksobject).

[See official documentation on the XML Schema for the MS Project](https://msdn.microsoft.com/en-us/library/bb968652(v=office.12).aspx)
(or any custom tag) and nested in the 'Task' tag. Maximum custom tags length is 30.

A value of this property (-ies) is represented by a string or a function (with custom body) 
that takes gantt task and gantt config objects as parameters and will be called for getting the value.

So the user is able to set custom values through setting custom functions or values for the tags he needs.

~~~js
gantt.exportToMSProject({
   tasks: {
       'StartVariance': function (task, config) {
           if (task.startVariance)
               return task.startVariance;
           else
               return 0;
       },
       'PercentWorkComplete': function (task, config) {
           return (task.progress + 0.1);
       },
       'Custom': function (task, config) {
           return 'Custom value';
       },
       'Custom 2': 'My Custom value'
   }
});
~~~

- **callback** - (function) If you want to receive an url to download XML, the callback property can be used. It receives
a JSON object with the "url" property

~~~js
gantt.exportToMSProject({
	callback: function(res){
		alert(res.url);
	}
});
~~~

###The ways of using the parameters

You can use all the above given parameters in the following ways:

**a) either together:**

~~~js
gantt.exportToMSProject({
    name: 'custom.xml',
    auto_scheduling: false,
    skip_circular_links: false,
    project: {
        'Author': function (config) {
            if (config.author)
                return config.author;
            else
                return 'John Doe';
        }, 'MinutesPerDay': function (config) {
            return config.hours_per_day * 60;
        }
    },
    tasks: {
        'StartVariance': function (task, config) {
            if (task.startVariance)
                return task.startVariance;
            else
                return 0;
        }, 'PercentWorkComplete': function (task, config) {
            return (task.progress + 0.1);
        }, 'Custom': function (task, config) {
            return 'Custom value';
        }
    }
});
~~~

**b) or selectively:**

~~~js
gantt.exportToMSProject({
    auto_scheduling: false,
    project: {
        'Author': function (config) {
            if (config.author)
                return config.author;
            else
                return 'John Doe';
        }, 'MinutesPerDay': function (config) {
            return config.hours_per_day * 60;
        }, 'Custom': function (config) {
            return 'Custom value';
        }
    }
});
~~~

**c) or not to use them at all:**

~~~js
gantt.exportToMSProject();
~~~

##Import from MS Project

In order to get a JSON object from an XML or MPP file, you should "POST" form with input type="file" name="file" either to
**https://export.dhtmlx.com/gantt**.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject">
    <button type="submit">Get</button>
</form>
~~~

To get a JSON without page reloading, you can use the code like this one:

~~~js
var form = document.getElementById("mspImport");
form.onsubmit = function(event) {
    event.preventDefault();

    var fileInput = document.getElementById("mspFile");
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append("file", file);
    // get task custom fields values
    formData.append("task_fields", JSON.stringify(["priority"]));
    formData.append("type", "msproject");

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // setting worktime
            gantt.config.work_time = true;
            for (var key in data.worktime) {
                gantt.setWorkTime({ day: key, hours: data.worktime[key] });
            }

            // setting tasks and links
            gantt.parse(data.data);


        } else {
            alert('An error occurred!');
        }
    };

    xhr.open('POST', 'http://gantt.scheduler-net.com/export/mppToJson', true);
    xhr.send(formData);
};
~~~

###Setting the duration unit

To set an expected duration unit, the "duration_unit" (minute, hour, day, week, month, year) string can also be sent to the server.

~~~html
<form action="http://gantt.scheduler-net.com/export/mppToJson" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="text" name="duration_unit" value="hour" />
    <button type="submit">Get</button>
</form>
~~~

###Getting project fields

To get project fields, the "project_fields" input with an array of necessary fields can be sent to the server.

~~~js
var form = document.getElementById("mspImport");
form.onsubmit = function(event) {
    event.preventDefault();
    var fileInput = document.getElementById("mspFile");
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append("file", file);
    //Get project fields values
    formData.append("project_fields", JSON.stringify(["Author", "Title"]));
    formData.append("type", "msproject");

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (xhr.status === 200) {
         var data = JSON.parse(xhr.responseText);

         // setting worktime
         gantt.config.work_time = true;
         for (var key in data.worktime) {
            gantt.setWorkTime({ day: key, hours: data.worktime[key] });
         }

         // setting tasks and links
         gantt.parse(data.data);
		 alert(data.config.$custom_data.Title + " by " + 
         	data.config.$custom_data.Author + " loaded!");

       	 } else {
            alert('An error occurred!');
     	 }
	};

	xhr.open('POST', 'http://gantt.scheduler-net.com/export/mppToJson', true);
	xhr.send(formData);
};
~~~

###Getting tasks fields

To get tasks fields, the "task_fields" input with an array of necessary fields can be sent to the server.

~~~js
gantt.attachEvent("onTaskLoading", function(task) {
	if (task.$custom_data) {
		task.contact = task.$custom_data["Contact"];
		task.priority = task.$custom_data["priority"];
		delete task.$custom_data;
	}
	return true;
});
	/*....*/
var form = document.getElementById("mspImport");
form.onsubmit = function(event) {
    event.preventDefault();

    var fileInput = document.getElementById("mspFile");
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append("file", file);
    // get task custom fields values
    formData.append("task_fields", JSON.stringify(["Contact", "priority"]));
    formData.append("type", "msproject");

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // setting worktime
            gantt.config.work_time = true;
            for (var key in data.worktime) {
            	gantt.setWorkTime({ day: key, hours: data.worktime[key] });
            }

            // setting tasks and links
            gantt.parse(data.data);


        } else {
            alert('An error occurred!');
        }
    };

    xhr.open('POST', 'http://gantt.scheduler-net.com/export/mppToJson', true);
    xhr.send(formData);
};
~~~

@index:

- desktop/tags.md