---
sidebar_label: drag_multiple
title: drag_multiple config
description: "ermöglicht das gleichzeitige Ziehen mehrerer ausgewählter Aufgaben"
---

# drag_multiple

### Description

@short: Ermöglicht das gleichzeitige Ziehen mehrerer ausgewählter Aufgaben

@signature: drag_multiple: boolean

### Example

~~~jsx
gantt.config.drag_multiple = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

Wenn mehrere Aufgaben ausgewählt sind, bewirkt das Ziehen einer Aufgabe, die nicht Teil der Auswahl ist, dass nur diese einzelne Aufgabe verschoben wird.

Um das Ziehen und Ablegen von Projekten zu ermöglichen, setzen Sie die [drag_project](api/config/drag_project.md) Konfiguration auf *true*.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md#multitaskselectionanddragndrop)

