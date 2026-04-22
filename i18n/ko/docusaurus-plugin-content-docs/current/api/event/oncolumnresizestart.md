---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart 이벤트
description: "사용자가 열의 경계를 드래그하여 열의 크기를 조정하기 시작하기 전에 발생합니다"
---

# onColumnResizeStart
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::
### Description

@short: 사용자가 열의 경계를 끌어 열의 크기를 조정하기 시작하기 전에 발생합니다

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - 컬럼 인덱스
- `column` - (required) *GridColumn* - 컬럼 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
// 크기 조절 동작을 취소하려면 false 반환
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [- [그리드 열 리사이즈 이벤트](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)]

### Details

이벤트는 차단 가능합니다. 반환값이 *false*인 경우 열 크기 조정이 허용되지 않습니다.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [컬럼 지정](guides/specifying-columns.md#resizing)