---
sidebar_label: getUndoStack
title: метод getUndoStack
description: "возвращает стек сохранённых действий Undo"
---

# getUndoStack

### Description

@short: Возвращает стек сохранённых действий Undo

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - массив действий Undo пользователя

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Этот метод определён в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Подробности см. в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

Возвращаемый стек представляет собой массив действий Undo пользователя. Каждое действие Undo содержит набор команд. Команда — объект со следующими атрибутами:
 
- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) изменённый объект задачи (task) или связи (link)
- **oldValue** - (*object*) объект задачи (task) или связи (link) до изменений

Посмотрите пример ниже:
![get_undo_stack](/img/get_undo_stack.png)

Метод **getUndoStack()** возвращает стек из 2 действий Undo. Первое действие содержит 3 команды, а второе — 1 команда.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0