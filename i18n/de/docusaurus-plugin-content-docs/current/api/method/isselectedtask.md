---
sidebar_label: isSelectedTask
title: isSelectedTask method
description: "prüft, ob die angegebene Aufgabe aktuell ausgewählt ist"
---

# isSelectedTask

### Description

@short: Prüft, ob die angegebene Aufgabe aktuell ausgewählt ist

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* -    die ID der Aufgabe

### Returns
- ` value` - (boolean) - gibt 'true' zurück, wenn die Aufgabe ausgewählt ist, andernfalls 'false'

### Example

~~~jsx
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
 Diese Methode stammt aus der **multiselect**-Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

