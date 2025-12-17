---
sidebar_label: getWBSCode
title: getWBSCode method
description: "작업의 WBS 코드(개요 번호)를 반환합니다."
---

# getWBSCode

### Description

@short: 작업의 WBS 코드(개요 번호)를 반환합니다.

@signature: getWBSCode: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` wbs_code` - (string) - 간트 차트 내 작업의 WBS 코드

### Example

~~~jsx
gantt.init("gantt_here");

gantt.parse({
 "data":[
  {"id":1, "text":"Project #1", "start_date":"28-03-2013", "duration":"11", 
      "parent":"0", "open": true},
  {"id":2, "text":"Task #1", "start_date":"01-04-2013", "duration":"18", "parent":"1"},
  {"id":3, "text":"Task #2", "start_date":"02-04-2013", "duration":"8", "parent":"1"}
 ],
 "links":[]
});

const wbs_code = gantt.getWBSCode(gantt.getTask(3)) // -> "1.2" 반환
~~~

### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Details

버전 4.2에 추가됨

### Related API
- [getTaskByWBSCode](api/method/gettaskbywbscode.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#wbscode)

