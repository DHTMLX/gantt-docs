---
sidebar_label: tooltip_text
title: tooltip_text template
description: "задаёт текст, отображаемый в tooltip'ах"
---

# tooltip_text

### Description

@short: Задаёт текст, отображаемый в tooltip'ах

@signature: tooltip_text: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата, когда задача планируется к началу
- `end` - (required) *Date* - дата, когда задача планируется к завершению
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - HTML-строка, которая будет отображаться в tooltip'е диаграммы Ганта

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
 Этот шаблон является частью расширения **tooltip**, поэтому плагин [tooltip](guides/extensions-list.md#tooltip) должен быть включён. Более подробную информацию можно найти в статье [Тултипы для элементов Gantt](guides/tooltips.md). 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Шаблоны тултипов](guides/tooltip-templates.md)
- [Тултипы для элементов Gantt](guides/tooltips.md)

