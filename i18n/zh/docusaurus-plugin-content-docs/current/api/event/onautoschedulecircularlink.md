---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink event
description: "在自动排程过程中检测到依赖循环时触发"
---

# onAutoScheduleCircularLink
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 在自动排程过程中检测到依赖循环时触发

@signature: onAutoScheduleCircularLink: (groups: any[]) =\> void;

### Parameters

- `groups` - (required) *array* - 包含甘特图中识别出的依赖循环的数组

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // 在此处编写任何自定义逻辑
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 此方法需要启用[auto_scheduling](guides/extensions-list.md#zidongpaicheng)插件。 
:::

当此事件发生时，任务保持不变。

*groups* 参数包含一个数组，数组中是甘特图中发现的依赖循环。  
数组中的每个元素代表一组形成循环的任务和链接。

~~~js
[ 
    { 
        tasks: [// 循环中涉及的任务ID], 
        links: [// 循环中涉及的链接ID]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

请查看下面的示例:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- 任务 #3 的 id = 10
- 任务 #4.1 的 id = 12
- 从任务 #3 结束到任务 #4 开始的链接 id = 1
- 从任务 #4.1 结束到任务 #3 开始的链接 id = 2

*groups* 参数将包含以下组对象:

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
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

### Change log
- 4.1版本新增

