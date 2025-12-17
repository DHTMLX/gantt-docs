---
sidebar_label: onGridResize
title: onGridResize event
description: "fires when the user is dragging the grid's border to resize the grid"
---

# onGridResize

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Fires when the user is dragging the grid's border to resize the grid

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (required) *number* - the initial grid's width
- `new_width` - (required) *number* - the new grid's width

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
- [Specifying Columns](guides/specifying-columns.md#resizing)

