---
sidebar_label: inherit_calendar
title: inherit_calendar 配置
description: "定义任务是否应从其汇总父任务继承工作日历"
---

# inherit_calendar

:::info
该功能仅在 PRO 版中可用。 
:::

### Description

@short: 定义任务是否应从其汇总父任务继承工作日历

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**默认值:** false

### Related samples
- [项目级日历](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details

:::note
该功能仅在 PRO 版中可用。
:::

默认情况下，未指定工作日历的任务将使用全局工作日历。

将此配置设置为 `true` 后，此类任务将使用其汇总（项目）父任务的日历。

### Related Guides
- [工作时间计算](guides/working-time.md)