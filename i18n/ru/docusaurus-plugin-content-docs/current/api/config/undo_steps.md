---
sidebar_label: undo_steps
title: undo_steps config
description: "указывает, на сколько шагов метод undo откатит изменения"
---

# undo_steps

### Description

@short: Указывает, на сколько шагов метод undo откатит изменения

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Эта настройка является частью расширения **undo**, поэтому обязательно включите плагин [undo](guides/extensions-list.md#undo). Подробнее об этом можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

