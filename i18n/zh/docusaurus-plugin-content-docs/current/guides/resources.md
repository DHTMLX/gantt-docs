---
title: "资源控制"
sidebar_label: "资源控制"
---

资源控制
===================

:::info
此功能仅包含在 PRO 版本中。
:::

这是一个多功能控件，用于[为任务分配多个资源及其数量](guides/resource-management.md#ziyuanfenpei)。

![资源控件服务器选项](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", default_value:8},   /*!*/
 {name: "time", type: "duration", map_to: "auto"}
];
~~~


[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


或者，

![资源控件选项](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:[  /*!*/
        { key: 1, label: "room 1", unit: "hours" },    /*!*/
      { key: 2, label: "room 2", unit: "hours" },   /*!*/
      { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }       /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
你也可以创建[自定义控件来为任务分配多个资源](guides/custom-editor.md#zidingyidisanfangbianjiqi)。
:::

初始化
------------

要在 lightbox 中包含 **resources** 控件，请按照以下步骤操作:

1. 向 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources" }       /*!*/
];
~~~

2. 为该 section 定义一个标签:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


属性
-------------

以下是 **resources** 控件常用的主要属性（完整细节见[此处](api/config/lightbox.md)）:

- **name** - (*string*) section 名称 
- **map_to** - (*string*) section 映射的数据属性名
- **type** - (*string*) [section](guides/default-edit-form.md#lightboxcontrols) 的控件类型
- **options** - (*array*) 定义控件可选项的对象数组（*用于 **select**、**checkbox**、**radio** 及 **resources** 控件*）。每个对象包含:
    - **key** - (*string*) 选项 id，与任务数据属性匹配
    - **label** - (*string*) 选项标签
    - **unit** - (*number*) 资源的计量单位
- **focus** - (*boolean*) 如果为 true，lightbox 打开时该 section 获得焦点
- **default_value** - (*any*) 控件的默认值，当资源值未定义时使用。每个选项可有自己的默认值。

:::note
默认情况下，资源控件会映射到 [resource_property](api/config/resource_property.md) 中定义的属性，因此 **map_to** 可选。
:::
:::note
默认情况下，资源控件会自动从[资源数据存储](guides/resource-management.md#shiyongziyuanshitumianban)通过 `gantt.serverList("resourceOptions")` [集合](api/method/serverlist.md)获取数据。只有在你想覆盖此行为时才需手动设置 options。
:::

为控件填充数据
-------------------------------

自 v8.0 起，资源控件会自动从[资源数据存储](guides/resource-management.md#shiyongziyuanshitumianban)获取选项。

如果你使用 Gantt 提供的默认资源数据存储，[资源控件](guides/resources.md) 在未设置 **options** 参数时会自动关联 **gantt.serverList("resourceOptions")** 集合，该集合由数据存储中的资源填充。你可以这样在代码中访问这些选项:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

请注意，在资源被加载到数据存储前，options 数组将为空。

你也可以用自定义选项列表更新此集合:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

注意，如果你在更新此集合后又加载了资源数据，这些更改会被覆盖。

如需控制 lightbox 中显示哪些资源，可重定义 **gantt.config.resources.lightbox_resources** 配置:

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

通常，设置 **resources** 控件的值时，使用 [options](api/config/lightbox.md) 参数:

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

[options](api/config/lightbox.md) 数组中的每一项必须包含:

- **key** - 选项 id
- **label** - 选项标签
- **unit** - 资源的计量单位


通过服务器为控件填充数据
---------------------------------------------

若要通过服务器为控件填充数据，将 [options](api/config/lightbox.md) 属性设置为 [serverList](api/method/serverlist.md) 方法返回的值:

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


当选项可用时，可以使用 [updateCollection](api/method/updatecollection.md) 方法为 `gantt.serverList("resourceOptions")` 设置内容:

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~


[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)

