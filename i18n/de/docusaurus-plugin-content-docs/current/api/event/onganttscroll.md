---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "Wird ausgelöst, wenn das Gantt-Diagramm auf eine bestimmte Position gescrollt wird"
---

# onGanttScroll

### Description

@short: Wird ausgelöst, wenn das Gantt-Diagramm auf eine bestimmte Position gescrollt wird

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - die horizontale Scroll-Position
- `top` - (required) *number* - die vertikale Scroll-Position

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // beliebige benutzerdefinierte Logik hier
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- ["How-tos"](guides/how-to.md#howtohaveaninfinitescrollinthetimeline) (siehe, wie man unendliches Scrollen einrichtet)
- ["How-tos"](guides/how-to.md#howtoloadtasksdynamically) (siehe, wie man Aufgaben dynamisch lädt)

