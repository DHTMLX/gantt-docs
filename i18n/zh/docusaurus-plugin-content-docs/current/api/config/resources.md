---
sidebar_label: resources
title: resources config
description: "定义资源存储的附加设置"
---

# resources

### Description

@short: 定义资源存储的附加设置

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
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

**resources** 设置是一个包含多个选项的对象:

- **dataprocessor_assignments** - (*boolean*) - 决定资源分配的更改是否作为带有持久 ID 的独立条目发送给 DataProcessor
- **dataprocessor_resources** - (*boolean*) - 控制资源对象的更改是否作为带有持久 ID 的独立条目发送给 DataProcessor
- **editable_resource_diagram** - (*boolean*) - 控制是否可以直接在资源图(resource diagram)中编辑资源分配
- **resource_store** - (*object*) - 配置默认的资源数据存储，包含以下属性:
    - **_type?_** - (*string*) - 可选，仅接受固定值 **"treeDataStore"**。设置为此值时，数据存储支持使用 **id** 作为主键，**parent** 作为父级 id 引用的层级数据。其他值则为扁平列表数据存储。
    - **_initItem?_** - (*Function*): any - 可选，允许对加载到数据存储的条目进行预处理，适合设置默认值。函数接收:
        - **_item_** - (*any*) - 正在处理的资源条目
    - **_fetchTasks?_** - (*boolean*) - 可选，启用后在资源视图面板(resource view panel)中显示分配给资源的所有任务。适用于资源图(resource diagram)和资源柱状图(resource histogram)布局。
- **lightbox_resources? (resourceArray): any** - 可选，接收所有资源的函数，返回一个数组，表示在 lightbox 的资源控件(resource control)中显示的资源。默认仅包含没有子资源的资源。
    - **_resourceArray_** - (*any*) - 资源对象数组

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- added in v8.0
