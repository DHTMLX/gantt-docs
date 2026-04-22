---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove event
description: "срабатывает перед тем, как задача будет перемещена на новую вертикальную позицию"
---

# onBeforeTaskMove

### Description

@short: Срабатывает перед тем, как задача будет перемещена на новую вертикальную позицию

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) => boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи, которую нужно переместить
- `parent` - (required) *string | number* - идентификатор родителя
- `tindex` - (required) *number* - индекс позиции в ветке родителя, куда задача будет перемещена

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

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

Событие можно блокировать. Возвратите *false*, чтобы отменить перемещение задачи.

Note, the event fires in 2 cases:

1. При вызове метода [moveTask](api/method/movetask.md)
2. Когда опция [order_branch](api/config/order_branch.md) включена по умолчанию (*gantt.config.order_branch = true;*) и пользователь перетаскивает задачи

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)