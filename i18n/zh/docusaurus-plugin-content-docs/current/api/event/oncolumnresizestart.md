---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart 事件
description: "在用户开始拖动列边框以调整列宽之前触发"
---

# onColumnResizeStart
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在用户开始拖动列边框以调整列宽之前触发

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - 列的索引
- `column` - (required) *GridColumn* - 列对象

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否将被触发（<b>true</b>）还是取消（<b>false</b>）

### Example

~~~jsx
// 返回 false 以取消调整列宽操作
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("开始调整 " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

该事件是可阻塞的。返回 *false* 将不允许列调整。

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)