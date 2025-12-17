---
sidebar_label: getFreeSlack
title: getFreeSlack method
description: "returns the free slack of a task"
---

# getFreeSlack

:::info 
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns the free slack of a task

@signature: getFreeSlack: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - the object of a task

### Returns
- ` free_slack` - (number) - the free slack of a task

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
This method is defined in the **critical_path** extension, so you need to activate the [critical_path](guides/extensions-list.md#critical-path) plugin using the [gantt.plugins](api/method/plugins.md) method. Read the details in the [Critical Path](guides/critical-path.md) article. 
:::


Free slack is a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the next task it is connected with.

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)

