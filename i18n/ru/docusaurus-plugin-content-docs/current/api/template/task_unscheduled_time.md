---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time шаблон
description: "задает даты незапланированных задач"
---

# task_unscheduled_time

### Description

@short: Задает даты незапланированных задач

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - HTML-текст, который будет отображаться в сетке для столбцов с датами

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Показать незапланированные задачи](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

По умолчанию возвращает пустую строку.

Если задача является [unscheduled](guides/unscheduled-tasks.md), то есть имеет свойство `unscheduled:true` в её объекте конфигурации, все её даты будут отрисованы в пустых строках. 
Ниже приведён пример:

:::note
sample: [Отображение дат в незапланированных задачах](https://snippet.dhtmlx.com/t6skfgjx )
:::

Если вам нужно отобразить некоторые даты для незапланированной задачи, вы можете сделать это с помощью шаблона [date_grid](api/template/date_grid.md).

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [Основные операции с задачами](guides/unscheduled-tasks.md)