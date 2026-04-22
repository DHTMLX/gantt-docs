---
sidebar_label: eachSelectedTask
title: eachSelectedTask-Methode
description: "Durchläuft alle ausgewählten Aufgaben im Gantt-Diagramm"
---

# eachSelectedTask

### Description

@short: Durchläuft alle ausgewählten Aufgaben im Gantt-Diagramm

@signature: eachSelectedTask: (code: GanttCallback) =\> void

### Parameters

- `code` - (erforderlich) *Funktion* - eine Funktion, die über Aufgaben iteriert. Nimmt eine Aufgaben-ID als Parameter entgegen

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
Diese Methode ist in der Erweiterung **multiselect** definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md).
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
- [Multi-Task Selection](guides/multiselection.md)