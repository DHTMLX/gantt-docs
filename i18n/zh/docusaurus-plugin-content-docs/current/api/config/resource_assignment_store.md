---
sidebar_label: resource_assignment_store
title: resource_assignment_store config
description: "定义存储资源分配信息的数据存储名称"
---

# resource_assignment_store
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义存储资源分配信息的数据存储名称

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Default value:** "resourceAssignments"

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

该数据存储会自动设置。

仅当启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时才会创建。

您可以使用此数据存储以编程方式管理资源分配:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// 当您更新 datastore 中的分配后，
// 调用 `updateTaskAssignments` 以将更改应用到任务对象：
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- 版本 7.1 中新增

