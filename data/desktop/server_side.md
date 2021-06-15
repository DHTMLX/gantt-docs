Server-Side Integration
==============================

<style>
.dp_table td{
	min-width:140px;

}
</style>

The recommended approach to connect dhtmlxGantt to a backend is to implement RESTful API on the server and use dhtmlxDataProcessor on the client.
[DataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) is a client-side library included into dhtmlxGantt.js. It monitors data changes and gets the server requests on the client side.
 
Gantt uses its own instance of DataProcessor which has some specificity in comparison to the main version of the library. The current article describes the way of using Gantt DataProcessor to provide
[integration with server-side platforms](desktop/howtostart_guides.md).

You can take a look at the video guide that shows how to create a Gantt chart on the page and load the data into it on the example of a Node.js platform.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Technique
----------------------------------------------

Generally, to load data from the server side using REST API, you need to:

###Client side

           
1) Call the api/gantt_load.md method, where as a parameter specify the URL that returns Gantt data in the [JSON](desktop/supported_data_formats.md#json) format.

2) Create a DataProcessor instance using one of the two ways: 

- Initialize DataProcessor and attach it to the dhtmlxGantt object:
           
~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// keep the order of the lines below
var dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

- Call the api/gantt_createdataprocessor.md method and pass an object with configuration options as its parameter:

~~~js
var dp = gantt.createDataProcessor({
      url: "apiUrl",
      mode: "REST"
});
~~~

Check the detailed info in the next section.

<h3 id="createdp"> Creating DataProcessor</h3>

While creating a DataProcessor via the API method api/gantt_createdataprocessor.md you have several possible options for passing parameters. 
	
1\. Use one of the predefined request modes, as in:

~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

where:

- **url** - the URL to the server side
- **mode** - the mode of sending data to the server:  "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. Provide a custom **router** object:

~~~js
var dp = gantt.createDataProcessor(router);
~~~

- where **router** is either a function:

~~~js
// entity - "task"|"link"
// action - "create"|"update"|"delete"
// data - an object with task or link data
// id – the id of a processed object (task or link)
var dp = gantt.createDataProcessor(function(entity, action, data, id) { 
	switch(action) {
    	case "create":
           return gantt.ajax.post(
            	server + "/" + entity,
                data
           );
        break;
        case "update":
           return gantt.ajax.put(
                 server + "/" + entity + "/" + id,
                 data
            );
        break;
        case "delete":
           return gantt.ajax.del(
                 server + "/" + entity + "/" + id
           );
         break;
   }
});
~~~

- or an object of the following structure:

~~~js
var dp = gantt.createDataProcessor({ 
   task: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   },
   link: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

 
All the functions of the **router** object should return either a Promise or a data response object. This is needed for the dataProcessor to apply the database id and to hook **onAfterUpdate** event of the data processor.

~~~js
router = function(entity, action, data, id) {
	return new gantt.Promise(function(resolve, reject) {
    	// … some logic
        return resolve({tid: databaseId});
 	});
}
~~~

Thus you can use DataProcessor for saving data in localStorage, or any other storage which is not linked to a certain URL, or in case if there are two different servers (URLs) responsible for creation and deletion of
objects.

{{sample 08_api/22_data_processor.html}}


<h3 id="requestresponsedetails">Request and response details</h3>

The URL is formed by the following rule:

- api/link/id
- api/task/id

where "api" is the URL you've specified in the dataProcessor configuration.

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

<h3 id="requestparams">Request parameters</h3>

Create/Update/Delete requests will contain all public properties of a client-side task or link object:

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

- The format of the **start_date** and **end_date** parameters is defined by the api/gantt_date_format_config.md config.
- The client side sends all the public properties of a task or link object. Thus, a request may contain any number of additional parameters. 
- If you extend the data model by adding new columns/properties to it, no additional actions are needed to make gantt sending them to the backend.

{{note By public properties here we mean the properties the names of which don't start with an underscore (**_**) or a dollar sign (**$**) characters, 
e.g. properties named **task._owner** or **link.$state** won't be sent to the backend.}}

<h3 id="restjson">REST-JSON mode</h3>

Besides the "POST","GET","REST" and "JSON" [transaction modes](https://docs.dhtmlx.com/dataprocessor__configuration.html#sendingmodes), Gantt DataProcessor can also be used in the "REST-JSON" mode.

~~~js
gantt.load("apiUrl");

var dp = gantt.createDataProcessor({
      url: "/apiUrl",
      mode: "REST-JSON"
});
~~~

It uses the same [URLs for requests](#requestresponsedetails), but the [request parameters](#requestparams) for tasks and links and the form of sending them to the server differ.

In the REST mode data is sent to the server as a form:

~~~
Content-Type: application/x-www-form-urlencoded
~~~

while in the REST-JSON mode data is sent in the JSON format:

{{snippet Headers}}
~~~
Content-type: application/json
~~~

So parameters are sent as a JSON object:

**Request Payload**

- Task

~~~
{
    "start_date": "20-09-2018 00:00",
    "text": "New task",
    "duration":1,
    "end_date": "21-09-2018 00:00",
    "parent": 0,
    "usage":[{
        {"id":"1", "value":"30"},
        {"id":"2", "value":"20"}
    }]
}
~~~

- Link

~~~js
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

This format makes processing of complex records handier on any server-side platform. 

<h3 id="loadserverside">Server side</h3>
           
On each action performed in the Gantt (adding, updating or deleting tasks or links), dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

Since we use REST API, it's possible to implement the server side using different frameworks and programming languages.
Here's a list of available server-side implementations that you can use for Gantt backend integration:

- [dhtmlxGantt with ASP.NET Core 2](desktop/howtostart_dotnet_core.md)
- [dhtmlxGantt with PHP: Slim](desktop/howtostart_php_slim4.md)
- [dhtmlxGantt with PHP: Laravel](desktop/howtostart_php_laravel.md)
- [dhtmlxGantt with Node.js](desktop/howtostart_nodejs.md)
- [dhtmlxGantt with ASP.NET MVC](desktop/howtostart_dotnet.md)
- [dhtmlxGantt with Ruby on Rails](desktop/howtostart_ruby.md)


Storing the Order of Tasks
-------------------------------------------------

Gantt displays tasks in the same order they come from a data source. If you allow users to [reorder tasks manually](desktop/reordering_tasks.md#dragndropwithinthewholeganttstructure), 
you'll also need to store this order in the database and make sure that your data feed returns data sorted appropriately.

Client-side configuration:

~~~js
// reordering tasks within the whole gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

var dp = gantt.createDataProcessor({
      url: "/api",
      mode: "REST"
});
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

When you need Gantt to send additional headers to your backend, you can specify them using the [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) method.

For example, let's suppose that you need to add an authorization token to your requests:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
var dp = gantt.createDataProcessor({
  url: "/api",
  mode:"REST",
  headers: {
   	"Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
  }
});
~~~

Currently, api/gantt_load.md does not support header/payload parameters, so if you need them for GET request, you'll have to send xhr manually and load data into gantt using api/gantt_parse.md, for example:

~~~js
gantt.ajax.get({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
}).then(function (xhr) {
    gantt.parse(xhr.responseText)
});
~~~

### Adding custom parameters to the request

There are a couple of ways to send additional parameters to requests.

As you know, gantt sends all properties of the data object back to the backend. Thus, you can add an additional property directly to the data object and it will be sent to the backend:

~~~js
gantt.attachEvent("onTaskCreated", function(task){
    task.userId = currentUser;
    return true;
});
~~~

Alternatively, you can add custom parameters to all requests sent by data processor, using the **payload** property of the [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) parameter:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
var dp = gantt.createDataProcessor({
  url: "/api",
  mode:"REST",
  payload: {
    token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
  }
});
~~~

One more way to add custom parameters to a request is to use the [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) event of DataProcessor:

~~~js
var dp = gantt.createDataProcessor({
  url: "/api",
  mode:"REST"
});
 
dp.attachEvent("onBeforeUpdate", function(id, state, data){
    data.projectId = "1";
    return true;
});
~~~

In order to change the backend URL dynamically, use the **dataProcessor.url** method:

~~~js
dp.url("/url");
~~~

Triggering Data Saving from Script
------------------------------------

If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific task or dependency programmatically, use the api/gantt_updatetask.md and api/gantt_updatelink.md methods, respectively:

~~~js
gantt.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
],"json");
 
gantt.getTask(1).text = "Task 111"; //changes task's data
gantt.updateTask(1); // renders the updated task
~~~

Other methods that invoke sending an update to the backend:

- api/gantt_addtask.md
- api/gantt_updatetask.md
- api/gantt_deletetask.md
- api/gantt_addlink.md
- api/gantt_updatelink.md
- api/gantt_deletelink.md

Custom Routing
----------------

In case RESTful AJAX API isn't what you need on the backend, or if you want to manually control what is sent to the server, you can make use of custom routing.

For example, if you use Angular, React, or any other framework where a component on a page doesn't send changes directly to the server, but passes them to a different component which is responsible for data saving.

To provide custom routing options for DataProcessor, you should use the [**createDataProcessor()**](#createdp) method:

~~~js
gantt.createDataProcessor(function(entity, action, data, id){
    const services = {
        "task": this.taskService,
        "link": this.linkService
    };
    const service = services[entity];
 
    switch (action) {
        case "update":
            return service.update(data);
        case "create":
            return service.insert(data);
        case "delete":
            return service.remove(id);
    }
});
~~~

{{sample 08_api/22_data_processor.html}}

### Using AJAX for setting custom routers

[Gantt AJAX module](api/gantt_ajax_other.md) can be useful for setting custom routes. Gantt expects a custom router to return a Promise object as a result of an operation, which allows catching the end of an action. 
The AJAX module supports promises and is suitable for usage inside of custom routers. Gantt will get Promise and process the content of Promise, when it is resolved.  

In the example below a new task is created. If the server response includes the id of a newly created task, Gantt will be able to apply it.

~~~js
gantt.createDataProcessor(function(entity, action, data, id){
...
 
  switch (action) {
    case "create":
      return gantt.ajax.post({
        headers: { 
          "Content-Type": "application/json" 
        },
        url: server + "/task",
        data: JSON.stringify(data)
      });
    break;
  }
});
~~~



Error Handling
----------------------

A server can inform Gantt that an action has failed by returning the "action":"error" response:

~~~js
{"action":"error"}
~~~

Such a response can be captured on the client with the help of gantt.dataProcessor:

~~~js
var dp = gantt.createDataProcessor({
  url: "/api",
  mode:"REST"
});
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // do something here
    }
});
~~~

The response object may contain any number of additional properties, they can be accessed via the `response` argument of the onAfterUpdate handler.

{{note
This event will be called only for managed errors that return JSON response as shown above.
If you need to handle HTTP errors, please check api/gantt_onajaxerror_event.md API event.
}}

If the server responded with an error on some of your action but the changes were saved on the client, the best way to synchronize their states is to clear the client's state, and reload the correct data from the server-side:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

If you want to synchronize client-server sides but don't want to make any server calls, you can use the [silent()](api/gantt_silent.md) method which makes all code inside it not to trigger internal events or server calls:

~~~js
gantt.silent(function(){
    gantt.deleteTask(item.id);
    gantt.render();
});
~~~

Cascade Deletion
----------------

By default, deletion of a task invokes a chain deletion of its nested task and related links. Gantt will send a *delete* request for each removed task and link.
Thus, you don't have to maintain data integrity on a backend, it can be handled by the Gantt reasonably well.

On the other hand, this strategy can generate a large number of AJAX calls to the backend API, since dhtmlxGantt has no batch-request support for AJAX
and the number of tasks and links is not limited. 

In that case, cascade deletion can be disabled using the api/gantt_cascade_delete_config.md config. 
Thus, when a project branch is deleted, the client will send a delete request only for the top item and will expect the backend to delete the related links and subtasks.


XSS, CSRF and SQL Injection Attacks
----------------------------

Pay attention that Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. 
It is important that responsibility for keeping an application safe is on the developers implementing the backend. 

Check the desktop/app_security.md article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application. 


@index:
desktop/app_security.md




