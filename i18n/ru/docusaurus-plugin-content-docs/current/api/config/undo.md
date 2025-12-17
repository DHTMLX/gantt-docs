---
sidebar_label: undo
title: undo config
description: "включает функцию Undo для gantt"
---

# undo

### Description

@short: Включает функцию Undo для gantt

@signature: undo: boolean

### Example

~~~jsx
gantt.config.undo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Эта опция является частью расширения **undo**, поэтому убедитесь, что активировали плагин [undo](guides/extensions-list.md#undo). Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [redo](api/config/redo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

