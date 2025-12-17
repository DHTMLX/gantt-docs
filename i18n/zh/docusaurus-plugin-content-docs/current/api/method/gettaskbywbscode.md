---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode method
description: "根据WBS编码返回对应的任务"
---

# getTaskByWBSCode

### Description

@short: 根据WBS编码返回对应的任务

@signature: getTaskByWBSCode: (code: string) =\> Task

### Parameters

- `code` - (required) *string* - 用于标识任务的WBS编码

### Returns
- ` task` - (Task) - 对应的任务对象

### Example

~~~jsx
const task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}
~~~

### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Related API
- [getWBSCode](api/method/getwbscode.md)

### Related Guides
- [指定列](guides/specifying-columns.md)

