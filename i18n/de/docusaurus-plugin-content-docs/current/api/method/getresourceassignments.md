---
sidebar_label: getResourceAssignments
title: getResourceAssignments Methode
description: "liefert alle Aufgaben, die der Ressource zugewiesen sind"
---

# getResourceAssignments

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt alle Aufgaben zurück, die der Ressource zugewiesen sind

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) => ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - die ID der Ressource
- `taskId` - (required) *string | number* - die ID der Aufgabe

### Returns
- `assignments` - (ResourceAssignment[]) - ein Array von Objekten mit den der Ressource zugewiesenen Aufgaben

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> see details
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Die Methode gibt ein Array von Objekten wie folgt zurück:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

Jedes Objekt enthält die folgenden Eigenschaften:

- **id** - (*string | number*) - die ID der Zuweisung
- **task_id** - (*string | number*) - die ID der Aufgabe, der die Ressource zugewiesen ist
- **resource_id** - (*string | number*) - die ID der Ressource, die der Aufgabe zugewiesen ist
- **value** - (*number | string*) - die Menge der der Aufgabe zugewiesenen Ressourcen
- **delay** - (*number*) - die Differenz zwischen dem Startdatum der Zuweisung und dem Startdatum der Aufgabe
- **start_date** - (*Date*) - das Datum, an dem die Zuweisung beginnen soll
- **end_date** - (*Date*) - das Datum, an dem die Zuweisung enden soll
- **duration** - (*number*) - die Dauer der Zuweisung
- **mode** - (*string*) - der Berechnungsmodus der Zeit der Ressourcenzuweisung: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - beliebige benutzerdefinierte Eigenschaft

:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* werden automatisch nur dann gefüllt, wenn [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist.  
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- das Rückgabeobjekt wird die Eigenschaften *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* enthalten, beginnend mit Version 7.1