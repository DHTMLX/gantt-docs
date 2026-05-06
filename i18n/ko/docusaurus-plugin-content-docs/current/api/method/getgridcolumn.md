---
sidebar_label: getGridColumn
title: getGridColumn 메서드
description: "열의 구성 객체를 가져옵니다."
---

# getGridColumn

### Description

@short: 열의 구성 객체를 가져옵니다.

@signature: getGridColumn: (name: string | number) =\> GridColumn

### Parameters

- `name` - (required) *string | number* -    열의 이름

### Returns
- ` column` - (GridColumn) - 열의 객체

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