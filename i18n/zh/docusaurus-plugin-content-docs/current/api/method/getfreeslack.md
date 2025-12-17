---
sidebar_label: getFreeSlack
title: getFreeSlack method
description: "返回任务的自由时差"
---

# getFreeSlack
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 返回任务的自由时差

@signature: getFreeSlack: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` free_slack` - (number) - 任务的自由时差

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
 此方法属于**critical_path**扩展的一部分，因此请确保通过[gantt.plugins](api/method/plugins.md)方法启用[critical_path](guides/extensions-list.md)插件。更多信息请参见[关键路径](guides/critical-path.md)文档。 
:::

自由时差指任务持续时间可以增加的时间量，或任务在时间线上可以移动的时间量，而不会影响任何后续关联任务。

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [关键路径](guides/critical-path.md)

