---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart event
description: "fires before the user starts to drag the column's border to resize the column"
---

# onColumnResizeStart
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires before the user starts to drag the column's border to resize the column

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - the column index
- `column` - (required) *GridColumn* - the column object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
// return false to discard the resize action
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

The event is blockable. Returning *false* won't allow column resizing.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)

