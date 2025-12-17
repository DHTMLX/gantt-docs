---
sidebar_label: getTaskBaselines
title: getTaskBaselines method
description: "returns an array of baselines of a specific task from the datastore"
---

# getTaskBaselines

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns an array of baselines of a specific task from the datastore

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* -    the task id

### Returns
- ` param` - (Baseline[]) - an array of baseline objects

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> see details
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
The **getTaskBaselines** method is not available if the [baselines](api/config/baselines.md) config is disabled. 
:::

The method returns an array with the **baseline** objects that have the following properties:

- **id** - (*string | number*) - the baseline ID
- **task_id** - (*string | number*) - the ID of the task the baseline belongs to
- **start_date** - (*Date*) - the start date of the baseline
- **duration** - (*number*) - the duration of the baseline
- **end_date** - (*Date | number*) - the end date of the baseline
- **[customProperty: string]** - (*any*) - any custom property
- **className** - (*string | number*) - the value of this property is used by Gantt as a custom class for an HTML element


For example:

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
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- added in v9.0

