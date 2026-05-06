---
sidebar_label: getTaskBaselines
title: getTaskBaselines Methode
description: "Gibt ein Array von Baseline-Objekten eines bestimmten Tasks aus dem Datenspeicher zurück"
---

# getTaskBaselines

:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar. 
::: 

### Description

@short: Gibt ein Array von Baseline-Objekten eines bestimmten Tasks aus dem Datenspeicher

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* - die Aufgaben-ID

### Returns
- ` param` - (Baseline[]) - ein Array von Baseline-Objekten

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> siehe Details
~~~

### Related samples
- [Baselines anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
Die Methode **getTaskBaselines** ist nicht verfügbar, wenn die [baselines](api/config/baselines.md) Konfiguration deaktiviert ist. 
::: 

Die Methode gibt ein Array der **Baseline-Objekte** zurück, die folgende Eigenschaften besitzen:

- **id** - (*string | number*) - die Baseline-ID
- **task_id** - (*string | number*) - die ID der Aufgabe, zu der die Baseline gehört
- **start_date** - (*Date*) - das Startdatum der Baseline
- **duration** - (*number*) - die Dauer der Baseline
- **end_date** - (*Date | number*) - das Enddatum der Baseline
- **[customProperty: string]** - (*any*) - beliebige benutzerdefinierte Eigenschaft
- **className** - (*string | number*) - der Wert dieser Eigenschaft wird von Gantt als benutzerdefinierte Klasse für ein HTML-Element verwendet


Zum Beispiel:

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
- [Extras Elemente in der Timeline](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0