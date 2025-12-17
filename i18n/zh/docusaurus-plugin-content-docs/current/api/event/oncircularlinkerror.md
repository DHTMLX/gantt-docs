---
sidebar_label: onCircularLinkError
title: onCircularLinkError event
description: "当检测到循环引用且自动排程无法继续时触发"
---

# onCircularLinkError
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 当检测到循环引用且自动排程无法继续时触发

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (required) *Link* - 链接对象
- `group` - (required) *object* - 形成循环的一组任务和链接集合

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // 在这里编写您的自定义逻辑
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

**group** 参数包含一个对象，表示参与循环的任务和链接的集合。

~~~js
{ 
    tasks: [//循环中连接的任务ID], 
    links: [//循环中连接的链接ID]
}
~~~


:::note
 该方法需要启用 [auto_scheduling](guides/extensions-list.md#zidongpaicheng) 插件。 
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
- **group** 参数在版本4.1中引入。

