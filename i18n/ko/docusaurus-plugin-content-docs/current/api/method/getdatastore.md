---
sidebar_label: getDatastore
title: getDatastore 메서드
description: "데이터스토어의 구성 객체를 반환합니다"
---

# getDatastore

### Description

@short: 데이터스토어의 구성 객체를 반환합니다

@signature: getDatastore: (name: string) => DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - 데이터스토어의 이름

### Returns
- ` datastore` - (datastore & treedatastore) - 데이터스토어의 구성 객체

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)