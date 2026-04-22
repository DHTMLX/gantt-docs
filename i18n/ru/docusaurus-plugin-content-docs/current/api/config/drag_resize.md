---
sidebar_label: drag_resize
title: конфигурация drag_resize
description: "позволяет изменять размер задач с помощью перетаскивания"
---

# drag_resize

### Description

@short: Позволяет изменять размер задач с помощью перетаскивания

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

Посмотрите соответствующий раздел в [CSS-документации](guides/css-overview.md#resizer) статье, чтобы узнать, как отключить ручки изменения размера для всех задач.

Посмотрите статью [Перетаскивание задач во временной шкале](guides/dnd.md) для подробностей более точного управления операциями изменения размера, а именно:

- [Отключение изменения размера конкретных задач](guides/dnd.md#disabling-resize-of-specific-tasks)
- [С какой стороны задачи выполняется изменение размера](guides/dnd.md#which-side-of-a-task-is-being-resized)
- [Отключение изменения размера начала или конца даты задачи](guides/dnd.md#disabling-resize-of-the-start-or-the-end-date-of-a-task)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)