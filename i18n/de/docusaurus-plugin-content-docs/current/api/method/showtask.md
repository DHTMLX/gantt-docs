---
sidebar_label: showTask
title: showTask-Methode
description: "Macht die angegebene Aufgabe auf dem Bildschirm sichtbar"
---

# showTask

### Description

@short: Macht die angegebene Aufgabe auf dem Bildschirm sichtbar

@signature: showTask: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgabe-ID

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

Im Standardmodus scrollt Gantt automatisch, wenn Sie die [showTask](api/method/showdate.md) Methode verwenden.
Ist der **autosize**-Modus jedoch aktiviert, vergrößert Gantt die Größe seines Containers, um sich auf der Seite sichtbar zu machen, statt das angegebene Datum anzuzeigen.
Lesen Sie den Artikel [Scrolling to hidden elements](api/config/autosize.md), um zu erfahren, wie Sie dieses Problem lösen können.

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)