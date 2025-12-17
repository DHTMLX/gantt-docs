---
sidebar_label: createDatastore
title: createDatastore method
description: "создаёт datastore на основе заданной конфигурации"
---

# createDatastore

### Description

@short: Создаёт datastore на основе заданной конфигурации

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - объект, содержащий конфигурацию datastore

### Returns
- ` datastore` - (datastore & treedatastore) - возвращает объект datastore или treedatastore в зависимости от указанного типа

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

Свойства объекта конфигурации:

  
- **name** - (*string*) - пользовательское строковое имя для datastore. Это имя позволяет получить доступ к datastore через [getDatastore](api/method/getdatastore.md).
- **initItem? (item): any** - опционально, функция для предварительной обработки элементов при загрузке в datastore. Полезна для установки значений по умолчанию у элементов datastore. Функция принимает:
    - **_item_** - (*any*) - обрабатываемый ресурсный элемент.
- **type?** - (*string*) - опционально, принимает только значение **"treeDatastore"**. Указание type:"treeDatastore" создаёт datastore, который работает с иерархическими данными, используя **id** как первичный ключ и **parent** для связи с родительским id. Любое другое значение приводит к созданию плоского списка datastore.
- **fetchTasks?** - (*boolean*) - опционально, при включении отображает все задачи, назначенные конкретному ресурсу, в панели просмотра ресурсов. Эта функция работает как для resource diagram, так и для resource histogram layouts.

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [Макет Gantt](guides/layout-config.md)
- [Управление ресурсами](guides/resource-management.md)

