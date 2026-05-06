---
sidebar_label: undo
title: конфигурация undo
description: "включает функциональность Undo для gantt"
---

# undo

### Description

@short: Включает функциональность Undo для gantt

@signature: undo: boolean

### Example

~~~jsx
gantt.config.undo = true;
~~~

**Значение по умолчанию:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Эта опция определяется в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Прочтите детали в статье [Undo/Redo Functionality](guides/undo-redo.md).
:::

### Related API
- [redo](api/config/redo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0