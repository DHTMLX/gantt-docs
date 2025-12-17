---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale config
description: "Ermöglicht die Anzeige von Tasks, die außerhalb des definierten Datumsbereichs im Gantt-Diagramm liegen."
---

# show_tasks_outside_timescale

### Description

@short: Ermöglicht die Anzeige von Tasks, die außerhalb des definierten Datumsbereichs im Gantt-Diagramm liegen.

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
- ["Einrichten der Skala"](guides/configuring-time-scale.md#tasksoutsidetimescale)

### Change log
- hinzugefügt in v6.3

