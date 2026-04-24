---
title: "约束控件"
sidebar_label: "约束控件"
---

# 约束控件

:::info
此功能仅包含在 PRO 版本中。
:::

一个用于设置 [甘特任务的时间约束](guides/auto-scheduling.md#timeconstraintsfortasks) 的复杂控件。

![约束控件](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~


[从项目开始与约束的自动排程](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 初始化

要将 **constraint** 控件添加到灯箱，请按照下列步骤执行：

1. 在灯箱配置中添加一个 section：

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. 为该 section 设置标签：

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~


[从项目开始与约束的自动排程](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 属性

以下属性对 **constraint** 控件非常重要且常被设置（完整列表请参阅 [此处](api/config/lightbox.md)）：

- **name** - (*string*) 节名称
- **type** - (*string*) 该 [section control](guides/default-edit-form.md#lightboxcontrols) 的类型