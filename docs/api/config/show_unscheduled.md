---
sidebar_label: show_unscheduled
title: show_unscheduled config
description: "enables showing unscheduled tasks"
---

# show_unscheduled

### Description

@short: Enables showing unscheduled tasks

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

Note, that by default, the unscheduled tasks are displayed as an empty row. To display them in the timeline area, you need to set the value of the **show_unscheduled** property to *false*.
This may be confusing to you, but we will fix the inconsistency between the name of the property and its values in one of the future versions.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [Basic Operations with Tasks](guides/unscheduled-tasks.md)

