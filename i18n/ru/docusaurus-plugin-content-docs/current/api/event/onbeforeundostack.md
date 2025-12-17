---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack event
description: "Срабатывает непосредственно перед тем, как действие будет добавлено в undo стек."
---

# onBeforeUndoStack

### Description

@short: Срабатывает непосредственно перед тем, как действие будет добавлено в undo стек.

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - массив объектов команд, представляющих действие пользователя

### Returns
- ` result` - (boolean) - определяет, должно ли выполняться стандартное поведение события (true) или оно должно быть остановлено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // ваш код здесь
    return true;
});
~~~

### Details

:::note
 Это событие является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Для дополнительной информации ознакомьтесь со статьей [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


- Это событие можно заблокировать; возврат false остановит дальнейшую обработку.
- Блокировка события предотвращает захват undo действий из аргументов события.
- Вы можете изменять действия события.

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2

