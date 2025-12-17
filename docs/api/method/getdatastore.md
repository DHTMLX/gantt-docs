---
sidebar_label: getDatastore
title: getDatastore method
description: "returns the configuration object of a datastore"
---

# getDatastore

### Description

@short: Returns the configuration object of a datastore

@signature: getDatastore: (name: string) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - the name of the datastore

### Returns
- ` datastore` - (datastore & treedatastore) - the configuration object of a datastore

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

