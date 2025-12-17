---
sidebar_label: undo
title: undo method
description: "отменяет изменения, внесённые в gantt"
---

# undo

### Description

@short: Отменяет изменения, внесённые в gantt

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Этот метод является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включён. Дополнительную информацию можно найти в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

