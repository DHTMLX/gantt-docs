---
sidebar_label: changeTaskId
title: changeTaskId 메서드
description: "작업의 ID를 변경합니다"
---

# changeTaskId

### Description

@short: 작업의 ID를 변경합니다

@signature: changeTaskId: (id: string | number, new_id: string | number) => void

### Parameters

- `id` - (required) *string | number* -    현재 작업의 ID
- `new_id` - (required) *string | number* -    새로운 작업의 ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //작업의 ID를 '10 -> 15'로 변경합니다 /*!*/
~~~

### Details

메서드는 [onTaskIdChange](api/event/ontaskidchange.md) 이벤트를 발생시킵니다.

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)