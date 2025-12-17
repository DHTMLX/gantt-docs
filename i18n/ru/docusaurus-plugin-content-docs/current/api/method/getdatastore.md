---
sidebar_label: getDatastore
title: getDatastore method
description: "возвращает объект конфигурации для datastore"
---

# getDatastore

### Description

@short: Возвращает объект конфигурации для datastore

@signature: getDatastore: (name: string) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - имя datastore

### Returns
- ` datastore` - (datastore & treedatastore) - объект конфигурации для указанного datastore

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

