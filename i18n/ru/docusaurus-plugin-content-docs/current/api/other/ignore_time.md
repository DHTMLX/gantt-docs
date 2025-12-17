---
sidebar_label: ignore_time
title: ignore_time config
description: "скрывает единицу времени на временной шкале"
---

# ignore_time

### Description

@short: Скрывает единицу времени на временной шкале

@signature: ignore_time: GanttCallback

### Example

~~~jsx
// 0 соответствует воскресенью, 6 - субботе
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

### Details

Метод **ignore_time** принимает дату ячейки в качестве параметра. Если вы хотите скрыть определённую единицу времени, просто верните *true* для этой даты.

### Related Guides
- [Скрытие временных единиц на шкале](guides/custom-scale.md)
