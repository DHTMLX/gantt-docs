---
sidebar_label: onGridResizeStart
title: событие onGridResizeStart
description: "срабатывает до того, как пользователь начнет перетаскивать границу сетки для изменения её размера"
---


# onGridResizeStart
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает до того, как пользователь начнет перетаскивать границу сетки для изменения её размера

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - исходная ширина сетки

### Returns
- ` result` - (boolean) - определяет, будет ли срабатывать действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
// вернуть false, чтобы отменить действие изменения размера
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("Start grid resizing");
    return true;
});
~~~

### Related samples
- [События изменения размера столбцов сетки](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Событие можно заблокировать. Возврат *false* не позволит изменить размер сетки.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md#resizing)