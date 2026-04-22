---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "wird ausgelöst, nachdem der Benutzer den Rand des Grids gezogen hat, um die Größe des Grids zu ändern"
---

# onGridResizeEnd
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, nachdem der Benutzer den Rand des Grids gezogen hat, um die Größe des Grids zu verändern

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - die anfängliche Breite des Grids
- `new_width` - (required) *number* - die neue Breite des Grids

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
// Rückgabe von false bricht den Resize-Vorgang ab
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Grid ist jetzt <b>${new_width}</b>px breit`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass das Grid seine Größe ändert.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)