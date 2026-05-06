---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask method
description: "gibt die ID der zuletzt ausgewählten Aufgabe zurück"
---

# getLastSelectedTask

### Description

@short: Gibt die ID der zuletzt ausgewählten Aufgabe zurück

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - die ID der zuletzt ausgewählten Aufgabe

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
Diese Methode ist in der **multiselect**-Erweiterung definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md).
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)