---
sidebar_label: updateTaskAssignments
title: updateTaskAssignments method
description: "обновляет свойство resource объекта задачи на основе текущих назначений ресурсов, хранящихся в datastore"
---

# updateTaskAssignments
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Обновляет свойство resource объекта задачи на основе текущих назначений ресурсов, хранящихся в datastore

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Parameters

- `taskId` - (required) *number | string* - идентификатор задачи

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

// после изменения назначений в datastore  
// вызовите `updateTaskAssignments` для синхронизации этих изменений обратно в объект задачи:
gantt.updateTaskAssignments(taskId);
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Этот метод работает только при включенной конфигурации [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

Обычно хранилище назначений заполняется из объектов задач. Это означает, что если вы обновляете свойство resource в задаче (например, task.users), эти изменения автоматически отразятся в datastore.

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
Иногда может понадобиться обновить назначения наоборот - изменив их напрямую в datastore, а затем применив эти изменения обратно к объекту задачи. Для этого вызовите **gantt.updateTaskAssignments()**, чтобы обновить свойство resource задачи значениями из datastore:

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
- [Управление ресурсами](guides/resource-management.md#managingresourceassignments)

### Change log
- добавлено в версии v7.1

