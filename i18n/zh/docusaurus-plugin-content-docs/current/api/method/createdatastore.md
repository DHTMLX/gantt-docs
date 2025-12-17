---
sidebar_label: createDatastore
title: createDatastore method
description: "基于给定配置创建一个datastore"
---

# createDatastore

### Description

@short: 基于给定配置创建一个datastore

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - 包含datastore配置的对象

### Returns
- ` datastore` - (datastore & treedatastore) - 根据指定的类型返回datastore或treedatastore对象

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

配置对象的属性:

  
- **name** - (*string*) - datastore的自定义字符串名称。该名称允许通过[getDatastore](api/method/getdatastore.md)访问datastore。
- **initItem? (item): any** - 可选，加载到datastore时用于预处理项的函数。此功能用于为datastore项设置默认值。函数接收:
    - **_item_** - (*any*) - 正在处理的资源项。
- **type?** - (*string*) - 可选，仅接受值 **"treeDatastore"**。指定type:"treeDatastore"会创建一个处理层级数据的datastore，使用 **id** 作为主键，**parent** 链接到父级id。其他任何值都会创建一个扁平列表datastore。
- **fetchTasks?** - (*boolean*) - 可选，启用时，在资源视图面板中显示分配给特定资源的所有任务。此功能适用于资源diagram和资源histogram布局。

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [Gantt 布局](guides/layout-config.md)
- [资源管理](guides/resource-management.md)

