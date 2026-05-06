---
sidebar_label: isSplitTask
title: isSplitTask 方法
description: "检查指定任务是否已拆分"
---

# isSplitTask

:::info
此功能仅在 PRO 版中提供。
:::

### Description

@short: 检查指定任务是否已拆分

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (必填) *Task* - 任务对象

### Returns
- ` isSplit` - (boolean) - 当任务被拆分时为 true，否则为 false

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // 执行相应操作
}
~~~

### Related Guides
- [拆分任务](guides/split-tasks.md)