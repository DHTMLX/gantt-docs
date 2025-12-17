---
sidebar_label: isCircularLink
title: isCircularLink method
description: "验证链接是否为循环链接"
---

# isCircularLink
:::info
 此功能仅包含在 PRO 版本中。 
:::
### Description

@short: 验证链接是否为循环链接

@signature: isCircularLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - 链接对象

### Returns
- ` state` - (boolean) - 如果链接是循环链接则返回 true，否则返回 false

### Example

~~~jsx
var isCircular = gantt.isCircularLink(link);
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details
:::note
 该方法需要启用 [auto_scheduling](guides/extensions-list.md) 插件。 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

### Change log
- 版本 4.1 中新增

