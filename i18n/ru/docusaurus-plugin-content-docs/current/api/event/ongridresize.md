---
sidebar_label: onGridResize
title: onGridResize event
description: "срабатывает, когда пользователь перетаскивает границу grid для изменения его размера"
---

# onGridResize
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает, когда пользователь перетаскивает границу grid для изменения его размера

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (required) *number* - ширина grid до изменения размера
- `new_width` - (required) *number* - ширина grid после изменения размера

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
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResize](api/event/oncolumnresize.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)

