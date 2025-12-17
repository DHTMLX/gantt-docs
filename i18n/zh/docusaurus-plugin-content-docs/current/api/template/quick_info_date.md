---
sidebar_label: quick_info_date
title: quick_info_date template
description: "设置弹出编辑表单中显示的日期"
---

# quick_info_date

### Description

@short: 设置弹出编辑表单中显示的日期

@signature: quick_info_date: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期
- `end` - (required) *Date* - 任务计划结束的日期
- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 显示在甘特图中的html内容

### Example

~~~jsx
gantt.templates.quick_info_date = function(start, end, task){
       return gantt.templates.task_time(start, end, task);
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 该模板是**Quick Info**扩展的一部分，请确保已启用[quick_info](guides/extensions-list.md)插件。 
:::

### Related Guides
- ['Quick Info' 扩展的模板（触控支持）](guides/touch-templates.md)
