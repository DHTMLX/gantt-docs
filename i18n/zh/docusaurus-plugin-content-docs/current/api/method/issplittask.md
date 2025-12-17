---
sidebar_label: isSplitTask
title: isSplitTask method
description: "判断指定任务是否为拆分任务"
---

# isSplitTask
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 判断指定任务是否为拆分任务

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 要检查的任务对象

### Returns
- ` isSplit` - (boolean) - 如果任务是拆分任务返回 true，否则返回 false

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
