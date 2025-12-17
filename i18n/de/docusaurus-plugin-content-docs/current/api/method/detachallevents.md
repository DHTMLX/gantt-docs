---
sidebar_label: detachAllEvents
title: detachAllEvents method
description: "entfernt alle Events aus dhtmlxGantt (einschließlich sowohl benutzerdefinierter als auch eingebauter Events)"
---

# detachAllEvents

### Description

@short: Entfernt alle Events aus dhtmlxGantt (einschließlich sowohl benutzerdefinierter als auch eingebauter Events)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Sie haben gerade ein Element mit der ID="+id+" angeklickt");
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("Sie haben gerade ein Element mit der ID="+id+" doppelt angeklickt");
});

gantt.detachAllEvents();
~~~

### Details

Beachten Sie, dass die Methode **detachAllEvents** die Funktionalität von dhtmlxGantt beeinträchtigen kann, da sie alle Event-Handler auf einmal entfernt - sowohl jene, die durch benutzerdefinierten Code hinzugefügt wurden, als auch jene, die intern von dhtmlxGantt verwendet werden, um verschiedene Features zu verbinden.

Eine bessere Vorgehensweise ist es, die von der [attachEvent](api/method/attachevent.md) Methode zurückgegebenen IDs zu speichern und dann [detachEvent](api/method/detachevent.md) zu verwenden, um genau diese spezifischen Events bei Bedarf zu entfernen, wie im obigen Beispiel gezeigt.

<br>
:::note
 Die Methode **detachAllEvents** ist veraltet. Stattdessen können Sie Folgendes verwenden: 
:::

~~~
// Handler-IDs beim Anhängen von Events speichern
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Sie haben gerade ein Element mit der ID="+id+" angeklickt");
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("Sie haben gerade ein Element mit der ID="+id+" doppelt angeklickt");
});

// Alle gespeicherten Events entfernen
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
- [attachEvent](api/method/attachevent.md)

### Related Guides
- ["Event-Behandlung"](guides/handling-events.md)

