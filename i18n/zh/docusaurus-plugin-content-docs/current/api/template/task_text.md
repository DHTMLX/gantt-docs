---
sidebar_label: task_text
title: task_text template
description: "设置显示在任务条和lightbox标题中的文本"
---

# task_text

### Description

@short: 设置显示在任务条和lightbox标题中的文本

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期  
- `end` - (required) *Date* - 任务预计完成的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | number | void) - 将在gantt中显示的HTML内容

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
