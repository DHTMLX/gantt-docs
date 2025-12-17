---
sidebar_label: clearRedoStack
title: clearRedoStack method
description: "сбрасывает стек, в котором хранятся команды redo"
---

# clearRedoStack

### Description

@short: Сбрасывает стек, в котором хранятся команды redo

@signature: clearRedoStack: () =\> void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Этот метод является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включён. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2

