---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart Event
description: "Wird ausgelöst, bevor der Benutzer beginnt, den Rand der Spalte zu ziehen, um die Spalte anzupassen"
---

# onColumnResizeStart
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Löst aus, bevor der Benutzer beginnt, den Rand der Spalte zu ziehen, um die Spaltenbreite anzupassen

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (erforderlich) *number* - der Spaltenindex
- `column` - (erforderlich) *GridColumn* - das Spalten-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
// return false to cancel the resize action
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid-Spalten-Größenänderungs-Ereignisse](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Das Event ist blockierbar. Die Rückgabe von *false* verhindert die Spaltengrößenänderung.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [Spalten festlegen](guides/specifying-columns.md#resizing)