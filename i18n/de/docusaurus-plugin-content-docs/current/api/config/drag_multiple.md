---
sidebar_label: drag_multiple
title: drag_multiple Konfiguration
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
- [Mehrfachselektion und Einrücken/Ausrücken von Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

Wenn Sie mehrere Aufgaben auswählen, aber eine Aufgabe verschieben, die nicht ausgewählt ist – wird nur die nicht ausgewählte Aufgabe verschoben.

Sie können auch Drag-and-Drop von Projekten aktivieren, indem Sie die [drag_project](api/config/drag_project.md) Konfiguration auf *true* setzen.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [Mehrfachselektion von Aufgaben](guides/multiselection.md#multitaskselectionanddragndrop)