---
sidebar_label: isSplitTask
title: isSplitTask метод
description: "проверяет, разбита ли указанная задача"
---

# isSplitTask

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Проверяет, разбита ли указанная задача

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (обязательный) *Task* - объект задачи

### Returns
- ` isSplit` - (boolean) - true, если задача разделена, иначе false

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // do something
}
~~~

### Related Guides
- [Разделённые задачи](guides/split-tasks.md)