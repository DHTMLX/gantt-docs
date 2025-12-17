---
sidebar_label: task_time
title: task_time template
description: "定义在lightbox标题中显示的日期范围"
---

# task_time

### Description

@short: 定义在lightbox标题中显示的日期范围

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 任务开始的日期  
- `end` - (required) *Date* - 任务预计完成的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string) - 在gantt中显示的html内容

### Example

~~~jsx
gantt.templates.task_time = function(start,end,task){
    return gantt.templates.task_date(start)+" - "+gantt.templates.task_end_date(end);
};
~~~

### Related API
- [task_date](api/template/task_date.md)
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Lightbox 的模板](guides/lightbox-templates.md)

