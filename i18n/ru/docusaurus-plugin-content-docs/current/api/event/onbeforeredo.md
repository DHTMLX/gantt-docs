---
sidebar_label: onBeforeRedo
title: onBeforeRedo event
description: "срабатывает перед вызовом метода redo()"
---

# onBeforeRedo

### Description

@short: Срабатывает перед вызовом метода redo()

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - пользовательское действие в виде массива объектов команд

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Это событие определяется в расширении **undo**, поэтому вам нужно включить плагин [undo](guides/extensions-list.md#undo). Подробнее см. в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

Событие можно блокировать. Возврат *false* отменит дальнейшую обработку.

Параметр **action** представляет собой массив объектов команды, каждый из которых содержит следующий набор атрибутов:
 
- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) изменённый объект задачи/связи
- **oldValue** - (*object*) исходный объект задачи/связи до изменений

### Related API
- - [redo](api/method/redo.md)
- - [onAfterRedo](api/event/onafterredo.md)
- - [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0