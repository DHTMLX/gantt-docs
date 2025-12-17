---
sidebar_label: getDatastore
title: getDatastore method
description: "返回数据存储的配置对象"
---

# getDatastore

### Description

@short: 返回数据存储的配置对象

@signature: getDatastore: (name: string) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - 数据存储的名称

### Returns
- ` datastore` - (datastore & treedatastore) - 指定数据存储的配置对象

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

