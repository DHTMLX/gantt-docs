---
sidebar_label: getFreeSlack
title: getFreeSlack 方法
description: "返回任务的自由松弛时间"
---

# getFreeSlack
:::info
 该功能仅在 PRO 版本中可用。 
:::
### Description

@short: 返回任务的自由松弛时间

@signature: getFreeSlack: (task: Task) => number

### Parameters

- `task` - (必填) *Task* - 任务对象

### Returns
- ` free_slack` - (number) - 任务的自由松弛时间

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [显示任务松弛时间](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
此方法在 **critical_path** 扩展中定义，因此您需要通过 [gantt.plugins](api/method/plugins.md) 方法激活 [critical_path](guides/extensions-list.md#critical-path) 插件。请阅读 [Critical Path](guides/critical-path.md) 文章中的详细信息。
:::

自由松弛时间是在不影响其后继任务的情况下，可用于增加任务持续时间或在时间线中移动任务的一段时间。

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)