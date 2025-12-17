---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove event
description: "срабатывает сразу после того, как задача была перемещена на новую вертикальную позицию"
---

# onAfterTaskMove

### Description

@short: Срабатывает сразу после того, как задача была перемещена на новую вертикальную позицию

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - id перемещённой задачи
- `parent` - (required) *string | number* - id нового родителя
- `tindex` - (required) *number* - новый индекс позиции внутри родительской ветки

### Example

~~~jsx
// предотвращение перемещения в другую подветку
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // здесь может быть любая ваша логика
});
~~~

### Details

Обратите внимание, это событие срабатывает в двух случаях:

1. Когда вызывается метод [moveTask](api/method/movetask.md)
2. Когда включена опция [order_branch](api/config/order_branch.md) с настройкой по умолчанию (*gantt.config.order_branch = true;*) и пользователь перетаскивает задачи

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)

