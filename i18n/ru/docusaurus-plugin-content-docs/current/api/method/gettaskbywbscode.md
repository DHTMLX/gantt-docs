---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode method
description: "возвращает задачу по её WBS коду"
---

# getTaskByWBSCode

### Description

@short: Возвращает задачу по её WBS коду

@signature: getTaskByWBSCode: (code: string) =\> Task

### Parameters

- `code` - (required) *string* - WBS код, идентифицирующий задачу

### Returns
- ` task` - (Task) - соответствующий объект задачи

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
- [Указание колонок](guides/specifying-columns.md#wbscode)

