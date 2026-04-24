---
sidebar_label: onGridResizeStart
title: onGridResizeStart event
description: "사용자가 그리드의 경계선을 드래그하여 그리드의 크기를 조정하기 시작하기 전에 발생합니다"
---

# onGridResizeStart
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 그리드의 경계선을 드래그하여 그리드의 크기를 조정하기 시작하기 전에 발생합니다

@signature: onGridResizeStart: (old_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - 초기 그리드 너비

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

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

이벤트는 차단될 수 있습니다. *false*를 반환하면 그리드 크기 조정이 허용되지 않습니다.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)