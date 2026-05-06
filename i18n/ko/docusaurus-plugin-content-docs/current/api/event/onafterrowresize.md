---
sidebar_label: onAfterRowResize
title: onAfterRowResize event
description: "행 높이 조정이 완료된 후 발생합니다"
---

# onAfterRowResize

### Description

@short: 행 높이 조정이 완료된 후 발생합니다

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) => void;

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `task` - (required) *Task* - 아이템 객체
- `oldHeight` - (required) *number* - 행의 이전 높이
- `newHeight` - (required) *number* - 행의 새로운 높이

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> was <b>${oldHeight}px</b> height.<br>
    <b>${item.text}</b> is now <b>${newHeight}px</b> height`);
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)

### Change log
- 버전 7.1에 추가되었습니다