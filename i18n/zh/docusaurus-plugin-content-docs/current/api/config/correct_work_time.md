---
sidebar_label: correct_work_time
title: correct_work_time config
description: "允许在拖动任务时调整任务的开始和结束日期，以适应工作时间内"
---

# correct_work_time

### Description

@short: 允许在拖动任务时调整任务的开始和结束日期，以适应工作时间内

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

此设置仅在启用 [work_time](api/config/work_time.md) 属性时生效。

<br>

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

