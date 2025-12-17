---
sidebar_label: scrollTo
title: scrollTo method
description: "Gantt 컨테이너를 지정된 위치로 스크롤합니다"
---

# scrollTo

### Description

@short: Gantt 컨테이너를 지정된 위치로 스크롤합니다

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` - (optional) *number | null* -   선택 사항, 수평 스크롤 값 또는 변경이 필요 없을 경우 'null'
- `y` - (optional) *number | null* -        선택 사항, 수직 스크롤 값 또는 변경이 필요 없을 경우 'null'

### Example

~~~jsx
gantt.scrollTo(30, 80); // 컨테이너를 수평 및 수직으로 모두 스크롤합니다

gantt.scrollTo(30, null); // 컨테이너를 수평으로만 스크롤합니다

gantt.scrollTo(null, 80); // 컨테이너를 수직으로만 스크롤합니다
~~~

### Related API
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)
- [scrollLayoutCell](api/method/scrolllayoutcell.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

