---
sidebar_label: roundTaskDates
title: roundTaskDates method
description: "调整任务的开始和结束日期，使其与时间线刻度上的最近日期对齐"
---

# roundTaskDates

### Description

@short: 调整任务的开始和结束日期，使其与时间线刻度上的最近日期对齐

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
// 拖动父任务时，同时拖动其子任务
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move){
        var diff = task.start_date - original.start_date;

        gantt.eachTask(function(child){
            child.start_date = new Date(+child.start_date + diff);
            child.end_date = new Date(+child.end_date + diff);
            gantt.refreshTask(child.id, true);
        },id );
    }
    return true;
});

// 将子项的位置四舍五入到刻度
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
     var modes = gantt.config.drag_mode;
     if(mode == modes.move ){
         gantt.eachTask(function(child){
            gantt.roundTaskDates(child);  /*!*/
            gantt.refreshTask(child.id, true);
         },id );
     }
});
~~~

### Details

- 此方法会遵循已配置的工作时间设置。
- 它可能会在调整过程中修改任务的持续时间。
- 当在 onbeforedragend 事件中使用时，四舍五入行为会根据拖放操作进行调整:例如，"move"操作会调整任务日期但不改变持续时间，而"resize"操作则会根据调整方向改变持续时间以及开始或结束日期。
