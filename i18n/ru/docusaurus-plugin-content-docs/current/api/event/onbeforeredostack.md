---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "срабатывает непосредственно перед тем, как действие будет добавлено в redo stack"
---

# onBeforeRedoStack

### Description

@short: Срабатывает непосредственно перед тем, как действие будет добавлено в redo stack

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - массив объектов команд, представляющих пользовательское действие

### Returns
- ` result` - (boolean) - указывает, должно ли выполняться стандартное поведение события (true) или оно должно быть остановлено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // ваш код здесь
    return true;
});
~~~

### Details

:::note
 Это событие является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включён. Дополнительную информацию можно найти в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


- Событие можно заблокировать, вернув false, что остановит дальнейшую обработку.
- Блокировка события предотвращает запись в redo действий, переданных в аргументах события.
- Вы можете изменять действия внутри события.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2

