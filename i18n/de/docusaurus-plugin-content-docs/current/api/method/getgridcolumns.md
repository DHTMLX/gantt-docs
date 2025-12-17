---
sidebar_label: getGridColumns
title: getGridColumns method
description: "Ruft die Spalten des Gantt-Diagramms ab"
---

# getGridColumns

### Description

@short: Ruft die Spalten des Gantt-Diagramms ab

@signature: getGridColumns: () =\> GridColumn[]

### Returns
- ` columns` - (GridColumn[]) - ein Array, das die Spalten enthält

### Example

~~~jsx
gantt.config.columns = [
    { name:"text", tree:true, width:150},
    { name:"start_date", align: "center", width:150},
    { name:"duration", align: "center", width:70},
    { name:"add", width:44, resize:true, hide:true}
];
gantt.getGridColumns(); //-> [{ name:"text", tree:true, width:150}, {...}, {...}]
~~~

### Related samples
- [Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)

### Related Guides
- [getGridColumn](api/method/getgridcolumn.md)

