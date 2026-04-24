---
sidebar_label: getTaskResources
title: getTaskResources Methode
description: "gibt das Array eindeutiger Ressourcen zurück, die einem bestimmten Task aus dem Datenspeicher zugewiesen sind"
---

# getTaskResources

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt das Array eindeutiger Ressourcen zurück, die einem bestimmten Task aus dem Datenspeicher zugewiesen sind

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (erforderlich) *string | number* - die Aufgaben-ID

### Returns
- ` param` - (ResourceItem[]) - ein Array von ResourceItem-Objekten

### Example

~~~jsx
gantt.getTaskResources(5); // -> see details
~~~

### Related samples
- [Ressourcenwerte bestimmten Tagen zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Die **getTaskResources**-Methode ist nicht verfügbar, wenn [process_resource_assignments](api/config/process_resource_assignments.md) deaktiviert ist. 
:::

Die Methode gibt ein Array von **resourceItem**-Objekten zurück, die die folgenden Eigenschaften besitzen:

- **id** - (*string | number*) - die ID des Ressourcen-Items
- **open?** - (*boolean*) - gibt an, ob das Ressourcen-Item im Baum erweitert (*true*) oder eingeklappt (*false*) ist
- **parent?** - (*string | number*) - die ID des übergeordneten Elements des Ressourcen-Items
- **text?** - (*string*) - der Ressourcenname
- **unit?** - (*string*) - die Einheit für die Zuordnungen
- **[customProperty: string]** - (*any*) - jede benutzerdefinierte Eigenschaft


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
- [Ressourcenverwaltung](guides/resource-management.md#assigningresources)

### Change log
- hinzugefügt in v8.0

