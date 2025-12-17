---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart event
description: "在用户开始拖动列边界调整列宽之前触发"
---

# onColumnResizeStart
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在用户开始拖动列边界调整列宽之前触发

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - 列的索引
- `column` - (required) *GridColumn* - 列对象

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

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

此事件可以被阻止。返回 *false* 将阻止列宽调整操作。

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)

