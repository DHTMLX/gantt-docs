---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "wird ausgelöst, wenn das Gantt-Diagramm zu einem bestimmten Punkt gescrollt wird"
---

# onGanttScroll

### Description

@short: Wird ausgelöst, wenn das Gantt-Diagramm zu einem bestimmten Punkt gescrollt wird

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - die horizontale Scroll-Position
- `top` - (required) *number* - die vertikale Scroll-Position

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline) (lesen Sie, wie man eine unendliche Scroll-Funktion in der Timeline implementiert)
- [How-tos](guides/how-to.md#how-to-load-tasks-dynamically) (lesen Sie, wie man Aufgaben dynamisch lädt)