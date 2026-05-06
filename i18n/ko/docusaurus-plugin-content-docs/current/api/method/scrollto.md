---
sidebar_label: scrollTo
title: scrollTo 메서드
description: "Gantt 컨테이너를 지정된 위치로 스크롤합니다"
---

# scrollTo

### Description

@short: Gantt 컨테이너를 지정된 위치로 스크롤합니다

@signature: scrollTo: (x?: number | null, y?: number | null) => void

### Parameters

- `x` - (선택적) *number | null* - 선택적, 수평 스크롤의 값 또는 'null' (스크롤 위치를 변경하지 않아야 하는 경우)
- `y` - (선택적) *number | null* - 선택적, 수직 스크롤의 값 또는 'null' (스크롤 위치를 변경하지 않아야 하는 경우)

### Example

~~~jsx
gantt.scrollTo(30, 80); // 컨테이너를 수평 및 수직으로 모두 스크롤합니다

gantt.scrollTo(30, null); // 컨테이너를 수평 방향으로만 스크롤합니다

gantt.scrollTo(null, 80); // 컨테이너를 수직 방향으로만 스크롤합니다
~~~

### Related API
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)
- [scrollLayoutCell](api/method/scrolllayoutcell.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)