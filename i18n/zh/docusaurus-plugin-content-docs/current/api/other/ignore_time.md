---
sidebar_label: ignore_time
title: ignore_time config
description: "在时间刻度中隐藏某个时间单位"
---

# ignore_time

### Description

@short: 在时间刻度中隐藏某个时间单位

@signature: ignore_time: GanttCallback

### Example

~~~jsx
// 0 代表星期天，6 代表星期六
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

### Details

**ignore_time** 方法通过接收单元格的日期作为参数来工作。如果你想隐藏某个特定的时间单位，只需对该日期返回 *true* 即可。

### Related Guides
- [在时间刻度中隐藏时间单位](guides/custom-scale.md)
