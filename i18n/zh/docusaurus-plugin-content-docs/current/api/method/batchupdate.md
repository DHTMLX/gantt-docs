---
sidebar_label: batchUpdate
title: batchUpdate method
description: "一次性更新多个任务/链接"
---

# batchUpdate

### Description

@short: 一次性更新多个任务/链接

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - 回调函数
- `noRedraw` - (optional) *boolean* - 可选，决定回调函数执行后Gantt是否重新绘制图表；<i>true</i>表示不重绘，<i>false</i>（默认）表示触发重绘

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

此方法允许一次性更新多个任务或链接，仅触发一次重绘，避免每次更新都引发单独的重绘操作。

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)

