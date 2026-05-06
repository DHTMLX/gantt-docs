---
sidebar_label: duration_step
title: duration_step конфигурация
description: "устанавливает количество единиц 'gantt.config.duration_unit', соответствующих одной единице свойства данных 'duration'."
---

# duration_step

### Description

@short: Устанавливает количество единиц 'gantt.config.duration_unit', которые будут соответствовать одной единице данных свойства 'duration'.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours (3*2)
~~~

**Значение по умолчанию:** 1

### Details

Если вы укажете единицу продолжительности как "hour" или "minute", рекомендуется установить [duration_step](api/config/duration_step.md) в 1.

Такая комбинация активирует определённые оптимизации вычисления рабочего времени, которые работают только когда шаг установлен на 1. Примечание: между режимами "optimized" и "non-optimized" существуют существенные различия в производительности.

### Related API
- [duration_unit](api/config/duration_unit.md)