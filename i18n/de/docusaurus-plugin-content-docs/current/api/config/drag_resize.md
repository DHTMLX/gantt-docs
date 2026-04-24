---
sidebar_label: drag_resize
title: drag_resize config
description: "Ermöglicht die Größenveränderung von Aufgaben per Drag-and-Drop"
---

# drag_resize

### Description

@short: Die Möglichkeit aktivieren, Aufgaben per Drag-and-Drop in der Größe anzupassen

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

Schauen Sie sich den verwandten Abschnitt in der CSS-Dokumentation (guides/css-overview.md#resizer) an, um zu erfahren, wie Sie Resize-Griffe für alle Aufgaben deaktivieren.

Lesen Sie den Artikel [Dragging Tasks within the Timeline](guides/dnd.md) für Details zur Feinsteuerung von Größenänderungsvorgängen, nämlich:

- [Deaktivieren der Größenänderung bestimmter Aufgaben](guides/dnd.md#disabling-resize-of-specific-tasks)
- [Welche Seite einer Aufgabe wird bei der Größenänderung angepasst](guides/dnd.md#which-side-of-a-task-is-being-resized)
- [Deaktivieren der Größenänderung des Start- oder Enddatums einer Aufgabe](guides/dnd.md#disabling-resize-of-the-start-or-the-end-date-of-a-task)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)