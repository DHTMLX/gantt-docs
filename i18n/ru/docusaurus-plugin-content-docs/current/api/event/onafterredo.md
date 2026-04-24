---
sidebar_label: onAfterRedo
title: onAfterRedo событие
description: "Срабатывает после вызова метода redo()"
---

# onAfterRedo

### Description

@short: Срабатывает после вызова метода redo()

@signature: onAfterRedo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - пользовательское действие в виде массива объектов команды

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
Это событие определяется в расширении **undo**, поэтому вам нужно включить плагин [undo](guides/extensions-list.md#undo). Прочитайте детали в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

Параметр **action** представляет собой массив объектов команды, каждый из которых включает следующий набор атрибутов:

- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип объекта, который был изменен: "task" или "link"
- **value** - (*object*) измененный объект task/link 
- **oldValue** - (*object*) объект task/link до изменений

Если изменений не было применено, аргумент **action** будет === null. Это может произойти, когда [gantt.redo()](api/method/redo.md) был вызван, но изменения были отменены [onBeforeRedo](api/event/onbeforeredo.md) или стек был пуст.

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- добавлено в версии 4.0
- аргумент **action** добавлен в версии 5.2