---
sidebar_label: scrollTo
title: scrollTo Methode
description: "scrollt den Gantt-Container an die angegebene Position"
---

# scrollTo

### Description

@short: Scrollt den Gantt-Container an die angegebene Position

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` -	(optional) *number | null*	-	optional, der Wert des horizontalen Scrolls oder 'null' (falls die Scrollposition nicht geändert werden soll)
- `y`	(optional) *number | null*	- optional, der Wert des vertikalen Scrolls oder 'null' (falls die Scrollposition nicht geändert werden soll)

### Example

~~~jsx
gantt.scrollTo(30, 80); // scrollt den Container sowohl horizontal als auch vertikal

gantt.scrollTo(30, null); // scrollt den Container nur horizontal

gantt.scrollTo(null, 80); // scrollt den Container nur vertikal
~~~

### Related API
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)
- [scrollLayoutCell](api/method/scrolllayoutcell.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)