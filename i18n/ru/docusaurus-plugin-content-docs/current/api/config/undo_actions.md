---
sidebar_label: undo_actions
title: undo_actions конфигурация
description: "задает действия, которые операция Undo будет откатывать"
---

# undo_actions

### Description

@short: Устанавливает действия, которые операция Undo будет откатывать

@signature: undo_actions: \{ update?: string; remove?: string; add?: string; move?: string; \}

### Example

~~~jsx
gantt.config.undo_actions = {
    update: "update",
    remove: "remove", // remove an item from datastore
    add: "add",
    move: "move"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Эта настройка определяется в расширении **undo**, поэтому нужно включить плагин [undo](guides/extensions-list.md#undo). Подробности см. в статье [Функциональность Undo/Redo](guides/undo-redo.md). 
:::

- **update** - (*string*) - имя действия "update"
- **remove** - (*string*) - имя действия "remove"
- **add** - (*string*) - имя действия "add"
- **move** - (*string*) - имя действия "move"

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Функциональность Undo/Redo](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0