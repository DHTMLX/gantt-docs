---
sidebar_label: onGridResizeStart
title: onGridResizeStart event
description: "사용자가 그리드의 경계를 드래그하여 크기를 변경하기 직전에 트리거됩니다."
---

# onGridResizeStart
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 그리드의 경계를 드래그하여 크기를 변경하기 직전에 트리거됩니다.

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - 그리드의 시작 너비

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 계속 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
// 리사이즈 동작을 취소하려면 false 반환
gantt.attachEvent("onGridResizeStart", function(old_width){
    gantt.message("Start grid resizing");
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details


이 이벤트는 차단할 수 있습니다. *false*를 반환하면 그리드 크기 조정이 방지됩니다.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)

