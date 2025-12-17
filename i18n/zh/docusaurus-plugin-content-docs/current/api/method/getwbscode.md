---
sidebar_label: getWBSCode
title: getWBSCode method
description: "返回任务的WBS代码（大纲编号）"
---

# getWBSCode

### Description

@short: 返回任务的WBS代码（大纲编号）

@signature: getWBSCode: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` wbs_code` - (string) - 甘特图中任务的WBS代码

### Example

~~~jsx
gantt.init("gantt_here");

gantt.parse({
 "data":[
  {"id":1, "text":"项目 #1", "start_date":"28-03-2013", "duration":"11", 
      "parent":"0", "open": true},
  {"id":2, "text":"任务 #1", "start_date":"01-04-2013", "duration":"18", "parent":"1"},
  {"id":3, "text":"任务 #2", "start_date":"02-04-2013", "duration":"8", "parent":"1"}
 ],
 "links":[]
});

const wbs_code = gantt.getWBSCode(gantt.getTask(3)) // -> 返回 "1.2"
~~~

### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Details

在版本4.2中新增

### Related API
- [getTaskByWBSCode](api/method/gettaskbywbscode.md)

### Related Guides
- [指定列](guides/specifying-columns.md)

