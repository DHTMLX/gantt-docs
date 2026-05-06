---
sidebar_label: getDatastore
title: метод getDatastore
description: "возвращает объект конфигурации хранилища данных"
---

# getDatastore

### Description

@short: Возвращает объект конфигурации хранилища данных

@signature: getDatastore: (name: string) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - имя хранилища данных

### Returns
- ` datastore` - (datastore & treedatastore) - объект конфигурации хранилища данных

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Диаграмма Ганта с панелью ресурсов](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)