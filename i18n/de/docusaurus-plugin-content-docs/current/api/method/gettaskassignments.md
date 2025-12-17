---
sidebar_label: getTaskAssignments
title: getTaskAssignments method
description: "Ruft die geparsten Ressourcen-Zuweisungen für eine bestimmte Aufgabe aus dem Datenspeicher ab"
---

# getTaskAssignments
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Ruft die geparsten Ressourcen-Zuweisungen für eine bestimmte Aufgabe aus dem Datenspeicher ab

@signature: getTaskAssignments: (taskId: string | number) =\> ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* -    die ID der Aufgabe

### Returns
- ` param` - (ResourceAssignment[]) - ein Array von Objekten, die die Ressourcen-Zuweisungen für die Aufgabe darstellen

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> siehe Details
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details


:::note
 Die **getTaskAssignments** Methode funktioniert nicht, wenn [process_resource_assignments](api/config/process_resource_assignments.md) deaktiviert ist. 
:::

Die Methode gibt ein Array mit Objekten zurück, die wie folgt strukturiert sind:

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

- **id** - (*string | number*) - die eindeutige ID der Zuweisung
- **task_id** - (*string | number*) - die ID der Aufgabe, der die Ressource zugewiesen ist
- **resource_id** - (*string | number*) - die ID der Ressource, die der Aufgabe zugewiesen ist
- **value** - (*number | string*) - die Menge der der Aufgabe zugewiesenen Ressourcen
- **delay** - (*number*) - der Versatz zwischen dem Startdatum der Zuweisung und dem Startdatum der Aufgabe
- **start_date** - (*Date*) - wann die Zuweisung geplant ist zu beginnen
- **end_date** - (*Date*) - wann die Zuweisung geplant ist zu enden
- **duration** - (*number*) - wie lange die Zuweisung dauert
- **mode** - (*string*) - die Methode, mit der die Zeit der Ressourcen-Zuweisung berechnet wird: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - beliebige zusätzliche benutzerdefinierte Eigenschaften


:::note
 Die Eigenschaften *delay*, *duration*, *start_date*, *end_date*, *id* und *mode* werden nur automatisch gefüllt, wenn [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md#assigningresources)

### Change log
- hinzugefügt in v7.1

