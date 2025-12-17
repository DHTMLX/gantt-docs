---
sidebar_label: tooltip_text
title: tooltip_text template
description: "设置在tooltip中显示的文本"
---

# tooltip_text

### Description

@short: 设置在tooltip中显示的文本

@signature: tooltip_text: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期
- `end` - (required) *Date* - 任务计划结束的日期
- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string | void) - 将在gantt tooltip中显示的HTML字符串

### Example

~~~jsx
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"<br/><b>Start date:</b> " + 
    gantt.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+gantt.templates.tooltip_date_format(end);
};
~~~

### Details

:::note
 该模板是**tooltip**扩展的一部分，因此必须启用[tooltip](guides/extensions-list.md)插件。更多详情请参见[Gantt 元素的工具提示](guides/tooltips.md)文章。 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Tooltips 模板](guides/tooltip-templates.md)
- [Gantt 元素的工具提示](guides/tooltips.md)

