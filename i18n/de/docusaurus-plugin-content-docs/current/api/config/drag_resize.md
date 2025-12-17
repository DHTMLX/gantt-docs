---
sidebar_label: drag_resize
title: drag_resize config
description: "Ermöglicht das Ändern der Größe von Aufgaben mittels Drag-and-Drop"
---

# drag_resize

### Description

@short: Ermöglicht das Ändern der Größe von Aufgaben mittels Drag-and-Drop

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

Anleitungen zum Entfernen der Resize-Handles von allen Aufgaben finden Sie im [entsprechenden Abschnitt der CSS-Dokumentation](guides/css-overview.md#resizer).

Für eine detailliertere Steuerung beim Ändern der Größe von Aufgaben siehe den Artikel [Dragging Tasks within the Timeline](guides/dnd.md), der folgende Themen behandelt:

- [Deaktivieren der Größenänderung für bestimmte Aufgaben](guides/dnd.md#disablingresizingofspecifictasks)
- [Ermitteln, welche Seite einer Aufgabe geändert wird](guides/dnd.md#identifyingwhichsideofataskisbeingresized)
- [Deaktivieren der Größenänderung des Start- oder Enddatums einer Aufgabe](guides/dnd.md#disablingresizingofthestartorenddateofatask)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)

