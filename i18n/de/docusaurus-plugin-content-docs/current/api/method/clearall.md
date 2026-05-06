---
sidebar_label: clearAll
title: clearAll Methode
description: "entfernt alle Aufgaben und zusätzliche Elemente (einschließlich Marker) aus dem Gantt-Diagramm"
---

# clearAll

### Description

@short: Entfernt alle Aufgaben und zusätzliche Elemente (einschließlich Marker) aus dem Gantt-Diagramm

@signature: clearAll: () =\> void

### Example

~~~jsx
// lädt Daten im Gantt-Diagramm neu
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

Hinweis: Die Methode löst das Event [onClear](api/event/onclear.md) aus.

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/crud-task.md)