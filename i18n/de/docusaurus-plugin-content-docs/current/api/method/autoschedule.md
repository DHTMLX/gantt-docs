---
sidebar_label: autoSchedule
title: "autoSchedule Methode"
description: "Berechnet den Zeitplan des Projekts neu"
---

# autoSchedule

:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar.
:::

### Description

@short: Berechnet den Zeitplan des Projekts neu

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters
- `taskId` - (optional) *string | number* - die Aufgabe-ID

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

Um den Zeitplan für eine Gruppe von verknüpften Aufgaben neu zu berechnen, übergeben Sie die ID einer der Aufgaben in dieser Gruppe als Argument an die **autoSchedule()**-Methode:

~~~js
gantt.autoSchedule(taskId);
~~~

:::note
Die Methode erfordert das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin, das auf der Seite eingebunden sein muss.
:::

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)