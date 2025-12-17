---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "gibt die Daten von nicht geplanten Tasks an"
---

# task_unscheduled_time

### Description

@short: Gibt die Daten von nicht geplanten Tasks an

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string | void) - einen HTML-Text, der im Grid für die Spalten mit Datumswerten gerendert wird

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

Standardmäßig gibt die Funktion einen leeren String zurück.

Wenn ein Task als [unscheduled](guides/unscheduled-tasks.md) markiert ist, indem die Eigenschaft `unscheduled:true` im Konfigurationsobjekt gesetzt wird, erscheinen alle Datumsfelder als leere Zeilen. 
Siehe das folgende Beispiel:

:::note
Sample: [Rendering dates in unscheduled tasks](https://snippet.dhtmlx.com/t6skfgjx) 
:::

Falls es erforderlich ist, für einen nicht geplanten Task einige Daten anzuzeigen, kann dies mit der [date_grid](api/template/date_grid.md) Vorlage umgesetzt werden.

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/unscheduled-tasks.md)

