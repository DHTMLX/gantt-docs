---
sidebar_label: autoSchedule
title: autoSchedule method
description: "自动更新项目进度计划"
---

# autoSchedule
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 自动更新项目进度计划

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters

- `taskId` - (optional) *string | number* -        可选，任务 ID

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

如果想从指定任务开始更新进度计划，只需将该任务的 ID 作为参数传递给 **autoSchedule()** 方法:

~~~js
gantt.autoSchedule(taskId);
~~~

:::note
 请确保页面中已包含 [auto_scheduling](guides/extensions-list.md#zidongpaicheng) 插件，因为该方法依赖此插件。 
:::

### Related Guides
- [自动调度](guides/auto-scheduling.md)
