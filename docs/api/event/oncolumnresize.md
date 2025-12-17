---
sidebar_label: onColumnResize
title: onColumnResize event
description: "fires when the user is dragging the column's border to resize the column"
---

# onColumnResize
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires when the user is dragging the column's border to resize the column

@signature: onColumnResize: (index: number, column: GridColumn, new_width: number) =\> void;

### Parameters

- `index` - (required) *number* - the column index
- `column` - (required) *GridColumn* - the column object
- `new_width` - (required) *number* - the new column's width

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
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Related API
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResize](api/event/ongridresize.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)

