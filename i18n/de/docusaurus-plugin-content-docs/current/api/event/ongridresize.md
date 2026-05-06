---
sidebar_label: onGridResize
title: onGridResize event
description: "feuert, wenn der Benutzer den Rand des Grids zieht, um das Grid zu skalieren"
---

# onGridResize

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::

### Beschreibung

@short: Wird ausgelöst, wenn der Benutzer den Rand des Grids zieht, um das Grid zu skalieren

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameter

- `old_width` - (erforderlich) *number* - die anfängliche Breite des Grids
- `new_width` - (erforderlich) *number* - die neue Breite des Grids

### Beispiel

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

