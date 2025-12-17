---
sidebar_label: eachSelectedTask
title: eachSelectedTask method
description: "geht alle ausgewählten Tasks im Gantt-Chart durch"
---

# eachSelectedTask

### Description

@short: Geht alle ausgewählten Tasks im Gantt-Chart durch

@signature: eachSelectedTask: (code: GanttCallback) =\> void

### Parameters

- `code` - (required) *function* - eine Funktion, die für jeden ausgewählten Task ausgeführt wird. Sie erhält die Task-ID als Argument

### Example

~~~jsx
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
 Diese Methode ist Teil der **multiselect**-Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [eachTask](api/method/eachtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)
- [batchUpdate](api/method/batchupdate.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

