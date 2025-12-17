---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "wechselt den Auswahlstatus der angegebenen Aufgabe - wählt sie aus, wenn sie nicht ausgewählt ist, oder hebt die Auswahl auf, wenn sie bereits ausgewählt ist"
---

# toggleTaskSelection

### Description

@short: Wechselt den Auswahlstatus der angegebenen Aufgabe - wählt sie aus, wenn sie nicht ausgewählt ist, oder hebt die Auswahl auf, wenn sie bereits ausgewählt ist

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (required) *string | number* -        die ID der Aufgabe

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
 Diese Methode ist Teil der **multiselect**-Erweiterung. Stellen Sie daher sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin zuerst aktiviert ist. Für weitere Details siehe den Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

