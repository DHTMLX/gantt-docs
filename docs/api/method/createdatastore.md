---
sidebar_label: createDatastore
title: createDatastore method
description: "creates a datastore according to the provided configuration"
---

# createDatastore

### Description

@short: Creates a datastore according to the provided configuration

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - a configuration object of a datastore

### Returns
- ` datastore` - (datastore & treedatastore) - the datastore or treedatastore object depending on the type

### Example

~~~jsx
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)

### Details

Configuration object properties:

  
- **name** - (*string*) - an arbitrary string name of the datastore. The datastore can be accessed by its name using [getDatastore](api/method/getdatastore.md).
- **initItem? (item): any** - optional, preprocesses items loaded into the datastore. It is a good place to set the default values of the datastore items. The function takes the following parameter:
    - **_item_** - (*any*) - the resource item.
- **type?** - (*string*) - optional, accepts only one fixed value **"treeDatastore"**. If the type:"treeDatastore" is specified, the datastore will support hierarchical data, with the **id** property as a primary key, and **parent** as a link to the parent id. Any other value will produce a flat list datastore.
- **fetchTasks?** - (*boolean*) - optional, enables showing all tasks assigned to a certain resource in the resource view panel. This functionality works both for the resource diagram and resource histogram types of layout.

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
- [Resource Management](guides/resource-management.md)

