---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack event
description: "срабатывает перед добавлением действия в стек отмены"
---

# onBeforeUndoStack

### Description

@short: Срабатывает перед добавлением действия в стек отмены

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - пользовательское действие в виде массива объектов команд

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
Это событие определяется в расширении **undo**, поэтому нужно включить плагин [undo](guides/extensions-list.md#undo). Подробности смотрите в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::


- Это событие поддерживает блокировку, возвращение false отменит дальнейшую обработку.
- Если событие заблокировано, undo не будет захватывать действия из аргументов события.
- Действия события можно изменять.

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2