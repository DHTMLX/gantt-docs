---
sidebar_label: onBeforeUndo
title: onBeforeUndo event
description: "срабатывает перед вызовом метода undo()"
---

# onBeforeUndo

### Description

@short: Срабатывает до вызова метода undo()

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - массив объектов команд

### Returns
- ` result` - (boolean) - определяет, будет ли вызвано действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Это событие определяется в расширении **undo**, поэтому необходимо активировать плагин [undo](guides/extensions-list.md#undo). Подробности см. в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

Событие можно блокировать. Возврат значения *false* отменит дальнейшую обработку.

Параметр **action** представляет собой массив объектов команды, каждый из которых включает следующий набор атрибутов:
 
- **type** - (*string*) тип команды: "add/remove/update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) изменённый объект task/link
- **oldValue** - (*object*) исходный объект task/link до изменений

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0