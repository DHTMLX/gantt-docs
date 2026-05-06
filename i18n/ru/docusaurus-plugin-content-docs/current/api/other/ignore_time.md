---
sidebar_label: ignore_time
title: Конфигурация ignore_time
description: "скрывает единицу времени на масштабе времени"
---

# ignore_time

### Description

@short: Скрывает единицу времени на масштабе времени

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

Метод **ignore_time** — это функция, которая принимает дату ячейки в качестве параметра. Чтобы скрыть единицу, верните *true* для неё.

### Related Guides
- [Скрытие единиц времени на шкале](guides/custom-scale.md)