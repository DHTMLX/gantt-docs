---
sidebar_label: onGridResizeStart
title: onGridResizeStart event
description: "在用户开始拖动grid边界调整大小之前触发"
---

# onGridResizeStart
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 在用户开始拖动grid边界调整大小之前触发

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - grid的初始宽度

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
// 返回false以取消调整大小操作
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("开始调整grid大小");
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

此事件可以被阻止。返回*false*将阻止grid的大小调整。

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)

