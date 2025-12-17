---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "fires after the user finished dragging the grid's border to resize the grid"
---

# onGridResizeEnd
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires after the user finished dragging the grid's border to resize the grid

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - the initial grid's width
- `new_width` - (required) *number* - the new grid's width

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
// return false to discard the resize action
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Grid is now <b>${new_width}</b>px width`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

The event is blockable. Returning *false* will cancel grid resizing.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)

