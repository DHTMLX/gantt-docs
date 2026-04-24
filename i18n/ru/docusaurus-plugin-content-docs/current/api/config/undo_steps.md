---
sidebar_label: undo_steps
title: Конфигурация undo_steps
description: "задает количество шагов, которые должны быть отменены методом undo"
---

# undo_steps

### Description

@short: Устанавливает количество шагов, которые должны быть отменены методом undo

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Эта настройка определяется в расширении **undo**, поэтому вам нужно включить плагин [undo](guides/extensions-list.md#undo). Подробнее читайте в статье [Undo/Redo Functionality](guides/undo-redo.md).
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0