---
sidebar_label: onGridResize
title: onGridResize event
description: "当用户拖动grid边框调整其大小时触发"
---

# onGridResize
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 当用户拖动grid边框调整其大小时触发

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (required) *number* - 调整大小前grid的宽度
- `new_width` - (required) *number* - 调整大小后grid的宽度

### Example

~~~jsx
gantt.attachEvent("onGridResize", function(old_width, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:"Grid当前宽度为 <b id='width_placeholder'></b><b>px</b>"});
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
- [指定列](guides/specifying-columns.md#resizing)

