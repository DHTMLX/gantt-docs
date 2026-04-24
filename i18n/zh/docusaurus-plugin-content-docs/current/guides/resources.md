---
title: "资源控制"
sidebar_label: "资源控制"
---

# 资源控制

:::info
此功能仅在 PRO 版中提供。
:::

一种用于将多个资源及其数量分配给一个任务的复杂控件，用于 [资源管理](guides/resource-management.md#assigningresources)。
 
![Resources control server options](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 { name: "owner", height: 60, type: "resources", default_value: 8},   /*!*/
 { name: "time", type: "duration", map_to: "auto"}
];
~~~


[分配多个资源](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


或者

![Resources control options](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to:"text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type: "resources", map_to: "rooms", options: [  /*!*/
  	  { key: 1, label: "room 1", unit: "hours" },    /*!*/
	  { key: 2, label: "room 2", unit: "hours" },   /*!*/
	  { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }	   /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
您也可以创建 [自定义控件，以将多个资源分配给任务](guides/custom-editor.md#customthirdpartyeditor)。
:::

## 初始化

要将 **resources** 控件添加到灯箱，请按以下步骤操作：

1. 在灯箱配置中添加一个节：

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type:"resources" }	   /*!*/
];
~~~

2. 为该节设置标签：

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


## 属性

以下属性对于 **resources** 控件而言通常比较重要且常被设置（完整列表请参见 [此处](api/config/lightbox.md)）：

- **name** - (*string*) 区段名称 
- **map_to** - (*string*) 将映射到该区段的数据属性的名称
- **type** - (*string*) [区段控件](guides/default-edit-form.md#lightboxcontrols) 的类型
- **options** - (*array*) 一个对象数组。定义控件的选择项（用于 **select**、**checkbox**、**radio** 和 **resources** 控件）。
  数组中的每个对象指定一个选项，并包含以下属性：
    - **key** - (*string*) 选项 ID。此属性会与任务数据属性进行比较，以将选项分配给任务
    - **label** - (*string*) 选项标签
    - **unit** - (*number*) 资源的计量单位
- **focus** - (*boolean*) 如果设置为 *true*，打开灯箱时该区段将获取焦点
- **default_value** - (*any*) 该区段控件的默认值。如果资源的值未定义，将应用该默认值。来自 **options** 数组的每个选项都可以指定自己的默认值。

:::note
默认情况下，资源控件映射到 [resource_property](api/config/resource_property.md) 配置中指定的属性，因此可以省略 **map_to** 选项。
::
:::note
默认情况下，资源控件会通过 [resource datastore](guides/resource-management.md#working-with-resource-view-panel) 的 `gantt.serverList("resourceOptions")` [collection](api/method/serverlist.md) 自动填充。只有当你想要改变默认行为时，才需要手动指定选项列表。
:::

## 用数据填充控件

从 v8.0 开始，资源控件默认从 [resource Datastore](guides/resource-management.md#working-with-resource-view-panel) 获取选项。

如果你使用 Gantt 创建的默认资源数据存储，并初始化的 [资源控件] 未带有 **options** 参数，它将连接到 **gantt.serverList("resourceOptions")** 集合。该集合将由资源数据存储中的资源填充。你可以通过代码访问选项：

~~~js
const options = gantt.serverList("resourceOptions");
~~~

请注意，在资源加载到数据存储之前，options 数组将为空。

你也可以使用自定义选项列表来更新此集合：

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

请注意，如果之后将资源加载到 gantt 中，gantt 将更新此集合并覆盖你的修改。

如果你想控制哪些资源进入灯箱，可以重新定义 **gantt.config.resources.lightbox_resources** 配置：

~~~js
gantt.config.resources = {
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

如果你手动创建资源数据存储，则需要自行为资源控件填充选项。

通常，要为 **resources** 控件设置值，请使用 [options](api/config/lightbox.md) 参数：

~~~js
gantt.config.lightbox.sections = [
    { name:"rooms",type:"resources",map_to:"rooms",
        options:[
            { key: 1, label: "room 1", unit: "hours" },
            { key: 2, label: "room 2", unit: "hours" },
            { key: 3, label: "room 3", unit: "hours" }
        ]
    }
];
~~~

在 [options](api/config/lightbox.md) 参数中的项有 3 个必填属性：

- **key** - 选项 id
- **label** - 选项标签
- **unit** - 资源的计量单位


## 从服务器填充控件数据

要从服务器填充控件，请将 [options](api/config/lightbox.md) 选项设置为由 [serverList](api/method/serverlist.md) 方法返回的值：

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name: "resources", type: "resources", map_to: "owner_id", default_value:8,
     options: gantt.serverList("resourceOptions")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~


可以在选项可用时使用 [updateCollection](api/method/updatecollection.md) 方法定义 `gantt.serverList("resourceOptions")` 的内容：

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~

[分配多个资源](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)