---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd-Ereignis
description: "Wird ausgelöst, nachdem der Benutzer den Rand der Spalte zum Ändern der Spaltenbreite gezogen hat"
---

# onColumnResizeEnd
:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar.
:::
### Description

@short: Wird ausgelöst, nachdem der Benutzer den Rand der Spalte zum Ändern der Spaltenbreite gezogen hat

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - der Spaltenindex
- `column` - (required) *GridColumn* - das Spaltenobjekt
- `new_width` - (required) *number* - die neue Spaltenbreite

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Das Ereignis kann blockiert werden. Wenn *false* zurückgegeben wird, wird das Spalten-Resizing abgebrochen.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)