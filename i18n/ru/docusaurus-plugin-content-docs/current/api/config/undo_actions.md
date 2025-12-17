---
sidebar_label: undo_actions
title: undo_actions config
description: "определяет действия, которые функция Undo будет отменять"
---

# undo_actions

### Description

@short: Определяет действия, которые функция Undo будет отменять

@signature: undo_actions: \{ update?: string; remove?: string; add?: string; move?: string; \}

### Example

~~~jsx
gantt.config.undo_actions = {
    update: "update",
    remove: "remove", // удалить элемент из datastore
    add: "add",
    move: "move"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Эта опция является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Более подробную информацию можно найти в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

- **update** - (*string*) - задает имя для действия "update"
- **remove** - (*string*) - задает имя для действия "remove"
- **add** - (*string*) - задает имя для действия "add"
- **move** - (*string*) - задает имя для действия "move"

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

