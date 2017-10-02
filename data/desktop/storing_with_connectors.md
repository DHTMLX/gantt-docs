Connector Сode Samples
==============================

dhtmlxGantt supports a special server-side library helper **dhtmlxConnector** that simplifies your work with the server side.

[dhtmlxConnector](http://docs.dhtmlx.com/connector__php__index.html) is a middleware that binds client-side to the database table, so that you do not
have to deal with the technical details of the data exchange protocols.

Joint usage of the dhtmlxConnector and [dataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html) libraries allows you 
to achieve any client-server manipulation and to not write the server-client communication logic manually.

{{note
You can find dhtmlxConnector in the <a href="http://dhtmlx.com/x/download/regular/dhtmlxGantt.zip">dhtmlxGantt package</a>.}}

You can also read the [complete tutorial](desktop/howtostart_connector.md) on using Gantt with Connector on the server side.

Technique
----------------------------------------------

To load data from the server with the help of PHP Connector, you need to:

###Client-side implementation

- call the api/gantt_load.md method where as a parameter specify the url that returns Gantt data in [JSON](desktop/supported_data_formats.md#json) format
            
- initialize dataProcessor and attach it to the dhtmlxGantt object.The dataProcessor constructor accepts the path to the same server-side script
            
~~~js
gantt.init("gantt_here");
gantt.load("data.php");

var dp = new gantt.dataProcessor("data.php");
dp.init(gantt);
~~~


###Server-side implementation
        
<ul>
	<li>a standard server script that uses dhtmlxConnector looks like:
           
~~~js
//events.php
<?php

require_once ('codebase/connector/gantt_connector.php');

$res = new PDO("mysql:host=localhost;dbname=gantt", "ganttuser", "ganttpwd");

$gantt = new JSONGanttConnector($res, $dbtype);

$gantt->mix("open", 1);
//$gantt->enable_order("sortorder");

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table("gantt_tasks","id",
	"start_date,duration,text,progress,sortorder,parent","");

?>
~~~
  </li>
	
    	<li>dhtmlxConnector consists of individual component-specific connectors. For dhtmlxGantt you need to include -  <b>gantt_connector.php</b>.</li>
    	<li>dhtmlxConnector can work with different database and drivers, you can find out more <a href="https://docs.dhtmlx.com/connector__php__server_side_sample.html">here</a>. </li>
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
        <li> the <b>enable_order</b> method 'says' to load the task's order in the tree from the server. The tasks's order in the tree (among siblings) is stored in a field with the hardcoded name - "sortorder". Note, the property used only while loading data from a database.</li>
    </ul>
	

{{sample
	01_initialization/04_connector_json.html
}}

###Request parameters format

An example of Gantt request values for a separate request for each task is given below:

- **id**:8
- **start_date**:2013-04-08 00:00:00
- **duration**:4
- **text**:Task #2.2
- **progress**:0.9
- **parent**:3
- **open**:1
- **end_date**:2013-04-12 00:00:00
- **!nativeeditor_status**:updated
- **ids**:8

###Response

The response can be any valid JSON, its format should be as follows:

- **type** - the type of the operation;
- **sid** - the original task/link ID;
- **tid** - the ID of the task/link after the operation. 

An example of JSON response looks like this:

~~~js
{"action":"updated", "sid":15, "tid":15}
~~~

More details on the request and response formats are given in the [Basic Operating Principles](http://docs.dhtmlx.com/dataprocessor__basic_principles.html#schedulerrequestparamsexamples) article
of dataProccesor documentation.

Storing the order of tasks
-------------------------------------------------
To store the order of tasks in the tree (among siblings) on the server:

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