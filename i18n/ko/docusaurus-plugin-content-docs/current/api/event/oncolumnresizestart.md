---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart event
description: "사용자가 컬럼 경계를 드래그하여 크기를 조절하기 바로 전에 발생하는 이벤트"
---

# onColumnResizeStart
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 컬럼 경계를 드래그하여 크기를 조절하기 바로 전에 발생하는 이벤트

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - 컬럼의 인덱스
- `column` - (required) *GridColumn* - 컬럼 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정

### Example

~~~jsx
// 크기 조절 동작을 취소하려면 false 반환
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details


이 이벤트는 차단할 수 있습니다. *false*를 반환하면 컬럼 크기 조절이 방지됩니다.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)

