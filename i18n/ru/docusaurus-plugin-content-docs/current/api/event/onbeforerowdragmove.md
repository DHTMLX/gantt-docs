---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove событие
description: "Срабатывает перед тем, как строка сетки будет перетащена вертикально в другое положение"
---

# onBeforeRowDragMove

### Description

@short: Вызывается перед тем, как строка сетки будет перетащена вертикально в другое положение

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи для перемещения в сетке
- `parent` - (required) *string | number* - идентификатор родителя
- `tindex` - (required) *number* - индекс позиции в ветке родителя, куда будет перемещена задача

### Returns
- ` result` - (boolean) - определяет, будет ли срабатывать стандартное действие события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
     // return true/false;
});
~~~

### Details

Событие можно заблокировать. Возвращайте *false*, чтобы отменить перемещение строки.

:::note
Событие срабатывает только если опция [order_branch](api/config/order_branch.md) установлена в значение "marker". 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)