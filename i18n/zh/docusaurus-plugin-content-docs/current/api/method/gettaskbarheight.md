---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight method
description: "提供任务DOM元素的高度（以像素为单位）"
---

# getTaskBarHeight

### Description

@short: 提供任务DOM元素的高度（以像素为单位）

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* -    任务的ID

### Returns
- ` param` - (number) - 任务条的高度

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~

### Details

返回的值可能对应于任务对象上设置的 **bar_height**:

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
当 **bar_height** 属性设置为 "full" 时，此方法会计算任务条的实际像素高度。 
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- [调整网格中的行高](guides/resizing-rows.md)
- [任务对象/Id](guides/task-object-operations.md)

### Change log
- 在v7.1版本中添加

