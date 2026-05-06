---
sidebar_label: clearRedoStack
title: clearRedoStack метод
description: "очищает стек сохранённых команд redo"
---

# clearRedoStack

### Description

@short: Очистка стека сохранённых команд redo

@signature: clearRedoStack: () =\> void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Этот метод определяется в расширении **undo**, поэтому вам нужно включить плагин [undo](guides/extensions-list.md#undo). Подробности читайте в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [Функциональность Undo/Redo](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2