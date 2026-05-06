---
sidebar_label: batchUpdate
title: batchUpdate 方法
description: "一次性更新多个任务/链接"
---

# batchUpdate

### Description

@short: 一次性更新多个任务/链接

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *函数* - 回调函数
- `noRedraw` - (optional) *boolean* - 指定在回调函数执行后 Gantt 是否应重新绘制图表；true - 不重新绘制，false（默认） - 重新绘制

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
- [多选与缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

您可以使用此方法一次性更新多個任務/連結，只需一次重新渲染，而不是多次更新並伴隨多次重新渲染。

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)