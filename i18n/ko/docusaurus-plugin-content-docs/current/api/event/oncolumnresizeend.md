---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd 이벤트
description: "사용자가 열의 경계선을 드래그하여 열의 크기를 조정한 후 발생합니다"
---

# onColumnResizeEnd
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 열의 경계선을 드래그하여 열의 크기를 조정한 후 발생합니다

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - 열 인덱스
- `column` - (required) *GridColumn* - 열 객체
- `new_width` - (required) *number* - 새 열 너비

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소됩니다 (<b>false</b>)

### Example

~~~jsx
// false를 반환하면 크기 조정 작업이 취소됩니다.
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Column <b>${gantt.locale.labels["column_"+column.name]}
    </b> is now ${new_width}px width`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

이벤트는 차단 가능합니다. false를 반환하면 열 크기 조정이 취소됩니다.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)