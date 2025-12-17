---
sidebar_label: findCycles
title: findCycles method
description: "返回甘特图中所有检测到的依赖循环"
---

# findCycles
:::info
 此功能仅包含在PRO版本中。 
:::
### Description

@short: 返回甘特图中所有检测到的依赖循环

@signature: findCycles: () =\> any[]

### Returns
- ` cycles` - (array) - 一个数组，包含在甘特图中检测到的依赖循环

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details
:::note
 该方法需要启用 [auto_scheduling](guides/extensions-list.md#zidongpaicheng) 插件。 
:::

*cycles* 数组中的每个条目代表一组形成循环的任务和链接。

~~~js
[ 
    { 
        tasks: [//参与循环的任务ID], 
        links: [//参与循环的链接ID]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

以下是一个示例供参考:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- 任务 #3 的 id = 10
- 任务 #4.1 的 id = 12
- 从任务 #3 结束到任务 #4 开始的链接 id = 1
- 从任务 #4.1 结束到任务 #3 开始的链接 id = 2

*gantt.findCycles* 方法将返回以下结果:

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

### Change log
- 4.1版本新增

