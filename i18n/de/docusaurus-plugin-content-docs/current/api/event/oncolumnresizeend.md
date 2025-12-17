---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "wird ausgelöst, sobald der Benutzer das Ziehen der Spaltengrenze beendet hat, um die Breite anzupassen"
---

# onColumnResizeEnd
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, sobald der Benutzer das Ziehen der Spaltengrenze beendet hat, um die Breite anzupassen

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - der Index der Spalte
- `column` - (required) *GridColumn* - das Spaltenobjekt selbst
- `new_width` - (required) *number* - die aktualisierte Breite der Spalte

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
// Rückgabe von false bricht den Resize-Vorgang ab
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Spalte <b>${gantt.locale.labels["column_"+column.name]}
    </b> wurde auf ${new_width}px angepasst`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert die Größenänderung der Spalte.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

