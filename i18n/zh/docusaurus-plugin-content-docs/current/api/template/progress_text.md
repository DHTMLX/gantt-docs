---
sidebar_label: progress_text
title: progress_text template
description: "定义任务条中已完成部分显示的文本"
---

# progress_text

### Description

@short: 定义任务条中已完成部分显示的文本

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期  
- `end` - (required) *Date* - 任务预计完成的日期
- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string | number | void) - 将在 gantt 内部显示的 HTML 文本

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Related samples
- [Text in the Progress bar](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
