---
sidebar_label: onGridResizeStart
title: onGridResizeStart event
description: "Wird ausgelöst, kurz bevor der Benutzer beginnt, den Rand des Grids zu ziehen, um dessen Größe zu ändern"
---

# onGridResizeStart
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, kurz bevor der Benutzer beginnt, den Rand des Grids zu ziehen, um dessen Größe zu ändern

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - die Anfangsbreite des Grids

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events fortgesetzt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
// return false to cancel the resize action
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("Start grid resizing");
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird verhindert, dass das Grid in der Größe verändert wird.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

