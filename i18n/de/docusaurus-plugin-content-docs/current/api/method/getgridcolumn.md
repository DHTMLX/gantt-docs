---
sidebar_label: getGridColumn
title: getGridColumn-Methode
description: "Ermittelt das Konfigurationsobjekt einer Spalte"
---

# getGridColumn

### Description

@short: Ermittelt das Konfigurationsobjekt einer Spalte

@signature: getGridColumn: (name: string | number) =\> GridColumn

### Parameters

- `name` - (erforderlich) *string | number* - der Spaltenname

### Returns
- `column` - (GridColumn) - das Objekt der Spalte

### Example

~~~jsx
gantt.config.columns = [
    { name:"text", tree:true, width:150},
    { name:"start_date", align: "center", width:150},
    { name:"duration", align: "center", width:70},
    { name:"add", width:44, resize:true, hide:true}
];
gantt.getGridColumn("text");//->{ name:"text", tree:true, width:150}
~~~

### Related samples
- [Grid-Spalten ausblenden](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)

### Related Guides
- [getGridColumns](api/method/getgridcolumns.md)