createDataProcessor
=============

@short:
	creates a new dataProcessor instance and attaches it to gantt

@params:
- config	string,object 		dataProcessor configuration object

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

1\. `{url:string, mode:string, deleteAfterConfirmation:boolean}` object specifying one of the predefined modes of sending data

~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

where:

- url - the URL to the server side
- mode - the mode of sending data to the server: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
- deleteAfterConfirmation - defines whether the task must be deleted from the gantt only after a successful response from the server. Dependency links and subtasks will be deleted after the deletion of the parent task is confirmed.

2\. Or a custom router object:

~~~js
var dp = gantt.createDataProcessor(router);
~~~

where the router is either a function:

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

or an object of the following structure:

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