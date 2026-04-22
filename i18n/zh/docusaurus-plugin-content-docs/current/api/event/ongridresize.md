---
sidebar_label: onGridResize
title: onGridResize 事件
description: "当用户拖动网格边框以调整网格大小时触发"
---

# onGridResize

:::info
此功能仅在 PRO 版本中提供。 
:::

### Description

@short: 在用户拖动网格边框以调整网格大小时触发

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (必填) *number* - 初始网格宽度
- `new_width` - (必填) *number* - 新的网格宽度

### Example

~~~jsx
gantt.attachEvent("onGridResize", function(old_width, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:"网格现在的宽度为 <b id='width_placeholder'></b><b>px</b>"});
    }
    document.getElementById("width_placeholder").innerText = new_width;
});
~~~

### Related samples
- [网格列调整事件](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResize](api/event/oncolumnresize.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)