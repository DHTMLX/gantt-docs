---
sidebar_label: undo_types
title: undo_types config
description: "устанавливает, какие типы сущностей будут затронуты действием Undo"
---

# undo_types

### Description

@short: Устанавливает, какие типы сущностей будут затронуты действием Undo

@signature: undo_types: \{ link?: string; task?: string; \}

### Example

~~~jsx
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Эта опция является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

- **link** - (*string*) - идентификатор сущности "link"
- **task** - (*string*) - идентификатор сущности "task"

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- added in version 4.0

