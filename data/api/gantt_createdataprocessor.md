createDataProcessor
=============

@short:
	creates a new dataProcessor instance and attaches it to gantt

@params:
- config	DataProcessorConfig | RouterFunction | RouterConfig 		dataProcessor configuration object

@returns: 
- dataProcessor		object		the dataProcessor object


@example:
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});


@template:	api_method

@descr:

The method can take one of the following types of parameters:

- <span class=subproperty>**DataProcessorConfig**</span> - (*object*) - object specifying one of the predefined modes of sending the data
    - **_url_** - (*string*) - the URL to the server side
    - **_mode?_** - (*string*) - optional, the mode of sending data to the server: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - optional, defines whether the task must be deleted from the gantt only after a successful response from the server. Dependency links and subtasks will be deleted after the deletion of the parent task is confirmed.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~



- <span class=submethod>**RouterFunction (entity, action, data, id): Promise**</span> - the router function to process changes in Gantt
    - **_entity_** - (*string*) - the name of the relevant entity. Possible values: "task"|"link"|"resource"|"assignment"
    - **_action_** - (*string*) - the name of the relevant action. Possible values:  "create"|"update"|"delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - the processed object
    - **_id_** - (*string | number*) - the id of a processed object



~~~js
// entity - "task"|"link"|"resource"|"assignment"
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


- <span class=subproperty>**RouterConfig**</span> - (*object*) - the router configuration for different entities
    - **_task?_** - (*RouterForEntity*) - the router object for tasks
    - **_link?_** - (*RouterForEntity*) - the router object for links
    - **_resource?_** - (*RouterForEntity*) - the router object for resources
    - **_assignment?_** - (*RouterForEntity*) - the router object for assignments


The **RouterForEntity** object has the following properties:

- <span class=submethod>**create (data): Promise**</span> - a function to process adding items
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - the processed item
- <span class=submethod>**update (data, id): Promise**</span> - a function to process updating items
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - the processed item
    - **_id_** - (*string | number*) - the id of a processed item
- <span class=submethod>**delete (id): Promise**</span> - a function to process deleting items
    - **_id_** - (*string | number*) - the id of a processed item


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

All the functions of the router object should return either a Promise or a data response object. This is needed for the dataProcessor to apply the database id and to hook **onAfterUpdate** event of the data processor.

~~~js
router = function(entity, action, data, id) {
	return new gantt.Promise(function(resolve, reject) {
    	// … some logic
        return resolve({tid: databaseId});
 	});
}
~~~

Thus you can use DataProcessor for saving data in localStorage, or any other storage which is not linked to a certain URL, or in case if there are two different servers (URLs) responsible for creation and deletion of objects.


### Saving Resources and Resource Assignments

By default, the DataProcessor doesn't receive updates of resources and resource assignments. 
However, you can enable this feature via a [separate config](desktop/server_side.md#routingcrudactionsofresourcesandresourceassignments).

@related:
	desktop/server_side.md

@relatedsample:
	08_api/22_data_processor.html

@changelog:
the **deleteAfterConfirmation** parameter is added in v8.0