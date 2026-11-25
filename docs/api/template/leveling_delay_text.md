---
sidebar_label: leveling_delay_text
title: leveling_delay_text template
description: "specifies the text of the resource leveling delay area"
---

# leveling_delay_text
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Specifies the text of the resource leveling delay area

@signature: leveling_delay_text: (task: Task, delay: number, unit: string) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - the task object
- `delay` - (required) *number* - the `leveling_delay` value of the task
- `unit` - (required) *string* - the unit of the delay, the value of the [duration_unit](api/config/duration_unit.md) config

### Returns
- ` text` - (string | number | void) - the HTML content of the delay area. Its text is also used as the tooltip of the area. The default template returns the delay with a short unit name, for example "+2d".

### Example

~~~jsx
gantt.config.leveling_delays = true;
gantt.templates.leveling_delay_text = function(task, delay, unit) {
    return "delay " + delay + " d";
};
~~~

### Related samples
- [Resource leveling delay](https://docs.dhtmlx.com/gantt/samples/11_resources/16_leveling_delay.html)

### Details

The template is used when the [leveling_delays](api/config/leveling_delays.md) config is enabled. If the area is 40 px wide or less, Gantt does not show the text inside it. The tooltip still shows the text.

### Related API
- [leveling_delays](api/config/leveling_delays.md)

### Related Guides
- [Resource Leveling and Paused Tasks](guides/resource-leveling.md#show-delay-in-timeline)

### Change log
- added in v10.1
