---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "在用户完成拖动列边框以调整列宽后触发"
---

# onColumnResizeEnd
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在用户完成拖动列边框以调整列宽后触发

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - 列的索引
- `column` - (required) *GridColumn* - 列对象
- `new_width` - (required) *number* - 新列宽

### Returns
- ` result` - (boolean) - 定义事件的默认动作是否会被触发（<b>true</b>）或取消（<b>false</b>）

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
- [Grid 列调整大小事件](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

该事件是可阻塞的。返回 *false* 将取消列宽调整。

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)