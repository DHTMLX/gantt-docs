---
sidebar_label: onGridResizeStart
title: onGridResizeStart 事件
description: "在用户开始拖动网格边框以调整网格大小之前触发"
---

# onGridResizeStart
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 在用户开始拖动网格边框以调整网格大小之前触发

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - 初始网格宽度

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否将被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
// 返回false以取消调整大小操作
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("Start grid resizing");
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

该事件是可阻塞的。返回 *false* 将不允许网格调整大小。

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)