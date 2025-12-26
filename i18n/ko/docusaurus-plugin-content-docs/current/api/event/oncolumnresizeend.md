---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "사용자가 열 경계선을 드래그하여 너비를 조정한 후에 한 번 트리거됩니다."
---

# onColumnResizeEnd
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 열 경계선을 드래그하여 너비를 조정한 후에 한 번 트리거됩니다.

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - 열의 인덱스
- `column` - (required) *GridColumn* - 열 객체 자체
- `new_width` - (required) *number* - 업데이트된 열의 너비

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 계속 진행될지(<b>true</b>) 또는 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
// false를 반환하면 크기 조정 작업이 취소됩니다.
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`열 <b>${gantt.locale.labels["column_"+column.name]}
    </b>의 크기가 ${new_width}px로 조정되었습니다.`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 열 크기 조정이 중단됩니다.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)

