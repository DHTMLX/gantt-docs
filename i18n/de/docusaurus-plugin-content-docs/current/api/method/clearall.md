---
sidebar_label: clearAll
title: clearAll method
description: "Entfernt alle Aufgaben und zusätzliche Elemente (wie Marker) aus dem Gantt-Diagramm"
---

# clearAll

### Description

@short: Entfernt alle Aufgaben und zusätzliche Elemente (wie Marker) aus dem Gantt-Diagramm

@signature: clearAll: () =\> void

### Example

~~~jsx
// lädt Daten im Gantt-Diagramm neu
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

Beachten Sie, dass diese Methode das Event [onClear](api/event/onclear.md) auslöst.

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/crud-task.md)

