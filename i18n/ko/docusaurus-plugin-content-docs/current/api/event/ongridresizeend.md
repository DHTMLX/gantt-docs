---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "사용자가 그리드의 경계선을 드래그하여 그리드의 크기를 조정한 직후 실행됩니다"
---

# onGridResizeEnd
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 그리드의 경계선을 드래그하여 그리드의 크기를 조정한 직후 실행됩니다

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - 초기 그리드의 너비
- `new_width` - (required) *number* - 새로운 그리드의 너비

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
// false를 반환하면 크기 조정 작업이 취소됩니다
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Grid is now <b>${new_width}</b>px width`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

이벤트는 차단 가능합니다. *false*를 반환하면 그리드 크기 조정이 취소됩니다.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)