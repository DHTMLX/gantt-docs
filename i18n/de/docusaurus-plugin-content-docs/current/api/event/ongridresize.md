---
sidebar_label: onGridResize
title: onGridResize event
description: "wird ausgelöst, wenn der Benutzer die Grenze des Grids zieht, um dessen Größe anzupassen"
---

# onGridResize
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, wenn der Benutzer die Grenze des Grids zieht, um dessen Größe anzupassen

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (required) *number* - die Breite des Grids vor der Größenänderung
- `new_width` - (required) *number* - die Breite des Grids nach der Größenänderung

### Example

~~~jsx
gantt.attachEvent("onGridResize", function(old_width, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:"Grid ist jetzt <b id='width_placeholder'></b><b>px</b> breit"});
    }
    document.getElementById("width_placeholder").innerText = new_width;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResize](api/event/oncolumnresize.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

