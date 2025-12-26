---
sidebar_label: getResourceAssignments
title: getResourceAssignments method
description: "返回指定资源关联的所有任务"
---

# getResourceAssignments
:::info
 该功能仅包含在PRO版本中。 
:::
### Description

@short: 返回指定资源关联的所有任务

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) =\> ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - 资源的标识符
- `taskId` - (optional) *string | number* - 任务的标识符

### Returns
- ` assignments` - (ResourceAssignment[]) - 表示分配给资源的任务对象数组

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> 显示详情
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

此方法返回一个对象数组，结构如下:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

每个对象包含以下属性:

- **id** - (*string | number*) - 分配的唯一标识符
- **task_id** - (*string | number*) - 分配给资源的任务ID
- **resource_id** - (*string | number*) - 分配给任务的资源ID
- **value** - (*number | string*) - 分配给任务的资源数量
- **delay** - (*number*) - 分配开始日期与任务开始日期之间的偏移量
- **start_date** - (*Date*) - 分配计划开始时间
- **end_date** - (*Date*) - 分配计划结束时间
- **duration** - (*number*) - 分配持续时间
- **mode** - (*string*) - 计算资源分配时间的模式: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 任何额外的自定义属性


:::note
note 属性 *delay*, *duration*, *start_date*, *end_date*, *id* 和 *mode* 仅在启用 [process_resource_assignments](api/config/process_resource_assignments.md) 时自动填充。 
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- 从v7.1开始，返回的对象包含 *delay*, *duration*, *start_date*, *end_date*, *id* 和 *mode* 属性

