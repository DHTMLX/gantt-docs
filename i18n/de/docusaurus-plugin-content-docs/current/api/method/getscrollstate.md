---
sidebar_label: getScrollState
title: getScrollState method
description: "gibt die Scroll-Position zurück"
---

# getScrollState

### Description

@short: Liefert die Scroll-Position

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - das Scroll-Position-Objekt

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

Die Methode gibt ein Objekt mit den folgenden Eigenschaften zurück:

- **y** - die Anzahl der Pixel, um die die Position vertikal gescrollt wird
- **x** - die Anzahl der Pixel, um die die Position horizontal gescrollt wird
- **inner_width** - die Breite des sichtbaren Timeline-Bereichs
- **inner_height** - die Höhe des sichtbaren Timeline-Bereichs
- **width** - die Scroll-Breite des Timeline-Bereichs
- **height** - die Scroll-Höhe des Timeline-Bereichs

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)