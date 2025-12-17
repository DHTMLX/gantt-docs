---
sidebar_label: inherit_calendar
title: inherit_calendar config
description: "定义任务是否应继承其汇总父任务的工作日历"
---

# inherit_calendar
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 定义任务是否应继承其汇总父任务的工作日历

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Default value:** false

### Related samples
- [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details


默认情况下，未指定工作日历的任务将使用全局工作日历。

当此选项设置为 `true` 时，这些任务将采用其汇总（项目）父任务的日历。

### Related Guides
- [工作时间计算](guides/working-time.md)
