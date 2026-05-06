---
sidebar_label: detachAllEvents
title: detachAllEvents Methode
description: "entfernt alle Ereignisse aus dhtmlxGantt (sowohl benutzerdefinierte als auch interne)"
---

# detachAllEvents

### Description

@short: Entfernt alle Ereignisse aus dhtmlxGantt (sowohl benutzerdefinierte als auch interne)

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

Hinweis: Die Verwendung der **detachAllEvents**-Methode kann die Funktionalität von dhtmlxGantt beeinträchtigen, da sie ALLE Event-Handler auf einmal entfernt: diejenigen, die durch benutzerdefinierte Logik definiert sind, und diejenigen, die von dhtmlxGantt selbst definiert sind (um verschiedene Teile und Funktionen zu verbinden). 

Eine sicherere Vorgehensweise besteht darin, das Ergebnis der [attachEvent](api/method/attachevent.md)-Methode zu speichern und die [detachEvent](api/method/detachevent.md)-Methode zu verwenden, um gespeicherte Ereignisse bei Bedarf zu entfernen, wie im obigen Beispiel gezeigt.

:::note
Die Methode **detachAllEvents** ist veraltet. Anstelle davon können Sie Folgendes verwenden: 
:::

~~~js
// Handler-IDs beim Anhängen von Events speichern
const events = [];
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
- [Ereignisbehandlung](guides/handling-events.md)