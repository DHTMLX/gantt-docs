---
sidebar_label: updateTaskAssignments
title: updateTaskAssignments method
description: "aktualisiert die resource-Eigenschaft des task-Objekts basierend auf den aktuellen Ressourcenzuweisungen, die im Datastore gespeichert sind"
---

# updateTaskAssignments

### Description

@short: Aktualisiert die resource-Eigenschaft des task-Objekts basierend auf den aktuellen Ressourcenzuweisungen, die im Datastore gespeichert sind

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Parameters

- `taskId` - (required) *number | string* - die ID der Aufgabe

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

// Sobald die Zuweisungen im Datastore geändert wurden,  
// rufen Sie `updateTaskAssignments` auf, um diese Änderungen zurück zum task-Objekt zu synchronisieren:
gantt.updateTaskAssignments(taskId);
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::

:::note
 Diese Methode funktioniert nur, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist. 
:::

Typischerweise wird der Assignments Store aus den task-Objekten gefüllt. Das bedeutet, wenn Sie die resource-Eigenschaft einer Aufgabe (z.B. task.users) aktualisieren, erscheinen diese Änderungen automatisch im Datastore.

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
Manchmal möchten Sie die Zuweisungen auch andersherum aktualisieren - indem Sie sie direkt im Datastore ändern und diese Änderungen dann auf das task-Objekt zurückübertragen. Dafür rufen Sie **gantt.updateTaskAssignments()** auf, um die resource-Eigenschaft der Aufgabe mit den Werten aus dem Datastore zu aktualisieren:

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
- ["Ressourcenmanagement"](guides/resource-management.md#managingresourceassignments)

### Change log
- hinzugefügt in v7.1

