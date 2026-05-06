---
sidebar_label: isSummaryTask
title: isSummaryTask метод
description: "проверяет, является ли указанная задача суммарной"
---

# isSummaryTask

:::info
Метод работает только в PRO версии, так как возможность указать тип задачи доступна в этой версии. В противном случае метод вернёт false.
:::

### Description

@short: Проверяет, является ли указанная задача суммарной

@signature: isSummaryTask: (task: Task) => boolean

### Parameters

- `task` - (обязательный) *Task* - объект задачи

### Returns
- ` mode` - (boolean) - <i>true</i>, если задача является суммарной. В противном случае, <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Related Guides
- [Типы задач](guides/task-types.md)