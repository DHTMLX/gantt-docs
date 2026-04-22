---
sidebar_label: autoSchedule
title: autoSchedule 方法
description: "重新计算项目的进度安排"
---

# autoSchedule

:::info
此功能仅在 PRO 版中可用。 
:::

### Description

@short: 重新计算项目的进度安排

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters
- `taskId` - (optional) *string | number* - 任务 ID

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

要为一组相互关联的任务重新计算进度，请将该组中某个任务的 ID 作为参数传递给 **autoSchedule()** 方法：

~~~js
gantt.autoSchedule(taskId);
~~~

:::note
此方法需要在页面上引入 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。
:::

### Related Guides
- [自动排程](guides/auto-scheduling.md)