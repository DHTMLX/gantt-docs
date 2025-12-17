---
sidebar_label: isSummaryTask
title: isSummaryTask method
description: "验证给定的任务是否为汇总任务"
---

# isSummaryTask
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 验证给定的任务是否为汇总任务

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 要检查的任务对象

### Returns
- ` mode` - (boolean) - <i>true</i> 如果该任务是汇总任务，否则为 <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Details
:::note
此方法仅在PRO版本中可用，因为定义任务类型的功能仅限于该版本。在其他版本中，该方法将始终返回false。
:::

### Related Guides
- [任务类型](guides/task-types.md)
