---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime method
description: "根据工作时间重新计算任务持续时间"
---

# correctTaskWorkTime

### Description

@short: 根据工作时间重新计算任务持续时间

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

此方法在以下配置选项启用时有效:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [工作时间计算](guides/working-time.md)
