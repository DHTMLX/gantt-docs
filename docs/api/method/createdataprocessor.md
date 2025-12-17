---
sidebar_label: createDataProcessor
title: createDataProcessor method
description: "creates a new dataProcessor instance and attaches it to gantt"
---

# createDataProcessor

### Description

@short: Creates a new dataProcessor instance and attaches it to gantt

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* -         dataProcessor configuration object

### Returns
- ` dataProcessor` - (object) - the dataProcessor object

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

The method can take one of the following types of parameters:

- **DataProcessorConfig** - (*object*) - object specifying one of the predefined modes of sending the data
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


- **RouterFunction (entity, action, data, id): Promise | object | void** - the router function to process changes in Gantt
    - **_entity_** - (*string*) - the name of the relevant entity. Possible values are: "task"|"link"|"resource"|"assignment"
    - **_action_** - (*string*) - the name of the relevant action. Possible values are:  "create"|"update"|"delete"
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


- **RouterConfig** - (*object*) - the router configuration for different entities
    - **_task?_** - (*RouterForEntity*) - the router object for tasks
    - **_link?_** - (*RouterForEntity*) - the router object for links
    - **_resource?_** - (*RouterForEntity*) - the router object for resources
    - **_assignment?_** - (*RouterForEntity*) - the router object for assignments


The **RouterForEntity** object has the following properties:

- **create (data): Promise** - a function to process adding of items
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - the processed item
- **update (data, id): Promise** - a function to process updating of items
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - the processed item
    - **_id_** - (*string | number*) - the id of a processed item
- **delete (id): Promise** - a function to process deleting of items
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


## Saving Resources and Resource Assignments

By default, the DataProcessor doesn't receive updates of resources and resource assignments. 
However, you can enable this feature via a [separate config](guides/server-side.md#resources_crud).

### Related Guides
- [Server-Side Integration](guides/server-side.md)

### Change log
- the **deleteAfterConfirmation** parameter is added in v8.0
