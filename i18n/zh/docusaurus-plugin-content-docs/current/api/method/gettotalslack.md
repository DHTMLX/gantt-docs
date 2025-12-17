---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "返回任务的总浮动时间"
---

# getTotalSlack
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 返回任务的总浮动时间

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task` - (optional) *Task | string | number* -        可选，任务对象或其ID

### Returns
- ` total_slack` - (number | object) - 返回任务的总浮动时间；如果未提供 <i>task</i> 参数，则返回一个对象，映射任务ID到它们的总浮动时间值

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
 此方法是 **critical_path** 扩展的一部分，请确保通过 [gantt.plugins](api/method/plugins.md) 方法启用 [critical_path](guides/extensions-list.md) 插件。更多信息请参见 [关键路径](guides/critical-path.md) 文章。 
:::


总浮动时间表示任务的持续时间可以延长或沿时间轴移动的时间量，而不会延误整个项目的完成时间。

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [关键路径](guides/critical-path.md)

