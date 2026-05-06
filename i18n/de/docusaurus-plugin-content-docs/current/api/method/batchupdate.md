---
sidebar_label: batchUpdate
title: batchUpdate Methode
description: "aktualisiert mehrere Aufgaben/Links auf einmal"
---

# batchUpdate

### Description

@short: aktualisiert mehrere Aufgaben/Links auf einmal

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (erforderlich) *Funktion* - die Callback-Funktion
- `noRedraw` - (optional) *boolean* - gibt an, ob Gantt nach der Callback-Funktion die Grafik neu zeichnen soll; true - nicht neu zeichnen und false (Standard) - neu zeichnen

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
- [Mehrfachauswahl und Einrücken/Ausrücken von Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

Sie können diese Methode verwenden, um mehrere Aufgaben/Verknüpfungen auf einmal mit einer einzigen Neuzeichnung zu aktualisieren, anstatt mehrere Aktualisierungen mit mehreren Neuzeichnungen durchzuführen.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)