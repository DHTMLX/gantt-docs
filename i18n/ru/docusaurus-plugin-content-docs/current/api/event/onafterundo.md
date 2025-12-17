---
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "Срабатывает сразу после выполнения метода undo()"
---

# onAfterUndo

### Description

@short: Срабатывает сразу после выполнения метода undo()

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - массив, содержащий объекты команд

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // ваш код здесь
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
note Это событие является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


Параметр **action** - это массив объектов команд, каждый из которых содержит следующие свойства:
 
- **type** - (*string*) описывает тип команды: "add", "remove" или "update"
- **entity** - (*string*) указывает тип объекта, который был изменён: "task" или "link"
- **value** - (*object*) объект задачи или связи после изменения 
- **oldValue** - (*object*) объект задачи или связи до изменения


Если изменений не произошло, параметр **action** будет === null. Это может случиться, если был вызван [gantt.undo()](api/method/undo.md), но действие было отменено с помощью [onBeforeUndo](api/event/onbeforeundo.md) или если стек undo был пуст.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- добавлено в версии 4.0
- параметр **action** введён в версии 5.2

