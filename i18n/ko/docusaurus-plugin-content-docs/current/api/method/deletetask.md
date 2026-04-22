---
sidebar_label: deleteTask
title: deleteTask method
description: "지정된 작업을 삭제합니다"
---

# deleteTask

### Description

@short: 지정된 작업을 삭제합니다

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (필수) *string | number* - 작업의 ID

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

메서드는 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 및 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 이벤트를 발생시킵니다.

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

