--- 
title: "配置"
sidebar_label: "配置"
---

# 配置

要实现甘特图的期望外观，dhtmlxGantt 提供两种对象：

- [gantt.config](api/overview/properties-overview.md) - 日期、刻度、控件等的配置选项。
- [gantt.templates](api/overview/templates-overview.md) - 在甘特图中用于日期和标签显示的格式化模板。

## 'gantt.config' object {#ganttconfigobject}

所有配置选项都在 **gantt.config** 对象中声明。

要设置所需的选项，请按本文档中的描述进行编写。

请注意，配置选项应放在与 dhtmlxGantt 初始化相关的代码行之前。

~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

请查看完整的 **gantt.config** 属性列表，请参阅 [Gantt API:Properties](api/overview/properties-overview.md) 章节。

**相关示例**: [Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

## 'gantt.templates' object {#gantttemplatesobject}

模板可用于改变日期和标签的显示。

要定义一个模板，请按本文档中的描述进行编写。请记住，模板的定义应放在 dhtmlxGantt 初始化的代码行之前。

~~~js
gantt.templates.task_text =
    (start, end, task) => `<b>Text:</b> ${task.text},<b> Holders:</b> ${task.users}`;

gantt.init("gantt_here");
~~~

![gantt_templates](/img/gantt_templates.png)

请在 [Gantt API:Templates](api/overview/templates-overview.md) 小节中查看可用模板的完整列表。

**相关示例**: [通过事件样式化任务条](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)