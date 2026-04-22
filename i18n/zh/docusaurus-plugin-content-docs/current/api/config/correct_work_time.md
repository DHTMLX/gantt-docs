---
sidebar_label: correct_work_time
title: correct_work_time 配置
description: "在拖动时将任务的开始和结束日期调整到工作时间"
---

# correct_work_time

### Description

@short: 在拖动时将任务的开始和结束日期调整到工作时间

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
 
gantt.init("gantt_here");
~~~

**默认值:** false

### Related samples
- [拖动时正确的任务位置](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

此设置仅在启用 [work_time](api/config/work_time.md) 属性时生效。


![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [工作时间计算](guides/working-time.md)