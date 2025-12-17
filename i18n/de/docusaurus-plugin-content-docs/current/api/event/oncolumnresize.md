---
sidebar_label: onColumnResize
title: onColumnResize event
description: "Wird ausgelöst, wenn der Benutzer die Spaltenbegrenzung zieht, um die Spaltenbreite anzupassen"
---

# onColumnResize
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, wenn der Benutzer die Spaltenbegrenzung zieht, um die Spaltenbreite anzupassen

@signature: onColumnResize: (index: number, column: GridColumn, new_width: number) =\> void;

### Parameters

- `index` - (required) *number* - der Index der Spalte
- `column` - (required) *GridColumn* - das Spaltenobjekt selbst
- `new_width` - (required) *number* - die aktualisierte Breite der Spalte

### Example

~~~jsx
gantt.attachEvent("onColumnResize", function(index, column, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:`<b>${gantt.locale.labels["column_"+column.name]}
        </b> ist jetzt <b id='width_placeholder'></b><b>px</b> breit`});
    }
    document.getElementById("width_placeholder").innerText = new_width
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResize](api/event/ongridresize.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

