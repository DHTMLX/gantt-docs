---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale config
description: "enables showing tasks that are outside the specified date range in the Gantt chart"
---

# show_tasks_outside_timescale

### Description

@short: Enables showing tasks that are outside the specified date range in the Gantt chart

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
- [Setting up Scale](guides/configuring-time-scale.md)

### Change log
- added in v6.3

