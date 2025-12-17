---
sidebar_label: deadlines
title: deadlines config
description: "enables or disables the display of deadline elements for tasks"
---

# deadlines

### Description

@short: Enables or disables the display of deadline elements for tasks

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

This config enables or disables the display of deadline elements for tasks. If enabled, Gantt will check the `task.deadline` property, and if it contains a valid date, the deadline element will be displayed in the timeline.

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- added in v9.0
