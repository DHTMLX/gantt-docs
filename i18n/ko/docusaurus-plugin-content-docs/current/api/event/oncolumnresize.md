---
sidebar_label: onColumnResize
title: onColumnResize event
description: "사용자가 컬럼 경계를 드래그하여 컬럼 너비를 조정할 때 발생합니다"
---

# onColumnResize
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 컬럼 경계를 드래그하여 컬럼 너비를 조정할 때 발생합니다

@signature: onColumnResize: (index: number, column: GridColumn, new_width: number) =\> void;

### Parameters

- `index` - (required) *number* - 컬럼의 인덱스
- `column` - (required) *GridColumn* - 컬럼 객체 자체
- `new_width` - (required) *number* - 업데이트된 컬럼의 너비

### Example

~~~jsx
gantt.attachEvent("onColumnResize", function(index, column, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:`<b>${gantt.locale.labels["column_"+column.name]}
        </b> is now <b id='width_placeholder'></b><b>px</b> width`});
    }
    document.getElementById("width_placeholder").innerText = new_width
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResize](api/event/ongridresize.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)

