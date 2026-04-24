---
sidebar_label: isReadonly
title: isReadonly 方法
description: "检查指定的任务/链接，或整个 Gantt 是否为只读"
---

# isReadonly

### Description

@short: 检查指定的任务/链接，或整个甘特图是否为只读

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` -	(optional) *number | string | Task | Link*	- 可选，任务/链接的 ID 或对象。若未指定，该方法将检查甘特图是否为只读

### Returns
- ` `mode` - (boolean) - <i>true</i>，如果任务/链接，或甘特图为只读。否则，<i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// 或者 
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- [只读模式](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)