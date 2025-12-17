---
sidebar_label: autoSchedule
title: autoSchedule method
description: "aktualisiert den Projektzeitplan automatisch"
---

# autoSchedule
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Aktualisiert den Projektzeitplan automatisch

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters
- `taskId` - (optionale) *string | number* - die ID der Aufgabe

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

Um den Zeitplan ab einer bestimmten Aufgabe zu aktualisieren, übergeben Sie einfach die ID der Aufgabe als Argument an die **autoSchedule()** Methode:

~~~js
gantt.autoSchedule(taskId);
~~~


:::note
 Stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin auf der Seite eingebunden ist, da es für diese Methode erforderlich ist. 
:::

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)
