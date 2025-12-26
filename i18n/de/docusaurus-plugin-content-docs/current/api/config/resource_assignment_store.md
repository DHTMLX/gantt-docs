---
sidebar_label: resource_assignment_store
title: resource_assignment_store config
description: "definiert den Namen des Datastores, der Resource Assignments hält"
---

# resource_assignment_store
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert den Namen des Datastores, der Resource Assignments hält

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Default value:** "resourceAssignments"

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Der Datastore wird automatisch eingerichtet.

Er wird nur erstellt, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist.

Sie können diesen Datastore verwenden, um Resource Assignments programmatisch zu verwalten:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// sobald Sie Assignments im Datastore aktualisieren, 
// rufen Sie `updateTaskAssignments` auf, um die Änderungen auf das Task-Objekt anzuwenden:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)

### Change log
- hinzugefügt in v7.1

