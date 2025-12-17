---
sidebar_label: getRedoStack
title: getRedoStack method
description: "предоставляет стек сохранённых действий пользователя для повтора (redo)"
---

# getRedoStack

### Description

@short: Предоставляет стек сохранённых действий пользователя для повтора (redo)

@signature: getRedoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - массив, содержащий действия пользователя для повтора (redo)

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Этот метод принадлежит расширению **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включён. Подробнее об этом можно прочитать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


Возвращаемый стек состоит из действий пользователя для повтора (redo). Каждое действие включает набор команд. Команда - это объект со следующими свойствами:
 
- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) обновлённый объект задачи/ссылки
- **oldValue** - (*object*) объект задачи/ссылки до изменения

Пример приведён ниже:

![get_redo_stack](/img/get_redo_stack.png)

Метод **getRedoStack()** возвращает стек из 3 действий для повтора. Первое и второе действия содержат по 1 команде, третье - 3 команды.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md#gettingthestackofstoredundoredocommands)

### Change log
- добавлено в версии 4.0

