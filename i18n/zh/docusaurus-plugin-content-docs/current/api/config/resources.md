---
sidebar_label: resources
title: resources config
description: "定义资源存储的附加设置"
---

# resources

### Description

@short: 定义资源存储的额外配置

@signature: resources: boolean | \{ dataprocessor_assignments?: boolean; dataprocessor_resources?: boolean; editable_resource_diagram?: boolean; resource_store?: \{ type?: string; initItem?: ((item: any) =\> any); fetchTasks?: boolean; \}; lightbox_resources?(resourceArray: any): any; \}

### Example

~~~jsx
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
    editable_resource_diagram: true,
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
    lightbox_resources: function selectResourceControlOptions(resources){
        const lightboxOptions = [];
        resources.forEach(function(res) {
            if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
            }
        });
        return lightboxOptions;
    }
};
~~~  

### Related samples
- [将资源值分配到特定日期](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

The **resources** 属性表示一个具有一组属性的对象：

- **dataprocessor_assignments** - (*boolean*) - 定义是否可以将修改后的资源分配作为带有持久化ID的单独条目发送到 DataProcessor
- **dataprocessor_resources** - (*boolean*) - 定义是否修改后的资源对象可以作为带有持久化ID的单独条目发送到 DataProcessor
- **editable_resource_diagram** - (*boolean*) - 定义资源分配是否可以在资源图中编辑
- **resource_store** - (*object*) - 创建默认的资源数据存储。该对象包括以下属性：
    - **_type?_** - (*string*) - 可选，仅接受一个固定值 **"treeDatastore"**。如果指定 type:"treeDatastore"，数据存储将支持层次数据，其中 **id** 属性为主键，**parent** 作为指向父级ID的链接。其他值将生成扁平列表数据存储。
    - **_initItem?_** - (*Function*): any - 可选，对加载到数据存储中的项进行预处理。这是设置数据存储项默认值的好地方。该函数接受以下参数：
        - **_item_** - (*any*) - 资源项
    - **_fetchTasks?_** - (*boolean*) - 可选，在资源视图面板中显示分配给某个资源的所有任务。这一功能同时适用于资源图和资源直方图布局类型。
- **lightbox_resources? (resourceArray): any** - 可选，一个函数，接收所有资源作为参数，必须返回一个应在灯箱资源控件中可用的资源数组。默认情况下，该控件将填充为没有子资源的资源。
    - **_resourceArray_** - (*any*) - 一个包含资源的数组

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- added in v8.0