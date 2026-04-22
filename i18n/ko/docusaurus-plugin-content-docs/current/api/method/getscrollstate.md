---
sidebar_label: getScrollState
title: getScrollState method
description: "스크롤 위치를 반환합니다"
---

# getScrollState

### Description

@short: 스크롤 위치를 반환합니다

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - 스크롤 위치 객체

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~ 

### Details

다음 속성을 가진 객체를 반환합니다:

- **y** - 위치가 수직으로 스크롤된 픽셀 수
- **x** - 위치가 수평으로 스크롤된 픽셀 수
- **inner_width** - 보이는 타임라인 영역의 너비
- **inner_height** - 보이는 타임라인 영역의 높이
- **width** - 타임라인 영역의 스크롤 너비
- **height** - 타임라인 영역의 스크롤 높이

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)