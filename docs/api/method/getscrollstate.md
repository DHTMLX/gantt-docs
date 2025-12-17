---
sidebar_label: getScrollState
title: getScrollState method
description: "returns the scroll position"
---

# getScrollState

### Description

@short: Returns the scroll position

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - the scroll position object

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

The method returns an object with the following properties:

- **y** - the number of pixels by which the position is scrolled vertically
- **x** - the number of pixels by which the position is scrolled horizontally
- **inner_width** - the width of the visible timeline area
- **inner_height** - the height of the visible timeline area
- **width** - the scroll width of the timeline area
- **height** - the scroll height of the timeline area

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)

