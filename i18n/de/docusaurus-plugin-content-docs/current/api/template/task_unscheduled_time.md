---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "legt die Termine ungeplanter Aufgaben fest"
---

# task_unscheduled_time

### Description

@short: Gibt die Termine ungeplanter Aufgaben an

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string | void) - ein HTML-Text, der im Gitter für die Spalten mit Datumswerten gerendert wird

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Ungeplante Aufgaben anzeigen](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

Standardmäßig wird ein leerer String zurückgegeben.

Wenn eine Aufgabe [ungeplant](guides/unscheduled-tasks.md) ist, d. h. sie die `unscheduled:true`-Eigenschaft in ihrem Konfigurationsobjekt besitzt, werden alle ihre Termine mit leeren Zeilen gerendert.
Siehe untenstehendes Beispiel:

:::note
Beispiel: [Termine in ungeplanten Aufgaben rendern](https://snippet.dhtmlx.com/t6skfgjx)
:::

Falls Sie einige Termine für eine ungeplante Aufgabe anzeigen müssen, können Sie dies mit Hilfe der [date_grid](api/template/date_grid.md) Vorlage tun.

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/unscheduled-tasks.md)