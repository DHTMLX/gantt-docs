---
sidebar_label: onGanttScroll
title: onGanttScroll 이벤트
description: "Gantt 차트가 특정 지점으로 스크롤될 때 발생합니다"
---

# onGanttScroll

### Description

@short: Gantt 차트가 특정 지점으로 스크롤될 때 발생합니다

@signature: onGanttScroll: (left: number, top: number) => void;

### Parameters

- `left` - (required) *number* - 수평 스크롤의 위치
- `top` - (required) *number* - 수직 스크롤의 위치

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // 여기에 코드 작성
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline) (무한 스크롤을 타임라인에 구현하는 방법)
- [How-tos](guides/how-to.md#how-to-load-tasks-dynamically) (작업을 동적으로 로드하는 방법)