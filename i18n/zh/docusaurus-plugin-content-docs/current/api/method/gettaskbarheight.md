---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight method
description: "返回任务的 DOM 元素的高度（以像素为单位）"
---

# getTaskBarHeight

### Description

@short: 返回任务的 DOM 元素的高度（以像素为单位）

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* - 任务的 ID

### Returns
- ` param` - (number) - 任务高度

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~

### Details

返回值也可匹配分配给任务对象的 **bar_height** 属性的值：

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
如果将 **bar_height** 属性指定为 "full"，该方法将以像素为单位计算任务条的高度。
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- [Grid 中的行高调整](guides/resizing-rows.md)
- [Task 对象/ID](guides/task-object-operations.md#task-height)

### Change log
- 新增于 v7.1