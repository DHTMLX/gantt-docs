---
sidebar_label: isReadonly
title: isReadonly method
description: "checks whether the specified task/link, or the whole Gantt is read-only"
---

# isReadonly

### Description

@short: Checks whether the specified task/link, or the whole Gantt is read-only

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` -	(optional) *number | string | Task | Link*	- optional, the id or an object of the task/link. If not specified, the method checks whether the Gantt is read-only

### Returns
- ` mode` - (boolean) - <i>true</i>, if a task/link, or the Gantt is readonly. Otherwise, <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// or 
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)
