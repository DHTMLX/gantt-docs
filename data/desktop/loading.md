Loading Data
=======================================
dhtmlxGantt can take data of 2 formats:


- [XML](desktop/supported_data_formats.md#xml);
- [JSON](desktop/supported_data_formats.md#json).

To populate a Gantt chart with data, use api/gantt_parse.md or api/gantt_load.md method.

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~

{{sample
	01_initialization/01_basic_init.html
}}


Specifying data properties
-------------------------
A data source for the Gantt chart is an object that stores 2 types of information:

- **tasks** - the items of tasks.
- **links** - the items of dependency links.

If you use a database, we recommend to have 2 separate tables to store data: one for tasks and one for links.  

<h3 id="task_properties">Properties of a task object</h3>


<ul>
	<li><b><i>Mandatory properties</i></b></li>
	<ul>
			<li><b>text</b> - (<i> string </i>) the task text.</li>
			<li><b>start_date</b> -  (<i> string </i>) the date when a task is scheduled to begin.</li>
			<li><b>duration</b> - (<i> number </i>) the task duration.</li>
			<li><b>id</b> -  (<i> string, number </i>) the task id.</li>
	</ul>
	<li><b><i>Optional properties</i></b></li>
	<ul>
    		<li><b>type</b> - (<i>string</i>) the task type. The available values are stored in the api/gantt_types_config.md object: </i></li>
            <ul>
				<li><a href="desktop/task_types.md#regulartasks">"task"</a> -  a regular task (<i>default value</i>).</li>
				<li><a href="desktop/task_types.md#projecttasks">"project"</a> -  a task that starts, when its earliest child task starts, and ends, when its latest child ends. 
                <i>The <b>start_date</b>, <b>end_date</b>, <b>duration</b> properties are ignored for such tasks.</i> 
               	</li>
				<li><a href="desktop/task_types.md#milestones">"milestone"</a> -  a zero-duration task that is used to mark out important dates of the project.
                 <i>The <b>duration</b>, <b>progress</b>, <b>end_date</b> properties are ignored for such tasks. </i></li>
			</ul>
			<li><b>parent</b> - (<i> string, number </i>) the id of the parent task. The id of the root task is specified by the api/gantt_root_id_config.md config.</li>
            <li><b>source</b> - (<i> array </i>) ids of links that comes out from the task.</li>
			<li><b>target</b> -  (<i> array </i>) ids of links that comes into task.</li>
            <li><b>level</b> - (<i> number </i>) the task's level in the tasks hierarchy (zero-based numbering).</li>
			<li><b>progress</b> -  (<i> number from 0 to 1 </i>) the task progress.</li>
			<li><b>open</b> - (<i> boolean </i>) specifies whether the task branch will be opened initially (to show child tasks).</li>
            <li><b>end_date</b> - (<i> string </i>) the date when a task is scheduled to be completed. Used as an alternative to the <b>duration</b> property for setting the duration of a task.</li>

	</ul>
</ul>


The default date format for JSON and XML data is **"%d-%m-%Y"** (see the <a href="desktop/date_format.md"> date format specification</a>).<br>
To change it, use the api/gantt_xml_date_config.md configuration option.

~~~js
gantt.config.xml_date="%Y-%m-%d";
gantt.init("gantt_here");
~~~

<h3 id="link_properties">Properties of a link object</h3>

<ul>
	<li><b><i>Mandatory properties</i></b></li>
	<ul>
			<li><b>id</b> -  (<i> string, number </i>) the link id.</li>
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
Note, these values affect only how the dependency type is stored, not the behaviour of visualisation. 
	</ul>
</ul>

###Custom properties
You are not limited to the mandatory properties listed above and can add any custom ones to data items. 
Extra data properties will be parsed as strings and loaded to the client side where you can use them according to your needs.

See examples of data with custom properties <a href="desktop/supported_data_formats.md#addingcustompropertiestothedata">here</a>.

Loading task dates
---------------------

There are three ways to define task schedule in the data feed:

- start_date + duration
- start date + end_date
- duration + end_date

The property that is not specified will be calculated based on the ones that are defined in the data object.

{{sample
	01_initialization/18_backward_planning.html
}}

Loading from an inline data source
-----------------------------------------
To load data from an inline data source, use the api/gantt_parse.md method:

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

Loading from a file
---------------------------
To load data from a file, use the api/gantt_load.md method:

{{snippet
	tasks.json
}}
~~~js
{
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2013",duration:8, parent:1}
  ],
  links:[
     {id:1, source:1, target:2, type:"1"},
     {id:2, source:2, target:3, type:"0"}
  ]
}
~~~

{{snippet
gantt.html
}}
~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); /*!*/   
~~~

If you load data of the XML format, specify the 2nd parameter in the api/gantt_load.md method:

~~~js
gantt.load("tasks.xml", "xml");
~~~


Loading from a database
-------------------------
There are two ways to load data from a database. In both cases, you need to deal with both the client and the server side.

1) The first way includes the usage of REST API for communication with server.

 - The server-side implementation depends on the framework you want to use. 
For example, in case of Node.js we should add a server route for the URL to which Gantt will send an AJAX request for data.

It will generate the corresponding response in JSON format. 

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

- On the client side we will use the api/gantt_load.md method and specify the necessary URL where an AJAX request for Gantt data will be sent:

{{snippet
Loading from a database. Client-side code
}}
~~~js
gantt.init("gantt_here");
gantt.load("apiUrl"); /*!*/  
~~~

You can find URL details in the article desktop/server_side.md#requestresponsedetails.

2) The second way implies the usage of the [PHP Connector](http://docs.dhtmlx.com/connector__php__index.html) for loading data into Gantt.

-  On the server-side, realize the server script that returns data in the XML or JSON format:
    

{{snippet
Loading from a database. Server-side code (data.php)
}}
~~~php
<?php
include ("./config.php");

$gantt = new JSONGanttConnector($conn);
$gantt->render_links("gantt_links","id","source,target,type");    
$gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,
					sortorder,parent");
?>
~~~

- On the client side, use the api/gantt_load.md method where specify the path to the server-side script:

{{snippet
Loading from a database. Client-side code
}}
~~~js
gantt.init("gantt_here");
gantt.load("data.php"); /*!*/  
~~~
	
Read more on the server-side integration with connectors  in the desktop/storing_with_connectors.md article.    
    
{{sample
	01_initialization/04_connector_json.html
}}



Events flow
--------------------------------------
Loading-related methods has the following events flow:


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


