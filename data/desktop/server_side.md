Server-Side Integration
==============================

<style>
.dp_table td{
	min-width:140px;

}
</style>

The recommended approach to connect dhtmlxGantt to a backend is to implement RESTful API on the server and use dhtmlx dataProcessor on the client.

[dataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html) is a client-side library included into dhtmlxGantt.js. 
It monitors data changes and gets the server requests on the client side.
 

Technique
----------------------------------------------

Generally, to load data from the server side using REST API, you need to:

###Client side

           
1) Call the api/gantt_load.md method, where as a parameter specify the URL that returns Gantt data in the [JSON](desktop/supported_data_formats.md#json) format

2) Initialize dataProcessor and attach it to the dhtmlxGantt object:
           
~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

var dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~
	
<h3 id="requestresponsedetails">Request and Response details</h3>

The URL is formed by the following rule:

- api/link/id
- api/task/id

where "api" is the url you've specified in the dataProcessor configuration.

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

### Request parameters

Create/Update/Delete requests will contain all public properties of the client-side task or link object:

Task:

- **start_date**:2017-04-08 00:00:00
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:2017-04-12 00:00:00

Link:

- **source**:1
- **target**:2
- **type**:0

Note:

- The format of the **start_date** and **end_date** parameters is defined by the api/gantt_xml_date_config.md config.
- The client side sends all the public properties of a task or link object. Thus, a request may contain any number of additional parameters. 
- If you extend the data model by adding new columns/properties to it, no additional actions are needed to make gantt sending them to the backend.

{{note By public properties here we mean the properties the names of which don't start with an underscore (**_**) or a dollar sign (**$**) characters. 
E.g. properties named **task._owner** or **link.$state** won't be sent to the backend}}


###Server side
           
On each action performed in the Gantt (adding, updating or deleting tasks or links), dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

Since we use REST API, it's possible to implement the server side using different frameworks and programming languages.
Here's a list of available server-side implementations that you can use for Gantt backend integration:

- [Plain PHP Code Samples](desktop/howtostart_php.md)
- [Laravel Code Samples](desktop/howtostart_php_laravel.md)
- [Node.js Code Samples](desktop/howtostart_nodejs.md)
- [ASP.NET Web API Code Samples](desktop/howtostart_dotnet.md)
- [Ruby on Rails Code Samples](desktop/howtostart_ruby.md)


Storing the Order of Tasks
-------------------------------------------------

Gantt displays tasks in the same order they come from a data source. If you allow users to 
[reorder tasks manually](desktop/reodering_tasks.md#dragndropwithinthewholeganttstructure), 
you'll also need to store this order in the database and make sure that your data feed returns data sorted appropriately.

Client-side configuration:
~~~js
// reordering tasks within the whole gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");
 
var dp = new gantt.dataProcessor("/api");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

The saving order can be implemented in several ways, we'll show one of them.

- You add a numeric column to your tasks table, let's call it 'sortorder'.
- When serving the GET action, you sort tasks by this column in the ascending order.
- When a new task is added, it should receive `MAX(sortorder) + 1` sortorder.
- When the order is changed on the client side, gantt will send PUT (POST if you don't use the REST mode) with
all the properties of a task and also the values that describe the position of the task within the project tree.

<table class="dp_table">
	<tr>
		<th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Parameters</b></th><th><b>Response</b></th>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/apiUrl/task/taskId</td>
		<td>
			<ul>
			<li><b>target=</b> adjacentTaskId</li>
			</ul>
		</td>
		<td>{"action":"updated"}</td>
	</tr>
</table>

The <b>target</b> parameter will contain the id of the nearest task that goes right before or right after the current task.

Its value may come in one of two formats:

 - *target=targetId*  - the current task should go right <b>before</b> the targetId task
 - *target=next:targetId* - the current task should go right <b>after</b> the targetId task

Applying of the order changes usually involves updating of multiple tasks, here is a pseudo code example of how it can be implemented:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// get id of adjacent task and check whether updated task should go before or after it
if(target.startsWith("next:")){
	targetTaskId = target.substr("next:".length);
	nextTask = true;
}else{
	targetTaskId = target;
	nextTask = false;
}

const currentTask = tasks.getById(currentTaskId);
const targetTask = tasks.getById(targetTaskId);

if(!targetTaskId)
	return;

// updated task will receive the sortorder value of the adjacent task
let targetOrder = targetTask.sortorder;

// if it should go after the adjacent task, it should receive a bigger sortorder
if(nextTask)
	targetOrder++;

// increase sort orders of tasks that should go after the updated task
tasks.where(task => task.sortorder >= targetOrder).
   update(task => task.sortorder++);

// and update the task with its new sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);

~~~

You can have a look at the detailed examples on how to implement storing the tasks' order for particular server-side platforms: 
[plain PHP](desktop/howtostart_php.md#storingtheorderoftasks), [Laravel](desktop/howtostart_php_laravel.md#storingtheorderoftasks),
[Node.js](desktop/howtostart_nodejs.md#storingtheorderoftasks), [ASP.NET Web API](desktop/howtostart_dotnet.md#storingtheorderoftasks) and 
[Rails](desktop/howtostart_ruby.md#storingtheorderoftasks).


Custom Request Headers and Parameters 
----------------

### Adding custom request headers

When you need gantt to send additional headers to your backend, you can specify them using the 
[dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) method.

For example, let's suppose that you need to add an authorization token to your requests:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
var dp = new gantt.dataProcessor("/api");
dp.init(gantt);
dp.setTransactionMode({
    mode:"REST",
    headers: {
       "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Currently, api/gantt_load.md does not support header/payload parameters, so if you need them for GET request, 
you'll have to send xhr manually and load data into gantt using api/gantt_parse.md, for example:
~~~js
$.ajax({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    },
    success: function (result) {
        scheduler.parse(result, "json");
    }
});
~~~

### Adding custom parameters to the request

There are a couple of ways to send additional parameters to requests.

As you know, gantt sends all properties of the data object back to the backend. 
Thus, you can add an additional property directly to the data object and it will be sent to the backend:

~~~js
gantt.attachEvent("onTaskCreated", function(task){
    task.userId = currentUser;
    return true;
});
~~~

Alternatively, you can add custom parameters to all requests sent by data processor, using the **payload** property of
the [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) parameter:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
var dp = new gantt.dataProcessor("/api");
dp.init(gantt);
dp.setTransactionMode({
    mode:"REST",
    payload: {
       token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Triggering Data Saving from Script
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

Other methods that invoke sending an update to the backend:

- api/gantt_addtask.md
- api/gantt_updatetask.md
- api/gantt_deletetask.md
- api/gantt_addlink.md
- api/gantt_updatelink.md
- api/gantt_deletelink.md

Saving Changes without DataProcessor
----------------

dhtmlxGantt can be used without gantt.dataProcessor. In that case you'll have to monitor all changes made in the gantt manually and then send them to your backend.
Here is the list of events you'll need to listen to:

- api/gantt_onaftertaskadd_event.md
- api/gantt_onaftertaskupdate_event.md
- api/gantt_onaftertaskdelete_event.md
- api/gantt_onafterlinkadd_event.md
- api/gantt_onafterlinkupdate_event.md
- api/gantt_onafterlinkdelete_event.md

When a task or a link is created on the client side, it obtains a temporary id which is used until the item gets a permanent database id.

Once you insert a new item into the database, you'll need to pass it back to the client side and apply it 
to the related task or link using api/gantt_changetaskid.md or api/gantt_changelinkid.md:

~~~js
// assume that taskService/linkService are some kind of CRUD service implementation

// tasks
gantt.attachEvent('onAfterTaskAdd', function(id, task) {
  taskService.create(task)
    .then(function(result){
      gantt.changeTaskId(id, result.databaseId);
    });
});

gantt.attachEvent('onAfterTaskUpdate', function(id, task) {
  taskService.update(task);
});

gantt.attachEvent('onAfterTaskDelete', function(id) {
  taskService.delete(id);
});

// links
gantt.attachEvent('onAfterLinkAdd', function(id, link) {
  linkService.create(link)
    .then(function(result){
      gantt.changeLinkId(id, result.databaseId);
    });
});

gantt.attachEvent('onAfterLinkUpdate', function(id, link) {
  linkService.update(task);
});

gantt.attachEvent('onAfterLinkDelete', function(id, link) {
  linkService.delete(id);
});
~~~

Error Handling
------------------------------------------

A server can inform Gantt that an action has failed by returning the "action":"error" response:

~~~js
{"action":"error"}
~~~

Such a response can be captured on the client with the help of gantt.dataProcessor:

~~~js
var dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // do something here
    }
});
~~~

The response object may contain any number of additional properties, they can be accessed via the `response` argument of the onAfterUpdate handler.


Cascade Deletion
----------------

By default, deletion of a task invokes a chain deletion of its nested task and related links. Gantt will send a *delete* request for each removed task and link.
Thus, you don't have to maintain data integrity on a backend, it can be handled by the Gantt reasonably well.

On the other hand, this strategy can generate a large number of AJAX calls to the backend API, since dhtmlxGantt has no batch-request support for AJAX
and the number of tasks and links is not limited. 

In that case, cascade deletion can be disabled using the api/gantt_cascade_delete_config.md config. 
Thus, when a project branch is deleted, the client will send a delete request only for the top item and will expect the backend to delete the related links and subtasks.

@todo:
 checked and updated