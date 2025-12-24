---
title: "约束控件"
sidebar_label: "约束控件"
---

# 约束控件


:::info
此功能仅包含在 PRO 版本中。
:::

这是一种专门用于为[Gantt 任务指定时间约束](guides/auto-scheduling.md#timeconstraintsfortasks)的控件。

![Constraint control](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 初始化


要在 lightbox 中集成 **constraint** 控件，请按照以下步骤操作:

1. 在 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. 为该 section 定义标签:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 属性


以下是 **constraint** 控件常用的主要属性（完整列表请参见[此处](api/config/lightbox.md)）:

- **name** - (*string*) 标识 section 名称
- **type** - (*string*) 指定[section 控件](guides/default-edit-form.md#lightboxcontrols)的类型

