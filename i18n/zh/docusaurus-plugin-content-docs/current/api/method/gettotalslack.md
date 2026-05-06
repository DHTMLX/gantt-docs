---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "返回任务的总松弛时间"
---

# getTotalSlack

:::info
此功能仅在 PRO 版中可用。 
:::

### Description

@short: 返回任务的总松弛时间

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task`-	(optional) *Task | string | number*	-	可选，任务对象或其 ID

### Returns
- ` total_slack` - (number | object) - 要么是任务的总松弛时间，要么如果未指定 <i>task</i> 参数，则返回一个对象，其中 key 是任务的 id，value 是该任务的总松弛时间

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [显示 Slack 时间](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
此方法在 **critical_path** 扩展中定义，因此您需要通过 [gantt.plugins](api/method/plugins.md) 方法来激活 [critical_path](guides/extensions-list.md#critical-path) 插件。请在 [关键路径](guides/critical-path.md) 文章中查看详细信息。 
:::

总松弛时间是一个可用于增加任务持续时间或在时间线中移动任务而不影响整个项目结束时间的时间段。

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [关键路径](guides/critical-path.md#gettingfreeandtotalslack)