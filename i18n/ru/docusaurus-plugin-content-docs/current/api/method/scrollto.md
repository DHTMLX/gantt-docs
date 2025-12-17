---
sidebar_label: scrollTo
title: scrollTo method
description: "прокручивает контейнер Gantt до заданной позиции"
---

# scrollTo

### Description

@short: Прокручивает контейнер Gantt до заданной позиции

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` - (optional) *number* - | null        необязательно, горизонтальное значение прокрутки или 'null', если менять не нужно
- `y` - (optional) *number* - | null        необязательно, вертикальное значение прокрутки или 'null', если менять не нужно

### Example

~~~jsx
gantt.scrollTo(30, 80); // прокручивает контейнер и по горизонтали, и по вертикали

gantt.scrollTo(30, null); // прокручивает контейнер только по горизонтали

gantt.scrollTo(null, 80); // прокручивает контейнер только по вертикали
~~~

### Related API
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)
- [scrollLayoutCell](api/method/scrolllayoutcell.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

