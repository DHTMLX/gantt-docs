---
title: "未计划任务"
sidebar_label: "未计划任务"
---

# 未计划任务

可以在甘特图中添加没有具体日期的任务。

![unscheduled_tasks](/img/unscheduled_tasks.png)

实现方法是在任务描述中将 **unscheduled** 属性设置为 *true*:

~~~js
{"id":1, "text":"Project #1", "type":"project", "progress": 0.6, "open": true},
{"id":2, "text":"Task #1", "unscheduled":false, "start_date":"02-04-2019", "parent":"1"},
{"id":3, "text":"Task #2", "unscheduled":true,"start_date":"","duration":"","parent":"1"}
~~~

这样，id 为 "3" 的任务将在甘特图中显示为没有开始日期，并以空行的形式展示。

如需启用未计划任务的显示，请将配置参数 [show_unscheduled](api/config/show_unscheduled.md) 设置为 *false*:

~~~js
gantt.config.show_unscheduled = false;
~~~

请注意，甘特图会为未计划任务分配默认日期。这意味着这些任务的 **start_date/end_date** 属性不会保持为空:

~~~js
var task = gantt.getTask(3);
console.log(task.unscheduled);
// true

console.log(task.start_date);
// Tue Jun 25 2019 18:42:50
~~~


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

