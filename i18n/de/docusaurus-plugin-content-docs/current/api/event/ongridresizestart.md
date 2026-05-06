---
sidebar_label: onGridResizeStart
title: onGridResizeStart-Ereignis
description: "Wird ausgelöst, bevor der Benutzer beginnt, den Rand des Grids zu ziehen, um die Größe des Grids zu ändern"
---

# onGridResizeStart
:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar.
:::
### Description

@short: Wird ausgelöst, bevor der Benutzer beginnt, den Rand des Grids zu ziehen, um die Größe des Grids zu ändern

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (erforderlich) *number* - die anfängliche Breite des Grids

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Das Event ist blockierbar. Die Rückgabe von *false* verhindert das Größenändern des Grids.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)