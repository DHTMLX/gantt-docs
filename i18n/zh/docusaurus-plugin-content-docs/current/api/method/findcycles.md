---
sidebar_label: findCycles
title: findCycles 方法
description: "返回图表中的所有依赖环路"
---

# findCycles

:::info
 此功能仅包含在PRO版本中。 
:::

### Description

@short: 返回图表中的所有依赖环路

@signature: findCycles: () =\> any[]

### Returns
- `cycles` - (array) - 在甘特图中发现的依赖环路数组

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
该方法需要先激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。
:::

每个 *cycles* 数组元素都是组成一个循环的一组任务和链接。

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

请看下面的示例：

- 任务 #3 的 id = 10
- 任务 #4.1 的 id = 12
- 从任务 #3 结束到任务 #4 开始的链接 id = 1
- 从任务 #4.1 结束到任务 #3 开始的链接 id = 2

The *gantt.findCycles* 方法将返回以下值：

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 4.1版本新增

