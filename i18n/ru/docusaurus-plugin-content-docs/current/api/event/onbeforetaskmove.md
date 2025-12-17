---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove event
description: "срабатывает непосредственно перед изменением вертикального положения задачи"
---

# onBeforeTaskMove

### Description

@short: Срабатывает непосредственно перед изменением вертикального положения задачи

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - id перемещаемой задачи
- `parent` - (required) *string | number* - id нового родителя
- `tindex` - (required) *number* - новый индекс позиции внутри родительской ветки

### Returns
- ` result` - (boolean) - указывает, должно ли стандартное действие события выполниться (<b>true</b>) или быть отменено (<b>false</b>)

### Example

~~~jsx
//блокировка перемещения в другую подветку:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит перемещение задачи.

Учтите, что это событие вызывается в двух случаях:

1. Когда вызывается метод [moveTask](api/method/movetask.md) 
2. Когда активна опция [order_branch](api/config/order_branch.md) с настройкой по умолчанию (*gantt.config.order_branch = true;*), и пользователь перетаскивает задачи

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)

