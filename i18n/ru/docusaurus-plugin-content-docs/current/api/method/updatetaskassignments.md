---
sidebar_label: updateTaskAssignments
title: метод updateTaskAssignments
description: "Обновляет свойство ресурса объекта задачи значениями назначений ресурсов из хранилища данных"
---

# updateTaskAssignments

:::info
Эта функциональность доступна только в PRO-версии. 
:::

### Описание

@short: Обновляет свойство ресурса объекта задачи значениями назначений ресурсов из хранилища данных

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Параметры

- `taskId` - (обязательный) *number | string* - идентификатор задачи

### Пример

~~~jsx
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


### Связанные примеры
- [Назначение значений ресурсов на конкретные дни](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Подробности
:::note
Этот метод доступен только при включении конфигурации [process_resource_assignments](api/config/process_resource_assignments.md).
:::

По умолчанию хранилище назначений заполняется данными из объектов задачи. Это означает, что если вы измените свойство ресурса объекта задачи (например, task.users), изменения будут автоматически отражены в хранилище данных.

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

Возможно, вам понадобится обновить данные назначений в обратном направлении. Например, чтобы изменить назначение ресурсов с использованием API хранилища данных, а затем применить изменения к объекту задачи. В этом случае вам нужно обновить свойство ресурса объекта задачи значениями из хранилища данных, вызвав метод **gantt.updateTaskAssignments()**:

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

### Связанные API
- [resource_assignment_store](api/config/resource_assignment_store.md)
- [resource_property](api/config/resource_property.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Связанные руководства
- [Управление ресурсами](guides/resource-management.md#managingresourceassignments)

### История изменений
- добавлено в v7.1