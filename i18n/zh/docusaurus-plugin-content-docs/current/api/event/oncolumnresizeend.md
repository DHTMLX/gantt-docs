---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "当用户拖动列边界调整宽度完成时触发"
---

# onColumnResizeEnd
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 当用户拖动列边界调整宽度完成时触发

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - 列的索引
- `column` - (required) *GridColumn* - 列对象本身
- `new_width` - (required) *number* - 列的新宽度

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
// 返回 false 取消调整大小操作
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`列 <b>${gantt.locale.labels["column_"+column.name]}
    </b> 已调整为宽度 ${new_width}px`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

此事件可以被阻止。返回 *false* 会阻止列宽度的调整。

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)

