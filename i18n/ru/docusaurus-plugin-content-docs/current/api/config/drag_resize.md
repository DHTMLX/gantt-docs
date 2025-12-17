---
sidebar_label: drag_resize
title: drag_resize config
description: "позволяет изменять размер задач с помощью drag-and-drop"
---

# drag_resize

### Description

@short: Позволяет изменять размер задач с помощью drag-and-drop

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

Для инструкций по удалению ручек изменения размера у всех задач смотрите [соответствующий раздел в CSS документации](guides/css-overview.md#resizer).

Для более детального управления изменением размера задач обратитесь к статье [Dragging Tasks within the Timeline](guides/dnd.md), которая охватывает:

- [Отключение изменения размера для конкретных задач](guides/dnd.md#disablingresizingofspecifictasks)
- [Определение, с какой стороны задачи происходит изменение размера](guides/dnd.md#identifyingwhichsideofataskisbeingresized)
- [Отключение изменения размера начальной или конечной даты задачи](guides/dnd.md#disablingresizingofthestartorenddateofatask)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)

