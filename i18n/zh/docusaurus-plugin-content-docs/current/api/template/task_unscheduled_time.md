---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "指定未计划任务的日期"
---

# task_unscheduled_time

### Description

@short: 指定未计划任务的日期

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string | void) - 将在显示日期值的grid列中渲染的HTML文本

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

默认情况下，返回一个空字符串。

当任务通过在其配置对象中设置 `unscheduled:true` 属性被标记为[未计划](guides/unscheduled-tasks.md)时，所有日期字段将显示为空行。  
请查看下面的示例:

:::note
Sample: [Rendering dates in unscheduled tasks](https://snippet.dhtmlx.com/t6skfgjx)
:::

如果需要为未计划任务显示某些日期，可以使用 [date_grid](api/template/date_grid.md) 模板来实现。

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [任务的基本操作](guides/unscheduled-tasks.md)

