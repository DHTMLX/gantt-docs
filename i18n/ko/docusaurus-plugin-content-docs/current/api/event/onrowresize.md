---
sidebar_label: onRowResize
title: onRowResize event
description: "사용자가 행 경계를 드래그하여 높이를 변경할 때 발생합니다."
---

# onRowResize

### Description

@short: 사용자가 행 경계를 드래그하여 높이를 변경할 때 발생합니다.

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체
- `currentHeight` - (required) *number* - 현재 행의 높이

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> 의 높이가 <b>${currentHeight}px</b> 로 변경되었습니다`
    });
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- v7.1에 추가됨

