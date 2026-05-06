---
sidebar_label: ignore_time
title: ignore_time 配置
description: "在时间刻度中隐藏一个时间单位"
---

# ignore_time

### Description

@short: 在时间刻度中隐藏一个时间单位

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

**ignore_time** 方法是一个接收单元格日期作为参数的函数。要隐藏一个时间单位，请对它返回 *true*。

### Related Guides
- [在刻度中隐藏时间单位](guides/custom-scale.md)