---
sidebar_label: isSplitTask
title: isSplitTask method
description: "Bestimmt, ob die angegebene Aufgabe eine Split-Task ist"
---

# isSplitTask
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Bestimmt, ob die angegebene Aufgabe eine Split-Task ist

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - das zu prüfende Aufgabenobjekt

### Returns
- ` isSplit` - (boolean) - gibt true zurück, wenn die Aufgabe eine Split-Task ist, sonst false

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // do something
}
~~~


### Related Guides
- ["Aufgaben aufteilen"](guides/split-tasks.md)
