Storing Data on the Server Side
==============================
dhtmlxGantt supports special helper libraries that simplify your work with the server side:

- **dhtmlxConnector** - a server-side library. Provides necessary data exchange conditions so that you do not have to deal with the technical details of data stores,
systems or services (<a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:start">read more</a>).
- **dataProcessor** - a client-side library (**included in dhtmlxScheduler.js**).  Monitors data changes and gets the server requests on the client side (<a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxdataprocessor:toc">read more</a>).

Joint usage of the libraries allows you to achieve any client-server manipulation and to not write the server-client communication logic manually.

{{note
You can find dhtmlxConnector in the <a href="http://dhtmlx.com/x/download/regular/dhtmlxGantt.zip">dhtmlxGantt package</a>.}}




Technique
----------------------------------------------
Generally, to load data from the server side you need to:

<ol>
	<li>
  		<b>Client side:</b>
            <ul>
            	<li>call the api/gantt_load.md method where as a parameter, specify the path to a server-side script which outputs data in the JSON format</li>
                <li>initialize dataProcessor and attach it to the dhtmlxGantt object.The dataProcessor constructor accepts the path to the same server-side script</li>
            </ul>
~~~js
gantt.init("gantt_here");
gantt.load("data.php");

var dp = new dataProcessor("data.php");
dp.init(gantt);
~~~
	</li>
    <li>
    	<b>Server-side:</b> 
            <ul>
            	<li>a standard server script that uses dhtmlxConnector looks like:</li>
            </ul>
~~~js
//events.php
<?php

include ('codebase/connector/db_sqlite3.php');
include ('codebase/connector/gantt_connector.php');

// SQLite
$dbtype = "SQLite3";
$res = new SQLite3(dirname(__FILE__)."/samples.sqlite");

// Mysql
// $dbtype = "MySQL";
// $res=mysql_connect("192.168.1.251", "gantt", "gantt");
// mysql_select_db("gantttest");

$gantt = new JSONGanttConnector($res, $dbtype);

$gantt->mix("open", 1);
//$gantt->enable_order("sortorder");

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table("gantt_tasks","id",
	"start_date,duration,text,progress,sortorder,parent","");

?>
~~~
	<ul>
    	<li>dhtmlxConnector consists of individual component-specific connectors. For dhtmlxGantt you need to include -  <b>gantt_connector.php</b>.</li>
        <li>the <b>render_table</b> method allows you to load tasks from a single table.<br> Parameters:
        	<ul>
            	<li><i>the database's table name</i></li>
                <li><i>the name of the identity field (optional)</i></li>
                <li><a href="desktop/server_side.md#thedatabasesstructure">a list of fields</a> which will be used as data properties of a task</li>
            </ul>
            If you want to load data from several tables, read the related chapter of the dhtmlxConnector's documentation - <a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:basis#work_with_several_tables">'Basic concepts: work with several tables'</a>.
        </li>
        <li>the <b>render_links</b> method allows you to load links from a single table. Unlike tasks, you can't load links from several tables.
        <ul>
            	<li><i>the database's table name</i></li>
                <li><i>the name of the identity field (optional)</i></li>
                <li><a href="desktop/server_side.md#thedatabasesstructure">a list of fields</a> which will be used as data properties of a link</li>
            </ul>
        </li>
        <li> the <b>mix</b> method sets the "open" property to <i>true</i> for all data items. Simply saying, this method makes all branches in the tree open initially</li>
        <li> the <b>enable_order</b> method 'says' to load the task's order in the tree from the server. The tasks's order in the tree (among sublings) is stored in a field with the hardcoded name - "sortorder". Note, the property used only while loading data from a database.</li>
    </ul>
	</li>
</ol>

{{sample
	01_initialization/04_connector_json.html
}}

The database's structure
------------------------------------------
<img src="desktop/tutorial_db_tables.png"/>

The structure of a standard database to load tasks and links to the Gantt chart is:

<ul>
	<li><b>gantt_tasks</b> table - specifies the gantt tasks</li>
    <ul>
    	<li><b>id</b> - (<i>string, number</i>) the event id.</li>
        <li><b>start_date</b> - (<i>Date</i>) the date when a task is scheduled to begin.  </li>
        <li><b>text</b> - (<i>string</i>) the task's description.</li>
        <li><b>progress</b> - (<i>number</i>) a number from 0 to 1 that shows what percent of the task is complete. </li>
        <li><b>duration</b> - (<i>number</i>) the task duration in the units of the current time scale. </li>
        <li><b>parent</b> - (<i>number</i>) the id of the parent task. </li>
    </ul>
	<li><b>gantt_links</b> table - specifies the gantt dependency links</li>
    <ul>
    	<li><b>id</b>-(<i>string, number</i>) the event id.</li>
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


Updating data on the server
------------------------------------
If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific task or dependency programmatically, use the api/gantt_updatelink.md and api/gantt_updatelink.md methods, respectively:

~~~js
scheduler.parse([
   {id:1, start_date:"2013-05-13 6:00", end_date:"2009-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2013-06-09 6:00", end_date:"2009-06-09 8:00", text:"Event 2"}
],"json");
 
scheduler.getTask(1).text = "Task 111"; //changes event's data
scheduler.updateTask(1); // renders the updated task
~~~

Saving data from REST server 
--------------------------------------
To make dataProcessor work with the REST backend, you need to do 2 things: 

1. Specify the path to your REST server in the dataProcessor's constructor.
2. Call the setTransactionMode method with the "REST" value.

~~~js
var dp = new dataProcessor("http://example.com/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~
<br>

{{note
Note, the response can be any valid JSON object. 
}}

To change the id of the event while updating - use the **tid** property. 


~~~js
{
	tid: "some"
}
~~~

###Dataprocessor with the use of POST, PUT, GET, DELETE HTTP methods for CRUD requests

The url is formed by the following rule:

api/link/id,<br>
api/task/id

where "api" is the url you've specified in the dataProcessor configuration.

Initalizing dataprocessor:

~~~js
var dp = new dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

Possible requests:

<table>
	<tr>
    	<td><b>Action</b></td><td><b>HTTP Method</b></td><td><b>URL</b></td>
    </tr>
	<tr>
    	<td>load data</td>
		<td>GET</td>
        <td>/apiUrl</td>
	</tr>
    <tr>
		<td>add a new task</td>
		<td>POST</td>
        <td>/apiUrl/task/taskId</td>
    </tr>
	<tr>
    	<td>update a task</td>
		<td>PUT</td>
        <td>/apiUrl/task/taskId</td>
	</tr>
	<tr>
    	<td>delete a task</td>
		<td>DELETE</td>
        <td>/apiUrl/task/taskId</td>
	</tr>
	<tr>
    	<td>add a new link</td>
		<td>POST</td>
        <td>/apiUrl/link/linkId</td>
	</tr>
    <tr>
		<td>update a link</td>
		<td>PUT</td>
        <td>/apiUrl/link/linkId</td>
    </tr>
    <tr>
		<td>delete a link</td>
		<td>DELETE</td>
        <td>/apiUrl/link/linkId</td>
	</tr>
</table>

Storing the order of tasks
-------------------------------------------------
To store the order of tasks in the tree (among sublings) on the server:

<ol>
	<li>Add an integer field with the name "sortorder" to your table with tasks.<br> <i>Note, the name of the field is hardcoded. </i><br>
<img style="padding-top:15px; padding-bottom:15px;" src="desktop/tasks_order.png"/>    
    </li>
	<li>Call the <b>enable_order</b> method on the server-side:<br> <br>
~~~php
$gantt = new JSONGanttConnector($res, $dbtype);
$gantt->enable_order("sortorder");  /*!*/
$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table("gantt_tasks","id",
	"start_date,duration,text,progress,sortorder,parent","");
~~~
	</li>
</ol>
