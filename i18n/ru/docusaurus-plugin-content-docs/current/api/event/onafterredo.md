---
sidebar_label: onAfterRedo
title: onAfterRedo event
description: "срабатывает сразу после выполнения метода redo()"
---

# onAfterRedo

### Description

@short: Срабатывает сразу после выполнения метода redo()

@signature: onAfterRedo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - массив объектов команд, представляющих действие пользователя

### Example

~~~jsx
gantt.attachEvent("onAfterRedo",function(action){
    // ваш код здесь
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Это событие является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Более подробную информацию можно найти в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


Параметр **action** содержит массив объектов команд, каждый из которых имеет следующие атрибуты:
 
- **type** - (*string*) указывает тип команды: "add", "remove" или "update"
- **entity** - (*string*) определяет тип изменённого объекта: "task" или "link"
- **value** - (*object*) объект задачи или связи после изменения
- **oldValue** - (*object*) объект задачи или связи до изменения

Если изменений для применения не было, параметр **action** будет === null. Это может произойти, если был вызван [gantt.redo()](api/method/redo.md), но изменения были предотвращены с помощью [onBeforeRedo](api/event/onbeforeredo.md) или если стек redo был пуст.

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- введено в версии 4.0
- параметр **action** добавлен в версии 5.2

