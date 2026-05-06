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

- `task` - (必需) *Task* - 将被调整其 `row_height` 的任务对象

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [显示基线](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

此方法会修改所提供任务的 [`row_height`](guides/resizing-rows.md) 值，以确保正确显示基线元素。

通常无需直接调用此方法。只有在动态修改 [gantt.config.baselines](api/config/baselines.md) 配置的显示设置时才需要。

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [时间轴中的额外元素](guides/inbuilt-baselines.md)

### Change log
- 在 v9.0 中新增