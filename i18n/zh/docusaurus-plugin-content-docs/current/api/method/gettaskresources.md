---
sidebar_label: getTaskResources
title: getTaskResources method
description: "从数据存储返回分配给特定任务的唯一资源数组"
---

# getTaskResources

:::info
此功能仅在 PRO 版中提供。 
::: 

### Description

@short: 从数据存储中返回分配给特定任务的唯一资源数组

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (required) *string | number* -    任务 ID

### Returns
- `param` - (ResourceItem[]) - 资源对象数组

### Example

~~~jsx
gantt.getTaskResources(5); // -> 详情见示例
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 当 [process_resource_assignments](api/config/process_resource_assignments.md) 被禁用时，**getTaskResources** 方法不可用。 
::: 

该方法返回一个包含 **resourceItem** 对象的数组，这些对象具有以下属性：

- **id** - (*string | number*) - 资源项的 ID
- **open?** - (*boolean*) - 指示资源项在树中是否展开（*true*）还是折叠（*false*）
- **parent?** - (*string | number*) - 资源项父级的 ID
- **text?** - (*string*) - 资源名称
- **unit?** - (*string*) - 用于分配的单位
- **[customProperty: string]** - (*any*) - 任何自定义属性

~~~js
[
    {id: 6, text: "John", parent:1, unit: "hours/day" },
    {id: 7, text: "Mike", parent:2, unit: "hours/day" }
]
~~~

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md#assigningresources)

### Change log
- 新增于 v8.0