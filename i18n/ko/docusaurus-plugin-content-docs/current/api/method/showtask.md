---
sidebar_label: showTask
title: showTask method
description: "지정한 작업을 화면에 표시합니다"
---

# showTask

### Description

@short: 지정한 작업을 화면에 표시합니다

@signature: showTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.showTask(10);
~~~

### Details

기본적으로 [showTask](api/method/showdate.md) 메서드를 호출하면 Gantt는 해당 작업이 보이도록 스크롤합니다. 그러나 **autosize** 모드가 활성화된 경우, Gantt는 스크롤하는 대신 컨테이너 크기를 확장하여 작업이 페이지에 표시되도록 합니다. 이 동작을 제어하는 방법에 대해서는 [Scrolling to hidden elements](api/config/autosize.md) 가이드를 참고하세요.

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

