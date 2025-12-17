---
sidebar_label: showTask
title: showTask method
description: "Macht die angegebene Aufgabe auf dem Bildschirm sichtbar"
---

# showTask

### Description

@short: Macht die angegebene Aufgabe auf dem Bildschirm sichtbar

@signature: showTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die ID der Aufgabe

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.showTask(10);
~~~

### Details

Standardmäßig scrollt Gantt beim Aufruf der Methode [showTask](api/method/showdate.md) automatisch, um die Aufgabe in den sichtbaren Bereich zu bringen. Ist jedoch der **autosize**-Modus aktiv, erweitert Gantt stattdessen die Größe seines Containers, um die Aufgabe auf der Seite sichtbar zu machen, anstatt zu ihr zu scrollen. Weitere Details zum Umgang mit diesem Verhalten finden Sie im Leitfaden [Scrolling to hidden elements](api/config/autosize.md).

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

