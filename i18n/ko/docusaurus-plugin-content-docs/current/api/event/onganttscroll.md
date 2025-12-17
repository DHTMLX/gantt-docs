---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "Gantt 차트가 특정 위치로 스크롤될 때 트리거됩니다."
---

# onGanttScroll

### Description

@short: Gantt 차트가 특정 위치로 스크롤될 때 트리거됩니다.

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - 수평 스크롤 위치
- `top` - (required) *number* - 수직 스크롤 위치

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // 여기에 커스텀 로직 작성
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [How-tos](guides/how-to.md#howtohaveaninfinitescrollinthetimeline) (무한 스크롤 설정 방법 참고)
- [How-tos](guides/how-to.md#howtoloadtasksdynamically) (동적으로 작업을 로드하는 방법 참고)

