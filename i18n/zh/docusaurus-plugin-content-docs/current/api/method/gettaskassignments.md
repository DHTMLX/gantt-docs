---
sidebar_label: getTaskAssignments
title: getTaskAssignments 方法
description: "从数据存储中返回特定任务的解析资源分配"
---

# getTaskAssignments

:::info
 此功能仅在 PRO 版本中可用。 
:::

### Description

@short: 从数据存储中返回特定任务的解析资源分配

@signature: getTaskAssignments: (taskId: string | number) => ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* -    任务ID

### Returns
- ` param` - (ResourceAssignment[]) - 一个包含该任务资源分配的对象数组

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> 查看详情
~~~

### Related samples
- [为特定日期分配资源值](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
如果禁用 [process_resource_assignments](api/config/process_resource_assignments.md)，则 **getTaskAssignments** 方法不可用。
:::

该方法返回一个包含对象的数组，形式如下：

~~~js
[
    {
        task_id: 5,
        id: 1617254693938, 
        delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 3
    },
    {
        task_id: 5,
        id: 1617254693946, 
        delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 6
    }
]
~~~

每个对象包含以下属性：

- **id** - (*string | number*) - 分配的 ID
- **task_id** - (*string | number*) - 分配到该资源的任务的 ID
- **resource_id** - (*string | number*) - 分配到该任务的资源的 ID
- **value** - (*number* | *string*) - 分配给任务的资源数量
- **delay** - (*number*) - 分配开始日期与任务开始日期之间的差值
- **start_date** - (*Date*) - 分配应开始的日期
- **end_date** - (*Date*) - 分配应结束的日期
- **duration** - (*number*) - 分配的持续时间
- **mode** - (*string*) - 资源分配时间的计算模式: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 任何自定义属性


:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* 将在启用 [process_resource_assignments](api/config/process_resource_assignments.md) 时自动填充。
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md#assigningresources)

### Change log
- added in v7.1