---
sidebar_label: batchUpdate
title: batchUpdate method
description: "updates multiple tasks/links at once"
---

# batchUpdate

### Description

@short: Updates multiple tasks/links at once

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - the callback function
- `noRedraw` - (optional) *boolean* - specifies if Gantt should repaint the chart after the callback function; true - not to repaint and false (by default) - to repaint

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

You can use this method to update multiple tasks/links at once with a single re-rendering instead of making multiple updates with multiple re-renderings.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)

