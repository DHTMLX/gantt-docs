---
sidebar_label: isSplitTask
title: isSplitTask Methode
description: "prüft, ob die angegebene Aufgabe aufgeteilt ist"
---

# isSplitTask

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Prüft, ob die angegebene Aufgabe aufgeteilt ist

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (erforderlich) *Task* - das Objekt einer Aufgabe

### Returns
- ` isSplit` - (boolean) - true, falls die Aufgabe aufgeteilt ist, andernfalls false

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // do something
}
~~~

### Related Guides
- [Split Tasks](guides/split-tasks.md)