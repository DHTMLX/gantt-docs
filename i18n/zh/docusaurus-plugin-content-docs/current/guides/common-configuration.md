---
title: "配置"
sidebar_label: "配置"
---

# 配置

为了实现所需的甘特图外观，dhtmlxGantt 提供了两个主要对象:

- [gantt.config](api/overview/properties-overview.md) - 包含与日期、刻度、控件等相关的配置选项。
- [gantt.templates](api/overview/templates-overview.md) - 包含用于格式化甘特图中显示的日期和标签的模板。

## 'gantt.config' 对象 {#ganttconfigobject}

所有的配置设置都在 **gantt.config** 对象中指定。

要应用某个选项，只需按照本说明文档中的方式进行赋值即可。

请注意，所有配置选项都需要在 dhtmlxGantt 初始化语句之前设置。

~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

如需了解 **gantt.config** 可用属性的完整列表，请参阅 ["Gantt API:Properties"](api/overview/properties-overview.md)。


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates' 对象

模板允许自定义日期和标签的显示方式。

通过如下所示的方式为模板赋值即可。请记得在初始化 dhtmlxGantt 之前声明模板。

~~~js
gantt.templates.task_text = function(start, end, task){
    return "<b>Text:</b> " + task.text + ",<b> Holders:</b> " + task.users;
};
gantt.init("gantt_here");
~~~

![gantt_templates](/img/gantt_templates.png)

您可以在 [Gantt API:Templates](api/overview/templates-overview.md) 部分找到所有可用模板的完整列表。


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)
