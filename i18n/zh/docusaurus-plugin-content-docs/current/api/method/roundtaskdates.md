---
sidebar_label: roundTaskDates
title: roundTaskDates 方法
description: "将开始任务和结束任务的日期四舍五入到时间刻度中的最近日期"
---

# roundTaskDates

### Description

@short: 将开始和结束任务的日期四舍五入到时间刻度中的最近日期

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (必填) *Task* - 任务对象

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

- 该方法会考虑指定的工作时间。

- 该方法可能会改变任务的持续时间。

- 如果该方法从 onbeforedragend 调用，将根据拖放操作的类型对日期进行四舍五入（例如 "move" 操作将改变任务的日期而不影响持续时间，"resize" 操作将改变任务的持续时间以及任务的一个日期：start 或 end，具体取决于调整方向）