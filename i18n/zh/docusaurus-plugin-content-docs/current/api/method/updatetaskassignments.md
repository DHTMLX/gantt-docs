---
sidebar_label: updateTaskAssignments
title: updateTaskAssignments method
description: "根据数据存储中当前的资源分配，更新任务对象的 resource 属性"
---

# updateTaskAssignments
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 根据数据存储中当前的资源分配，更新任务对象的 resource 属性

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Parameters

- `taskId` - (required) *number | string* - 任务 ID

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// 一旦数据存储中的分配发生变化，  
// 调用 `updateTaskAssignments` 将这些更新同步回任务对象：
gantt.updateTaskAssignments(taskId);
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 该方法仅在启用了 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时有效。 
:::

通常，assignments store 是从任务对象中填充的。这意味着如果你更新任务上的 resource 属性（例如 task.users），这些更改会自动反映到数据存储中。

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00",
        end_date: "05-04-2019 00:00",
    }
];
gantt.updateTask(taskId);
~~~

<br>
有时，你可能想反向更新分配--直接在数据存储中更改它们，然后将这些更改应用回任务对象。为此，调用 **gantt.updateTaskAssignments()** 用数据存储中的值刷新任务的 resource 属性:

~~~js
var taskId = 2;
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
assignmentStore.addItem({
    task_id: taskId,
    resource_id: 3,
    value: 8,
    delay: 1
})
gantt.updateTaskAssignments(taskId);


console.log(gantt.getTask(taskId));
// -> { id: 2, users: [{resource_id: 3, value: 8, delay: 1, start_date: ...}], ...)
~~~

### Related API
- [resource_assignment_store](api/config/resource_assignment_store.md)
- [resource_property](api/config/resource_property.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md#guanliziyuanfenpei)

### Change log
- v7.1 版本新增

