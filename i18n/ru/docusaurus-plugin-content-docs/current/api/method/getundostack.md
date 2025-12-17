---
sidebar_label: getUndoStack
title: getUndoStack method
description: "предоставляет стек сохранённых действий пользователя для отмены (undo)"
---

# getUndoStack

### Description

@short: Предоставляет стек сохранённых действий пользователя для отмены (undo)

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - массив, содержащий действия пользователя для отмены

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Этот метод является частью расширения **undo**, поэтому плагин [undo](guides/extensions-list.md#undo) должен быть включён. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


Возвращаемый стек состоит из действий пользователя для отмены, каждое из которых включает набор команд. Команда - это объект со следующими свойствами:
 
- **type** - (*string*) указывает тип команды: "add/remove/update"
- **entity** - (*string*) указывает тип объекта, который был изменён: "task" или "link"
- **value** - (*object*) объект задачи или связи после изменения
- **oldValue** - (*object*) объект задачи или связи до изменения

Пример иллюстрации:

![get_undo_stack](/img/get_undo_stack.png)

Метод **getUndoStack()** возвращает стек, содержащий 2 действия пользователя для отмены. Первое действие включает 3 команды, второе - одну команду.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md#gettingthestackofstoredundoredocommands)

### Change log
- добавлено в версии 4.0

