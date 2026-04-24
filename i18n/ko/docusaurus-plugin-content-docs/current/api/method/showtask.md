---
sidebar_label: showTask
title: showTask 메서드
description: "지정된 작업을 화면에 표시합니다"
---

# showTask

### Description

@short: 지정된 작업을 화면에 표시합니다

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

기본 모드에서 Gantt는 [showTask](api/method/showdate.md) 메서드를 사용할 때 자체적으로 스크롤합니다.
그러나 **자동 크기 조정** 모드가 활성화되면, Gantt는 지정된 날짜를 표시하는 대신 페이지에 보이도록 컨테이너의 크기를 늘려 자체를 화면에 표시합니다.
이 문제를 해결하는 방법은 [Scrolling to hidden elements](api/config/autosize.md) 문서를 참고하세요.

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)