---
sidebar_label: resource_assignment_store
title: конфигурация resource_assignment_store
description: "указывается имя хранилища данных, которое хранит назначения ресурсов"
---

# resource_assignment_store

:::info
Эта функциональность доступна только в PRO-издании.
:::

### Description

@short: Указывает имя хранилища данных, которое хранит назначения ресурсов

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Значение по умолчанию:** "resourceAssignments"

### Related samples
- [Назначение значений ресурсов на конкретные дни](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Хранилище данных создается автоматически.

Хранилище создается только если включена конфигурация [process_resource_assignments](api/config/process_resource_assignments.md).

Хранилище можно использовать для изменения назначений ресурсов из кода:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// after assignments are updated in the datastore, you need 
// to call `updateTaskAssignments` to write changes to the task object:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- added in v7.1