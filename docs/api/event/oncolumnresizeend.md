---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "fires after the user finished dragging the column's border to resize the column"
---

# onColumnResizeEnd
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires after the user finished dragging the column's border to resize the column

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - the column index
- `column` - (required) *GridColumn* - the column object
- `new_width` - (required) *number* - the new column's width

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
// return false to discard the resize action
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Column <b>${gantt.locale.labels["column_"+column.name]}
    </b> is now ${new_width}px width`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

The event is blockable. Returning *false* will cancel column resizing.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)

