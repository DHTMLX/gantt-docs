---
sidebar_label: scrollTo
title: scrollTo method
description: "scrolls the Gantt container to the specified position"
---

# scrollTo

### Description

@short: Scrolls the Gantt container to the specified position

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` -	(optional) *number | null*	-	optional, the value of the horizontal scroll or 'null' (if the scroll position shouldn't be changed)
- `y`	(optional) *number | null*	- optional, the value of the vertical scroll or 'null' (if the scroll position shouldn't be changed)

### Example

~~~jsx
gantt.scrollTo(30, 80); // scrolls container both horizontally and vertically 

gantt.scrollTo(30, null); // scrolls container only horizontally

gantt.scrollTo(null, 80); // scrolls container only vertically
~~~

### Related API
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)
- [scrollLayoutCell](api/method/scrolllayoutcell.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

