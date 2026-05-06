---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode method
description: "WBS 코드로 작업을 반환합니다"
---

# getTaskByWBSCode

### Description

@short: WBS 코드로 작업을 반환합니다

@signature: getTaskByWBSCode: (code: string) => Task

### Parameters

- `code` - (required) *string* - 작업의 WBS 코드

### Returns
- ` task` - (Task) - 작업 객체

### Example

~~~jsx
const task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}
~~~

### Related samples
- [작업 WBS 코드 표시(개요 번호)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Related API
- [getWBSCode](api/method/getwbscode.md)

### Related Guides
- [컬럼 지정](guides/specifying-columns.md#wbscode)