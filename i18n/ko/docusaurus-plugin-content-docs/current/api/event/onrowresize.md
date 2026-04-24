---
sidebar_label: onRowResize
title: onRowResize 이벤트
description: "사용자가 행의 경계선을 드래그하여 행 높이를 조정할 때 발생합니다"
---

# onRowResize

### Description

@short: 사용자가 행의 경계선을 드래그하여 행 높이를 조정할 때 발생합니다

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 태스크 객체
- `currentHeight` - (required) *number* - 행의 현재 높이

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> is now <b>${currentHeight}px</b> height`
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
- v7.1에서 추가됨