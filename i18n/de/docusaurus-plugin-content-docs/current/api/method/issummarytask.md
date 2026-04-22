---
sidebar_label: isSummaryTask
title: isSummaryTask-Methode
description: "prüft, ob die angegebene Aufgabe eine Summenaufgabe ist"
---

# isSummaryTask

:::info
Die Methode funktioniert nur in der PRO-Version, da die Möglichkeit, den Typ einer Aufgabe festzulegen, in dieser Version nur verfügbar ist. Andernfalls gibt die Methode false zurück.
:::

### Beschreibung

@short: Prüft, ob die angegebene Aufgabe eine Summenaufgabe ist

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameter

- `task` - (erforderlich) *Task* - das Objekt einer Aufgabe

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
