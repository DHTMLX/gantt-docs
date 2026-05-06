---
sidebar_label: getDatastore
title: getDatastore 方法
description: "返回 datastore 的配置对象"
---

# getDatastore

### Description

@short: 返回 datastore 的配置对象

@signature: getDatastore: (name: string) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - datastore 的名称

### Returns
- ` datastore` - (datastore & treedatastore) - datastore 的配置对象

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [带资源面板的甘特图](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)