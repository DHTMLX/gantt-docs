---
sidebar_label: batchUpdate
title: batchUpdate method
description: "обновляет несколько задач/связей одновременно"
---

# batchUpdate

### Description

@short: Обновляет несколько задач/связей одновременно

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - функция обратного вызова
- `noRedraw` - (optional) *boolean* - необязательный параметр, определяет, должен ли Gantt перерисовывать диаграмму после выполнения функции обратного вызова; <i>true</i> означает без перерисовки, а <i>false</i> (по умолчанию) вызывает перерисовку

### Example

~~~jsx
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

Этот метод позволяет обновлять несколько задач или связей одновременно с одной перерисовкой, избегая множественных обновлений, каждое из которых вызывает отдельную перерисовку.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)

