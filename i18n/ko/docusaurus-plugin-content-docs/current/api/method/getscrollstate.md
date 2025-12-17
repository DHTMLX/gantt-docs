---
sidebar_label: getScrollState
title: getScrollState method
description: "현재 스크롤 위치를 가져옵니다"
---

# getScrollState

### Description

@short: 현재 스크롤 위치를 가져옵니다

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - 스크롤 위치를 나타내는 객체

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

이 메서드는 다음과 같은 정보를 포함하는 객체를 제공합니다:

- **y** - 수직 스크롤 오프셋 (픽셀 단위)
- **x** - 수평 스크롤 오프셋 (픽셀 단위)
- **inner_width** - 보이는 timeline 섹션의 너비
- **inner_height** - 보이는 timeline 섹션의 높이
- **width** - timeline의 전체 스크롤 가능 너비
- **height** - timeline의 전체 스크롤 가능 높이

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)

