---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale config
description: "позволяет отображать задачи, которые выходят за пределы заданного диапазона дат на диаграмме Ганта"
---

# show_tasks_outside_timescale

### Description

@short: Позволяет отображать задачи, которые выходят за пределы заданного диапазона дат на диаграмме Ганта

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
- [Tasks outside timescale](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)

### Related Guides
- [Настройка шкалы](guides/configuring-time-scale.md#tasksoutsidetimescale)

### Change log
- добавлено в версии v6.3

