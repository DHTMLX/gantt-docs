---
sidebar_label: onGridResize
title: onGridResize event
description: "사용자가 그리드의 경계를 드래그하여 크기를 조절할 때 발생합니다"
---

# onGridResize
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용자가 그리드의 경계를 드래그하여 크기를 조절할 때 발생합니다

@signature: onGridResize: (old_width: number, new_width: number) =\> void;

### Parameters

- `old_width` - (required) *number* - 크기 조절 전 그리드의 너비
- `new_width` - (required) *number* - 크기 조절 후 그리드의 너비

### Example

~~~jsx
gantt.attachEvent("onGridResize", function(old_width, new_width){
    if(!message){
        message = gantt.message({expire:-1,
        text:"Grid is now <b id='width_placeholder'></b><b>px</b> width"});
    }
    document.getElementById("width_placeholder").innerText = new_width;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related API
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)
- [onColumnResize](api/event/oncolumnresize.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)

