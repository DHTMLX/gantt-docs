Server-Side Integration
==============================

<style>
.dp_table td{
	min-width:140px;

}
</style>

To organize communication of dhtmlxGantt with the server side, the dataProcessor helper library and the REST backend are used.

[dataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html) is a client-side library included into dhtmlxGantt.js. It monitors data changes and gets the server requests on the client side.
 
[REST](http://rest.elkstein.org/) stands for Representational State Transfer. It relies on a stateless, client-server, cacheable communications protocol.
RESTful APIs use HTTP as a transport layer in most cases. Due to its simplicity, REST works well with frameworks that use various languages.
 

Technique
----------------------------------------------
Generally, to load data from the server side using REST API, you need to:

###Client side

           
1) Call the api/gantt_load.md method where as a parameter specify the url that returns Gantt data in [JSON](desktop/supported_data_formats.md#json) format

2) Initialize dataProcessor and attach it to the dhtmlxGantt object</li>
           
~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

var dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
~~~

3) In order to set the REST mode of dataProcessor, call the setTransactionMode() function with the REST parameter:
    		
~~~js
dp.setTransactionMode("REST");
~~~
	
<h3 id="requestresponsedetails">Request and Response details</h3>


The list of possible requests and responses is:

<table class="dp_table">
	<tr>
    	<th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
    </tr>
	<tr>
    	<td>load data</td>
		<td>GET</td>
        <td>/apiUrl</td>
        <td><a href="desktop/supported_data_formats.md#json">JSON format</a></td>
	</tr>
    <tr>
		<td>add a new task</td>
		<td>POST</td>
        <td>/apiUrl/task</td>
        <td>{"action":"inserted","tid":"taskId"}</td>
    </tr>
	<tr>
    	<td>update a task</td>
		<td>PUT</td>
        <td>/apiUrl/task/taskId</td>
        <td>{"action":"updated"}</td>
	</tr>
	<tr>
    	<td>delete a task</td>
		<td>DELETE</td>
        <td>/apiUrl/task/taskId</td>
        <td>{"action":"deleted"}</td>
	</tr>
	<tr>
    	<td>add a new link</td>
		<td>POST</td>
        <td>/apiUrl/link</td>
        <td>{"action":"inserted","tid":"linkId"}</td>
	</tr>
    <tr>
		<td>update a link</td>
		<td>PUT</td>
        <td>/apiUrl/link/linkId</td>
        <td>{"action":"updated"}</td>
    </tr>
    <tr>
		<td>delete a link</td>
		<td>DELETE</td>
        <td>/apiUrl/link/linkId</td>
        <td>{"action":"deleted"}</td>
	</tr>
</table>

###Server side
           
On each action performed in Gantt (adding, updating or deleting tasks or links),
dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

Since we use REST API, it's possible to implement the server side using different frameworks and programming languages.
Here's a list of available server side implementations that you can use for Gantt backend integration:

- [Node.js](desktop/server_nodejs.md)
- PHP
- .Net
- Ruby

<br>
If by some reason you don't want to use REST API, the best solution is [to use dhtmlxConnector library](desktop/storing_with_connectors.md).

Triggering data saving from script
------------------------------------
If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific task or dependency programmatically, use the api/gantt_updatetask.md and api/gantt_updatelink.md methods, respectively:

~~~js
gantt.parse([
   {id:1, start_date:"2013-05-13 6:00", end_date:"2009-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2013-06-09 6:00", end_date:"2009-06-09 8:00", text:"Event 2"}
],"json");
 
gantt.getTask(1).text = "Task 111"; //changes event's data
gantt.updateTask(1); // renders the updated task
~~~


Storing the order of tasks
-------------------------------------------------
To store the order of tasks in the tree (among siblings) on the server:

<ol>
	<li>Add an integer field with the name "sortorder" to your table with tasks.<br> <i>Note, the name of the field is hardcoded. </i><br>
<img style="padding-top:15px; padding-bottom:15px;" src="desktop/tasks_order.png"/>    
    </li>
	<li> Add info here</li>
</ol>


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



@index: 
- desktop/storing_with_connectors.md
- desktop/server_php.md
- desktop/server_nodejs.md
- desktop/server_dotnet.md
- desktop/server_ruby.md

