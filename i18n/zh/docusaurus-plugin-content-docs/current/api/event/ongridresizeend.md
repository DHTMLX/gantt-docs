---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "用户拖动grid边界调整大小后立即触发的事件"
---

# onGridResizeEnd
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 用户拖动grid边界调整大小后立即触发的事件

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - grid调整前的宽度  
- `new_width` - (required) *number* - grid调整后的新宽度

### Returns
- ` result` - (boolean) - 决定事件默认行为是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
// 返回false将取消调整大小操作  
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){  
    gantt.message.hide(message);  
    message = null;  
    gantt.message(`Grid当前宽度为 <b>${new_width}</b>px`);  
    return true;  
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

该事件可被阻止。返回*false*将阻止grid调整大小。

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)

