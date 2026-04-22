---
sidebar_label: getGridColumns
title: getGridColumns-Methode
description: "Ruft Spalten des Gantt-Diagramms ab"
---

# getGridColumns

### Description

@short: Ruft Spalten des Gantt-Diagramms ab

@signature: getGridColumns: () =\> GridColumn[]

### Returns
- `columns` - (GridColumn[]) - ein Array von Spalten

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
- [Grid-Spalten ausblenden](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)

### Related Guides
- [getGridColumn](api/method/getgridcolumn.md)