---
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines method
description: "adjusts the task's row height for proper display of baseline elements"
---

# adjustTaskHeightForBaselines

### Description

@short: Adjusts the task's row height for proper display of baseline elements

@signature: adjustTaskHeightForBaselines: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - the task object whose `row_height` will be adjusted

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

This method modifies the [`row_height`](guides/resizing-rows.md) value of the provided task to ensure correct display of baseline elements. 

Typically, there is no need to call this method directly. It is necessary only when you dynamically modify the display settings of the [gantt.config.baselines](api/config/baselines.md) config.

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- added in v9.0

