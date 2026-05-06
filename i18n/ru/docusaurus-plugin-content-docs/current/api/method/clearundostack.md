---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "очищает стек сохранённых команд отмены"
---

# clearUndoStack

### Description

@short: Очистка стека сохранённых команд отмены
@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Этот метод определяется в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Ознакомьтесь с подробностями в статье [Функциональность Undo/Redo](guides/undo-redo.md).
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [Функциональность Undo/Redo](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2