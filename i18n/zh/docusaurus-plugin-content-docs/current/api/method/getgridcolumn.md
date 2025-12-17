---
sidebar_label: getGridColumn
title: getGridColumn method
description: "获取特定列的配置对象"
---

# getGridColumn

### Description

@short: 获取特定列的配置对象

@signature: getGridColumn: (name: string | number) =\> GridColumn

### Parameters

- `name` - (required) *string | number* -    列的标识符

### Returns
- ` column` - (GridColumn) - 对应的列对象

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

