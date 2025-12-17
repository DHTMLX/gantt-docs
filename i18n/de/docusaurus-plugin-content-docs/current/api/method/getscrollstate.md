---
sidebar_label: getScrollState
title: getScrollState method
description: "Ruft die aktuelle Scroll-Position ab"
---

# getScrollState

### Description

@short: Ruft die aktuelle Scroll-Position ab

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - ein Objekt, das die Scroll-Position repräsentiert

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

Diese Methode liefert ein Objekt mit den folgenden Details:

- **y** - der vertikale Scroll-Offset in Pixeln
- **x** - der horizontale Scroll-Offset in Pixeln
- **inner_width** - die Breite des sichtbaren Timeline-Abschnitts
- **inner_height** - die Höhe des sichtbaren Timeline-Abschnitts
- **width** - die gesamte scrollbare Breite der Timeline
- **height** - die gesamte scrollbare Höhe der Timeline

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)

