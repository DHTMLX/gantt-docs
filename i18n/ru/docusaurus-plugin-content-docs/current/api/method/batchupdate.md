---
sidebar_label: batchUpdate
title: batchUpdate метод
description: "обновляет сразу несколько задач/ссылок"
---

# batchUpdate

### Description

@short: Обновляет сразу несколько задач/ссылок

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - функция обратного вызова
- `noRedraw` - (optional) *boolean* - указывает, следует ли Gantt перерисовывать диаграмму после выполнения функции обратного вызова; true - не перерисовывать, а false (по умолчанию) - перерисовывать

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
- [Множественный выбор и Indent/Outdent задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

Вы можете использовать этот метод для обновления сразу нескольких задач/ссылок за одну перерисовку, вместо выполнения нескольких обновлений с несколькими перерисовками.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)