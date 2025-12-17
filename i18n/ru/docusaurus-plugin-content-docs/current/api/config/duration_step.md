---
sidebar_label: duration_step
title: duration_step config
description: "определяет, сколько единиц 'gantt.config.duration_unit' составляет одну единицу свойства данных 'duration'."
---

# duration_step

### Description

@short: Определяет, сколько единиц 'gantt.config.duration_unit' составляет одну единицу свойства данных 'duration'.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//если task.duration = 2, задача будет длиться 6 часов (3*2)
~~~

**Default value:** 1

### Details

При установке единицы длительности в "hour" или "minute" рекомендуется оставлять [duration_step](api/config/duration_step.md) равным 1. Такая настройка позволяет использовать оптимизации для вычислений рабочего времени, которые корректно работают только при шаге, равном 1. Учтите, что существует значительная разница в производительности между "оптимизированным" и "неоптимизированным" режимами.

### Related API
- [duration_unit](api/config/duration_unit.md)

