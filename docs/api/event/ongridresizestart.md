---
sidebar_label: onGridResizeStart
title: onGridResizeStart event
description: "fires before the user starts to drag the grid's border to resize the grid"
---

# onGridResizeStart
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires before the user starts to drag the grid's border to resize the grid

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - the initial grid's width

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
// return false to discard the resize action
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("Start grid resizing");
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

The event is blockable. Returning *false* won't allow grid resizing.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)

