---
sidebar_label: inherit_calendar
title: inherit_calendar config
description: "defines whether tasks should inherit work calendars from their summary parents"
---

# inherit_calendar

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Defines whether tasks should inherit work calendars from their summary parents

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Default value:** false

### Related samples
- [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details

:::note
pronote This functionality is available in the PRO edition only. 
:::

By default, tasks that don't have work calendar specified will use the global work calendar.

After setting this config to `true`, such tasks will use a calendar of their summary (project) parent task.

### Related Guides
- [Work Time Calculation](guides/working-time.md)
