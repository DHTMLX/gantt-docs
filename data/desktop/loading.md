Data Loading 
=======================================

dhtmlxGantt can take data of 2 formats:


- [XML](desktop/supported_data_formats.md#xmldhtmlxgantt20);
- [JSON](desktop/supported_data_formats.md#json).

To populate a Gantt chart with data, use api/gantt_parse.md or api/gantt_load.md method.

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~

{{sample
	01_initialization/01_basic_init.html
}}

Loading from Object
-----------------------------------------

To load data from an object, use the api/gantt_parse.md method:

{{snippet
Loading from an inline data source
}}
~~~js
var data = {
  tasks:[
     {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(data); /*!*/   
~~~

{{sample
	01_initialization/01_basic_init.html
}}

{{note If your data objects contain both "start_date" and "end_date" values and date values contain only date part (i.e. 01-12-2021 and not 01-12-2021 00:00) - you may need extra configuration. Be sure to check this article [Task end date display & Inclusive end dates](desktop/loading.md#taskenddatedisplayampinclusiveenddates).}}

Loading from Server
---------------------------

###Client side

To load data from a server, use the api/gantt_load.md method:

{{snippet
gantt.html
}}
~~~js
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

The *load* method will send an AJAX request to the specified url and will expect a response with data in [one of the supported formats](desktop/supported_data_formats.md).
For example:

{{snippet
	data.json
}}
~~~js
{
  "tasks":[
     {"id":1, "text":"Project #1", "start_date":"01-04-2020", "duration":18},
     {"id":2, "text":"Task #1", "start_date":"02-04-2020","duration":8, "parent":1},
     {"id":3, "text":"Task #2", "start_date":"11-04-2020","duration":8, "parent":1}
  ],
  "links":[
     {"id":1, "source":1, "target":2, "type":"1"},
     {"id":2, "source":2, "target":3, "type":"0"}
  ]
}
~~~

The format is specified in the second argument of the method: "json", "xml" or "oldxml".

~~~js
gantt.load("data.xml", "xml");
~~~

###Server side

On the server you can have either a static file with data or a script that will collect data from the data source and write it to the response.
The server-side implementation depends on the framework you want to use. 

{{note See detailed instructions and code samples for various platforms in the article desktop/server_side.md#loadserverside.}}

For example, in case of Node.js we should add a server route for the URL where Gantt will send an AJAX request for data.

~~~js
gantt.load("/data"); 
~~~

It will generate a corresponding response in the JSON format. 

~~~js
app.get("/data", function(req, res){
    db.query("SELECT * FROM gantt_tasks", function(err, rows){
        if (err) console.log(err);
        db.query("SELECT * FROM gantt_links", function(err, links){
            if (err) console.log(err);
            for (var i = 0; i < rows.length; i++){
                rows[i].start_date = rows[i].start_date.format("YYYY-MM-DD");
                rows[i].open = true;
            }
 
            res.send({ tasks:rows, links : links });
        });
    });
});
~~~

{{note See all supported data formats in the article desktop/supported_data_formats.md.}} 


Loading Task Dates
---------------------

###Setting task schedule

There are three ways to define a schedule for a task in the data feed:

- start_date + duration
- start date + end_date
- duration + end_date

The property that is not specified will be calculated based on the ones that are defined in the data object.

{{sample
	01_initialization/18_backward_planning.html
}}

The **end_date** has a higher priority than the **duration** parameter. If there are 3 parameters specified in the task object, Gantt will ignore the **duration** parameter and the task will be loaded with a different duration value. For example:

~~~js
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":3, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}

// the task above will be loaded with the duration value calculated in accordance
// with the specified 'start_date' and 'end_date'
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":4, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}
~~~

## Task end date display & Inclusive end dates

This section will give you an answer to the question: "How to correctly save and display the end date of the task?".

Firstly, let's consider two possible scenarios you may face when working with task dates:

#### Scenario 1

- When task duration is measured in whole days (duration_unit="day")
- When task data objects contain start and end dates in the format of "%Y-%m-%d" or "%d-%m-%Y" (i.e. without hour-minute part)

Due to the details of how dhtmlxGantt interprets and stores end dates of tasks, the result dates may have values that are not expected.

Take a look at the following example:

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "22-12-2021",
        end_date: "22-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 22 December 2021 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

In this example, both start and end dates will refer to the same point of time and the task duration will be 0.

#### Scenario 2

- When the End Date of a task is displayed in the Grid
- And the format of the end date doesn't include the hour-minute part

~~~js
gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", resize: true},
    {name: "end_date", label: "Finish", width:80, align: "center", resize: true}
];

gantt.init("gantt_here");

gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "02-04-2020",
        end_date: "02-04-2020"
    }
]}, links:[]);
~~~

In this example, the Finish date (end_date of the task) is specified as April 3, while the task itself ends at the end of April 2.

![](desktop/end_date.png)

We will explain the details on how Gantt stores end dates below.

### **How does Gantt stores end dates?**

Even if you don't specify the hour-minute part for the task date (duration_unit = "day"), dhtmlxGantt always saves it as JS Date, which has the hour-minute-second-millisecond part, on the client side. 

The current format of the end dates is the following:

- the second and millisecond parts of the date is always 0, Gantt does not support units less than 1 minute
- the end date of the task is specified as beginning of the day ("day-hour-minute") following the last busy day ("day-hour-minute"). That is:
  - *the task that starts on the 2nd of April and lasts for 1 day* will have the following start and end dates: *"02-04-2022 00:00:00 - 03-04-2022 00:00:00"*. The end date will match the date of the beginning of the day following the 2nd of April
  - *the task which starts on the 2nd of April at 13:00 and lasts for 1 day* will have the following start and end dates: *"02-04-2022 13:00:00 - 02-04-2022 13:00:00"*. The end date will match the date of the beginning of the next hour

If we show the end date of the task on the screen without setting an hour-minute part, the result may be misleading. In the example from **scenario 2**, the start and end dates will look like "02-04-2022 - 03-04-2022". This will make you think that the task lasts not 1 day but 2 (from the 2nd to the 3rd of April).

This is the default behavior and it may confuse you but there is the ability to fix it via configuration. In the following part we will show you several ways on how you can deal with it.

### **How to change the default behavior?**

**1\)** The first thing you *should not do* is to change the actual task dates which are stored in the gantt.

You may also want to modify the task dates which are loaded into the gantt, i.e. to specify end dates as 02-04-2022 23:59:59. But *you'd better not do this* because such decision may conflict with the calculation of the duration of tasks and auto-scheduling.

**Instead, we recommend that you use the following methods:**

**2a\)** To change the format of the end dates of tasks in the gantt (i.e. to include the end date in the duration of the tasks), you can redefine the [task_end_date](api/gantt_task_end_date_template.md)
template.

Let's take a task that starts on April 2nd, 2020 and lasts for one day and consider how the template can change the end date.

By default, the end date of this task should be displayed as April 3rd, 2020 (`03-04-2020 00:00:00`):

- [Live demo: Default format](https://snippet.dhtmlx.com/5/24f73d6ec)

<img  src="api/task_end_date_template_default.png"/>

But if you apply the [task_end_date](api/gantt_task_end_date_template.md)
template, the same task will be finished on April 2nd, 2020:

- [Live demo: Inclusive end date format](https://snippet.dhtmlx.com/5/f2c801d3d)

<img  src="api/task_end_date_template.png"/>

The code looks like:

~~~js
// override the columns config
gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true}, 
  {name:"add"}
];

// redefine the template
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
 
var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");
~~~

This way lets you change the task end date shown in the grid, header of the lightbox, and any other places where you need to show the end date.

If you are using the [format for inclusive end dates](api/gantt_task_end_date_template.md) of tasks and want to make it work correctly with [inline editing](desktop/inline_editing.md) in the grid, you have to create a special editor for editing inclusive end dates of tasks, as in:

~~~js
// inclusive editor for end dates
// use the default editor, but override the set_value/get_value methods
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
    set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
    },
    get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
    },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// change lightbox and grid templates to display dates of tasks in an inclusive format
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~

{{editor	https://snippet.dhtmlx.com/5/b9a3d78bc	Inclusive end date editor}}

**2b\)** If other parts of the application require the end dates to be stored in the "inclusive" format -  *i.e. a task that starts on April 2nd, 2020 and lasts for one day needs to be stored with the start_date: "02-04-2022", end_date: "02-04-2022"* - you have to implement additional processing of the end dates, namely:

- to add one day to the end dates before loading data into the gantt
- to subtract one day from the end dates before saving the changes received from the gantt back to the data storage

Data Properties
-------------------------

A data source for the Gantt chart is an object that stores 2 types of information:

- **tasks** - the items of tasks.
- **links** - the items of dependency links.


<h3 id="task_properties">Properties of a task object</h3>

<ul>
	<li><b><i>Mandatory properties</i></b> - these properties will always be defined on the client, 
    they must be provided by the datasource in order for gantt to operate correctly. 
    </li>
	<ul>
			<li><b>text</b> - (<i> string </i>) the task text.</li>
			<li><b>start_date</b> -  (<i> Date|string </i>) the date when a task is scheduled to begin. 
            Must match api/gantt_date_format_config.md format if provided as a string. </li>
			<li><b>duration</b> - (<i> number </i>) the task duration.  <a href="desktop/loading.md#loadingtaskdates">Can be replaced with the 'end_date' property</a>.</li>
			<li><b>id</b> -  (<i> string|number </i>) the task id.</li>
	</ul>
	<li><b><i>Optional properties</i></b> - these properties may or may not be defined.
    The default logic and templates of gantt will use these properties if they are defined.
    </li>
	<ul>
    		<li><b>type</b> - (<i>string</i>) the task type. The available values are stored in the api/gantt_types_config.md object:</li>
            <ul>
				<li><a href="desktop/task_types.md#regulartasks">"task"</a> -  a regular task (<i>default value</i>).</li>
				<li><a href="desktop/task_types.md#projecttasks">"project"</a> -  a task that starts, when its earliest child task starts, and ends, when its latest child ends. 
                <i>The <b>start_date</b>, <b>end_date</b>, <b>duration</b> properties are ignored for such tasks.</i> 
               	</li>
				<li><a href="desktop/task_types.md#milestones">"milestone"</a> -  a zero-duration task that is used to mark out important dates of the project.
                 <i>The <b>duration</b>, <b>progress</b>, <b>end_date</b> properties are ignored for such tasks. </i></li>
			</ul>
			<li><b>parent</b> - (<i> string|number </i>) the id of the parent task. The id of the root task is specified by the api/gantt_root_id_config.md config.</li>            
			<li><b>progress</b> -  (<i> number from 0 to 1 </i>) the task progress.</li>
			<li><b>open</b> - (<i> boolean </i>) specifies whether the task branch will be opened initially (to show child tasks).</li>
            <li><b>end_date</b> - (<i> Date|string </i>) the date when a task is scheduled to be completed. 
            Used as an alternative to the <i>duration</i> property for setting the duration of a task.
            Must match api/gantt_date_format_config.md format if provided as a string. 
            </li>  
             <li><b>row_height</b> - (<i> number </i>) sets the default height for rows of the table 
            </li>
            <li><b>bar_height</b> - (<i> number,string </i>) sets the height of task bars in the timeline area
            </li>
            <li><b>readonly</b>-(<i>boolean</i>) can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">readonly</a>. </li>
        	<li><b>editable</b>-(<i>boolean</i>) can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">editable</a>. </li>
        	<li><b>rollup</b>-(<i>boolean</i>) specifies whether a task (type:"task") or milestone (type:"milestone")  <a href="desktop/milestones.md#rolluptasksandmilestones">should appear on the parent projects</a>. </li>
        	<li><b>hide_bar</b>-(<i>boolean</i>) defines whether a task (type:"task") or milestone (type:"milestone") <a href="desktop/milestones.md#hidingtasksandmilestones">should be hidden in the timeline area</a>. </li>
    </ul>
    <li><b><i>Dynamic properties</i></b> - are created on the client and represent the current state of a task or a link.
    They shouldn't be saved to the database, gantt will ignore these properties if they are specified in your JSON/XML.
    </li>
    <ul>
    		<li><b>$source</b> - (<i> array </i>) <a href="desktop/link_object_operations.md#gettingthelinksrelatedtoacertaintask">ids of links that come out of the task.</a></li>
			<li><b>$target</b> -  (<i> array </i>) <a href="desktop/link_object_operations.md#gettingthelinksrelatedtoacertaintask">ids of links that come into task.</a></li>
            <li><b>$level</b> - (<i> number </i>) the task's level in the tasks hierarchy (zero-based numbering).</li>
            <li><b>$open</b> - (<i> boolean </i>) specifies whether the task is currently opened.</li>
            <li><b>$index</b> - (<i> number </i>) the number of the task row in the gantt.</li>
    </ul>
</ul>
	


The default date format for JSON and XML data is **"%d-%m-%Y %H:%i"** (see the <a href="desktop/date_format.md"> date format specification</a>).<br>
To change it, use the api/gantt_date_format_config.md configuration option.

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

Once loaded into Gantt, the **start_date** and **end_date** properties will be parsed into the Date type. 

Date formats that are not supported by the api/gantt_date_format_config.md config can be parsed manually via the api/gantt_parse_date_template.md template.

<h3 id="link_properties">Properties of a link object</h3>

<ul>
	<li><b><i>Mandatory properties</i></b></li>
	<ul>
			<li><b>id</b> -  (<i> string|number </i>) the link id.</li>
			<li><b>source</b> - (<i> number </i>) the id of a task that the dependency will start from.</li>
			<li><b>target</b> -  (<i> number </i>) the id of a task that the dependency will end with.</li>
			<li><b>type</b> - (<i>string</i>) the dependency type. The available values are stored in the api/gantt_links_config.md object. By default, they are:</li>
            <ul>
				<li><b>"0"</b> -  'finish_to_start'.</li>
				<li><b>"1"</b> -  'start_to_start'.</li>
				<li><b>"2"</b> -  'finish_to_finish'.</li>
                <li><b>"3"</b> -  'start_to_finish'.</li>
			</ul>
            If you want to store the dependency types in some way other than the default values('0','1','2'), you may change values of the related properties of the api/gantt_links_config.md object. For example:
~~~js
gantt.config.links.start_to_start = "start2start";
~~~
Note, these values affect only the way the dependency type is stored, not the behaviour of visualization. 
	</ul>
	<li><b><i>Optional properties</i></b></li>
	<ul>
			<li><b>lag</b>-(<i>number</i>) optional, <a href="desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks">task lag</a>. </li>
        	<li><b>readonly</b>-(<i>boolean</i>) optional, can mark link as <a href="desktop/readonly_mode.md">readonly</a>. </li>
        	<li><b>editable</b>-(<i>boolean</i>) optional, can mark link as <a href="desktop/readonly_mode.md">editable</a>. </li>
	</ul>
</ul>

###Custom properties

You are not limited to the mandatory properties listed above and can add any custom ones to data items. 
Extra data properties will be parsed as strings and loaded to the client side where you can use them according to your needs.

See examples of data with custom properties <a href="desktop/supported_data_formats.md##custompropertiesindata">here</a>.


Database Structure
------------------------------------------

If you use a database, we recommend to have 2 separate tables to store data: one for tasks and one for links.  

<img src="desktop/tutorial_db_tables.png"/>

The structure of a standard database to load tasks and links to the Gantt chart is:

<ul>
	<li><b>gantt_tasks</b> table - specifies the gantt tasks</li>
    <ul>
    	<li><b>id</b> - (<i>string,number</i>) the event id.</li>
        <li><b>start_date</b> - (<i>Date</i>) the date when a task is scheduled to begin.  </li>
        <li><b>text</b> - (<i>string</i>) the task's description.</li>
        <li><b>progress</b> - (<i>number</i>) a number from 0 to 1 that shows what percent of the task is complete. </li>
        <li><b>duration</b> - (<i>number</i>) the task duration in the units of the current time scale. </li>
        <li><b>parent</b> - (<i>number</i>) the id of the parent task. </li>
        <li><b>type</b> - (<i>string</i>) optional, the <a href="desktop/task_types.md">type</a> of the task. </li>
        <li><b>readonly</b> - (<i>boolean</i>) optional, can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">readonly</a>. </li>
        <li><b>editable</b> - (<i>boolean</i>) optional, can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">editable</a>. </li>
    </ul>
	<li><b>gantt_links</b> table - specifies the gantt dependency links</li>
    <ul>
    	<li><b>id</b> - (<i>string,number</i>) the event id.</li>
        <li><b>source</b> - (<i>number</i>) the id of the source task. </li>
        <li><b>target</b> - (<i>number</i>) the id of the target task. </li>
        <li><b>type</b> - (<i>string</i>) the type of the dependency:
        	<ul>
            	<li>0 - 'finish_to_start'</li>
            	<li>1 - 'start_to_start'</li> 
            	<li>2 - 'finish_to_finish'</li>
            	<li>3 - 'start_to_finish'</li>
            </ul> 
        </li> 
        <li><b>lag</b> - (<i>number</i>) optional, <a href="desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks">task lag</a>. </li>
        <li><b>readonly</b> - (<i>boolean</i>) optional, can mark link as <a href="desktop/readonly_mode.md">readonly</a>. </li>
        <li><b>editable</b> - (<i>boolean</i>) optional, can mark link as <a href="desktop/readonly_mode.md">editable</a>. </li>
    </ul>
</ul> 

Use the following SQL statement to create a database with 2 mentioned tables:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
)
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `sortorder` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~



Events Flow
--------------------------------------

Loading-related methods have the following events flow:


### [gantt.parse()](api/gantt_parse.md):

- event api/gantt_onbeforeparse_event.md 
- event api/gantt_ontaskloading_event.md 
- event api/gantt_onparse_event.md  
- [gantt.render()](api/gantt_render.md)

### [gantt.load()](api/gantt_load.md)

- event api/gantt_onloadstart_event.md 
- [gantt.parse()](api/gantt_parse.md)
- event api/gantt_onloadend_event.md 

### [gantt.refreshData()](api/gantt_refreshdata.md):

- event api/gantt_onbeforedatarender_event.md 
- event api/gantt_onbeforetaskdisplay_event.md 
- event api/gantt_ondatarender_event.md 

### [gantt.render()](api/gantt_render.md):

- event api/gantt_onbeforeganttrender_event.md 
- [gantt.refreshData()](api/gantt_refreshdata.md)
- event api/gantt_onganttrender_event.md 

