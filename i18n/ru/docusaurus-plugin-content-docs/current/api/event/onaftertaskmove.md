---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove событие
description: "срабатывает после перемещения задачи на новую вертикальную позицию"
---

# onAfterTaskMove

### Description

@short: Срабатывает после перемещения задачи на новую вертикальную позицию

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) => void;

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи, которую нужно переместить
- `parent` - (обязателен) *string | number* - идентификатор родителя
- `tindex` - (обязателен) *number* - индекс позиции в ветви родителя, на которую будет перемещена задача

### Example

~~~jsx
// предотвращение перемещения в другую подветку
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // здесь может быть любая ваша логика
});
~~~

### Details

Примечание: событие срабатывает в 2 случаях:

1. При вызове метода [moveTask](api/method/movetask.md)
2. Когда параметр [order_branch](api/config/order_branch.md) включён в режиме по умолчанию (*gantt.config.order_branch = true;*) и пользователь перетаскивает задачи

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)