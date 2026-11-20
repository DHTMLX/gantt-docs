---
sidebar_label: isTaskActive
title: isTaskActive method
description: "Checks whether a task is effectively active"
---

# isTaskActive

### Description

@short: Checks whether a task is effectively active

@signature: isTaskActive: (task: Task | string | number) =\> boolean

### Parameters

- `task` - (required) *Task | string | number* - the task object or ID

### Returns

`true` if neither the task nor any of its ancestors has `active: false`. When you pass an
unknown ID, the method returns `false`.

### Example

~~~js
const active = gantt.isTaskActive(taskId);
~~~

### Related Guides

- [Inactive Tasks and Links](guides/inactive-tasks-links.md)

### Change log

- Added in v10.1
