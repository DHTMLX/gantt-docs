---
sidebar_label: undo_types
title: конфигурация undo_types
description: "Устанавливает типы сущностей, для которых будет применяться операция Undo"
---

# undo_types

### Description

@short: Устанавливает типы сущностей, для которых будет применяться операция Undo

@signature: undo_types: \{ link?: string; task?: string; \}

### Example

~~~jsx
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

### Related samples
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Эта настройка определяется в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Подробности см. в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

- **link** - (*string*) - название сущности "link"
- **task** - (*string*) - название сущности "task"

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0