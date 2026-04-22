---
sidebar_label: getTaskAssignments
title: getTaskAssignments method
description: "gibt die geparsten Ressourcen-Zuordnungen einer bestimmten Aufgabe aus dem Datenspeicher zurück"
---

# getTaskAssignments

:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar. 
:::

### Description

@short: Gibt die geparsten Ressourcen-Zuordnungen einer bestimmten Aufgabe aus dem Datenspeicher

@signature: getTaskAssignments: (taskId: string | number) => ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* - die Aufgaben-ID

### Returns
- ` param` - (ResourceAssignment[]) - ein Array von Objekten mit den Ressourcenzuordnungen der Aufgabe

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> see details
~~~

### Verwandte Beispiele
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Die Methode **getTaskAssignments** ist nicht verfügbar, wenn [process_resource_assignments](api/config/process_resource_assignments.md) deaktiviert ist. 
:::

Die Methode gibt ein Array mit Objekten wie folgt zurück:

~~~js
[
    {
        task_id: 5,
        id: 1617254693938, 
        delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 3
    },
    {
        task_id: 5,
        id: 1617254693946, 
        delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 6
    }
]
~~~

Jedes Objekt enthält die folgenden Eigenschaften:

- **id** - (*string | number*) - die ID der Zuordnung
- **task_id** - (*string | number*) - die ID der Aufgabe, der die Ressource zugewiesen ist
- **resource_id** - (*string | number*) - die ID der Ressource, die der Aufgabe zugewiesen ist
- **value** - (*number | string*) - die Menge der der Aufgabe zugewiesenen Ressourcen
- **delay** - (*number*) - der Unterschied zwischen dem Startdatum der Zuordnung und dem Startdatum der Aufgabe
- **start_date** - (*Date*) - das Datum, an dem die Zuordnung beginnen soll
- **end_date** - (*Date*) - das Datum, an dem die Zuordnung enden soll
- **duration** - (*number*) - die Dauer der Zuordnung
- **mode** - (*string*) - der Berechnungsmode der Zeit der Ressourcenzuordnung: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - jede benutzerdefinierte Eigenschaft


:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* werden automatisch nur dann befüllt, wenn [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Verwandte Guides
- [Resource Management](guides/resource-management.md#assigningresources)

### Changelog
- in Version 7.1 hinzugefügt