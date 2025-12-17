---
sidebar_label: batchUpdate
title: batchUpdate method
description: "aktualisiert mehrere Aufgaben/Links gleichzeitig"
---

# batchUpdate

### Description

@short: Aktualisiert mehrere Aufgaben/Links gleichzeitig

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - die Callback-Funktion
- `Diagramm` - (required) *nach* - der Callback-Funktion neu gezeichnet werden soll; <i>true</i> bedeutet kein Neuzeichnen, und <i>false</i> (Standard) löst ein Neuzeichnen aus

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

Diese Methode ermöglicht es, mehrere Aufgaben oder Links gleichzeitig zu aktualisieren, mit nur einem einzigen Neuzeichnen, wodurch mehrere Updates vermieden werden, die jeweils ein separates Neuzeichnen auslösen.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)

