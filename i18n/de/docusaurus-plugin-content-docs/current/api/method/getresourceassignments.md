---
sidebar_label: getResourceAssignments
title: getResourceAssignments method
description: "gibt alle Aufgaben zurück, die mit der angegebenen Ressource verknüpft sind"
---

# getResourceAssignments
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Gibt alle Aufgaben zurück, die mit der angegebenen Ressource verknüpft sind

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) =\> ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - die Kennung der Ressource
- `taskId` - (optional) *string | number* - die Kennung der Aufgabe

### Returns
- ` assignments` - (ResourceAssignment[]) - ein Array von Objekten, die den der Ressource zugewiesenen Aufgaben entsprechen

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> Details werden angezeigt
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Diese Methode liefert ein Array von Objekten, die folgendermaßen strukturiert sind:

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

Jedes Objekt enthält folgende Eigenschaften:

- **id** - (*string | number*) - die eindeutige Kennung der Zuweisung
- **task_id** - (*string | number*) - die ID der der Ressource zugewiesenen Aufgabe
- **resource_id** - (*string | number*) - die ID der der Aufgabe zugewiesenen Ressource
- **value** - (*number | string*) - der Umfang der Ressourcenzuweisung für die Aufgabe
- **delay** - (*number*) - der Versatz zwischen dem Startdatum der Zuweisung und dem Startdatum der Aufgabe
- **start_date** - (*Date*) - wann die Zuweisung beginnen soll
- **end_date** - (*Date*) - wann die Zuweisung enden soll
- **duration** - (*number*) - wie lange die Zuweisung dauert
- **mode** - (*string*) - der Modus, der zur Berechnung der Ressourcenzuweisungszeit verwendet wird: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - beliebige zusätzliche benutzerdefinierte Eigenschaften


:::note
 Die Eigenschaften *delay*, *duration*, *start_date*, *end_date*, *id* und *mode* werden nur automatisch ausgefüllt, wenn [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)

### Change log
- ab Version 7.1 enthält das zurückgegebene Objekt die Eigenschaften *delay*, *duration*, *start_date*, *end_date*, *id* und *mode*

