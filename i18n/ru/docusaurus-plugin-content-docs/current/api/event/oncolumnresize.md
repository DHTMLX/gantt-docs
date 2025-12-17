---
sidebar_label: onColumnResize
title: onColumnResize event
description: "срабатывает, когда пользователь перетаскивает границу колонки для изменения её ширины"
---

# onColumnResize
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает, когда пользователь перетаскивает границу колонки для изменения её ширины

@signature: onColumnResize: (index: number, column: GridColumn, new_width: number) =\> void;

### Parameters

- `index` - (required) *number* - индекс колонки
- `column` - (required) *GridColumn* - объект колонки
- `new_width` - (required) *number* - обновлённая ширина колонки

### Example

~~~jsx
gantt.attachEvent("onColumnResize", function(index, column, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:`<b>${gantt.locale.labels["column_"+column.name]}
        </b> теперь имеет ширину <b id='width_placeholder'></b><b>px</b>`});
    }
    document.getElementById("width_placeholder").innerText = new_width
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResize](api/event/ongridresize.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)

