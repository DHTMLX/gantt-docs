---
sidebar_label: onAfterRowResize
title: onAfterRowResize event
description: "행 높이 조정이 완료된 후에 트리거됩니다"
---

# onAfterRowResize

### Description

@short: 행 높이 조정이 완료된 후에 트리거됩니다

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 항목 객체
- `oldHeight` - (required) *number* - 이전 행 높이
- `newHeight` - (required) *number* - 업데이트된 행 높이

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> 의 높이가 <b>${oldHeight}px</b> 였습니다.<br>
    <b>${item.text}</b> 의 높이가 이제 <b>${newHeight}px</b> 입니다.`);
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
- v7.1에 추가됨

