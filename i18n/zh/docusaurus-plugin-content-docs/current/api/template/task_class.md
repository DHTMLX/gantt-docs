---
sidebar_label: task_class
title: task_class template
description: "定义应用于任务条的 CSS 类"
---

# task_class

### Description

@short: 定义应用于任务条的 CSS 类

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期  
- `end` - (required) *Date* - 任务计划结束的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | void) - 分配给该项的 CSS 类

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
