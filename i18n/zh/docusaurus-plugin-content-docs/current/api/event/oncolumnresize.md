---
sidebar_label: onColumnResize
title: onColumnResize event
description: "当用户拖动列边界调整列宽时触发"
---

# onColumnResize
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 当用户拖动列边界调整列宽时触发

@signature: onColumnResize: (index: number, column: GridColumn, new_width: number) =\> void;

### Parameters

- `index` - (required) *number* - 列的索引
- `column` - (required) *GridColumn* - 列对象本身
- `new_width` - (required) *number* - 列的新宽度

### Example

~~~jsx
gantt.attachEvent("onColumnResize", function(index, column, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:`<b>${gantt.locale.labels["column_"+column.name]}
        </b> 现在宽度为 <b id='width_placeholder'></b><b>px</b>`});
    }
    document.getElementById("width_placeholder").innerText = new_width
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

### Related API
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResize](api/event/ongridresize.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)

