---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime 方法
description: "在工作时间内重新计算任务的持续时间"
---

# correctTaskWorkTime

### Description

@short: 在工作时间内重新计算任务的时长

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 该任务对象

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

该方法需要指定以下配置选项：

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [工作时间计算](guides/working-time.md)