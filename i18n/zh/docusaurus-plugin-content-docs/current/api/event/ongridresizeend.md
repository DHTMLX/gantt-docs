---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd 事件
description: "在用户完成拖动网格边框以调整网格大小后触发"
---

# onGridResizeEnd
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 在用户完成拖动网格边框以调整网格大小后触发

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - 初始网格宽度
- `new_width` - (required) *number* - 新的网格宽度

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）还是被取消（<b>false</b>）

### Example

~~~jsx
// 返回 false 以取消调整大小操作
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Grid is now <b>${new_width}</b>px width`);
    return true;
});
~~~

### Related samples
- [网格列调整大小事件](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

该事件是可阻塞的。返回 *false* 将取消网格调整大小。

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)