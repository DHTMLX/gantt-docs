--- 
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "Срабатывает после вызова метода undo()"
---

# onAfterUndo

### Description

@short: Срабатывает после вызова метода undo()

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - массив объектов команд

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Это событие определяется в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Подробности смотрите в статье [Undo/Redo Functionality](guides/undo-redo.md).
:::

Параметр **action** представляет собой массив объектов команд, каждый из которых включает следующий набор атрибутов:
 
- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип объекта, который был изменён: "task" или "link"
- **value** - (*object*) изменённый объект задачи/ссылки
- **oldValue** - (*object*) исходный объект задачи/ссылки перед изменениями

Если изменений не было применено, аргумент **action** будет === null. Это может произойти, когда вызван [gantt.undo()](api/method/undo.md), но изменения были отменены [onBeforeUndo](api/event/onbeforeundo.md) или стек пуст.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- добавлено в версии 4.0
- аргумент **action** добавлен в версии 5.2