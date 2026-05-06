---
sidebar_label: getRedoStack
title: getRedoStack метод
description: "возвращает стек сохранённых redo действий пользователя"
---

# getRedoStack

### Description

@short: Возвращает стек сохранённых redo действий пользователя

@signature: getRedoStack: () => UndoRedoAction[]

### Returns
- `стек` - (UndoRedoAction[]) - массив повторных действий пользователя

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Этот метод определён в расширении **undo**, поэтому нужно включить плагин [undo](guides/extensions-list.md#undo). Подробности читайте в статье [Undo/Redo Functionality](guides/undo-redo.md).
:::

The returned stack is an array of the redo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) изменённый объект задачи/ссылки
- **oldValue** - (*object*) объект задачи/ссылки до изменений

Посмотрите приведённый ниже пример:

Метод **getRedoStack()** возвращает стек из 3 действий повторного выполнения. Первое и второе действия содержат по 1 команде, а третье содержит 3 команды.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0