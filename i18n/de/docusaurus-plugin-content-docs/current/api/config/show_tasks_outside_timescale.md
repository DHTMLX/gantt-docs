---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale Konfiguration
description: "ermöglicht das Anzeigen von Aufgaben, die außerhalb des angegebenen Datumsbereichs im Gantt-Diagramm liegen"
---

# show_tasks_outside_timescale

### Description

@short: Aktiviert das Anzeigen von Aufgaben, die außerhalb des angegebenen Datumsbereichs im Gantt-Diagramm liegen

@signature: show_tasks_outside_timescale: boolean

### Example

~~~jsx
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Aufgaben außerhalb der Zeitskala](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)

### Related Guides
- [Einrichten der Zeitskala](guides/configuring-time-scale.md)

### Change log
- Hinzugefügt in v6.3