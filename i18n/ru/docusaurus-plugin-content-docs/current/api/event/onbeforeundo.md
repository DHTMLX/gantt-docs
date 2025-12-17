---
sidebar_label: onBeforeUndo
title: onBeforeUndo event
description: "Срабатывает непосредственно перед выполнением метода undo()"
---

# onBeforeUndo

### Description

@short: Срабатывает непосредственно перед выполнением метода undo()

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - массив, содержащий объекты команд

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или остановлено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // ваш код здесь
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Это событие является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::


Это событие можно заблокировать. Возврат *false* остановит дальнейшую обработку.

Параметр **action** представляет собой массив объектов команд, каждый из которых содержит следующие атрибуты:
 
- **type** - (*string*) тип команды: "add", "remove" или "update"
- **entity** - (*string*) тип изменённого объекта: "task" или "link"
- **value** - (*object*) объект задачи или связи после изменения 
- **oldValue** - (*object*) объект задачи или связи до изменения

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0

