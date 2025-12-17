---
sidebar_label: isSplitTask
title: isSplitTask method
description: "Определяет, является ли указанная задача разделённой"
---

# isSplitTask
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет, является ли указанная задача разделённой

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - объект задачи для проверки

### Returns
- ` isSplit` - (boolean) - возвращает true, если задача разделена, иначе false

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // выполнить действие
}
~~~


### Related Guides
- [Разделение задач](guides/split-tasks.md)
