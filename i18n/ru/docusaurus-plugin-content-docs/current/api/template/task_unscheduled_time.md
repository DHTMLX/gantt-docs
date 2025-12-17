---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "устанавливает даты для незапланированных задач"
---

# task_unscheduled_time

### Description

@short: Устанавливает даты для незапланированных задач

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - HTML-текст, который будет отображён в grid для колонок с датами

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

По умолчанию возвращает пустую строку.

Если задача помечена как [unscheduled](guides/unscheduled-tasks.md) с помощью свойства `unscheduled:true` в её конфигурационном объекте, все её поля с датами будут отображаться как пустые строки. 
Посмотрите пример ниже:

:::note
Sample: [Отображение дат в незапланированных задачах](https://snippet.dhtmlx.com/t6skfgjx) 
:::

Если необходимо отобразить какие-то даты для незапланированной задачи, это можно сделать с помощью шаблона [date_grid](api/template/date_grid.md).

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [Базовые операции с задачами](guides/unscheduled-tasks.md)

