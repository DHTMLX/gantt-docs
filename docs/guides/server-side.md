---
title: "Server-Side Integration"
sidebar_label: "Server-Side Integration"
---

# Server-Side Integration

<style>
.dp_table td (
  width: 100%;
)
</style>

The recommended approach of connecting dhtmlxGantt to a backend is to implement a RESTful API on the server and use the [](api/other/dataprocessor.md) module on the client.

DataProcessor is a built-in module that monitors data changes in Gantt and sends updates to the REST API in the specified format, allowing easy [integration with server-side platforms](integrations/howtostart-guides.md). When using an object data source, DataProcessor can be configured to provide callbacks for data changes, which you can utilize for data binding.

You can take a look at the video guide that shows how to create a Gantt chart on the page and load the data into it on the example of a Node.js platform.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Technique

Generally, to load data from the server side using REST API, you need to:

### Client side

1) Call the [](api/method/load.md) method, where as a parameter specify the URL that returns Gantt data in the [JSON](/guides/supported-data-formats/) format.

2) Create a DataProcessor instance using one of the two ways: 

- Initialize DataProcessor and attach it to the dhtmlxGantt object:
  
~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// keep the order of the lines below
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
It is recommended to use the second method.
:::

- Call the [](api/method/createdataprocessor.md) method and pass an object with configuration options as its parameter:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

Check the detailed info in the next section.


###  Creating DataProcessor {#createdp}

While creating a DataProcessor via the API method [](api/method/createdataprocessor.md) you have several possible options for passing parameters. 
  
1. Use one of the predefined request modes, as in:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

where:

- **url** - the URL to the server side
- **mode** - the mode of sending data to the server:  "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - defines whether the task must be deleted from the gantt only after a successful response from the server. Dependency links and subtasks will be deleted after the deletion of the parent task is confirmed.

2. Provide a custom **router** object:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- where **router** is either a function:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - an object with task or link data
// id – the id of a processed object (task or link)
const dp = gantt.createDataProcessor((entity, action, data, id) => { 
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
const dp = gantt.createDataProcessor({
    task: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    },
    link: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    }
});
~~~

All the functions of the **router** object should return either a Promise or a data response object. This is needed for the dataProcessor to apply the database id and to hook **onAfterUpdate** event of the data processor.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … some logic
        return resolve({ tid: databaseId });
    });
};
~~~

Thus you can use DataProcessor for saving data in localStorage, or any other storage which is not linked to a certain URL, or in case if there are two different servers (URLs) responsible for creation and deletion of
objects.


**Related sample**: [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Request and response details {#requestresponsedetails}

The URL is formed by the following rule:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

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
  <td>[JSON format](/guides/supported-data-formats/)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Tasks</td></tr>
  <tr>
  <td>add a new task</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a task</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a task</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Links</td></tr>
  <tr>
  <td>add a new link</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a link</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a link</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Resources</td></tr>
  <tr>
  <td>add a new resource</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a resource</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a resource</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Resource Assignments</td></tr>
  <tr>
  <td>add a new assignment</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update an assignment</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete an assignment</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
By default, Resources and Resource Assignments are not sent to the DataProcessor. If needed, you have to enable this behavior explicitly.
Read more [here](guides/server-side.md#resources_crud).
:::


### Request parameters {#requestparams}

Create/Update/Delete requests will contain all public properties of a client-side task or link object:

Task:

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

Link:

- **source**: 1
- **target**: 2
- **type**: 0

Note:

- The format of the **start_date** and **end_date** parameters is defined by the [](api/config/date_format.md) config.
- The client side sends all the public properties of a task or link object. Thus, a request may contain any number of additional parameters. 
- If you extend the data model by adding new columns/properties to it, no additional actions are needed to make gantt sending them to the backend.

:::note
By public properties here we mean the properties the names of which don't start with an underscore (**_**) or a dollar sign (**$**) characters, 
e.g. properties named **task._owner** or **link.$state** won't be sent to the backend.
:::


### REST-JSON mode {#restjson}

Besides the "POST","GET","REST" and "JSON" transaction modes, Gantt DataProcessor can also be used in the "REST-JSON" mode.

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

It uses the same [URLs for requests](#requestresponsedetails), but the [request parameters](#requestparams) for tasks and links and the form of sending them to the server differ.

In the REST mode data is sent to the server as a form:

~~~jsx
Content-Type: application/x-www-form-urlencoded
~~~

while in the REST-JSON mode data is sent in the JSON format:

~~~jsx title="Headers"
Content-type: application/json
~~~

So parameters are sent as a JSON object:

**Request Payload**

- Task

~~~jsx
{
    "start_date": "20-09-2025 00:00",
    "text": "New task",
    "duration": 1,
    "end_date": "21-09-2025 00:00",
    "parent": 0,
    "usage": [
        { "id": "1", "value": "30" },
        { "id": "2", "value": "20" }
    ]
}
~~~

- Link

~~~jsx
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

This format makes processing of complex records handier on any server-side platform. 


### Server side {#loadserverside}

On each action performed in the Gantt (adding, updating or deleting tasks or links), dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

Since we use REST API, it's possible to implement the server side using different frameworks and programming languages.
Here's a list of available server-side implementations that you can use for Gantt backend integration:

- [dhtmlxGantt with ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)


### Storing the Order of Tasks {#storingtheorderoftasks}

Gantt displays tasks in the same order they come from a data source. If you allow users to [reorder tasks manually](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure), 
you'll also need to store this order in the database and make sure that your data feed returns data sorted appropriately.

Client-side configuration:

~~~js
// reordering tasks within the whole gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
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
  <td><b>target=</b>adjacentTaskId</td>
  <td>("action":"updated")</td>
  </tr>
</table>

The <b>target</b> parameter will contain the id of the nearest task that goes right before or right after the current task.

Its value may come in one of two formats:

 - *target="targetId*"  - the current task should go right <b>before</b> the targetId task
 - *target="next:targetId*" - the current task should go right <b>after</b> the targetId task

Applying of the order changes usually involves updating of multiple tasks, here is a pseudo code example of how it can be implemented:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// Get id of adjacent task and check whether updated task should go before or after it
if (target.startsWith("next:")) {
  targetTaskId = target.substr("next:".length);
  nextTask = true;
} else {
  targetTaskId = target;
  nextTask = false;
}

const currentTask = tasks.getById(currentTaskId);
const targetTask = tasks.getById(targetTaskId);

if (!targetTaskId) return;

// Updated task will receive the sortorder value of the adjacent task
let targetOrder = targetTask.sortorder;

// If it should go after the adjacent task, it should receive a bigger sortorder
if (nextTask) targetOrder++;

// Increase sort orders of tasks that should go after the updated task
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// And update the task with its new sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

You can have a look at the detailed examples on how to implement storing the tasks' order for particular server-side platforms: 
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks) and 
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks).


## Custom Request Headers and Parameters 

### Adding custom request headers

You can send additional headers to your backend. For example, let's suppose that you need to add an authorization token to your requests:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
const dp = gantt.createDataProcessor({
    url: "/api",
    mode:"REST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Currently, [](api/method/load.md) does not support header/payload parameters, so if you need them for GET request, you'll have to send xhr manually and load data into gantt using [](api/method/parse.md), for example:

~~~js
gantt.ajax.get({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
}).then(xhr => {
    gantt.parse(xhr.responseText);
});
~~~


### Adding custom parameters to the request

There are a couple of ways to send additional parameters to requests.

As you know, gantt sends all properties of the data object back to the backend. Thus, you can add an additional property directly to the data object and it will be sent to the backend:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

Alternatively, you can add custom parameters to all requests sent by data processor, using the **payload** property:

~~~js
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    payload: {
        token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

One more way to add custom parameters to a request is to use the [onBeforeUpdate](api/other/dataprocessor.md) event of DataProcessor:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    data.projectId = "1";
    return true;
});
~~~


## Triggering Data Saving from Script

If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific task or dependency programmatically, use the [](api/method/updatetask.md) and [](api/method/updatelink.md) methods, respectively:

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; //changes task's data
gantt.updateTask(1); // renders the updated task
~~~

Other methods that invoke sending an update to the backend:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)

## Custom Routing {#customrouting}

In case RESTful AJAX API isn't what you need on the backend, or if you want to manually control what is sent to the server, you can make use of custom routing.

For example, if you use Angular, React, or any other framework where a component on a page doesn't send changes directly to the server, but passes them to a different component which is responsible for data saving.

To provide custom routing options for DataProcessor, you should use the [**createDataProcessor()**](#createdp) method:

~~~js
gantt.createDataProcessor(function(entity, action, data, id) {
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


**Related sample**: [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Using AJAX for setting custom routers

[Gantt AJAX module](api/other/ajax.md) can be useful for setting custom routes. Gantt expects a custom router to return a Promise object as a result of an operation, which allows catching the end of an action. 
The AJAX module supports promises and is suitable for usage inside of custom routers. Gantt will get Promise and process the content of Promise, when it is resolved. 

In the example below a new task is created. If the server response includes the id of a newly created task, Gantt will be able to apply it.

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    ...
    switch (action) {
        case "create":
            return gantt.ajax.post({
                headers: {
                    "Content-Type": "application/json"
                },
                url: `${server}/task`,
                data: JSON.stringify(data)
            });
    }
});
~~~


## Routing CRUD actions of resources and resource assignments {#resources_crud}

From v8.0, modified resource assignments can be sent to the DataProcessor as separate entries with persistent IDs, so making it easy to connect to backend API. Changes of resource objects can be also sent to the DataProcessor.

Note, this feature is disabled by default. By default, the DataProcessor only receives changes made to tasks and links. To enable the feature, use the following settings:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Once the resource mode of the DataProcessor is enabled, if the DataProcessor is configured to the REST mode - resources and resource assignments will be sent to the backend in separate requests.

If you use the DataProcessor in the Custom Routing mode, you'll be able to capture changes of resource assignments and resources in the handler:

~~~js
gantt.createDataProcessor({
    task: {
        create: (data) => {
            return createRecord({type: "task", ...data}).then((res) => {
                return { tid: res.id, ...res };
            });
        },
        update: (data, id) => {
            return updateRecord({type: "task", ...data}).then(() => ({}));
        },
        delete: (id) => {
            return deleteRecord({type: "task:", id: id}).then(() => ({}));
        }
    },
    link: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    assignment: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    resource: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    }
});
~~~

Or, using function declaration:

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    switch (entity) {
        case "task":
            break;
        case "link":
            break;
        case "resource":
            break;
        case "assignment":
            break;
    }
});
~~~


## Error Handling

A server can inform Gantt that an action has failed by returning the "action":"error" response:

~~~js
{"action":"error"}
~~~

Such a response can be captured on the client with the help of gantt.dataProcessor:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // do something here
    }
});
~~~

The response object may contain any number of additional properties, they can be accessed via the `response` argument of the onAfterUpdate handler.

:::note
This event will be called only for managed errors that return JSON response as shown above.
If you need to handle HTTP errors, please check [](api/event/onajaxerror.md) API event.
:::

If the server responded with an error on some of your action but the changes were saved on the client, the best way to synchronize their states is to clear the client's state, and reload the correct data from the server-side:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

If you want to synchronize client-server sides but don't want to make any server calls, you can use the [silent()](api/method/silent.md) method which makes all code inside it not to trigger internal events or server calls:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## Cascade Deletion

By default, deletion of a task invokes a chain deletion of its nested task and related links. Gantt will send a *delete* request for each removed task and link.
Thus, you don't have to maintain data integrity on a backend, it can be handled by the Gantt reasonably well.

On the other hand, this strategy can generate a large number of AJAX calls to the backend API, since dhtmlxGantt has no batch-request support for AJAX
and the number of tasks and links is not limited. 

In that case, cascade deletion can be disabled using the [](api/config/cascade_delete.md) config. 
Thus, when a project branch is deleted, the client will send a delete request only for the top item and will expect the backend to delete the related links and subtasks.


## XSS, CSRF and SQL Injection Attacks

Pay attention that Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. 
It is important that responsibility for keeping an application safe is on the developers implementing the backend. 

Check the [](guides/app-security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application. 

