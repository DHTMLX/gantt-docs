---
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines method
description: "调整任务的行高以正确显示基线元素"
---

# adjustTaskHeightForBaselines

### Description

@short: 调整任务的行高以正确显示基线元素

@signature: adjustTaskHeightForBaselines: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 需要更新其 `row_height` 的任务对象

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

此方法会更新给定任务的 [`row_height`](guides/resizing-rows.md)，以确保基线元素能够正确显示。

通常情况下，不需要调用此方法。它主要在动态更改 [gantt.config.baselines](api/config/baselines.md) 配置的显示设置时使用。

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [时间线中的额外元素](guides/inbuilt-baselines.md)

### Change log
- 在 v9.0 中添加

