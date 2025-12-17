---
sidebar_label: task_row_class
title: task_row_class template
description: "指定应用于timeline区域行的CSS类"
---

# task_row_class

### Description

@short: 指定应用于timeline区域行的CSS类

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 任务开始的日期  
- `end` - (required) *Date* - 任务结束的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | void) - 为正在处理的项目返回一个CSS类

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

为指定的项目提供CSS类。

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
