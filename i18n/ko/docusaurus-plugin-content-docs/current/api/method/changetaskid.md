---
sidebar_label: changeTaskId
title: changeTaskId method
description: "작업의 id를 업데이트합니다"
---

# changeTaskId

### Description

@short: 작업의 id를 업데이트합니다

@signature: changeTaskId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    현재 작업의 id
- `new_id` - (required) *string | number* -    새로운 작업의 id

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //작업의 id를 '10'에서 '15'로 업데이트합니다 /*!*/
~~~

### Details

이 메서드는 [onTaskIdChange](api/event/ontaskidchange.md) 이벤트를 트리거합니다.

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)

