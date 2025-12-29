---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart event
description: "wird ausgelöst, kurz bevor der Benutzer beginnt, eine Spaltenbegrenzung zu ziehen, um die Größe zu ändern"
---

# onColumnResizeStart
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, kurz bevor der Benutzer beginnt, eine Spaltenbegrenzung zu ziehen, um die Größe zu ändern

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - der Index der Spalte
- `column` - (required) *GridColumn* - das Spaltenobjekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
// return false to cancel the resize action
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird das Ändern der Spaltengröße verhindert.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

