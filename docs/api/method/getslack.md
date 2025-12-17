---
sidebar_label: getSlack
title: getSlack method
description: "checks how much time (in the current duration unit) a task has before it starts to affect other tasks"
---

# getSlack

:::info
The **getSlack** method is available in the PRO edition only. 
:::

### Description

@short: Checks how much time (in the current duration unit) a task has before it starts to affect other tasks

### Parameters

- `task1` - (required) *object* - the object of the 1st task to check the slack for
- `task2` - (required) *object* - the object of the 2nd task to check the slack for

### Returns
- ` slack` - (number,string) - a slack between tasks in the current duration units or 'Infinity', if tasks are not linked

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2013",duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};
 
gantt.config.highlight_critical_path = true; 
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getSlack(gantt.getTask(2), gantt.getTask(3)); // -> 1  /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::warning
The **getSlack** method is deprecated. Use the following methods to get free/total slack of a task: 
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

:::note
This method is defined in the **critical_path** extension, so you need to include it on the page. Read the details in the [Critical Path](guides/critical-path.md) article. 
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Critical Path](guides/critical-path.md)

