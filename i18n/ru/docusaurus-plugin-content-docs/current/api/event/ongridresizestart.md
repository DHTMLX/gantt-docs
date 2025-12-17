---
sidebar_label: onGridResizeStart
title: onGridResizeStart event
description: "срабатывает непосредственно перед тем, как пользователь начнёт перетаскивать границу grid для изменения его размера"
---

# onGridResizeStart
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает непосредственно перед тем, как пользователь начнёт перетаскивать границу grid для изменения его размера

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - начальная ширина grid

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
// вернуть false, чтобы отменить действие изменения размера
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("Начато изменение размера grid");
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details


Это событие можно заблокировать. Возврат *false* предотвратит изменение размера grid.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)

