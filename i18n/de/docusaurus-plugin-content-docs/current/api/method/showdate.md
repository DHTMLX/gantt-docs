---
sidebar_label: showDate
title: showDate method
description: "scrollt den Chart-Bereich, um das angegebene Datum sichtbar zu machen"
---

# showDate

### Description

@short: Scrollt den Chart-Bereich, um das angegebene Datum sichtbar zu machen

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - das Datum, das im Chart sichtbar gemacht werden soll

### Example

~~~jsx
gantt.showDate(new Date()); //scrollt zum aktuellen Datum
~~~

### Details

Standardmäßig bewirkt der Aufruf der Methode [showDate](api/method/showdate.md), dass der Gantt sich selbst zum angegebenen Datum scrollt. 
Wenn jedoch der **autosize**-Modus aktiv ist, vergrößert Gantt statt zu scrollen die Größe seines Containers, um das Datum auf der Seite anzuzeigen. 
Weitere Details zur Handhabung dieses Verhaltens finden Sie im Artikel [Scrolling to hidden elements](api/config/autosize.md).

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

