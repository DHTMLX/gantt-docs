---
sidebar_label: lightbox_header
title: lightbox_header template
description: "指定 lightbox 的 header 部分"
---

# lightbox_header

### Description

@short: 指定 lightbox 的 header 部分

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (required) *Date* - 任务计划开始的日期   
- `end_date` - (required) *Date* - 任务计划完成的日期
- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 用于在 gantt 中渲染的 HTML 文本

### Example

~~~jsx
gantt.templates.lightbox_header = function(start_date,end_date,task){
    return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};
~~~

### Related Guides
- [Lightbox 的模板](guides/lightbox-templates.md)
