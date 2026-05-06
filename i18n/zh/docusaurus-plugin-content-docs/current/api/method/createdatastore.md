---
sidebar_label: createDatastore
title: createDatastore 方法
description: "根据提供的配置创建一个数据存储"
---

# createDatastore

### Description

@short: 根据提供的配置创建 datastore

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - 一个数据存储的配置对象

### Returns
- ` datastore` - (datastore & treedatastore) - 根据类型返回 datastore 或 treedatastore 对象

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
- [带资源面板的甘特图](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)
- [资源负载图](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [资源直方图](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)

### Details

配置对象属性：

- **name** - (*string*) - 数据存储的任意字符串名称。可以通过其名称使用 [getDatastore](api/method/getdatastore.md) 进行访问。
- **initItem? (item): any** - 可选，对加载到数据存储中的项进行预处理。这是设置数据存储项默认值的好地方。该函数接受以下参数：
    - **_item_** - (*any*) - 资源项。
- **type?** - (*string*) - 可选，仅接受固定值 **"treeDatastore"**。如果指定 type:"treeDatastore"，数据存储将支持分层数据，其中 **id** 属性为主键，**parent** 为指向父级 id 的连接。其他任何值将产生一个扁平列表数据存储。
- **fetchTasks?** - (*boolean*) - 可选，启用在资源视图面板中显示分配给某个资源的所有任务的功能。此功能同时适用于资源图和资源直方图布局类型。

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [甘特图布局](guides/layout-config.md)
- [资源管理](guides/resource-management.md)