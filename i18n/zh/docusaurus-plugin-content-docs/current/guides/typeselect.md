---
title: "Typeselect 控件"
sidebar_label: "Typeselect 控件"
---

Typeselect 控件
======================

:::info
此功能仅在 PRO 版本中提供。
:::

这是一个用于更改[任务类型](guides/task-types.md)的选择框。

 它从 [types](api/config/types.md) 对象中获取选项，并使用默认的 onchange 处理器。除此之外，它的行为与 [Select Control](guides/select.md) 中描述的控件相同。

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


初始化
---------------------

要在 lightbox 中包含 **typeselect** 控件，只需像下面这样在 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- 每种任务类型都可以拥有自己的 lightbox，详见[为每种类型设置独立的 lightbox](guides/task-types.md#specificlightboxpertasktype)。可以创建新的任务类型，并为其定义自定义的 lightbox 布局。
- 当用户通过此控件更改[任务类型](guides/task-types.md)时，lightbox 会根据所选类型更新其结构。
- 此控件从 [types](api/config/types.md) 对象中获取选项，并使用默认的 onchange 处理器。
- **name="type"** 的 section 默认标签为"Type"。如需自定义该标签，可使用以下代码:

~~~js
gantt.locale.labels.section_type = "New label for the section";
~~~

属性
----------------

以下是 **typeselect** 控件常用的主要属性（完整列表见[此处](api/config/lightbox.md)）:

- **name** - (*string*) section 的名称
- **height** - (*number*) section 的高度
- **map_to** - (*string*) section 映射的数据属性
- **type** - (*string*) [控件类型](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) 若设置为 *true*，lightbox 打开时该 section 获得焦点
- **filter** - (*function*) 任务类型的过滤函数，接收类型名称作为参数

