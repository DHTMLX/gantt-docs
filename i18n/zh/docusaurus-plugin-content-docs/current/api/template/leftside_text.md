---
sidebar_label: leftside_text
title: leftside_text template
description: "定义显示在任务条左侧的文本"
---

# leftside_text

### Description

@short: 定义显示在任务条左侧的文本

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期
- `end` - (required) *Date* - 任务预期完成的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | number | void) - 将在 gantt 图中显示的 HTML 文本

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter({
    format: ["day"]
});

gantt.templates.leftside_text = function(start, end, task){
    return formatter.format(task.duration);
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [rightside_text](api/template/rightside_text.md)

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
- [显示任务内容](guides/text-block-for-task.md)
- [格式化器扩展](guides/formatters-ext.md)

