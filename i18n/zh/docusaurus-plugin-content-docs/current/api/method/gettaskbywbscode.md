---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode 方法
description: "根据其 WBS 代码返回一个任务"
---

# getTaskByWBSCode

### Description

@short: 根据其 WBS 代码返回一个任务

@signature: getTaskByWBSCode: (code: string) => Task

### Parameters

- `code` - (required) *string* - 该任务的 WBS 代码

### Returns
- `task` - (Task) - 一个任务对象

### Example

~~~jsx
const task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}
~~~

### Related samples
- [展示任务 WBS 代码（大纲编号）](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Related API
- [getWBSCode](api/method/getwbscode.md)

### Related Guides
- [指定列](guides/specifying-columns.md#wbscode)