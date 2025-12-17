---
sidebar_label: isSummaryTask
title: isSummaryTask method
description: "prüft, ob die angegebene Aufgabe eine Summary-Task ist"
---

# isSummaryTask

### Description

@short: Prüft, ob die angegebene Aufgabe eine Summary-Task ist

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - das zu überprüfende Task-Objekt

### Returns
- ` mode` - (boolean) - <i>true</i>, wenn die Aufgabe eine Summary-Task ist, andernfalls <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Details

:::note

Diese Methode ist nur in der PRO-Version verfügbar, da die Möglichkeit, Aufgabentypen zu definieren, ausschließlich in dieser Edition enthalten ist. In anderen Versionen wird immer false zurückgegeben.
 
:::

### Related Guides
- ["Aufgabentypen"](guides/task-types.md)
