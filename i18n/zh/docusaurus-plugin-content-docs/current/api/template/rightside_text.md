---
sidebar_label: rightside_text
title: rightside_text template
description: "定义任务条右侧显示的文本"
---

# rightside_text

### Description

@short: 定义任务条右侧显示的文本

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 任务开始的日期
- `end` - (required) *Date* - 任务计划完成的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | number | void) - 将在 gantt 中显示的 HTML 字符串

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
- [显示任务内容](guides/text-block-for-task.md)

