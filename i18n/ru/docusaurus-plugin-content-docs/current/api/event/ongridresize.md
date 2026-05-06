---
sidebar_label: onGridResize
title: onGridResize event
description: "срабатывает, когда пользователь перетаскивает границу сетки для изменения её размера"
---

# onGridResize

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Fires when the user is dragging the grid's border to resize the grid

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (обязательный) *number* - начальная ширина сетки
- `new_width` - (обязательный) *number* - новая ширина сетки

### Example

~~~jsx
gantt.attachEvent("onGridResize", function(old_width, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:"Grid is now <b id='width_placeholder'></b><b>px</b> width"});
    }
    document.getElementById("width_placeholder").innerText = new_width;
});
~~~

### Related samples
- [События изменения размера столбцов Grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResize](api/event/oncolumnresize.md)

### Related Guides
- [Определение столбцов](guides/specifying-columns.md#resizing)