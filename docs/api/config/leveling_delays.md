---
sidebar_label: leveling_delays
title: leveling_delays config
description: "shows the resource leveling delay of tasks in the timeline"
---

# leveling_delays
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Shows the resource leveling delay of tasks in the timeline

@signature: leveling_delays: boolean

### Example

~~~jsx
gantt.config.leveling_delays = true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Resource leveling delay](https://docs.dhtmlx.com/gantt/samples/11_resources/16_leveling_delay.html)

### Details

If the config is enabled, Gantt draws the `leveling_delay` of a task as a hatched area next to the task bar. In forward scheduling, the area lies before the bar. With backward scheduling ([schedule_from_end](api/config/auto_scheduling.md#schedule_from_end)), it lies after the bar.

The length of the area is the `leveling_delay` value, as calendar time in [duration_unit](api/config/duration_unit.md). Non-working time is included. Gantt draws no area for [summary tasks](api/method/issummarytask.md), for tasks with `hide_bar`, and for unscheduled tasks.

The label and the tooltip of the area come from the [leveling_delay_text](api/template/leveling_delay_text.md) template.

When the date range of the chart is calculated from the tasks, it includes the delay areas.

Set the config before [init](api/method/init.md). To change it later, call `gantt.init()` again.

To change the color of the area, set the `--dhx-gantt-leveling-delay-color` variable. By default, it is the task bar color:

~~~css
:root {
    --dhx-gantt-leveling-delay-color: #7a7a7a;
}
~~~

### Related API
- [leveling_delay_text](api/template/leveling_delay_text.md)
- [duration_unit](api/config/duration_unit.md)

### Related Guides
- [Resource Leveling and Paused Tasks](guides/resource-leveling.md#show-delay-in-timeline)

### Change log
- added in v10.1
