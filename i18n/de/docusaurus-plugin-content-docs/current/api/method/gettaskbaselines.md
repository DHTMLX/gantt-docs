---
sidebar_label: getTaskBaselines
title: getTaskBaselines method
description: "Ruft ein Array von Baselines ab, die mit einer bestimmten Aufgabe im Datenspeicher verknüpft sind"
---

# getTaskBaselines
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Ruft ein Array von Baselines ab, die mit einer bestimmten Aufgabe im Datenspeicher verknüpft sind

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* -    Die eindeutige Kennung der Aufgabe

### Returns
- ` param` - (Baseline[]) - Ein Array, das Baseline-Objekte enthält

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> siehe Details
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
 Die **getTaskBaselines** Methode funktioniert nicht, wenn die [baselines](api/config/baselines.md) Konfiguration deaktiviert ist. 
:::

Diese Methode liefert ein Array von **Baseline**-Objekten, die jeweils folgende Eigenschaften besitzen:

- **id** - (*string | number*) - die eindeutige ID der Baseline
- **task_id** - (*string | number*) - die ID der Aufgabe, mit der diese Baseline verknüpft ist
- **start_date** - (*Date*) - Startzeitpunkt der Baseline
- **duration** - (*number*) - Dauer der Baseline
- **end_date** - (*Date | number*) - Endzeitpunkt der Baseline
- **[customProperty: string]** - (*any*) - beliebige zusätzliche benutzerdefinierte Eigenschaften


Hier ein Beispiel:

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Related Guides
- ["Zusätzliche Elemente in der Zeitleiste"](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0

