---
sidebar_label: refreshTask
title: refreshTask method
description: "작업과 관련된 링크를 업데이트합니다."
---

# refreshTask

### Description

@short: 작업과 관련된 링크를 업데이트합니다.

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (required) *string | number* -            작업 ID
- `refresh_links` - (optional) *boolean* - 선택 사항으로, 작업과 관련된 링크를 업데이트할지 여부를 결정합니다. 기본값은 <em>true</em>입니다.

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

var task = gantt.getTask(10);

task.text = "Task #10"; /*!*/
gantt.refreshTask(10);       /*!*/
~~~

### Details

이 메서드는 작업 속성을 수정한 후 작업을 다시 그리는 데 사용됩니다. [updateTask](api/method/updatetask.md)와 달리, 이 메서드는 [DataProcessor](guides/server-side.md)를 트리거하지 않으므로 서버로 업데이트가 전송되지 않습니다.

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

