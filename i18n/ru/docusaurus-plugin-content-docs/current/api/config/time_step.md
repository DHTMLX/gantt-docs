---
sidebar_label: time_step
title: time_step config
description: "задаёт минимальный шаг (в минутах) для временных значений задачи"
---

# time_step

### Description

@short: Задаёт минимальный шаг (в минутах) для временных значений задачи

@signature: time_step: number

### Example

~~~jsx
gantt.config.time_step = 15;
...
gantt.init("gantt_here");
~~~

**Default value:** 60

### Details

- Время начала и окончания задач будет выравниваться по кратным значениям time_step. Например, если *time_step = 20*, задачи могут начинаться только в 0, 20, 40 минут и так далее.
- Селектор времени в lightbox будет следовать тому же шагу time_step.

:::note
 Чтобы задачи "прилипали" к шагу, определённому свойством **time_step** при перетаскивании, убедитесь, что конфигурация [round_dnd_dates](api/config/round_dnd_dates.md) установлена в *false*.
~~~js
gantt.config.round_dnd_dates = false;
~~~
 
:::

:::note
Sample: [Gantt. Drag'n'drop задач с минимальным шагом](https://snippet.dhtmlx.com/bd7ir3w7) 
 
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)

