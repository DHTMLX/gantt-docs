Loading Data
=======================================

dhtmlxGantt can take data of 2 formats:


- [XML](desktop/loading.md#xmlgantt20plus);
- [JSON](desktop/loading.md#jsonformat).

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
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1", start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2013", duration:8, parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks); /*!*/   
~~~

{{sample
	01_initialization/01_basic_init.html
}}

Loading from Server
---------------------------

###Client side

To load data from a server, use the api/gantt_load.md method:

{{snippet
gantt.html
}}
~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); /*!*/   
~~~

The *load* method will send an AJAX request to the specified url and will expect a response with data in 
[one of the supported formats](desktop/loading.md#supporteddataformats).
For example:

{{snippet
	tasks.json
}}
~~~js
{
  "data":[
     {"id":1, "text":"Project #1", "start_date":"01-04-2013", "duration":18},
     {"id":2, "text":"Task #1", "start_date":"02-04-2013","duration":8, "parent":1},
     {"id":3, "text":"Task #2", "start_date":"11-04-2013","duration":8, "parent":1}
  ],
  "links":[
     {"id":1, "source":1, "target":2, "type":"1"},
     {"id":2, "source":2, "target":3, "type":"0"}
  ]
}
~~~

The format is specified in the second argument of the method: "json", "xml" or "oldxml".

~~~js
gantt.load("tasks.xml", "xml");
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
 
            res.send({ data:rows, collections: { links : links } });
        });
    });
});
~~~

{{note See all supported data formats in the article desktop/loading.md#supporteddataformats.}} 


Loading Task Dates
---------------------

There are three ways to define task schedule in the data feed:

- start_date + duration
- start date + end_date
- duration + end_date

The property that is not specified will be calculated based on the ones that are defined in the data object.

{{sample
	01_initialization/18_backward_planning.html
}}

Specifying Data Properties
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
            Must match api/gantt_xml_date_config.md format if provided as a string. </li>
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
            Must match api/gantt_xml_date_config.md format if provided as a string. 
            </li>  
            <li><b>readonly</b>-(<i>boolean</i>) optional, can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">readonly</a>. </li>
        	<li><b>editable</b>-(<i>boolean</i>) optional, can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">editable</a>. </li>
    </ul>
    <li><b><i>Dynamic properties</i></b> - are created on the client and represent the current state of a task or a link.
    They shouldn't be saved to the database, gantt will ignore these properties if they are specified in your JSON/XML.
    </li>
    <ul>
    		<li><b>$source</b> - (<i> array </i>) ids of links that come out of the task.</li>
			<li><b>$target</b> -  (<i> array </i>) ids of links that come into task.</li>
            <li><b>$level</b> - (<i> number </i>) the task's level in the tasks hierarchy (zero-based numbering).</li>
            <li><b>$open</b> - (<i> boolean </i>) specifies whether the task is currently opened.</li>
            <li><b>$index</b> - (<i> number </i>) the number of the task row in the gantt.</li>
    </ul>
</ul>
	


The default date format for JSON and XML data is **"%d-%m-%Y %H:%i"** (see the <a href="desktop/date_format.md"> date format specification</a>).<br>
To change it, use the api/gantt_xml_date_config.md configuration option.

~~~js
gantt.config.xml_date="%Y-%m-%d";
gantt.init("gantt_here");
~~~

Once loaded into Gantt, the **start_date** and **end_date** properties will be parsed into the Date type. 

Date formats that are not supported by the api/gantt_xml_date_config.md config can be parsed manually via the api/gantt_xml_date_template.md template.

<h3 id="link_properties">Properties of a link object</h3>

<ul>
	<li><b><i>Mandatory properties</i></b></li>
	<ul>
			<li><b>id</b> -  (<i> string|number </i>) the link id.</li>
			<li><b>source</b> - (<i> number </i>) the id of a task that the dependency will start from.</li>
			<li><b>target</b> -  (<i> number </i>) the id of a task that the dependency will end with.</li>
			<li><b>type</b> - (<i>string</i>) the dependency type. The available values are stored in the api/gantt_links_config.md object. By default, they are:</li>
            <ul>
				<li><b>"0"</b> -  'finish to start'.</li>
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

See examples of data with custom properties <a href="desktop/loading.md#customdataproperties">here</a>.


Standard Database Structure
------------------------------------------

If you use a database, we recommend to have 2 separate tables to store data: one for tasks and one for links.  

<img src="desktop/tutorial_db_tables.png"/>

The structure of a standard database to load tasks and links to the Gantt chart is:

<ul>
	<li><b>gantt_tasks</b> table - specifies the gantt tasks</li>
    <ul>
    	<li><b>id</b> - (<i>string|number</i>) the event id.</li>
        <li><b>start_date</b> - (<i>Date</i>) the date when a task is scheduled to begin.  </li>
        <li><b>text</b> - (<i>string</i>) the task's description.</li>
        <li><b>progress</b> - (<i>number</i>) a number from 0 to 1 that shows what percent of the task is complete. </li>
        <li><b>duration</b> - (<i>number</i>) the task duration in the units of the current time scale. </li>
        <li><b>parent</b> - (<i>number</i>) the id of the parent task. </li>
        <li><b>type</b> - (<i>string</i>) optional, the <a href="desktop/task_types.md">type</a> of the task. </li>
        <li><b>readonly</b>-(<i>boolean</i>) optional, can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">readonly</a>. </li>
        <li><b>editable</b>-(<i>boolean</i>) optional, can mark task as <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">editable</a>. </li>
    </ul>
	<li><b>gantt_links</b> table - specifies the gantt dependency links</li>
    <ul>
    	<li><b>id</b>-(<i>string|number</i>) the event id.</li>
        <li><b>source</b>-(<i>number</i>) the id of the source task. </li>
        <li><b>target</b>-(<i>number</i>) the id of the target task. </li>
        <li><b>type</b>-(<i>string</i>) the type of the dependency:
        	<ul>
            	<li>0 - 'finish to start'</li>
            	<li>1 - 'start to start'</li> 
            	<li>2 - 'finish to finish'</li>
            	<li>3 - 'start to finish'</li>
            </ul> 
        </li> 
        <li><b>lag</b>-(<i>number</i>) optional, <a href="desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks">task lag</a>. </li>
        <li><b>readonly</b>-(<i>boolean</i>) optional, can mark link as <a href="desktop/readonly_mode.md">readonly</a>. </li>
        <li><b>editable</b>-(<i>boolean</i>) optional, can mark link as <a href="desktop/readonly_mode.md">editable</a>. </li>
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


Dynamic Loading (on demand)
----------------------

{{pronote This feature is available in the PRO version.}}


By default, dhtmlxGantt loads all data at once. It may become problematic when you have a big number of tasks.

In such situation you may use the dynamic loading mode and load data by branches (sub-projects), level by level as the user opens them. 


To enable the dynamic loading in the Gantt chart you need to deal with both the client- and the server-side.

<ul>
	<li>Client-side (use the api/gantt_branch_loading_config.md option):
~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.init("gantt_here");
gantt.config.branch_loading = true;
		
gantt.load("../common/connector_dynamic_loading.php");

var dp = new gantt.dataProcessor("../common/connector_dynamic_loading.php");
dp.init(gantt);
~~~
	</li>
    <li>Server-side:
~~~php
<?php

include ('config.php');

$gantt = new JSONGanttConnector($res, $dbtype);

$parent_id = isset($_GET["parent_id"]) ? $_GET["parent_id"] : 0;

$gantt->mix("open", 0);
$gantt->mix("deep", 1);

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table(
	"gantt_tasks",
    "id",
    "start_date,duration,text,progress,parent",
    "", 
    "parent"
);
~~~
	</li>
</ul>
{{sample
02_extensions/06_dynamic_loading.html
}}

<br>

Generally, the client-side has no information about children of the displayed data items (as such children were not loaded from the server-side). 

To pass this information, you can use a special data property '$has_children' (the name is mandatory) that indicates the number of the child elements for the task.

~~~php
function check_children($row){
    global $gantt;
    $task_id = $row->get_value('id');
    $sql = "SELECT COUNT(id) AS has_children FROM gantt_tasks WHERE parent='{$task_id}'";
    $children = $gantt->sql->query($sql);
    
    $child = $gantt->sql->get_next($children);
    $children_qty = $child['has_children'];

    $row->set_userdata('$has_child',$children_qty);
}
$gantt->event->attach("beforeRender","check_children");
~~~

{{sample
02_extensions/06_dynamic_loading.html
}}


###Data format for dynamic loading


The format of data for dynamic loading is the following:

~~~js
{
	"data":[
	{
		"id":13,
		"start_date":"2013-04-02 00:00:00",
		"duration":10,
		"text":"Task #1",
		"progress":0.2,
		"parent":12,
		"open":0,
		"$has_child":0
	},
	{
		"id":14,
		"start_date":"2013-04-04 00:00:00",
		"duration":4,
		"text":"Task #2",
		"progress":0.9,
		"parent":12,
		"open":0,
		"$has_child":4
	}],

	"links":[
		{"id":1,"source":1,"target":2,"type":"0"},
		{"id":2,"source":1,"target":3,"type":"0"},
		{"id":3,"source":1,"target":4,"type":"0"}
	]

}
~~~

As you can see, it's the same JSON as the one used for regular data loading. To compare, check the desktop/loading.md#supporteddataformats article.

The only difference is the *$has_child* property which indicates whether a task will be displayed as a 'leaf' item (without the 'expand' toggle) or as an expandable node:

- if the *$has_child* property is specified and contains a ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value (a non-zero number, true, a non-empty string, etc.),
the item will be displayed with the expand/collapse toggle. On expanding the toggle, an ajax request will be sent to the server;
- if *$has_child* is not specified or contains a ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value (zero, false, NaN, undefined, empty string, null),
the item will be displayed without toggle, as a task which has no child items.

If the request has the *parent_id* parameter, the response must contain children of the task with the specified id. If *parent_id* is not specified, the request must contain root level tasks:

<table class="dp_table">
	<tr>
    	<th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
    </tr>
	<tr>
    	<td>load root level</td>
		<td>GET</td>
        <td>/loadUrl</td>
        <td><a href="#dynamicloadingformatofdata">Dynamic loading format</a></td>
	</tr>
    <tr>
		<td>load children on the task</td>
		<td>GET</td>
        <td>/loadUrl?parent_id=id</td>
        <td><a href="#dynamicloadingformatofdata">Dynamic loading format</a></td>
    </tr>

</table>
   
Supported Data Formats
---------------------------------

dhtmlxGantt can load data in the following formats:

1. [JSON](desktop/loading.md#jsonformat);
2. [XML (dhtmlxGantt 2.0+)](desktop/loading.md#xmlgantt20plus).
3. [JSON with Collections](desktop/loading.md#jsoncollections)
4. [XML (dhtmlxGantt < 2.0)](desktop/loading.md#xmlganttlessthan20)

All possible data properties are described in the section [Specifying Data Properties](desktop/loading.md#specifyingdataproperties).
You can also [add any custom properties to the Gantt data](desktop/loading.md#customdataproperties).


<h3 id="jsonformat">JSON</h3>

~~~js
{
	"data":[
		{"id":1, "text":"Project #2", "start_date":"01-04-2013", "duration":18, 
    		"progress":0.4, "open": true},
		{"id":2, "text":"Task #1", 	  "start_date":"02-04-2013", "duration":8, 
    		"progress":0.6, "parent":1},
		{"id":3, "text":"Task #2",    "start_date":"11-04-2013", "duration":8, 
    		"progress":0.6, "parent":1}
  	],
  	"links":[
  		{ "id":1, "source":1, "target":2, "type":"1"},
    	{ "id":2, "source":2, "target":3, "type":"0"},
		{ "id":3, "source":3, "target":4, "type":"0"},
		{ "id":4, "source":2, "target":5, "type":"2"},
   ]
}
~~~

<h3 id="xmlgantt20plus">XML (dhtmlxGantt 2.0+)</h3>


~~~xml
<data>
	<task id='1' parent='' start_date='01-04-2013' duration='18' open='true' 
    		progress='0.4' end_date='19-04-2013'>
    	<![CDATA[Project #2]]>
    </task>
    <task id='2' parent='1' start_date='02-04-2013' duration='8' progress='0.6' 
    		end_date='10-04-2013'>
    	<![CDATA[Task #1]]>
    </task>
    <task id='3' parent='1' start_date='11-04-2013' duration='8' progress='0.6' 
    		end_date='19-04-2013'>
    	<![CDATA[Task #2]]>
    </task>
    <coll_options for='links'>
    	<item id='1' source='1' target='2' type='1' />
        <item id='2' source='2' target='3' type='0' />
        <item id='3' source='3' target='4' type='0' />
        <item id='4' source='2' target='5' type='2' />
    </coll_options>
</data>
~~~

<h3 id="customdataproperties">Custom Properties in Data</h3>


Let's consider the above examples with 2 custom properties: 

- **priority** - the priority of the task.
- **holder**  - the name of the person assigned to the task.

####JSON

~~~js
{
	"data":[
		{"id":1, "text":"Project #2", "start_date":"01-04-2013", "duration":18, 
    		"progress":0.4, "open": true, "holder":"Mike", "priority":"High"},
		{"id":2, "text":"Task #1", 	  "start_date":"02-04-2013", "duration":8, 
    		"progress":0.6, "parent":1, "holder":"John", "priority":"Medium"},
		{"id":3, "text":"Task #2",    "start_date":"11-04-2013", "duration":8, 
    		"progress":0.6, "parent":1, "holder":"Alex", "priority":"Low"}
  	],
  	"links":[
  		{ "id":1, "source":1, "target":2, "type":"1"},
    	{ "id":2, "source":2, "target":3, "type":"0"},
		{ "id":3, "source":3, "target":4, "type":"0"},
		{ "id":4, "source":2, "target":5, "type":"2"},
   ]
}
~~~

####XML (dhtmlxGantt 2.0+)

~~~xml
<data>
	<task id='1' parent='' start_date='01-04-2013' duration='18' open='true' 
    		progress='0.4' end_date='19-04-2013''>
    	<holder><![CDATA[Mike]]></holder>
        <priority><![CDATA[High]]></priority>
    	<![CDATA[Project #2]]>
    </task>
    <task id='2' parent='1' start_date='02-04-2013' duration='8' progress='0.6'  
    	end_date='10-04-2013'>
    	<holder><![CDATA[John]]></holder>
        <priority><![CDATA[Medium]]></priority>
        <![CDATA[Task #1]]>
    </task>
    <task id='3' parent='1' start_date='11-04-2013' duration='8' progress='0.6' 
    	end_date='19-04-2013'>
    	<holder><![CDATA[Alex]]></holder>
        <priority><![CDATA[Low]]></priority>
        <![CDATA[Task #2]]>
    </task>
    <coll_options for='links'>
    	<item id='1' source='1' target='2' type='1' />
        <item id='2' source='2' target='3' type='0' />
        <item id='3' source='3' target='4' type='0' />
        <item id='4' source='2' target='5' type='2' />
    </coll_options>
</data>

~~~


<h3 id="jsoncollections">JSON with Collections</h3>


JSON data can contain any number of additional arrays in the "collections" property of the *data* object.

~~~js
{
	"data":[
		{"id":1, "text":"Project #2", "start_date":"01-04-2013", "duration":18, 
    		"progress":0.4, "open": true},
		{"id":2, "text":"Task #1", 	  "start_date":"02-04-2013", "duration":8, 
    		"progress":0.6, "parent":1},
		{"id":3, "text":"Task #2",    "start_date":"11-04-2013", "duration":8, 
    		"progress":0.6, "parent":1}
  	],
  	"links":[
  		{ "id":1, "source":1, "target":2, "type":"1"},
    	{ "id":2, "source":2, "target":3, "type":"0"},
		{ "id":3, "source":3, "target":4, "type":"0"},
		{ "id":4, "source":2, "target":5, "type":"2"},
    ],
	"collections": { /*!*/
		"sections":[
			{"value":"1","label":"Simple"},
			{"value":"2","label":"Complex"},
			{"value":"3","label":"Unknown"}
		]
	}
}
~~~

The applied collections can be accessed by their names with the help of the [gantt.serverList](api/gantt_serverlist.md) method.

<h3 id="xmlganttlessthan20">XML (dhtmlxGantt < 2.0)</h3>


~~~js
<?xml version="1.0" encoding="UTF-8"?>
<projects>
  <project id="1" name="project1" startdate="2006,12,14">
     <task id="1">
  	<name>project1 task1</name>
	<est>2006,12,14</est>
	<duration>120</duration>
    	<percentcompleted>60</percentcompleted>
	<predecessortasks></predecessortasks>
            <childtasks>
                  <task id="2">
                    <name>project1 task2</name>
              	    <est>2006,12,14</est>
        	    <duration>100</duration>
    	            <percentcompleted>20</percentcompleted>
        	    <predecessortasks></predecessortasks>
                    <childtasks></childtasks>
        	  </task>
                  <task id="6">
            	    <name>project1 task6</name>
	            <est>2006,12,15</est>
            	    <duration>90</duration>
        	    <percentcompleted>10</percentcompleted>
        	    <predecessortasks>2</predecessortasks>
                    <childtasks></childtasks>
                  </task>
            </childtasks>
     </task>
  </project>
  <project id="2" name="project2" startdate="2006,12,20">
     <task id="12">
	<name>project2 task12</name>
	<est>2006,12,20</est>
	<duration>140</duration>
	<percentcompleted>60</percentcompleted>
	<predecessortasks></predecessortasks>
        <childtasks>
            <task id="14">
	        <name>project2 task14</name>
       		<est>2006,12,20</est>
       		<duration>100</duration>
	        <percentcompleted>20</percentcompleted>
       		<predecessortasks></predecessortasks>
                <childtasks></childtasks>
        	</task>
        </childtasks>
     </task>
  </project>
</projects>
~~~


   
   
@todo:
replace backend instruction in dyn. loading with format details 