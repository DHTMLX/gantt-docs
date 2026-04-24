---
sidebar_label: scrollTo
title: scrollTo метод
description: "Прокручивает контейнер Gantt до указанной позиции"
---

# scrollTo

### Description

@short: Прокручивает контейнер Gantt до указанной позиции

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` -	(необязательный) *number | null*	-	значение горизонтальной прокрутки или 'null' (если позиция прокрутки не должна измениться)
- `y`	(необязательный) *number | null*	- значение вертикальной прокрутки или 'null' (если позиция прокрутки не должна измениться)

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