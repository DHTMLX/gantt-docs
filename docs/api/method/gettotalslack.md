---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "returns the total slack of a task"
---

# getTotalSlack

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns the total slack of a task

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task`-	(optional) *Task | string | number*	-	optional, the object of a task or its ID

### Returns
- ` total_slack` - (number | object) - either the total slack of a task or, if the <i>task</i> parameter is not specified, an object with key:value pairs where key is the id of a task and value is the total slack of the task

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
This method is defined in the **critical_path** extension, so you need to activate the [critical_path](guides/extensions-list.md#critical-path) plugin using the [gantt.plugins](api/method/plugins.md) method. Read the details in the [Critical Path](guides/critical-path.md) article. 
:::


Total slack is a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the time of ending of the whole project.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)

