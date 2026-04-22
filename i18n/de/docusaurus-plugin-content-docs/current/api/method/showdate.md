---
sidebar_label: showDate
title: showDate method
description: "verschiebt den Diagrammbereich so, dass das angegebene Datum sichtbar wird"
---

# showDate

### Description

@short: Verschiebt den Diagrammbereich so, dass das angegebene Datum sichtbar wird

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - das Datum, das im Diagramm angezeigt werden soll

### Example

~~~jsx
gantt.showDate(new Date()); //shows the current date
~~~

### Details

Im Standardmodus scrollt Gantt automatisch, wenn Sie die [showDate](api/method/showdate.md) Methode verwenden.
Wenn der **autosize**-Modus aktiviert ist, vergrößert Gantt die Größe seines Containers, um sich auf der Seite sichtbar zu machen, statt das angegebene Datum anzuzeigen. 
Lesen Sie den Artikel [Scrolling to hidden elements](api/config/autosize.md), um zu erfahren, wie dieses Problem gelöst wird.

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)