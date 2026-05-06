---
sidebar_label: onColumnResize
title: onColumnResize event
description: "срабатывает, когда пользователь перетаскивает границу столбца для изменения его ширины"
---

# onColumnResize
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Вызывается, когда пользователь перетаскивает границу столбца для изменения его ширины

@signature: onColumnResize: (index: number, column: GridColumn, new_width: number) =\> void;

### Parameters

- `index` - (required) *number* - индекс столбца
- `column` - (required) *GridColumn* - объект столбца
- `new_width` - (required) *number* - новая ширина столбца

### Example

~~~jsx
gantt.attachEvent("onColumnResize", function(index, column, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:`<b>${gantt.locale.labels["column_"+column.name]}
        </b> is now <b id='width_placeholder'></b><b>px</b> width`});
    }
    document.getElementById("width_placeholder").innerText = new_width
});
~~~

### Related samples
- [События изменения размера столбцов сетки](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Related API
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResize](api/event/ongridresize.md)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md#resizing)