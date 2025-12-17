---
sidebar_label: ignore_time
title: ignore_time config
description: "hides a time unit in the time scale"
---

# ignore_time

### Description

@short: Hides a time unit in the time scale

@signature: ignore_time: GanttCallback

### Example

~~~jsx
// 0 refers to Sunday, 6 - to Saturday
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

### Details

The **ignore_time** method is a function that takes the cell's date as a parameter. To hide a unit - return *true* for it.

### Related Guides
- [Hiding Time Units in the Scale](guides/custom-scale.md)
