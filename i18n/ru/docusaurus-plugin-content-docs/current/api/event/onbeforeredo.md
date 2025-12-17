---
sidebar_label: onBeforeRedo
title: onBeforeRedo event
description: "срабатывает непосредственно перед выполнением метода redo()"
---

# onBeforeRedo

### Description

@short: Срабатывает непосредственно перед выполнением метода redo()

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - массив, представляющий действие пользователя, состоящий из объектов команд

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное поведение события (true) или оно будет отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // ваш код здесь
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Это событие принадлежит расширению **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Подробнее об этом можно прочитать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


Это событие можно заблокировать. Возврат *false* предотвратит выполнение дальнейших действий.

Параметр **action** - это массив объектов команд, каждый из которых содержит следующие атрибуты:
 
- **type** - (*string*) тип команды: "add", "remove" или "update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) объект задачи или связи после изменения 
- **oldValue** - (*object*) объект задачи или связи до изменения

### Related API
- [redo](api/method/redo.md)
- [onAfterRedo](api/event/onafterredo.md)
- [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

