---
sidebar_label: scrollTo
title: scrollTo method
description: "scrollt den Gantt-Container zur angegebenen Position"
---

# scrollTo

### Description

@short: Scrollt den Gantt-Container zur angegebenen Position

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters
- `x` - (optional) *number | null* -  der horizontale Scrollwert oder 'null', wenn keine Änderung erforderlich ist
- `y` - (optional) *number | null* - der vertikale Scrollwert oder 'null', wenn keine Änderung erforderlich ist

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

