---
sidebar_label: drag_resize
title: drag_resize config
description: "enables the possibility to resize tasks by drag-and-drop"
---

# drag_resize

### Description

@short: Enables the possibility to resize tasks by drag-and-drop

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

Check the [related section in the CSS Documentation](guides/css-overview.md#resizer) article to know how to disable resize handles for all tasks.

Check the [Dragging Tasks within the Timeline](guides/dnd.md) article for details on the finer control of resizing operations, namely:

- [Disabling resize of specific tasks](guides/dnd.md#disabling-resize-of-specific-tasks)
- [Which side of a task is being resized](guides/dnd.md#which-side-of-a-task-is-being-resized)
- [Disabling resize of the start or the end date of a task](guides/dnd.md#disabling-resize-of-the-start-or-the-end-date-of-a-task)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)

