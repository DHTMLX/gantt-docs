---
sidebar_label: getWBSCode
title: getWBSCode method
description: "возвращает WBS-код (номер структуры) задачи"
---

# getWBSCode

### Description

@short: Возвращает WBS-код (номер структуры) задачи

@signature: getWBSCode: (task: Task) => string

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- `wbs_code` - (string) - WBS-код задачи в диаграмме Ганта

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

const wbs_code = gantt.getWBSCode(gantt.getTask(3)) // -> returns "1.2"
~~~

### Related samples
- [Показать WBS-коды задач (номера контуров)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Details

added in version 4.2

### Related API
- [getTaskByWBSCode](api/method/gettaskbywbscode.md)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md#wbscode)