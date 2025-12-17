---
sidebar_label: getGridColumn
title: getGridColumn method
description: "получает объект конфигурации для конкретного столбца"
---

# getGridColumn

### Description

@short: Получает объект конфигурации для конкретного столбца

@signature: getGridColumn: (name: string | number) =\> GridColumn

### Parameters

- `name` - (required) *string | number* -    идентификатор столбца

### Returns
- ` column` - (GridColumn) - соответствующий объект столбца

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
- [Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)

### Related Guides
- [getGridColumns](api/method/getgridcolumns.md)

