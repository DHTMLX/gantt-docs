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

- **project** - (object) a property (properties) of this object represents one of the tags:

<style>
.myblock{
	display:inline-block;
    width:235px;
    vertical-align:top;
}
</style>


<div class="myblock">
	<li>ActualsInSync</li>
	<li>AdminProject</li>
	<li>Author</li>
	<li>AutoAddNewResourcesAndTasks</li>
	<li>Autolink</li>
	<li>BaselineForEarnedValue</li>
	<li>CalendarUID</li>
	<li>Category</li>
	<li>Company</li>
	<li>CreationDate</li>
	<li>CriticalSlackLimit</li>
	<li>CurrencyCode</li>
	<li>CurrencyDigits</li>
	<li>CurrencySymbol</li>
	<li>CurrencySymbolPosition</li>
	<li>CurrentDate</li>
	<li>DaysPerMonth</li>
	<li>DefaultFinishTime</li>
	<li>DefaultFixedCostAccrual</li>
	<li>DefaultOvertimeRate</li>
	<li>DefaultStandardRate</li>
	<li>DefaultStartTime</li>	
</div>

<div class="myblock">
	<li>DefaultTaskEVMethod</li>
	<li>DefaultTaskType</li>
	<li>DurationFormat</li>
	<li>EarnedValueMethod</li>
	<li>EditableActualCosts</li>
	<li>ExtendedCreationDate</li>
	<li>FinishDate</li>
	<li>FiscalYearStart</li>
	<li>FYStartDate</li>
	<li>HonorConstraints</li>
	<li>InsertedProjectsLikeSummary</li>
	<li>LastSaved</li>
	<li>Manager</li>
	<li>MicrosoftProjectServerURL</li>
	<li>MinutesPerDay</li>
	<li>MinutesPerWeek</li>
	<li>MoveCompletedEndsBack</li>
	<li>MoveCompletedEndsForward</li>
	<li>MoveRemainingStartsBack</li>
	<li>MoveRemainingStartsForward</li>
	<li>MultipleCriticalPaths</li>
	<li>Name</li>
</div>

<div class="myblock">
	<li>NewTasksEffortDriven</li>
	<li>NewTasksEstimated</li>
	<li>NewTaskStartDate</li>
	<li>ProjectExternallyEdited</li>
	<li>RemoveFileProperties</li>
	<li>Revision</li>
	<li>ScheduleFromStart</li>
	<li>SplitsInProgressTasks</li>
	<li>SpreadActualCost</li>
	<li>SpreadPercentComplete</li>
	<li>StartDate</li>
	<li>StatusDate</li>
	<li>Subject</li>
	<li>TaskUpdatesResource</li>
	<li>Title</li>
	<li>UID</li>
	<li>WeekStartDay</li>
	<li>WorkFormat</li>
</div>



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

- **tasks** - (object) a property (properties) of this object represents one of the tags:

<div class="myblock">
	<li>ActualCost</li>
    <li>ActualDuration</li>
    <li>ActualFinish</li>
    <li>ActualOvertimeCost</li>
    <li>ActualOvertimeWork</li>
    <li>ActualOvertimeWorkProtected</li>
    <li>ActualStart</li>
    <li>ActualWork</li>
    <li>ActualWorkProtected</li>
    <li>ACWP</li>
    <li>Baseline</li>
    <li>BCWP</li>
    <li>BCWS</li>
    <li>CalendarUID</li>
    <li>ConstraintDate</li>
    <li>ConstraintType</li>
    <li>Contact</li>
    <li>Cost</li>
    <li>CreateDate</li>
    <li>Critical</li>
    <li>CV</li>
    <li>Deadline</li>
    <li>Duration</li>
    <li>DurationFormat</li>
    <li>EarlyFinish</li>
    <li>EarlyStart</li>
    <li>EarnedValueMethod</li>
    <li>EffortDriven</li>
    <li>Estimated</li>
</div>


<div class="myblock">
	<li>ExternalTask</li>
    <li>ExternalTaskProject</li>
    <li>Finish</li>
    <li>FinishVariance</li>
    <li>FixedCost</li>
    <li>FixedCostAccrual</li>
    <li>FreeSlack</li>
    <li>HideBar</li>
    <li>Hyperlink</li>
    <li>HyperlinkAddress</li>
    <li>HyperlinkSubAddress</li>
    <li>ID</li>
    <li>IgnoreResourceCalendar</li>
    <li>IsNull</li>
    <li>IsSubproject</li>
    <li>IsSubprojectReadOnly</li>
    <li>LateFinish</li>
    <li>LateStart</li>
    <li>LevelAssignments</li>
    <li>LevelingCanSplit</li>
    <li>LevelingDelay</li>
    <li>LevelingDelayFormat</li>
    <li>Milestone</li>
    <li>Name</li>
    <li>Notes</li>
    <li>OutlineLevel</li>
    <li>OutlineNumber</li>
    <li>OverAllocated</li>
    <li>OvertimeCost</li>
</div>


<div class="myblock">
	<li>OvertimeWork</li>
    <li>PercentComplete</li>
    <li>PercentWorkComplete</li>
    <li>PhysicalPercentComplete</li>
    <li>PreLeveledFinish</li>
    <li>PreLeveledStart</li>
    <li>Priority</li>
    <li>Recurring</li>
    <li>RegularWork</li>
    <li>RemainingCost</li>
    <li>RemainingDuration</li>
    <li>RemainingOvertimeCost</li>
    <li>RemainingOvertimeWork</li>
    <li>RemainingWork</li>
    <li>Resume</li>
    <li>ResumeValid</li>
    <li>Rollup</li>
    <li>Start</li>
    <li>StartVariance</li>
    <li>Stop</li>
    <li>SubprojectName</li>
    <li>Summary</li>
    <li>TotalSlack</li>
    <li>Type</li>
    <li>WBS</li>
    <li>WBSLevel</li>
    <li>Work</li>
    <li>WorkVariance</li>
    <li>UID</li>
</div>

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
**http://gantt.scheduler-net.com/export/xmlToJson** or to 
**http://gantt.scheduler-net.com/export/mppToJson**.

~~~html
<form action="http://gantt.scheduler-net.com/export/mppToJson" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
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

To set an expected duration unit, the "duration_unit" (minute, hour, day, week, month, year) string can also be sent to the server.

~~~html
<form action="http://gantt.scheduler-net.com/export/mppToJson" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="text" name="duration_unit" value="hour" />
    <button type="submit">Get</button>
</form>
~~~

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
         	+ data.config.$custom_data.Author + " loaded!");

       	 } else {
            alert('An error occurred!');
     	 }
	};

	xhr.open('POST', 'http://gantt.scheduler-net.com/export/mppToJson', true);
	xhr.send(formData);
};
~~~

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