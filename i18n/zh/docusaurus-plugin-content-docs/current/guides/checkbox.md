---
title: "复选框控件"
sidebar_label: "复选框控件"
---

# 复选框控件

一个两态复选框控件。该控件用于开启/关闭一个选项或多个值。

例如，它在以下场景中很有帮助：

- [将资源分配给任务](guides/resource-management.md)

![复选框控件](/img/checkbox_control.png)

[复选框控件](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)

- 切换 [拆分任务的分割模式和树形模式之间](guides/split-tasks.md)

![拆分任务复选框](/img/split_task_checkbox.png)


~~~js
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[    /*!*/
        {key:"split", label:"Split Task"}                            /*!*/                        
    ]},                                                                /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~


[拆分任务](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## 初始化

要将 **复选框控件** 添加到灯箱，请遵循以下步骤：

1) 向灯箱配置中添加一个部分：

~~~js
var opts = [
    {key:"split", label:"Split Task"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:opts},            /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~


2) 为该部分设置标签：

~~~js
gantt.locale.labels.section_split = "Display";
~~~
  

[拆分任务](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## 属性

以下属性对 **复选框控件** 来说最重要且常用（完整列表请参阅 [这里](api/config/lightbox.md)）：

- **name** - (*string*) 该部分的名称
- **map_to** - (*string*) 将映射到该部分的数据属性的名称
- **type** - (*string*) [该部分控件的类型](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) 一个对象数组。定义控件的选项（用于 **select**、**checkbox**  和 **radio** 控件）。数组中的每个对象表示一个选项，并包含以下属性：
    - **key** - (*string*) 选项的标识符
    - **label** - (*string*) 选项标签
- **focus** - (*boolean*) 如果设置为 *true*，打开灯箱时该部分将获得焦点
- **default_value** - (*any*) 该部分控件的默认值。仅在输入值未定义时应用
  


## 使用数据填充控件

通常，要为 **复选框控件** 设置值，请使用 [options](api/config/lightbox.md) 参数：

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~


-[options](api/config/lightbox.md) 参数中的条目有 2 个必填属性：

- **key** - (*string*) 选项的标识符
- **label** - (*string*) 选项标签