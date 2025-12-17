---
sidebar_label: getTaskResources
title: getTaskResources method
description: "从数据存储中检索分配给特定任务的唯一资源列表"
---

# getTaskResources

:::info
 此功能仅包含在PRO版本中。 
:::
### Description

@short: 从数据存储中检索分配给特定任务的唯一资源列表

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (required) *string | number* -    任务的标识符

### Returns
- ` param` - (ResourceItem[]) - 包含资源对象的数组

### Example

~~~jsx
gantt.getTaskResources(5); // -> 详情见示例
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 如果 [process_resource_assignments](api/config/process_resource_assignments.md) 被禁用，**getTaskResources** 方法将无法工作。 
:::

此方法返回一个包含 **resourceItem** 对象的数组，这些对象具有以下属性:

- **id** - (*string | number*) - 资源项的ID
- **open?** - (*boolean*) - 指示资源项在树状结构中是否展开（*true*）或折叠（*false*）
- **parent?** - (*string | number*) - 资源项父项的ID
- **text?** - (*string*) - 资源名称
- **unit?** - (*string*) - 分配使用的单位
- **[customProperty: string]** - (*any*) - 任何额外的自定义属性


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
- [资源管理](guides/resource-management.md)

### Change log
- v8.0版本新增

