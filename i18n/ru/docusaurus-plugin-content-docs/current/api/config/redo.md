---
sidebar_label: redo
title: redo config
description: "позволяет использовать функцию Redo в диаграмме Ганта"
---

# redo

### Description

@short: Позволяет использовать функцию Redo в диаграмме Ганта

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Эта настройка является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включён. Дополнительную информацию можно найти в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

