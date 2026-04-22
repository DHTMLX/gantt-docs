---
sidebar_label: refreshTask
title: refreshTask 메서드
description: "태스크와 관련 링크를 새로고침합니다"
---

# refreshTask

### Description

@short: 태스크와 관련 링크를 새로고침합니다

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (required) *string | number* - 태스크 ID

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

태스크의 속성을 변경한 후 이를 다시 렌더링하려면 이 메서드를 사용할 수 있습니다. Unlike [updateTask](api/method/updatetask.md), 이 메서드는 DataProcessor를 트리거하지 않으며 서버로의 업데이트가 전송되지 않습니다.

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

