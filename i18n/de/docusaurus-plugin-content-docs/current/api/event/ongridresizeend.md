---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "Wird unmittelbar ausgelöst, nachdem der Benutzer die Grenze des Grids gezogen hat, um dessen Größe anzupassen"
---

# onGridResizeEnd
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird unmittelbar ausgelöst, nachdem der Benutzer die Grenze des Grids gezogen hat, um dessen Größe anzupassen

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - die Breite des Grids vor der Größenänderung
- `new_width` - (required) *number* - die aktualisierte Breite des Grids

### Returns
- ` result` - (boolean) - bestimmt, ob das Standardverhalten des Events fortgesetzt werden soll (<b>true</b>) oder gestoppt wird (<b>false</b>)

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
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

