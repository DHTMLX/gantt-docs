---
sidebar_label: getDatastore
title: getDatastore method
description: "gibt das Konfigurationsobjekt für einen Datastore zurück"
---

# getDatastore

### Description

@short: Gibt das Konfigurationsobjekt für einen Datastore zurück

@signature: getDatastore: (name: string) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - der Name des Datastores

### Returns
- ` datastore` - (datastore & treedatastore) - das Konfigurationsobjekt für den angegebenen Datastore

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

