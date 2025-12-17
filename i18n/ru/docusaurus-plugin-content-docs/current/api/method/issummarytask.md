---
sidebar_label: isSummaryTask
title: isSummaryTask method
description: "проверяет, является ли заданная задача сводной задачей"
---

# isSummaryTask
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Проверяет, является ли заданная задача сводной задачей

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - объект задачи для проверки

### Returns
- ` mode` - (boolean) - <i>true</i>, если задача является сводной, иначе <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Details

:::note
Этот метод доступен только в PRO-версии, так как возможность определения типов задач является эксклюзивной для этой редакции. В других версиях он всегда будет возвращать false.
:::

### Related Guides
- [Типы задач](guides/task-types.md)
