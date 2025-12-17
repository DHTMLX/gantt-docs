---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight method
description: "returns the height (in pixels) of the DOM element of the task"
---

# getTaskBarHeight

### Description

@short: Returns the height (in pixels) of the DOM element of the task

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* -   the task's id

### Returns
- ` param` - (number) - the task height

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~

### Details

The return value can also match the value specified to the **bar_height** property of the task object:

~~~js
const tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row_height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row_height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

:::note
If the **bar_height** property is specified to "full", the method calculates the height of the task bar in pixels. 
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- [Resizing Rows in Grid](guides/resizing-rows.md)
- [Task Object/Id](guides/task-object-operations.md#task-height)

### Change log
- added in v7.1

