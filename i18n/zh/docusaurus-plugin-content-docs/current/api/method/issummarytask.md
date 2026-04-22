---
sidebar_label: isSummaryTask
title: isSummaryTask method
description: "检查指定任务是否为汇总"
---

# isSummaryTask

:::info
此方法仅在 PRO 版本中可用，因为在该版本中才可以指定任务的类型。否则，该方法将返回 false。
:::

### Description

@short: 检查指定任务是否为汇总

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` mode` - (boolean) - <i>true</i>，如果任务是汇总任务。否则，<i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Related Guides
- [任务类型](guides/task-types.md)