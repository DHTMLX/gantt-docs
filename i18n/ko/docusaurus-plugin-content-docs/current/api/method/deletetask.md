---
sidebar_label: deleteTask
title: deleteTask method
description: "지정된 작업을 제거합니다"
---

# deleteTask

### Description

@short: 지정된 작업을 제거합니다

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    제거할 작업의 ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2013",
    duration:28
});

gantt.deleteTask(10); /*!*/
~~~

### Details

이 메서드는 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 및 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 이벤트를 트리거합니다.

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

