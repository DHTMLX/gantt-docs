---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "очищает стек сохранённых команд отмены"
---

# clearUndoStack

### Description

@short: Очищает стек сохранённых команд отмены

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Этот метод является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включён. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2

