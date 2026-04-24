---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "срабатывает перед добавлением действия в redo stack"
---

# onBeforeRedoStack

### Description

@short: Срабатывает перед добавлением действия в redo stack

@signature: onBeforeRedoStack: (action: UndoRedoAction) => boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - пользовательское действие в виде массива объектов команд

### Returns
- `result` - (boolean) - определяет, будет ли вызвано действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
Это событие определяется в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Подробности смотрите в статье [Undo/Redo Functionality](guides/undo-redo.md).
:::

- Событие можно блокировать: возвращение false отменяет дальнейшую обработку.
- Если событие заблокировано, redo не будет захватывать действия из аргументов события.
- Действия события можно изменять.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 5.2