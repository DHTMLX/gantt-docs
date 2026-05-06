---
sidebar_label: tooltip_text
title: tooltip_text template
description: "задает текст подсказок"
---

# tooltip_text

### Description

@short: Определяет текст подсказок

@signature: tooltip_text: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (обязательно) *Date* - дата начала запланированной задачи
- `end` - (обязательно) *Date* - дата завершения запланированной задачи
- `task` - (обязательно) *Task* - объект задачи

### Returns
- ` text` - (string | void) - HTML-текст, который будет отображаться на диаграмме Ганта

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
Этот шаблон определяется в расширении **tooltip**, поэтому необходимо активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности читайте в статье [Tooltips for Gantt Elements](guides/tooltips.md).
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Шаблоны подсказок](guides/tooltip-templates.md)
- [Подсказки для элементов диаграммы Ганта](guides/tooltips.md)