---
sidebar_label: getTaskResources
title: getTaskResources method
description: "Ruft eine Liste eindeutiger Ressourcen ab, die einer bestimmten Aufgabe im Datenspeicher zugewiesen sind"
---

# getTaskResources
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Ruft eine Liste eindeutiger Ressourcen ab, die einer bestimmten Aufgabe im Datenspeicher zugewiesen sind

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (required) *string | number* -    Die Kennung der Aufgabe

### Returns
- ` param` - (ResourceItem[]) - Ein Array mit Ressourcenobjekten

### Example

~~~jsx
gantt.getTaskResources(5); // -> siehe Details
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Die **getTaskResources** Methode funktioniert nicht, wenn [process_resource_assignments](api/config/process_resource_assignments.md) deaktiviert ist. 
:::

Diese Methode gibt ein Array von **resourceItem** Objekten mit folgenden Eigenschaften zurück:

- **id** - (*string | number*) - Die ID des Ressourcenobjekts
- **open?** - (*boolean*) - Gibt an, ob das Ressourcenobjekt im Baum erweitert (*true*) oder eingeklappt (*false*) ist
- **parent?** - (*string | number*) - Die ID des übergeordneten Ressourcenobjekts
- **text?** - (*string*) - Der Name der Ressource
- **unit?** - (*string*) - Die Einheit, die für Zuweisungen verwendet wird
- **[customProperty: string]** - (*any*) - Beliebige zusätzliche benutzerdefinierte Eigenschaft

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
- ["Ressourcenmanagement"](guides/resource-management.md#assigningresources)

### Change log
- hinzugefügt in v8.0

