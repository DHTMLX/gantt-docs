---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale конфигурация
description: "позволяет отображать задачи за пределами заданного диапазона дат на диаграмме Ганта"
---

# show_tasks_outside_timescale

### Description

@short: Позволяет отображать задачи за пределами заданного диапазона дат на диаграмме Ганта

@signature: show_tasks_outside_timescale: boolean

### Example

~~~jsx
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Задачи за пределами временного диапазона](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)

### Related Guides
- [Настройка масштаба времени](guides/configuring-time-scale.md)

### Change log
- добавлено в версии v6.3