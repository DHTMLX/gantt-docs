---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "사용자가 그리드의 경계를 드래그하여 크기를 조정하는 작업을 마친 직후에 트리거됩니다"
---

# onGridResizeEnd
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 그리드의 경계를 드래그하여 크기를 조정하는 작업을 마친 직후에 트리거됩니다

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - 크기 조정 전 그리드의 너비
- `new_width` - (required) *number* - 업데이트된 그리드의 너비

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 계속할지(<b>true</b>) 중단할지(<b>false</b>) 결정합니다

### Example

~~~jsx
// false를 반환하면 크기 조정 작업이 취소됩니다
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Grid의 너비가 이제 <b>${new_width}</b>px 입니다`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details


이 이벤트는 차단할 수 있습니다. *false*를 반환하면 그리드 크기 조정이 중단됩니다.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)

