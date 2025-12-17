---
sidebar_label: getTaskAssignments
title: getTaskAssignments method
description: "从数据存储中获取特定任务的解析资源分配信息"
---

# getTaskAssignments
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 从数据存储中获取特定任务的解析资源分配信息

@signature: getTaskAssignments: (taskId: string | number) =\> ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* -    任务的ID

### Returns
- ` param` - (ResourceAssignment[]) - 表示任务资源分配的对象数组

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> 查看详情
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 如果 [process_resource_assignments](api/config/process_resource_assignments.md) 被禁用，**getTaskAssignments** 方法将无法工作。 
:::

该方法返回一个对象数组，结构如下:

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

每个对象包含以下属性:

- **id** - (*string | number*) - 该分配的唯一ID
- **task_id** - (*string | number*) - 资源被分配的任务ID
- **resource_id** - (*string | number*) - 分配给任务的资源ID
- **value** - (*number | string*) - 分配给任务的资源数量
- **delay** - (*number*) - 分配开始日期与任务开始日期的偏移量
- **start_date** - (*Date*) - 分配计划开始时间
- **end_date** - (*Date*) - 分配计划结束时间
- **duration** - (*number*) - 分配持续时间
- **mode** - (*string*) - 计算资源分配时间的方法:"default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 任何额外的自定义属性

:::note
 仅当 [process_resource_assignments](api/config/process_resource_assignments.md) 启用时，属性 *delay*, *duration*, *start_date*, *end_date*, *id*, 和 *mode* 会被自动填充。 
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- v7.1版本新增

