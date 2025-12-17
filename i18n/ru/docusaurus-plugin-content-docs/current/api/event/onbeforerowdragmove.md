---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "срабатывает непосредственно перед вертикальным перетаскиванием строки в grid на новое место"
---

# onBeforeRowDragMove

### Description

@short: Срабатывает непосредственно перед вертикальным перетаскиванием строки в grid на новое место

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - id задачи, которая перемещается внутри grid
- `parent` - (required) *string | number* - id нового родителя
- `tindex` - (required) *number* - целевой индекс внутри родительской ветки, куда будет помещена задача

### Returns
- ` result` - (boolean) - указывает, должно ли стандартное действие события выполниться (<b>true</b>) или быть остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
    // return true/false;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит перемещение строки.

:::note
 Это событие срабатывает только если опция [order_branch](api/config/order_branch.md) установлена в значение "marker". 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)

