---
sidebar_label: onCircularLinkError
title: onCircularLinkError 事件
description: "在检测到循环引用且无法自动调度时触发"
---

# onCircularLinkError
:::info
此功能仅在 PRO 版中可用。
:::
### Description

@short: 在检测到循环引用且无法自动调度时触发

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (required) *Link* - 链接对象
- `group` - (required) *object* - 在循环中连接的任务和链接的一个组

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related samples
- [Auto Scheduling 扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

**group** 参数表示一个对象，其中包含一个在循环中连接的任务和链接的组。

~~~js
{ 
    tasks: [//循环中连接的任务ID], 
    links: [//循环中连接的链接ID]
}
~~~

:::note
该方法需要启用 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。
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
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

### Change log
- 参数 **group** 在版本 4.1 中新增。