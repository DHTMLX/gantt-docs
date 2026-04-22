---
sidebar_label: resource_assignment_store
title: resource_assignment_store config
description: "gibt den Namen des Datastore an, der Ressourcenzuordnungen speichert"
---

# resource_assignment_store

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

### Description

@short: Gibt den Namen des Datastore an, der Ressourcenzuordnungen speichert

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Standardwert:** "resourceAssignments"

### Related samples
- [Ressourcenzuweisungen bestimmten Tagen zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Der Datastore wird automatisch erstellt.

Der Datastore wird nur erstellt, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist.

Der Datastore kann verwendet werden, um Ressourcenzuordnungen aus dem Code zu ändern:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// nachdem Zuordnungen im Datastore aktualisiert wurden, müssen Sie 
// `updateTaskAssignments` aufrufen, um die Änderungen am Task-Objekt zu schreiben:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md)

### Change log
- hinzugefügt in v7.1