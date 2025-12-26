---
sidebar_label: resource_assignment_store
title: resource_assignment_store config
description: "определяет имя datastore, который хранит назначения ресурсов"
---

# resource_assignment_store
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет имя datastore, который хранит назначения ресурсов

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Default value:** "resourceAssignments"

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Datastore настраивается автоматически.

Он создаётся только при включённой конфигурации [process_resource_assignments](api/config/process_resource_assignments.md).

Вы можете использовать этот datastore для программного управления назначениями ресурсов:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// после обновления назначений в datastore, 
// вызовите `updateTaskAssignments` для применения изменений к объекту задачи:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- добавлено в версии v7.1

